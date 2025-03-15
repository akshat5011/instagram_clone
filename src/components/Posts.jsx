"use client";
import { useEffect, useState } from "react";
import Post from "./Post";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";

export default function Posts() {
  const [posts, setPost] = useState([]);
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setPost(snapshot.docs);
      }
    );
    return unsubscribe;
  });
  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          username={post.data().username}
          userPfp={post.data().profileImg}
          postImg={post.data().image}
          caption={post.data().caption}
        />
      ))}
    </div>
  );
}
