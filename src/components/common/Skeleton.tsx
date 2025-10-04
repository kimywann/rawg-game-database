export const Skeleton = () => {
  return (
    <div className="flex flex-wrap justify-center gap-5">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="w-full max-w-80 animate-pulse sm:w-[calc(50%-10px)] xl:w-[calc(33.333%-14px)] 2xl:w-[calc(25%-15px)] [@media(min-width:1800px)]:w-[calc(20%-16px)]"
        >
          <div className="mb-3 h-80 w-full rounded-lg bg-zinc-700"></div>
          <div className="mb-3 h-5 w-full rounded-lg bg-zinc-700"></div>
        </div>
      ))}
    </div>
  );
};
