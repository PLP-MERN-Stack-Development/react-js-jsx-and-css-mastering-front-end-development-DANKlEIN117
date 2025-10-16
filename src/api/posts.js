export async function fetchPosts(page = 1, limit = 10) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  if (!res.ok) throw new Error("Failed fetching posts");
  const all = await res.json();
  // simple client-side pagination example
  const start = (page - 1) * limit;
  return { posts: all.slice(start, start + limit), total: all.length };
}
