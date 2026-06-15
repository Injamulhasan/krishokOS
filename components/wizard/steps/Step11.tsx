"use client";

import { useLanguage } from "@/lib/useLanguage";
import { useState } from "react";

interface Step11Props {
  allStepData: Record<number, any>;
  onConfirm: () => Promise<void>;
  isLoading?: boolean;
}

export default function Step11({
  allStepData,
  onConfirm,
  isLoading,
}: Step11Props) {
  const { language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onConfirm();
    } finally {
      setIsSubmitting(false);
    }
  };

  const labels =
    language === "bn"
      ? {
          fullName: "নাম",
          phone: "ফোন",
          email: "ইমেইল",
          nationalId: "আইডি",
          farmName: "খামার নাম",
          farmType: "ধরন",
          soilType: "মাটি",
          waterSource: "জল",
          district: "জেলা",
          upazila: "উপজেলা",
          union: "ইউনিয়ন",
          areaSize: "আয়তন",
          areaUnit: "ইউনিট",
          primaryCrop: "প্রধান ফসল",
          secondaryCrops: "গৌণ ফসল",
          annualBudget: "বাজেট",
          budgetCurrency: "মুদ্রা",
        }
      : {
          fullName: "Name",
          phone: "Phone",
          email: "Email",
          nationalId: "ID",
          farmName: "Farm Name",
          farmType: "Type",
          soilType: "Soil",
          waterSource: "Water",
          district: "District",
          upazila: "Upazila",
          union: "Union",
          areaSize: "Area",
          areaUnit: "Unit",
          primaryCrop: "Primary Crop",
          secondaryCrops: "Secondary Crops",
          annualBudget: "Budget",
          budgetCurrency: "Currency",
        };

  const ReviewRow = ({
    label,
    value,
    section,
  }: {
    label: string;
    value: any;
    section?: string;
  }) => {
    if (!value && value !== 0) return null;

    return (
      <div className="py-3 border-b border-gray-200">
        <p className="text-sm text-gray-600">{label}</p>
        <p className="text-sm font-semibold text-gray-900">{value}</p>
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Farmer Info */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {language === "bn" ? "কৃষক তথ্য" : "Farmer Information"}
        </h3>
        <ReviewRow label={labels.fullName} value={allStepData[1]?.fullName} />
        <ReviewRow label={labels.phone} value={allStepData[1]?.phone} />
        <ReviewRow label={labels.email} value={allStepData[1]?.email} />
        <ReviewRow
          label={labels.nationalId}
          value={allStepData[1]?.nationalId}
        />
      </div>

      {/* Farm Info */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {language === "bn" ? "খামার তথ্য" : "Farm Information"}
        </h3>
        <ReviewRow label={labels.farmName} value={allStepData[2]?.farmName} />
        <ReviewRow label={labels.farmType} value={allStepData[2]?.farmType} />
        <ReviewRow label={labels.soilType} value={allStepData[3]?.soilType} />
        <ReviewRow
          label={labels.waterSource}
          value={allStepData[3]?.waterSource}
        />
      </div>

      {/* Location Info */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {language === "bn" ? "অবস্থান" : "Location"}
        </h3>
        <ReviewRow label={labels.district} value={allStepData[4]?.district} />
        <ReviewRow label={labels.upazila} value={allStepData[5]?.upazila} />
        <ReviewRow label={labels.union} value={allStepData[6]?.union} />
      </div>

      {/* Land & Crops */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {language === "bn" ? "জমি ও ফসল" : "Land & Crops"}
        </h3>
        <ReviewRow
          label={labels.areaSize}
          value={`${allStepData[7]?.areaSize} ${allStepData[7]?.areaUnit}`}
        />
        <ReviewRow
          label={labels.primaryCrop}
          value={allStepData[8]?.primaryCrop}
        />
        {allStepData[9]?.secondaryCrops?.length > 0 && (
          <ReviewRow
            label={labels.secondaryCrops}
            value={allStepData[9]?.secondaryCrops?.join(", ")}
          />
        )}
      </div>

      {/* Budget */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {language === "bn" ? "বাজেট" : "Budget"}
        </h3>
        <ReviewRow
          label={labels.annualBudget}
          value={`${allStepData[10]?.annualBudget} ${allStepData[10]?.budgetCurrency}`}
        />
      </div>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <p className="text-sm text-gray-600">
          {language === "bn"
            ? "সমস্ত তথ্য পর্যালোচনা করুন এবং নিশ্চিত করুন যে সবকিছু সঠিক। একবার নিশ্চিত করলে এটি পরিবর্তন করা যাবে না।"
            : "Please review all information and confirm everything is correct. Once confirmed, it cannot be changed."}
        </p>
      </div>

      <button
        type="submit"
        disabled={isSubmitting || isLoading}
        className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition duration-200"
      >
        {isSubmitting || isLoading
          ? language === "bn"
            ? "সম্পন্ন করছি..."
            : "Completing..."
          : language === "bn"
            ? "খামার তৈরি করুন"
            : "Create Farm"}
      </button>
    </form>
  );
}
