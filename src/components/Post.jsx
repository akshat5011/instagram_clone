import {
  BookmarkIcon,
  ChatBubbleOvalLeftIcon,
  FaceSmileIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import React from "react";

export default function Post({ id, username, userPfp, postImg, caption }) {
  return (
    <div className="bg-white my-7 border rounded-md">
      {/* Post Header */}
      <div className="flex items-center p-5">
        <img
          src={userPfp}
          alt={username}
          className="rounded-full h-12 object-cover border p-1 mr-3"
        />
        <p className="font-bold flex-1">{username}</p>
        <EllipsisHorizontalIcon className="h-5" />
      </div>

      {/* Post Image */}
      <img className="object-cover w-full" src={postImg} alt="" />

      {/* Post Buttons  */}
      <div className="flex justify-between px-4 pt-4">
        <div className="flex space-x-4">
          <HeartIcon className="btn" />
          <ChatBubbleOvalLeftIcon className="btn" />
          <PaperAirplaneIcon className="btn" />
        </div>
        <BookmarkIcon className="btn" />
      </div>

      {/* Post comments */}
      <p className="truncate pt-5 px-5">
        <span className="font-bold mr-2">{username}</span> {caption}{" "}
      </p>

      {/* Post input box */}
      <form className="flex items-center p-4">
        <FaceSmileIcon className="h-7" />
        <input
          className="border-none flex-1 focus:outline-none pl-1 mr-2"
          type="text"
          placeholder="Enter your comment..."
        />
        <button className="text-blue-400 font-bold">Post</button>
      </form>
    </div>
  );
}
