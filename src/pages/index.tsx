import { useEffect, useState } from "react";
import Link from "next/link";

interface Post {
  id: number;
  title: string;
  content: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const response = await fetch("/api/posts");
    const data = await response.json();
    setPosts(data);
  };

  const handleDelete = async (id: number) => {
    await fetch("/api/posts/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchPosts(); // Listeyi güncelle
  };

  return (
    <div>
      <h1>Posts</h1>
      <Link href="/create">
        <button>Create New Post</button>
      </Link>
      <ul>
        {posts.map((post) => (
          <li key={post.id} style={{ margin: "10px 0" }}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <div>
              <Link
                href={{
                  pathname: "/update",
                  query: {
                    id: post.id,
                    title: post.title,
                    content: post.content,
                  },
                }}
              >
                <button>Edit</button>
              </Link>
              <button
                onClick={() => handleDelete(post.id)}
                style={{ marginLeft: "10px" }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
