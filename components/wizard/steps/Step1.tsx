"use client";

import { useLanguage } from "@/lib/useLanguage";
import { validateStep1 } from "@/lib/validation";
import { useState } from "react";

interface Step1Props {
  data?: {
    fullName?: string;
    phone?: string;
    email?: string;
    nationalId?: string;
  };
  onNext: (data: any) => Promise<void>;
  isLoading?: boolean;
}

export default function Step1({ data, onNext, isLoading }: Step1Props) {
  const { language } = useLanguage();
  const [formData, setFormData] = useState(
    data || {
      fullName: "",
      phone: "",
      email: "",
      nationalId: "",
    },
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
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

    const validation = validateStep1(formData);

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
          {language === "bn" ? "সম্পূর্ণ নাম" : "Full Name"} *
        </label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder={
            language === "bn" ? "আপনার সম্পূর্ণ নাম" : "Your full name"
          }
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
            errors.fullName ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.fullName && (
          <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {language === "bn" ? "ফোন নম্বর" : "Phone Number"} *
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder={language === "bn" ? "০১৯১২৩৪৫৬৭৮" : "01912345678"}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
            errors.phone ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.phone && (
          <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {language === "bn" ? "ইমেইল ঠিকানা" : "Email Address"} *
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder={
            language === "bn" ? "উদাহরণ@ইমেইল.কম" : "example@email.com"
          }
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {language === "bn" ? "জাতীয় পরিচয়পত্র" : "National ID"} *
        </label>
        <input
          type="text"
          name="nationalId"
          value={formData.nationalId}
          onChange={handleChange}
          placeholder={language === "bn" ? "১৩ সংখ্যার আইডি" : "13-digit ID"}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
            errors.nationalId ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.nationalId && (
          <p className="text-red-500 text-sm mt-1">{errors.nationalId}</p>
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
