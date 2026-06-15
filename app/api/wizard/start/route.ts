import { requireUser } from "@/lib/auth";
import { initializeWizard } from "@/lib/wizardDb";
import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/wizard/start
 * Initialize a new wizard for the authenticated user
 */
export async function POST(req: NextRequest) {
  try {
    const user = await requireUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const { crop, farmingMethod } = body;

    const wizard = await initializeWizard(user.id, { crop, farmingMethod });

    return NextResponse.json(
      {
        message: "Wizard initialized",
        wizardId: wizard.id,
        currentStep: wizard.currentStep,
        resumeToken: wizard.resumeToken,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error initializing wizard:", error);
    return NextResponse.json(
      { error: "Failed to initialize wizard" },
      { status: 500 },
    );
  }
}
