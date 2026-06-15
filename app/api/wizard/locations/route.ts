import { readFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

/**
 * GET /api/wizard/locations
 * Get all available locations data (districts, upazilas, unions, soil types, water sources)
 *
 * Query params:
 * - type: 'districts' | 'upazilas' | 'unions' | 'soilTypes' | 'waterSources' | 'areaUnits' | 'all'
 * - district: district ID (for fetching upazilas)
 * - upazila: upazila ID (for fetching unions)
 */
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const type = searchParams.get("type") || "all";
    const district = searchParams.get("district");
    const upazila = searchParams.get("upazila");

    const locationsPath = path.join(process.cwd(), "data", "locations.json");
    const locationsData = await readFile(locationsPath, "utf-8");
    const locations = JSON.parse(locationsData);

    if (type === "districts" || type === "all") {
      const districts = locations.districts.map((d: any) => ({
        value: d.id,
        label: d.name,
        labelbn: d.namebn,
      }));

      if (type === "districts") {
        return NextResponse.json({ districts }, { status: 200 });
      }
    }

    if (type === "upazilas" && district) {
      const districtData = locations.districts.find(
        (d: any) => d.id === district,
      );

      if (!districtData) {
        return NextResponse.json(
          { error: "District not found" },
          { status: 404 },
        );
      }

      const upazilas = districtData.upazilas.map((u: any) => ({
        value: u.id,
        label: u.name,
        labelbn: u.namebn,
      }));

      return NextResponse.json({ upazilas }, { status: 200 });
    }

    if (type === "unions" && district && upazila) {
      const districtData = locations.districts.find(
        (d: any) => d.id === district,
      );

      if (!districtData) {
        return NextResponse.json(
          { error: "District not found" },
          { status: 404 },
        );
      }

      const upazilaData = districtData.upazilas.find(
        (u: any) => u.id === upazila,
      );

      if (!upazilaData) {
        return NextResponse.json(
          { error: "Upazila not found" },
          { status: 404 },
        );
      }

      const unions = upazilaData.unions.map((u: string) => ({
        value: u,
        label: u,
      }));

      return NextResponse.json({ unions }, { status: 200 });
    }

    if (type === "soilTypes" || type === "all") {
      if (type === "soilTypes") {
        return NextResponse.json(
          { soilTypes: locations.soilTypes },
          { status: 200 },
        );
      }
    }

    if (type === "waterSources" || type === "all") {
      if (type === "waterSources") {
        return NextResponse.json(
          { waterSources: locations.waterSources },
          { status: 200 },
        );
      }
    }

    if (type === "areaUnits" || type === "all") {
      if (type === "areaUnits") {
        return NextResponse.json(
          { areaUnits: locations.areaUnits },
          { status: 200 },
        );
      }
    }

    if (type === "all") {
      return NextResponse.json(
        {
          districts: locations.districts.map((d: any) => ({
            value: d.id,
            label: d.name,
            labelbn: d.namebn,
          })),
          soilTypes: locations.soilTypes,
          waterSources: locations.waterSources,
          areaUnits: locations.areaUnits,
        },
        { status: 200 },
      );
    }

    return NextResponse.json(
      { error: "Invalid query parameters" },
      { status: 400 },
    );
  } catch (error) {
    console.error("Error fetching locations:", error);
    return NextResponse.json(
      { error: "Failed to fetch locations" },
      { status: 500 },
    );
  }
}
