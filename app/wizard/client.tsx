"use client";

import Step1 from "@/components/wizard/steps/Step1";
import Step10 from "@/components/wizard/steps/Step10";
import Step11 from "@/components/wizard/steps/Step11";
import Step2 from "@/components/wizard/steps/Step2";
import Step3 from "@/components/wizard/steps/Step3";
import Step4 from "@/components/wizard/steps/Step4";
import Step5 from "@/components/wizard/steps/Step5";
import Step6 from "@/components/wizard/steps/Step6";
import Step7 from "@/components/wizard/steps/Step7";
import Step8 from "@/components/wizard/steps/Step8";
import Step9 from "@/components/wizard/steps/Step9";
import SuccessModal from "@/components/wizard/SuccessModal";
import { useWizardProgress } from "@/components/wizard/useWizardProgress";
import WizardLayout from "@/components/wizard/WizardLayout";
import { useLanguage } from "@/lib/useLanguage";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface User {
  id: string;
  email: string;
  name: string;
}

interface WizardClientProps {
  user: User;
}

export default function WizardClient({ user }: WizardClientProps) {
  const { language } = useLanguage();
  const router = useRouter();
  const {
    wizardState,
    loading,
    error: wizardError,
    saveStep,
    goToStep,
    completeWizard,
  } = useWizardProgress();

  const [showSuccess, setShowSuccess] = useState(false);
  const [successData, setSuccessData] = useState<any>(null);
  const [localError, setLocalError] = useState<string | null>(null);

  const stepTitles =
    language === "bn"
      ? [
          "কৃষক পরিচয়",
          "খামার নাম ও ধরন",
          "মাটি ও জল",
          "জেলা",
          "উপজেলা",
          "ইউনিয়ন",
          "জমির আয়তন",
          "প্রধান ফসল",
          "গৌণ ফসল",
          "বার্ষিক বাজেট",
          "পর্যালোচনা ও নিশ্চিত করুন",
        ]
      : [
          "Farmer Identity",
          "Farm Name & Type",
          "Soil & Water",
          "District",
          "Upazila",
          "Union",
          "Land Size",
          "Primary Crop",
          "Secondary Crops",
          "Annual Budget",
          "Review & Confirm",
        ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 dark:from-[#081009] dark:to-[#0c1a0e] flex items-center justify-center transition-colors duration-300">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 dark:border-emerald-500 mx-auto mb-4"></div>
          <p className="text-gray-700 dark:text-gray-300 font-semibold animate-pulse">
            {language === "bn" ? "লোড করছি..." : "Loading..."}
          </p>
        </div>
      </div>
    );
  }

  if (wizardError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 dark:from-[#081009] dark:to-[#0c1a0e] flex items-center justify-center transition-colors duration-300">
        <div className="bg-white dark:bg-[#121c15] rounded-lg shadow-md dark:border dark:border-emerald-900/40 p-8 max-w-md text-center">
          <p className="text-red-600 dark:text-red-400 font-bold mb-4">{wizardError}</p>
          <button
            onClick={() => router.push("/")}
            className="w-full bg-green-600 hover:bg-green-700 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white font-semibold py-2 rounded-lg cursor-pointer transition duration-200"
          >
            {language === "bn" ? "হোম এ ফিরুন" : "Go Home"}
          </button>
        </div>
      </div>
    );
  }

  if (!wizardState) {
    return null;
  }

  const currentStep = wizardState.currentStep;
  const completedSteps = wizardState.completedSteps;
  const stepData = wizardState.stepData;

  const handleStepNext = async (data: any) => {
    try {
      setLocalError(null);
      await saveStep(currentStep, data);
    } catch (err) {
      setLocalError(
        err instanceof Error
          ? err.message
          : language === "bn"
            ? "ত্রুটি হয়েছে"
            : "An error occurred",
      );
    }
  };

  const handleStepClick = (step: number) => {
    goToStep(step);
  };

  const handleConfirm = async () => {
    try {
      setLocalError(null);
      const result = await completeWizard();
      setSuccessData(result);
      setShowSuccess(true);
    } catch (err) {
      setLocalError(
        err instanceof Error
          ? err.message
          : language === "bn"
            ? "উইজার্ড সম্পন্ন করতে ব্যর্থ"
            : "Failed to complete wizard",
      );
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1
            data={stepData[1]}
            onNext={handleStepNext}
            isLoading={loading}
          />
        );
      case 2:
        return (
          <Step2
            data={stepData[2]}
            onNext={handleStepNext}
            isLoading={loading}
          />
        );
      case 3:
        return (
          <Step3
            data={stepData[3]}
            onNext={handleStepNext}
            isLoading={loading}
          />
        );
      case 4:
        return (
          <Step4
            data={stepData[4]}
            onNext={handleStepNext}
            isLoading={loading}
          />
        );
      case 5:
        return (
          <Step5
            data={stepData[5]}
            prevStepData={stepData[4]}
            onNext={handleStepNext}
            isLoading={loading}
          />
        );
      case 6:
        return (
          <Step6
            data={stepData[6]}
            prevStepData={
              stepData[4] && stepData[5]
                ? { ...stepData[4], ...stepData[5] }
                : undefined
            }
            onNext={handleStepNext}
            isLoading={loading}
          />
        );
      case 7:
        return (
          <Step7
            data={stepData[7]}
            onNext={handleStepNext}
            isLoading={loading}
          />
        );
      case 8:
        return (
          <Step8
            data={stepData[8]}
            onNext={handleStepNext}
            isLoading={loading}
          />
        );
      case 9:
        return (
          <Step9
            data={stepData[9]}
            onNext={handleStepNext}
            isLoading={loading}
          />
        );
      case 10:
        return (
          <Step10
            data={stepData[10]}
            onNext={handleStepNext}
            isLoading={loading}
          />
        );
      case 11:
        return (
          <Step11
            allStepData={stepData}
            onConfirm={handleConfirm}
            isLoading={loading}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <WizardLayout
        currentStep={currentStep}
        completedSteps={completedSteps}
        totalSteps={11}
        onStepClick={handleStepClick}
        stepTitles={stepTitles}
      >
        {localError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{localError}</p>
          </div>
        )}

        {renderStepContent()}

        {/* Navigation Buttons */}
        {currentStep > 1 && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={() => goToStep(currentStep - 1)}
              className="flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold"
            >
              <ChevronLeft className="w-4 h-4" />
              {language === "bn" ? "আগের ধাপ" : "Previous Step"}
            </button>
          </div>
        )}
      </WizardLayout>

      <SuccessModal
        isOpen={showSuccess}
        farmer={successData?.farmer}
        farm={successData?.farm}
      />
    </>
  );
}
