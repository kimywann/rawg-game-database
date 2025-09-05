import { useInfiniteQuery } from "@tanstack/react-query";
import { ApiResponse } from "@/types/api";

const fetchTrendingGames = async ({ pageParam }: { pageParam: number }) => {
  const response = await fetch(`/api/games/trending?page=${pageParam}`, {
    cache: "force-cache",
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch trending games");
  }

  return response.json();
};

interface UseGetTrendingGamesOptions {
  initialData?: {
    pages: ApiResponse[];
    pageParams: number[];
  };
  initialPageParam?: number;
}

const useGetTrendingGames = (options?: UseGetTrendingGamesOptions) => {
  return useInfiniteQuery({
    queryKey: ["trending-games"],
    queryFn: fetchTrendingGames,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.next) {
        return allPages.length + 1;
      }
      return undefined;
    },
    initialPageParam: options?.initialPageParam || 1,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    ...(options?.initialData && { initialData: options.initialData }),
  });
};

export default useGetTrendingGames;
