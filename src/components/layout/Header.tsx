"use client";

import logo from "@/assets/logo.svg";
import Image from "next/image";
import Link from "next/link";

import { useSidebar } from "@/hooks/useSideber";
import { useState, useEffect, useRef } from "react";

import SearchBar from "../search/SearchBar";
import SearchDropdown from "../search/SearchDropdown";

const Header = () => {
  const { toggleSidebar } = useSidebar();
  const [searchTerm, setSearchTerm] = useState("");
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchTerm.length < 1) {
      setGames([]);
      setLoading(false);
      return;
    }

    const fetchGames = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `/api/games?search=${encodeURIComponent(searchTerm)}&dropdown=true`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch games");
        }

        const data = await response.json();
        setGames(data.results);
      } catch (error) {
        setError("게임 정보를 불러오는 데 실패했습니다.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchGames();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setSearchTerm("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header>
      <div className="relative z-20 flex items-center justify-between p-6">
        <Link href="/">
          <Image src={logo} alt="logo" className="cursor-pointer" />
        </Link>
        <div className="relative mx-4 flex-grow">
          <SearchBar onSearch={setSearchTerm} />
          {searchTerm.length >= 2 && (
            <div className="relative z-50" ref={dropdownRef}>
              <SearchDropdown
                games={games}
                loading={loading}
                error={error}
                onClose={() => {
                  setSearchTerm("");
                }}
              />
            </div>
          )}
        </div>
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
