"use client";

import { useState, useEffect } from "react";
import { Game } from "@/types/game";
import GameList from "@/components/features/GameList";
import { Skeleton } from "@/components/ui/Skeleton";

interface SearchResultsProps {
  query: string;
}

export default function SearchResults({ query }: SearchResultsProps) {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const searchGames = async () => {
      if (!query.trim()) {
        setGames([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/games?search=${encodeURIComponent(query)}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch games");
        }

        const data = await response.json();
        setGames(data.results);
      } catch (err) {
        setError("검색 중 오류가 발생했습니다.");
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    };

    searchGames();
  }, [query]);

  if (loading) {
    return <Skeleton />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!query.trim()) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-gray-400">검색어를 입력해주세요.</p>
      </div>
    );
  }

  if (games.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-gray-400">검색 결과가 없습니다.</p>
      </div>
    );
  }

  return <GameList games={games} />;
}
