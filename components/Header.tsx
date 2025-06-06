import Link from "next/link";
import React from "react";
import HeaderLinks from "./HeaderLinks";
import HeaderRightControls from "./HeaderRightControls";
import { Drawer } from "vaul";

function Header() {
  return (
    <div className="h-[70px] overflow-hidden bg-white sticky top-0 z-[100] left-0  w-full flex items-center justify-between px-6 md:px-14 shadow-sm border-b border-[#DDE1E6]">
      <Link href={"/"}>
        <img alt="logo" src={"/logo.png"} className="w-[100px] -ml-4  " />
      </Link>

      <div className="hidden md:flex">
        <HeaderLinks />
      </div>

      <HeaderRightControls />
    </div>
  );
}

export default Header;
