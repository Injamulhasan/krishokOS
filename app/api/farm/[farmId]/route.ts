import { requireUser } from "@/lib/auth";
import { updateFarm, deleteFarm } from "@/lib/wizardDb";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ farmId: string }> }
) {
  try {
    const user = await requireUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { farmId } = await params;
    const body = await req.json();

    const updated = await updateFarm(farmId, {
      farmName: body.farmName,
      areaSize: body.areaSize ? Number(body.areaSize) : undefined,
      areaUnit: body.areaUnit,
      farmingMethod: body.farmingMethod,
      soilType: body.soilType,
      waterSource: body.waterSource,
      annualBudget: body.annualBudget ? Number(body.annualBudget) : undefined,
    });

    if (!updated) {
      return NextResponse.json({ error: "Farm not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PATCH /api/farm/[farmId] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ farmId: string }> }
) {
  try {
    const user = await requireUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { farmId } = await params;
    const success = await deleteFarm(farmId);

    if (!success) {
      return NextResponse.json({ error: "Farm not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Farm deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/farm/[farmId] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
