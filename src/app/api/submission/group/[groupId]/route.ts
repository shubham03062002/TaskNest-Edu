import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { Submission } from "@/models/Submission";
import { Group } from "@/models/Group";
import mongoose from "mongoose";

interface Params {
  params: {
    groupId: string;
  };
}

export async function GET(req: Request, { params }: Params) {
  await connectDB();

  const cookieStore =await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let decoded;
  try {
    decoded = verifyToken(token) as { id: string; role: string };
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  if (decoded.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const groupId = params.groupId;

  if (!mongoose.Types.ObjectId.isValid(groupId)) {
    return NextResponse.json({ error: "Invalid group ID" }, { status: 400 });
  }

  const group = await Group.findById(groupId);

  if (!group) {
    return NextResponse.json({ error: "Group not found" }, { status: 404 });
  }

  const submissions = await Submission.find({
    student: { $in: group.members },
  })
    .populate("student", "name email")
    .populate("task", "title");

  return NextResponse.json({ submissions }, { status: 200 });
}
