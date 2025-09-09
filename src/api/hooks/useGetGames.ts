import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { ApiResponse } from "@/types/api-response";

const fetchGames = async ({
  type,
  pageParam,
}: {
  type: string;
  pageParam: number;
}) => {
  const baseUrl =
    typeof window === "undefined"
      ? process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
      : "";

  const response = await fetch(
    `${baseUrl}/api/games?type=${type}&page=${pageParam}`,
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch ${type} games`);
  }

  return response.json();
};

interface UseGamesOptions {
  initialData?: {
    pages: ApiResponse[];
    pageParams: number[];
  };
  initialPageParam?: number;
}

const useGetGames = (type: string, options?: UseGamesOptions) => {
  return useSuspenseInfiniteQuery({
    queryKey: ["games", type],
    queryFn: ({ pageParam }) => fetchGames({ pageParam, type }),
    getNextPageParam: (lastPage, allPages) => {
      if (type === "top-250") {
        const totalGamesLoaded = allPages.reduce(
          (total, page) => total + page.results.length,
          0,
        );

        if (totalGamesLoaded >= 250) {
          return undefined;
        }
      }

      if (!lastPage.next) {
        return undefined;
      }

      return allPages.length + 1;
    },
    initialPageParam: options?.initialPageParam || 1,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    ...(options?.initialData && { initialData: options.initialData }),
  });
};

export default useGetGames;
