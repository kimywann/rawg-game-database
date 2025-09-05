import { NextRequest, NextResponse } from "next/server";
import { getNewAndTrendingGames } from "@/api/gamesApi";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");

    const data = await getNewAndTrendingGames(page);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch trending games:", error);
    return NextResponse.json(
      { error: "Failed to fetch trending games" },
      { status: 500 },
    );
  }
}
