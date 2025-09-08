import { NextRequest, NextResponse } from "next/server";
import {
  getNewAndTrendingGames,
  getBestOfTheYearGames,
  getTop250Games,
  getAllGames,
} from "@/api/games";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const type = searchParams.get("type") || "trending";

    let data;
    let errorMessage;

    switch (type) {
      case "trending":
        data = await getNewAndTrendingGames(page);
        errorMessage = "Failed to fetch trending games";
        break;
      case "best-of-the-year":
        data = await getBestOfTheYearGames(page);
        errorMessage = "Failed to fetch best of the year games";
        break;
      case "top-250":
        data = await getTop250Games(page);
        errorMessage = "Failed to fetch top 250 games";
        break;
      case "all-games":
        data = await getAllGames(page);
        errorMessage = "Failed to fetch all games";
        break;
      default:
        return NextResponse.json(
          { error: "Invalid type parameter" },
          { status: 400 },
        );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch games:", error);
    return NextResponse.json(
      { error: "Failed to fetch games" },
      { status: 500 },
    );
  }
}
