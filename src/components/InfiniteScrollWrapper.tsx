"use client";

import { useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer";

import GameList from "./features/GameList";
import useGetTrendingGames from "@/api/useGetTrendingGames";
import useGetBestOfTheYearGames from "@/api/useGetBestOfTheYearGames";
import useGetTop250Games from "@/api/useGetTop250Games";
import useGetAllGames from "@/api/useGetAllGames";

import { ApiResponse } from "@/types/api";

interface InfiniteScrollWrapperProps {
  initialData: ApiResponse;
  type: "trending" | "best-of-the-year" | "top-250" | "all-games";
}

export default function InfiniteScrollWrapper({
  initialData,
  type,
}: InfiniteScrollWrapperProps) {
  const trendingQuery = useGetTrendingGames(
    type === "trending"
      ? {
          initialPageParam: 2,
          initialData: {
            pages: [initialData],
            pageParams: [1],
          },
        }
      : undefined,
  );

  const bestOfTheYearQuery = useGetBestOfTheYearGames(
    type === "best-of-the-year"
      ? {
          initialPageParam: 2,
          initialData: {
            pages: [initialData],
            pageParams: [1],
          },
        }
      : undefined,
  );

  const top250Query = useGetTop250Games(
    type === "top-250"
      ? {
          initialPageParam: 2,
          initialData: {
            pages: [initialData],
            pageParams: [1],
          },
        }
      : undefined,
  );

  const allGamesQuery = useGetAllGames(
    type === "all-games"
      ? {
          initialPageParam: 2,
          initialData: {
            pages: [initialData],
            pageParams: [1],
          },
        }
      : undefined,
  );

  const getQueryByType = () => {
    switch (type) {
      case "trending":
        return trendingQuery;
      case "best-of-the-year":
        return bestOfTheYearQuery;
      case "top-250":
        return top250Query;
      case "all-games":
        return allGamesQuery;
      default:
        return trendingQuery;
    }
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    getQueryByType();

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
