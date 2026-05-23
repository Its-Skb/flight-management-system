"use client";

import { useState } from "react";

interface Seat {
  id: string;
  seat_number: string;
  class: string;
  is_available: boolean;
  extra_fee: number;
}

interface SeatMapProps {
  seats: Seat[];
}

export default function SeatMap({
  seats,
}: SeatMapProps) {
  const [selectedSeat, setSelectedSeat] =
    useState<string | null>(null);

  const firstClassSeats = seats.filter(
    (seat) => seat.class === "first"
  );

  const businessSeats = seats.filter(
    (seat) => seat.class === "business"
  );

  const economySeats = seats.filter(
    (seat) => seat.class === "economy"
  );

  function renderSeats(
    seatList: Seat[],
    title: string
  ) {
    if (seatList.length === 0) return null;

    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold capitalize">
          {title} Class
        </h3>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-6">
          {seatList.map((seat) => {
            const isSelected =
              selectedSeat === seat.id;

            return (
              <button
                key={seat.id}
                disabled={!seat.is_available}
                onClick={() =>
                  setSelectedSeat(seat.id)
                }
                className={`rounded-2xl border p-4 text-center transition-all duration-200 ${
                  !seat.is_available
                    ? "cursor-not-allowed border-red-500 bg-red-500/10 opacity-50"
                    : isSelected
                    ? "border-green-500 bg-green-500/20"
                    : "hover:border-white hover:bg-white/5"
                }`}
              >
                <p className="font-bold">
                  {seat.seat_number}
                </p>

                <p className="mt-1 text-sm capitalize">
                  {seat.class}
                </p>

                {seat.extra_fee > 0 && (
                  <p className="mt-1 text-xs text-yellow-400">
                    +₹{seat.extra_fee}
                  </p>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {renderSeats(
        firstClassSeats,
        "First"
      )}

      {renderSeats(
        businessSeats,
        "Business"
      )}

      {renderSeats(
        economySeats,
        "Economy"
      )}
    </div>
  );
}