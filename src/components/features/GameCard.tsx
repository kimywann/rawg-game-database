import { Game } from "@/types/game";

import Link from "next/link";
import Image from "next/image";
import { memo } from "react";

import added from "@/assets/icons/added.svg";

import PlatformIcon from "@/components/ui/PlatformIcon";
import { getUniquePlatformGroups } from "@/utils/platformMapping";

interface GameCardProps {
  game: Game;
  priority?: boolean;
}

const GameCard = memo(({ game, priority = false }: GameCardProps) => {
  return (
    <li className="mx-auto mb-6 flex w-full max-w-80 flex-col overflow-hidden rounded-lg bg-zinc-800 transition-all duration-300 hover:scale-105">
      <div className="relative h-40 w-80 overflow-hidden">
        {game.background_image ? (
          <Image
            src={game.background_image}
            alt={game.name}
            width={320}
            height={160}
            priority={priority}
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          />
        ) : (
          <div className="flex h-40 w-80 items-center justify-center bg-zinc-700">
            <span className="text-sm text-zinc-500">No image</span>
          </div>
        )}
      </div>

      <div className="flex flex-col justify-between p-3">
        <Link href={`/games/${game.slug}`}>
          <h2 className="cursor-pointer text-2xl leading-tight font-bold text-white transition-colors hover:text-zinc-500">
            {game.name}
          </h2>
        </Link>
        <div className="mt-2 flex h-6 w-13 items-center justify-center gap-1 rounded-md bg-zinc-700 p-2">
          <Image src={added} alt="added" className="h-2 w-2 flex-shrink-0" />
          <p className="text-sm text-white">{game.added}</p>
        </div>

        {/* 플랫폼 아이콘 섹션 - 중복 제거 */}
        {game.platforms && game.platforms.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {getUniquePlatformGroups(game.platforms).map((platformGroup) => (
              <PlatformIcon
                key={platformGroup}
                platformSlug={platformGroup}
                className="h-5 w-5 text-zinc-300 transition-colors hover:text-white"
              />
            ))}
          </div>
        )}

        <div className="mt-2 divide-y divide-zinc-700">
          <div className="flex justify-between py-1">
            <p className="text-sm text-zinc-300">Release date:</p>
            <p className="text-sm">{game.released}</p>
          </div>

          <div className="flex justify-between py-1">
            <p className="text-sm text-zinc-300">Genres:</p>
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
});

GameCard.displayName = "GameCard";

export default GameCard;
