"use client";

import { useEffect, useState } from "react";
// import api from "@/lib/axios";
import api from "@/lib/axios";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/profile",{withCredentials:true});
        setUser(res.data.user);
      } catch (err) {
        console.error("Error fetching profile", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div className="p-6 text-lg">Loading profile...</div>;

  if (!user) return <div className="p-6 text-red-500">Failed to load profile.</div>;

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-pink-600 text-center border-radius">👤 My Profile</h1>
      <div className="space-y-4 border border-pink-200 rounded-xl p-6 bg-white shadow-md text-blue-600">
        <div>
          <p className="text-gray-500 font-semibold">Name:</p>
          <p className="text-lg">{user.name}</p>
        </div>
        <div>
          <p className="text-gray-500 font-semibold">Email:</p>
          <p className="text-lg">{user.email}</p>
        </div>
        <div>
          <p className="text-gray-500 font-semibold">Role:</p>
          <p className="text-lg capitalize">{user.role}</p>
        </div>
      </div>
    </main>
  );
}
