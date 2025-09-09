import { apiClient } from "../client";
import { Game } from "@/types/game";

interface FetchGamesParams {
  page: number;
  page_size: number;
  ordering: string;
  dates?: string;
}

export const filterGames = (games: Game[]) => {
  return games.filter(
    (game) =>
      !game.genres?.some(
        (genre) =>
          genre.name.toLowerCase() === "casual" ||
          genre.slug === "casual" ||
          genre.name.toLowerCase() === "massively multiplayer" ||
          genre.slug === "massively-multiplayer",
      ),
  );
};

export const fetchGames = async (params: FetchGamesParams) => {
  try {
    const { data } = await apiClient.get("/games", { params });
    const filteredGames = filterGames(data.results);

    return {
      count: filteredGames.length,
      next: data.next,
      previous: data.previous,
      results: filteredGames,
    };
  } catch (error) {
    console.error("Failed to fetch games:", error);
    return {
      count: 0,
      next: null,
      previous: null,
      results: [],
    };
  }
};
