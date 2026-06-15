/**
 * Validation schemas for 11-Step Farm Setup Wizard
 */

export interface ValidationError {
  field: string;
  message: string;
  messageBN?: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone validation regex (11 digits, starts with 01)
const PHONE_REGEX = /^01[0-9]{9}$/;

// National ID regex (13 digits for NID)
const NID_REGEX = /^[0-9]{13}$/;

/**
 * Step 1: Farmer Identity Validation
 */
export function validateStep1(data: {
  fullName?: string;
  phone?: string;
  email?: string;
  nationalId?: string;
}): ValidationResult {
  const errors: ValidationError[] = [];

  // Full Name validation
  if (!data.fullName?.trim()) {
    errors.push({
      field: "fullName",
      message: "Full name is required",
      messageBN: "সম্পূর্ণ নাম আবশ্যক",
    });
  } else if (data.fullName.trim().length < 3) {
    errors.push({
      field: "fullName",
      message: "Full name must be at least 3 characters",
      messageBN: "নাম কমপক্ষে ৩ টি অক্ষর হতে হবে",
    });
  }

  // Phone validation
  if (!data.phone?.trim()) {
    errors.push({
      field: "phone",
      message: "Phone number is required",
      messageBN: "ফোন নম্বর আবশ্যক",
    });
  } else if (!PHONE_REGEX.test(data.phone)) {
    errors.push({
      field: "phone",
      message: "Phone must be 11 digits starting with 01 (e.g., 01912345678)",
      messageBN: "ফোন ১১ সংখ্যার হতে হবে এবং ০১ দিয়ে শুরু হতে হবে",
    });
  }

  // Email validation
  if (!data.email?.trim()) {
    errors.push({
      field: "email",
      message: "Email is required",
      messageBN: "ইমেইল আবশ্যক",
    });
  } else if (!EMAIL_REGEX.test(data.email)) {
    errors.push({
      field: "email",
      message: "Invalid email format",
      messageBN: "অবৈধ ইমেইল ফর্ম্যাট",
    });
  }

  // National ID validation
  if (!data.nationalId?.trim()) {
    errors.push({
      field: "nationalId",
      message: "National ID is required",
      messageBN: "জাতীয় পরিচয়পত্র আবশ্যক",
    });
  } else if (!NID_REGEX.test(data.nationalId.replace(/[^0-9]/g, ""))) {
    errors.push({
      field: "nationalId",
      message: "National ID must be 13 digits",
      messageBN: "জাতীয় পরিচয়পত্র ১৩ সংখ্যার হতে হবে",
    });
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Step 2: Farm Name & Type Validation
 */
export function validateStep2(data: {
  farmName?: string;
  farmType?: string;
}): ValidationResult {
  const errors: ValidationError[] = [];

  if (!data.farmName?.trim()) {
    errors.push({
      field: "farmName",
      message: "Farm name is required",
      messageBN: "খামারের নাম আবশ্যক",
    });
  } else if (data.farmName.trim().length < 3) {
    errors.push({
      field: "farmName",
      message: "Farm name must be at least 3 characters",
      messageBN: "খামারের নাম কমপক্ষে ৩ টি অক্ষর হতে হবে",
    });
  }

  if (!data.farmType) {
    errors.push({
      field: "farmType",
      message: "Farm type is required",
      messageBN: "খামারের ধরন আবশ্যক",
    });
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Step 3: Soil & Water Validation
 */
export function validateStep3(data: {
  soilType?: string;
  waterSource?: string;
}): ValidationResult {
  const errors: ValidationError[] = [];

  if (!data.soilType) {
    errors.push({
      field: "soilType",
      message: "Soil type is required",
      messageBN: "মাটির ধরন আবশ্যক",
    });
  }

  if (!data.waterSource) {
    errors.push({
      field: "waterSource",
      message: "Water source is required",
      messageBN: "জলের উৎস আবশ্যক",
    });
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Step 4: District Selection Validation
 */
export function validateStep4(data: { district?: string }): ValidationResult {
  const errors: ValidationError[] = [];

  if (!data.district) {
    errors.push({
      field: "district",
      message: "District is required",
      messageBN: "জেলা আবশ্যক",
    });
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Step 5: Upazila Selection Validation
 */
export function validateStep5(data: { upazila?: string }): ValidationResult {
  const errors: ValidationError[] = [];

  if (!data.upazila) {
    errors.push({
      field: "upazila",
      message: "Upazila is required",
      messageBN: "উপজেলা আবশ্যক",
    });
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Step 6: Union Selection Validation
 */
export function validateStep6(data: { union?: string }): ValidationResult {
  const errors: ValidationError[] = [];

  if (!data.union) {
    errors.push({
      field: "union",
      message: "Union is required",
      messageBN: "ইউনিয়ন আবশ্যক",
    });
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Step 7: Land Size Validation
 */
export function validateStep7(data: {
  areaSize?: number;
  areaUnit?: string;
}): ValidationResult {
  const errors: ValidationError[] = [];

  if (!data.areaSize && data.areaSize !== 0) {
    errors.push({
      field: "areaSize",
      message: "Land area is required",
      messageBN: "জমির আয়তন আবশ্যক",
    });
  } else if (data.areaSize <= 0) {
    errors.push({
      field: "areaSize",
      message: "Land area must be greater than 0",
      messageBN: "জমির আয়তন ০ এর চেয়ে বড় হতে হবে",
    });
  } else if (data.areaSize > 50000) {
    errors.push({
      field: "areaSize",
      message: "Land area exceeds maximum allowed",
      messageBN: "জমির আয়তন সর্বোচ্চ অনুমোদিত মাত্রা অতিক্রম করেছে",
    });
  }

  if (!data.areaUnit) {
    errors.push({
      field: "areaUnit",
      message: "Unit is required",
      messageBN: "ইউনিট আবশ্যক",
    });
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Step 8: Primary Crop Validation
 */
export function validateStep8(data: {
  primaryCrop?: string;
}): ValidationResult {
  const errors: ValidationError[] = [];

  if (!data.primaryCrop) {
    errors.push({
      field: "primaryCrop",
      message: "Primary crop is required",
      messageBN: "প্রধান ফসল আবশ্যক",
    });
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Step 9: Secondary Crops Validation (optional)
 */
export function validateStep9(data: {
  secondaryCrops?: string[];
}): ValidationResult {
  const errors: ValidationError[] = [];

  // Secondary crops are optional, so always valid
  // Just validate if they exist
  if (
    data.secondaryCrops &&
    Array.isArray(data.secondaryCrops) &&
    data.secondaryCrops.length > 5
  ) {
    errors.push({
      field: "secondaryCrops",
      message: "Maximum 5 secondary crops allowed",
      messageBN: "সর্বোচ্চ ৫টি গৌণ ফসল অনুমোদিত",
    });
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Step 10: Budget Validation
 */
export function validateStep10(data: {
  annualBudget?: number;
  budgetCurrency?: string;
}): ValidationResult {
  const errors: ValidationError[] = [];

  if (!data.annualBudget && data.annualBudget !== 0) {
    errors.push({
      field: "annualBudget",
      message: "Annual budget is required",
      messageBN: "বার্ষিক বাজেট আবশ্যক",
    });
  } else if (data.annualBudget <= 0) {
    errors.push({
      field: "annualBudget",
      message: "Budget must be greater than 0",
      messageBN: "বাজেট ০ এর চেয়ে বড় হতে হবে",
    });
  } else if (data.annualBudget > 100000000) {
    // 100 million limit
    errors.push({
      field: "annualBudget",
      message: "Budget exceeds maximum allowed",
      messageBN: "বাজেট সর্বোচ্চ অনুমোদিত মাত্রা অতিক্রম করেছে",
    });
  }

  if (!data.budgetCurrency) {
    errors.push({
      field: "budgetCurrency",
      message: "Currency is required",
      messageBN: "মুদ্রা আবশ্যক",
    });
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Step 11: Review (always valid, but check if all required fields are present)
 */
export function validateStep11(
  allStepsData: Record<string, any>,
): ValidationResult {
  const errors: ValidationError[] = [];

  // Check if all critical steps have data
  for (let step = 1; step <= 10; step++) {
    if (!allStepsData[step] || Object.keys(allStepsData[step]).length === 0) {
      errors.push({
        field: `step${step}`,
        message: `Step ${step} data is missing`,
        messageBN: `ধাপ ${step} এর তথ্য অনুপস্থিত`,
      });
    }
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Validate a specific step by step number
 */
export function validateStep(stepNumber: number, data: any): ValidationResult {
  switch (stepNumber) {
    case 1:
      return validateStep1(data);
    case 2:
      return validateStep2(data);
    case 3:
      return validateStep3(data);
    case 4:
      return validateStep4(data);
    case 5:
      return validateStep5(data);
    case 6:
      return validateStep6(data);
    case 7:
      return validateStep7(data);
    case 8:
      return validateStep8(data);
    case 9:
      return validateStep9(data);
    case 10:
      return validateStep10(data);
    case 11:
      return validateStep11(data);
    default:
      return {
        valid: false,
        errors: [{ field: "step", message: "Invalid step number" }],
      };
  }
}
