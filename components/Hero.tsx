"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <div className="min-h-screen bg-[#F7F4EE] text-[#0f2416]">
      {/* ================= HEADER ================= */}

<header className="sticky top-0 z-50 border-b border-[#dfe6dd] bg-[#F8F8F4]">
  <div className="mx-auto flex h-[68px] max-w-[1280px] items-center justify-between px-6">
    
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#00A63E] text-white">
        কৃ
      </div>

      <div>
        <h3 className="text-[18px] font-bold leading-none">
         কৃষকOS
        </h3>

        <p className="mt-1 text-[10px] tracking-[2px] text-gray-500">
          BANGLADESH
        </p>
      </div>
    </div>

    <nav className="hidden lg:flex items-center gap-12">
      <a href="#">ফিচার</a>
      <a href="#">ফসল</a>
      <a href="#">ড্যাশবোর্ড</a>
    </nav>

    <div className="flex items-center gap-4">
      <div className="hidden md:flex rounded-full border bg-white p-1">
        <button className="rounded-full bg-[#00963F] px-4 py-1 text-xs text-white">
          বাংলা
        </button>

        <button className="px-3 text-xs">
          EN
        </button>
      </div>

      <Button className="rounded-full bg-[#00963F] px-6">
        শুরু করুন
      </Button>
    </div>
  </div>
</header>

{/* ================= HERO ================= */}

<section className="relative overflow-hidden bg-[#F8F8F4]">
  {/* Background Glow */}

  <div className="absolute left-[-200px] top-[-100px] h-[700px] w-[700px] rounded-full bg-green-100/70 blur-[120px]" />

  <div className="absolute bottom-0 right-[-150px] h-[500px] w-[500px] rounded-full bg-yellow-100/70 blur-[120px]" />

  <div className="relative mx-auto max-w-[1280px] px-6 py-16 lg:py-20">
    <div className="grid items-center gap-16 lg:grid-cols-2">
      {/* LEFT CONTENT */}

      <div>
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#DCE8D8] bg-white px-4 py-2 text-sm font-medium text-[#00963F]">
          <span>🌿</span>
          বাংলাদেশের প্রথম পূর্ণাঙ্গ ফার্ম ERP
        </div>

        <h1 className="max-w-[650px] text-[58px] font-medium font-black leading-[0.92] tracking-[-2px] text-[#08210F] lg:text-[84px]">
        স্মার্ট কৃষি,
          <br />
         রপ্তানিযোগ্য 
          <br />
          <span className="text-[#00A63E]">
            ফসল।
          </span>
        </h1>

        <p className="mt-8 max-w-[620px] text-xl leading-relaxed text-[#314539]">
        জমি প্রস্তুতি থেকে ফসল সংগ্রহ — AI-চালিত পরিকল্পনা, পুষ্টি ব্যবস্থাপনা ও অবশিষ্টাংশমুক্ত উৎপাদনের একটি ডিজিটাল ফার্মিং অপারেটিং সিস্টেম।
        </p>

        {/* CTA */}

        <div className="mt-10 flex flex-wrap gap-4">
          <button className="flex h-[56px] items-center rounded-full bg-[#00A63E] px-8 font-semibold text-white transition hover:bg-[#008737]">
            ফার্ম সেটআপ শুরু করুন →
          </button>

          <button className="flex h-[56px] items-center rounded-full border border-[#D7D7D7] bg-white px-8 font-semibold text-[#08210F] transition hover:bg-gray-50">
            ড্যাশবোর্ড দেখুন
          </button>
        </div>

        {/* STATS */}

        <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <div className="text-4xl font-bold text-[#08210F]">
              12k+
            </div>

            <div className="mt-1 text-sm text-gray-500">
              নিবন্ধিত কৃষক
            </div>
          </div>

          <div>
            <div className="text-4xl font-bold text-[#08210F]">
              28%
            </div>

            <div className="mt-1 text-sm text-gray-500">
              গড় ফলন বৃদ্ধি
            </div>
          </div>

          <div>
            <div className="text-4xl font-bold text-[#08210F]">
              98%
            </div>

            <div className="mt-1 text-sm text-gray-500">
              অবশিষ্টাংশমুক্ত খাদ্য
            </div>
          </div>

          <div>
            <div className="text-4xl font-bold text-[#08210F]">
              42
            </div>

            <div className="mt-1 text-sm text-gray-500">
              জেলা সক্রিয়
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT CARD */}

      <div className="relative mx-auto w-full max-w-[620px]">
        <div className="overflow-hidden rounded-[30px] border border-[#DED8C8] bg-white shadow-[0_25px_60px_rgba(0,0,0,0.08)]">
          <img
            src="/hero-plantation.jpg"
            alt="Farm"
            className="h-[520px] w-full object-cover"
          />
        </div>

        {/* KPI PANEL */}

