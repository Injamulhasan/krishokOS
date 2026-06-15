"use client";

import { useLanguage } from "@/lib/useLanguage";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface User {
  id: string;
  email: string;
  name: string;
}

interface PlantManagementClientProps {
  user: User;
}

type CropOption = "banana" | "papaya";
type MethodOption = "residue_free" | "organic" | "chemical";

export default function PlantManagementClient({ user }: PlantManagementClientProps) {
  const { language, t } = useLanguage();
  const router = useRouter();
  const [selectedCrop, setSelectedCrop] = useState<CropOption>("banana");
  const [selectedMethod, setSelectedMethod] = useState<MethodOption>("residue_free");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleContinue = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/wizard/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ crop: selectedCrop, farmingMethod: selectedMethod }),
      });

      if (!response.ok) {
        throw new Error(
          language === "bn"
            ? "উইজার্ড শুরু করতে ব্যর্থ হয়েছে"
            : "Failed to initialize farm setup wizard"
        );
      }

      router.push("/wizard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setLoading(false);
    }
  };

  // Inline SVG Icons
  const BananaIcon = () => (
    <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M38 6C34.5 9.5 28 17 24 23C20 29 11.5 37.5 6 40C5 40.5 4.5 41.5 5 42.5C5.5 43.5 6.5 44 7.5 43.5C13 41 21.5 35 27 29C32.5 23 38.5 13.5 42 10C43.5 8.5 42 6.5 40.5 6.5C39.5 6.5 38.5 6 38 6Z" fill="#FBBF24" stroke="#F59E0B" strokeWidth="2"/>
      <path d="M36.5 9.5C33.5 12.5 28.5 18 25 23C21.5 28 15.5 34.5 10.5 37.5" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M41 7.5C38.5 9 33.5 13.5 30 18.5C26.5 23.5 23 29.5 20.5 33.5" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );

  const PapayaIcon = () => (
    <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 6C15 6 8 13.5 8 23.5C8 33.5 14.5 42 24 42C33.5 42 40 33.5 40 23.5C40 13.5 33 6 24 6Z" fill="#F97316" stroke="#EA580C" strokeWidth="2"/>
      <path d="M24 10C17.5 10 12.5 15.5 12.5 23C12.5 30.5 17 38 24 38C31 38 35.5 30.5 35.5 23C35.5 15.5 30.5 10 24 10Z" fill="#FACC15"/>
      <circle cx="21" cy="21" r="2" fill="#451A03"/>
      <circle cx="27" cy="22" r="2" fill="#451A03"/>
      <circle cx="23" cy="26" r="2" fill="#451A03"/>
      <circle cx="26" cy="27" r="1.5" fill="#451A03"/>
      <circle cx="20" cy="28" r="1.5" fill="#451A03"/>
      <path d="M22.5 4.5C22.5 3.5 23.5 3 24 3C24.5 3 25.5 3.5 25.5 4.5V6H22.5V4.5Z" fill="#15803D"/>
    </svg>
  );

  const CheckIcon = () => (
    <svg className="w-5 h-5 text-white" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  );

  const BackIcon = () => (
    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EEF7F2] via-[#E8F5ED] to-[#E2F2E7] text-[#1C2B1F] font-sans pb-24">
      {/* ── Top Header / Navbar ── */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-[#D4E2D8] py-4 px-6 shadow-sm">
        <div className="mx-auto max-w-5xl flex items-center justify-between">
          <Link
            href="/dashboard"
            className="flex items-center text-sm font-semibold text-[#00963F] hover:text-[#007a33] transition"
          >
            <BackIcon />
            {t("Back to Dashboard", "ড্যাশবোর্ডে ফিরে যান")}
          </Link>
          
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-semibold text-[#4B5A44] uppercase tracking-wider">
              {t("Plant Management", "ফসল ব্যবস্থাপনা")}
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-12">
        {/* Error notification */}
        {error && (
          <div className="mb-8 p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-700 text-sm">
            {error}
          </div>
        )}

        {/* ── Step 1: Select Your Crop ── */}
        <section className="mb-12">
          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#00963F]">
              {t("Step 1: Select Your Crop", "ধাপ ১: আপনার ফসল নির্বাচন করুন")}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black mt-1 text-[#08210F]">
              {t("Choose the crop you want to cultivate", "আপনি যে ফসল চাষ করতে চান তা নির্বাচন করুন")}
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {/* Banana card */}
            <div
              onClick={() => setSelectedCrop("banana")}
              className={`relative flex flex-col p-6 rounded-[28px] bg-white border-2 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 ${
                selectedCrop === "banana"
                  ? "border-[#00963F] shadow-[0_12px_30px_rgba(0,150,63,0.1)] bg-[#F3FAF5]"
                  : "border-[#E3E9E0] hover:border-[#B3CBB7] hover:shadow-md"
              }`}
            >
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFFDF0] border border-[#FFF8CC]">
                <BananaIcon />
              </div>
              <h3 className="text-xl font-bold text-[#08210F] mb-2">
                {t("Banana Farming", "কলা চাষ")}
              </h3>
              <p className="text-sm text-[#4B5A44] leading-relaxed mb-6">
                {t(
                  "High-value export crop with year-round production and excellent market returns.",
                  "বছরব্যাপী উৎপাদন ও চমৎকার বাজার দরসহ উচ্চমূল্যের রপ্তানি ফসল।"
                )}
              </p>

              {selectedCrop === "banana" && (
                <div className="mt-auto flex items-center gap-2 text-sm font-bold text-[#00963F]">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#00963F] text-white">
                    <CheckIcon />
                  </span>
                  {t("Selected", "নির্বাচিত")}
                </div>
              )}
            </div>

            {/* Papaya card */}
            <div
              onClick={() => setSelectedCrop("papaya")}
              className={`relative flex flex-col p-6 rounded-[28px] bg-white border-2 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 ${
                selectedCrop === "papaya"
                  ? "border-[#00963F] shadow-[0_12px_30px_rgba(0,150,63,0.1)] bg-[#F3FAF5]"
                  : "border-[#E3E9E0] hover:border-[#B3CBB7] hover:shadow-md"
              }`}
            >
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFF8F3] border border-[#FFE8D8]">
                <PapayaIcon />
              </div>
              <h3 className="text-xl font-bold text-[#08210F] mb-2">
                {t("Papaya Farming", "পেঁপে চাষ")}
              </h3>
              <p className="text-sm text-[#4B5A44] leading-relaxed mb-6">
                {t(
                  "Fast-growing tropical fruit with high demand in both local and premium export markets.",
                  "স্থানীয় এবং প্রিমিয়াম রপ্তানি উভয় বাজারেই উচ্চ চাহিদাসম্পন্ন দ্রুত বর্ধনশীল গ্রীষ্মমন্ডলীয় ফল।"
                )}
              </p>

              {selectedCrop === "papaya" && (
                <div className="mt-auto flex items-center gap-2 text-sm font-bold text-[#00963F]">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#00963F] text-white">
                    <CheckIcon />
                  </span>
                  {t("Selected", "নির্বাচিত")}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── Step 2: Select Farming Method ── */}
        <section className="mb-12">
          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#00963F]">
              {t("Step 2: Select Farming Method", "ধাপ ২: আপনার চাষ পদ্ধতি বেছে নিন")}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black mt-1 text-[#08210F]">
              {t("Choose your preferred farming approach", "আপনার পছন্দের চাষ পদ্ধতি বেছে নিন")}
            </h2>
          </div>

          <div className="space-y-4">
            {/* Residue Free */}
            <div
              onClick={() => setSelectedMethod("residue_free")}
              className={`flex items-center justify-between p-5 rounded-2xl bg-white border-2 cursor-pointer transition-all duration-200 ${
                selectedMethod === "residue_free"
                  ? "border-[#00963F] shadow-sm bg-[#F3FAF5]"
                  : "border-[#E3E9E0] hover:border-[#B3CBB7]"
              }`}
            >
              <div className="flex-1 pr-4">
                <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                  <h4 className="text-lg font-bold text-[#08210F]">
                    {t("Residue-Free Farming", "অবশিষ্টাংশমুক্ত চাষ (Residue-Free)")}
                  </h4>
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-emerald-100 text-emerald-700">
                    {t("Recommended", "সুপারিশকৃত")}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#4B5A44]">
                  {t(
                    "Export-quality production utilizing strict bio-inputs with zero pesticide chemical residue.",
                    "কীটনাশক রাসায়নিকের অবশিষ্টাংশ ছাড়াই সম্পূর্ণ নিরাপদ ও রপ্তানি মানের জৈব-ইনপুট ভিত্তিক উৎপাদন।"
                  )}
                </p>
              </div>
              <div className="shrink-0 flex items-center justify-center">
                <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center ${
                  selectedMethod === "residue_free"
                    ? "bg-[#00963F] border-[#00963F]"
                    : "border-gray-300"
                }`}>
                  {selectedMethod === "residue_free" && <CheckIcon />}
                </div>
              </div>
            </div>

            {/* Organic */}
            <div
              onClick={() => setSelectedMethod("organic")}
              className={`flex items-center justify-between p-5 rounded-2xl bg-white border-2 cursor-pointer transition-all duration-200 ${
                selectedMethod === "organic"
                  ? "border-[#00963F] shadow-sm bg-[#F3FAF5]"
                  : "border-[#E3E9E0] hover:border-[#B3CBB7]"
              }`}
            >
              <div className="flex-1 pr-4">
                <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                  <h4 className="text-lg font-bold text-[#08210F]">
                    {t("Organic Farming", "জৈব চাষ (Organic Farming)")}
                  </h4>
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-purple-100 text-purple-700">
                    {t("Premium", "প্রিমিয়াম")}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#4B5A44]">
                  {t(
                    "Natural cultivation relying entirely on compost, organic manure and biological pest controls.",
                    "কৃত্রিম রাসায়নিক ছাড়া সম্পূর্ণ প্রাকৃতিক পদ্ধতিতে কম্পোস্ট, জৈব সার ও বায়োলজিক্যাল উপায়ে চাষ।"
                  )}
                </p>
              </div>
              <div className="shrink-0 flex items-center justify-center">
                <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center ${
                  selectedMethod === "organic"
                    ? "bg-[#00963F] border-[#00963F]"
                    : "border-gray-300"
                }`}>
                  {selectedMethod === "organic" && <CheckIcon />}
                </div>
              </div>
            </div>

            {/* Chemical */}
            <div
              onClick={() => setSelectedMethod("chemical")}
              className={`flex items-center justify-between p-5 rounded-2xl bg-white border-2 cursor-pointer transition-all duration-200 ${
                selectedMethod === "chemical"
                  ? "border-[#00963F] shadow-sm bg-[#F3FAF5]"
                  : "border-[#E3E9E0] hover:border-[#B3CBB7]"
              }`}
            >
              <div className="flex-1 pr-4">
                <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                  <h4 className="text-lg font-bold text-[#08210F]">
                    {t("Chemical Farming", "রাসায়নিক চাষ (Chemical Farming)")}
                  </h4>
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-gray-100 text-gray-600">
                    {t("Standard", "সাধারণ")}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#4B5A44]">
                  {t(
                    "Conventional cultivation using standard chemical fertilizers and pesticide schedule controls.",
                    "সনাতন নিয়মে রাসায়নিক সার ও কীটনাশক ব্যবহারের মাধ্যমে চাষাবাদ পদ্ধতি।"
                  )}
                </p>
              </div>
              <div className="shrink-0 flex items-center justify-center">
                <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center ${
                  selectedMethod === "chemical"
                    ? "bg-[#00963F] border-[#00963F]"
                    : "border-gray-300"
                }`}>
                  {selectedMethod === "chemical" && <CheckIcon />}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Continue Button ── */}
        <div className="flex justify-end mt-12">
          <button
            onClick={handleContinue}
            disabled={loading}
            className="flex items-center justify-center bg-[#00963F] hover:bg-[#008035] text-white font-bold px-8 py-4 rounded-full text-base transition-all duration-200 shadow-md hover:shadow-lg transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? t("Setting up...", "সেটআপ হচ্ছে...")
              : t("Continue to Farm Setup ›", "খামার সেটআপে এগিয়ে যান ›")}
          </button>
        </div>
      </main>
    </div>
  );
}
