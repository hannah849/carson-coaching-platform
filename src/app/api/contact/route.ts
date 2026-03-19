import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { firstName, lastName, email, subject, message } = body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!firstName?.trim()) return NextResponse.json({ error: "First name is required." }, { status: 400 });
  if (!lastName?.trim()) return NextResponse.json({ error: "Last name is required." }, { status: 400 });
  if (!email?.trim() || !emailRegex.test(email)) return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
  if (!subject?.trim()) return NextResponse.json({ error: "Subject is required." }, { status: 400 });
  if (!message?.trim() || message.trim().length < 10) return NextResponse.json({ error: "Please enter a message (at least 10 characters)." }, { status: 400 });

  // Email delivery (e.g. Resend / SendGrid) added in a future phase
  console.log("Contact form submission:", { firstName, lastName, email, subject, message });

  return NextResponse.json({ success: true });
}
