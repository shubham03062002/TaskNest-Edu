"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";

interface Group {
  _id: string;
  name: string;
  pendingRequests: { _id: string; name: string; email: string }[];
}

export default function PendingRequestsPage() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchGroups = async () => {
    try {
      const res = await api.get("/my-groups", { withCredentials: true });

      setGroups(res.data.groups || []);
    } catch (err) {
      console.error("Error fetching groups:", err);
    } finally {
      setLoading(false);
    }
  };

  const acceptRequest = async (groupId: string, studentId: string) => {
    try {
      await api.post(
        `/groups/${groupId}/accept-req`,
        { studentId },
        { withCredentials: true }
      );
      setMessage("✅ Request accepted!");
      fetchGroups(); // Refresh list
    } catch (err: any) {
      console.error(err);
      setMessage(err.response?.data?.error || "Error accepting request.");
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold text-pink-600 mb-6">📥 Pending Join Requests</h1>

      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : (
        <>
          {groups.filter(g => g.pendingRequests.length > 0).length === 0 ? (
            <p className="text-gray-600">No pending requests for any groups.</p>
          ) : (
            groups.map((group) =>
              group.pendingRequests.length > 0 ? (
                <div
                  key={group._id}
                  className="mb-6 p-4 border rounded-xl shadow bg-white"
                >
                  <h2 className="text-xl font-semibold text-pink-500 mb-2">
                    📘 {group.name}
                  </h2>
                  <ul className="space-y-2">
                    {group.pendingRequests.map((student) => (
                      <li
                        key={student._id}
                        className="flex justify-between items-center p-3 bg-pink-50 rounded-lg"
                      >
                        <div>
                          <p className="font-large text-blue-600">{student.name}</p>
                          <p className="text-medium text-gray-600">{student.email}</p>
                        </div>
                        <button
                          onClick={() => acceptRequest(group._id, student._id)}
                          className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition"
                        >
                          Accept
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null
            )
          )}
        </>
      )}

      {message && (
        <p className="text-center mt-4 text-green-600 font-semibold">{message}</p>
      )}
    </main>
  );
}
