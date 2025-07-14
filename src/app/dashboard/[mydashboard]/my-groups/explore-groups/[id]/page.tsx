

"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function ExploreGroupPage() {
  const params = useParams();
  const groupId = params.id;
  const [tasks, setTasks] = useState([]);
  const [members, setMembers] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const taskRes = await api.get(`/tasks?groupId=${groupId}`, {
          withCredentials: true,
        });
        setTasks(taskRes.data.tasks);

        const membersRes = await api.get(`/groups/${groupId}/students`, {
          withCredentials: true,
        });
        setMembers(membersRes.data.members);

        const submissionRes = await api.get("/submission/mine", {
          withCredentials: true,
        });
        setSubmissions(submissionRes.data.submissions);

      } catch (err) {
        console.error("Failed to fetch group details", err);
      } finally {
        setLoading(false);
      }
    };

    if (groupId) fetchDetails();
  }, [groupId]);
  
  const getSubmissionForTask = (task) => {
    return submissions.find((sub) => sub.taskTitle === task.title);
  };
  
  

  if (loading) return <div className="p-6 text-lg">Loading...</div>;

  return (
    <main className="p-6 space-y-10">
      <h1 className="text-3xl font-bold text-pink-600">🎯 Group Tasks</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {tasks.length === 0 && <p>No tasks yet.</p>}
        {tasks.map((task) => {
const submission = getSubmissionForTask(task);

          return (
            <div key={task._id} className="border border-pink-200 p-4 rounded-xl bg-white shadow-md">
              <h3 className="text-xl font-semibold text-pink-700">{task.title}</h3>
              <p className="text-gray-600">{task.description}</p>
              <p className="text-sm text-gray-500 mt-2">Due: {new Date(task.dueDate).toLocaleDateString()}</p>

              {submission ? (
                <div className="mt-4 space-y-2">
                  <p className="text-green-600 font-semibold">✅ Task Already Submitted</p>
                  <p className="text-gray-700 text-sm">📅 Submitted At: {new Date(submission.submittedAt).toLocaleDateString()}</p>
                  {submission.points !== undefined && (
                    <p className="text-blue-600 text-sm">🏅 Points: {submission.points}/10</p>
                  )}
                  {submission.feedback && (
                    <p className="text-gray-600 italic">📝 Feedback: {submission.feedback}</p>
                  )}
                  <a href={submission.pdfUrl} target="_blank" className="text-pink-500 underline text-sm">📄 View Submitted PDF</a>
                </div>
              ) : (
                <button
                  className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-xl shadow-md transition duration-300 mt-5"
                >
                  <Link href={`/dashboard/mydashboard/my-groups/explore-groups/submit/${task._id}`}>
                    Do it Now
                  </Link>
                </button>
              )}
            </div>
          );
        })}
      </div>

      <h2 className="text-2xl font-bold text-pink-600 mt-10">👫 Classmates</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl overflow-hidden shadow-md">
          <thead>
            <tr className="bg-pink-100 text-pink-700">
              <th className="text-left px-4 py-2">#</th>
              <th className="text-left px-4 py-2">Name</th>
              <th className="text-left px-4 py-2">Email</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, index) => (
              <tr key={member._id} className="border-t border-pink-100 text-blue-600">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{member.name}</td>
                <td className="px-4 py-2">{member.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
