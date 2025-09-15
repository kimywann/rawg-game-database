import { Game } from "@/types/game";
import Image from "next/image";
import Link from "next/link";

interface SearchDropdownProps {
  games: Game[];
  loading: boolean;
  error: string | null;
  onClose: () => void;
}

export default function SearchDropdown({
  games,
  loading,
  error,
  onClose,
}: SearchDropdownProps) {
  if (loading) {
    return (
      <div className="absolute top-full w-full rounded-b-md bg-zinc-800 p-4 shadow-lg">
        <p className="text-gray-400">검색 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="absolute top-full w-full rounded-b-md bg-zinc-800 p-4 shadow-lg">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (games.length === 0) {
    return null;
  }

  return (
    <div className="absolute z-50 w-full overflow-y-auto rounded-md bg-black">
      <ul className="max-h-96">
        {games.map((game) => (
          <li key={game.id} className="p-3">
            <Link href={`/games/${game.slug}`} onClick={onClose}>
              <div className="flex items-center gap-3">
                {game.background_image ? (
                  <Image
                    src={game.background_image}
                    alt={game.name}
                    width={100}
                    height={100}
                    className="h-10 w-10 rounded-md object-cover hover:opacity-50"
                  />
                ) : (
                  <div className="h-10 w-10 rounded-md bg-zinc-800 hover:opacity-50" />
                )}
                <span className="font-semibold text-white hover:text-zinc-500">
                  {game.name}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
