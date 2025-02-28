import Post from "./Post";

export default function Posts() {
  const posts = [
    {
      id: 1,
      username: "akshat",
      userPfp: "https://i.pravatar.cc/150?img=1",
      postImg: "https://i.pravatar.cc/150?img=2",
      caption: "Nice pic",
    },
    {
      id: 2,
      username: "great_warrior",
      userPfp: "https://i.pravatar.cc/150?img=3",
      postImg: "https://i.pravatar.cc/150?img=4",
      caption: "Its freaking awesome!",
    },
  ];
  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          username={post.username}
          userPfp={post.userPfp}
          postImg={post.postImg}
          caption={post.caption}
        />
      ))}
    </div>
  );
}
