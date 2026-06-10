import CropsShowcase from "./CropsShowcase";
import Header from "./Header";
import HeroSection from "./HeroSection";
import ModuleCards from "./ModuleCards";

const cultivationMethods = [
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
    description: "রপ্তানিযোগ্য নিরাপদ ও অবশিষ্টাংশমুক্ত উৎপাদন।",
  },
  {
    icon: "🔄",
    title: "সমন্বিত (IPM)",
    description: "জৈব ও রাসায়নিকের বিজ্ঞানসম্মত সমন্বয়।",
  },
];

const farmSetupItems = [
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
];

const journeySteps = [
  { icon: "🚜", title: "জমি প্রস্তুতি" },
  { icon: "🌱", title: "রোপণ" },
  { icon: "💧", title: "সেচ" },
  { icon: "🔬", title: "রোগ শনাক্ত" },
  { icon: "🍃", title: "ফল পরিচর্যা" },
  { icon: "📦", title: "হারভেস্ট" },
  { icon: "🏪", title: "বাজার" },
  { icon: "🌍", title: "রপ্তানি" },
];

const platformFeatures = [
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
];

const aiCards = [
  { emoji: "🍃", title: "পাতা", subtitle: "Leaf Disease Detection" },
  { emoji: "🍈", title: "ফল", subtitle: "Fruit Analysis" },
  { emoji: "🌿", title: "কাণ্ড", subtitle: "Stem Monitoring" },
  { emoji: "🌎", title: "মাটি", subtitle: "Soil Diagnosis" },
];

const modelButtons = [
  "সার পরিকল্পনা",
  "সেচ সময়সূচি",
  "রোগ শনাক্তকরণ",
  "ফলন পূর্বাভাস",
  "খরচ-লাভ",
  "Export Score",
];

