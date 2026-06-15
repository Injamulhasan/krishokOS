import {
  authenticateUser,
  createAuthToken,
  getSessionResponse,
} from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { identifier, password } = body as {
    identifier?: string;
    password?: string;
  };

  if (!identifier || !password) {
    return NextResponse.json(
      { error: "Identifier and password are required." },
      { status: 400 },
    );
  }

  const user = await authenticateUser(identifier, password);
  if (!user) {
    return NextResponse.json(
      { error: "Invalid credentials." },
      { status: 401 },
    );
  }

  if (!user.isVerified) {
    return NextResponse.json(
      { error: "Email not verified.", needsVerification: true },
      { status: 403 },
    );
  }

  const token = createAuthToken(user.id);
  return getSessionResponse(
    {
      message: "Signed in successfully.",
      user: { name: user.name, email: user.email },
    },
    token,
  );
}
