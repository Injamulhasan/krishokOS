import { requireUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import StageClient from "./StageClient";

interface StagePageProps {
  params: Promise<{ stageId: string }>;
  searchParams: Promise<{ crop?: string }>;
}

export default async function StagePage({ params, searchParams }: StagePageProps) {
  const user = await requireUser();
  if (!user) redirect("/auth/signin");

  const { stageId } = await params;
  const { crop } = await searchParams;

  return <StageClient stageId={stageId} crop={crop} />;
}
