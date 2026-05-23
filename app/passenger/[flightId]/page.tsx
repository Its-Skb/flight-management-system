interface PassengerPageProps {
  params: Promise<{
    flightId: string;
  }>;

  searchParams: Promise<{
    seat?: string;
    total?: string;
  }>;
}

export default async function PassengerPage({
  params,
  searchParams,
}: PassengerPageProps) {
  const { flightId } = await params;

  const query = await searchParams;

  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-3xl rounded-2xl border p-6">
        <h1 className="text-3xl font-bold">
          Passenger Details
        </h1>

        <div className="mt-6 space-y-2">
          <p>
            Flight ID: {flightId}
          </p>

          <p>
            Selected Seat: {query.seat}
          </p>

          <p>
            Total Fare: ₹{query.total}
          </p>
        </div>

        <form className="mt-8 space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full rounded-xl border bg-transparent p-4"
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-xl border bg-transparent p-4"
          />

          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full rounded-xl border bg-transparent p-4"
          />

          <button
            type="submit"
            className="rounded-xl bg-white px-6 py-3 font-semibold text-black"
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </main>
  );
}