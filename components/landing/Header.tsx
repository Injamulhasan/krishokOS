import { Button } from "@/components/ui/button";
import { useState } from "react";
import { X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

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
    <header className="sticky top-0 z-50 border-b border-[#dfe6dd] bg-[#F8F8F4] dark:bg-[#081009] dark:border-[#1d2f21] transition-colors duration-300">
      <div className="mx-auto flex h-[68px] max-w-[1280px] items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#00A63E] text-white font-bold">
            কৃ
          </div>
          <div>
            <h3 className="text-[18px] font-bold leading-none text-gray-900 dark:text-white">কৃষকOS</h3>
            <p className="mt-1 text-[10px] tracking-[2px] text-gray-500 dark:text-gray-400">
              BANGLADESH
            </p>
          </div>
        </div>

        <nav className="hidden xl:flex items-center gap-7 text-sm font-medium text-[#1C2B1F] dark:text-gray-300">
          {navLinks[language].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition hover:text-[#00963F] dark:hover:text-[#00c853]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex rounded-full border border-gray-200 bg-white p-1 dark:bg-[#121c15] dark:border-[#1d2f21]">
            <button
              type="button"
              onClick={() => onLanguageChange("bn")}
              className={`rounded-full px-4 py-1 text-xs font-medium transition cursor-pointer ${
                language === "bn"
                  ? "bg-[#00963F] text-white"
                  : "text-[#1C2B1F] hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-[#1d2f21]"
              }`}
            >
              বাংলা
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange("en")}
              className={`rounded-full px-4 py-1 text-xs font-medium transition cursor-pointer ${
                language === "en"
                  ? "bg-[#00963F] text-white"
                  : "text-[#1C2B1F] hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-[#1d2f21]"
              }`}
            >
              EN
            </button>
          </div>

          <div className="hidden md:block">
            <ThemeToggle />
          </div>

          <Button
            className="rounded-full bg-[#00963E] px-6 text-white hover:bg-[#007a2d] transition cursor-pointer"
            onClick={onStartClick}
          >
            {startButtonLabel[language]}
          </Button>

          <button
            aria-expanded={mobileOpen}
            className="flex xl:hidden flex-col gap-1.5 p-2 text-[#1C2B1F] dark:text-white cursor-pointer"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle mobile menu"
          >
            <span className="h-0.5 w-5 bg-current" />
            <span className="h-0.5 w-5 bg-current" />
            <span className="h-0.5 w-5 bg-current" />
          </button>
        </div>
      </div>

      {/* Right-Side Slide-out Drawer Mobile Menu */}
      <div
        className={`fixed inset-0 z-50 xl:hidden transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop overlay */}
        <div
          className="absolute inset-0 bg-black/55 backdrop-blur-xs transition-opacity duration-300"
          onClick={() => setMobileOpen(false)}
        />

        {/* Drawer container */}
        <div
          className={`absolute top-0 right-0 h-full w-[285px] bg-[#F8F8F4] dark:bg-[#0c130d] border-l border-[#dfe6dd] dark:border-[#1d2f21] shadow-2xl p-6 flex flex-col gap-6 transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between border-b border-[#dfe6dd] dark:border-[#1d2f21] pb-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#00A63E] text-white font-bold text-sm">
                কৃ
              </div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white">কৃষকOS</h3>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-[#121c15] transition cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-4 text-base font-semibold text-[#1C2B1F] dark:text-gray-300">
            {navLinks[language].map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="transition py-1.5 hover:text-[#00963F] dark:hover:text-[#00c853]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <hr className="border-[#dfe6dd] dark:border-[#1d2f21]" />

          {/* Language Switch */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider dark:text-gray-500">
              {language === "bn" ? "ভাষা পরিবর্তন" : "Change Language"}
            </span>
            <div className="flex rounded-full border border-gray-200 bg-white p-1 dark:bg-[#121c15] dark:border-[#1d2f21]">
              <button
                type="button"
                onClick={() => onLanguageChange("bn")}
                className={`flex-1 rounded-full py-1.5 text-xs font-semibold transition cursor-pointer ${
                  language === "bn"
                    ? "bg-[#00963F] text-white"
                    : "text-[#1C2B1F] hover:bg-gray-50 dark:text-gray-300"
                }`}
              >
                বাংলা
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange("en")}
                className={`flex-1 rounded-full py-1.5 text-xs font-semibold transition cursor-pointer ${
                  language === "en"
                    ? "bg-[#00963F] text-white"
                    : "text-[#1C2B1F] hover:bg-gray-50 dark:text-gray-300"
                }`}
              >
                English
              </button>
            </div>
          </div>

          {/* CTA & Theme Controls */}
          <div className="mt-auto flex flex-col gap-4 pt-6 border-t border-[#dfe6dd] dark:border-[#1d2f21]">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-[#1C2B1F] dark:text-gray-300">
                {language === "bn" ? "থিম পরিবর্তন" : "Toggle Theme"}
              </span>
              <ThemeToggle />
            </div>

            <Button
              className="w-full rounded-xl bg-[#00963E] py-2.5 font-bold hover:bg-[#007a2d] text-white transition cursor-pointer"
              onClick={() => {
                setMobileOpen(false);
                onStartClick();
              }}
            >
              {startButtonLabel[language]}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
