export const GameListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="mb-3 h-60 w-60 rounded-lg bg-zinc-700"></div>
          <div className="mb-3 h-5 w-60 rounded-lg bg-zinc-700"></div>
        </div>
      ))}
    </div>
  );
};
