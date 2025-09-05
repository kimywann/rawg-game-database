import { getGamesByMonth } from "@/api/gamesApi";
import GameList from "@/components/features/GameList";
import MonthNavigation from "@/components/ui/MonthNavigation";
import { notFound } from "next/navigation";

interface ReleaseCalendarMonthPageProps {
  params: Promise<{
    params: string[];
  }>;
}

const getMonthName = (month: number): string => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months[month - 1];
};

const ReleaseCalendarMonthPage = async ({
  params,
}: ReleaseCalendarMonthPageProps) => {
  // params를 await로 기다리기
  const resolvedParams = await params;

  // URL이 /video-game-releases/2025-9 형태로 오면 params.params = ["2025-9"]
  if (!resolvedParams.params || resolvedParams.params.length === 0) {
    notFound();
  }

  const yearMonth = resolvedParams.params[0];
  const [yearStr, monthStr] = yearMonth.split("-");
  const year = parseInt(yearStr);
  const month = parseInt(monthStr);

  // 유효성 검사
  if (isNaN(year) || isNaN(month) || month < 1 || month > 12) {
    notFound();
  }

  const games = await getGamesByMonth(year, month);
  const monthName = getMonthName(month);

  return (
    <div className="flex">
      <main className="flex w-full flex-col items-center lg:flex-1 lg:items-start">
        <div className="flex flex-col items-center gap-2 text-center lg:items-start lg:text-left">
          <h1 className="text-4xl font-bold sm:text-5xl lg:text-7xl">
            Release calendar -
          </h1>
          <h1 className="text-4xl font-bold sm:text-5xl lg:text-7xl">
            {monthName} {year}
          </h1>
        </div>

        <div className="mt-6 w-full lg:mt-10">
          <MonthNavigation currentYear={year} currentMonth={month} />

          <section className="w-full">
            {games.length > 0 ? (
              <GameList games={games} />
            ) : (
              <div className="py-12 text-center text-gray-400">
                <p className="text-xl">이 달에 출시 예정인 게임이 없습니다.</p>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default ReleaseCalendarMonthPage;
