import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { getAuthCookieOptions, getClearAuthCookieOptions, getTokenFromRequest, signToken, verifyToken, hashPassword } from "@/lib/auth";

// ✅ POST - Create user
export async function POST(req) {
  try {
    await connectDB();
    const { username, password } = await req.json();
    if (!username || !password) {
      return NextResponse.json({ error: "Username and password are required" }, { status: 400 });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 });
    }

    const hashedPassword = await hashPassword(password);
    const user = new User({ username, password: hashedPassword });
    await user.save();

    const token = signToken({ username: user.username, id: user._id.toString() });
    const response = NextResponse.json({ message: "User created successfully", user: { username: user.username } }, { status: 201 });
    response.cookies.set("token", token, getAuthCookieOptions());
    return response;
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
      const user = await User.findOne({ username });
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
      return NextResponse.json({ user: { username: user.username } }, { status: 200 });
    }

    const token = getTokenFromRequest(req);
    if (!token) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    try {
      const payload = verifyToken(token);
      return NextResponse.json({ user: { username: payload.username } }, { status: 200 });
    } catch {
      return NextResponse.json({ user: null }, { status: 200 });
    }
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

    if (id) {
      await User.findByIdAndDelete(id);
      const response = NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
      response.cookies.set("token", "", getClearAuthCookieOptions());
      return response;
    }

    const response = NextResponse.json({ message: "Signed out successfully" }, { status: 200 });
    response.cookies.set("token", "", getClearAuthCookieOptions());
    return response;
  } catch (error) {
    console.error("DELETE /api/user error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
