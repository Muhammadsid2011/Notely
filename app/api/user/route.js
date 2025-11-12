import {connectDB} from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

// ✅ POST - Create user
export async function POST(req) {
  try {
    await connectDB();
    const { username, password } = await req.json();

    const user = new User({ username, password });
    await user.save();

    return NextResponse.json({ message: "User created successfully" }, { status: 201 });
  } catch (error) {
    console.error("POST /api/user error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ✅ GET - Find by username (or get all)
export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username");

    if (username) {
      // Find by username
      const user = await User.findOne({ username });
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
      return NextResponse.json({ user }, { status: 200 });
    }

    // Otherwise, return all users
    const users = await User.find({});
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error("GET /api/user error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ✅ DELETE - Delete user by ?_id=
export async function DELETE(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("_id");

    if (!id) {
      return NextResponse.json({ error: "User ID not provided" }, { status: 400 });
    }

    await User.findByIdAndDelete(id);
    return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("DELETE /api/user error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
