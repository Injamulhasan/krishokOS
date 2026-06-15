"use client";

import { useLanguage } from "@/lib/useLanguage";
import { ReactNode } from "react";

interface WizardLayoutProps {
  currentStep: number;
  completedSteps: number[];
  totalSteps: number;
  children: ReactNode;
  onStepClick: (step: number) => void;
  stepTitles: string[];
}

export default function WizardLayout({
  currentStep,
  completedSteps,
  totalSteps,
  children,
  onStepClick,
  stepTitles,
}: WizardLayoutProps) {
  const { t, language } = useLanguage();
  const progress = Math.round((completedSteps.length / totalSteps) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Steps */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <div className="mb-6">
                <div className="text-sm font-medium text-gray-600 mb-2">
                  {language === "bn" ? "অগ্রগতি" : "Progress"}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  {completedSteps.length}/{totalSteps}{" "}
                  {language === "bn" ? "সম্পন্ন" : "Completed"}
                </div>
              </div>

              {/* Steps List */}
              <div className="space-y-2">
                {stepTitles.map((title, index) => {
                  const step = index + 1;
                  const isCompleted = completedSteps.includes(step);
                  const isCurrent = step === currentStep;
                  const canClick = isCompleted || step <= currentStep;

                  return (
                    <button
                      key={step}
                      onClick={() => canClick && onStepClick(step)}
                      disabled={!canClick}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                        isCurrent
                          ? "bg-green-600 text-white shadow-md"
                          : isCompleted
                            ? "bg-green-50 text-green-700 hover:bg-green-100"
                            : "bg-gray-100 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-semibold">
                            {language === "bn" ? `ধাপ ${step}` : `Step ${step}`}
                          </div>
                          <div className="text-xs opacity-75">{title}</div>
                        </div>
                        {isCompleted && (
                          <div className="text-lg">
                            {language === "bn" ? "✓" : "✓"}
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-8">
              {/* Step Header */}
              <div className="mb-8 pb-6 border-b border-gray-200">
                <div className="text-sm text-green-600 font-semibold mb-2">
                  {language === "bn"
                    ? `ধাপ ${currentStep} এর ${totalSteps}`
                    : `Step ${currentStep} of ${totalSteps}`}
                </div>
                <h2 className="text-3xl font-bold text-gray-900">
                  {stepTitles[currentStep - 1]}
                </h2>
              </div>

              {/* Step Content */}
              <div>{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
