import { requireUser } from "@/lib/auth";
import { getFarmerByUserId, getFarmByFarmerId } from "@/lib/wizardDb";
import { redirect } from "next/navigation";
import ProfileClient from "./ProfileClient";

export default async function ProfilePage() {
  const user = await requireUser();

  if (!user) {
    redirect("/auth/signin");
  }

  // Load user's actual farm details if they completed the setup wizard
  const farmer = await getFarmerByUserId(user.id);
  const farm = farmer ? await getFarmByFarmerId(farmer.id) : null;

  return <ProfileClient user={user} farm={farm} />;
}
