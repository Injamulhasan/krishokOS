"use client";

import { useEffect, useState } from "react";
import CropsShowcase from "./CropsShowcase";
import Header, { type Language } from "./Header";
import HeroSection from "./HeroSection";
import ModuleCards from "./ModuleCards";

const translations: Record<
  Language,
  {
    methods: { label: string; title: string; description: string };
    farmSetup: { title: string; description: string; badge: string };
    vision: {
      title: string;
      description: string;
      journey: string;
      workflow: string;
      workflowTitle: string;
      workflowDescription: string;
      stepsLabel: string;
      stepDescription: string;
      workflowMetrics: {
        steps: { value: string; label: string };
        ai: { value: string; label: string };
        erp: { value: string; label: string };
      };
    };
    platform: { title: string; description: string; label: string };
    assistant: { title: string; description: string; button: string };
    cta: { title: string; subtitle: string; button: string };
    farmModel: { title: string; description: string };
    dream: { label: string; quote: string };
    footer: {
      about: string;
      links: Array<{ href: string; label: string }>;
      copyright: string;
    };
    cultivationMethods: { icon: string; title: string; description: string }[];
    platformFeatures: { icon: string; title: string; description: string }[];
    aiCards: { emoji: string; title: string; subtitle: string }[];
    modelButtons: string[];
    farmSetupItems: string[];
    journeySteps: { icon: string; title: string }[];
  }
