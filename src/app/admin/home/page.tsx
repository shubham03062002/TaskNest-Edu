"use client";

import { useRouter } from "next/navigation";

export default function AdminHomePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-pink-50 to-white p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-xl text-center">
        <h1 className="text-4xl font-bold text-pink-600 mb-4">🎉 Welcome, Admin!</h1>

        <p className="text-gray-700 text-lg mb-6">
          “Education is the most powerful weapon which you can use to change the world.”
          <br />
          <span className="text-sm text-gray-500">— Nelson Mandela</span>
        </p>

        <button
          onClick={() => router.push("/admin/dashboard/my-groups")}
          className="bg-pink-500 text-white px-6 py-3 rounded-xl hover:bg-pink-600 transition"
        >
          🚀 Explore Dashboard
        </button>
      </div>
    </main>
  );
}
