import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { ApiResponse } from "@/types/api-response";

const fetchGames = async ({
  type,
  pageParam,
  searchQuery,
}: {
  type: string;
  pageParam: number;
  searchQuery?: string;
}) => {
  const baseUrl =
    typeof window === "undefined"
      ? process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
      : "";

  let url = `${baseUrl}/api/games?page=${pageParam}`;

  if (searchQuery) {
    url += `&search=${encodeURIComponent(searchQuery)}`;
  } else {
    url += `&type=${type}`;
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${searchQuery ? "search" : type} games`);
  }

  return response.json();
};

interface UseGamesOptions {
  initialData?: {
    pages: ApiResponse[];
    pageParams: number[];
  };
  initialPageParam?: number;
  searchQuery?: string;
}

const useGetGames = (type: string, options?: UseGamesOptions) => {
  const queryKey = options?.searchQuery
    ? ["search", options.searchQuery]
    : ["games", type];

  return useSuspenseInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) =>
      fetchGames({
        pageParam,
        type,
        searchQuery: options?.searchQuery,
      }),
    getNextPageParam: (lastPage, allPages) => {
      if (type === "top-250" && !options?.searchQuery) {
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
    staleTime: options?.searchQuery ? 1000 * 60 * 5 : 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    ...(options?.initialData && { initialData: options.initialData }),
  });
};

export default useGetGames;
