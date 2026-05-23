import { notFound } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

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
                ).toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-gray-400">
                Arrival
              </p>

              <p>
                {new Date(
                  flight.arrives_at
                ).toLocaleString()}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-4xl font-bold">
              ₹{flight.base_price}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}