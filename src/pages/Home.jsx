import Card from "../components/Card";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card>
        <h1 className="text-2xl font-bold">Welcome — Week 3 Project</h1>
        <p className="mt-2 text-sm">This is the hub for your React + Tailwind assignment. Explore Tasks and Posts.</p>
      </Card>
    </div>
  );
}