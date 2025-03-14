"use client";
import Image from "next/image";
import React from "react";
import {
  MagnifyingGlassIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { HomeModernIcon } from "@heroicons/react/24/solid";
import { signIn, signOut, useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { openModal } from "@/store/modalSlice";
import { useRouter } from "next/navigation";

export default function Header() {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <div className="shadow-sm border-b sticky top-0 bg-white z-30">
      <div className="flex items-center justify-between max-w-6xl mx-4 xl:mx-auto">
        {/* left */}
        <div className="cursor-pointer h-24 w-24 relative hidden lg:inline-grid">
          <Image
            src="/Instone.png"
            fill
            alt="Instone"
            className="object-contain"
            onClick={() => router.push("/")}
          />
        </div>
        <div className="cursor-pointer h-24 w-10 relative  lg:hidden">
          <Image
            src="/icon.png"
            fill
            alt="Insto LOGO"
            className="object-contain"
            onClick={() => router.push("/")}
          />
        </div>

        {/* Middle */}
        <div className="relative">
          <div className="absolute top-2 left-2">
            <MagnifyingGlassIcon className="h-5 text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Search"
            className="bg-gray-50 h-7 pl-10 p-4 max-sm:w-[200px] border-2 border-gray-500 text-base focus:ring-black focus:border-black rounded-md"
          />
        </div>

        {/* Right */}
        <div className="flex space-x-4 items-center">
          <HomeModernIcon
            className="hidden md:inline-flex  h-6 cursor-pointer hover:scale-125 transition-tranform duration-200 ease-out"
            onClick={() => router.push("/")}
          />
          {session ? (
            <>
              <PlusCircleIcon
                onClick={() => dispatch(openModal())}
                className="h-6 cursor-pointer hover:scale-125 transition-tranform duration-200 ease-out"
              />
              <img
                onClick={signOut}
                src={
                  session.user.image ? session.user.image : "/defaultPfp.png"
                }
                alt="user-pfp"
                className="h-10 rounded-full cursor-pointer"
              />
            </>
          ) : (
            <>
              <button onClick={signIn} className="cursor-pointer">
                Sign in
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
