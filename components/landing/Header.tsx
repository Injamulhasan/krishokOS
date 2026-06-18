"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { X, Menu } from "lucide-react";
import ThemeToggle from "../ThemeToggle";

export type Language = "bn" | "en";

interface HeaderProps {
  language: Language;
  onLanguageChange: (language: Language) => void;
  onStartClick: () => void;
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

export default function Header({
  language,
  onLanguageChange,
  onStartClick,
}: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#dfe6dd] dark:border-emerald-900/40 bg-[#F8F8F4] dark:bg-[#121c15] text-[#1C2B1F] dark:text-[#e2ede4] transition-colors duration-300 shadow-sm">
      <div className="mx-auto flex h-[68px] max-w-[1280px] items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#00A63E] dark:bg-[#00963E] text-white font-bold">
            কৃ
          </div>
          <div>
            <h3 className="text-[18px] font-bold leading-none">কৃষকOS</h3>
            <p className="mt-1 text-[10px] tracking-[2px] text-gray-500 dark:text-gray-400">
              BANGLADESH
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-7 text-sm font-medium">
          {navLinks[language].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition hover:text-[#00963F] dark:hover:text-emerald-400"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Header Actions */}
        <div className="flex items-center gap-3">
          {/* Desktop Language Switcher */}
          <div className="hidden md:flex rounded-full border border-[#dfe6dd] dark:border-emerald-900/40 bg-white dark:bg-[#081009] p-1">
            <button
              type="button"
              onClick={() => onLanguageChange("bn")}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition cursor-pointer ${
                language === "bn"
                  ? "bg-[#00963F] text-white"
                  : "text-[#1C2B1F] dark:text-[#e2ede4] hover:bg-gray-50 dark:hover:bg-emerald-950/20"
              }`}
            >
              বাংলা
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange("en")}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition cursor-pointer ${
                language === "en"
                  ? "bg-[#00963F] text-white"
                  : "text-[#1C2B1F] dark:text-[#e2ede4] hover:bg-gray-50 dark:hover:bg-emerald-950/20"
              }`}
            >
              EN
            </button>
          </div>

          {/* Theme Switcher Button */}
          <ThemeToggle />

          <Button
            className="rounded-full bg-[#00963E] dark:bg-emerald-600 hover:bg-[#007d2d] dark:hover:bg-emerald-700 px-6 font-bold cursor-pointer transition text-white"
            onClick={onStartClick}
          >
            {startButtonLabel[language]}
          </Button>

          {/* Mobile Menu Toggle button */}
          <button
            aria-expanded={mobileOpen}
            className="flex xl:hidden p-2 text-gray-700 dark:text-[#e2ede4] hover:bg-gray-150 dark:hover:bg-emerald-950/40 rounded-xl transition cursor-pointer"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* ── Mobile Menu Slide-Over Drawer ── */}
      <div
        className={`fixed inset-0 z-50 xl:hidden transition-all duration-300 ${
          mobileOpen ? "visible pointer-events-auto" : "invisible pointer-events-none"
        }`}
      >
        {/* Backdrop Overlay with blur */}
        <div
          className={`absolute inset-0 bg-black/40 dark:bg-black/70 backdrop-blur-xs transition-opacity duration-300 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMobileOpen(false)}
        />

        {/* Drawer Window sliding from the right */}
        <div
          className={`absolute top-0 right-0 h-full w-[280px] sm:w-[320px] bg-[#F8F8F4] dark:bg-[#121c15] border-l border-[#dfe6dd] dark:border-emerald-900/40 p-6 shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-in-out ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="space-y-6">
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#dfe6dd] dark:border-emerald-900/40">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00A63E] text-white font-bold text-sm">
                  কৃ
                </div>
                <span className="font-bold text-gray-900 dark:text-[#e2ede4]">কৃষকOS</span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1.5 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-150 dark:hover:bg-emerald-950/40 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Vertical Navigation Links */}
            <nav className="flex flex-col gap-4 text-sm font-medium">
              {navLinks[language].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-2 text-gray-700 dark:text-gray-300 hover:text-[#00963F] dark:hover:text-emerald-400 transition border-b border-gray-100 dark:border-emerald-950/20"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Bottom Actions (Language Switcher) */}
          <div className="pt-6 border-t border-[#dfe6dd] dark:border-emerald-900/40 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">Language</span>
              <div className="flex rounded-full border border-[#dfe6dd] dark:border-emerald-900/40 bg-white dark:bg-[#081009] p-0.5">
                <button
                  type="button"
                  onClick={() => onLanguageChange("bn")}
                  className={`rounded-full px-3 py-1 text-[10px] font-semibold transition cursor-pointer ${
                    language === "bn"
                      ? "bg-[#00963F] text-white"
                      : "text-[#1C2B1F] dark:text-[#e2ede4]"
                  }`}
                >
                  বাংলা
                </button>
                <button
                  type="button"
                  onClick={() => onLanguageChange("en")}
                  className={`rounded-full px-3 py-1 text-[10px] font-semibold transition cursor-pointer ${
                    language === "en"
                      ? "bg-[#00963F] text-white"
                      : "text-[#1C2B1F] dark:text-[#e2ede4]"
                  }`}
                >
                  EN
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
