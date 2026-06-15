import { requireUser } from "@/lib/auth";
import { validateStep } from "@/lib/validation";
import { getWizardByUserId, saveWizardStep } from "@/lib/wizardDb";
import { NextRequest, NextResponse } from "next/server";

/**
 * PUT /api/wizard/step/[stepNumber]
 * Save a specific step in the wizard
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ stepNumber: string }> },
) {
  const { stepNumber: stepNumberStr } = await params;
  try {
    const user = await requireUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const stepNumber = parseInt(stepNumberStr);

    if (isNaN(stepNumber) || stepNumber < 1 || stepNumber > 11) {
      return NextResponse.json(
        { error: "Invalid step number" },
        { status: 400 },
      );
    }

    const body = await req.json();
    const stepData = body.stepData || body;

    // Validate step data
    const validation = validateStep(stepNumber, stepData);

    if (!validation.valid) {
      return NextResponse.json(
        {
          error: "Validation failed",
          errors: validation.errors,
        },
        { status: 400 },
      );
    }

    // Get wizard by user ID
    const wizard = await getWizardByUserId(user.id);

    if (!wizard) {
      return NextResponse.json({ error: "Wizard not found" }, { status: 404 });
    }

    // Save step
    const updatedWizard = await saveWizardStep(wizard.id, stepNumber, stepData);

    return NextResponse.json(
      {
        message: "Step saved successfully",
        currentStep: updatedWizard.currentStep,
        completedSteps: updatedWizard.completedSteps,
        nextStep: stepNumber < 11 ? stepNumber + 1 : 11,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error saving wizard step:", error);
    return NextResponse.json({ error: "Failed to save step" }, { status: 500 });
  }
}
