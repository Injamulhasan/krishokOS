import { createPasswordResetToken } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { email } = body as { email?: string };

  if (!email) {
    return NextResponse.json({ error: "Email is required." }, { status: 400 });
  }

  try {
    const { token } = await createPasswordResetToken(email);
    return NextResponse.json({
      message: "Password reset token created.",
      resetToken: token,
    });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message ?? "Unable to create reset token." },
      { status: 400 },
    );
  }
}
