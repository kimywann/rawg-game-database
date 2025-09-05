"use client";

import { useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer";

import GameList from "./features/GameList";
import useGetTrendingGames from "@/api/useGetTrendingGames";

import { ApiResponse } from "@/types/api";

interface InfiniteScrollWrapperProps {
  initialData: ApiResponse;
}

export default function InfiniteScrollWrapper({
  initialData,
}: InfiniteScrollWrapperProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetTrendingGames({
      initialPageParam: 2,
      initialData: {
        pages: [initialData],
        pageParams: [1],
      },
    });

  const games = data?.pages.flatMap((page) => page.results) || [];
  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: "100px",
  });

  const handleFetchNextPage = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage && !isLoading) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, isLoading, fetchNextPage]);

  useEffect(() => {
    if (inView) {
      handleFetchNextPage();
    }
  }, [inView, handleFetchNextPage]);

  return (
    <>
      <GameList games={games} />
      <div ref={ref} className="flex h-20 items-center justify-center">
        {isFetchingNextPage ? (
          <div className="text-lg font-medium text-gray-600">
            Loading more games...
          </div>
        ) : hasNextPage ? (
          <div className="text-lg font-medium text-gray-500">
            Scroll to load more
          </div>
        ) : (
          <div className="text-center">
            <h2 className="mb-2 text-2xl font-bold text-gray-800">
              🎮 모든 게임을 확인했습니다!
            </h2>
            <p className="text-gray-600">더 이상 로드할 게임이 없습니다.</p>
          </div>
        )}
      </div>
    </>
  );
}
