-- =========================
-- RLS POLICIES
-- =========================

-- Flights: public read access
create policy "Public can view flights"
on flights
for select
using (true);

-- Seats: public read access
create policy "Public can view seats"
on seats
for select
using (true);

-- Bookings: users can view own bookings
create policy "Users can view own bookings"
on bookings
for select
using (auth.uid() = user_id);

-- Users can insert own bookings
create policy "Users can create own bookings"
on bookings
for insert
with check (auth.uid() = user_id);

-- Users can update own bookings
create policy "Users can update own bookings"
on bookings
for update
using (auth.uid() = user_id);

-- Passengers linked to user's bookings
create policy "Users can view own passengers"
on passengers
for select
using (
  exists (
    select 1
    from bookings
    where bookings.id = passengers.booking_id
    and bookings.user_id = auth.uid()
  )
);

-- Reschedules linked to user's bookings
create policy "Users can view own reschedules"
on reschedules
for select
using (
  exists (
    select 1
    from bookings
    where bookings.id = reschedules.booking_id
    and bookings.user_id = auth.uid()
  )
);

-- =========================
-- SEAT RESERVATION RPC
-- =========================

create or replace function reserve_seat(
  p_user_id uuid,
  p_flight_id uuid,
  p_seat_id uuid,
  p_total_price numeric,
  p_pnr_code varchar
)
returns uuid
language plpgsql
security definer
as $$
declare
  v_booking_id uuid;
  v_seat_available boolean;
begin

  -- Lock seat row to prevent race conditions
  select is_available
  into v_seat_available
  from seats
  where id = p_seat_id
  and flight_id = p_flight_id
  for update;

  -- Check availability
  if v_seat_available is not true then
    raise exception 'Seat is already booked';
  end if;

  -- Mark seat unavailable
  update seats
  set is_available = false
  where id = p_seat_id;

  -- Create booking
  insert into bookings (
    user_id,
    flight_id,
    seat_id,
    total_price,
    pnr_code,
    status
  )
  values (
    p_user_id,
    p_flight_id,
    p_seat_id,
    p_total_price,
    p_pnr_code,
    'confirmed'
  )
  returning id into v_booking_id;

  return v_booking_id;

end;
$$;


-- =========================
-- BOOKING CANCELLATION RPC
-- =========================

create or replace function cancel_booking(
  p_booking_id uuid
)
returns void
language plpgsql
security definer
as $$
declare
  v_seat_id uuid;
  v_flight_departure timestamptz;
begin

  -- Get booking seat and flight departure
  select
    b.seat_id,
    f.departs_at
  into
    v_seat_id,
    v_flight_departure
  from bookings b
  join flights f
    on b.flight_id = f.id
  where b.id = p_booking_id
  for update;

  -- Prevent cancellation within 2 hours
  if v_flight_departure <= now() + interval '2 hours' then
    raise exception 'Cannot cancel booking within 2 hours of departure';
  end if;

  -- Update booking status
  update bookings
  set status = 'cancelled'
  where id = p_booking_id;

  -- Free seat
  update seats
  set is_available = true
  where id = v_seat_id;

end;
$$;

-- =========================
-- CANCELLATION VALIDATION TRIGGER
-- =========================

create or replace function prevent_late_cancellation()
returns trigger
language plpgsql
as $$
declare
  v_departure_time timestamptz;
begin

  select departs_at
  into v_departure_time
  from flights
  where id = new.flight_id;

  if new.status = 'cancelled'
     and v_departure_time <= now() + interval '2 hours'
  then
    raise exception 'Cancellation blocked within 2 hours of departure';
  end if;

  return new;

end;
$$;

create trigger booking_cancellation_trigger
before update on bookings
for each row
execute function prevent_late_cancellation();