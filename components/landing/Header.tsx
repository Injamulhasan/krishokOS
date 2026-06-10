"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export type Language = "bn" | "en";

interface HeaderProps {
  language: Language;
  onLanguageChange: (language: Language) => void;
}

const navLinks: Record<Language, { href: string; label: string }[]> = {
  bn: [
    { href: "#modules", label: "মডিউল" },
    { href: "#crops", label: "ফসল" },
    { href: "#methods", label: "পদ্ধতি" },
    { href: "#farm-setup", label: "ফার্ম সেটআপ" },
    { href: "#vision", label: "ভিশন" },
    { href: "#platform", label: "প্ল্যাটফর্ম" },
    { href: "#farm-model", label: "৭০:৩০ মডেল" },
    { href: "#dream", label: "স্বপ্ন" },
  ],
  en: [
    { href: "#modules", label: "Modules" },
    { href: "#crops", label: "Crops" },
    { href: "#methods", label: "Methods" },
    { href: "#farm-setup", label: "Farm Setup" },
    { href: "#vision", label: "Vision" },
    { href: "#platform", label: "Platform" },
    { href: "#farm-model", label: "70:30 Model" },
    { href: "#dream", label: "Dream" },
  ],
};

const startButtonLabel: Record<Language, string> = {
  bn: "শুরু করুন",
  en: "Get Started",
};

export default function Header({ language, onLanguageChange }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#dfe6dd] bg-[#F8F8F4]">
      <div className="mx-auto flex h-[68px] max-w-[1280px] items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#00A63E] text-white">
            কৃ
          </div>
          <div>
            <h3 className="text-[18px] font-bold leading-none">কৃষকOS</h3>
            <p className="mt-1 text-[10px] tracking-[2px] text-gray-500">
              BANGLADESH
            </p>
          </div>
        </div>

        <nav className="hidden xl:flex items-center gap-7 text-sm font-medium text-[#1C2B1F]">
          {navLinks[language].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition hover:text-[#00963F]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex rounded-full border bg-white p-1">
            <button
              type="button"
              onClick={() => onLanguageChange("bn")}
              className={`rounded-full px-4 py-1 text-xs font-medium transition ${
                language === "bn"
                  ? "bg-[#00963F] text-white"
                  : "text-[#1C2B1F] hover:bg-gray-50"
              }`}
            >
              বাংলা
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange("en")}
              className={`rounded-full px-4 py-1 text-xs font-medium transition ${
                language === "en"
                  ? "bg-[#00963F] text-white"
                  : "text-[#1C2B1F] hover:bg-gray-50"
              }`}
            >
              EN
            </button>
          </div>

          <Button className="rounded-full bg-[#00963E] px-6">
            {startButtonLabel[language]}
          </Button>

          <button
            aria-expanded={mobileOpen}
            className="flex xl:hidden flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            <span className="h-0.5 w-5 bg-[#1C2B1F]" />
            <span className="h-0.5 w-5 bg-[#1C2B1F]" />
            <span className="h-0.5 w-5 bg-[#1C2B1F]" />
          </button>
        </div>
      </div>

      <div
        className={`${mobileOpen ? "block" : "hidden"} xl:hidden border-t border-[#dfe6dd] bg-[#F8F8F4] px-6 py-4`}
      >
        <nav className="flex flex-col gap-4 text-sm font-medium text-[#1C2B1F]">
          {navLinks[language].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition hover:text-[#00963F]"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
