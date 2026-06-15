import { useEffect, useState } from "react";

export type Language = "en" | "bn";

interface UseLanguageReturn {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (enText: string, bnText: string) => string;
}

export function useLanguage(): UseLanguageReturn {
  const [language, setLanguageState] = useState<Language>("bn");
  const [mounted, setMounted] = useState(false);

  // Initialize from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("krishokos-language") as Language | null;
    if (saved && ["en", "bn"].includes(saved)) {
      setLanguageState(saved);
      document.documentElement.lang = saved;
    }
    setMounted(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("krishokos-language", lang);
    document.documentElement.lang = lang;
  };

  const t = (enText: string, bnText: string) => {
    return language === "en" ? enText : bnText;
  };

  return {
    language: mounted ? language : "bn",
    setLanguage,
    t,
  };
}
