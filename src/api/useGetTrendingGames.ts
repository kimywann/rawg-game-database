import { useInfiniteQuery } from "@tanstack/react-query";

const fetchTrendingGames = async ({ pageParam }: { pageParam: number }) => {
  const response = await fetch(`/api/games/trending?page=${pageParam}`);

  if (!response.ok) {
    throw new Error("Failed to fetch trending games");
  }

  return response.json();
};

const useGetTrendingGames = () => {
  return useInfiniteQuery({
    queryKey: ["trending-game"],
    queryFn: fetchTrendingGames,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.next) {
        return allPages.length + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });
};

export default useGetTrendingGames;
