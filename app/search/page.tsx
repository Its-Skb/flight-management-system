import { getFlights } from "@/services/flights";
import FlightCard from "@/components/flights/flight-card";

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

        {filteredFlights.length === 0 ? (
          <div className="rounded-2xl border p-10 text-center">
            <h2 className="text-2xl font-semibold">
              No Flights Found
            </h2>

            <p className="mt-2 text-gray-400">
              Try changing your search criteria.
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredFlights.map((flight) => (
              <FlightCard
                key={flight.id}
                flight={flight}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}