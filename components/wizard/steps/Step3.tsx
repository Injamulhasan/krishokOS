"use client";

import { useLanguage } from "@/lib/useLanguage";
import { validateStep3 } from "@/lib/validation";
import { useEffect, useState } from "react";

interface Step3Props {
  data?: { soilType?: string; waterSource?: string };
  onNext: (data: any) => Promise<void>;
  isLoading?: boolean;
}

export default function Step3({ data, onNext, isLoading }: Step3Props) {
  const { language } = useLanguage();
  const [formData, setFormData] = useState(
    data || { soilType: "", waterSource: "" },
  );
  const [soilTypes, setSoilTypes] = useState<any[]>([]);
  const [waterSources, setWaterSources] = useState<any[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/wizard/locations?type=all");
        const result = await response.json();
        setSoilTypes(result.soilTypes || []);
        setWaterSources(result.waterSources || []);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
    const validation = validateStep3(formData);

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
          {language === "bn" ? "মাটির ধরন" : "Soil Type"} *
        </label>
        <select
          name="soilType"
          value={formData.soilType}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
            errors.soilType ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="">
            {language === "bn" ? "নির্বাচন করুন" : "Select a type"}
          </option>
          {soilTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {language === "bn" ? type.labelbn : type.label}
            </option>
          ))}
        </select>
        {errors.soilType && (
          <p className="text-red-500 text-sm mt-1">{errors.soilType}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {language === "bn" ? "জলের উৎস" : "Water Source"} *
        </label>
        <select
          name="waterSource"
          value={formData.waterSource}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
            errors.waterSource ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="">
            {language === "bn" ? "নির্বাচন করুন" : "Select a source"}
          </option>
          {waterSources.map((source) => (
            <option key={source.value} value={source.value}>
              {language === "bn" ? source.labelbn : source.label}
            </option>
          ))}
        </select>
        {errors.waterSource && (
          <p className="text-red-500 text-sm mt-1">{errors.waterSource}</p>
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
