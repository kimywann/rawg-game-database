"use client";

import GameList from "@/components/features/GameList";
import useGetTrendingGames from "@/api/useGetTrendingGames";

import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export default function Home() {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetTrendingGames();

  const games = data?.pages.flatMap((page) => page.results) || [];
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  // load more가 보이는 순간
  // fetchNextPage 호출

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
            <GameList games={games} />
          </div>
          <h1 ref={ref}>Load more</h1>
        </section>
      </main>
    </div>
  );
}
