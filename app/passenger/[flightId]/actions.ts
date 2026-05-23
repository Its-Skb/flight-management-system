"use server";

import { redirect } from "next/navigation";

import { createBooking } from "@/services/booking";
import { createClient } from "@/lib/supabase/server";

export async function submitBooking(
  formData: FormData
) {
  const flightId =
    formData.get("flightId") as string;

  const seatNumber =
    formData.get("seatNumber") as string;

  const passengerName =
    formData.get(
      "passengerName"
    ) as string;

  const passengerEmail =
    formData.get(
      "passengerEmail"
    ) as string;

  const passengerPhone =
    formData.get(
      "passengerPhone"
    ) as string;

  const totalPrice = Number(
    formData.get("totalPrice")
  );

  const supabase = await createClient();

  const { data: seat } = await supabase
    .from("seats")
    .select("*")
    .eq("flight_id", flightId)
    .eq("seat_number", seatNumber)
    .single();

  if (!seat) {
    throw new Error("Seat not found");
  }

  const booking = await createBooking({
    flight_id: flightId,
    seat_id: seat.id,
    passenger_name: passengerName,
    passenger_email: passengerEmail,
    passenger_phone: passengerPhone,
    total_price: totalPrice,
  });

  redirect(
    `/confirmation/${booking.id}`
  );
}