const footerLinks = [
  { href: "#modules", label: "মডিউল" },
  { href: "#assistant", label: "AI সহকারী" },
  { href: "#contact", label: "যোগাযোগ" },
  { href: "#privacy", label: "গোপনীয়তা" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F7F4EE] text-[#0f2416]">
      <Header />
      <HeroSection />
      <ModuleCards />
      <CropsShowcase />

      <section
        className="mx-auto max-w-[1280px] px-4 py-24 sm:px-6"
        id="methods"
      >
        <div className="mb-14 text-center">
          <p className="mb-3 text-xs uppercase tracking-[4px] text-green-700">
            চাষ পদ্ধতি
          </p>
          <h2 className="text-3xl font-medium text-[#1C2B1F] sm:text-5xl">
            আপনার লক্ষ্য অনুযায়ী বেছে নিন
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-600">
            উৎপাদন, নিরাপত্তা ও বাজার লক্ষ্য অনুযায়ী আপনার জন্য উপযুক্ত কৃষি
            পদ্ধতি নির্বাচন করুন।
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {cultivationMethods.map((item) => (
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
              Farm Setup
            </p>
            <h2 className="text-3xl font-medium sm:text-5xl">
              সম্পূর্ণ ফার্ম প্রোফাইল সেটআপ
            </h2>
            <p className="mt-4 text-gray-600">শুরু থেকে বাজারজাতকরণ পর্যন্ত</p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {farmSetupItems.map((item, index) => (
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
                <h3 className="text-2xl font-bold">
                  সম্পূর্ণ ডিজিটাল ফার্ম ম্যানেজমেন্ট
                </h3>
                <p className="mt-2 text-white/80">
                  পরিকল্পনা থেকে বাজার পর্যন্ত সবকিছু এক জায়গায়।
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
              Growing Journey
            </p>
            <h2 className="text-4xl font-medium leading-tight text-[#1C2B1F] sm:text-6xl">
              জমি থেকে বাজার পর্যন্ত
            </h2>
            <p className="mt-5 text-lg text-gray-600">
              কৃষকOS প্রতিটি ধাপে আপনাকে সঠিক সিদ্ধান্ত, পর্যবেক্ষণ এবং
              ব্যবস্থাপনার সহায়তা দেয়।
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 top-0 hidden h-full w-[2px] -translate-x-1/2 bg-gradient-to-b from-green-200 via-green-400 to-green-200 lg:block" />
            {journeySteps.map((step, index) => (
              <div
                key={step.title}
                className={`relative mb-8 flex items-center ${index % 2 === 0 ? "lg:justify-start" : "lg:justify-end"}`}
              >
                <div className="w-full lg:w-[46%]">
                  <div className="group rounded-[32px] border border-[#E7E1D6] bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <div className="mb-6 flex items-center justify-between">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F4F8F3] text-3xl">
                        {step.icon}
                      </div>
                      <div className="rounded-full bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
                        Step {(index + 1).toString().padStart(2, "0")}
                      </div>
                    </div>
                    <h3 className="text-2xl font-semibold text-[#1C2B1F]">
                      {step.title}
                    </h3>
                    <p className="mt-3 leading-relaxed text-gray-600">
                      এই ধাপের জন্য প্রয়োজনীয় পরিকল্পনা, পর্যবেক্ষণ ও সিদ্ধান্ত
                      গ্রহণে কৃষকOS আপনাকে সহায়তা করবে।
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
                  কৃষকOS Workflow
                </p>
                <h3 className="text-3xl font-medium sm:text-4xl">
                  একটি প্ল্যাটফর্মে সম্পূর্ণ চাষ ব্যবস্থাপনা
                </h3>
                <p className="mt-4 max-w-2xl text-green-100">
                  পরিকল্পনা, উৎপাদন, পর্যবেক্ষণ, হারভেস্ট এবং রপ্তানি পর্যন্ত
                  প্রতিটি ধাপকে ডিজিটালভাবে পরিচালনা করুন।
                </p>
              </div>

              <div className="grid grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-5xl font-bold">৮</div>
                  <div className="text-sm text-green-100">ধাপ</div>
                </div>
                <div>
                  <div className="text-5xl font-bold">AI</div>
                  <div className="text-sm text-green-100">সহায়তা</div>
                </div>
                <div>
                  <div className="text-5xl font-bold">ERP</div>
                  <div className="text-sm text-green-100">ট্র্যাকিং</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="mx-auto max-w-[1280px] px-4 py-24 sm:px-6"
        id="platform"
      >
        <div className="mb-14">
          <p className="mb-3 text-xs uppercase tracking-[4px] text-green-700">
            প্ল্যাটফর্ম
          </p>
          <h2 className="text-4xl font-medium font-black leading-tight text-[#1C2B1F] sm:text-5xl lg:text-6xl">
            একটি প্ল্যাটফর্ম, সম্পূর্ণ কৃষি জীবনচক্র
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-gray-600">
            প্ল্যান্টিক্স শুধু রোগ নির্ণয় করে। আরিওএস আপনাকে বলে আজ, এই সপ্তাহে
            এবং সম্পূর্ণ মৌসুমে কী করতে হবে।
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {platformFeatures.map((item) => (
            <div
              key={item.title}
              className="group rounded-[24px] border border-[#E8E2D8] bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
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

      <section
        className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6"
        id="assistant"
      >
        <div className="overflow-hidden rounded-[36px] bg-gradient-to-r from-[#041B0B] to-[#0B3417] p-8 text-white shadow-2xl sm:p-14">
          <div className="grid items-center gap-10 lg:grid-cols-2">
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
                পাতা, ফল, কান্ড অথবা মাটির ছবি আপলোড করুন। AI আপনার ফসলের সমস্যা
                শনাক্ত করে করণীয় জানাবে।
              </p>
              <button className="mt-8 rounded-full bg-white px-8 py-4 font-semibold text-black transition hover:scale-105">
                ছবি আপলোড করুন
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {aiCards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-[24px] bg-white/10 p-6 backdrop-blur"
                >
                  <div className="mb-3 text-4xl">{card.emoji}</div>
                  <h3 className="font-bold">{card.title}</h3>
                  <p className="mt-2 text-sm text-white/70">{card.subtitle}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 py-28 text-center">
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
            ফসল পরিকল্পনা, AI রোগ শনাক্তকরণ, রপ্তানি প্রস্তুতি এবং সম্পূর্ণ ERP
            একসাথে।
          </p>
          <button className="mt-10 rounded-full bg-green-700 px-10 py-5 text-white transition hover:bg-green-800">
            আজই কৃষকOS শুরু করুন
          </button>
        </div>
      </section>

      <section
        className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6"
        id="farm-model"
      >
        <div className="overflow-hidden rounded-[36px] bg-gradient-to-br from-[#1C6B30] to-[#145222] p-10 text-white shadow-2xl sm:p-14">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-5xl font-medium font-black leading-tight sm:text-6xl lg:text-6xl">
                ৭০:৩০ ফার্ম মডেল
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-white/75">
                রুট জোন মালচিং, ভিত্রি খাদ ও VM স্প্রে সমন্বিত একটি বৈজ্ঞানিক
                পদ্ধতি — অবশিষ্টাংশমুক্ত ও রপ্তানিযোগ্য ফলনের জন্য।
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {modelButtons.map((label) => (
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

      <section
        className="mx-auto max-w-[1280px] px-4 py-28 text-center"
        id="dream"
      >
        <div className="rounded-[40px] p-10 sm:p-16">
          <p className="mb-6 text-xs uppercase tracking-[4px] text-green-700">
            আমাদের স্বপ্ন
          </p>
          <h2 className="mx-auto max-w-5xl text-3xl font-medium leading-[1.3] text-[#1C2B1F] sm:text-5xl lg:text-6xl">
            "প্রযুক্তিনির্ভর, নিরাপদ, টেকসই
            <br />
            এবং রপ্তানযোগ্য কৃষির মাধ্যমে বাংলাদেশকে
            <br />
            বিশ্বমানের পর্যায়ে নিয়ে যাওয়া।"
          </h2>
        </div>
      </section>

      <footer className="border-t border-[#e4ddd0] bg-[#F7F4EE]">
        <div className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-700 font-bold text-white">
                  ক
                </div>
                <span className="text-xl font-bold">কৃষকOS</span>
              </div>
              <p className="mt-4 max-w-md text-sm text-gray-600">
                বাংলাদেশের কৃষকদের জন্য স্মার্ট ডিজিটাল ফার্ম ম্যানেজমেন্ট
                প্ল্যাটফর্ম।
              </p>
            </div>
            <div className="flex flex-wrap gap-8 text-sm">
              {footerLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="hover:text-green-700"
                >
                  {link.label}
                </a>
              ))}
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
