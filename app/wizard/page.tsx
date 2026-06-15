import { requireUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import WizardClient from "./client";

/**
 * /app/wizard/page.tsx
 * Entry point for the 11-step farm setup wizard
 * Server component that checks authentication
 */
export default async function WizardPage() {
  const user = await requireUser();

  if (!user) {
    redirect("/auth/signin");
  }

  return <WizardClient user={user} />;
}
