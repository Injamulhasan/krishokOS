import type { Language } from "./Header";

const moduleCards: Record<
  Language,
  { emoji: string; title: string; description: string; active: boolean }[]
> = {
  bn: [
    {
      emoji: "🌱",
      title: "ফসল ব্যবস্থাপনা",
      description: "বপন থেকে রপ্তানি পর্যন্ত আর্টি পরিকল্পনা।",
      active: true,
    },
    {
      emoji: "🐄",
      title: "প্রাণিসম্পদ",
      description: "গবাদি পশুর স্বাস্থ্য, পুষ্টি ও উৎপাদন।",
      active: false,
    },
    {
      emoji: "🐟",
      title: "মৎস্য চাষ",
      description: "পুকুর, পানির গুণাগুণ ও মাছের বৃদ্ধি।",
      active: false,
    },
  ],
  en: [
    {
      emoji: "🌱",
      title: "Crop Management",
      description: "ARTI planning from sowing to export.",
      active: true,
    },
    {
      emoji: "🐄",
      title: "Livestock",
      description: "Cattle health, nutrition & production.",
      active: false,
    },
    {
      emoji: "🐟",
      title: "Aquaculture",
      description: "Pond, water quality & fish growth.",
      active: false,
    },
  ],
};

export default function ModuleCards({ language }: { language: Language }) {
  const cards = moduleCards[language];

  return (
    <section className="mx-auto max-w-[1280px] px-4 py-24 sm:px-6" id="modules">
      <div className="mb-12">
        <p className="mb-3 text-xs uppercase tracking-[4px] text-green-700 dark:text-emerald-400 font-semibold">
          {language === "en" ? "Modules" : "মডিউল"}
        </p>
        <h2 className="text-4xl font-black leading-tight text-[#1C2B1F] dark:text-white sm:text-5xl lg:text-6xl">
          {language === "en"
            ? "Three Sectors, One Platform"
            : "তিনটি খাত, এক প্ল্যাটফর্ম"}
        </h2>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.title}
            className="rounded-[24px] border border-[#E8E2D8] dark:border-emerald-900/40 bg-white dark:bg-[#121c15] p-8 shadow-sm transition-colors duration-300"
          >
            <div className="mb-6 text-4xl">{card.emoji}</div>
            <h3 className="mb-2 text-2xl font-black text-[#1C2B1F] dark:text-[#e2ede4]">
              {card.title}
            </h3>
            <p className="mb-8 leading-relaxed text-gray-500 dark:text-gray-400">
              {card.description}
            </p>
            <span
              className={`inline-flex items-center rounded-full px-4 py-2 text-xs font-semibold ${
                card.active
                  ? "gap-2 bg-[#1C6B30] text-white"
                  : "border border-[#D5CCBF] dark:border-emerald-900/40 text-gray-500 dark:text-gray-400"
              }`}
            >
              {card.active && (
                <span className="h-1.5 w-1.5 rounded-full bg-green-300" />
              )}
              {card.active
                ? language === "en"
                  ? "Active"
                  : "চালু আছে"
                : language === "en"
                  ? "Coming Soon"
                  : "শীঘ্রই আসছে"}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
