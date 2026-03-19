import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { firstName, email } = body;

  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "Email is required." }, { status: 400 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  if (firstName !== undefined && (typeof firstName !== "string" || firstName.trim() === "")) {
    return NextResponse.json({ error: "First name is required." }, { status: 400 });
  }

  // ConvertKit integration added in Phase 7
  console.log("Email signup:", { firstName, email });

  return NextResponse.json({ success: true });
}
