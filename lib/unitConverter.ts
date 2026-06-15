/**
 * Unit Converter for Farm Land Measurements
 * Conversions: decimal ↔ bigha ↔ katha
 * Reference: 1 decimal = 40.47 sq meters, 1 bigha ≈ 1.64 decimal, 1 bigha = 20 katha
 */

export interface ConversionResult {
  decimal: number;
  bigha: number;
  katha: number;
}

// Conversion constants
const DECIMAL_TO_SQ_METER = 40.47;
const BIGHA_TO_DECIMAL = 1.64;
const KATHA_PER_BIGHA = 20;
const DECIMAL_PER_KATHA = BIGHA_TO_DECIMAL / KATHA_PER_BIGHA;

/**
 * Convert from any unit to all units
 * @param value - numeric value
 * @param unit - source unit: 'decimal' | 'bigha' | 'katha'
 * @returns object with all unit conversions
 */
export function convertUnits(
  value: number,
  unit: "decimal" | "bigha" | "katha",
): ConversionResult {
  if (value <= 0) {
    return { decimal: 0, bigha: 0, katha: 0 };
  }

  let decimalValue: number;

  // Convert to decimal first
  if (unit === "decimal") {
    decimalValue = value;
  } else if (unit === "bigha") {
    decimalValue = value * BIGHA_TO_DECIMAL;
  } else if (unit === "katha") {
    decimalValue = value * DECIMAL_PER_KATHA;
  } else {
    throw new Error(`Unknown unit: ${unit}`);
  }

  // Calculate all units
  const bigha = decimalValue / BIGHA_TO_DECIMAL;
  const katha = decimalValue / DECIMAL_PER_KATHA;

  return {
    decimal: roundTo(decimalValue, 2),
    bigha: roundTo(bigha, 2),
    katha: roundTo(katha, 2),
  };
}

/**
 * Convert from one specific unit to another
 * @param value - numeric value
 * @param fromUnit - source unit
 * @param toUnit - target unit
 * @returns converted value
 */
export function convertBetweenUnits(
  value: number,
  fromUnit: "decimal" | "bigha" | "katha",
  toUnit: "decimal" | "bigha" | "katha",
): number {
  if (fromUnit === toUnit) {
    return roundTo(value, 2);
  }

  const allUnits = convertUnits(value, fromUnit);

  if (toUnit === "decimal") {
    return allUnits.decimal;
  } else if (toUnit === "bigha") {
    return allUnits.bigha;
  } else if (toUnit === "katha") {
    return allUnits.katha;
  }

  throw new Error(`Unknown target unit: ${toUnit}`);
}

/**
 * Format a value for display with unit
 * @param value - numeric value
 * @param unit - unit type
 * @param locale - 'en' or 'bn' for English or Bengali
 * @returns formatted string
 */
export function formatAreaDisplay(
  value: number,
  unit: "decimal" | "bigha" | "katha",
  locale: "en" | "bn" = "en",
): string {
  const rounded = roundTo(value, 2);

  const unitLabels: Record<string, Record<string, string>> = {
    en: {
      decimal: "Decimal",
      bigha: "Bigha",
      katha: "Katha",
    },
    bn: {
      decimal: "দশমিক",
      bigha: "বিঘা",
      katha: "কাঠা",
    },
  };

  const label = unitLabels[locale]?.[unit] || unit;
  return `${rounded} ${label}`;
}

/**
 * Get conversion reference string for display
 * @returns string with conversion reference
 */
export function getConversionReference(): string {
  return `1 Decimal ≈ 1.64 Bigha ≈ 32.8 Katha`;
}

/**
 * Get conversion reference string in Bengali
 * @returns Bengali string with conversion reference
 */
export function getConversionReferenceBN(): string {
  return `১ দশমিক ≈ ১.৬৪ বিঘা ≈ ৩২.৮ কাঠা`;
}

/**
 * Validate area value
 * @param value - numeric value
 * @param maxValue - maximum allowed value (in decimal)
 * @returns { valid: boolean, error?: string }
 */
export function validateAreaValue(
  value: number,
  maxValue: number = 10000,
): { valid: boolean; error?: string } {
  if (!value || isNaN(value)) {
    return { valid: false, error: "Area size is required" };
  }

  if (value <= 0) {
    return { valid: false, error: "Area size must be greater than 0" };
  }

  if (value > maxValue) {
    return {
      valid: false,
      error: `Area size cannot exceed ${maxValue} decimal`,
    };
  }

  return { valid: true };
}

/**
 * Round number to specified decimal places
 */
function roundTo(num: number, decimals: number): number {
  return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

// Export unit conversion for testing
export const CONVERSION_CONSTANTS = {
  DECIMAL_TO_SQ_METER,
  BIGHA_TO_DECIMAL,
  KATHA_PER_BIGHA,
  DECIMAL_PER_KATHA,
};
