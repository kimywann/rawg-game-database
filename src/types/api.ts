import { Game } from "./game";
import { ScreenShot } from "./screen-shot";

export interface ApiResponse {
  count: number;
  next?: string | null;
  previous?: string | null;
  results: Game[];
}

export interface ScreenShotResponse {
  count: number;
  next?: string | null;
  previous?: string | null;
  results: ScreenShot[];
}
