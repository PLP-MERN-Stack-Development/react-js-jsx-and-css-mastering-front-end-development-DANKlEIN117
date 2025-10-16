import React, { useState, useMemo } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import Card from "../components/Card";
import Button from "../components/Button";

const FILTERS = {
  ALL: "All",
  ACTIVE: "Active",
  COMPLETED: "Completed",
};

export default function TaskManager() {
  const [tasks, setTasks] = useLocalStorage("tasks_v1", []);
  const [text, setText] = useState("");
  const [filter, setFilter] = useState(FILTERS.ALL);

  const addTask = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setTasks(prev => [{ id: Date.now(), text: text.trim(), done: false }, ...prev]);
    setText("");
  };

  const toggle = (id) => setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  const remove = (id) => setTasks(prev => prev.filter(t => t.id !== id));

  const filtered = useMemo(() => {
    if (filter === FILTERS.ALL) return tasks;
    if (filter === FILTERS.ACTIVE) return tasks.filter(t => !t.done);
    return tasks.filter(t => t.done);
  }, [tasks, filter]);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Card>
        <h2 className="text-xl font-semibold mb-3">Task Manager</h2>
        <form onSubmit={addTask} className="flex gap-2">
          <input
            className="flex-1 p-2 rounded border dark:bg-gray-700"
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Add a new task"
          />
          <Button type="submit">Add</Button>
        </form>

        <div className="mt-4 flex gap-2">
          {Object.values(FILTERS).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded ${filter === f ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-800"}`}
            >
              {f}
            </button>
          ))}
        </div>

        <ul className="mt-4 space-y-2">
          {filtered.map(task => (
            <li key={task.id} className="flex items-center justify-between p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700">
              <div className="flex items-center gap-3">
                <input type="checkbox" checked={task.done} onChange={() => toggle(task.id)} />
                <span className={`${task.done ? "line-through text-gray-400" : ""}`}>{task.text}</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => remove(task.id)} className="text-sm text-red-500">Delete</button>
              </div>
            </li>
          ))}
          {filtered.length === 0 && <li className="text-sm text-gray-500">No tasks here.</li>}
        </ul>
      </Card>
    </div>
  );
}
