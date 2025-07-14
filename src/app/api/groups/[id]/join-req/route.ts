import { connectDB } from "@/lib/db";
import { Group } from "@/models/Group";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

interface Params {
  params: {
    id: string; // group id
  };
}

export async function POST(req: Request, { params }: Params) {
  await connectDB();

  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let decoded;
  try {
    decoded = verifyToken(token) as { id: string; role: string };
  } catch (error) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  if (decoded.role !== "student") {
    return NextResponse.json({ error: "Only students can join groups" }, { status: 403 });
  }

  const group = await Group.findById(params.id);

  if (!group) {
    return NextResponse.json({ error: "Group not found" }, { status: 404 });
  }

  // Check if already a member
  if (group.members.includes(decoded.id)) {
    return NextResponse.json({ message: "Already a group member" }, { status: 200 });
  }

  // Check if already requested
  if (group.pendingRequests.includes(decoded.id)) {
    return NextResponse.json({ message: "Request already sent" }, { status: 200 });
  }

  // Add to pending requests
  group.pendingRequests.push(decoded.id);
  await group.save();

  return NextResponse.json({ message: "Join request sent" }, { status: 200 });
}
