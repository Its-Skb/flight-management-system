"use client";

import { useRouter } from "next/navigation";

import { Flight } from "@/types/database";
import { useFlightStore } from "@/stores/flight-store";

interface FlightCardProps {
  flight: Flight;
}

export default function FlightCard({
  flight,
}: FlightCardProps) {
  const router = useRouter();

  const setSelectedFlight =
    useFlightStore(
      (state) => state.setSelectedFlight
    );

  function handleSelectFlight() {
    setSelectedFlight(flight);

    router.push(`/flights/${flight.id}`);
  }

  return (
    <div className="rounded-2xl border p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            {flight.flight_no}
          </h2>

          <p className="text-lg">
            {flight.origin} →{" "}
            {flight.destination}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-400">
            Departure
          </p>

          <p>
            {new Date(
              flight.departs_at
            ).toLocaleDateString()}
          </p>
        </div>

        <div className="space-y-2 text-right">
          <p className="text-3xl font-bold">
            ₹{flight.base_price}
          </p>

          <button
            onClick={
              handleSelectFlight
            }
            className="rounded bg-white px-4 py-2 text-black"
          >
            Select Flight
          </button>
        </div>
      </div>
    </div>
  );
}