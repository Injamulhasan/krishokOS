import { verifyEmailToken } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, code } = body as { email?: string; code?: string };

  if (!email || !code) {
    return NextResponse.json(
      { error: "Email and verification code are required." },
      { status: 400 },
    );
  }

  try {
    await verifyEmailToken(email, code);
    return NextResponse.json({ message: "Email verified successfully." });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message ?? "Unable to verify email." },
      { status: 400 },
    );
  }
}
