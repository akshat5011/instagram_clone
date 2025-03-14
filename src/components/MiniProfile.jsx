"use client";
import { signOut, useSession } from "next-auth/react";

export default function MiniProfile() {
  const { data: session } = useSession();
  return (
    <div className="flex items-center justify-between mt-14 ml-10">
      <img
        src={session?.user.image ? session.user.image : "/defaultPfp.png"}
        className="h-16 rounded-full border p-[2px]"
        alt="Profile Picture"
      />
      <div className="flex-1 ml-4">
        <h2 className="font-bold ">{session?.user.username}</h2>
        <h3 className="text-sm text-gray-40">Welcome to Instone!!</h3>
      </div>
      <button onClick={signOut} className="font-semibold text-blue-400 text-sm cursor-pointer">
        Sign Out
      </button>
    </div>
  );
}
