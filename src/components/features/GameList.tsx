"use client";

import { Game } from "@/types/game";
import GameCard from "@/components/features/GameCard";
import { useEffect, useRef, useState, useMemo, useCallback } from "react";

interface GameListProps {
  games: Game[];
  onRender?: (isRendered: boolean) => void;
}

const GameList = ({ games, onRender }: GameListProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [columnCount, setColumnCount] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  const updateColumnCount = useCallback(() => {
    if (window.innerWidth >= 1800) setColumnCount(5);
    else if (window.innerWidth >= 1536) setColumnCount(4);
    else if (window.innerWidth >= 1280) setColumnCount(3);
    else if (window.innerWidth >= 834) setColumnCount(2);
    else setColumnCount(1);

    if (!isInitialized) {
      setIsInitialized(true);
    }
  }, [isInitialized]);

  useEffect(() => {
    updateColumnCount();
    window.addEventListener("resize", updateColumnCount);
    return () => window.removeEventListener("resize", updateColumnCount);
  }, [updateColumnCount]);

  const columns = useMemo(() => {
    if (!isInitialized || columnCount === 0) return [];

    const newColumns = Array.from({ length: columnCount }, () => [] as Game[]);
    games.forEach((game, index) => {
      const colIndex = index % columnCount;
      const rowIndex = Math.floor(index / columnCount);

      const priority = rowIndex <= 1;
      newColumns[colIndex].push({ ...game, priority });
    });

    return newColumns;
  }, [games, columnCount, isInitialized]);

  useEffect(() => {
    const isRendered = isInitialized && columnCount !== 0 && games.length > 0;
    onRender?.(isRendered);
  }, [isInitialized, columnCount, games.length, onRender]);

  if (!isInitialized || columnCount === 0) {
    return (
      <div className="flex flex-wrap justify-center gap-5">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="w-full max-w-80 animate-pulse sm:w-[calc(50%-10px)] xl:w-[calc(33.333%-14px)] 2xl:w-[calc(25%-15px)] [@media(min-width:1800px)]:w-[calc(20%-16px)]"
          >
            <div className="mb-3 h-60 w-full rounded-lg bg-zinc-700"></div>
            <div className="mb-3 h-5 w-full rounded-lg bg-zinc-700"></div>
          </div>
        ))}
      </div>
    );
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
