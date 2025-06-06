"use client";
import { Funnel, Menu, Search, ShoppingCart, UserRound, X } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Drawer } from "vaul";

function HeaderRightControls() {
  return (
    <div className="flex gap-5 items-center">
      {/* search input */}
      <div className="bg-[#F2F4F8] hidden md:flex items-center justify-between gap-2 rounded-full px-4 py-2 w-[200px]">
        <Search size={20} color="#697077" />
        <input
          type="text"
          placeholder="Search For..."
          className="w-full outline-none"
        />
        <Funnel size={20} color="#697077" />
      </div>

      {/* <button className="flex md:hidden cursor-pointer">
        <Search size={20} color="#000000" />
      </button> */}
      {/*  */}
      {/* <Link href="/cart">
        <ShoppingCart size={23} />
      </Link> */}

      <Link href="/login" className="hidden md:flex">
        <UserRound size={23} />
      </Link>

      <div className="flex md:hidden ">
        <Drawer.Root direction="left">
          <Drawer.Trigger className="py-2 text-2xl md:text-3xl cursor-pointer">
            <Menu />
          </Drawer.Trigger>
          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 bg-black/40" />
            <Drawer.Content className="bg-gray-50 h-full fixed bottom-0 left-0 right-0 z-50 outline-none">
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <img alt="logo" src={"/logo_.svg"} className="w-[180px] " />
                  <Drawer.Close className="text-2xl cursor-pointer">
                    <X />
                  </Drawer.Close>
                </div>
                <div className="flex flex-col gap-4 pt-10">
                  <Link className="bg-gray-100 p-2" href="#">
                    Home
                  </Link>
                  <Link className="bg-gray-100 p-2" href="#">
                    Store
                  </Link>
                  <Link className="bg-gray-100 p-2" href="#">
                    Contact
                  </Link>
                  <Link className="bg-gray-100 p-2" href="/login">
                    Admin
                  </Link>

                  <Drawer.Close className="text-2xl cursor-pointer">
                    <div className="h-10 bg-[#EB4374] rounded-md flex items-center justify-center text-sm text-white">
                      Close
                    </div>
                  </Drawer.Close>
                </div>
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      </div>
    </div>
  );
}

export default HeaderRightControls;
