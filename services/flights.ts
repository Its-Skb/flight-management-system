import { createClient } from "@/lib/supabase/server";

export async function getFlights() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("flights")
    .select("*")
    .order("departs_at", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}