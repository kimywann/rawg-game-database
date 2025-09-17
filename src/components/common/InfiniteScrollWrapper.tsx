"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "react-intersection-observer";

import GameList from "@/components/game/GameList";

import useGetGames from "@/api/hooks/useGetGames";

interface InfiniteScrollWrapperProps {
  type: "trending" | "best-of-the-year" | "top-250" | "all-games" | "search";
  searchQuery?: string;
}

export default function InfiniteScrollWrapper({
  type,
  searchQuery,
}: InfiniteScrollWrapperProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetGames(
    type,
    { searchQuery },
  );
  const [isGameListRendered, setIsGameListRendered] = useState(false);
  const isFetchingRef = useRef(false);

  const games = data?.pages.flatMap((page) => page.results) || [];

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  useEffect(() => {
    if (
      inView &&
      hasNextPage &&
      !isFetchingNextPage &&
      !isFetchingRef.current
    ) {
      isFetchingRef.current = true;
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    if (!isFetchingNextPage) {
      isFetchingRef.current = false;
    }
  }, [isFetchingNextPage]);

  if (type === "search") {
    if (!searchQuery?.trim()) {
      return (
        <div className="flex items-center justify-center py-12">
          <p className="text-gray-400">검색어를 입력해주세요.</p>
        </div>
      );
    }

    if (games.length === 0 && !isFetchingNextPage) {
      return (
        <div className="flex items-center justify-center py-12">
          <p className="text-gray-400">검색 결과가 없습니다.</p>
        </div>
      );
    }
  }

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
        ) : isGameListRendered && games.length > 0 ? (
          <div className="text-center">
            <h2 className="mb-2 text-2xl font-bold text-zinc-800">
              {type === "search"
                ? "모든 검색 결과를 확인했습니다!"
                : "모든 게임을 확인했습니다!"}
            </h2>
            <p className="text-zinc-600">더 이상 로드할 게임이 없습니다.</p>
          </div>
        ) : null}
      </div>
    </>
  );
}
