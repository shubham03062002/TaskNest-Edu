"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";

export default function CreateGroupPage() {
  const [groupName, setGroupName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await api.post(
        "/groups",
        { name: groupName },
        { withCredentials: true }
      );

      setMessage("✅ Group created successfully!");
      setGroupName("");

      setTimeout(() => {
        router.push("/admin/dashboard/my-groups");
      }, 1000);
    } catch (error:any) {
      console.error(error);
      setMessage(error.response?.data?.error || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded-xl">
      <h1 className="text-2xl font-bold mb-4 text-pink-600">Create New Group</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="📚 Enter Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className="w-full border border-pink-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition"
        >
          {loading ? "Creating..." : "Create Group"}
        </button>
      </form>

      {message && <p className="text-center mt-4 text-gray-700">{message}</p>}
    </main>
  );
}
