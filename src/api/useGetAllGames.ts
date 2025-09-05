import { useInfiniteQuery } from "@tanstack/react-query";
import { ApiResponse } from "@/types/api";

const fetchAllGames = async ({ pageParam }: { pageParam: number }) => {
  const response = await fetch(`/api/games?type=all-games&page=${pageParam}`, {
    cache: "no-store", // 캐시 비활성화
  });

  if (!response.ok) {
    throw new Error("Failed to fetch all games");
  }

  return response.json();
};

interface UseGetAllGamesOptions {
  initialData?: {
    pages: ApiResponse[];
    pageParams: number[];
  };
  initialPageParam?: number;
}

const useGetAllGames = (options?: UseGetAllGamesOptions) => {
  return useInfiniteQuery({
    queryKey: ["all-games"],
    queryFn: fetchAllGames,
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

export default useGetAllGames;
