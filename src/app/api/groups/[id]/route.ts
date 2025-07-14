import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Group } from "@/models/Group";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import mongoose from "mongoose";

export async function GET(_: Request, { params }: { params: { groupId: string } }) {
  await connectDB();

  const cookieStore = await cookies(); // ✅ Await it
  const token = cookieStore.get("auth_token")?.value;


  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let decoded;
  try {
    decoded = verifyToken(token);
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  const groupId = params.groupId;

  if (!mongoose.Types.ObjectId.isValid(groupId)) {
    return NextResponse.json({ error: "Invalid group ID" }, { status: 400 });
  }

  try {
    const group = await Group.findById(groupId).populate("members", "name email");
    
    if (!group) {
      return NextResponse.json({ error: "Group not found" }, { status: 404 });
    }

    return NextResponse.json({ members: group.members }, { status: 200 });
  } catch (error) {
    console.error("Error fetching group members:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
