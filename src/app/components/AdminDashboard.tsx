
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react"; // Import useState for managing sidebar state

export default function AdminDashboardSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false); // State to manage sidebar open/close on mobile

  const linkClass = (path: string) =>
    `block px-4 py-2 rounded-lg font-medium transition-colors duration-200 ease-in-out ${
      pathname === path
        ? "bg-pink-600 text-white shadow-sm"
        : "text-gray-700 hover:bg-pink-100"
    }`;

  return (
    <>
      {/* Mobile Menu Button (Hamburger Icon) */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-pink-600 text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-75"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          )}
        </svg>
      </button>

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`
          w-64 bg-white border-r border-gray-200 min-h-screen p-6
          fixed inset-y-0 left-0 z-50
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0 md:block
        `}
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-6">Admin Panel</h2>
        <nav className="space-y-2">
          <Link href="/admin/dashboard/my-groups" className={linkClass("/admin/dashboard/my-groups")} onClick={() => setIsOpen(false)}>
            My Groups
          </Link>
          <Link href="/admin/dashboard/create-group" className={linkClass("/admin/dashboard/create-group")} onClick={() => setIsOpen(false)}>
            Create Group
          </Link>
          <Link href="/admin/dashboard/pending-req" className={linkClass("/admin/dashboard/pending-req")} onClick={() => setIsOpen(false)}>
            Pending Requests
          </Link>
        </nav>
      </aside>
    </>
  );
}
