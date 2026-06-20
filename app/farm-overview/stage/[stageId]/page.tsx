import { requireUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import StageClient from "./StageClient";

interface StagePageProps {
  params: Promise<{ stageId: string }>;
}

export default async function StagePage({ params }: StagePageProps) {
  const user = await requireUser();
  if (!user) redirect("/auth/signin");

  const { stageId } = await params;

  return <StageClient stageId={stageId} />;
}
