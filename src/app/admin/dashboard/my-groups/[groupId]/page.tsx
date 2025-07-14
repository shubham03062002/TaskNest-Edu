"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation"; // 👈 use this hook
import api from "@/lib/axios";

export default function GroupDetailPage() {
  const params = useParams();
  const groupId = params.groupId as string; // 👈 cast to string if needed

  const [tasks, setTasks] = useState([]);
  const [members, setMembers] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const [taskRes, memberRes, submissionRes] = await Promise.all([
          api.get(`/tasks?groupId=${groupId}`, { withCredentials: true }),
          api.get(`/groups/${groupId}/students`, { withCredentials: true }),
          api.get(`/submission/group/${groupId}`, { withCredentials: true }),
        ]);

        setTasks(taskRes.data.tasks || []);
        setMembers(memberRes.data.members || []);
        setSubmissions(submissionRes.data.submissions || []);
      } catch (err) {
        console.error("Error fetching group details:", err);
      } finally {
        setLoading(false);
      }
    };

    if (groupId) fetchGroupDetails();
  }, [groupId]);

  const getSubmissionByStudent = (studentId: string, taskId: string) => {
    return submissions.find(
      (sub: any) => sub.task._id === taskId && sub.student._id === studentId
    );
  };

  // ... rest of your component remains same ...

  if (loading) return <div className="p-6 text-lg">Loading group info...</div>;

  return (
    <main className="p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-pink-600">📝 Tasks Assigned</h1>
        <Link
          href={`/admin/dashboard/my-groups/${groupId}/assign-task`}
          className="bg-pink-500 text-white px-4 py-2 rounded-xl hover:bg-pink-600"
        >
          ➕ Assign New Task
        </Link>
      </div>

      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks assigned to this group yet.</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task: any) => (
            <li key={task._id} className="bg-white border rounded-xl p-4 shadow">
              <h3 className="text-lg font-semibold text-pink-700">{task.title}</h3>
              <p className="text-gray-600 text-sm">{task.description}</p>
              <p className="text-gray-500 text-xs mt-1">
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}

      <section>
        <h2 className="text-2xl font-bold text-pink-600 mt-10">👨‍🎓 Students in Group</h2>
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full bg-white border rounded-xl shadow-md">
            <thead className="bg-pink-100">
              <tr>
                <th className="px-4 py-2 text-left">#</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                {tasks.map((task: any) => (
                  <th key={task._id} className="px-4 py-2 text-left">{task.title}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {members.map((student: any, index: number) => (
                <tr key={student._id} className="border-t text-sm">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{student.name}</td>
                  <td className="px-4 py-2">{student.email}</td>
                  {tasks.map((task: any) => {
                    const submission = getSubmissionByStudent(student._id, task._id);
                    return (
                      <td key={task._id} className="px-4 py-2">
                        {submission ? (
                          <div className="space-y-1">
                            <a
                              href={submission.pdfUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 underline"
                            >
                              View PDF
                            </a>
                            <p className="text-gray-500 text-xs">
                              Points: {submission.points ?? "-"}
                            </p>
                            <p className="text-gray-500 text-xs italic">
                              {submission.feedback || "No feedback"}
                            </p>
                            <Link
                              href={`/admin/dashboard/feedback/${submission._id}`}
                              className="text-sm text-pink-600 underline"
                            >
                              Give Feedback
                            </Link>
                          </div>
                        ) : (
                          <span className="text-gray-400">Not Submitted</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
