// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { LogOut, Menu, User, Home as HomeIcon, LayoutDashboard } from "lucide-react";

// export default function AdminNavbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const router = useRouter();

//   const handleLogout = () => {
//     localStorage.clear();
//     document.cookie = "auth_token=; Max-Age=0; path=/";
//     router.push("/");
//   };

//   return (
//     <nav className="bg-white border-b border-gray-200 shadow-md fixed top-0 left-0 right-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16 items-center">
//           {/* Logo */}
//           <Link href="/admin/home" className="text-xl font-bold text-pink-600">
//             AdminPanel
//           </Link>

//           {/* Desktop Nav */}
//           <div className="hidden md:flex gap-6 items-center">
//             <NavLink href="/admin/home" label="Home" icon={<HomeIcon size={18} />} />
//             <NavLink href="/admin/dashboard/my-groups" label="Dashboard" icon={<LayoutDashboard size={18} />} />
//             <NavLink href="/admin/profile" label="Profile" icon={<User size={18} />} />
//             <button
//               onClick={handleLogout}
//               className="flex items-center gap-2 text-red-500 hover:text-red-700 transition text-sm font-medium"
//             >
//               <LogOut size={18} />
//               Logout
//             </button>
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="md:hidden text-pink-600 focus:outline-none"
//           >
//             <Menu size={24} />
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <div className="md:hidden bg-white px-4 pb-4 shadow-sm space-y-2">
//           <NavLink href="/admin/home" label="Home" />
//           <NavLink href="/admin/dashboard/my-groups" label="Dashboard" />
//           <NavLink href="/admin/profile" label="Profile" />
//           <button
//             onClick={handleLogout}
//             className="block text-left w-full text-red-500 hover:text-red-700 font-medium text-sm"
//           >
//             Logout
//           </button>
//         </div>
//       )}
//     </nav>
//   );
// }

// function NavLink({ href, label, icon }: { href: string; label: string; icon?: React.ReactNode }) {
//   return (
//     <Link
//       href={href}
//       className="flex items-center gap-1 text-gray-700 hover:text-pink-600 transition text-sm font-medium"
//     >
//       {icon}
//       {label}
//     </Link>
//   );
// }

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, Menu, User, Home as HomeIcon, LayoutDashboard } from "lucide-react";

export default function AdminNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.clear();
    document.cookie = "auth_token=; Max-Age=0; path=/";
    router.push("/");
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/admin/home" className="text-xl font-bold text-pink-600">
            AdminPanel
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-6 items-center">
            <NavLink href="/admin/home" label="Home" icon={<HomeIcon size={18} />} />
            <NavLink href="/admin/dashboard/my-groups" label="Dashboard" icon={<LayoutDashboard size={18} />} />
            <NavLink href="/admin/profile" label="Profile" icon={<User size={18} />} />
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-500 hover:text-red-700 transition text-sm font-medium"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-pink-600 focus:outline-none"
            aria-label="Toggle navigation"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 pb-4 shadow-sm space-y-2">
          <NavLink href="/admin/home" label="Home" onClick={() => setIsOpen(false)} />
          <NavLink href="/admin/dashboard/my-groups" label="Dashboard" onClick={() => setIsOpen(false)} />
          <NavLink href="/admin/profile" label="Profile" onClick={() => setIsOpen(false)} />
          <button
            onClick={() => { handleLogout(); setIsOpen(false); }}
            className="block text-left w-full text-red-500 hover:text-red-700 font-medium text-sm py-2"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

function NavLink({ href, label, icon, onClick }: { href: string; label: string; icon?: React.ReactNode; onClick?: () => void }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-1 text-gray-700 hover:text-pink-600 transition text-sm font-medium py-2"
      onClick={onClick}
    >
      {icon}
      {label}
    </Link>
  );
}
