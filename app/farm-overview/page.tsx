import { requireUser } from "@/lib/auth";
import { getFarmerByUserId, getFarmByFarmerId } from "@/lib/wizardDb";
import { redirect } from "next/navigation";
import FarmOverviewClient from "./FarmOverviewClient";
import { readFile } from "fs/promises";
import path from "path";

interface PageProps {
  searchParams: Promise<{ crop?: string }>;
}

export default async function FarmOverviewPage({ searchParams }: PageProps) {
  const user = await requireUser();
  if (!user) redirect("/auth/signin");

  const farmer = await getFarmerByUserId(user.id);
  if (!farmer) {
    redirect("/dashboard");
  }

  // Load all farms for this user's farmer records dynamically
  let farmerFarms: any[] = [];
  try {
    const DATA_DIR = process.env.VERCEL === "1" || process.cwd().includes("/var/task") ? "/tmp" : path.join(process.cwd(), "data");
    const farmersPath = path.join(DATA_DIR, "farmers.json");
    const farmsPath = path.join(DATA_DIR, "farms.json");
    
    const farmersData = await readFile(farmersPath, "utf-8");
    const farmsData = await readFile(farmsPath, "utf-8");
    
    const allFarmers = JSON.parse(farmersData);
    const allFarms = JSON.parse(farmsData);
    
    const userFarmers = allFarmers.filter((f: any) => f.userId === user.id);
    const farmerIds = userFarmers.map((f: any) => f.id);
    
    farmerFarms = allFarms.filter((f: any) => farmerIds.includes(f.farmerId));
  } catch (e) {
    console.error("Error loading user farms in overview:", e);
    const singleFarm = await getFarmByFarmerId(farmer.id);
    if (singleFarm) {
      farmerFarms = [singleFarm];
    }
  }

  if (farmerFarms.length === 0) {
    redirect("/dashboard");
  }

  const { crop } = await searchParams;
  const targetCrop = crop?.toLowerCase();

  // Find farm matching targetCrop, or fallback to the first farm
  const selectedFarm = targetCrop
    ? (farmerFarms.find((f: any) => f.primaryCrop.toLowerCase() === targetCrop) || farmerFarms[0])
    : farmerFarms[0];

  return (
    <FarmOverviewClient
      farmerName={farmer.fullName}
      farm={{
        id: selectedFarm.id,
        farmName: selectedFarm.farmName || "",
        primaryCrop: selectedFarm.primaryCrop,
        farmingMethod: selectedFarm.farmingMethod,
        district: selectedFarm.district,
        areaSize: selectedFarm.areaSize,
        areaUnit: selectedFarm.areaUnit,
        soilType: selectedFarm.soilType,
        waterSource: selectedFarm.waterSource,
        annualBudget: selectedFarm.annualBudget,
        budgetCurrency: selectedFarm.budgetCurrency,
      }}
    />
  );
}
