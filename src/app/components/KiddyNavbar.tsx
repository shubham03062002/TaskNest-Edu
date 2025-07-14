"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // install lucide-react if not done
import api from "@/lib/axios";

export default function KiddyNavbar() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await api.post("/auth/logout");
      router.push("/");
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <nav className="w-full px-6 py-4 bg-gradient-to-r from-yellow-200 to-pink-200 shadow-md">
      <div className="flex justify-between items-center">
        {/* Logo + Title */}
        <div className="flex items-center space-x-3">
          <Image
            src="/logo.png"
            alt="Logo"
            width={40}
            height={40}
            className="rounded-full bg-white p-1"
          />
          <span className="text-2xl font-bold text-pink-600 tracking-wider">
            TaskNest Edu
          </span>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center space-x-6 text-lg font-medium text-gray-700">
          <Link href="/dashboard/" className="hover:text-pink-600 transition">
            🏠 Home
          </Link>
          <Link
            href="/dashboard/mydashboard/my-groups"
            className="hover:text-pink-600 transition"
          >
            📋 My Dashboard
          </Link>
          <Link
            href="/dashboard/profile"
            className="hover:text-pink-600 transition"
          >
            🙋‍♂️ Profile
          </Link>
        </div>

        {/* Logout button */}
        <div className="hidden md:block">
          <button
            onClick={handleLogout}
            disabled={loading}
            className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-xl shadow-md transition"
          >
            {loading ? "Logging out..." : "🔓 Logout"}
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-pink-700">
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Links */}
      {menuOpen && (
        <div className="flex flex-col mt-4 md:hidden space-y-4 text-gray-700 font-medium">
          <Link href="/dashboard/" onClick={() => setMenuOpen(false)} className="hover:text-pink-600">
            🏠 Home
          </Link>
          <Link href="/dashboard/mydashboard/my-groups" onClick={() => setMenuOpen(false)} className="hover:text-pink-600">
            📋 My Dashboard
          </Link>
          <Link href="/dashboard/profile" onClick={() => setMenuOpen(false)} className="hover:text-pink-600">
            🙋‍♂️ Profile
          </Link>
          <button
            onClick={handleLogout}
            disabled={loading}
            className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-xl shadow-md transition w-full text-left"
          >
            {loading ? "Logging out..." : "🔓 Logout"}
          </button>
        </div>
      )}
    </nav>
  );
}