> = {
  bn: {
    methods: {
      label: "চাষ পদ্ধতি",
      title: "আপনার লক্ষ্য অনুযায়ী বেছে নিন",
      description:
        "উৎপাদন, নিরাপত্তা ও বাজার লক্ষ্য অনুযায়ী আপনার জন্য উপযুক্ত কৃষি পদ্ধতি নির্বাচন করুন।",
    },
    farmSetup: {
      title: "সম্পূর্ণ ফার্ম প্রোফাইল সেটআপ",
      description: "শুরু থেকে বাজারজাতকরণ পর্যন্ত",
      badge: "Farm Setup",
    },
    vision: {
      title: "জমি থেকে বাজার পর্যন্ত",
      description:
        "কৃষকOS প্রতিটি ধাপে আপনাকে সঠিক সিদ্ধান্ত, পর্যবেক্ষণ এবং ব্যবস্থাপনার সহায়তা দেয়।",
      journey: "Growing Journey",
      workflow: "কৃষকOS Workflow",
      workflowTitle: "একটি প্ল্যাটফর্মে সম্পূর্ণ চাষ ব্যবস্থাপনা",
      workflowDescription:
        "পরিকল্পনা, উৎপাদন, পর্যবেক্ষণ, হারভেস্ট এবং রপ্তানি পর্যন্ত প্রতিটি ধাপকে ডিজিটালভাবে পরিচালনা করুন।",
      stepsLabel: "ধাপ",
      stepDescription:
        "এই ধাপের জন্য প্রয়োজনীয় পরিকল্পনা, পর্যবেক্ষণ ও সিদ্ধান্ত গ্রহণে কৃষকOS আপনাকে সহায়তা করবে।",
      workflowMetrics: {
        steps: { value: "৮", label: "ধাপ" },
        ai: { value: "AI", label: "সহায়তা" },
        erp: { value: "ERP", label: "ট্র্যাকিং" },
      },
    },
    platform: {
      title: "একটি প্ল্যাটফর্ম, সম্পূর্ণ কৃষি জীবনচক্র",
      description:
        "প্ল্যান্টিক্স শুধু রোগ নির্ণয় করে। আরিওএস আপনাকে বলে আজ, এই সপ্তাহে এবং সম্পূর্ণ মৌসুমে কী করতে হবে।",
      label: "প্ল্যাটফর্ম",
    },
    assistant: {
      title: "ছবি তুলুন, সমাধান পান।",
      description:
        "পাতা, ফল, কান্ড অথবা মাটির ছবি আপলোড করুন। AI আপনার ফসলের সমস্যা শনাক্ত করে করণীয় জানাবে।",
      button: "ছবি আপলোড করুন",
    },
    cta: {
      title: "প্রযুক্তিনির্ভর, নিরাপদ এবং লাভজনক কৃষির ভবিষ্যৎ",
      subtitle:
        "ফসল পরিকল্পনা, AI রোগ শনাক্তকরণ, রপ্তানি প্রস্তুতি এবং সম্পূর্ণ ERP একসাথে।",
      button: "আজই কৃষকOS শুরু করুন",
    },
    farmModel: {
      title: "৭০:৩০ ফার্ম মডেল",
      description:
        "রুট জোন মালচিং, ভিত্রি খাদ ও VM স্প্রে সমন্বিত একটি বৈজ্ঞানিক পদ্ধতি — অবশিষ্টাংশমুক্ত ও রপ্তানযোগ্য ফলনের জন্য।",
    },
    dream: {
      label: "আমাদের স্বপ্ন",
      quote:
        '"প্রযুক্তিনির্ভর, নিরাপদ, টেকসই এবং রপ্তানযোগ্য কৃষির মাধ্যমে বাংলাদেশকে বিশ্বমানের পর্যায়ে নিয়ে যাওয়া।"',
    },
    footer: {
      about:
        "বাংলাদেশের কৃষকদের জন্য স্মার্ট ডিজিটাল ফার্ম ম্যানেজমেন্ট প্ল্যাটফর্ম।",
      links: [
        { href: "#modules", label: "মডিউল" },
        { href: "#assistant", label: "AI সহকারী" },
        { href: "#contact", label: "যোগাযোগ" },
        { href: "#privacy", label: "গোপনীয়তা" },
      ],
      copyright: "© 2026 কৃষকOS. All Rights Reserved.",
    },
    cultivationMethods: [
      {
        icon: "🌿",
        title: "জৈব চাষ",
        description: "রাসায়নিকবিহীন পরিবেশবান্ধব উৎপাদন পদ্ধতি।",
      },
      {
        icon: "⚗️",
        title: "প্রচলিত রাসায়নিক",
        description: "সার ও বালাইনাশক নির্ভর প্রচলিত চাষাবাদ।",
      },
      {
        icon: "🌱",
        title: "Residue-Free",
        description: "রপ্তানযোগ্য নিরাপদ ও অবশিষ্টাংশমুক্ত উৎপাদন।",
      },
      {
        icon: "🔄",
        title: "সমন্বিত (IPM)",
        description: "জৈব ও রাসায়নিকের বিজ্ঞানসম্মত সমন্বয়।",
      },
    ],
    platformFeatures: [
      {
        icon: "✦",
        title: "বুদ্ধিদীপ্ত ফার্ম পরিকল্পনা",
        description: "জাত নির্বাচন, সেচ, সার, খরচ ও মুনাফার পূর্ণ পরিকল্পনা।",
      },
      {
        icon: "⟳",
        title: "এআই রোগ শনাক্তকরণ",
        description: "পাতা, ফল বা কাণ্ডের ছবি তুলুন — তাৎক্ষণিক চিকিৎসা পান।",
      },
      {
        icon: "🗓",
        title: "ফসল ক্যালেন্ডার ও পরামর্শ",
        description: "প্রতি সপ্তাহে আবহাওয়া-সমন্বিত কাজের তালিকা।",
      },
      {
        icon: "🛡",
        title: "ট্রেসেবিলিটি ও রপ্তানি প্রস্তুতি",
        description: "ক্ষেত থেকে ক্রেতা পর্যন্ত প্রতিটি ধাপের রেকর্ড।",
      },
      {
        icon: "💳",
        title: "আর্থিক ট্র্যাকিং",
        description: "খরচ, আয়, লাভ-ক্ষতি ও একর প্রতি ROI।",
      },
      {
        icon: "💬",
        title: "এআই কৃষি বিশেষজ্ঞ",
        description: "বাংলায় প্রশ্ন করুন, তথ্যভিত্তিক উত্তর পান।",
      },
    ],
    aiCards: [
      { emoji: "🍃", title: "পাতা", subtitle: "Leaf Disease Detection" },
      { emoji: "🍈", title: "ফল", subtitle: "Fruit Analysis" },
      { emoji: "🌿", title: "কাণ্ড", subtitle: "Stem Monitoring" },
      { emoji: "🌎", title: "মাটি", subtitle: "Soil Diagnosis" },
    ],
    modelButtons: [
      "সার পরিকল্পনা",
      "সেচ সময়সূচি",
      "রোগ শনাক্তকরণ",
      "ফলন পূর্বাভাস",
      "খরচ-লাভ",
      "Export Score",
    ],
    farmSetupItems: [
      "ফসল নির্বাচন",
      "ফসল সেটআপ",
      "জমির প্রোফাইল",
      "মাটির বিশ্লেষণ",
      "সেচ পরিকল্পনা",
      "সার ব্যবস্থাপনা",
      "রোগ পর্যবেক্ষণ",
      "ফল পরিচর্যা",
      "হারভেস্ট",
      "প্যাকেজিং",
      "বাজারজাতকরণ",
    ],
    journeySteps: [
      { icon: "🚜", title: "জমি প্রস্তুতি" },
      { icon: "🌱", title: "রোপণ" },
      { icon: "💧", title: "সেচ" },
      { icon: "🔬", title: "রোগ শনাক্ত" },
      { icon: "🍃", title: "ফল পরিচর্যা" },
      { icon: "📦", title: "হারভেস্ট" },
      { icon: "🏪", title: "বাজার" },
      { icon: "🌍", title: "রপ্তানি" },
    ],
  },
  en: {
    methods: {
      label: "Methods",
      title: "Choose the approach that suits your goals",
      description:
        "Select the right farming method for production, safety and market fit.",
    },
    farmSetup: {
      title: "Complete Farm Profile Setup",
      description: "From planting to market readiness",
      badge: "Farm Setup",
    },
    vision: {
      title: "From field to market",
      description:
        "KriShokOS supports every step with better decisions, monitoring, and management.",
      journey: "Growing Journey",
      workflow: "KriShokOS Workflow",
      workflowTitle: "Complete farm management on one platform",
      workflowDescription:
        "Digitally manage planning, production, monitoring, harvest, and export in one platform.",
      stepsLabel: "Step",
      stepDescription:
        "KriShokOS guides you with planning, monitoring, and decisions for each stage.",
      workflowMetrics: {
        steps: { value: "8", label: "Steps" },
        ai: { value: "AI", label: "Assistance" },
        erp: { value: "ERP", label: "Tracking" },
      },
    },
    platform: {
      title: "One platform, complete agricultural lifecycle",
      description:
        "Not only disease detection — KriShokOS tells you what to do today, this week, and across the season.",
      label: "Platform",
    },
    assistant: {
      title: "Capture a picture, get a solution.",
      description:
        "Upload leaf, fruit, stem, or soil photos and receive AI-based crop recommendations.",
      button: "Upload Photo",
    },
    cta: {
      title: "The future of tech-driven, safe and profitable farming",
      subtitle:
        "Crop planning, AI disease detection, export readiness, and full ERP together.",
      button: "Start KriShokOS today",
    },
    farmModel: {
      title: "70:30 Farm Model",
      description:
        "A scientific approach combining root zone mulching, film feed, and VM sprays for residue-free and export-grade yields.",
    },
    dream: {
      label: "Our Dream",
      quote:
        '"Taking Bangladesh to global scale through tech-powered, safe, sustainable, and export-ready farming."',
    },
    footer: {
      about:
        "A smart digital farm management platform for Bangladeshi farmers.",
      links: [
        { href: "#modules", label: "Modules" },
        { href: "#assistant", label: "AI Assistant" },
        { href: "#contact", label: "Contact" },
        { href: "#privacy", label: "Privacy" },
      ],
      copyright: "© 2026 KriShokOS. All Rights Reserved.",
    },
    cultivationMethods: [
      {
        icon: "🌿",
        title: "Organic Farming",
        description: "Chemical-free, eco-friendly production methods.",
      },
      {
        icon: "⚗️",
        title: "Conventional Inputs",
        description:
          "Traditional farming with fertilizer and pesticide support.",
      },
      {
        icon: "🌱",
        title: "Residue-Free",
        description: "Safe, export-ready, residue-free production.",
      },
      {
        icon: "🔄",
        title: "Integrated (IPM)",
        description: "Scientific balance of organic and chemical inputs.",
      },
    ],
    platformFeatures: [
      {
        icon: "✦",
        title: "Intelligent Farm Planning",
        description:
          "Seed choice, irrigation, input, cost and profit planning in one system.",
      },
      {
        icon: "⟳",
        title: "AI Disease Detection",
        description:
          "Capture leaf, fruit or stem images for instant treatment guidance.",
      },
      {
        icon: "🗓",
        title: "Crop Calendar & Advice",
        description: "Weekly weather-adjusted task schedules.",
      },
      {
        icon: "🛡",
        title: "Traceability & Export Ready",
        description: "Record every step from field to buyer.",
      },
      {
        icon: "💳",
        title: "Financial Tracking",
        description: "Cost, revenue, profit-loss and ROI per acre.",
      },
      {
        icon: "💬",
        title: "AI Farm Advisor",
        description: "Ask questions in Bengali and get data-driven answers.",
      },
    ],
    aiCards: [
      { emoji: "🍃", title: "Leaf", subtitle: "Leaf Disease Detection" },
      { emoji: "🍈", title: "Fruit", subtitle: "Fruit Analysis" },
      { emoji: "🌿", title: "Stem", subtitle: "Stem Monitoring" },
      { emoji: "🌎", title: "Soil", subtitle: "Soil Diagnosis" },
    ],
    modelButtons: [
      "Fertilizer Plan",
      "Irrigation Schedule",
      "Disease Detection",
      "Yield Forecast",
      "Cost-Profit",
      "Export Score",
    ],
    farmSetupItems: [
      "Crop Selection",
      "Field Setup",
      "Soil Profile",
      "Soil Testing",
      "Irrigation Plan",
      "Input Management",
      "Pest Monitoring",
      "Crop Care",
      "Harvest",
      "Packaging",
      "Marketing",
    ],
    journeySteps: [
      { icon: "🚜", title: "Land Prep" },
      { icon: "🌱", title: "Planting" },
      { icon: "💧", title: "Irrigation" },
      { icon: "🔬", title: "Disease Detection" },
      { icon: "🍃", title: "Crop Care" },
      { icon: "📦", title: "Harvest" },
      { icon: "🏪", title: "Market" },
      { icon: "🌍", title: "Export" },
    ],
  },
};

