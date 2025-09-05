import logo from "@/assets/logo.svg";

import Image from "next/image";
import Link from "next/link";

import SearchBar from "@/components/ui/SearchBar";

const Header = () => {
  return (
    <header>
      <div className="flex items-center justify-between p-8">
        <Link href="/">
          <Image src={logo} alt="logo" className="cursor-pointer" />
        </Link>
        <div className="flex-grow">{/* <SearchBar /> */}</div>
      </div>
    </header>
  );
};

export default Header;
