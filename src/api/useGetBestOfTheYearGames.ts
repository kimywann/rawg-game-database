import { useInfiniteQuery } from "@tanstack/react-query";
import { ApiResponse } from "@/types/api";

const fetchBestOfTheYearGames = async ({
  pageParam,
}: {
  pageParam: number;
}) => {
  const response = await fetch(
    `/api/games?type=best-of-the-year&page=${pageParam}`,
    {
      cache: "no-store", // 캐시 비활성화
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch best of the year games");
  }

  return response.json();
};

interface UseGetBestOfTheYearGamesOptions {
  initialData?: {
    pages: ApiResponse[];
    pageParams: number[];
  };
  initialPageParam?: number;
}

const useGetBestOfTheYearGames = (
  options?: UseGetBestOfTheYearGamesOptions,
) => {
  return useInfiniteQuery({
    queryKey: ["best-of-the-year-games"],
    queryFn: fetchBestOfTheYearGames,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.next) {
        return allPages.length + 1;
      }
      return undefined;
    },
    initialPageParam: options?.initialPageParam || 1,
    staleTime: 1000 * 60 * 5, // 5분으로 단축
    gcTime: 1000 * 60 * 10, // 10분으로 단축
    refetchOnWindowFocus: false,
    refetchOnMount: true, // 마운트 시 다시 가져오기 활성화
    ...(options?.initialData && { initialData: options.initialData }),
  });
};

export default useGetBestOfTheYearGames;
