import { getNewAndTrendingGames } from "@/api/gamesApi";
import InfiniteScrollWrapper from "@/components/InfiniteScrollWrapper";

export default async function Home() {
  const initialData = await getNewAndTrendingGames(1);

  return (
    <div className="flex">
      <main className="flex w-full flex-col items-center lg:flex-1 lg:items-start">
        <div className="flex flex-col items-center gap-2 text-center lg:items-start lg:text-left">
          <h1 className="text-4xl font-bold sm:text-5xl lg:text-7xl">
            New and trending
          </h1>
          <p className="text-sm sm:text-base">
            Based on player counts and release date
          </p>
        </div>
        <section className="w-full">
          <div className="mt-6 lg:mt-10">
            <InfiniteScrollWrapper initialData={initialData} />
          </div>
        </section>
      </main>
    </div>
  );
}
