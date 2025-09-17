"use client";

import Image from "next/image";
import searchIcon from "@/assets/icons/search.svg";
import closeIcon from "@/assets/icons/close.svg";
import { useRouter } from "next/navigation";

import { useState } from "react";

interface SearchBarProps {
  onSearch: (search: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleClose = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    setSearchTerm("");
    onSearch("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          className="w-full rounded-4xl bg-zinc-600 p-2 pl-10 text-gray-300 placeholder-zinc-400 opacity-90 shadow-lg hover:bg-white hover:text-black focus:outline-none"
          value={searchTerm}
          onChange={handleChange}
        />
        <Image
          src={searchIcon}
          alt="search"
          className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2"
        />
        {searchTerm && (
          <Image
            src={closeIcon}
            alt="close"
            className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 cursor-pointer"
            onClick={handleClose}
          />
        )}
      </div>
    </form>
  );
}
