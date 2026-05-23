import SearchForm from "@/components/search/search-form";

export default function HomePage() {
  return (
    <main className="min-h-screen p-6">
      <section className="mx-auto flex max-w-6xl flex-col gap-10 py-20">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold">
            Book Flights Easily
          </h1>

          <p className="max-w-2xl text-lg text-gray-400">
            Search and reserve flights with realtime seat selection,
            instant booking confirmation, and secure management.
          </p>
        </div>

        <SearchForm />
      </section>
    </main>
  );
}