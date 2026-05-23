"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

interface Seat {
  id: string;
  seat_number: string;
  class: string;
  price_modifier: number;
  is_available: boolean;
}

interface SeatSelectorProps {
  seats: Seat[];
  basePrice: number;
  flightId: string;
}

export default function SeatSelector({
  seats,
  basePrice,
  flightId,
}: SeatSelectorProps) {
  const [selectedSeat, setSelectedSeat] =
    useState<Seat | null>(null);

  const groupedSeats = useMemo(() => {
    return {
      first: seats.filter(
        (seat) => seat.class === "first"
      ),
      business: seats.filter(
        (seat) => seat.class === "business"
      ),
      economy: seats.filter(
        (seat) => seat.class === "economy"
      ),
    };
  }, [seats]);

  const seatPrice = Number(
    selectedSeat?.price_modifier || 0
  );

  const totalPrice =
    Number(basePrice) + seatPrice;

  const renderSeatSection = (
    title: string,
    sectionSeats: Seat[]
  ) => {
    if (!sectionSeats.length) return null;

    return (
      <div className="space-y-4">
        <h3 className="text-2xl font-bold">
          {title}
        </h3>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-6">
          {sectionSeats.map((seat) => {
            const isSelected =
              selectedSeat?.id === seat.id;

            return (
              <button
                key={seat.id}
                disabled={!seat.is_available}
                onClick={() =>
                  setSelectedSeat(seat)
                }
                className={`rounded-2xl border p-5 text-center transition ${
                  isSelected
                    ? "border-green-400 bg-green-400/10"
                    : "hover:border-white"
                } ${
                  !seat.is_available
                    ? "cursor-not-allowed opacity-40"
                    : ""
                }`}
              >
                <p className="text-xl font-bold">
                  {seat.seat_number}
                </p>

                <p className="capitalize">
                  {seat.class}
                </p>

                <p className="mt-2 text-yellow-400">
                  +₹
                  {Number(
                    seat.price_modifier || 0
                  )}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-10">
      {renderSeatSection(
        "First Class",
        groupedSeats.first
      )}

      {renderSeatSection(
        "Business Class",
        groupedSeats.business
      )}

      {renderSeatSection(
        "Economy Class",
        groupedSeats.economy
      )}

      <div className="rounded-2xl border p-6">
        <h3 className="text-2xl font-bold">
          Booking Summary
        </h3>

        <div className="mt-4 space-y-2">
          <p>
            Base Fare: ₹{basePrice}
          </p>

          <p>
            Seat Price: ₹{seatPrice}
          </p>

          <p className="text-3xl font-bold">
            Total: ₹{totalPrice}
          </p>
        </div>

        {selectedSeat ? (
          <Link
            href={`/passenger/${flightId}?seat=${selectedSeat.seat_number}&total=${totalPrice}`}
            className="mt-6 inline-flex rounded-xl bg-white px-6 py-3 font-semibold text-black transition hover:opacity-90"
          >
            Continue Passenger Details
          </Link>
        ) : (
          <button
            disabled
            className="mt-6 cursor-not-allowed rounded-xl border px-6 py-3 font-semibold opacity-40"
          >
            Continue Passenger Details
          </button>
        )}
      </div>
    </div>
  );
}