import { Suspense } from "react";

import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { GameListSkeleton } from "@/components/ui/GameListSkeleton";
import InfiniteScrollWrapper from "@/components/common/InfiniteScrollWrapper";

export default async function AllTimeTopPage() {
  return (
    <div className="flex">
      <main className="flex w-full flex-col items-center lg:flex-1 lg:items-start">
        <div className="flex flex-col items-center gap-2 text-center lg:items-start lg:text-left">
          <h1 className="text-3xl font-bold sm:text-5xl lg:text-7xl">
            All-time top 250
          </h1>
        </div>
        <section className="w-full">
          <div className="mt-6 lg:mt-10">
            <ErrorBoundary>
              <Suspense fallback={<GameListSkeleton />}>
                <InfiniteScrollWrapper type="top-250" />
              </Suspense>
            </ErrorBoundary>
          </div>
        </section>
      </main>
    </div>
  );
}
