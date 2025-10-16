import React, { useEffect, useState } from "react";
import { fetchPosts } from "../api/posts";
import Card from "../components/Card";
import Button from "../components/Button";

export default function Posts() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState(0);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchPosts(page, limit)
      .then(({ posts, total }) => {
        if (mounted) {
          setPosts(posts);
          setTotal(total);
          setError(null);
        }
      })
      .catch(err => mounted && setError(err.message))
      .finally(() => mounted && setLoading(false));
    return () => (mounted = false);
  }, [page, limit]);

  const filtered = posts.filter(p => p.title.includes(q) || p.body.includes(q));

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Posts</h2>
          <input
            placeholder="Search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="p-2 rounded border dark:bg-gray-700"
          />
        </div>

        {loading && <p className="mt-4">Loading...</p>}
        {error && <p className="mt-4 text-red-500">Error: {error}</p>}

        <ul className="mt-4 space-y-3">
          {filtered.map(p => (
            <li key={p.id} className="p-3 border rounded dark:border-gray-700">
              <h3 className="font-semibold">{p.title}</h3>
              <p className="text-sm mt-1">{p.body}</p>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex justify-between items-center">
          <div>Page {page} • Total {total}</div>
          <div className="flex gap-2">
            <Button onClick={() => setPage(p => Math.max(1, p - 1))} className="px-3">Prev</Button>
            <Button onClick={() => setPage(p => p + 1)} className="px-3">Next</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
