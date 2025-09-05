import { useInfiniteQuery } from "@tanstack/react-query";
import { ApiResponse } from "@/types/api";

const fetchTop250Games = async ({ pageParam }: { pageParam: number }) => {
  const response = await fetch(`/api/games?type=top-250&page=${pageParam}`, {
    cache: "no-store", // 캐시 비활성화
  });

  if (!response.ok) {
    throw new Error("Failed to fetch top 250 games");
  }

  return response.json();
};

interface UseGetTop250GamesOptions {
  initialData?: {
    pages: ApiResponse[];
    pageParams: number[];
  };
  initialPageParam?: number;
}

const useGetTop250Games = (options?: UseGetTop250GamesOptions) => {
  return useInfiniteQuery({
    queryKey: ["top-250-games"],
    queryFn: fetchTop250Games,
    getNextPageParam: (lastPage, allPages) => {
      // 250개 게임 제한: 현재까지 불러온 총 게임 수가 250개 이상이면 멈춤
      const totalGamesLoaded = allPages.reduce(
        (total, page) => total + page.results.length,
        0,
      );

      if (totalGamesLoaded >= 250) {
        return undefined;
      }

      // API에서 더 이상 데이터가 없으면 멈춤
      if (!lastPage.next) {
        return undefined;
      }

      return allPages.length + 1;
    },
    initialPageParam: options?.initialPageParam || 1,
    staleTime: 1000 * 60 * 5, // 5분으로 단축
    gcTime: 1000 * 60 * 10, // 10분으로 단축
    refetchOnWindowFocus: false,
    refetchOnMount: true, // 마운트 시 다시 가져오기 활성화
    ...(options?.initialData && { initialData: options.initialData }),
  });
};

export default useGetTop250Games;
