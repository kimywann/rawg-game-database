"use client";

import Link from "next/link";
import Image from "next/image";
import { useSidebar } from "@/contexts/SidebarContext";

import lastMonth from "@/assets/icons/new-releases/last-30-days.svg";
import releaseCalendar from "@/assets/icons/new-releases/release-calendar.svg";
import bestOfTheYear from "@/assets/icons/top/best-of-the-year.svg";
import allTimeTop250 from "@/assets/icons/top/all-time-top-250.svg";

const SideBar = () => {
  const { isOpen, closeSidebar } = useSidebar();

  return (
    <>
      {/* 데스크톱 사이드바 */}
      <aside className="hidden w-64 min-w-64 pr-6 lg:block">
        <nav className="flex flex-col gap-4">
          <Link
            href="/"
            className="text-xl font-bold transition-colors hover:text-zinc-400"
          >
            Home
          </Link>
          <div>
            <section>
              <div className="mt-2">
                <span className="text-2xl font-bold">Top</span>
                <ul className="mt-3 flex flex-col">
                  <li>
                    <Link href="/discover/best-of-the-year">
                      <div className="flex cursor-pointer items-center gap-3 rounded-md p-2 transition-colors hover:bg-zinc-700">
                        <Image
                          src={bestOfTheYear}
                          alt="best-of-the-year"
                          className="h-8 w-8 flex-shrink-0 rounded-md bg-zinc-600 p-1"
                        />
                        <span>Best of the year</span>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link href="/discover/all-time-top">
                      <div className="flex cursor-pointer items-center gap-3 rounded-md p-2 transition-colors hover:bg-zinc-700">
                        <Image
                          src={allTimeTop250}
                          alt="all-time-top-250"
                          className="h-8 w-8 flex-shrink-0 rounded-md bg-zinc-600 p-1"
                        />
                        <span>All-time top 250</span>
                      </div>
                    </Link>
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

      {/* 모바일 오버레이 사이드바 */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* 배경 오버레이 */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={closeSidebar}
          />

          {/* 사이드바 */}
          <aside className="absolute top-0 left-0 h-full w-64 rounded-r-lg bg-zinc-900/99 p-6 shadow-lg">
            {/* 닫기 버튼 */}
            <div className="mb-6 flex justify-end">
              <button
                onClick={closeSidebar}
                className="rounded-md p-2 transition-colors hover:bg-zinc-700"
                aria-label="메뉴 닫기"
              >
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* 네비게이션 메뉴 */}
            <nav className="flex flex-col gap-4">
              <Link
                href="/"
                onClick={closeSidebar}
                className="text-2xl font-bold transition-colors hover:text-zinc-400"
              >
                Home
              </Link>
              <div>
                <section>
                  <div className="mt-2">
                    <span className="text-2xl font-bold">Top</span>
                    <ul className="mt-3 flex flex-col">
                      <li>
                        <Link
                          href="/discover/best-of-the-year"
                          onClick={closeSidebar}
                        >
                          <div className="flex cursor-pointer items-center gap-3 rounded-md p-2 transition-colors hover:bg-zinc-700">
                            <Image
                              src={bestOfTheYear}
                              alt="best-of-the-year"
                              className="h-8 w-8 flex-shrink-0 rounded-md bg-zinc-600 p-1"
                            />
                            <span>Best of the year</span>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/discover/all-time-top"
                          onClick={closeSidebar}
                        >
                          <div className="flex cursor-pointer items-center gap-3 rounded-md p-2 transition-colors hover:bg-zinc-700">
                            <Image
                              src={allTimeTop250}
                              alt="all-time-top-250"
                              className="h-8 w-8 flex-shrink-0 rounded-md bg-zinc-600 p-1"
                            />
                            <span>All-time top 250</span>
                          </div>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </section>
                <div className="mt-4">
                  <Link
                    href="/games"
                    onClick={closeSidebar}
                    className="text-xl font-bold transition-colors hover:text-zinc-400"
                  >
                    All Games
                  </Link>
                </div>
              </div>
            </nav>
          </aside>
        </div>
      )}
    </>
  );
};

export default SideBar;
