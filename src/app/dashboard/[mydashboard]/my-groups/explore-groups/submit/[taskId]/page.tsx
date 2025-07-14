"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/axios";
import axios from "axios";

export default function SubmitTaskPage() {
  const { taskId } = useParams();
  const router = useRouter();

  const [pdfUrl, setPdfUrl] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!pdfUrl.trim()) {
      return setMessage("📎 Please enter a valid PDF URL!");
    }

    try {
      setLoading(true);
      setMessage("");

      const res = await api.post(
        "/submission",
        {
          taskId: taskId,
          pdfUrl: pdfUrl,
        },
        { withCredentials: true }
      );
      setMessage(res.data.message || res.data.error);

      setTimeout(() => {
        router.push("/dashboard/mydashboard/my-groups");
      }, 1500);
    } catch (err: any) {
      console.error("Axios Error:", err);

      if (axios.isAxiosError(err) && err.response) {
        // ✅ Show the backend error clearly
        setMessage("Assignments Already Submitted");
      } else {
        setMessage("❌ Something went wrong!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-6 max-w-xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-pink-600">📤 Submit Assignment</h1>

      <label className="block text-md font-medium text-gray-700">
        PDF URL
      </label>
      <input
        type="url"
        placeholder="https://example.com/myfile.pdf"
        value={pdfUrl}
        onChange={(e) => setPdfUrl(e.target.value)}
        className="w-full p-3 border border-pink-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 text-red-500"
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 rounded-xl transition"
      >
        {loading ? "Submitting..." : "Submit Assignment 📚"}
      </button>

      {message && (
        <p className="text-center text-sm text-gray-700 mt-2">{message}</p>
      )}
    </main>
  );
}
