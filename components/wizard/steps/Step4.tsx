"use client";

import { useLanguage } from "@/lib/useLanguage";
import { validateStep4 } from "@/lib/validation";
import { useEffect, useState } from "react";

interface Step4Props {
  data?: { district?: string };
  onNext: (data: any) => Promise<void>;
  isLoading?: boolean;
}

export default function Step4({ data, onNext, isLoading }: Step4Props) {
  const { language } = useLanguage();
  const [formData, setFormData] = useState(data || { district: "" });
  const [districts, setDistricts] = useState<any[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const response = await fetch("/api/wizard/locations?type=districts");
        const result = await response.json();
        setDistricts(result.districts || []);
      } catch (err) {
        console.error("Failed to fetch districts:", err);
      }
    };
    fetchDistricts();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ district: e.target.value });
    if (errors.district) {
      setErrors({});
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateStep4(formData);

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
          {language === "bn" ? "জেলা নির্বাচন করুন" : "Select District"} *
        </label>
        <select
          value={formData.district}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
            errors.district ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="">
            {language === "bn" ? "জেলা নির্বাচন করুন" : "Choose a district"}
          </option>
          {districts.map((district) => (
            <option key={district.value} value={district.value}>
              {language === "bn" ? district.labelbn : district.label}
            </option>
          ))}
        </select>
        {errors.district && (
          <p className="text-red-500 text-sm mt-1">{errors.district}</p>
        )}
      </div>

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
