"use client";

import { useLanguage } from "@/lib/useLanguage";
import { validateStep5 } from "@/lib/validation";
import { useEffect, useState } from "react";

interface Step5Props {
  data?: { upazila?: string };
  prevStepData?: { district?: string };
  onNext: (data: any) => Promise<void>;
  isLoading?: boolean;
}

export default function Step5({
  data,
  prevStepData,
  onNext,
  isLoading,
}: Step5Props) {
  const { language } = useLanguage();
  const [formData, setFormData] = useState(data || { upazila: "" });
  const [upazilas, setUpazilas] = useState<any[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (prevStepData?.district) {
      const fetchUpazilas = async () => {
        try {
          const response = await fetch(
            `/api/wizard/locations?type=upazilas&district=${prevStepData.district}`,
          );
          const result = await response.json();
          setUpazilas(result.upazilas || []);
        } catch (err) {
          console.error("Failed to fetch upazilas:", err);
        }
      };
      fetchUpazilas();
    }
  }, [prevStepData?.district]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ upazila: e.target.value });
    if (errors.upazila) {
      setErrors({});
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateStep5(formData);

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
          {language === "bn" ? "উপজেলা নির্বাচন করুন" : "Select Upazila"} *
        </label>
        <select
          value={formData.upazila}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
            errors.upazila ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="">
            {language === "bn" ? "উপজেলা নির্বাচন করুন" : "Choose an upazila"}
          </option>
          {upazilas.map((upazila) => (
            <option key={upazila.value} value={upazila.value}>
              {language === "bn" ? upazila.labelbn : upazila.label}
            </option>
          ))}
        </select>
        {errors.upazila && (
          <p className="text-red-500 text-sm mt-1">{errors.upazila}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting || isLoading || upazilas.length === 0}
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
