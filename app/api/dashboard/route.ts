import { requireUser } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await requireUser();
  
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({
    message: "Dashboard loaded.",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
}
