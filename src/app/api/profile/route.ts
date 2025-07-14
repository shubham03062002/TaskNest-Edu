import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { User } from "@/models/User";

export async function GET() {
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
  const user = await User.findById(decoded.id).select("-password");

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ user }, { status: 200 });
}
