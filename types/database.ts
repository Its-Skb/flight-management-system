export type FlightStatus =
  | "scheduled"
  | "boarding"
  | "departed"
  | "cancelled";

export type SeatClass =
  | "economy"
  | "business"
  | "first";

export interface Flight {
  id: string;
  flight_no: string;
  origin: string;
  destination: string;
  departs_at: string;
  arrives_at: string;
  aircraft_type: string;
  status: FlightStatus;
  base_price: number;
}

export interface Seat {
  id: string;
  flight_id: string;
  seat_number: string;
  class: SeatClass;
  is_available: boolean;
  extra_fee: number;
}