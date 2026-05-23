import { createClient } from "@/lib/supabase/server";

export async function getFlightById(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("flights")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}

export async function getSeatsByFlightId(
  flightId: string
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("seats")
    .select("*")
    .eq("flight_id", flightId)
    .order("seat_number");

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

interface CreateBookingParams {
  flight_id: string;
  seat_id: string;
  passenger_name: string;
  passenger_email: string;
  passenger_phone: string;
  total_price: number;
}

export async function createBooking({
  flight_id,
  seat_id,
  passenger_name,
  passenger_email,
  passenger_phone,
  total_price,
}: CreateBookingParams) {
  const supabase = await createClient();

  // Create booking
  const { data, error } = await supabase
    .from("bookings")
    .insert({
      flight_id,
      seat_id,
      passenger_name,
      passenger_email,
      passenger_phone,
      total_price,
      status: "confirmed",
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  // Mark seat unavailable
  await supabase
    .from("seats")
    .update({
      is_available: false,
    })
    .eq("id", seat_id);

  return data;
}