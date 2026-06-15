import { requireUser } from "@/lib/auth";
import { completeWizard, getWizardByUserId } from "@/lib/wizardDb";
import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/wizard/complete
 * Complete the wizard and create farmer + farm records
 */
export async function POST(req: NextRequest) {
  try {
    const user = await requireUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const wizard = await getWizardByUserId(user.id);

    if (!wizard) {
      return NextResponse.json({ error: "Wizard not found" }, { status: 404 });
    }

    // Check if all steps are completed (steps 1 to 10 are input steps)
    if (wizard.completedSteps.length < 10) {
      return NextResponse.json(
        {
          error: "Cannot complete wizard - not all steps are done",
          completedSteps: wizard.completedSteps.length,
          requiredSteps: 10,
        },
        { status: 400 },
      );
    }

    // Complete wizard and create farmer + farm
    const { farmer, farm } = await completeWizard(wizard.id, user.id);

    return NextResponse.json(
      {
        message: "Wizard completed successfully",
        farmer: {
          id: farmer.id,
          fullName: farmer.fullName,
          email: farmer.email,
          phone: farmer.phone,
        },
        farm: {
          id: farm.id,
          farmName: farm.farmName,
          farmType: farm.farmType,
          district: farm.district,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error completing wizard:", error);
    return NextResponse.json(
      { error: "Failed to complete wizard" },
      { status: 500 },
    );
  }
}
