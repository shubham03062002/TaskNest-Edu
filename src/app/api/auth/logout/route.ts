import { NextResponse } from "next/server";

export async function POST() {
  // Clear the auth cookie by setting it to expire in the past
  return NextResponse.json(
    { message: "Logged out successfully" },
    {
      status: 200,
      headers: {
        "Set-Cookie": `auth_token=; Path=/; HttpOnly; Max-Age=0; SameSite=Lax`,
      },
    }
  );
}
