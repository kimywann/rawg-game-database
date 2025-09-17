"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Modal } from "@/components/common/Modal";
import { ScreenShot } from "@/types/screen-shot";

interface GameImageModalProps {
  gameName: string;
  backgroundImage: string;
  allImages: ScreenShot[];
}

export const GameImageModal = ({
  gameName,
  backgroundImage,
  allImages,
}: GameImageModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const handleGalleryClick = (event: Event) => {
      const target = event.target as HTMLElement;

      if (target.closest('[data-gallery-trigger="true"]')) {
        const trigger = target.closest(
          '[data-gallery-trigger="true"]',
        ) as HTMLElement;

        if (trigger.dataset.viewAll === "true") {
          setSelectedImageIndex(0);
        } else if (trigger.dataset.imageIndex) {
          setSelectedImageIndex(parseInt(trigger.dataset.imageIndex));
        }

        setIsModalOpen(true);
      }
    };

    document.addEventListener("click", handleGalleryClick);
    return () => document.removeEventListener("click", handleGalleryClick);
  }, []);

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
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <div className="flex h-full flex-col">
        <div className="relative flex flex-1 items-center justify-center px-30">
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

          <Image
            src={allImages[selectedImageIndex]?.image || backgroundImage}
            alt={`${gameName} screenshot ${selectedImageIndex + 1}`}
            width={allImages[selectedImageIndex]?.width || 1920}
            height={allImages[selectedImageIndex]?.height || 1080}
            className="h-[300px] w-full object-contain sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[500px] 2xl:h-[600px]"
          />
        </div>

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
                      className="mt-10 h-[68px] w-[120px] object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
