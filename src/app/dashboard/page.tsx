"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/axios";

export default function StudentHome() {
  const [stats, setStats] = useState({
    groups: 0,
    submitted: 0,
    pending: 0,
    averagePoints: 0,
  });
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [glen,setGlen] = useState(0)
  const [assignments,setAssignments] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch user profile
        const profileRes = await api.get("/profile", {
          withCredentials: true,
        });
        const user = profileRes.data.user;
        setName(user.name);

        // 2. Fetch joined groups
        const groupRes = await api.get("/groups/students", {
          withCredentials: true,
        });
        const groups = groupRes.data.groups || [];
        const glen = groupRes.data.groups.length;
        setGlen(glen)

        // 3. Fetch submissions
        const submissionsRes = await api.get("http://localhost:3000/api/submission/mine", {
          withCredentials: true,
        });
        setAssignments(submissionsRes.data.submissions.length)
        const submissions = submissionsRes.data.submissions || [];

        const allTasks = [];


        // 4. Fetch tasks from each group
        for (const group of groups) {
          try {
            const taskRes = await api.get(
              `http://localhost:3000/api/tasks?groupId=${group._id}`,
              { withCredentials: true }
            );
            const tasks = taskRes.data.tasks || [];
            allTasks.push(...tasks);
          } catch (err) {
            console.warn(`Skipping group ${group.name} (${group._id}) due to error:`, err.response?.status || err.message);
          }
        }
        

        const submittedTaskTitles = submissions.map((s) => s.taskTitle);
        const pendingTasks = allTasks.filter(
          (task) => !submittedTaskTitles.includes(task.title)
        );

        // Average points calculation
        const avgPoints =
          submissions.length > 0
            ? (
                submissions.reduce((acc, curr) => acc + (curr.points || 0), 0) /
                submissions.length
              ).toFixed(1)
            : 0;

        // Upcoming 3 pending tasks
        const upcoming = pendingTasks
          .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
          .slice(0, 3);

        // Set states
        setStats({
          groups: groups.length,
          submitted: submissions.length,
          pending: pendingTasks.length,
          averagePoints: avgPoints,
        });

        setUpcomingTasks(upcoming);
      } catch (err) {
        console.error("❌ Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="p-6 text-lg">Loading Dashboard...</div>;

  return (
    <main className="p-6 space-y-10">
      <h1 className="text-3xl font-bold text-pink-600">👋 Welcome back, {name}!</h1>
      <p className="text-gray-600">Track your learning and submissions here.</p>

      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Groups Joined" value={glen} icon="👥" />
        <StatsCard title="Assignments Submitted" value={assignments} icon="📥" />
        <StatsCard title="Pending Assignments" value={stats.pending} icon="📌" />
        <StatsCard title="Avg. Points" value={stats.averagePoints} icon="🏆" />
      </section>

      {/* Upcoming Tasks */}
      <section>
        <h2 className="text-xl font-semibold text-pink-600">📅 Upcoming Tasks</h2>
        {upcomingTasks.length === 0 ? (
          <p className="text-gray-500 mt-2">You are all caught up. 🎉</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {upcomingTasks.map((task) => (
              <li
                key={task._id}
                className="p-4 bg-white border border-pink-200 rounded-xl shadow-sm flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold text-lg text-pink-700">{task.title}</h3>
                  <p className="text-gray-500 text-sm">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                </div>
                <Link
                  href={`/dashboard/mydashboard/my-groups/explore-groups/submit/${task._id}`}
                  className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-xl text-sm font-medium"
                >
                  Submit Now
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Tip of the Day */}
      <section className="mt-8">
        <h2 className="text-lg font-bold text-pink-600">🌟 Tip of the Day</h2>
        <p className="text-gray-600 mt-2 italic">
          “Success is the sum of small efforts, repeated day in and day out.” – R. Collier
        </p>
      </section>

      {/* Join More Groups */}
      <div className="mt-10">
        <Link
          href="/dashboard/mydashboard/join-groups"
          className="inline-block bg-yellow-400 text-black font-bold py-2 px-6 rounded-xl hover:bg-yellow-300 transition"
        >
          🔍 Explore & Join More Groups
        </Link>
      </div>
    </main>
  );
}

// Small stat card component
function StatsCard({ title, value, icon }) {
  return (
    <div className="bg-white shadow-md border border-pink-200 rounded-xl p-4 text-center">
      <div className="text-3xl">{icon}</div>
      <h3 className="text-xl font-bold text-pink-600">{value}</h3>
      <p className="text-gray-600 text-sm">{title}</p>
    </div>
  );
}
