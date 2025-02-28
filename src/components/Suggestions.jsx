"use client";
import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";

export default function Suggestions() {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const suggest = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      name: faker.internet.username().toLowerCase(),
      pfp: faker.image.personPortrait({ size: "512" }),
      jobtitle: faker.person.jobTitle(),
    }));
    setSuggestions(suggest);
  }, []);
  return (
    <div className="mt-5 ml-10">
      <div className="flex justify-between mb-5 text-sm">
        <h3 className="font-bold text-gray-400">Suggestions for you</h3>
        <button className="text-gray-600 font-semibold">See All</button>
      </div>
      {suggestions.map((suggestion) => (
        <div
          key={suggestion.id}
          className="flex justify-between items-center mt-3"
        >
          <img
            src={suggestion.pfp}
            alt={suggestion.name}
            className="h-14 rounded-full border p-[2px]"
          />
          <div className="flex-1 ml-4">
            <h2 className="font-semibold text-sm">{suggestion.name}</h2>
            <h3 className="text-sm text-gray-400 truncate w-[230px]">
              {suggestion.jobtitle}
            </h3>
          </div>
          <button className="font-semibold text-blue-400 text-sm">
            Follow
          </button>
        </div>
      ))}
    </div>
  );
}
