import Image from "next/image";
import { ScreenShot } from "@/types/screen-shot";
import { GameImageModal } from "./GameImageModal";

interface GameImageGalleryProps {
  gameName: string;
  backgroundImage: string;
  screenshots: ScreenShot[];
  totalScreenshotCount: number;
}

export const GameImageGallery = ({
  gameName,
  backgroundImage,
  screenshots,
  totalScreenshotCount,
}: GameImageGalleryProps) => {
  const displayImages =
    screenshots.length > 0
      ? screenshots.map((screenshot) => screenshot.image)
      : [backgroundImage];

  const allImages =
    screenshots.length > 0
      ? screenshots
      : [
          {
            id: 0,
            image: backgroundImage,
            hidden: false,
            width: 1920,
            height: 1080,
          },
        ];

  return (
    <>
      <div className="flex w-full flex-col gap-4 lg:w-1/2">
        {/* 메인 이미지 */}
        <div className="flex max-w-[520px] flex-col gap-4">
          <div className="relative aspect-video w-full">
            <Image
              src={
                displayImages[0] || backgroundImage || "/placeholder-game.jpg"
              }
              alt={gameName}
              fill
              className="cursor-pointer rounded-lg object-cover transition-opacity hover:opacity-90"
              quality={75}
              sizes="(max-width: 768px) 100vw, 520px"
              data-image-index="0"
              data-gallery-trigger="true"
            />
          </div>
        </div>

        {/* 썸네일 이미지들 */}
        {displayImages.length > 1 && (
          <div className="grid max-w-[520px] grid-cols-2 gap-2">
            {displayImages.slice(1, 4).map((image, index) => (
              <Image
                key={index}
                src={image}
                alt={`${gameName} screenshot ${index + 2}`}
                width={200}
                height={112}
                quality={50}
                priority={true}
                className="w-full cursor-pointer rounded object-cover transition-opacity hover:opacity-80"
                style={{ height: "130px" }}
                data-image-index={index + 1}
                data-gallery-trigger="true"
              />
            ))}

            {totalScreenshotCount > 4 && (
              <button
                className="flex h-[130px] w-full cursor-pointer items-center justify-center rounded bg-zinc-800 opacity-70 transition-opacity hover:opacity-90"
                data-view-all="true"
                data-gallery-trigger="true"
              >
                <span className="text-sm font-medium text-white">view all</span>
              </button>
            )}
          </div>
        )}
      </div>

      <GameImageModal
        gameName={gameName}
        backgroundImage={backgroundImage}
        allImages={allImages}
      />
    </>
  );
};
