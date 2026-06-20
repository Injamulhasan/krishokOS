import { requireUser } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import FarmOverviewClient from "./FarmOverviewClient";

interface PageProps {
  searchParams: Promise<{ crop?: string }>;
}

export default async function FarmOverviewPage({ searchParams }: PageProps) {
  const user = await requireUser();
  if (!user) redirect("/auth/signin");

  const farmer = await prisma.farmer.findUnique({
    where: { userId: user.id },
    include: { farms: true },
  });

  if (!farmer || farmer.farms.length === 0) {
    redirect("/dashboard");
  }

  const farmerFarms = farmer.farms;

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
        district: selectedFarm.district || "",
        areaSize: selectedFarm.areaSize || 0,
        areaUnit: selectedFarm.areaUnit || "",
        soilType: selectedFarm.soilType || "",
        waterSource: selectedFarm.waterSource || "",
        annualBudget: selectedFarm.annualBudget || 0,
        budgetCurrency: selectedFarm.budgetCurrency || "BDT",
      }}
    />
  );
}
