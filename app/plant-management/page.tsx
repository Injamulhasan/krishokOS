import { requireUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import PlantManagementClient from "./PlantManagementClient";

export default async function PlantManagementPage() {
  const user = await requireUser();

  if (!user) {
    redirect("/auth/signin");
  }

  return <PlantManagementClient user={user} />;
}
