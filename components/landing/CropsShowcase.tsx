import Image from "next/image";
import type { Language } from "./Header";

interface CropItem {
  title: string;
  subtitle: string;
  image: string;
  tags: string[];
  color: string;
}

const crops: Record<Language, CropItem[]> = {
  bn: [
    {
      title: "কলা",
      subtitle: "Banana Cultivation ERP",
      image:
        "https://images.unsplash.com/photo-1603833665858-e61d17a86224?q=80&w=1000&auto=format&fit=crop",
      tags: ["Tissue Culture", "Export Ready", "Residue Free"],
      color: "bg-[#F5A623]",
    },
    {
      title: "পেঁপে",
      subtitle: "Papaya Farming ERP",
      image:
        "https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?q=80&w=1000&auto=format&fit=crop",
      tags: ["High Yield", "Disease Tracking", "Smart Irrigation"],
      color: "bg-[#1C7A2A]",
    },
  ],
  en: [
    {
      title: "Banana",
      subtitle: "Banana Cultivation ERP",
      image:
        "https://images.unsplash.com/photo-1603833665858-e61d17a86224?q=80&w=1000&auto=format&fit=crop",
      tags: ["Tissue Culture", "Export Ready", "Residue Free"],
      color: "bg-[#F5A623]",
    },
    {
      title: "Papaya",
      subtitle: "Papaya Farming ERP",
      image:
        "https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?q=80&w=1000&auto=format&fit=crop",
      tags: ["High Yield", "Disease Tracking", "Smart Irrigation"],
      color: "bg-[#1C7A2A]",
    },
  ],
};

export default function CropsShowcase({ language }: { language: Language }) {
  return (
    <section className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6">
      <div className="mb-12 text-center">
        <p className="mb-3 text-xs uppercase tracking-[4px] text-green-700 dark:text-green-500">
          {language === "en" ? "Popular Crops" : "জনপ্রিয় ফসল"}
        </p>
        <h2 className="text-3xl font-medium text-gray-900 dark:text-white sm:text-5xl">
          {language === "en" ? "Choose your crop" : "আপনার ফসল নির্বাচন করুন"}
        </h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {crops[language].map((crop) => (
          <div
            key={crop.title}
            className={`overflow-hidden rounded-[32px] p-8 text-white shadow-xl ${crop.color}`}
          >
            <div className="flex h-full flex-col justify-between">
              <div>
                <span className="rounded-full bg-white/20 px-3 py-1 text-xs">
                  {language === "en" ? "Fruit Crop" : "ফল ফসল"}
                </span>
                <h3 className="mt-5 text-4xl font-black">{crop.title}</h3>
                <p className="mt-2 text-white/80">{crop.subtitle}</p>
              </div>

              <div className="mt-10">
                <Image
                  src={crop.image}
                  alt={crop.title}
                  width={1000}
                  height={250}
                  className="h-[250px] w-full rounded-2xl object-cover"
                />
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {crop.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white/20 px-3 py-1 text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
