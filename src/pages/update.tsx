import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function UpdatePost() {
  const router = useRouter();
  const { id, title: initialTitle, content: initialContent } = router.query;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (initialTitle && initialContent) {
      setTitle(initialTitle as string);
      setContent(initialContent as string);
    }
  }, [initialTitle, initialContent]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/posts/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, title, content }),
    });
    router.push("/");
  };

  return (
    <form onSubmit={handleUpdate}>
      <h1>Update Post</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        required
      />
      <button type="submit">Update</button>
    </form>
  );
}
