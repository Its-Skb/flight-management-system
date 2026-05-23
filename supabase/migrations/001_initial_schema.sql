-- =========================
-- ENUM TYPES
-- =========================

create type flight_status as enum (
  'scheduled',
  'boarding',
  'departed',
  'delayed',
  'cancelled'
);

create type seat_class as enum (
  'economy',
  'business',
  'first'
);

create type booking_status as enum (
  'confirmed',
  'rescheduled',
  'cancelled'
);


-- =========================
-- FLIGHTS TABLE
-- =========================

create table flights (
  id uuid primary key default gen_random_uuid(),

  flight_no varchar(20) not null unique,

  origin varchar(100) not null,
  destination varchar(100) not null,

  departs_at timestamptz not null,
  arrives_at timestamptz not null,

  aircraft_type varchar(100) not null,

  status flight_status not null default 'scheduled',

  base_price numeric(10,2) not null
    check (base_price > 0),

  created_at timestamptz default now()
);

-- =========================
-- SEATS TABLE
-- =========================

create table seats (
  id uuid primary key default gen_random_uuid(),

  flight_id uuid not null
    references flights(id)
    on delete cascade,

  seat_number varchar(10) not null,

  class seat_class not null,

  is_available boolean not null default true,

  extra_fee numeric(10,2) default 0
    check (extra_fee >= 0),

  created_at timestamptz default now(),

  unique (flight_id, seat_number)
);

-- =========================
-- BOOKINGS TABLE
-- =========================

create table bookings (
  id uuid primary key default gen_random_uuid(),

  user_id uuid not null
    references auth.users(id)
    on delete cascade,

  flight_id uuid not null
    references flights(id)
    on delete cascade,

  seat_id uuid not null
    references seats(id)
    on delete cascade,

  status booking_status not null
    default 'confirmed',

  booked_at timestamptz default now(),

  total_price numeric(10,2) not null
    check (total_price >= 0),

  pnr_code varchar(20) not null unique,

  created_at timestamptz default now()
);

-- =========================
-- PASSENGERS TABLE
-- =========================

create table passengers (
  id uuid primary key default gen_random_uuid(),

  booking_id uuid not null
    references bookings(id)
    on delete cascade,

  full_name varchar(255) not null,

  passport_no varchar(50) not null,

  nationality varchar(100) not null,

  dob date not null,

  created_at timestamptz default now()
);

-- =========================
-- RESCHEDULES TABLE
-- =========================

create table reschedules (
  id uuid primary key default gen_random_uuid(),

  booking_id uuid not null
    references bookings(id)
    on delete cascade,

  old_flight_id uuid not null
    references flights(id),

  new_flight_id uuid not null
    references flights(id),

  requested_at timestamptz default now(),

  fee_charged numeric(10,2) default 0
    check (fee_charged >= 0)
);

-- =========================
-- INDEXES
-- =========================

create index idx_flights_route
on flights(origin, destination);

create index idx_seats_flight
on seats(flight_id);

create index idx_bookings_user
on bookings(user_id);

create index idx_bookings_flight
on bookings(flight_id);