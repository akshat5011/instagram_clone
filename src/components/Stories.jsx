"use client"
import React, { use, useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import Story from "./Story";

export default function Stories() {
  const [storyUsers, setStoryUsers] = useState([]);

  useEffect(() => {
    const storyUser = Array.from({ length: 20 }, (_, i)=> ({
      username: faker.person.fullName(),
      pfp: faker.image.avatar(),
      id: i,
    }));
    setStoryUsers(storyUser);
  }, []);
  return (
    <div>
      {storyUsers.map((users) => (
        <Story key={users.id} img={users.pfp} username={users.username} />
      ))}
    </div>
  );
}