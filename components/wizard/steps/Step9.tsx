"use client";

import { useLanguage } from "@/lib/useLanguage";
import { validateStep9 } from "@/lib/validation";
import { useEffect, useState } from "react";

interface Step9Props {
  data?: { secondaryCrops?: string[] };
  onNext: (data: any) => Promise<void>;
  isLoading?: boolean;
}

export default function Step9({ data, onNext, isLoading }: Step9Props) {
  const { language } = useLanguage();
  const [formData, setFormData] = useState(data || { secondaryCrops: [] });
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

  const handleCropToggle = (cropValue: string) => {
    setFormData((prev) => {
      const selected = prev.secondaryCrops || [];
      if (selected.includes(cropValue)) {
        return {
          secondaryCrops: selected.filter((c) => c !== cropValue),
        };
      } else if (selected.length < 5) {
        return { secondaryCrops: [...selected, cropValue] };
      }
      return prev;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateStep9(formData);

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

  const selected = formData.secondaryCrops || [];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {language === "bn"
            ? `গৌণ ফসল (ঐচ্ছিক - সর্বোচ্চ ৫টি, নির্বাচিত: ${selected.length})`
            : `Secondary Crops (Optional - Max 5, Selected: ${selected.length})`}
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {crops.map((crop) => (
            <label
              key={crop.value}
              className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-green-50 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selected.includes(crop.value)}
                onChange={() => handleCropToggle(crop.value)}
                disabled={
                  selected.length >= 5 && !selected.includes(crop.value)
                }
                className="w-4 h-4 text-green-600 rounded"
              />
              <span className="ml-3 text-sm text-gray-700">
                {language === "bn" ? crop.labelbn : crop.label}
              </span>
            </label>
          ))}
        </div>
        {errors.secondaryCrops && (
          <p className="text-red-500 text-sm mt-2">{errors.secondaryCrops}</p>
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
