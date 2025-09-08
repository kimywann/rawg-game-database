"use client";

import { Game } from "@/types/game";
import GameCard from "@/components/features/GameCard";
import { useEffect, useRef, useState, useMemo, useCallback } from "react";

interface GameListProps {
  games: Game[];
}

const GameList = ({ games }: GameListProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [columnCount, setColumnCount] = useState(0);

  const updateColumnCount = useCallback(() => {
    if (window.innerWidth >= 1800) setColumnCount(5);
    else if (window.innerWidth >= 1536) setColumnCount(4);
    else if (window.innerWidth >= 1280) setColumnCount(3);
    else if (window.innerWidth >= 834) setColumnCount(2);
    else setColumnCount(1);
  }, []);

  useEffect(() => {
    updateColumnCount();
    window.addEventListener("resize", updateColumnCount);
    return () => window.removeEventListener("resize", updateColumnCount);
  }, [updateColumnCount]);

  const columns = useMemo(() => {
    if (columnCount === 0) return [];

    const newColumns = Array.from({ length: columnCount }, () => [] as Game[]);
    games.forEach((game, index) => {
      const priority = index < 10;
      newColumns[index % columnCount].push({ ...game, priority });
    });
    return newColumns;
  }, [games, columnCount]);

  if (columnCount === 0) {
    return null;
  }

  return (
    <div ref={containerRef} className="flex gap-4">
      {columns.map((columnGames, columnIndex) => (
        <div key={columnIndex} className="flex-1 space-y-4">
          {columnGames.map((game, gameIndex) => (
            <GameCard
              key={`${game.id}-${columnIndex}-${gameIndex}`}
              game={game}
              priority={game.priority}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default GameList;
