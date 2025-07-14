"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/axios";

export default function AdminMyGroupsPage() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await api.get("/my-groups", {
          withCredentials: true,
        });
        setGroups(res.data.groups || []);
      } catch (err) {
        console.error("Error fetching admin groups:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  if (loading) {
    return <div className="p-6 text-lg">Loading your groups...</div>;
  }

  return (
    <main className="p-6 space-y-8">
      <h1 className="text-3xl font-bold text-pink-600">📚 My Created Groups</h1>

      {groups.length === 0 ? (
        <p className="text-gray-500">You have not created any groups yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {groups.map((group: any) => (
            <div
              key={group._id}
              className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold text-pink-700 mb-1">
                  {group.name}
                </h2>
                <p className="text-sm text-gray-500">
                  Created: {new Date(group.createdAt).toLocaleDateString()}
                </p>

                <div className="mt-3 flex flex-col gap-1 text-sm text-blue-500">
                  <p>
                    👥 <strong>Members:</strong> {group.members.length}
                  </p>
                  <p>
                    ⏳ <strong>Pending Requests:</strong> {group.pendingRequests.length}
                  </p>
                </div>
              </div>

              <div className="mt-4 text-right">
                <Link
                  href={`my-groups/${group._id}`}
                  // http://localhost:3000/admin/dashboard/my-groups/686b6fb623faed548cdeb56f
                  className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition"
                >
                  Explore Group →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
