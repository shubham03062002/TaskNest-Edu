import { connectDB } from "@/lib/db";
import { Task } from "@/models/Task";
import { Group } from "@/models/Group";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectDB();

  const cookieStore = await cookies(); // ✅ Await it
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
    return NextResponse.json({ error: "Only admins can create tasks" }, { status: 403 });
  }

  const { title, description, dueDate, groupId } = await req.json();

  if (!title || !dueDate || !groupId) {
    return NextResponse.json({ error: "Title, dueDate, and groupId required" }, { status: 400 });
  }

  const group = await Group.findById(groupId);
  if (!group || group.admin.toString() !== decoded.id) {
    return NextResponse.json({ error: "Group not found or access denied" }, { status: 404 });
  }

  const task = new Task({
    title,
    description,
    dueDate,
    group: groupId,
    createdBy: decoded.id,
    
  });

  await task.save();

  return NextResponse.json({ message: "Task created", task }, { status: 201 });
}


export async function GET(req: Request) {
    await connectDB();
    const cookieStore = await cookies(); // ✅ Await it
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
  
    const { searchParams } = new URL(req.url);
    const groupId = searchParams.get("groupId")?.trim();
  
    if (!groupId) {
      return NextResponse.json({ error: "groupId is required" }, { status: 400 });
    }
  
    const group = await Group.findById(groupId);
    if (!group) {
      return NextResponse.json({ error: "Group not found" }, { status: 404 });
    }
  
    const userId = decoded.id;
  
    const isAllowed =
      decoded.role === "admin"
        ? group.admin.toString() === userId
        : group.members.some((id) => id.toString() === userId);
  
    if (!isAllowed) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }
  
    const tasks = await Task.find({ group: groupId }).sort({ dueDate: 1 });
  
    return NextResponse.json({ tasks }, { status: 200 });
  }
  