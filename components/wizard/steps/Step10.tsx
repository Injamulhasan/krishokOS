"use client";

import { useLanguage } from "@/lib/useLanguage";
import { validateStep10 } from "@/lib/validation";
import { useState } from "react";

interface Step10Props {
  data?: { annualBudget?: number; budgetCurrency?: string };
  onNext: (data: any) => Promise<void>;
  isLoading?: boolean;
}

export default function Step10({ data, onNext, isLoading }: Step10Props) {
  const { language } = useLanguage();
  const [formData, setFormData] = useState(
    data || { annualBudget: 0, budgetCurrency: "BDT" },
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "annualBudget" ? parseFloat(value) || 0 : value,
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
    const validation = validateStep10(formData);

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
          {language === "bn" ? "বার্ষিক বাজেট" : "Annual Budget"} *
        </label>
        <input
          type="number"
          name="annualBudget"
          value={formData.annualBudget}
          onChange={handleChange}
          placeholder={language === "bn" ? "বাজেট পরিমাণ" : "Budget amount"}
          step="1000"
          min="0"
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
            errors.annualBudget ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.annualBudget && (
          <p className="text-red-500 text-sm mt-1">{errors.annualBudget}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {language === "bn" ? "মুদ্রা" : "Currency"} *
        </label>
        <select
          name="budgetCurrency"
          value={formData.budgetCurrency}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
            errors.budgetCurrency ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="BDT">BDT (টাকা)</option>
          <option value="USD">USD ($)</option>
        </select>
        {errors.budgetCurrency && (
          <p className="text-red-500 text-sm mt-1">{errors.budgetCurrency}</p>
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
