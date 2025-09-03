import { Game } from "@/types/game";
import GameCard from "@/components/features/GameCard";

interface GameListProps {
  games: Game[]; // 게임 목록(배열)을 받는다
}

const GameList = ({ games }: GameListProps) => {
  return (
    <ul className="columns-1 space-y-0 gap-x-4 sm:columns-1 lg:columns-2 xl:columns-3 2xl:columns-5">
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </ul>
  );
};

export default GameList;
