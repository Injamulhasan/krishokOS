import {
  getSessionTokenFromCookies,
  getUserFromSessionToken,
} from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const token = await getSessionTokenFromCookies();
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await getUserFromSessionToken(token);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({
    message: "Dashboard loaded.",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      isVerified: user.isVerified,
    },
  });
}
