-- =========================
-- FLIGHT SEED DATA
-- =========================

insert into flights (
  flight_no,
  origin,
  destination,
  departs_at,
  arrives_at,
  aircraft_type,
  status,
  base_price
)
values

-- Bangalore ↔ Delhi
(
  'AI101',
  'Bangalore',
  'Delhi',
  now() + interval '1 day',
  now() + interval '1 day 2 hours 30 minutes',
  'Airbus A320',
  'scheduled',
  5500
),

(
  'AI102',
  'Delhi',
  'Bangalore',
  now() + interval '2 days',
  now() + interval '2 days 2 hours 30 minutes',
  'Airbus A320',
  'scheduled',
  5600
),

-- Mumbai ↔ Chennai
(
  '6E201',
  'Mumbai',
  'Chennai',
  now() + interval '1 day 5 hours',
  now() + interval '1 day 7 hours',
  'Boeing 737',
  'scheduled',
  4800
),

(
  '6E202',
  'Chennai',
  'Mumbai',
  now() + interval '2 days 5 hours',
  now() + interval '2 days 7 hours',
  'Boeing 737',
  'scheduled',
  5000
),

-- Hyderabad ↔ Kolkata
(
  'UK301',
  'Hyderabad',
  'Kolkata',
  now() + interval '3 days',
  now() + interval '3 days 2 hours',
  'Airbus A321',
  'scheduled',
  6200
),

(
  'UK302',
  'Kolkata',
  'Hyderabad',
  now() + interval '4 days',
  now() + interval '4 days 2 hours',
  'Airbus A321',
  'scheduled',
  6100
),

-- Pune ↔ Goa
(
  'SG401',
  'Pune',
  'Goa',
  now() + interval '1 day 8 hours',
  now() + interval '1 day 9 hours',
  'ATR 72',
  'scheduled',
  3500
),

(
  'SG402',
  'Goa',
  'Pune',
  now() + interval '2 days 8 hours',
  now() + interval '2 days 9 hours',
  'ATR 72',
  'scheduled',
  3600
);

-- =========================
-- SEAT MAP GENERATION
-- =========================

do $$
declare
  flight_record record;
  row_num int;
  seat_letter text;
  seat_class_value seat_class;
  extra_fee_value numeric;
begin

  for flight_record in
    select id from flights
  loop

    -- First Class: Rows 1-2
    for row_num in 1..2 loop
      foreach seat_letter in array array['A', 'B', 'C', 'D'] loop

        insert into seats (
          flight_id,
          seat_number,
          class,
          extra_fee
        )
        values (
          flight_record.id,
          row_num || seat_letter,
          'first',
          5000
        );

      end loop;
    end loop;

    -- Business Class: Rows 3-7
    for row_num in 3..7 loop
      foreach seat_letter in array array['A', 'B', 'C', 'D'] loop

        insert into seats (
          flight_id,
          seat_number,
          class,
          extra_fee
        )
        values (
          flight_record.id,
          row_num || seat_letter,
          'business',
          2500
        );

      end loop;
    end loop;

    -- Economy Class: Rows 8-30
    for row_num in 8..30 loop
      foreach seat_letter in array array['A', 'B', 'C', 'D', 'E', 'F'] loop

        insert into seats (
          flight_id,
          seat_number,
          class,
          extra_fee
        )
        values (
          flight_record.id,
          row_num || seat_letter,
          'economy',
          500
        );

      end loop;
    end loop;

  end loop;
end $$;