<div className="absolute right-4 top-4 rounded-[24px] bg-gradient-to-br from-[#FFE7BF] via-[#F6B64C] to-[#C86B12] p-6 shadow-[0_20px_40px_rgba(214,119,6,0.35)] backdrop-blur-sm">
  
            <div className="grid grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-bold text-[#08210F]">
                ৩৫%
              </div>

              <div className="mt-1 text-xs text-gray-500">
                উৎপাদন বৃদ্ধি
              </div>
            </div>

            <div>
              <div className="text-3xl font-bold text-[#08210F]">
                ১০০%
              </div>

              <div className="mt-1 text-xs text-gray-500">
                নিরাপদ খাদ্য
              </div>
            </div>

            <div>
              <div className="text-3xl font-bold text-[#08210F]">
                GAP
              </div>

              <div className="mt-1 text-xs text-gray-500">
                রপ্তানি প্রস্তুত
              </div>
            </div>
          </div>
        </div>

        {/* ADVISORY */}

        <div className="absolute bottom-5 left-5 right-5 rounded-[20px] bg-[#F4F2EA] p-5 shadow-lg">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs text-gray-500">
                আজকের পরামর্শ
              </p>

              <p className="mt-1 font-medium text-[#08210F]">
                ৪৮ ঘণ্টার বৃষ্টি — সার প্রয়োগ
                স্থগিত রাখুন
              </p>
            </div>

            <div className="rounded-full bg-[#E7D6A7] px-4 py-2 text-xs font-medium text-[#6E4D00]">
              সতর্কতা
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* ================= FEATURES ================= */}

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-12">
          <p className="mb-2 text-xs uppercase tracking-[4px] text-green-700">
            মডিউল
          </p>

          <h2 className="text-4xl font-medium">
            তিনটি ধাপ, এক প্ল্যাটফর্ম
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Card 1 */}

          <div className="rounded-[24px] border border-[#e6dfd2] bg-white p-8 shadow-sm">
            <div className="mb-4 text-4xl">
              🌱
            </div>

            <h3 className="mb-2 text-xl font-bold">
              ফসল ব্যবস্থাপনা
            </h3>

            <p className="mb-4 text-sm text-gray-600">
              সম্পূর্ণ ফার্মিং গাইড ও পরিকল্পনা।
            </p>

            <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">
              কৃষক মডিউল
            </span>
          </div>

          {/* Card 2 */}

          <div className="rounded-[24px] border border-[#e6dfd2] bg-white p-8 shadow-sm">
            <div className="mb-4 text-4xl">
              🏭
            </div>

            <h3 className="mb-2 text-xl font-bold">
              প্রসেসিং
            </h3>

            <p className="mb-4 text-sm text-gray-600">
              মান নিয়ন্ত্রণ এবং উৎপাদন।
            </p>

            <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">
              প্রসেসিং
            </span>
          </div>

          {/* Card 3 */}

          <div className="rounded-[24px] border border-[#e6dfd2] bg-white p-8 shadow-sm">
            <div className="mb-4 text-4xl">
              🌍
            </div>

            <h3 className="mb-2 text-xl font-bold">
              রপ্তানি চ্যান
            </h3>

            <p className="mb-4 text-sm text-gray-600">
              বৈশ্বিক বাজারে কৃষি পণ্য।
            </p>

            <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">
              এক্সপোর্ট
            </span>
          </div>
        </div>
      </section>


