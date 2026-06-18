"use client";

import { useLanguage } from "@/lib/useLanguage";
import { ReactNode } from "react";
import ThemeToggle from "../ThemeToggle";

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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 dark:from-[#081009] dark:to-[#0c1a0e] text-gray-800 dark:text-[#e2ede4] transition-colors duration-300 pb-12">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-200 dark:border-emerald-900/40 bg-white dark:bg-[#121c15] shadow-sm mb-6 transition-colors duration-300">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600 text-white font-bold">
              কৃ
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white leading-none">KrishokOS</h1>
              <p className="mt-1 text-xs font-semibold text-green-600 dark:text-emerald-400">
                {language === "bn" ? "ফার্ম সেটআপ উইজার্ড" : "Farm Setup Wizard"}
              </p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Steps */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-[#121c15] rounded-lg shadow-md dark:border dark:border-emerald-900/40 p-6 sticky top-24 transition-colors duration-300">
              <div className="mb-6">
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                  {language === "bn" ? "অগ্রগতি" : "Progress"}
                </div>
                <div className="w-full bg-gray-200 dark:bg-[#081009] rounded-full h-2">
                  <div
                    className="bg-green-600 dark:bg-emerald-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
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
                          ? "bg-green-600 dark:bg-emerald-600 text-white shadow-md cursor-pointer font-semibold"
                          : isCompleted
                            ? "bg-green-50 dark:bg-emerald-950/20 text-green-700 dark:text-emerald-400 hover:bg-green-100 dark:hover:bg-emerald-950/40 cursor-pointer"
                            : "bg-gray-100 dark:bg-[#081009] text-gray-400 dark:text-gray-600 cursor-not-allowed"
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
                            ✓
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
            <div className="bg-white dark:bg-[#121c15] rounded-lg shadow-md dark:border dark:border-emerald-900/40 p-8 transition-colors duration-300">
              {/* Step Header */}
              <div className="mb-8 pb-6 border-b border-gray-200 dark:border-emerald-900/10">
                <div className="text-sm text-green-600 dark:text-emerald-400 font-semibold mb-2">
                  {language === "bn"
                    ? `ধাপ ${currentStep} এর ${totalSteps}`
                    : `Step ${currentStep} of ${totalSteps}`}
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
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
