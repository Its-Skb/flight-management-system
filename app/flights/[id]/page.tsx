import { notFound } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

interface FlightPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function FlightPage({
  params,
}: FlightPageProps) {
  const { id } = await params;

  const supabase = await createClient();

  const { data: flight } =
    await supabase
      .from("flights")
      .select("*")
      .eq("id", id)
      .single();

  if (!flight) {
    notFound();
  }

  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="rounded-2xl border p-6">
          <h1 className="text-4xl font-bold">
            {flight.flight_no}
          </h1>

          <p className="mt-2 text-xl">
            {flight.origin} →{" "}
            {flight.destination}
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-gray-400">
                Departure
              </p>

              <p>
                {new Date(
                  flight.departs_at
                ).toLocaleDateString()}
              </p>
            </div>

            <div>
              <p className="text-gray-400">
                Arrival
              </p>

              <p>
                {new Date(
                  flight.arrives_at
                ).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-4xl font-bold">
              ₹{flight.base_price}
            </p>

            <Link
              href={`/booking/${flight.id}`}
              className="mt-6 inline-flex rounded-xl bg-white px-6 py-3 font-semibold text-black transition hover:opacity-90"
            >
              Continue Booking
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}