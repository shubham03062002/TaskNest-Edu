
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Group } from "@/models/Group";
import { User } from "@/models/User";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import mongoose from "mongoose";
import { request } from "http";

export async function GET(
  _: Request,
  { params }: { params: { groupId: string } }
) {
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

  const groupId = params.id;

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

// import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/db";
// import { Group } from "@/models/Group";
// import { User } from "@/models/User"; // <--- ADD THIS IMPORT
// import { cookies } from "next/headers";
// import { verifyToken } from "@/lib/auth";
// import mongoose from "mongoose";

// export async function GET(_: Request, { params }: { params: { groupId: string } }) {
//   await connectDB();

//   // Explicitly reference the User model here to ensure it's loaded and registered.
//   // This is a common workaround for "MissingSchemaError" in Next.js API routes
//   // where module loading might not guarantee order for Mongoose model registration.
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const ensureUserLoaded = User; 

//   const cookieStore = await cookies(); 
//   const token = cookieStore.get("auth_token")?.value;

//   if (!token) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   let decoded;
//   try {
//     decoded = verifyToken(token);
//     // You might want to add a check here to ensure the decoded token contains a valid user ID
//     // and that this user is authorized to view group members.
//     // For example: if (!decoded || !decoded.userId) return NextResponse.json({ error: "Invalid token payload" }, { status: 401 });
//   } catch (error) {
//     console.error("Token verification failed:", error); // Log the actual error for debugging
//     return NextResponse.json({ error: "Invalid token" }, { status: 401 });
//   }

//   // IMPORTANT: You are using a hardcoded groupId here.
//   // The params object should contain the groupId from the URL.
//   // const groupId = "686b6fb623faed548cdeb56f"; // This line should likely be removed or commented out
//   const groupId = "686b6fb623faed548cdeb56f";

//   if (!mongoose.Types.ObjectId.isValid(groupId)) {
//     return NextResponse.json({ error: "Invalid group ID" }, { status: 400 });
//   }

//   try {
//     // Ensure the User model is imported and its schema is registered before this line.
//     const group = await Group.findById(groupId).populate("members", "name email");

//     if (!group) {
//       return NextResponse.json({ error: "Group not found" }, { status: 404 });
//     }

//     // You might also want to check if the authenticated user is a member of this group
//     // or has permission to view its members before returning the data.
//     // For example:
//     // const isMember = group.members.some((member: any) => member._id.toString() === decoded.userId);
//     // if (!isMember) {
//     //   return NextResponse.json({ error: "Forbidden: Not a member of this group" }, { status: 403 });
//     // }

//     return NextResponse.json({ members: group.members }, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching group members:", error);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }

// // Your User model definition (assuming it's in a separate file like models/User.ts)
// // This part should *not* be in your route.ts file, but in its own model file.
// /*
// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     role: {
//       type: String,
//       enum: ["admin", "student"],
//       default: "student",
//     },
//     groups: [{ type: mongoose.Schema.Types.ObjectId, ref: "Group" }],
//   },
//   { timestamps: true }
// );

// export const User =
//   mongoose.models.User || mongoose.model("User", userSchema);
// */
