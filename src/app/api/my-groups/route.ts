import { connectDB } from "@/lib/db";
import { Group } from "@/models/Group";
import { User } from "@/models/User";

import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  const cookieStore = await cookies();
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
    return NextResponse.json({ error: "Only admins can view their groups" }, { status: 403 });
  }

  try {
    const my_groups = await Group.find({ admin: decoded.id })
      .select("name _id members pendingRequests createdAt")
      .populate("members", "name email")
      .populate("pendingRequests", "name email");

    if (!my_groups || my_groups.length === 0) {
      return NextResponse.json({ groups: [] }, { status: 200 });
    }

    return NextResponse.json({ groups: my_groups }, { status: 200 });
  } catch (err) {
    console.error("Error fetching admin groups:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
