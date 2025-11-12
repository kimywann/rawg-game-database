const SKELETON_ITEM_COUNT = 14;

export const Skeleton = () => {
  return (
    <div className="flex flex-wrap justify-center gap-5">
      {Array.from({ length: SKELETON_ITEM_COUNT }).map((_, i) => (
        <div
          key={i}
          className="w-full max-w-80 animate-pulse sm:w-[calc(50%-10px)] xl:w-[calc(33.333%-14px)] 2xl:w-[calc(25%-15px)] [@media(min-width:1800px)]:w-[calc(20%-16px)]"
        >
          <div className="mx-auto mb-6 flex w-full max-w-80 flex-col overflow-hidden rounded-lg bg-zinc-800">
            <div className="h-40 w-80 animate-pulse bg-zinc-700" />
            <div className="flex flex-1 flex-col gap-3 p-3">
              <div className="h-6 w-3/4 animate-pulse rounded bg-zinc-700" />
              <div className="h-5 w-1/3 animate-pulse rounded bg-zinc-700" />
              <div className="h-5 w-1/2 animate-pulse rounded bg-zinc-700" />
              <div className="mt-auto space-y-2">
                <div className="h-4 w-full animate-pulse rounded bg-zinc-700" />
                <div className="h-4 w-5/6 animate-pulse rounded bg-zinc-700" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
