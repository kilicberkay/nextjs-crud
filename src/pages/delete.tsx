import { useState } from "react";

export default function DeletePost() {
  const [id, setId] = useState("");

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/posts/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
  };

  return (
    <form onSubmit={handleDelete}>
      <input
        type="number"
        placeholder="ID"
        onChange={(e) => setId(e.target.value)}
      />
      <button type="submit">Delete</button>
    </form>
  );
}
