"use client";

import { useLanguage } from "@/lib/useLanguage";
import { ReactNode } from "react";
import ThemeToggle from "@/components/ThemeToggle";

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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 dark:from-[#081009] dark:to-[#0b130c] py-8 transition-colors duration-300">
      <div className="container mx-auto px-4">
        {/* Wizard Header Bar */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-green-200/40 dark:border-emerald-900/40">
          <div>
            <h1 className="text-2xl font-black text-green-800 dark:text-emerald-400">
              {language === "bn" ? "খামার সেটআপ উইজার্ড" : "Farm Setup Wizard"}
            </h1>
            <p className="text-xs text-green-700/70 dark:text-emerald-500/70 font-medium">
              {language === "bn" ? "আপনার ব্যক্তিগত ড্যাশবোর্ড সক্রিয় করুন" : "Initialize your personalized dashboard"}
            </p>
          </div>
          <ThemeToggle />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Steps */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-[#121c15] rounded-lg shadow-md dark:shadow-none border dark:border-emerald-900/40 p-6 sticky top-8 transition-colors duration-300">
              <div className="mb-6">
                <div className="text-sm font-medium text-gray-600 dark:text-emerald-400 mb-2">
                  {language === "bn" ? "অগ্রগতি" : "Progress"}
                </div>
                <div className="w-full bg-gray-200 dark:bg-emerald-950/60 rounded-full h-2">
                  <div
                    className="bg-green-600 dark:bg-emerald-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 font-medium">
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
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all cursor-pointer ${
                        isCurrent
                          ? "bg-green-600 dark:bg-emerald-600 text-white shadow-md font-bold"
                          : isCompleted
                            ? "bg-green-50 dark:bg-emerald-950/30 text-green-700 dark:text-emerald-400 hover:bg-green-100 dark:hover:bg-emerald-900/20 font-semibold"
                            : "bg-gray-100 dark:bg-[#0b130c]/40 text-gray-500 dark:text-gray-600 cursor-not-allowed"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm">
                            {language === "bn" ? `ধাপ ${step}` : `Step ${step}`}
                          </div>
                          <div className="text-xs opacity-75 line-clamp-1">{title}</div>
                        </div>
                        {isCompleted && (
                          <div className="text-lg font-bold text-green-600 dark:text-emerald-400">
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
            <div className="bg-white dark:bg-[#121c15] rounded-lg shadow-md dark:shadow-none border dark:border-emerald-900/40 p-8 transition-colors duration-300">
              {/* Step Header */}
              <div className="mb-8 pb-6 border-b border-gray-200 dark:border-emerald-900/40">
                <div className="text-sm text-green-600 dark:text-emerald-400 font-semibold mb-2">
                  {language === "bn"
                    ? `ধাপ ${currentStep} এর ${totalSteps}`
                    : `Step ${currentStep} of ${totalSteps}`}
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-[#e2ede4]">
                  {stepTitles[currentStep - 1]}
                </h2>
              </div>

              {/* Step Content with nested dark-mode style overrides */}
              <div className="dark:text-[#e2ede4] [&_label:not(.cursor-pointer)]:dark:text-emerald-400 [&_input:not([type=checkbox])]:dark:bg-[#081009] [&_input:not([type=checkbox])]:dark:border-emerald-900/40 [&_input:not([type=checkbox])]:dark:text-[#e2ede4] [&_input:not([type=checkbox])]:focus:dark:ring-emerald-500 [&_input:not([type=checkbox])]:focus:dark:border-emerald-500 [&_select]:dark:bg-[#081009] [&_select]:dark:border-emerald-900/40 [&_select]:dark:text-[#e2ede4] [&_select]:focus:dark:ring-emerald-500 [&_select]:focus:dark:border-emerald-500 [&_textarea]:dark:bg-[#081009] [&_textarea]:dark:border-emerald-900/40 [&_textarea]:dark:text-[#e2ede4] [&_textarea]:focus:dark:ring-emerald-500 [&_textarea]:focus:dark:border-emerald-500 [&_button[type=submit]]:dark:bg-emerald-600 [&_button[type=submit]]:dark:hover:bg-emerald-700 [&_button[type=submit]]:dark:disabled:bg-emerald-800 [&_.bg-gray-50]:dark:bg-[#081009]/60 [&_.bg-gray-50]:dark:border [&_.bg-gray-50]:dark:border-emerald-900/40 [&_.border-gray-200]:dark:border-emerald-900/40 [&_.border-b]:dark:border-emerald-900/40 [&_.text-gray-900]:dark:text-[#e2ede4] [&_.text-gray-700]:dark:text-gray-300 [&_.text-gray-600]:dark:text-gray-400 [&_.bg-blue-50]:dark:bg-emerald-950/20 [&_.bg-blue-50]:dark:border-emerald-800/40 [&_.bg-blue-50]:dark:text-emerald-300 [&_label.border-gray-300]:dark:border-emerald-900/40 [&_label.border-gray-300]:dark:hover:bg-emerald-950/20 [&_label.border-green-600]:dark:border-emerald-500 [&_label.border-green-600]:dark:bg-emerald-950/30 [&_.text-red-500]:dark:text-red-400 [&_.border-t]:dark:border-emerald-900/40 [&_.text-green-600]:dark:text-emerald-400 [&_.hover\:text-green-700]:dark:hover:text-emerald-300">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
