"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import api from "@/lib/axios";

export default function AssignTaskPage() {
  const { groupId } = useParams();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post(
        "/tasks",
        {
          title,
          description,
          dueDate: new Date(dueDate).toISOString(),
          groupId,
        },
        { withCredentials: true }
      );

      setMessage("✅ Task assigned successfully!");
      setTimeout(() => router.push(`/admin/dashboard/my-groups/${groupId}`), 1500);
    } catch (err: any) {
      console.error("Error assigning task:", err);
      setMessage(err.response?.data?.error || "Something went wrong.");
    }
  };

  return (
    <main className="max-w-xl mx-auto p-6 bg-white shadow rounded-xl">
      <h1 className="text-2xl font-bold text-pink-600 mb-6">📌 Assign New Task</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            className="w-full border px-4 py-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            className="w-full border px-4 py-2 rounded h-24"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Due Date</label>
          <input
            type="datetime-local"
            className="w-full border px-4 py-2 rounded"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-pink-600 text-white px-6 py-2 rounded hover:bg-pink-700 transition"
        >
          Assign Task
        </button>

        {message && <p className="mt-4 text-green-600 font-semibold">{message}</p>}
      </form>
    </main>
  );
}
