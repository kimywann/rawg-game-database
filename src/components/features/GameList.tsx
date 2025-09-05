"use client";

import { Game } from "@/types/game";
import GameCard from "@/components/features/GameCard";
import { useEffect, useRef, useState } from "react";

interface GameListProps {
  games: Game[];
}

const GameList = ({ games }: GameListProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [columnCount, setColumnCount] = useState(1);

  useEffect(() => {
    const updateColumnCount = () => {
      if (window.innerWidth >= 1536) setColumnCount(5);
      else if (window.innerWidth >= 1280) setColumnCount(3);
      else if (window.innerWidth >= 1024) setColumnCount(2);
      else setColumnCount(1);
    };

    updateColumnCount();
    window.addEventListener("resize", updateColumnCount);
    return () => window.removeEventListener("resize", updateColumnCount);
  }, []);

  const columns = Array.from({ length: columnCount }, () => [] as Game[]);
  games.forEach((game, index) => {
    columns[index % columnCount].push(game);
  });

  return (
    <div ref={containerRef} className="flex gap-4">
      {columns.map((columnGames, columnIndex) => (
        <div key={columnIndex} className="flex-1 space-y-4">
          {columnGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default GameList;
