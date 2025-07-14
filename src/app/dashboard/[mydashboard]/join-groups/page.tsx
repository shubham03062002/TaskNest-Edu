"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";

interface Group {
  _id: string;
  name: string;
}

export default function JoinGroupPage() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await api.get("groups/students",{withCredentials:true})
        setGroups(res.data.groups);
      } catch (err) {
        console.error("Failed to fetch groups", err);
      }
    };
    fetchGroups();
  }, []);

  const handleJoin = async () => {
    if (!selectedGroup) return;
    setLoading(true);
    setMessage("");

    try {
      const res = await api.post(`groups/${selectedGroup}/join-req`);
      setMessage(`${res.data.message}`);
    } catch (err: any) {
      console.error(err);
      setMessage(err.response?.data?.error || "❌ Failed to send request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold text-pink-600 mb-6">🚪 Join a Group</h1>

      <div className="space-y-4">
        <label className="block text-blue-700 font-semibold">Select Group:</label>
        <select
          value={selectedGroup}
          onChange={(e) => setSelectedGroup(e.target.value)}
          className="w-full p-3 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 " style={{color:"rebeccapurple"}}
        >
          <option value=""style={{color:"rebeccapurple"}}>-- Choose a group --</option>
          {groups.map((group) => (
            <option key={group._id} value={group._id}>
              {group.name}
            </option>
          ))}
        </select>

        <button
          onClick={handleJoin}
          disabled={loading || !selectedGroup}
          className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-xl transition"
        >
          {loading ? "Sending..." : "📨 Send Join Request"}
        </button>

        {message && <p className="mt-4 text-blue-800"style={{fontSize:"20px"}}>{message}</p>}
      </div>
    </main>
  );
}
