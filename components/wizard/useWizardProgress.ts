"use client";

import { useLanguage } from "@/lib/useLanguage";
import { useEffect, useState } from "react";

interface WizardState {
  wizardId: string;
  currentStep: number;
  completedSteps: number[];
  stepData: Record<number, any>;
  progress: number;
  hasActiveWizard: boolean;
}

interface UseWizardProgressReturn {
  wizardState: WizardState | null;
  loading: boolean;
  error: string | null;
  saveStep: (stepNumber: number, data: any) => Promise<void>;
  goToStep: (step: number) => void;
  completeWizard: () => Promise<any>;
}

export function useWizardProgress(): UseWizardProgressReturn {
  const [wizardState, setWizardState] = useState<WizardState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { language } = useLanguage();

  // Load wizard progress on mount
  useEffect(() => {
    const loadProgress = async () => {
      try {
        const response = await fetch("/api/wizard/progress", {
          method: "GET",
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error(
              language === "bn"
                ? "অনুমতি নেই - অনুগ্রহ করে সাইন ইন করুন"
                : "Unauthorized - please sign in",
            );
          }
          throw new Error(
            language === "bn"
              ? "উইজার্ড অগ্রগতি লোড করতে ব্যর্থ"
              : "Failed to load wizard progress",
          );
        }

        const data = await response.json();

        if (data.hasActiveWizard) {
          setWizardState(data);
        } else {
          // Initialize new wizard
          const initResponse = await fetch("/api/wizard/start", {
            method: "POST",
          });

          if (!initResponse.ok) {
            throw new Error(
              language === "bn"
                ? "উইজার্ড শুরু করতে ব্যর্থ"
                : "Failed to start wizard",
            );
          }

          const initData = await initResponse.json();
          setWizardState({
            wizardId: initData.wizardId,
            currentStep: 1,
            completedSteps: [],
            stepData: {},
            progress: 0,
            hasActiveWizard: true,
          });
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : language === "bn"
              ? "অজানা ত্রুটি"
              : "Unknown error",
        );
      } finally {
        setLoading(false);
      }
    };

    loadProgress();
  }, [language]);

  const saveStep = async (stepNumber: number, data: any) => {
    if (!wizardState) return;

    try {
      const response = await fetch(`/api/wizard/step/${stepNumber}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stepData: data }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error ||
            (language === "bn"
              ? "পদক্ষেপ সংরক্ষণ করতে ব্যর্থ"
              : "Failed to save step"),
        );
      }

      const result = await response.json();

      setWizardState((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          currentStep: result.currentStep,
          completedSteps: result.completedSteps,
          stepData: {
            ...prev.stepData,
            [stepNumber]: data,
          },
          progress: Math.round((result.completedSteps.length / 10) * 100),
        };
      });
    } catch (err) {
      throw err;
    }
  };

  const goToStep = (step: number) => {
    if (!wizardState) return;

    // Only allow going to current or previously completed steps
    if (step <= wizardState.currentStep) {
      setWizardState((prev) => {
        if (!prev) return prev;
        return { ...prev, currentStep: step };
      });
    }
  };

  const completeWizard = async () => {
    if (!wizardState) {
      throw new Error(
        language === "bn"
          ? "উইজার্ড অবস্থা খুঁজে পাওয়া যায়নি"
          : "Wizard state not found",
      );
    }

    const response = await fetch("/api/wizard/complete", {
      method: "POST",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error ||
          (language === "bn"
            ? "উইজার্ড সম্পন্ন করতে ব্যর্থ"
            : "Failed to complete wizard"),
      );
    }

    return await response.json();
  };

  return {
    wizardState,
    loading,
    error,
    saveStep,
    goToStep,
    completeWizard,
  };
}
