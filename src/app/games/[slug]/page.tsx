import Link from "next/link";
import { notFound } from "next/navigation";
import { getGameByDetail, getGameScreenshots } from "@/api/gamesApi";
import { GameImageGallery } from "@/components/features/GameImageGallery";

interface SlugPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const SlugPage = async ({ params }: SlugPageProps) => {
  const { slug } = await params;

  // 병렬로 게임 정보와 스크린샷 가져오기
  const [game, screenshots] = await Promise.all([
    getGameByDetail(slug),
    getGameScreenshots(slug),
  ]);

  if (!game) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-6xl px-4">
      {/* 브레드크럼 네비게이션 */}
      <div className="flex items-center gap-2 text-xs text-zinc-500">
        <Link href="/" className="transition-colors hover:text-white">
          HOME
        </Link>
        <span>/</span>
        <Link href="/games" className="transition-colors hover:text-white">
          GAMES
        </Link>
        <span>/</span>
        <span>{game.name.toUpperCase()}</span>
      </div>

      <section className="flex flex-col gap-8 lg:flex-row">
        {/* 게임 정보 섹션 */}
        <div className="mt-5 flex flex-1 flex-col gap-4">
          {/* 출시일 */}
          {game.released && (
            <div className="flex h-5 w-22 items-center justify-center rounded-sm bg-white text-sm font-light text-black">
              <p>{game.released}</p>
            </div>
          )}

          {/* 게임 제목 */}
          <h1 className="text-4xl font-bold lg:text-7xl">{game.name}</h1>

          {/* 평점 정보 */}
          {game.rating && (
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold">⭐ {game.rating}</span>
              {game.ratings_count && (
                <span className="text-sm text-zinc-400">
                  ({game.ratings_count.toLocaleString()} reviews)
                </span>
              )}
            </div>
          )}

          {/* 플랫폼 정보 */}
          {game.platforms && game.platforms.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {game.platforms.slice(0, 5).map((platformData) => (
                <span
                  key={platformData.platform.id}
                  className="rounded bg-zinc-800 px-2 py-1 text-xs"
                >
                  {platformData.platform.name}
                </span>
              ))}
            </div>
          )}

          {/* 장르 정보 */}
          {game.genres && game.genres.length > 0 && (
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-bold">Genres</h3>
              <div className="flex flex-wrap gap-2">
                {game.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="rounded-full bg-zinc-600 px-3 py-1 text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 게임 설명 */}
          <div className="mt-5 flex flex-col gap-2">
            <h3 className="text-2xl font-bold">About</h3>
            {game.description ? (
              <div
                className="prose prose-invert max-w-none text-sm text-white"
                dangerouslySetInnerHTML={{ __html: game.description }}
              />
            ) : (
              <p className="text-sm text-zinc-400">게임 설명이 없습니다.</p>
            )}
          </div>
        </div>

        {/* 이미지 갤러리 섹션 */}
        <GameImageGallery
          gameName={game.name}
          backgroundImage={game.background_image}
          screenshots={screenshots.results}
          totalScreenshotCount={screenshots.count}
        />
      </section>
    </main>
  );
};

export default SlugPage;