export default function LandingPage() {
  const [language, setLanguage] = useState<Language>("bn");
  const locale = translations[language];

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <div className="min-h-screen bg-[#F7F4EE] text-[#0f2416]">
      <Header language={language} onLanguageChange={setLanguage} />
      <HeroSection language={language} />
      <ModuleCards language={language} />
      <CropsShowcase language={language} />

      <section
        className="mx-auto max-w-[1280px] px-4 py-24 sm:px-6"
        id="methods"
      >
        <div className="mb-14 text-center">
          <p className="mb-3 text-xs uppercase tracking-[4px] text-green-700">
            {locale.methods.label}
          </p>
          <h2 className="text-3xl font-medium text-[#1C2B1F] sm:text-5xl">
            {locale.methods.title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-600">
            {locale.methods.description}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {locale.cultivationMethods.map((item) => (
            <div
              key={item.title}
              className="group rounded-[28px] border border-[#E8E1D5] bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-green-200 hover:shadow-xl"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F4F8F3] text-3xl transition group-hover:scale-110">
                {item.icon}
              </div>
              <h3 className="mb-3 text-xl font-semibold text-[#1C2B1F]">
                {item.title}
              </h3>
              <p className="leading-relaxed text-gray-600">
                {item.description}
              </p>
              <div className="mt-6 h-[2px] w-12 bg-green-600 transition-all duration-300 group-hover:w-20" />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#EFE6D8] py-24" id="farm-setup">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
          <div className="mb-16 text-center">
            <p className="mb-3 text-xs uppercase tracking-[4px] text-green-700">
              {locale.farmSetup.badge}
            </p>
            <h2 className="text-3xl font-medium sm:text-5xl">
              {locale.farmSetup.title}
            </h2>
            <p className="mt-4 text-gray-600">{locale.farmSetup.description}</p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {locale.farmSetupItems.map((item, index) => (
              <div
                key={item}
                className="rounded-[24px] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-4 text-green-700">
                  {(index + 1).toString().padStart(2, "0")}
                </div>
                <h3 className="text-lg font-bold">{item}</h3>
                <p className="mt-3 text-sm text-gray-600">
                  কৃষকOS এই ধাপের জন্য প্রয়োজনীয় নির্দেশনা ও ট্র্যাকিং প্রদান
                  করে।
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-[28px] bg-green-700 p-8 text-white">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h3 className="text-2xl font-bold">{locale.platform.title}</h3>
                <p className="mt-2 text-white/80">
                  {locale.platform.description}
                </p>
              </div>
              <div className="text-4xl font-black">১১ ধাপ</div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="relative overflow-hidden bg-[#F8F6F0] py-28"
        id="vision"
      >
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-green-100/40 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-amber-100/40 blur-3xl" />

        <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6">
          <div className="mx-auto mb-20 max-w-3xl text-center">
            <p className="mb-4 text-xs uppercase tracking-[5px] text-green-700">
              {locale.vision.journey}
            </p>
            <h2 className="text-4xl font-medium leading-tight text-[#1C2B1F] sm:text-6xl">
              {locale.vision.title}
            </h2>
            <p className="mt-5 text-lg text-gray-600">
              {locale.vision.description}
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 top-0 hidden h-full w-[2px] -translate-x-1/2 bg-gradient-to-b from-green-200 via-green-400 to-green-200 lg:block" />
            {locale.journeySteps.map((step, index) => (
              <div
                key={step.title}
                className={`relative mb-8 flex items-center ${
                  index % 2 === 0 ? "lg:justify-start" : "lg:justify-end"
                }`}
              >
                <div className="w-full lg:w-[46%]">
                  <div className="group rounded-[32px] border border-[#E7E1D6] bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <div className="mb-6 flex items-center justify-between">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F4F8F3] text-3xl">
                        {step.icon}
                      </div>
                      <div className="rounded-full bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
                        {locale.vision.stepsLabel}{" "}
                        {(index + 1).toString().padStart(2, "0")}
                      </div>
                    </div>
                    <h3 className="text-2xl font-semibold text-[#1C2B1F]">
                      {step.title}
                    </h3>
                    <p className="mt-3 leading-relaxed text-gray-600">
                      {locale.vision.stepDescription}
                    </p>
                  </div>
                </div>
                <div className="absolute left-1/2 hidden -translate-x-1/2 lg:block">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-4 border-[#F8F6F0] bg-green-700 shadow-lg">
                    <div className="h-2 w-2 rounded-full bg-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 rounded-[36px] bg-gradient-to-r from-[#0F5D2C] to-[#1A7A3E] p-10 text-white shadow-2xl sm:p-14">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="mb-3 text-sm uppercase tracking-[3px] text-green-100">
                  {locale.vision.workflow}
                </p>
                <h3 className="text-3xl font-medium sm:text-4xl">
                  {locale.vision.workflowTitle}
                </h3>
                <p className="mt-4 max-w-2xl text-green-100">
                  {locale.vision.workflowDescription}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-5xl font-bold">
                    {locale.vision.workflowMetrics.steps.value}
                  </div>
                  <div className="text-sm text-green-100">
                    {locale.vision.workflowMetrics.steps.label}
                  </div>
                </div>
                <div>
                  <div className="text-5xl font-bold">
                    {locale.vision.workflowMetrics.ai.value}
                  </div>
                  <div className="text-sm text-green-100">
                    {locale.vision.workflowMetrics.ai.label}
                  </div>
                </div>
                <div>
                  <div className="text-5xl font-bold">
                    {locale.vision.workflowMetrics.erp.value}
                  </div>
                  <div className="text-sm text-green-100">
                    {locale.vision.workflowMetrics.erp.label}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="mx-auto max-w-[1280px] px-4 py-24 sm:px-6"
        id="assistant"
      >
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[4px] text-green-700">
              {locale.assistant.title}
            </p>
            <h2 className="text-3xl font-medium sm:text-5xl">
              {locale.assistant.title}
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              {locale.assistant.description}
            </p>
            <button className="mt-8 rounded-full bg-green-700 px-8 py-4 text-white shadow-lg transition hover:bg-green-800">
              {locale.assistant.button}
            </button>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {locale.aiCards.map((card) => (
              <div
                key={card.subtitle}
                className="rounded-[28px] border border-[#E8E1D5] bg-white p-6 shadow-sm"
              >
                <div className="mb-4 text-3xl">{card.emoji}</div>
                <h3 className="text-xl font-semibold">{card.title}</h3>
                <p className="mt-2 text-sm text-gray-500">{card.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F2E7D8] py-24" id="cta">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
          <div className="rounded-[32px] bg-white p-12 shadow-xl sm:p-16">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="text-sm uppercase tracking-[4px] text-green-700">
                  {locale.platform.label}
                </p>
                <h2 className="mt-4 text-4xl font-semibold text-[#1c2b1f] sm:text-5xl">
                  {locale.cta.title}
                </h2>
                <p className="mt-6 text-lg text-gray-600">
                  {locale.cta.subtitle}
                </p>
              </div>
              <button className="self-start rounded-full bg-green-700 px-10 py-4 text-white shadow-lg transition hover:bg-green-800">
                {locale.cta.button}
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#E8E1D5] bg-white py-12">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-6 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-lg font-semibold">{locale.dream.label}</p>
            <p className="mt-2 max-w-xl text-gray-600">{locale.dream.quote}</p>
          </div>
          <div className="flex flex-wrap gap-4">
            {locale.footer.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-gray-600 transition hover:text-green-700"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-[1280px] px-4 sm:px-6 text-sm text-gray-500">
          {locale.footer.about}
        </div>
        <div className="mx-auto mt-4 max-w-[1280px] px-4 sm:px-6 text-sm text-gray-400">
          {locale.footer.copyright}
        </div>
      </footer>
    </div>
  );
}
