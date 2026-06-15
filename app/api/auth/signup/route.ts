import { createUser } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, phone, password } = body as {
    name?: string;
    email?: string;
    phone?: string;
    password?: string;
  };

  if (!name || !email || !password) {
    return NextResponse.json(
      { error: "Name, email, and password are required." },
      { status: 400 },
    );
  }

  try {
    const user = await createUser({ name, email, phone, password });
    return NextResponse.json({
      message: "Account created. Verify your email to continue.",
      verificationCode: user.verificationToken,
    });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message ?? "Unable to create account." },
      { status: 400 },
    );
  }
}
