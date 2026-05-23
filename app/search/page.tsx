import { getFlights } from "@/services/flights";

interface SearchPageProps {
  searchParams: Promise<{
    origin?: string;
    destination?: string;
  }>;
}

export default async function SearchPage({
  searchParams,
}: SearchPageProps) {
  const params = await searchParams;

  const flights = await getFlights();

  const filteredFlights = flights.filter((flight) => {
    const originMatch = params.origin
      ? flight.origin
          .toLowerCase()
          .includes(params.origin.toLowerCase())
      : true;

    const destinationMatch = params.destination
      ? flight.destination
          .toLowerCase()
          .includes(params.destination.toLowerCase())
      : true;

    return originMatch && destinationMatch;
  });

  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <h1 className="text-3xl font-bold">
          Available Flights
        </h1>

        <div className="grid gap-4">
          {filteredFlights.map((flight) => (
            <div
              key={flight.id}
              className="rounded-2xl border p-6"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-xl font-semibold">
                    {flight.flight_no}
                  </h2>

                  <p>
                    {flight.origin} → {flight.destination}
                  </p>
                </div>

                <div>
                  <p>
                    Departure:
                  </p>

                  <p>
                    {new Date(
                      flight.departs_at
                    ).toLocaleString()}
                  </p>
                </div>

                <div>
                  <p className="text-2xl font-bold">
                    ₹{flight.base_price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}