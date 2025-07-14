import { connectDB } from "@/lib/db";
import { Group } from "@/models/Group";
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
  } catch (error) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  if (decoded.role !== "admin") {
    return NextResponse.json({ error: "Only admins can create groups" }, { status: 403 });
  }

  const { name } = await req.json();

  if (!name) {
    return NextResponse.json({ error: "Group name is required" }, { status: 400 });
  }

  const group = new Group({
    name,
    admin: decoded.id,
    members: [],
    pendingRequests: [],
  });

  await group.save();

  return NextResponse.json({ message: "Group created", group }, { status: 201 });
}
