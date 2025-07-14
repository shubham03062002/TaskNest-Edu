import { connectDB } from "@/lib/db";
import { Group } from "@/models/Group";
import { User } from "@/models/User"; // Ensure User is registered
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

interface Params {
  params: {
    id: string; // group ID from URL
  };
}

export async function POST(req: Request, { params }: Params) {
  await connectDB();

  const cookieStore = cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let decoded;
  try {
    decoded = verifyToken(token) as { id: string; role: string };
  } catch (err) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  if (decoded.role !== "admin") {
    return NextResponse.json({ error: "Only admin can accept requests" }, { status: 403 });
  }

  const { studentId } = await req.json();

  if (!studentId) {
    return NextResponse.json({ error: "Student ID required" }, { status: 400 });
  }

  const group = await Group.findById(params.id).populate("pendingRequests", "name email");

  if (!group) {
    return NextResponse.json({ error: "Group not found" }, { status: 404 });
  }

  // Check if requester is the group's admin
  if (group.admin.toString() !== decoded.id) {
    return NextResponse.json({ error: "Only the group's admin can accept requests" }, { status: 403 });
  }

  // ✅ Fix: ObjectId comparison using .some
  const isPending = group.pendingRequests.some((user: any) => user._id.toString() === studentId);

  if (!isPending) {
    return NextResponse.json({ error: "No such join request found" }, { status: 404 });
  }

  // ✅ Remove from pendingRequests and add to members
  group.pendingRequests = group.pendingRequests.filter(
    (user: any) => user._id.toString() !== studentId
  );
  group.members.push(studentId);
  await group.save();

  return NextResponse.json({ message: "Student added to group" }, { status: 200 });
}

