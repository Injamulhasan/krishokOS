import { Button } from "@/components/ui/button";
import Image from "next/image";
import type { Language } from "./Header";

const heroStats: Record<Language, { value: string; label: string }[]> = {
  bn: [
    { value: "12k+", label: "নিবন্ধিত কৃষক" },
    { value: "28%", label: "গড় ফলন বৃদ্ধি" },
    { value: "98%", label: "অবশিষ্টাংশমুক্ত খাদ্য" },
    { value: "42", label: "জেলা সক্রিয়" },
  ],
  en: [
    { value: "12k+", label: "Registered Farmers" },
    { value: "28%", label: "Avg Yield Increase" },
    { value: "98%", label: "Residue-Free Food" },
    { value: "42", label: "Districts Active" },
  ],
};

const heroKpis: Record<Language, { value: string; label: string }[]> = {
  bn: [
    { value: "৩৫%", label: "উৎপাদন বৃদ্ধি" },
    { value: "১০০%", label: "নিরাপদ খাদ্য" },
    { value: "GAP", label: "রপ্তানি প্রস্তুত" },
  ],
  en: [
    { value: "35%", label: "Production Increase" },
    { value: "100%", label: "Safe Food" },
    { value: "GAP", label: "Export Ready" },
  ],
};

export default function HeroSection({
  language,
  onPrimaryClick,
  onSecondaryClick,
}: {
  language: Language;
  onPrimaryClick: () => void;
  onSecondaryClick: () => void;
}) {
  const isEnglish = language === "en";

  return (
    <section className="relative overflow-hidden bg-[#F8F8F4] dark:bg-[#081009] transition-colors duration-300">
      <div className="absolute left-[-200px] top-[-100px] h-[700px] w-[700px] rounded-full bg-green-100/70 dark:bg-green-950/20 blur-[120px]" />
      <div className="absolute bottom-0 right-[-150px] h-[500px] w-[500px] rounded-full bg-yellow-100/70 dark:bg-yellow-950/20 blur-[120px]" />

      <div className="relative mx-auto max-w-[1280px] px-6 py-16 lg:py-20">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#DCE8D8] bg-white px-4 py-2 text-sm font-medium text-[#00963F] dark:border-[#1d2f21] dark:bg-[#121c15] dark:text-[#00c853]">
              <span>🌿</span>
              {isEnglish
                ? "Bangladesh's first complete farm ERP"
                : "বাংলাদেশের প্রথম পূর্ণাঙ্গ ফার্ম ERP"}
            </div>

            <h1 className="max-w-[650px] text-[58px] font-medium font-black leading-[0.92] tracking-[-2px] text-[#08210F] dark:text-white lg:text-[84px]">
              {isEnglish ? (
                <>
                  Smart Agriculture,
                  <br />
                  Export-ready
                  <br />
                  <span className="text-[#00A63E]">Crops.</span>
                </>
              ) : (
                <>
                  স্মার্ট কৃষি,
                  <br />
                  রপ্তানযোগ্য
                  <br />
                  <span className="text-[#00A63E]">ফসল।</span>
                </>
              )}
            </h1>

            <p className="mt-8 max-w-[620px] text-xl leading-relaxed text-[#314539] dark:text-gray-300">
              {isEnglish
                ? "Land prep to harvest — AI-driven planning, nutrition management and residue-free production in a digital farming operating system."
                : "জমি প্রস্তুতি থেকে ফসল সংগ্রহ — AI-চালিত পরিকল্পনা, পুষ্টি ব্যবস্থাপনা ও অবশিষ্টাংশমুক্ত উৎপাদনের একটি ডিজিটাল ফার্মিং অপারেটিং সিস্টেম।"}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button
                className="flex h-[56px] items-center rounded-full bg-[#00A63E] px-8 font-semibold text-white transition hover:bg-[#008737] cursor-pointer"
                onClick={onPrimaryClick}
              >
                {isEnglish ? "Start Farm Setup →" : "ফার্ম সেটআপ শুরু করুন →"}
              </Button>
              <Button
                className="flex h-[56px] items-center rounded-full border border-[#D7D7D7] bg-white px-8 font-semibold text-[#08210F] dark:border-[#1d2f21] dark:bg-[#121c15] dark:text-white transition hover:bg-gray-50 dark:hover:bg-[#1d2f21] cursor-pointer"
                onClick={onSecondaryClick}
              >
                {isEnglish ? "View Dashboard" : "ড্যাশবোর্ড দেখুন"}
              </Button>
            </div>

            <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
              {heroStats[language].map((stat) => (
                <div key={stat.label}>
                  <div className="text-4xl font-bold text-[#08210F] dark:text-white">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[620px]">
            <div className="overflow-hidden rounded-[30px] border border-[#DED8C8] dark:border-[#1d2f21] bg-white dark:bg-[#121c15] shadow-[0_25px_60px_rgba(0,0,0,0.08)]">
              <Image
                src="/hero-plantation.jpg"
                alt="Farm"
                width={860}
                height={520}
                loading="eager"
                className="h-[520px] w-full object-cover"
              />
            </div>

            <div className="absolute right-4 top-4 rounded-[24px] bg-gradient-to-br from-[#FFE7BF] via-[#F6B64C] to-[#C86B12] p-6 shadow-[0_20px_40px_rgba(214,119,6,0.35)] backdrop-blur-sm">
              <div className="grid grid-cols-3 gap-8">
                {heroKpis[language].map((kpi) => (
                  <div key={kpi.label}>
                    <div className="text-3xl font-bold text-[#08210F]">
                      {kpi.value}
                    </div>
                    <div className="mt-1 text-xs text-gray-700">
                      {kpi.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute bottom-5 left-5 right-5 rounded-[20px] bg-[#F4F2EA] dark:bg-[#18271a] p-5 shadow-lg border border-transparent dark:border-[#273d2b]">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {isEnglish ? "Today's Tip" : "আজকের পরামর্শ"}
                  </p>
                  <p className="mt-1 font-medium text-[#08210F] dark:text-white">
                    {isEnglish
                      ? "48-hour rain — hold fertilizer application"
                      : "৪৮ ঘণ্টার বৃষ্টি — সার প্রয়োগ স্থগিত রাখুন"}
                  </p>
                </div>
                <div className="rounded-full bg-[#E7D6A7] dark:bg-[#2c230e] px-4 py-2 text-xs font-medium text-[#6E4D00] dark:text-[#f3cd78]">
                  {isEnglish ? "Alert" : "সতর্কতা"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
