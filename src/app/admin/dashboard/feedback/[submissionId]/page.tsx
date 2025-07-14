"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import api from "@/lib/axios";

export default function FeedbackPage() {
  const { submissionId } = useParams();
  const router = useRouter();

  const [points, setPoints] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.patch(
        `/submission/${submissionId}`,
        {
          points,
          feedback,
        },
        { withCredentials: true }
      );

      setMessage("✅ Feedback submitted successfully!");
      setTimeout(() => router.back(), 1500); // Go back after a short delay
    } catch (err: any) {
      console.error("Error submitting feedback:", err);
      setMessage(err.response?.data?.error || "Something went wrong.");
    }
  };

  return (
    <main className="p-6 max-w-xl mx-auto bg-white shadow-md rounded-xl">
      <h1 className="text-2xl font-bold text-pink-600 mb-4">📝 Give Feedback</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Points (out of 10)</label>
          <input
            type="number"
            min={0}
            max={10}
            className="w-full border px-4 py-2 rounded"
            value={points}
            onChange={(e) => setPoints(parseInt(e.target.value))}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Feedback</label>
          <textarea
            className="w-full border px-4 py-2 rounded h-28"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Enter feedback here..."
            required
          />
        </div>

        <button
          type="submit"
          className="bg-pink-600 text-white px-6 py-2 rounded hover:bg-pink-700 transition"
        >
          Submit Feedback
        </button>

        {message && <p className="mt-4 text-green-600 font-semibold">{message}</p>}
      </form>
    </main>
  );
}
