import Link from "next/link";
import { notFound } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

interface ConfirmationPageProps {
  params: Promise<{
    bookingId: string;
  }>;
}

export default async function ConfirmationPage({
  params,
}: ConfirmationPageProps) {
  const { bookingId } = await params;

  const supabase = await createClient();

  const { data: booking } =
    await supabase
      .from("bookings")
      .select(`
        *,
        flights (
          flight_no,
          origin,
          destination
        ),
        seats (
          seat_number
        )
      `)
      .eq("id", bookingId)
      .single();

  if (!booking) {
    notFound();
  }

  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-3xl rounded-2xl border p-8">
        <div className="space-y-6">
          <div>
            <p className="text-green-400">
              Booking Confirmed
            </p>

            <h1 className="mt-2 text-4xl font-bold">
              Your flight is booked ✈️
            </h1>
          </div>

          <div className="grid gap-4 rounded-2xl border p-6 md:grid-cols-2">
            <div>
              <p className="text-gray-400">
                Flight
              </p>

              <p className="text-xl font-semibold">
                {
                  booking.flights
                    .flight_no
                }
              </p>
            </div>

            <div>
              <p className="text-gray-400">
                Route
              </p>

              <p className="text-xl font-semibold">
                {
                  booking.flights
                    .origin
                }{" "}
                →{" "}
                {
                  booking.flights
                    .destination
                }
              </p>
            </div>

            <div>
              <p className="text-gray-400">
                Passenger
              </p>

              <p className="text-xl font-semibold">
                {
                  booking.passenger_name
                }
              </p>
            </div>

            <div>
              <p className="text-gray-400">
                Seat
              </p>

              <p className="text-xl font-semibold">
                {
                  booking.seats
                    .seat_number
                }
              </p>
            </div>

            <div>
              <p className="text-gray-400">
                Total Paid
              </p>

              <p className="text-2xl font-bold">
                ₹
                {
                  booking.total_price
                }
              </p>
            </div>

            <div>
              <p className="text-gray-400">
                Status
              </p>

              <p className="text-green-400 font-semibold capitalize">
                {booking.status}
              </p>
            </div>
          </div>

          <Link
            href="/"
            className="inline-flex rounded-xl bg-white px-6 py-3 font-semibold text-black transition hover:opacity-90"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </main>
  );
}