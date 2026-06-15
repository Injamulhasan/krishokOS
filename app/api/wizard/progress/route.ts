import { requireUser } from "@/lib/auth";
import { getWizardByUserId } from "@/lib/wizardDb";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/wizard/progress
 * Get current wizard progress for authenticated user
 */
export async function GET(req: NextRequest) {
  try {
    const user = await requireUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const wizard = await getWizardByUserId(user.id);

    if (!wizard) {
      return NextResponse.json(
        {
          message: "No active wizard",
          hasActiveWizard: false,
        },
        { status: 200 },
      );
    }

    return NextResponse.json(
      {
        wizardId: wizard.id,
        currentStep: wizard.currentStep,
        completedSteps: wizard.completedSteps,
        stepData: wizard.stepData,
        progress: Math.round((wizard.completedSteps.length / 10) * 100),
        isCompleted: wizard.completedAt !== null,
        hasActiveWizard: true,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching wizard progress:", error);
    return NextResponse.json(
      { error: "Failed to fetch progress" },
      { status: 500 },
    );
  }
}
