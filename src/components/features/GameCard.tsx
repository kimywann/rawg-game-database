import { Game } from "@/types/game";
import Image from "next/image";

interface GameCardProps {
  game: Game;
}

const GameCard = ({ game }: GameCardProps) => {
  return (
    <li className="mx-auto mb-6 flex w-full max-w-80 break-inside-avoid flex-col overflow-hidden rounded-lg bg-zinc-800 transition-all duration-300 hover:scale-105">
      <div className="relative h-40 w-80 overflow-hidden">
        <Image
          src={game.background_image}
          alt={game.name}
          fill
          className="object-cover"
          sizes="320px"
        />
      </div>

      {/* 텍스트 영역 - 동적 높이 */}
      <div className="flex flex-col justify-between p-3">
        <h2 className="cursor-pointer text-2xl leading-tight font-bold text-white transition-colors hover:text-zinc-500">
          {game.name}
        </h2>
        <p className="mt-2 flex h-5 w-10 items-center justify-center rounded-md bg-zinc-700 text-sm text-zinc-500">
          {game.added}
        </p>
        <div className="mt-2 divide-y divide-zinc-700">
          <div className="flex justify-between py-1">
            <p className="text-sm text-zinc-500">Release date:</p>
            <p className="text-sm">{game.released}</p>
          </div>

          <div className="flex justify-between py-1">
            <p className="text-sm text-zinc-500">Genres:</p>
            <div className="mt-1 flex flex-wrap gap-1">
              {game.genres?.map((genre, idx) => (
                <span key={genre.id} className="text-xs">
                  {genre.name}
                  {idx < (game.genres?.length ?? 0) - 1 && ","}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default GameCard;
