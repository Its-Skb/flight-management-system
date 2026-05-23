"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFlightStore } from "@/stores/flight-store";

export default function SearchForm() {
  const router = useRouter();

  const setSearchQuery =
  useFlightStore(
    (state) => state.setSearchQuery
  );

  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState(1);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();

    const query = {
      origin,
      destination,
      date,
      passengers,
    };

    setSearchQuery(query);

    const params = new URLSearchParams({
      origin,
      destination,
      date,
      passengers: passengers.toString(),
    });

    router.push(`/search?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSearch}
      className="grid gap-4 rounded-2xl border p-6 md:grid-cols-4"
    >
      <input
        type="text"
        placeholder="Origin"
        className="rounded border p-3"
        value={origin}
        onChange={(e) => setOrigin(e.target.value)}
      />

      <input
        type="text"
        placeholder="Destination"
        className="rounded border p-3"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />

      <input
        type="date"
        className="rounded border p-3"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <input
        type="number"
        min={1}
        max={10}
        className="rounded border p-3"
        value={passengers}
        onChange={(e) => setPassengers(Number(e.target.value))}
      />

      <button
        type="submit"
        className="rounded bg-black p-3 text-white md:col-span-4"
      >
        Search Flights
      </button>
    </form>
  );
}