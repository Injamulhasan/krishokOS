import { requireUser } from "@/lib/auth";
import { updateFarmerProfile } from "@/lib/wizardDb";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(req: NextRequest) {
  try {
    const user = await requireUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, email, phone } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    // Check if email is already taken by another user
    const emailTaken = await prisma.user.findFirst({
      where: {
        email: email.toLowerCase(),
        id: { not: user.id }
      }
    });

    if (emailTaken) {
      return NextResponse.json({ error: "Email already in use" }, { status: 409 });
    }

    // Update user profile in auth database
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        name,
        email: email.toLowerCase(),
        phone: phone || null,
      }
    });

    // Sync with farmer profile if it exists
    await updateFarmerProfile(user.id, {
      fullName: name,
      email,
      phone: phone || "",
    });

    return NextResponse.json({
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
      },
    });
  } catch (error: any) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update profile" },
      { status: 500 }
    );
  }
}
