"use client";
import React, { use, useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import Story from "./Story";
import { useSession } from "next-auth/react";

export default function Stories() {
  const [storyUsers, setStoryUsers] = useState([]);
  const { data: session } = useSession();
  console.log(session)

  useEffect(() => {
    const storyUser = Array.from({ length: 20 }, (_, i) => ({
      username: faker.internet.username().toLowerCase(),
      pfp: faker.image.personPortrait({ size: "512" }),
      id: i,
    }));
    setStoryUsers(storyUser);
  }, []);
  return (
    <div className="flex space-x-2 p-6 bg-white mt-8 border-gray-200 border overflow-x-scroll rounded-sm scrollbar-none">
      {session && (
        <Story
          img={session.user.image}
          username={session.user.username}
          isUser="true"
        />
      )}
      {storyUsers.map((users) => (
        <Story key={users.id} img={users.pfp} username={users.username} />
      ))}
    </div>
  );
}
// npm install --save-dev tailwind-scrollbar
