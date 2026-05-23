import { notFound } from "next/navigation";

import {
  getFlightById,
  getSeatsByFlightId,
} from "@/services/booking";

interface BookingPageProps {
  params: Promise<{
    flightId: string;
  }>;
}

export default async function BookingPage({
  params,
}: BookingPageProps) {
  const { flightId } = await params;

  const flight = await getFlightById(
    flightId
  );

  if (!flight) {
    notFound();
  }

  const seats = await getSeatsByFlightId(
    flightId
  );

  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="rounded-2xl border p-6">
          <h1 className="text-4xl font-bold">
            {flight.flight_no}
          </h1>

          <p className="mt-2 text-xl">
            {flight.origin} →{" "}
            {flight.destination}
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div>
              <p className="text-sm text-gray-400">
                Departure
              </p>

              <p className="text-lg">
                {new Date(
                  flight.departs_at
                ).toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-400">
                Arrival
              </p>

              <p className="text-lg">
                {new Date(
                  flight.arrives_at
                ).toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-400">
                Aircraft
              </p>

              <p className="text-lg">
                {flight.aircraft_type}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-4xl font-bold">
              ₹{flight.base_price}
            </p>
          </div>
        </div>

        <div className="rounded-2xl border p-6">
          <h2 className="text-2xl font-bold">
            Available Seats
          </h2>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-6">
            {seats.map((seat) => (
              <button
                key={seat.id}
                disabled={!seat.is_available}
                className={`rounded-xl border p-4 text-center transition ${
                  seat.is_available
                    ? "hover:border-white"
                    : "cursor-not-allowed opacity-50"
                }`}
              >
                <p className="font-semibold">
                  {seat.seat_number}
                </p>

                <p className="text-sm capitalize">
                  {seat.class}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}