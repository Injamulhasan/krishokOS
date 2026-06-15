import { readFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

/**
 * GET /api/wizard/crops
 * Get all available crops and farm types
 *
 * Query params:
 * - type: 'all' | 'crops' | 'farmTypes'
 */
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const type = searchParams.get("type") || "all";

    const cropsPath = path.join(process.cwd(), "data", "crops.json");
    const cropsData = await readFile(cropsPath, "utf-8");
    const crops = JSON.parse(cropsData);

    if (type === "crops" || type === "all") {
      const cropsList = crops.crops.map((c: any) => ({
        value: c.value,
        label: c.label,
        labelbn: c.labelbn,
        category: c.category,
      }));

      if (type === "crops") {
        return NextResponse.json({ crops: cropsList }, { status: 200 });
      }
    }

    if (type === "farmTypes" || type === "all") {
      if (type === "farmTypes") {
        return NextResponse.json(
          { farmTypes: crops.farmTypes },
          { status: 200 },
        );
      }
    }

    if (type === "all") {
      return NextResponse.json(
        {
          crops: crops.crops.map((c: any) => ({
            value: c.value,
            label: c.label,
            labelbn: c.labelbn,
          })),
          farmTypes: crops.farmTypes,
        },
        { status: 200 },
      );
    }

    return NextResponse.json(
      { error: "Invalid query parameters" },
      { status: 400 },
    );
  } catch (error) {
    console.error("Error fetching crops:", error);
    return NextResponse.json(
      { error: "Failed to fetch crops" },
      { status: 500 },
    );
  }
}
