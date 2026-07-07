import { NextResponse } from "next/server";
import { getClearAuthCookieOptions } from "@/lib/auth";

export async function POST() {
  const response = NextResponse.json({ message: "Logged out successfully" }, { status: 200 });
  response.cookies.set("token", "", getClearAuthCookieOptions());
  return response;
}
