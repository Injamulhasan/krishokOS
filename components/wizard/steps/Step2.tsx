"use client";

import { useLanguage } from "@/lib/useLanguage";
import { validateStep2 } from "@/lib/validation";
import { useEffect, useState } from "react";

interface Step2Props {
  data?: { farmName?: string; farmType?: string };
  onNext: (data: any) => Promise<void>;
  isLoading?: boolean;
}

export default function Step2({ data, onNext, isLoading }: Step2Props) {
  const { language } = useLanguage();
  const [formData, setFormData] = useState(
    data || { farmName: "", farmType: "" },
  );
  const [farmTypes, setFarmTypes] = useState<any[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchFarmTypes = async () => {
      try {
        const response = await fetch("/api/wizard/crops?type=farmTypes");
        const result = await response.json();
        setFarmTypes(result.farmTypes || []);
      } catch (err) {
        console.error("Failed to fetch farm types:", err);
      }
    };
    fetchFarmTypes();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
    const validation = validateStep2(formData);

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
          {language === "bn" ? "খামারের নাম" : "Farm Name"} *
        </label>
        <input
          type="text"
          name="farmName"
          value={formData.farmName}
          onChange={handleChange}
          placeholder={
            language === "bn" ? "আপনার খামারের নাম" : "Your farm name"
          }
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
            errors.farmName ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.farmName && (
          <p className="text-red-500 text-sm mt-1">{errors.farmName}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {language === "bn" ? "খামারের ধরন" : "Farm Type"} *
        </label>
        <select
          name="farmType"
          value={formData.farmType}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
            errors.farmType ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="">
            {language === "bn" ? "নির্বাচন করুন" : "Select a type"}
          </option>
          {farmTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {language === "bn" ? type.labelbn : type.label}
            </option>
          ))}
        </select>
        {errors.farmType && (
          <p className="text-red-500 text-sm mt-1">{errors.farmType}</p>
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
