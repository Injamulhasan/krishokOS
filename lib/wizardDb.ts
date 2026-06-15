/**
 * Database helper functions for Wizard
 * Manages FARMER, FARM, and WIZARDPROGRESS records
 */

import { randomBytes } from "crypto";
import { readFile, writeFile } from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

interface Farmer {
  id: string;
  userId: string;
  fullName: string;
  phone: string;
  email: string;
  nationalId: string;
  createdAt: number;
  updatedAt: number;
}

interface Farm {
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

interface WizardProgress {
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

// Utility function to generate ID (hex string)
function generateId(): string {
  return randomBytes(16).toString("hex");
}

// Utility function to ensure file exists
async function ensureFileExists(
  filePath: string,
  initialData: any,
): Promise<void> {
  try {
    await readFile(filePath);
  } catch {
    await writeFile(filePath, JSON.stringify(initialData, null, 2));
  }
}

/**
 * Initialize wizard for a user
 */
export async function initializeWizard(
  userId: string,
  initialData?: { crop?: string; farmingMethod?: string },
): Promise<WizardProgress> {
  const wizardProgressPath = path.join(DATA_DIR, "wizard-progress.json");
  await ensureFileExists(wizardProgressPath, []);

  const data = await readFile(wizardProgressPath, "utf-8");
  const wizardProgress: WizardProgress[] = JSON.parse(data);

  // Check if user already has active wizard
  const existingIndex = wizardProgress.findIndex(
    (w) => w.userId === userId && !w.completedAt && w.expiresAt > Date.now(),
  );

  let wizard: WizardProgress;

  if (existingIndex !== -1) {
    // Reset existing wizard progress with the new initialData
    wizard = wizardProgress[existingIndex];
    wizard.currentStep = 1;
    wizard.completedSteps = [];
    wizard.stepData = {};
    wizard.lastSavedAt = Date.now();
    wizard.expiresAt = Date.now() + 24 * 60 * 60 * 1000;
  } else {
    // Create new wizard
    wizard = {
      id: generateId(),
      farmerId: "",
      userId,
      currentStep: 1,
      completedSteps: [],
      stepData: {},
      resumeToken: randomBytes(32).toString("hex"),
      lastSavedAt: Date.now(),
      completedAt: null,
      expiresAt: Date.now() + 24 * 60 * 60 * 1000,
    };
    wizardProgress.push(wizard);
  }

  // Pre-populate if initialData is provided
  if (initialData?.crop || initialData?.farmingMethod) {
    wizard.stepData[8] = {
      primaryCrop: initialData.crop || "",
      farmingMethod: initialData.farmingMethod || "",
    };

    // Auto-pre-fill step 2 farmType since banana & papaya are fruit crops
    if (initialData.crop === "banana" || initialData.crop === "papaya") {
      wizard.stepData[2] = {
        farmName: "",
        farmType: "fruit",
      };
    }
  }

  if (existingIndex !== -1) {
    wizardProgress[existingIndex] = wizard;
  }
  await writeFile(wizardProgressPath, JSON.stringify(wizardProgress, null, 2));

  return wizard;
}

/**
 * Get wizard progress by user ID
 */
export async function getWizardByUserId(
  userId: string,
): Promise<WizardProgress | null> {
  const wizardProgressPath = path.join(DATA_DIR, "wizard-progress.json");
  await ensureFileExists(wizardProgressPath, []);

  const data = await readFile(wizardProgressPath, "utf-8");
  const wizardProgress: WizardProgress[] = JSON.parse(data);

  const wizard = wizardProgress.find(
    (w) => w.userId === userId && !w.completedAt && w.expiresAt > Date.now(),
  );

  return wizard || null;
}

/**
 * Save step data
 */
export async function saveWizardStep(
  wizardId: string,
  stepNumber: number,
  stepData: any,
): Promise<WizardProgress> {
  const wizardProgressPath = path.join(DATA_DIR, "wizard-progress.json");
  const data = await readFile(wizardProgressPath, "utf-8");
  const wizardProgress: WizardProgress[] = JSON.parse(data);

  const wizardIndex = wizardProgress.findIndex((w) => w.id === wizardId);
  if (wizardIndex === -1) {
    throw new Error("Wizard not found");
  }

  const wizard = wizardProgress[wizardIndex];

  // Update step data
  wizard.stepData[stepNumber] = stepData;

  // Mark step as completed if not already
  if (!wizard.completedSteps.includes(stepNumber)) {
    wizard.completedSteps.push(stepNumber);
    wizard.completedSteps.sort((a, b) => a - b);
  }

  // Move to next step
  if (stepNumber < 11) {
    wizard.currentStep = stepNumber + 1;
  }

  wizard.lastSavedAt = Date.now();

  wizardProgress[wizardIndex] = wizard;
  await writeFile(wizardProgressPath, JSON.stringify(wizardProgress, null, 2));

  return wizard;
}

/**
 * Complete wizard and create farmer + farm
 */
export async function completeWizard(
  wizardId: string,
  userId: string,
): Promise<{ farmer: Farmer; farm: Farm }> {
  const wizardProgressPath = path.join(DATA_DIR, "wizard-progress.json");
  const farmersPath = path.join(DATA_DIR, "farmers.json");
  const farmsPath = path.join(DATA_DIR, "farms.json");

  // Ensure files exist
  await ensureFileExists(wizardProgressPath, []);
  await ensureFileExists(farmersPath, []);
  await ensureFileExists(farmsPath, []);

  // Get wizard
  const wizardData = await readFile(wizardProgressPath, "utf-8");
  const wizardProgress: WizardProgress[] = JSON.parse(wizardData);
  const wizardIndex = wizardProgress.findIndex((w) => w.id === wizardId);

  if (wizardIndex === -1) {
    throw new Error("Wizard not found");
  }

  const wizard = wizardProgress[wizardIndex];

  // Validate all steps completed (steps 1 to 10 are data steps)
  if (wizard.completedSteps.length < 10) {
    throw new Error("Not all steps completed");
  }

  // Create farmer record
  const farmer: Farmer = {
    id: generateId(),
    userId,
    fullName: wizard.stepData[1]?.fullName,
    phone: wizard.stepData[1]?.phone,
    email: wizard.stepData[1]?.email,
    nationalId: wizard.stepData[1]?.nationalId,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  // Create farm record
  const farm: Farm = {
    id: generateId(),
    farmerId: farmer.id,
    farmName: wizard.stepData[2]?.farmName,
    farmType: wizard.stepData[2]?.farmType,
    soilType: wizard.stepData[3]?.soilType,
    waterSource: wizard.stepData[3]?.waterSource,
    district: wizard.stepData[4]?.district,
    upazila: wizard.stepData[5]?.upazila,
    union: wizard.stepData[6]?.union,
    areaSize: wizard.stepData[7]?.areaSize,
    areaUnit: wizard.stepData[7]?.areaUnit,
    primaryCrop: wizard.stepData[8]?.primaryCrop,
    farmingMethod: wizard.stepData[8]?.farmingMethod || "organic",
    secondaryCrops: wizard.stepData[9]?.secondaryCrops || [],
    annualBudget: wizard.stepData[10]?.annualBudget,
    budgetCurrency: wizard.stepData[10]?.budgetCurrency,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  // Save farmer and farm
  const farmers: Farmer[] = JSON.parse(await readFile(farmersPath, "utf-8"));
  const farms: Farm[] = JSON.parse(await readFile(farmsPath, "utf-8"));

  farmers.push(farmer);
  farms.push(farm);

  await writeFile(farmersPath, JSON.stringify(farmers, null, 2));
  await writeFile(farmsPath, JSON.stringify(farms, null, 2));

  // Mark wizard as completed
  wizard.farmerId = farmer.id;
  wizard.completedAt = Date.now();
  wizardProgress[wizardIndex] = wizard;
  await writeFile(wizardProgressPath, JSON.stringify(wizardProgress, null, 2));

  return { farmer, farm };
}

/**
 * Get farmer by user ID
 */
export async function getFarmerByUserId(
  userId: string,
): Promise<Farmer | null> {
  const farmersPath = path.join(DATA_DIR, "farmers.json");
  await ensureFileExists(farmersPath, []);

  const data = await readFile(farmersPath, "utf-8");
  const farmers: Farmer[] = JSON.parse(data);

  return farmers.find((f) => f.userId === userId) || null;
}

/**
 * Get farmer by ID
 */
export async function getFarmerById(farmerId: string): Promise<Farmer | null> {
  const farmersPath = path.join(DATA_DIR, "farmers.json");
  await ensureFileExists(farmersPath, []);

  const data = await readFile(farmersPath, "utf-8");
  const farmers: Farmer[] = JSON.parse(data);

  return farmers.find((f) => f.id === farmerId) || null;
}

/**
 * Get farm by ID
 */
export async function getFarmById(farmId: string): Promise<Farm | null> {
  const farmsPath = path.join(DATA_DIR, "farms.json");
  await ensureFileExists(farmsPath, []);

  const data = await readFile(farmsPath, "utf-8");
  const farms: Farm[] = JSON.parse(data);

  return farms.find((f) => f.id === farmId) || null;
}

/**
 * Get farm by farmer ID
 */
export async function getFarmByFarmerId(
  farmerId: string,
): Promise<Farm | null> {
  const farmsPath = path.join(DATA_DIR, "farms.json");
  await ensureFileExists(farmsPath, []);

  const data = await readFile(farmsPath, "utf-8");
  const farms: Farm[] = JSON.parse(data);

  return farms.find((f) => f.farmerId === farmerId) || null;
}

export type { Farm, Farmer, WizardProgress };
