import { connectDB } from "@/lib/db";
import { Submission } from "@/models/Submission";
import {Task} from "@/models/Task"
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export async function GET(req: NextRequest) {
    await connectDB();
  
    const token = req.cookies.get("auth_token")?.value;
  
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  
    let decoded;
    try {
      decoded = verifyToken(token) as { id: string; role: string };
    } catch {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
  
    if (decoded.role !== "student") {
      return NextResponse.json({ error: "Only students can view their submissions" }, { status: 403 });
    }
  
    const submissions = await Submission.find({ student: decoded.id }).populate("task")
  
    const formatted = submissions.map((s) => ({
      id: s._id,
      taskTitle: s.task?.title,
      pdfUrl: s.pdfUrl,
      feedback: s.feedback,
      points: s.points,
      submittedAt: s.createdAt,
    }));
  
    return NextResponse.json({ submissions: formatted }, { status: 200 });
  }
  