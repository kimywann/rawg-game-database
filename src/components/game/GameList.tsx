"use client";

import { Game } from "@/types/game";
import GameCard from "@/components/game/GameCard";
import { memo, useLayoutEffect, useState } from "react";
import { useWindowVirtualizer } from "@tanstack/react-virtual";

interface Props {
  games: Game[];
  rowHeight?: number;
  triggerRef?: (node?: Element | null) => void;
}

function useColumns() {
  const resolveColumns = (width: number) => {
    if (width >= 1800) return 5;
    if (width >= 1536) return 4;
    if (width >= 1280) return 3;
    if (width >= 640) return 2;
    return 1;
  };

  const [columns, setColumns] = useState(1);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const updateColumns = () => {
      const nextColumns = resolveColumns(window.innerWidth);
      setColumns((prev) => (prev !== nextColumns ? nextColumns : prev));
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  return columns;
}

const GameList = memo(({ games, rowHeight = 380, triggerRef }: Props) => {
  const columns = useColumns();

  const rowCount = Math.ceil(games.length / columns);

  const rowVirtualizer = useWindowVirtualizer({
    count: rowCount,
    estimateSize: () => rowHeight,
    overscan: 3,
  });

  const virtualItems = rowVirtualizer.getVirtualItems();

  return (
    <div className="w-full" role="region" aria-label="게임 목록">
      <div
        suppressHydrationWarning
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {virtualItems.map((virtualRow) => {
          const startIndex = virtualRow.index * columns;
          const items = games.slice(startIndex, startIndex + columns);

          const isNearEnd = virtualRow.index >= rowCount - 2;

          return (
            <div
              key={virtualRow.key}
              data-index={virtualRow.index}
              ref={isNearEnd ? triggerRef : undefined}
              suppressHydrationWarning
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
                display: "grid",
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
                gap: "1rem",
              }}
            >
              {items.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
});

GameList.displayName = "GameList";

export default GameList;
