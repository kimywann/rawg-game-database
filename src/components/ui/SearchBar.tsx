import Image from "next/image";

import searchIcon from "@/assets/icons/search.svg";
import closeIcon from "@/assets/icons/close.svg";

export default function SearchBar() {
  return (
    <form>
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          className="w-full rounded-4xl bg-zinc-600 p-2 pl-10 text-gray-300 placeholder-zinc-400 opacity-90 shadow-lg hover:bg-white hover:text-black focus:outline-none"
        />
        <Image
          src={searchIcon}
          alt="search"
          className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2"
        />
        <Image
          src={closeIcon}
          alt="close"
          className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2"
        />
      </div>
    </form>
  );
}
