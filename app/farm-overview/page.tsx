import { requireUser } from "@/lib/auth";
import { getFarmerByUserId, getFarmByFarmerId } from "@/lib/wizardDb";
import { redirect } from "next/navigation";
import FarmOverviewClient from "./FarmOverviewClient";

export default async function FarmOverviewPage() {
  const user = await requireUser();
  if (!user) redirect("/auth/signin");

  const farmer = await getFarmerByUserId(user.id);
  const farm = farmer ? await getFarmByFarmerId(farmer.id) : null;

  if (!farm || !farmer) {
    redirect("/dashboard");
  }

  return (
    <FarmOverviewClient
      farmerName={farmer.fullName}
      farm={{
        primaryCrop: farm.primaryCrop,
        farmingMethod: farm.farmingMethod,
        district: farm.district,
        areaSize: farm.areaSize,
        areaUnit: farm.areaUnit,
        soilType: farm.soilType,
        waterSource: farm.waterSource,
        annualBudget: farm.annualBudget,
        budgetCurrency: farm.budgetCurrency,
      }}
    />
  );
}
