import { Suspense } from "react";

import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { Skeleton } from "@/components/ui/Skeleton";
import InfiniteScrollWrapper from "@/components/common/InfiniteScrollWrapper";

export default async function BestOfTheYearPage() {
  return (
    <div className="flex">
      <main className="flex w-full flex-col items-center lg:flex-1 lg:items-start">
        <div className="flex flex-col items-center gap-2 text-center lg:items-start lg:text-left">
          <h1 className="text-3xl font-bold sm:text-5xl lg:text-7xl">
            Best of the year
          </h1>
        </div>
        <section className="w-full">
          <div className="mt-6 lg:mt-10">
            <ErrorBoundary>
              <Suspense fallback={<Skeleton />}>
                <InfiniteScrollWrapper type="best-of-the-year" />
              </Suspense>
            </ErrorBoundary>
          </div>
        </section>
      </main>
    </div>
  );
}
