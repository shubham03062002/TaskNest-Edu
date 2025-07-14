import { connectDB } from "@/lib/db";
import { Task } from "@/models/Task";
import { Submission } from "@/models/Submission";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    await connectDB();

  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;



  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let decoded;
  try {
    decoded = verifyToken(token) as { id: string; role: string };
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  if (decoded.role === "admin") {
    const allsub= Submission.find();
    if(!allsub) NextResponse.json({error:"no submissions found"})
    return NextResponse.json({ allsub}, { status: 200 });
  }

  if (decoded.role !== "student") {
    return NextResponse.json({ error: "Only students can submit tasks" }, { status: 403 });
  }

  const { taskId, pdfUrl } = await req.json();

  if (!taskId || !pdfUrl) {
    return NextResponse.json({ error: "Task ID and PDF URL are required" }, { status: 400 });
  }

  const task = await Task.findById(taskId);
  if (!task) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }

  const existing = await Submission.findOne({
    task: taskId,
    student: decoded.id,
  });

  if (existing) {
    return NextResponse.json({ message: "Task already submitted" }, { status: 409 });
  }

  const submission = new Submission({
    task: taskId,
    student: decoded.id,
    pdfUrl,
  });

  await submission.save();

  return NextResponse.json({ message: "Submission successful", submission }, { status: 201 });
}
