/**
 * Database helper functions for Wizard (Prisma/Supabase PostgreSQL Edition)
 * Manages FARMER, FARM, and WIZARDPROGRESS records via Prisma Client.
 */

import { randomBytes } from "crypto";
import prisma from "@/lib/prisma";

export interface Farmer {
  id: string;
  userId: string;
  fullName: string;
  phone: string;
  email: string;
  nationalId: string;
  createdAt: number;
  updatedAt: number;
}

export interface Farm {
  id: string;
  farmerId: string;
  farmName: string;
  farmType: string;
  soilType: string;
  waterSource: string;
  district: string;
  upazila: string;
  union: string;
  areaSize: number;
  areaUnit: string;
  primaryCrop: string;
  farmingMethod: string;
  secondaryCrops?: string[];
  annualBudget: number;
  budgetCurrency: string;
  createdAt: number;
  updatedAt: number;
}

export interface WizardProgress {
  id: string;
  farmerId: string;
  userId: string;
  currentStep: number;
  completedSteps: number[];
  stepData: Record<number, any>;
  resumeToken: string;
  lastSavedAt: number;
  completedAt: number | null;
  expiresAt: number;
}

/**
 * Initialize wizard progress for a user in the database
 */
export async function initializeWizard(
  userId: string,
  initialData?: { crop?: string; farmingMethod?: string },
): Promise<WizardProgress> {
  // Check if user already has active wizard
  let wizard = await prisma.wizardProgress.findFirst({
    where: {
      userId,
      completedAt: null,
      expiresAt: { gt: new Date() },
    },
  });

  const stepData: Record<number, any> = {};
  if (initialData?.crop || initialData?.farmingMethod) {
    stepData[8] = {
      primaryCrop: initialData.crop || "",
      farmingMethod: initialData.farmingMethod || "",
    };

    if (initialData.crop === "banana" || initialData.crop === "papaya") {
      stepData[2] = {
        farmName: "",
        farmType: "fruit",
      };
    }
  }

  if (wizard) {
    // Reset existing wizard
    wizard = await prisma.wizardProgress.update({
      where: { id: wizard.id },
      data: {
        currentStep: 1,
        completedSteps: [],
        stepData: stepData as any,
        lastSavedAt: new Date(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    });
  } else {
    // Create new wizard
    wizard = await prisma.wizardProgress.create({
      data: {
        userId,
        currentStep: 1,
        completedSteps: [],
        stepData: stepData as any,
        resumeToken: randomBytes(32).toString("hex"),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    });
  }

  return {
    id: wizard.id,
    farmerId: wizard.farmerId || "",
    userId: wizard.userId,
    currentStep: wizard.currentStep,
    completedSteps: wizard.completedSteps,
    stepData: wizard.stepData as any,
    resumeToken: wizard.resumeToken,
    lastSavedAt: wizard.lastSavedAt.getTime(),
    completedAt: wizard.completedAt ? wizard.completedAt.getTime() : null,
    expiresAt: wizard.expiresAt.getTime(),
  };
}

/**
 * Get wizard progress by user ID
 */
export async function getWizardByUserId(
  userId: string,
): Promise<WizardProgress | null> {
  const wizard = await prisma.wizardProgress.findFirst({
    where: {
      userId,
      completedAt: null,
      expiresAt: { gt: new Date() },
    },
  });

  if (!wizard) return null;

  return {
    id: wizard.id,
    farmerId: wizard.farmerId || "",
    userId: wizard.userId,
    currentStep: wizard.currentStep,
    completedSteps: wizard.completedSteps,
    stepData: wizard.stepData as any,
    resumeToken: wizard.resumeToken,
    lastSavedAt: wizard.lastSavedAt.getTime(),
    completedAt: wizard.completedAt ? wizard.completedAt.getTime() : null,
    expiresAt: wizard.expiresAt.getTime(),
  };
}

/**
 * Save wizard step data to the database
 */
export async function saveWizardStep(
  wizardId: string,
  stepNumber: number,
  stepData: any,
): Promise<WizardProgress> {
  const wizard = await prisma.wizardProgress.findUnique({
    where: { id: wizardId },
  });

  if (!wizard) {
    throw new Error("Wizard not found");
  }

  const currentStepData = (wizard.stepData as Record<number, any>) || {};
  currentStepData[stepNumber] = stepData;

  const completedSteps = [...wizard.completedSteps];
  if (!completedSteps.includes(stepNumber)) {
    completedSteps.push(stepNumber);
    completedSteps.sort((a, b) => a - b);
  }

  let nextStep = wizard.currentStep;
  if (stepNumber < 11) {
    nextStep = stepNumber + 1;
  }

  const updatedWizard = await prisma.wizardProgress.update({
    where: { id: wizardId },
    data: {
      stepData: currentStepData as any,
      completedSteps,
      currentStep: nextStep,
      lastSavedAt: new Date(),
    },
  });

  return {
    id: updatedWizard.id,
    farmerId: updatedWizard.farmerId || "",
    userId: updatedWizard.userId,
    currentStep: updatedWizard.currentStep,
    completedSteps: updatedWizard.completedSteps,
    stepData: updatedWizard.stepData as any,
    resumeToken: updatedWizard.resumeToken,
    lastSavedAt: updatedWizard.lastSavedAt.getTime(),
    completedAt: updatedWizard.completedAt ? updatedWizard.completedAt.getTime() : null,
    expiresAt: updatedWizard.expiresAt.getTime(),
  };
}

/**
 * Complete wizard and create/update farmer + farm in database
 */
export async function completeWizard(
  wizardId: string,
  userId: string,
): Promise<{ farmer: Farmer; farm: Farm }> {
  const wizard = await prisma.wizardProgress.findUnique({
    where: { id: wizardId },
  });

  if (!wizard) {
    throw new Error("Wizard not found");
  }

  const stepData = (wizard.stepData as Record<number, any>) || {};

  // Check if farmer already exists for user, or create one
  let farmer = await prisma.farmer.findUnique({
    where: { userId },
  });

  if (!farmer) {
    farmer = await prisma.farmer.create({
      data: {
        userId,
        fullName: stepData[1]?.fullName || "Farmer",
        phone: stepData[1]?.phone || "",
        email: stepData[1]?.email || "",
        nationalId: stepData[1]?.nationalId || "",
      },
    });
  } else {
    // Update existing farmer with wizard step 1 details
    farmer = await prisma.farmer.update({
      where: { userId },
      data: {
        fullName: stepData[1]?.fullName || farmer.fullName,
        phone: stepData[1]?.phone || farmer.phone,
        email: stepData[1]?.email || farmer.email,
        nationalId: stepData[1]?.nationalId || farmer.nationalId,
      },
    });
  }

  // Create new farm
  const farm = await prisma.farm.create({
    data: {
      farmerId: farmer.id,
      farmName: stepData[2]?.farmName || "",
      farmType: stepData[2]?.farmType || "",
      soilType: stepData[3]?.soilType || "",
      waterSource: stepData[3]?.waterSource || "",
      district: stepData[4]?.district || "",
      upazila: stepData[5]?.upazila || "",
      union: stepData[6]?.union || "",
      areaSize: stepData[7]?.areaSize ? parseFloat(stepData[7].areaSize) : 0,
      areaUnit: stepData[7]?.areaUnit || "",
      primaryCrop: stepData[8]?.primaryCrop || "",
      farmingMethod: stepData[8]?.farmingMethod || "organic",
      secondaryCrops: stepData[9]?.secondaryCrops || [],
      annualBudget: stepData[10]?.annualBudget ? parseFloat(stepData[10].annualBudget) : 0,
      budgetCurrency: stepData[10]?.budgetCurrency || "BDT",
    },
  });

  // Mark wizard as completed
  await prisma.wizardProgress.update({
    where: { id: wizardId },
    data: {
      farmerId: farmer.id,
      completedAt: new Date(),
    },
  });

  return {
    farmer: {
      id: farmer.id,
      userId: farmer.userId,
      fullName: farmer.fullName,
      phone: farmer.phone || "",
      email: farmer.email || "",
      nationalId: farmer.nationalId || "",
      createdAt: farmer.createdAt.getTime(),
      updatedAt: farmer.updatedAt.getTime(),
    },
    farm: {
      id: farm.id,
      farmerId: farm.farmerId,
      farmName: farm.farmName || "",
      farmType: farm.farmType || "",
      soilType: farm.soilType || "",
      waterSource: farm.waterSource || "",
      district: farm.district || "",
      upazila: farm.upazila || "",
      union: farm.union || "",
      areaSize: farm.areaSize || 0,
      areaUnit: farm.areaUnit || "",
      primaryCrop: farm.primaryCrop,
      farmingMethod: farm.farmingMethod,
      secondaryCrops: farm.secondaryCrops || [],
      annualBudget: farm.annualBudget || 0,
      budgetCurrency: farm.budgetCurrency || "BDT",
      createdAt: farm.createdAt.getTime(),
      updatedAt: farm.updatedAt.getTime(),
    },
  };
}

/**
 * Get farmer by user ID
 */
export async function getFarmerByUserId(
  userId: string,
): Promise<Farmer | null> {
  const farmer = await prisma.farmer.findUnique({
    where: { userId },
  });
  if (!farmer) return null;
  return {
    id: farmer.id,
    userId: farmer.userId,
    fullName: farmer.fullName,
    phone: farmer.phone || "",
    email: farmer.email || "",
    nationalId: farmer.nationalId || "",
    createdAt: farmer.createdAt.getTime(),
    updatedAt: farmer.updatedAt.getTime(),
  };
}

/**
 * Get farmer by ID
 */
export async function getFarmerById(farmerId: string): Promise<Farmer | null> {
  const farmer = await prisma.farmer.findUnique({
    where: { id: farmerId },
  });
  if (!farmer) return null;
  return {
    id: farmer.id,
    userId: farmer.userId,
    fullName: farmer.fullName,
    phone: farmer.phone || "",
    email: farmer.email || "",
    nationalId: farmer.nationalId || "",
    createdAt: farmer.createdAt.getTime(),
    updatedAt: farmer.updatedAt.getTime(),
  };
}

/**
 * Get farm by ID
 */
export async function getFarmById(farmId: string): Promise<Farm | null> {
  const farm = await prisma.farm.findUnique({
    where: { id: farmId },
  });
  if (!farm) return null;
  return {
    id: farm.id,
    farmerId: farm.farmerId,
    farmName: farm.farmName || "",
    farmType: farm.farmType || "",
    soilType: farm.soilType || "",
    waterSource: farm.waterSource || "",
    district: farm.district || "",
    upazila: farm.upazila || "",
    union: farm.union || "",
    areaSize: farm.areaSize || 0,
    areaUnit: farm.areaUnit || "",
    primaryCrop: farm.primaryCrop,
    farmingMethod: farm.farmingMethod,
    secondaryCrops: farm.secondaryCrops || [],
    annualBudget: farm.annualBudget || 0,
    budgetCurrency: farm.budgetCurrency || "BDT",
    createdAt: farm.createdAt.getTime(),
    updatedAt: farm.updatedAt.getTime(),
  };
}

/**
 * Get farm by farmer ID
 */
export async function getFarmByFarmerId(
  farmerId: string,
): Promise<Farm | null> {
  const farm = await prisma.farm.findFirst({
    where: { farmerId },
  });
  if (!farm) return null;
  return {
    id: farm.id,
    farmerId: farm.farmerId,
    farmName: farm.farmName || "",
    farmType: farm.farmType || "",
    soilType: farm.soilType || "",
    waterSource: farm.waterSource || "",
    district: farm.district || "",
    upazila: farm.upazila || "",
    union: farm.union || "",
    areaSize: farm.areaSize || 0,
    areaUnit: farm.areaUnit || "",
    primaryCrop: farm.primaryCrop,
    farmingMethod: farm.farmingMethod,
    secondaryCrops: farm.secondaryCrops || [],
    annualBudget: farm.annualBudget || 0,
    budgetCurrency: farm.budgetCurrency || "BDT",
    createdAt: farm.createdAt.getTime(),
    updatedAt: farm.updatedAt.getTime(),
  };
}

/**
 * Update farmer profile
 */
export async function updateFarmerProfile(
  userId: string,
  update: { fullName: string; phone: string; email: string }
): Promise<Farmer | null> {
  const farmer = await prisma.farmer.update({
    where: { userId },
    data: {
      fullName: update.fullName,
      phone: update.phone,
      email: update.email,
    },
  });

  return {
    id: farmer.id,
    userId: farmer.userId,
    fullName: farmer.fullName,
    phone: farmer.phone || "",
    email: farmer.email || "",
    nationalId: farmer.nationalId || "",
    createdAt: farmer.createdAt.getTime(),
    updatedAt: farmer.updatedAt.getTime(),
  };
}

/**
 * Update farm details
 */
export async function updateFarm(
  farmId: string,
  update: Partial<Omit<Farm, "id" | "farmerId" | "createdAt" | "updatedAt">>
): Promise<Farm | null> {
  const farm = await prisma.farm.update({
    where: { id: farmId },
    data: {
      farmName: update.farmName,
      farmType: update.farmType,
      soilType: update.soilType,
      waterSource: update.waterSource,
      district: update.district,
      upazila: update.upazila,
      union: update.union,
      areaSize: update.areaSize,
      areaUnit: update.areaUnit,
      primaryCrop: update.primaryCrop,
      farmingMethod: update.farmingMethod,
      secondaryCrops: update.secondaryCrops,
      annualBudget: update.annualBudget,
      budgetCurrency: update.budgetCurrency,
    },
  });

  return {
    id: farm.id,
    farmerId: farm.farmerId,
    farmName: farm.farmName || "",
    farmType: farm.farmType || "",
    soilType: farm.soilType || "",
    waterSource: farm.waterSource || "",
    district: farm.district || "",
    upazila: farm.upazila || "",
    union: farm.union || "",
    areaSize: farm.areaSize || 0,
    areaUnit: farm.areaUnit || "",
    primaryCrop: farm.primaryCrop,
    farmingMethod: farm.farmingMethod,
    secondaryCrops: farm.secondaryCrops || [],
    annualBudget: farm.annualBudget || 0,
    budgetCurrency: farm.budgetCurrency || "BDT",
    createdAt: farm.createdAt.getTime(),
    updatedAt: farm.updatedAt.getTime(),
  };
}

/**
 * Delete farm
 */
export async function deleteFarm(farmId: string): Promise<boolean> {
  try {
    await prisma.farm.delete({
      where: { id: farmId },
    });
    return true;
  } catch {
    return false;
  }
}
