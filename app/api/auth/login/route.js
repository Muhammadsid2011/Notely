import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { getAuthCookieOptions, signToken, comparePassword } from "@/lib/auth";

export async function POST(req) {
  try {
    await connectDB();
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password are required" }, { status: 400 });
    }

    const user = await User.findOne({ username });
    const validPassword = user ? await comparePassword(password, user.password) : false;
    if (!user || !validPassword) {
      return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
    }

    const token = signToken({ username: user.username, id: user._id.toString() });
    const response = NextResponse.json({ user: { username: user.username } }, { status: 200 });
    response.cookies.set("token", token, getAuthCookieOptions());
    return response;
  } catch (error) {
    console.error("POST /api/auth/login error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
