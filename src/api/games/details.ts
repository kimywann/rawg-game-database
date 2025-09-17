import { GameDetail } from "@/types/game";
import { ScreenShotResponse } from "@/types/api-response";

const API_BASE_URL = "https://api.rawg.io/api";
const API_KEY = process.env.RAWG_API_KEY;

export const getGameByDetail = async (
  slug: string,
): Promise<GameDetail | null> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/games/${slug}?key=${API_KEY}`,
      {
        next: {
          revalidate: 1800,
        },
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch game with slug ${slug}:`, error);
    return null;
  }
};

export const getGameScreenshots = async (
  gameId: string | number,
): Promise<ScreenShotResponse> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/games/${gameId}/screenshots?key=${API_KEY}&page_size=10`,
      {
        next: {
          revalidate: 86400,
        },
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch screenshots for game ${gameId}:`, error);
    return { count: 0, results: [] };
  }
};
