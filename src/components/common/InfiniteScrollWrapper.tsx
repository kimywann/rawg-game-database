"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import GameList from "../features/GameList";

import useGetGames from "@/api/hooks/useGetGames";

interface InfiniteScrollWrapperProps {
  type: "trending" | "best-of-the-year" | "top-250" | "all-games";
}

export default function InfiniteScrollWrapper({
  type,
}: InfiniteScrollWrapperProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetGames(type);
  const [isGameListRendered, setIsGameListRendered] = useState(false);

  const games = data?.pages.flatMap((page) => page.results) || [];

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <>
      <GameList games={games} onRender={setIsGameListRendered} />
      <div ref={ref} className="flex h-20 items-center justify-center">
        {isFetchingNextPage ? (
          <div className="flex items-center gap-3">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-300 border-t-gray-500" />
          </div>
        ) : hasNextPage && isGameListRendered ? (
          <div className="text-lg font-medium text-zinc-300">
            Scroll to load more
          </div>
        ) : isGameListRendered ? (
          <div className="text-center">
            <h2 className="mb-2 text-2xl font-bold text-zinc-800">
              모든 게임을 확인했습니다!
            </h2>
            <p className="text-zinc-600">더 이상 로드할 게임이 없습니다.</p>
          </div>
        ) : null}
      </div>
    </>
  );
}
