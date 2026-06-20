import { requireUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import AIAgronomistClient from "./AIAgronomistClient";

export default async function AIAgronomistPage() {
  const user = await requireUser();

  if (!user) {
    redirect("/auth/signin");
  }

  return <AIAgronomistClient userName={user.name || "Farmer"} />;
}