{/* ================= CROPS SHOWCASE ================= */}

<section className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6">
  <div className="mb-12 text-center">
    <p className="mb-3 text-xs uppercase tracking-[4px] text-green-700">
      জনপ্রিয় ফসল
    </p>

    <h2 className="text-3xl font-medium sm:text-5xl">
      আপনার ফসল নির্বাচন করুন
    </h2>
  </div>

  <div className="grid gap-6 lg:grid-cols-2">
    {/* BANANA */}

    <div className="overflow-hidden rounded-[32px] bg-[#F5A623] p-8 text-white shadow-xl">
      <div className="flex h-full flex-col justify-between">
        <div>
          <span className="rounded-full bg-white/20 px-3 py-1 text-xs">
            ফল ফসল
          </span>

          <h3 className="mt-5 text-4xl font-black">
            কলা
          </h3>

          <p className="mt-2 text-white/80">
            Banana Cultivation ERP
          </p>
        </div>

        <div className="mt-10">
          <img
            src="https://images.unsplash.com/photo-1603833665858-e61d17a86224?q=80&w=1000&auto=format&fit=crop"
            alt="Banana"
            className="h-[250px] w-full rounded-2xl object-cover"
          />
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <span className="rounded-full bg-white/20 px-3 py-1 text-xs">
            Tissue Culture
          </span>

          <span className="rounded-full bg-white/20 px-3 py-1 text-xs">
            Export Ready
          </span>

          <span className="rounded-full bg-white/20 px-3 py-1 text-xs">
            Residue Free
          </span>
        </div>
      </div>
    </div>

    {/* PAPAYA */}

    <div className="overflow-hidden rounded-[32px] bg-[#1C7A2A] p-8 text-white shadow-xl">
      <div className="flex h-full flex-col justify-between">
        <div>
          <span className="rounded-full bg-white/20 px-3 py-1 text-xs">
            ফল ফসল
          </span>

          <h3 className="mt-5 text-4xl font-black">
            পেঁপে
          </h3>

          <p className="mt-2 text-white/80">
            Papaya Farming ERP
          </p>
        </div>

        <div className="mt-10">
          <img
            src="https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?q=80&w=1000&auto=format&fit=crop"
            alt="Papaya"
            className="h-[250px] w-full rounded-2xl object-cover"
          />
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <span className="rounded-full bg-white/20 px-3 py-1 text-xs">
            High Yield
          </span>

          <span className="rounded-full bg-white/20 px-3 py-1 text-xs">
            Disease Tracking
          </span>

          <span className="rounded-full bg-white/20 px-3 py-1 text-xs">
            Smart Irrigation
          </span>
        </div>
      </div>
    </div>
  </div>
</section>



{/* ================= GOALS SECTION / CULTIVATION METHODS  ================= */}

