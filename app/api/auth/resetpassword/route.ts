import { resetPasswordWithToken } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, token, password } = body as {
    email?: string;
    token?: string;
    password?: string;
  };

  if (!email || !token || !password) {
    return NextResponse.json(
      { error: "Email, token and new password are required." },
      { status: 400 },
    );
  }

  try {
    await resetPasswordWithToken(email, token, password);
    return NextResponse.json({ message: "Password reset successfully." });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message ?? "Unable to reset password." },
      { status: 400 },
    );
  }
}
