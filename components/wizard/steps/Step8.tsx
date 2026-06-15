"use client";

import { useLanguage } from "@/lib/useLanguage";
import { validateStep8 } from "@/lib/validation";
import { useEffect, useState } from "react";

interface Step8Props {
  data?: { primaryCrop?: string };
  onNext: (data: any) => Promise<void>;
  isLoading?: boolean;
}

export default function Step8({ data, onNext, isLoading }: Step8Props) {
  const { language } = useLanguage();
  const [formData, setFormData] = useState(data || { primaryCrop: "" });
  const [crops, setCrops] = useState<any[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const response = await fetch("/api/wizard/crops?type=crops");
        const result = await response.json();
        setCrops(result.crops || []);
      } catch (err) {
        console.error("Failed to fetch crops:", err);
      }
    };
    fetchCrops();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ primaryCrop: e.target.value });
    if (errors.primaryCrop) {
      setErrors({});
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateStep8(formData);

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
          {language === "bn" ? "প্রধান ফসল" : "Primary Crop"} *
        </label>
        <select
          value={formData.primaryCrop}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
            errors.primaryCrop ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="">
            {language === "bn" ? "নির্বাচন করুন" : "Select a crop"}
          </option>
          {crops.map((crop) => (
            <option key={crop.value} value={crop.value}>
              {language === "bn" ? crop.labelbn : crop.label}
            </option>
          ))}
        </select>
        {errors.primaryCrop && (
          <p className="text-red-500 text-sm mt-1">{errors.primaryCrop}</p>
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
