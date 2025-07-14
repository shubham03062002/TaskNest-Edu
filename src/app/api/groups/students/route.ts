import { connectDB } from "@/lib/db";
import { Group } from "@/models/Group";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
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

  if (decoded.role !== "student") {
    return NextResponse.json({ message: "Only students can access this route" }, { status: 403 });
  }

  // Fetch all groups where student is in 'members'
  // const groups = await Group.find({ members: decoded.id }).select("name _id");
  const groups = await Group.find().select("name _id");;

  return NextResponse.json({ groups }, { status: 200 });
}
