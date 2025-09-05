"use client";

import { useState } from "react";
import Image from "next/image";
import { Modal } from "@/components/ui/Modal";
import { ScreenShot } from "@/types/screen-shot";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // 스크린샷이 없는 경우 background_image를 사용
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

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const handleViewAllClick = () => {
    setSelectedImageIndex(1);
    setIsModalOpen(true);
  };

  const navigateImage = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setSelectedImageIndex((prev) =>
        prev === 0 ? allImages.length - 1 : prev - 1,
      );
    } else {
      setSelectedImageIndex((prev) =>
        prev === allImages.length - 1 ? 0 : prev + 1,
      );
    }
  };

  const handleThumbnailClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  return (
    <>
      <div className="flex w-full flex-col gap-4 lg:w-1/2">
        {/* 메인 이미지 */}
        <div className="flex max-w-[520px] flex-col gap-4">
          <Image
            src={displayImages[0] || backgroundImage || "/placeholder-game.jpg"}
            alt={gameName}
            width={520}
            height={300}
            className="h-auto w-full cursor-pointer rounded-lg object-cover transition-opacity hover:opacity-90"
            priority
            onClick={() => handleImageClick(0)}
          />
        </div>

        {/* 썸네일 이미지들 */}
        {displayImages.length > 1 && (
          <div className="grid grid-cols-2 gap-x-3 gap-y-4">
            {displayImages.slice(1, 4).map((image, index) => (
              <Image
                key={index}
                src={image}
                alt={`${gameName} screenshot ${index + 2}`}
                width={250}
                height={140}
                className="cursor-pointer rounded object-cover transition-opacity hover:opacity-80"
                onClick={() => handleImageClick(index + 1)}
              />
            ))}

            {/* "view all" 버튼 (스크린샷이 4개 이상인 경우) */}
            {totalScreenshotCount > 4 && (
              <button
                onClick={handleViewAllClick}
                className="flex h-[140px] w-full cursor-pointer items-center justify-center rounded-md bg-zinc-800 opacity-70 transition-opacity hover:opacity-99"
              >
                <span className="text-sm font-medium text-white">view all</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* 이미지 모달 */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="flex h-full flex-col">
          {/* 메인 이미지 영역 */}
          <div className="relative flex flex-1 items-center justify-center px-20 py-8">
            {/* 네비게이션 버튼들 - 이미지 위에 위치 */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={() => navigateImage("prev")}
                  className="absolute top-1/2 left-2 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-zinc-900 p-4 text-white transition-all hover:scale-110 hover:bg-white hover:text-black"
                  aria-label="Previous image"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                <button
                  onClick={() => navigateImage("next")}
                  className="absolute top-1/2 right-2 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-zinc-900 p-4 text-white transition-all hover:scale-110 hover:bg-white hover:text-black"
                  aria-label="Next image"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </>
            )}

            {/* 현재 선택된 이미지 */}
            <Image
              src={allImages[selectedImageIndex]?.image || backgroundImage}
              alt={`${gameName} screenshot ${selectedImageIndex + 1}`}
              width={allImages[selectedImageIndex]?.width || 1920}
              height={allImages[selectedImageIndex]?.height || 1080}
              className="h-[400px] w-full object-contain sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] 2xl:h-[800px]"
            />
          </div>

          {/* 하단 썸네일 영역 */}
          {allImages.length > 1 && (
            <div className="bg-opacity-50 bg-black">
              <div className="flex justify-center">
                <div className="flex max-w-full gap-2 overflow-x-auto">
                  {allImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => handleThumbnailClick(index)}
                      className={`relative flex-shrink-0 cursor-pointer overflow-hidden rounded-lg transition-all duration-300 ${
                        index === selectedImageIndex
                          ? "opacity-100"
                          : "opacity-40 hover:opacity-75"
                      }`}
                    >
                      <Image
                        src={image.image}
                        alt={`${gameName} thumbnail ${index + 1}`}
                        width={120}
                        height={68}
                        className="h-[68px] w-[120px] object-cover"
                      />
                      {/* 선택된 이미지에 오버레이 효과 제거 */}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};
