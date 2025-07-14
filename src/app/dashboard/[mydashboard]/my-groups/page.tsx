'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import Link from 'next/link';

interface Group {
  _id: string;
  name: string;
  description: string;
}

export default function MyGroupsPage() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await api.get("/groups/students",{withCredentials : true});

        setGroups(res.data.groups);
      } catch (err) {
        console.error("Failed to fetch groups", err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchGroups();
  }, []);
  

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-pink-600">🧩 My Groups</h1>

      {loading ? (
        <p className="text-gray-600">Loading your magical groups...</p>
      ) : groups.length === 0 ? (
        <p className="text-gray-600">You haven’t joined any groups yet!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group) => (
            <div key={group._id} className="bg-white p-6 rounded-2xl shadow-xl border border-pink-100">
              <h2 className="text-xl font-bold text-pink-700 mb-2">📚 {group.name}</h2>
              <p className="text-gray-600 mb-4">{group.description}</p>
              <Link href={`/dashboard/mydashboard/my-groups/explore-groups/${group._id}`}>
                <button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-xl">
                  ✨ Explore Group
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
