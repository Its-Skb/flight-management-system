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