<section className="mx-auto max-w-[1200px] px-4 py-24 sm:px-6">
  <div className="mb-14 text-center">
    <p className="mb-3 text-xs uppercase tracking-[4px] text-green-700">
      চাষ পদ্ধতি
    </p>

    <h2 className="text-3xl font-medium text-[#1C2B1F] sm:text-5xl">
      আপনার লক্ষ্য অনুযায়ী বেছে নিন
    </h2>

    <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-600">
      উৎপাদন, নিরাপত্তা ও বাজার লক্ষ্য অনুযায়ী
      আপনার জন্য উপযুক্ত কৃষি পদ্ধতি নির্বাচন করুন।
    </p>
  </div>

  <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
    {[
      {
        icon: "🌿",
        title: "জৈব চাষ",
        description:
          "রাসায়নিকবিহীন পরিবেশবান্ধব উৎপাদন পদ্ধতি।",
      },
      {
        icon: "⚗️",
        title: "প্রচলিত রাসায়নিক",
        description:
          "সার ও বালাইনাশক নির্ভর প্রচলিত চাষাবাদ।",
      },
      {
        icon: "🌱",
        title: "Residue-Free",
        description:
          "রপ্তানিযোগ্য নিরাপদ ও অবশিষ্টাংশমুক্ত উৎপাদন।",
      },
      {
        icon: "🔄",
        title: "সমন্বিত (IPM)",
        description:
          "জৈব ও রাসায়নিকের বিজ্ঞানসম্মত সমন্বয়।",
      },
    ].map((item) => (
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

{/* ================= FARM PROFILE ================= */}

<section className="bg-[#EFE6D8] py-24">
  <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
    <div className="mb-16 text-center">
      <p className="mb-3 text-xs uppercase tracking-[4px] text-green-700">
        Farm Setup
      </p>

      <h2 className="text-3xl font-medium sm:text-5xl">
        সম্পূর্ণ ফার্ম প্রোফাইল সেটআপ
      </h2>

      <p className="mt-4 text-gray-600">
        শুরু থেকে বাজারজাতকরণ পর্যন্ত
      </p>
    </div>

    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {[
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
      ].map((item, index) => (
        <div
          key={item}
          className="rounded-[24px] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
        >
          <div className="mb-4 text-green-700">
            {(index + 1).toString().padStart(2, "0")}
          </div>

          <h3 className="text-lg font-bold">
            {item}
          </h3>

          <p className="mt-3 text-sm text-gray-600">
            কৃষকOS এই ধাপের জন্য প্রয়োজনীয়
            নির্দেশনা ও ট্র্যাকিং প্রদান করে।
          </p>
        </div>
      ))}
    </div>

    {/* BOTTOM SUMMARY */}

    <div className="mt-10 rounded-[28px] bg-green-700 p-8 text-white">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h3 className="text-2xl font-bold">
            সম্পূর্ণ ডিজিটাল ফার্ম ম্যানেজমেন্ট
          </h3>

          <p className="mt-2 text-white/80">
            পরিকল্পনা থেকে বাজার পর্যন্ত সবকিছু এক জায়গায়।
          </p>
        </div>

        <div className="text-4xl font-black">
          ১১ ধাপ
        </div>
      </div>
    </div>
  </div>
</section>



{/* ================= JOURNEY SECTION/ FARM JOURNEY  ================= */}

<section className="relative overflow-hidden bg-[#F8F6F0] py-28">
  {/* Background decoration */}

  <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-green-100/40 blur-3xl" />

  <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-amber-100/40 blur-3xl" />

  <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6">
    
    {/* Header */}

    <div className="mx-auto mb-20 max-w-3xl text-center">
      <p className="mb-4 text-xs uppercase tracking-[5px] text-green-700">
        Growing Journey
      </p>

      <h2 className="text-4xl font-medium leading-tight text-[#1C2B1F] sm:text-6xl">
        জমি থেকে বাজার পর্যন্ত
      </h2>

      <p className="mt-5 text-lg text-gray-600">
        কৃষকOS প্রতিটি ধাপে আপনাকে সঠিক সিদ্ধান্ত,
        পর্যবেক্ষণ এবং ব্যবস্থাপনার সহায়তা দেয়।
      </p>
    </div>

    {/* Timeline */}

    <div className="relative">

      {/* Center Line */}

      <div className="absolute left-1/2 top-0 hidden h-full w-[2px] -translate-x-1/2 bg-gradient-to-b from-green-200 via-green-400 to-green-200 lg:block" />

      {[
        {
          title: "জমি প্রস্তুতি",
          icon: "🚜",
        },
        {
          title: "রোপণ",
          icon: "🌱",
        },
        {
          title: "সেচ",
          icon: "💧",
        },
        {
          title: "রোগ শনাক্ত",
          icon: "🔬",
        },
        {
          title: "ফল পরিচর্যা",
          icon: "🍃",
        },
        {
          title: "হারভেস্ট",
          icon: "📦",
        },
        {
          title: "বাজার",
          icon: "🏪",
        },
        {
          title: "রপ্তানি",
          icon: "🌍",
        },
      ].map((step, index) => (
        <div
          key={step.title}
          className={`relative mb-8 flex items-center ${
            index % 2 === 0
              ? "lg:justify-start"
              : "lg:justify-end"
          }`}
        >
          {/* Card */}

          <div className="w-full lg:w-[46%]">
            <div className="group rounded-[32px] border border-[#E7E1D6] bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              
              <div className="mb-6 flex items-center justify-between">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F4F8F3] text-3xl">
                  {step.icon}
                </div>

                <div className="rounded-full bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
                  Step {(index + 1)
                    .toString()
                    .padStart(2, "0")}
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-[#1C2B1F]">
                {step.title}
              </h3>

              <p className="mt-3 leading-relaxed text-gray-600">
                এই ধাপের জন্য প্রয়োজনীয়
                পরিকল্পনা, পর্যবেক্ষণ ও
                সিদ্ধান্ত গ্রহণে কৃষকOS
                আপনাকে সহায়তা করবে।
              </p>
            </div>
          </div>

          {/* Center Node */}

          <div className="absolute left-1/2 hidden -translate-x-1/2 lg:block">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border-4 border-[#F8F6F0] bg-green-700 shadow-lg">
              <div className="h-2 w-2 rounded-full bg-white" />
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Summary Card */}

    <div className="mt-20 rounded-[36px] bg-gradient-to-r from-[#0F5D2C] to-[#1A7A3E] p-10 text-white shadow-2xl sm:p-14">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        
        <div>
          <p className="mb-3 text-sm uppercase tracking-[3px] text-green-100">
            কৃষকOS Workflow
          </p>

          <h3 className="text-3xl font-medium sm:text-4xl">
            একটি প্ল্যাটফর্মে সম্পূর্ণ
            চাষ ব্যবস্থাপনা
          </h3>

          <p className="mt-4 max-w-2xl text-green-100">
            পরিকল্পনা, উৎপাদন, পর্যবেক্ষণ,
            হারভেস্ট এবং রপ্তানি পর্যন্ত
            প্রতিটি ধাপকে ডিজিটালভাবে
            পরিচালনা করুন।
          </p>
        </div>

        <div className="grid grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-5xl font-bold">
              ৮
            </div>
            <div className="text-sm text-green-100">
              ধাপ
            </div>
          </div>

          <div>
            <div className="text-5xl font-bold">
              AI
            </div>
            <div className="text-sm text-green-100">
              সহায়তা
            </div>
          </div>

          <div>
            <div className="text-5xl font-bold">
              ERP
            </div>
            <div className="text-sm text-green-100">
              ট্র্যাকিং
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</section>


{/* ================= PLATFORM / FULL LIFECYCLE ================= */}

<section className="mx-auto max-w-[1200px] px-4 py-24 sm:px-6">

  {/* Header */}
  <div className="mb-14">
    <p className="mb-3 text-xs uppercase tracking-[4px] text-green-700">
      প্ল্যাটফর্ম
    </p>

    <h2 className="text-4xl font-medium font-black leading-tight text-[#1C2B1F] sm:text-5xl lg:text-6xl">
      একটি প্ল্যাটফর্ম, সম্পূর্ণ কৃষি জীবনচক্র
    </h2>

    <p className="mt-5 max-w-2xl text-base leading-relaxed text-gray-600">
      প্ল্যান্টিক্স শুধু রোগ নির্ণয় করে। আরিওএস আপনাকে বলে আজ, এই
      সপ্তাহে এবং সম্পূর্ণ মৌসুমে কী করতে হবে।
    </p>
  </div>

  {/* 2×3 Feature Grid */}
  <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
    {[
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
    ].map((item) => (
      <div
        key={item.title}
        className="group rounded-[24px] border border-[#E8E2D8] bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      >
        {/* Icon bubble */}
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-xl text-green-700">
          {item.icon}
        </div>

        <h3 className="mb-3 text-xl font-bold text-[#1C2B1F]">
          {item.title}
        </h3>

        <p className="leading-relaxed text-gray-500">
          {item.description}
        </p>
      </div>
    ))}
  </div>
</section>



{/* ================= AI ASSISTANT ================= */}

<section className="mx-auto max-w-[1200px] px-4 py-10 sm:px-6">
  <div className="overflow-hidden rounded-[36px] bg-gradient-to-r from-[#041B0B] to-[#0B3417] p-8 text-white shadow-2xl sm:p-14">
    <div className="grid items-center gap-10 lg:grid-cols-2">
      {/* LEFT */}

      <div>
        <span className="rounded-full bg-white/10 px-4 py-2 text-xs">
          AI Plant Doctor
        </span>

        <h2 className="mt-6 text-4xl font-medium font-black leading-tight sm:text-6xl">
          ছবি তুলুন,
          <br />
          সমাধান পান।
        </h2>

        <p className="mt-6 max-w-xl text-white/70">
          পাতা, ফল, কান্ড অথবা মাটির ছবি
          আপলোড করুন। AI আপনার ফসলের
          সমস্যা শনাক্ত করে করণীয় জানাবে।
        </p>

        <button className="mt-8 rounded-full bg-white px-8 py-4 font-semibold text-black transition hover:scale-105">
          ছবি আপলোড করুন
        </button>
      </div>

      {/* RIGHT */}

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-[24px] bg-white/10 p-6 backdrop-blur">
          <div className="mb-3 text-4xl">
            🍃
          </div>

          <h3 className="font-bold">
            পাতা
          </h3>

          <p className="mt-2 text-sm text-white/70">
            Leaf Disease Detection
          </p>
        </div>

        <div className="rounded-[24px] bg-white/10 p-6 backdrop-blur">
          <div className="mb-3 text-4xl">
            🍈
          </div>

          <h3 className="font-bold">
            ফল
          </h3>

          <p className="mt-2 text-sm text-white/70">
            Fruit Analysis
          </p>
        </div>

        <div className="rounded-[24px] bg-white/10 p-6 backdrop-blur">
          <div className="mb-3 text-4xl">
            🌿
          </div>

          <h3 className="font-bold">
            কান্ড
          </h3>

          <p className="mt-2 text-sm text-white/70">
            Stem Monitoring
          </p>
        </div>

        <div className="rounded-[24px] bg-white/10 p-6 backdrop-blur">
          <div className="mb-3 text-4xl">
            🌎
          </div>

          <h3 className="font-bold">
            মাটি
          </h3>

          <p className="mt-2 text-sm text-white/70">
            Soil Diagnosis
          </p>
        </div>
      </div>
    </div>
  </div>
</section>



{/* ================= CTA SECTION ================= */}

<section className="mx-auto max-w-[1200px] px-4 py-28 text-center">
  <div className="rounded-[40px] bg-[#EFE6D8] p-10 sm:p-16">
    <p className="mb-6 text-xs uppercase tracking-[4px] text-green-700">
      কৃষকOS
    </p>

    <h2 className="mx-auto max-w-4xl text-3xl font-normal leading-[1.25] text-[#1C2B1F] sm:text-5xl lg:text-4xl">
      প্রযুক্তিনির্ভর,
      <br />
      নিরাপদ এবং
      <br />
      লাভজনক কৃষির ভবিষ্যৎ
    </h2>

    <p className="mx-auto mt-6 max-w-2xl text-gray-600">
      ফসল পরিকল্পনা, AI রোগ শনাক্তকরণ,
      রপ্তানি প্রস্তুতি এবং সম্পূর্ণ ERP
      একসাথে।
    </p>

    <button className="mt-10 rounded-full bg-green-700 px-10 py-5 text-white transition hover:bg-green-800">
      আজই কৃষকOS শুরু করুন
    </button>
  </div>
</section>


{/* ================= 70:30 FARM MODEL ================= */}

<section className="mx-auto max-w-[1200px] px-4 py-10 sm:px-6">
  <div className="overflow-hidden rounded-[36px] bg-gradient-to-br from-[#1C6B30] to-[#145222] p-10 text-white shadow-2xl sm:p-14">
    <div className="grid items-center gap-10 lg:grid-cols-2">

      {/* LEFT — Title & Description */}
      <div>
        <h2 className="text-5xl font-medium font-black leading-tight sm:text-6xl lg:text-6xl">
          ৭০:৩০ ফার্ম মডেল
        </h2>

        <p className="mt-6 max-w-md text-base leading-relaxed text-white/75">
          রুট জোন মালচিং, ভিত্রি খাদ ও VM স্প্রে সমন্বিত একটি বৈজ্ঞানিক
          পদ্ধতি — অবশিষ্টাংশমুক্ত ও রপ্তানিযোগ্য ফলনের জন্য।
        </p>
      </div>

      {/* RIGHT — Feature Buttons Grid */}
      <div className="grid grid-cols-2 gap-3">
        {[
          "সার পরিকল্পনা",
          "সেচ সময়সূচি",
          "রোগ শনাক্তকরণ",
          "ফলন পূর্বাভাস",
          "খরচ-লাভ",
          "Export Score",
        ].map((label) => (
          <button
            key={label}
            className="rounded-2xl border border-white/25 bg-white/10 px-5 py-4 text-left text-sm font-medium text-white backdrop-blur transition hover:bg-white/20"
          >
            {label}
          </button>
        ))}
      </div>

    </div>
  </div>
</section>


{/* ================= CTA SECTION ================= */}

<section className="mx-auto max-w-[1200px] px-4 py-28 text-center">
  <div className="rounded-[40px] p-10 sm:p-16">
    <p className="mb-6 text-xs uppercase tracking-[4px] text-green-700">
আমাদের স্বপ্ন
    </p>
<h2 className="mx-auto max-w-5xl text-3xl font-medium leading-[1.3] text-[#1C2B1F] sm:text-5xl lg:text-6xl">
  "প্রযুক্তিনির্ভর, নিরাপদ, টেকসই
  <br />
  এবং রপ্তানিযোগ্য কৃষির মাধ্যমে বাংলাদেশকে
  <br />
  বিশ্বমানের পর্যায়ে নিয়ে যাওয়া।"
</h2>

  </div>
</section>

{/* ================= FOOTER ================= */}

<footer className="border-t border-[#e4ddd0] bg-[#F7F4EE]">
  <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6">
    <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-700 font-bold text-white">
            ক
          </div>

          <span className="text-xl font-bold">
            কৃষকOS
          </span>
        </div>

        <p className="mt-4 max-w-md text-sm text-gray-600">
          বাংলাদেশের কৃষকদের জন্য
          স্মার্ট ডিজিটাল ফার্ম
          ম্যানেজমেন্ট প্ল্যাটফর্ম।
        </p>
      </div>

      <div className="flex flex-wrap gap-8 text-sm">
        <a href="#" className="hover:text-green-700">
          মডিউল
        </a>

        <a href="#" className="hover:text-green-700">
          AI সহকারী
        </a>

        <a href="#" className="hover:text-green-700">
          যোগাযোগ
        </a>

        <a href="#" className="hover:text-green-700">
          গোপনীয়তা
        </a>
      </div>
    </div>

    <div className="mt-10 border-t border-[#e4ddd0] pt-6 text-center text-sm text-gray-500">
      © 2026 কৃষকOS. All Rights Reserved.
    </div>
  </div>
</footer>


    </div>
  );

}