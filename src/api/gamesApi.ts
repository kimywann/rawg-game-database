import { apiClient } from "./apiClient";

import { Game, GameDetail } from "@/types/game";
import { ApiResponse, ScreenShotResponse } from "@/types/api";

// 트렌딩 게임 가져오기
export const getNewAndTrendingGames = async (
  page: number,
): Promise<ApiResponse> => {
  try {
    const { data } = await apiClient.get<ApiResponse>("/games", {
      params: {
        page: page,
        page_size: 20,
        ordering: "-added",
        dates: "2025-01-01,2026-12-30",
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
    console.error("Failed to fetch new and trending games:", error);
    return {
      count: 0,
      next: null,
      previous: null,
      results: [],
    };
  }
};

// 월별 릴리즈 게임 가져오기
export const getGamesByMonth = async (
  year: number,
  month: number,
): Promise<Game[]> => {
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
        page_size: 50,
      },
    });

    // Casual 장르를 가진 게임들을 필터링해서 제외
    const filteredGames = data.results.filter(
      (game) =>
        !game.genres?.some(
          (genre) =>
            genre.name.toLowerCase() === "casual" || genre.slug === "casual",
        ),
    );

    return filteredGames;
  } catch (error) {
    console.error("Failed to fetch games by month:", error);
    return [];
  }
};

// 게임 상세 정보 가져오기
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

// 게임 스크린샷 가져오기
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

    // 디버깅: 실제 요청 URL과 파라미터 확인
    console.log("Request URL:", `/games/${gameId}/screenshots`);
    console.log("Request params:", requestParams);

    const { data } = await apiClient.get<ScreenShotResponse>(
      `/games/${gameId}/screenshots`,
      {
        params: requestParams,
      },
    );

    // 디버깅: 응답 데이터 확인
    console.log("API Response:", data);

    return data;
  } catch (error) {
    console.error(`Failed to fetch screenshots for game ${gameId}:`, error);
    return {
      count: 0,
      results: [],
    };
  }
};
