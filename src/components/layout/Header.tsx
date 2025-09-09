"use client";

import logo from "@/assets/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { useSidebar } from "@/hooks/useSideber";

const Header = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <header>
      <div className="flex items-center justify-between p-8">
        <Link href="/">
          <Image src={logo} alt="logo" className="cursor-pointer" />
        </Link>
        <div className="flex-grow">{/* <SearchBar /> */}</div>
        <button
          onClick={toggleSidebar}
          className="rounded-md p-2 transition-colors hover:bg-zinc-700 lg:hidden"
          aria-label="메뉴 열기"
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
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
