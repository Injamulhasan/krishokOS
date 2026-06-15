import {
  getSessionTokenFromCookies,
  getUserFromSessionToken,
} from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const token = await getSessionTokenFromCookies();
  if (!token) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  const user = await getUserFromSessionToken(token);
  if (!user) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  return NextResponse.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      isVerified: user.isVerified,
    },
  });
}
