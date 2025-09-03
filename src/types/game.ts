export interface Game {
  id: number;
  slug?: string;
  name: string;
  released?: string | null;
  tba?: boolean;
  background_image: string;
  rating?: number;
  rating_top?: number;
  ratings?: Record<string, number>;
  ratings_count?: number;
  reviews_text_count?: number;
  added?: number;
  added_by_status?: Record<string, number>;
  metacritic?: number | null;
  playtime?: number;
  suggestions_count?: number;
  updated?: string;
  esrb_rating?: { id: number; name: string; slug: string } | null;
  platforms?: Array<{
    platform: {
      id: number;
      name: string;
      slug: string;
    };
  }>;
  genres?: Genre[];
}

export interface Genre {
  id: number;
  name: string;
  slug: string;
  games_count?: number;
  image_background?: string;
}
