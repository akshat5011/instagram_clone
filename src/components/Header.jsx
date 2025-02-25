import Image from "next/image";
import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function Header() {
  return (
    <div className="flex items-center justify-between max-w-6xl">
      <div className="cursor-pointer h-24 w-24 relative hidden lg:inline-grid">
        <Image src="/Instone.png" layout="fill" className="object-contain" />
      </div>
      <div className="cursor-pointer h-24 w-10 relative  lg:hidden">
        <Image src="/icon.png" layout="fill" className="object-contain" />
      </div>

      <div className="relative ">
        <div className="absolute top-1 left-2">
          <MagnifyingGlassIcon className="h-5 text-gray-500" />
        </div>
        <input
          type="text"
          placeholder="Search"
          className="bg-gray-50 h-7 pl-10 px-1 border-gray-500 text-base focus:ring-black focus:border-black rounded-md"
        />
      </div>

      <h1>Right sides</h1>
    </div>
  );
}
