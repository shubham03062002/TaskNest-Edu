import { connectDB } from "@/lib/db";
import { Submission } from "@/models/Submission";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

interface Params {
  params: {
    id: string; // submission ID
  };
}

export async function PATCH(req: Request, { params }: Params) {
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

  if (decoded.role !== "admin") {
    return NextResponse.json({ error: "Only admins can grade" }, { status: 403 });
  }

  const { points, feedback } = await req.json();

  if (typeof points !== "number" || points < 0 || points > 10) {
    return NextResponse.json({ error: "Points must be between 0 and 10" }, { status: 400 });
  }

  const submission = await Submission.findById(params.id);

  if (!submission) {
    return NextResponse.json({ error: "Submission not found" }, { status: 404 });
  }

  submission.points = points;
  submission.feedback = feedback || "";
  await submission.save();

  return NextResponse.json({ message: "Graded successfully", submission }, { status: 200 });
}
