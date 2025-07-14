// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";

// export default function StudentSidebar() {
//   const pathname = usePathname();

//   const linkClass = (path: string) =>
//     `block px-4 py-3 rounded-xl mb-2 text-lg font-semibold ${
//       pathname === path
//         ? "bg-pink-500 text-white"
//         : "text-gray-700 hover:bg-pink-200"
//     }`;

//   return (
//     <aside className="w-64 p-4 bg-pink-100 shadow-md rounded-r-3xl block hidden md:block">
//       <h2 className="text-xl font-bold text-pink-600 mb-4">🎒 Student Menu</h2>
//       <nav>
//         <Link href="/dashboard/mydashboard/my-groups" className={linkClass("/dashboard/mydashboard/my-groups")}>
//           🧩 My Groups
//         </Link>
//         <Link href="/dashboard/mydashboard/join-groups" className={linkClass("/dashboard/mydashboard/join-groups")}>
//           🤝 Join Groups
//         </Link>
//       </nav>
//     </aside>
//   );
// }

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react"; // Import useState for managing sidebar state

export default function StudentSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false); // State to manage sidebar open/close on mobile

  const linkClass = (path: string) =>
    `block px-4 py-3 rounded-xl mb-2 text-lg font-semibold transition-colors duration-200 ease-in-out ${
      pathname === path
        ? "bg-pink-500 text-white shadow-sm"
        : "text-gray-700 hover:bg-pink-200"
    }`;

  return (
    <>
      {/* Mobile Menu Button (Hamburger Icon) */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-pink-500 text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-75"
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
          w-64 p-4 bg-pink-100 shadow-md rounded-r-3xl
          fixed inset-y-0 left-0 z-50
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0 md:block
        `}
      >
        <h2 className="text-xl font-bold text-pink-600 mb-4">🎒 Student Menu</h2>
        <nav>
          <Link href="/dashboard/mydashboard/my-groups" className={linkClass("/dashboard/mydashboard/my-groups")} onClick={() => setIsOpen(false)}>
            🧩 My Groups
          </Link>
          <Link href="/dashboard/mydashboard/join-groups" className={linkClass("/dashboard/mydashboard/join-groups")} onClick={() => setIsOpen(false)}>
            🤝 Join Groups
          </Link>
        </nav>
      </aside>
    </>
  );
}
