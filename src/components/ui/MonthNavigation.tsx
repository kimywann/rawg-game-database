"use client";

import { useRouter } from "next/navigation";

interface MonthNavigationProps {
  currentYear: number;
  currentMonth: number;
}

const MonthNavigation = ({
  currentYear,
  currentMonth,
}: MonthNavigationProps) => {
  const router = useRouter();

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const handleMonthClick = (monthIndex: number) => {
    const month = monthIndex + 1;
    router.push(`/video-game-releases/${currentYear}-${month}`);
  };

  const isCurrentMonth = (monthIndex: number) => {
    return monthIndex + 1 === currentMonth;
  };

  return (
    <nav className="mb-6 flex flex-wrap gap-2">
      {months.map((month, index) => (
        <button
          key={month}
          onClick={() => handleMonthClick(index)}
          className={`cursor-pointer rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            isCurrentMonth(index)
              ? "bg-white text-black"
              : "text-gray-400 underline underline-offset-4 hover:bg-gray-700 hover:text-white"
          }`}
        >
          {month}
        </button>
      ))}
    </nav>
  );
};

export default MonthNavigation;
