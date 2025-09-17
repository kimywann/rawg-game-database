import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getGameByDetail, getGameScreenshots } from "@/api/games/details";
import { GameImageGallery } from "@/components/game/GameImageGallery";

interface SlugPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const SlugPage = async ({ params }: SlugPageProps) => {
  const { slug } = await params;

  const [game, screenshots] = await Promise.all([
    getGameByDetail(slug),
    getGameScreenshots(slug),
  ]);

  if (!game) notFound();

  return (
    <div className="relative min-h-screen w-full items-center justify-center">
      {game.background_image && (
        <div className="fixed inset-0 -z-10">
          <Image
            src={game.background_image}
            alt={`${game.name} background`}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/80" />
        </div>
      )}

      <main className="relative z-10 w-full px-4">
        <div className="flex items-center gap-2 text-xs text-zinc-300">
          <Link href="/" className="transition-colors hover:text-white">
            HOME
          </Link>
          <span>/</span>
          <Link href="/games" className="transition-colors hover:text-white">
            GAMES
          </Link>
          <span>/</span>
          <span className="text-white">{game.name.toUpperCase()}</span>
        </div>

        <section className="flex flex-col gap-8 lg:flex-row">
          <div className="mt-5 flex flex-1 flex-col gap-4">
            {game.released && (
              <div className="flex h-5 w-22 items-center justify-center rounded-sm bg-white text-sm font-light text-black">
                <p>{game.released}</p>
              </div>
            )}

            <h2 className="text-4xl font-bold text-white">{game.name}</h2>

            {game.rating && (
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold text-white">
                  ⭐ {game.rating}
                </span>
                {game.ratings_count && (
                  <span className="text-sm text-zinc-300">
                    ({game.ratings_count.toLocaleString()} reviews)
                  </span>
                )}
              </div>
            )}

            {game.platforms && game.platforms.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {game.platforms.slice(0, 5).map((platformData) => (
                  <span
                    key={platformData.platform.id}
                    className="rounded bg-zinc-800/80 px-2 py-1 text-xs text-white backdrop-blur-sm"
                  >
                    {platformData.platform.name}
                  </span>
                ))}
              </div>
            )}

            {game.genres && game.genres.length > 0 && (
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold text-white">Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {game.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="rounded-full bg-zinc-600/80 px-3 py-1 text-sm text-white backdrop-blur-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-5 flex flex-col gap-2">
              <h3 className="text-2xl font-bold text-white">About</h3>
              {game.description ? (
                <div
                  className="prose prose-invert max-w-none text-sm text-white"
                  dangerouslySetInnerHTML={{ __html: game.description }}
                />
              ) : (
                <p className="text-sm text-zinc-300">게임 설명이 없습니다.</p>
              )}
            </div>
          </div>

          <GameImageGallery
            gameName={game.name}
            backgroundImage={game.background_image}
            screenshots={screenshots.results}
            totalScreenshotCount={screenshots.count}
          />
        </section>
      </main>
    </div>
  );
};

export default SlugPage;
