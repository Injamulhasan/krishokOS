"use client";

import { convertUnits, getConversionReference } from "@/lib/unitConverter";
import { useLanguage } from "@/lib/useLanguage";
import { validateStep7 } from "@/lib/validation";
import { useEffect, useState } from "react";

interface Step7Props {
  data?: { areaSize?: number; areaUnit?: string };
  onNext: (data: any) => Promise<void>;
  isLoading?: boolean;
}

export default function Step7({ data, onNext, isLoading }: Step7Props) {
  const { language } = useLanguage();
  const [formData, setFormData] = useState(
    data || { areaSize: 0, areaUnit: "decimal" },
  );
  const [conversions, setConversions] = useState<any>(null);
  const [areaUnits, setAreaUnits] = useState<any[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const response = await fetch("/api/wizard/locations?type=areaUnits");
        const result = await response.json();
        setAreaUnits(result.areaUnits || []);
      } catch (err) {
        console.error("Failed to fetch area units:", err);
      }
    };
    fetchUnits();
  }, []);

  useEffect(() => {
    if (
      formData.areaSize !== undefined &&
      formData.areaSize > 0 &&
      formData.areaUnit
    ) {
      const result = convertUnits(formData.areaSize, formData.areaUnit as any);
      setConversions(result);
    }
  }, [formData.areaSize, formData.areaUnit]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "areaSize" ? parseFloat(value) || 0 : value,
    }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateStep7(formData);

    if (!validation.valid) {
      const errorMap: Record<string, string> = {};
      validation.errors.forEach((err) => {
        errorMap[err.field] =
          language === "bn" ? err.messageBN || err.message : err.message;
      });
      setErrors(errorMap);
      return;
    }

    setIsSubmitting(true);
    try {
      await onNext(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {language === "bn" ? "জমির আয়তন" : "Land Area"} *
        </label>
        <input
          type="number"
          name="areaSize"
          value={formData.areaSize}
          onChange={handleChange}
          placeholder={
            language === "bn" ? "আয়তন প্রবেশ করুন" : "Enter area size"
          }
          step="0.01"
          min="0"
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
            errors.areaSize ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.areaSize && (
          <p className="text-red-500 text-sm mt-1">{errors.areaSize}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {language === "bn" ? "ইউনিট" : "Unit"} *
        </label>
        <select
          name="areaUnit"
          value={formData.areaUnit}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
            errors.areaUnit ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="">
            {language === "bn" ? "নির্বাচন করুন" : "Select a unit"}
          </option>
          {areaUnits.map((unit) => (
            <option key={unit.value} value={unit.value}>
              {language === "bn" ? unit.labelbn : unit.label}
            </option>
          ))}
        </select>
        {errors.areaUnit && (
          <p className="text-red-500 text-sm mt-1">{errors.areaUnit}</p>
        )}
      </div>

      {conversions && (
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm font-semibold text-gray-700 mb-2">
            {language === "bn" ? "রূপান্তর" : "Conversions"}:
          </p>
          <p className="text-sm text-gray-600">
            {language === "bn"
              ? `${conversions.decimal} দশমিক = ${conversions.bigha} বিঘা = ${conversions.katha} কাঠা`
              : `${conversions.decimal} Decimal = ${conversions.bigha} Bigha = ${conversions.katha} Katha`}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            {getConversionReference()}
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting || isLoading}
        className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition duration-200"
      >
        {isSubmitting || isLoading
          ? language === "bn"
            ? "সংরক্ষণ করছি..."
            : "Saving..."
          : language === "bn"
            ? "পরবর্তী ধাপ"
            : "Next Step"}
      </button>
    </form>
  );
}
