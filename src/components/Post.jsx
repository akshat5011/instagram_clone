import {
  BookmarkIcon,
  ChatBubbleOvalLeftIcon,
  FaceSmileIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import {
  EllipsisHorizontalIcon,
  HeartIcon as HeartIconFilled,
} from "@heroicons/react/24/solid";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  snapshotEqual,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default function Post({ id, username, userPfp, postImg, caption }) {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hadliked, setHadLiked] = useState(false);

  useEffect(() => {
    if (!id) return;

    const q = query(
      collection(db, "posts", id, "comments"),
      orderBy("timestamp", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setComments(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, [id]);

  async function postCommentToFirebase(event) {
    event.preventDefault();
    if (!session) return;

    const commentToSend = comment;
    setComment("");

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session.user.username,
      userPfp: session.user.image,
      timestamp: serverTimestamp(),
    });
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts", id, "likes"),
      (snapshot) => {
        setLikes(snapshot.docs);
      }
    );
  }, [db]);

  useEffect(() => {
    setHadLiked(
      likes.findIndex((like) => like.id === session?.user.uid) !== -1
    );
  }, [likes]);

  async function likedPost() {
    if (hadliked) {
      // if had already liked and clicked on heart then dislike otherwise likes
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session.user.username,
      });
    }
  }

  return (
    <div className="bg-white my-7 border rounded-md">
      {/* Post Header */}
      <div className="flex items-center p-5">
        <img
          src={userPfp || "/defaultPfp.png"}
          alt={username}
          className="rounded-full h-12 object-cover border p-1 mr-3"
        />
        <p className="font-bold flex-1">{username}</p>
        <EllipsisHorizontalIcon className="h-5" />
      </div>

      {/* Post Image */}
      <img className="object-cover w-full" src={postImg} alt="" />

      {/* Post Buttons */}
      {session && (
        <div className="flex justify-between px-4 pt-4">
          <div className="flex space-x-4">
            {hadliked ? (
              <HeartIconFilled
                onClick={likedPost}
                className="btn text-red-500"
              />
            ) : (
              <HeartIcon onClick={likedPost} className="btn" />
            )}
            {likes.length > 0 && (
              <p className="font-bold mb-1">{likes.length}</p>
            )}
            <ChatBubbleOvalLeftIcon className="btn" />
            <PaperAirplaneIcon className="btn" />
          </div>
          <BookmarkIcon className="btn" />
        </div>
      )}

      {/* Post Caption */}
      <p className="truncate pt-5 pb-3 px-5">
        <span className="font-bold mr-2">{username}</span> {caption}
      </p>

      {/* Comments Section */}
      {comments.length > 0 && (
        <div className="mx-10 max-h-24 overflow-y-scroll scrollbar-none">
          {comments.map((comment, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <img
                src={comment.userPfp || "/defaultPfp.png"}
                className="h-7 rounded-full object-cover"
                alt="userpfp"
              />
              <p className="font-semibold">{comment.username}</p>
              <p className="flex-1 truncate">{comment.comment}</p>
              <p className="text-gray-400 text-xs">
                {comment.timestamp
                  ? dayjs(comment.timestamp.toDate()).fromNow()
                  : "Just now"}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Post Comment Input */}
      {session && (
        <form className="flex items-center p-4">
          <FaceSmileIcon className="h-7" />
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border-none flex-1 focus:outline-none pl-1 mr-2"
            type="text"
            placeholder="Enter your comment..."
          />
          <button
            type="submit"
            disabled={!comment.trim()}
            onClick={postCommentToFirebase}
            className="text-blue-400 font-bold disabled:text-blue-200"
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}
