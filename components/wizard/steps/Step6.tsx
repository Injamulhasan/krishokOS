"use client";

import { useLanguage } from "@/lib/useLanguage";
import { validateStep6 } from "@/lib/validation";
import { useEffect, useState } from "react";

interface Step6Props {
  data?: { union?: string };
  prevStepData?: { district?: string; upazila?: string };
  onNext: (data: any) => Promise<void>;
  isLoading?: boolean;
}

export default function Step6({
  data,
  prevStepData,
  onNext,
  isLoading,
}: Step6Props) {
  const { language } = useLanguage();
  const [formData, setFormData] = useState(data || { union: "" });
  const [unions, setUnions] = useState<any[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (prevStepData?.district && prevStepData?.upazila) {
      const fetchUnions = async () => {
        try {
          const response = await fetch(
            `/api/wizard/locations?type=unions&district=${prevStepData.district}&upazila=${prevStepData.upazila}`,
          );
          const result = await response.json();
          setUnions(result.unions || []);
        } catch (err) {
          console.error("Failed to fetch unions:", err);
        }
      };
      fetchUnions();
    }
  }, [prevStepData?.district, prevStepData?.upazila]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ union: e.target.value });
    if (errors.union) {
      setErrors({});
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateStep6(formData);

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
          {language === "bn" ? "ইউনিয়ন নির্বাচন করুন" : "Select Union"} *
        </label>
        <select
          value={formData.union}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
            errors.union ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="">
            {language === "bn" ? "ইউনিয়ন নির্বাচন করুন" : "Choose a union"}
          </option>
          {unions.map((union) => (
            <option key={union.value} value={union.value}>
              {union.label}
            </option>
          ))}
        </select>
        {errors.union && (
          <p className="text-red-500 text-sm mt-1">{errors.union}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting || isLoading || unions.length === 0}
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
