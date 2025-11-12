"use client";

import { useEffect, useRef } from "react";
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
  const isFetchingRef = useRef(false);

  const games = data?.pages.flatMap((page) => page.results) || [];

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "300px",
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
    <div className="relative">
      <GameList games={games} triggerRef={ref} />
      <div className="flex min-h-[100px] items-center justify-center py-8">
        {isFetchingNextPage ? (
          <div className="flex items-center gap-3">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-300 border-t-gray-500" />
            <span className="text-zinc-400">로딩 중...</span>
          </div>
        ) : hasNextPage ? (
          <div className="text-lg font-medium text-zinc-400">
            스크롤하여 더 보기
          </div>
        ) : games.length > 0 ? (
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
    </div>
  );
}
