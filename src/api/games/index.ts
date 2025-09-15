import { fetchGames, searchGames } from "./helpers";
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

export const getSearchGames = async (
  searchTerm: string,
): Promise<ApiResponse> => {
  return searchGames({
    search: searchTerm,
    page_size: 7,
  });
};

export const getSearchPageGames = async (
  searchTerm: string,
  page: number = 1,
): Promise<ApiResponse> => {
  return searchGames({
    search: searchTerm,
    page: page,
    page_size: 20,
  });
};
