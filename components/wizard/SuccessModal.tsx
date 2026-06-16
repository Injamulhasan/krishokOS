"use client";

import { useLanguage } from "@/lib/useLanguage";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

interface SuccessModalProps {
  isOpen: boolean;
  farmer: {
    id: string;
    fullName: string;
    email: string;
  };
  farm: {
    id: string;
    farmName: string;
    farmType: string;
    district: string;
  };
}

export default function SuccessModal({
  isOpen,
  farmer,
  farm,
}: SuccessModalProps) {
  const router = useRouter();
  const { t, language } = useLanguage();

  if (!isOpen) return null;

  const handleViewDashboard = () => {
    router.push("/dashboard");
  };

  return (
    <div className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-xs flex items-center justify-center z-50">
      <div className="bg-white dark:bg-[#121c15] rounded-lg shadow-2xl dark:shadow-none border dark:border-emerald-900/40 p-8 max-w-md w-full mx-4 animate-in fade-in zoom-in duration-300 transition-colors duration-300">
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-green-600 dark:text-emerald-400 mx-auto mb-4" />

          <h2 className="text-2xl font-bold text-gray-900 dark:text-[#e2ede4] mb-2">
            {language === "bn" ? "উইজার্ড সম্পন্ন!" : "Wizard Complete!"}
          </h2>

          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {language === "bn"
              ? "আপনার খামার সফলভাবে তৈরি হয়েছে"
              : "Your farm has been created successfully"}
          </p>

          {/* Farmer Info */}
          <div className="bg-green-50 dark:bg-[#081009] border dark:border-emerald-900/40 rounded-lg p-4 mb-4 text-left transition-colors duration-300">
            <p className="text-sm text-gray-600 dark:text-emerald-400 mb-1 font-medium">
              {language === "bn" ? "কৃষক নাম:" : "Farmer Name:"}
            </p>
            <p className="font-semibold text-gray-900 dark:text-[#e2ede4] mb-3">
              {farmer.fullName}
            </p>

            <p className="text-sm text-gray-600 dark:text-emerald-400 mb-1 font-medium">
              {language === "bn" ? "খামারের নাম:" : "Farm Name:"}
            </p>
            <p className="font-semibold text-gray-900 dark:text-[#e2ede4] mb-3">{farm.farmName}</p>

            <p className="text-sm text-gray-600 dark:text-emerald-400 mb-1 font-medium">
              {language === "bn" ? "প্রকার:" : "Type:"}
            </p>
            <p className="font-semibold text-gray-900 dark:text-[#e2ede4] mb-3">{farm.farmType}</p>

            <p className="text-sm text-gray-600 dark:text-emerald-400 mb-1 font-medium">
              {language === "bn" ? "জেলা:" : "District:"}
            </p>
            <p className="font-semibold text-gray-900 dark:text-[#e2ede4]">{farm.district}</p>
          </div>

          <button
            onClick={handleViewDashboard}
            className="w-full bg-green-600 dark:bg-emerald-600 hover:bg-green-700 dark:hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg transition duration-200 cursor-pointer"
          >
            {language === "bn" ? "ড্যাশবোর্ড দেখুন" : "View Dashboard"}
          </button>
        </div>
      </div>
    </div>
  );
}
