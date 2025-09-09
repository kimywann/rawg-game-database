import { apiClient } from "../client";

import { fetchGames } from "./helpers";
import { ApiResponse } from "@/types/api-response";

export const getNewAndTrendingGames = async (
  page: number,
): Promise<ApiResponse> => {
  return fetchGames({
    page: page,
    page_size: 20,
    ordering: "-added",
    dates: "2025-01-01,2026-12-30",
  });
};

export const getBestOfTheYearGames = async (
  page: number,
): Promise<ApiResponse> => {
  return fetchGames({
    page: page,
    page_size: 20,
    ordering: "-playtime",
    dates: "2025-01-01,2025-12-31",
  });
};

export const getTop250Games = async (page: number): Promise<ApiResponse> => {
  return fetchGames({
    page: page,
    page_size: 20,
    ordering: "-metacritic",
  });
};

export const getAllGames = async (page: number): Promise<ApiResponse> => {
  return fetchGames({
    page: page,
    page_size: 20,
    ordering: "-added",
  });
};

export const getGamesByMonth = async (
  year: number,
  month: number,
): Promise<ApiResponse> => {
  try {
    const startDate = `${year}-${month.toString().padStart(2, "0")}-01`;
    // 해당 월의 마지막 날 계산 (다음 달 0일 = 이번 달 마지막 날)
    const lastDay = new Date(year, month, 0).getDate();
    const endDate = `${year}-${month.toString().padStart(2, "0")}-${lastDay.toString().padStart(2, "0")}`;

    console.log(`Fetching games for ${startDate} to ${endDate}`); // 디버깅용

    const { data } = await apiClient.get<ApiResponse>("/games", {
      params: {
        dates: `${startDate},${endDate}`,
        ordering: "released",
        page_size: 20,
      },
    });

    const filteredGames = data.results.filter(
      (game) =>
        !game.genres?.some(
          (genre) =>
            genre.name.toLowerCase() === "casual" ||
            genre.slug === "casual" ||
            genre.name.toLowerCase() === "massively multiplayer" ||
            genre.slug === "massively-multiplayer",
        ),
    );

    return {
      count: filteredGames.length,
      next: data.next,
      previous: data.previous,
      results: filteredGames,
    };
  } catch (error) {
    console.error("Failed to fetch games by month:", error);
    return {
      count: 0,
      next: null,
      previous: null,
      results: [],
    };
  }
};
