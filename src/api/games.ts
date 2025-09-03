import { apiClient } from "./apiClient";

import { Game } from "@/types/game";
import { ApiResponse } from "@/types/api";

// 트렌딩 게임 가져오기 (10개)
export const getTrendingGames = async (): Promise<Game[]> => {
  try {
    const { data } = await apiClient.get<ApiResponse>("/games", {
      params: {
        page: 1,
        page_size: 10,
        ordering: "-added",
      },
    });

    return data.results;
  } catch (error) {
    console.error("Failed to fetch trending games:", error);
    return [];
  }
};
