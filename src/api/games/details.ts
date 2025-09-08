import { apiClient } from "../apiClient";
import { GameDetail } from "@/types/game";
import { ScreenShotResponse } from "@/types/api";

export const getGameByDetail = async (
  slug: string,
): Promise<GameDetail | null> => {
  try {
    const { data } = await apiClient.get<GameDetail>(`/games/${slug}`);
    return data;
  } catch (error) {
    console.error(`Failed to fetch game with slug ${slug}:`, error);
    return null;
  }
};

export const getGameScreenshots = async (
  gameId: string | number,
  params?: {
    ordering?: string;
    page?: number;
    page_size?: number;
  },
): Promise<ScreenShotResponse> => {
  try {
    const requestParams = {
      ordering: params?.ordering || "-id",
      page: params?.page || 1,
      page_size: params?.page_size || 50,
    };

    const { data } = await apiClient.get<ScreenShotResponse>(
      `/games/${gameId}/screenshots`,
      {
        params: requestParams,
      },
    );

    return data;
  } catch (error) {
    console.error(`Failed to fetch screenshots for game ${gameId}:`, error);
    return {
      count: 0,
      results: [],
    };
  }
};
