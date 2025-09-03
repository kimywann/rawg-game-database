import Link from "next/link";
import Image from "next/image";

import lastMonth from "@/assets/icons/new-releases/last-30-days.svg";
import releaseCalendar from "@/assets/icons/new-releases/release-calendar.svg";

import bestOfTheYear from "@/assets/icons/top/best-of-the-year.svg";
import allTimeTop250 from "@/assets/icons/top/all-time-top-250.svg";

const SideBar = () => {
  return (
    <aside className="hidden w-64 min-w-64 pr-6 lg:block">
      <nav className="flex flex-col gap-4">
        <Link
          href="/"
          className="text-xl font-bold transition-colors hover:text-zinc-400"
        >
          Home
        </Link>
        <Link
          href="/reviews/popular"
          className="text-xl font-bold transition-colors hover:text-zinc-400"
        >
          Reviews
        </Link>
        <div>
          <section>
            <span className="text-xl font-bold">New Releases</span>
            <ul className="mt-3 flex flex-col">
              <li>
                <div className="flex cursor-pointer items-center gap-3 rounded-md p-2 transition-colors hover:bg-gray-700">
                  <Image
                    src={lastMonth}
                    alt="last-30-days"
                    className="h-8 w-8 flex-shrink-0 rounded-md bg-zinc-600 p-1"
                  />
                  <span className="whitespace-nowrap text-gray-200">
                    Last 30 days
                  </span>
                </div>
              </li>
              <li>
                <div className="flex cursor-pointer items-center gap-3 rounded-md p-2 transition-colors hover:bg-gray-700">
                  <Image
                    src={releaseCalendar}
                    alt="release-calendar"
                    className="h-8 w-8 flex-shrink-0 rounded-md bg-zinc-600 p-1"
                  />
                  <span className="whitespace-nowrap text-gray-200">
                    Release calendar
                  </span>
                </div>
              </li>
            </ul>
          </section>
          <section>
            <div className="mt-2">
              <span className="text-2xl font-bold">Top</span>
              <ul className="mt-3 flex flex-col">
                <li>
                  <div className="flex cursor-pointer items-center gap-3 rounded-md p-2 transition-colors hover:bg-gray-700">
                    <Image
                      src={bestOfTheYear}
                      alt="best-of-the-year"
                      className="h-8 w-8 flex-shrink-0 rounded-md bg-zinc-600 p-1"
                    />
                    <span>Best of the year</span>
                  </div>
                </li>
                <li>
                  <div className="flex cursor-pointer items-center gap-3 rounded-md p-2 transition-colors hover:bg-gray-700">
                    <Image
                      src={allTimeTop250}
                      alt="all-time-top-250"
                      className="h-8 w-8 flex-shrink-0 rounded-md bg-zinc-600 p-1"
                    />
                    <span>All-time top 250</span>
                  </div>
                </li>
              </ul>
            </div>
          </section>
          <div className="mt-4">
            <Link
              href="/games"
              className="text-xl font-bold transition-colors hover:text-zinc-400"
            >
              All Games
            </Link>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default SideBar;
