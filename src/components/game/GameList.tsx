"use client";

import { Game } from "@/types/game";
import GameCard from "@/components/game/GameCard";
import { memo } from "react";

interface GameListProps {
  games: Game[];
}

const GameList = memo(({ games }: GameListProps) => {
  return (
    <div
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 [@media(min-width:1800px)]:grid-cols-5"
      role="region"
      aria-label="게임 목록"
    >
      {games.map((game, index) => (
        <GameCard key={game.id} game={game} priority={index < 10} />
      ))}
    </div>
  );
});

GameList.displayName = "GameList";

export default GameList;
