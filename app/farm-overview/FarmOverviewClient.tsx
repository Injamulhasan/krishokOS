"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  TrendingUp,
  Calendar,
  DollarSign,
  Droplet,
  Leaf,
  Check,
  Clock,
  AlertCircle,
  ChevronRight,
  ShieldCheck,
  Sprout,
  Settings,
  Trash2,
  X,
} from "lucide-react";

interface FarmData {
  id: string;
  farmName: string;
  primaryCrop: string;
  farmingMethod: string;
  district: string;
  areaSize: number;
  areaUnit: string;
  soilType: string;
  waterSource: string;
  annualBudget: number;
  budgetCurrency: string;
}

interface FarmOverviewClientProps {
  farmerName: string;
  farm: FarmData;
}

const cropCalendar: Record<
  string,
  { week: string; tasks: string[]; category: string }[]
> = {
  banana: [
    {
      week: "Week 1-2",
      tasks: [
        "Land clearing and deep plowing",
        "Soil testing — pH and nutrients",
        "Apply lime if pH < 6.0",
        "Mark planting rows",
      ],
      category: "preparation",
    },
    {
      week: "Week 3-4",
      tasks: [
        "Plant tissue culture seedlings",
        "Apply basal dose: DAP 100g + Urea 50g per hole",
        "Install drip irrigation",
        "Mulch with dry grass",
      ],
      category: "planting",
    },
    {
      week: "Week 5-6",
      tasks: [
        "First irrigation: 15L/plant/day",
        "Monitor for aphids under leaf sheaths",
        "Apply neem oil spray if aphids found",
        "Weed control around plants",
      ],
      category: "maintenance",
    },
    {
      week: "Week 7-8",
      tasks: [
        "Top dress: Urea 75g per plant",
        "Inspect for Black Sigatoka (leaf spots)",
        "Defoliate oldest leaves if infected",
        "Check soil moisture level",
      ],
      category: "maintenance",
    },
    {
      week: "Week 9-12",
      tasks: [
        "Apply MoP 100g per plant",
        "Monitor for fruit fly with pheromone traps",
        "Bag bunches with perforated polythene",
        "Record bunch emergence dates",
      ],
      category: "fruiting",
    },
    {
      week: "Week 13-16",
      tasks: [
        "Apply foliar potassium (KH₂PO₄)",
        "Maintain soil moisture during bunch filling",
        "Check for Panama disease symptoms",
        "Document all inputs for traceability",
      ],
      category: "fruiting",
    },
    {
      week: "Week 17-20",
      tasks: [
        "Pre-harvest quality inspection",
        "Send sample to lab for residue test",
        "Ensure 21-day pre-harvest interval",
        "Arrange transport and cold chain",
      ],
      category: "harvest",
    },
    {
      week: "Week 21+",
      tasks: [
        "Harvest when fingers are 3/4 full",
        "Grade and sort for export",
        "Record yield data in KrishokOS",
        "Prepare compliance documentation",
      ],
      category: "harvest",
    },
  ],
  papaya: [
    {
      week: "Week 1-2",
      tasks: [
        "Prepare raised beds (30cm height)",
        "Soil testing and pH correction",
        "Install drip irrigation lines",
        "Add organic matter 20 kg/bed",
      ],
      category: "preparation",
    },
    {
      week: "Week 3-4",
      tasks: [
        "Transplant 60-day-old seedlings",
        "Apply DAP 50g per plant hole",
        "Stake young plants against wind",
        "Mulch with paddy straw",
      ],
      category: "planting",
    },
    {
      week: "Week 5-8",
      tasks: [
        "Regular irrigation: 10L/plant/day",
        "Monitor for PRSV aphid vectors",
        "Apply reflective mulch",
        "Weed control — manual",
      ],
      category: "maintenance",
    },
    {
      week: "Week 9-12",
      tasks: [
        "Remove male plants (keep 1 per 5 females)",
        "Apply Urea 50g + MoP 50g per plant",
        "Inspect for ring spot virus symptoms",
        "Pest monitoring with sticky traps",
      ],
      category: "maintenance",
    },
    {
      week: "Week 13-20",
      tasks: [
        "Bag developing fruits against insects",
        "Apply micronutrients: Boron + Zinc",
        "Maintain soil moisture for fruit fill",
        "Document all spray records",
      ],
      category: "fruiting",
    },
    {
      week: "Week 21-30",
      tasks: [
        "Pre-harvest quality checks",
        "Residue testing",
        "Harvest at 20-25% color change for export",
        "Pack immediately in cartons with cushioning",
      ],
      category: "harvest",
    },
  ],
};

const categoryStyles: Record<
  string,
  { color: string; bg: string; border: string; darkBg: string; darkColor: string; darkBorder: string }
> = {
  preparation: {
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
    darkBg: "dark:bg-amber-950/30",
    darkColor: "dark:text-amber-400",
    darkBorder: "dark:border-amber-900/40",
  },
  planting: {
    color: "text-green-600",
    bg: "bg-green-50",
    border: "border-green-200",
    darkBg: "dark:bg-emerald-950/30",
    darkColor: "dark:text-emerald-400",
    darkBorder: "dark:border-emerald-900/40",
  },
  maintenance: {
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
    darkBg: "dark:bg-blue-950/30",
    darkColor: "dark:text-blue-400",
    darkBorder: "dark:border-blue-900/40",
  },
  fruiting: {
    color: "text-purple-600",
    bg: "bg-purple-50",
    border: "border-purple-200",
    darkBg: "dark:bg-purple-950/30",
    darkColor: "dark:text-purple-400",
    darkBorder: "dark:border-purple-900/40",
  },
  harvest: {
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    darkBg: "dark:bg-emerald-950/30",
    darkColor: "dark:text-emerald-400",
    darkBorder: "dark:border-emerald-900/40",
  },
};

const allStages = [
  {
    id: "land-preparation",
    title: "Land Preparation",
    description: "Land clearing, soil preparation, bed preparation",
  },
  {
    id: "planting",
    title: "Planting",
    description: "Seedling selection, planting method, spacing",
  },
  {
    id: "crop-growth",
    title: "Crop Growth Management",
    description: "Irrigation, fertilization, weed control",
  },
  {
    id: "plant-health",
    title: "Plant Health Monitoring",
    description: "Disease detection, pest identification",
  },
  {
    id: "fruit-development",
    title: "Fruit Development",
    description: "Nutrient management, fruit protection",
  },
  {
    id: "pre-harvest",
    title: "Pre-Harvest Care",
    description: "Harvest readiness, quality checks",
  },
  {
    id: "harvesting",
    title: "Harvesting",
    description: "Harvest timing, techniques, yield recording",
  },
  {
    id: "post-harvest",
    title: "Post-Harvest Management",
    description: "Sorting, packaging, storage, transportation",
  },
];

export default function FarmOverviewClient({
  farmerName,
  farm,
}: FarmOverviewClientProps) {
  const router = useRouter();
  const [activeCalendarWeek, setActiveCalendarWeek] = useState<number | null>(
    null
  );

  // Load completed stages from localStorage with crop-specific suffix
  const [completedStages, setCompletedStages] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`krishokos-completed-stages-${farm.primaryCrop.toLowerCase()}`);
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // Sync checklist completed stages if the crop changes dynamically
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`krishokos-completed-stages-${farm.primaryCrop.toLowerCase()}`);
      setCompletedStages(saved ? JSON.parse(saved) : []);
    }
  }, [farm.primaryCrop]);

  // Edit/Delete Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    farmName: farm.farmName,
    areaSize: farm.areaSize,
    areaUnit: farm.areaUnit,
    farmingMethod: farm.farmingMethod,
    soilType: farm.soilType,
    waterSource: farm.waterSource,
    annualBudget: farm.annualBudget,
  });
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);

  const handleOpenModal = () => {
    setEditForm({
      farmName: farm.farmName,
      areaSize: farm.areaSize,
      areaUnit: farm.areaUnit,
      farmingMethod: farm.farmingMethod,
      soilType: farm.soilType,
      waterSource: farm.waterSource,
      annualBudget: farm.annualBudget,
    });
    setModalError(null);
    setIsModalOpen(true);
  };

  const handleUpdateFarm = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setModalError(null);
    try {
      const res = await fetch(`/api/farm/${farm.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      if (!res.ok) {
        throw new Error("Failed to update field details");
      }
      setIsModalOpen(false);
      router.refresh();
    } catch (err) {
      setModalError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteFarm = async () => {
    if (!confirm(`Are you sure you want to delete your ${farm.primaryCrop.charAt(0).toUpperCase() + farm.primaryCrop.slice(1)} field? This will delete all records related to this field.`)) {
      return;
    }
    setDeleting(true);
    setModalError(null);
    try {
      const res = await fetch(`/api/farm/${farm.id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete farm");
      }
      // Clear localStorage completed stages for this crop
      localStorage.removeItem(`krishokos-completed-stages-${farm.primaryCrop.toLowerCase()}`);
      
      // Also clear individual stage progress keys
      allStages.forEach(s => {
        localStorage.removeItem(`krishokos-stage-${s.id}-${farm.primaryCrop.toLowerCase()}`);
      });
      
      setIsModalOpen(false);
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setModalError(err instanceof Error ? err.message : "An error occurred");
      setDeleting(false);
    }
  };

  const cropName =
    farm.primaryCrop.toLowerCase() === "banana" ? "Banana" : farm.primaryCrop.toLowerCase() === "papaya" ? "Papaya" : farm.primaryCrop.charAt(0).toUpperCase() + farm.primaryCrop.slice(1);
  const methodName =
    farm.farmingMethod === "residue_free"
      ? "Residue-Free"
      : farm.farmingMethod === "organic"
        ? "Organic"
        : "Chemical";
  const calendar =
    cropCalendar[farm.primaryCrop.toLowerCase()] || cropCalendar.banana;

  const getStageStatus = (index: number) => {
    const stageId = allStages[index].id;
    if (completedStages.includes(stageId)) return "completed";
    // First uncompleted stage is pending
    const firstUncompletedIndex = allStages.findIndex(
      (s) => !completedStages.includes(s.id)
    );
    if (index === firstUncompletedIndex) return "pending";
    return "locked";
  };

  // Convert area to acres for calculations
  let acres = 0;
  if (farm.areaUnit === "decimal") acres = farm.areaSize / 100;
  else if (farm.areaUnit === "bigha") acres = farm.areaSize / 3.03;
  else if (farm.areaUnit === "katha") acres = farm.areaSize / 60.6;
  else acres = farm.areaSize;

  const areaDisplay = `${farm.areaSize} ${farm.areaUnit === "decimal" ? "Dec" : farm.areaUnit === "bigha" ? "Bigha" : farm.areaUnit === "katha" ? "Katha" : "acres"}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-[#081009] dark:via-[#0c1a0e] dark:to-[#081009] transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-[#121c15] shadow-sm border-b border-gray-200 dark:border-emerald-900/40 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/dashboard")}
              className="p-2 hover:bg-gray-100 dark:hover:bg-emerald-900/30 rounded-lg transition cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                {farmerName}&apos;s {cropName} Field Overview
                <button
                  onClick={handleOpenModal}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-emerald-900/30 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-emerald-400 rounded-lg transition cursor-pointer"
                  title="Field Settings"
                >
                  <Settings className="w-5 h-5" />
                </button>
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {farm.district} • {areaDisplay} • {methodName} Farming
              </p>
            </div>
            <div className="hidden sm:flex gap-2">
              <button className="flex items-center gap-1.5 text-sm bg-green-50 dark:bg-emerald-950/40 text-green-700 dark:text-emerald-400 border border-green-200 dark:border-emerald-900/40 px-3 py-1.5 rounded-lg hover:bg-green-100 dark:hover:bg-emerald-900/30 transition cursor-pointer">
                <ShieldCheck className="w-4 h-4" />
                Compliance
              </button>
              <button className="flex items-center gap-1.5 text-sm bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-900/40 px-3 py-1.5 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition cursor-pointer">
                <Leaf className="w-4 h-4" />
                Traceability
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Farm Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {[
            {
              icon: TrendingUp,
              bg: "bg-green-100 dark:bg-emerald-950/40",
              color: "text-green-600 dark:text-emerald-400",
              label: "Expected Yield",
              value: `${Math.round(acres * (farm.primaryCrop.toLowerCase() === "banana" ? 14 : 22))} tons/acre`,
            },
            {
              icon: Droplet,
              bg: "bg-blue-100 dark:bg-blue-950/40",
              color: "text-blue-600 dark:text-blue-400",
              label: "Irrigation",
              value: farm.waterSource.replace(/_/g, " "),
            },
            {
              icon: DollarSign,
              bg: "bg-amber-100 dark:bg-amber-950/40",
              color: "text-amber-600 dark:text-amber-400",
              label: "Budget",
              value: `৳${farm.annualBudget ? (farm.annualBudget / 1000).toFixed(0) + "K" : "100K"}`,
            },
            {
              icon: Leaf,
              bg: "bg-purple-100 dark:bg-purple-950/40",
              color: "text-purple-600 dark:text-purple-400",
              label: "Soil pH",
              value: "6.5",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white dark:bg-[#121c15] rounded-xl shadow-sm dark:shadow-none border border-transparent dark:border-emerald-900/40 p-4 sm:p-6 transition-colors duration-300"
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className={`w-10 h-10 ${stat.bg} rounded-lg flex items-center justify-center`}
                >
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </p>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white capitalize">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* AI Production Plan */}
        <div className="bg-white dark:bg-[#121c15] rounded-xl shadow-lg dark:shadow-none border border-transparent dark:border-emerald-900/40 p-6 transition-colors duration-300">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            AI-Generated Production Plan
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                label: "Recommended Variety",
                value:
                  cropName === "Banana" ? "Grand Naine (G9)" : "Red Lady",
              },
              {
                label: "Planting Density",
                value:
                  cropName === "Banana"
                    ? "1,600 plants/acre"
                    : "500 plants/acre",
              },
              {
                label: "Estimated Cost",
                value: `৳${cropName === "Banana" ? "85,000" : "65,000"}/acre`,
              },
              {
                label: "Revenue Projection",
                value: `৳${cropName === "Banana" ? "2,40,000" : "1,80,000"}/acre`,
                highlight: true,
              },
              {
                label: "Expected Profit",
                value: `৳${cropName === "Banana" ? "1,55,000" : "1,15,000"}/acre`,
                highlight: true,
              },
              {
                label: "Harvest Time",
                value:
                  cropName === "Banana" ? "12-14 months" : "8-10 months",
              },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  {item.label}
                </p>
                <p
                  className={`font-semibold ${item.highlight ? "text-green-600 dark:text-emerald-400" : "text-gray-900 dark:text-white"}`}
                >
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Personalized Farm Insights & Analytics */}
        <div className="bg-white dark:bg-[#121c15] rounded-xl shadow-lg dark:shadow-none border border-transparent dark:border-emerald-900/40 p-6 transition-colors duration-300">
          <div className="flex items-center gap-2 mb-6">
            <Sprout className="w-5 h-5 text-green-600 dark:text-emerald-400" />
            <h2 className="text-xl font-extrabold text-gray-900 dark:text-white">
              Personalized {cropName} Insights &amp; Analytics
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Soil & Irrigation Diagnostics Card */}
            <div className="rounded-2xl border border-gray-100 dark:border-emerald-900/40 bg-gray-50 dark:bg-[#0c1a0e] p-6 transition-all duration-300 hover:shadow-md">
              <div className="mb-4 flex items-center justify-between">
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#4B5A44] dark:text-emerald-400">
                  Soil &amp; Irrigation
                </h4>
                <span className="rounded-full bg-blue-50 dark:bg-blue-950/40 px-2.5 py-1 text-xs font-bold text-blue-700 dark:text-blue-400">
                  Active Profile
                </span>
              </div>
              <div className="space-y-4">
                <div>
                  <span className="text-xs text-gray-400 dark:text-gray-500 block font-medium">Soil Type</span>
                  <span className="font-bold text-gray-900 dark:text-[#e2ede4] block capitalize">{farm.soilType} Soil</span>
                </div>
                <div>
                  <span className="text-xs text-gray-400 dark:text-gray-500 block font-medium">Water Source</span>
                  <span className="font-bold text-gray-900 dark:text-[#e2ede4] block capitalize">{farm.waterSource.replace(/_/g, " ")}</span>
                </div>
                <div className="mt-2 text-sm text-gray-600 dark:text-gray-400 border-t border-gray-100 dark:border-emerald-900/10 pt-3 leading-relaxed">
                  {farm.soilType.toLowerCase() === "loamy" && "Loamy soil is ideal for banana/papaya crops, providing excellent nutrient absorption and drainage."}
                  {farm.soilType.toLowerCase() === "clay" && "Clay soil is highly compact. Build raised beds to avoid root rot and monitor irrigation closely."}
                  {farm.soilType.toLowerCase() === "sandy" && "Sandy soil drains nutrients quickly. Supplement with organic compost and irrigate in short, frequent intervals."}
                  {farm.soilType.toLowerCase() === "silty" && "Silty soil holds moisture well but can crust. Aerate soil around crop root zones regularly."}
                </div>
                <div className="text-xs text-[#00963F] dark:text-emerald-400 font-semibold bg-green-50 dark:bg-emerald-950/20 p-2.5 rounded-lg border dark:border-emerald-900/10">
                  {farm.waterSource.toLowerCase() === "groundwater" && "✓ Groundwater is optimal. Annual pH test recommended to target 6.5."}
                  {farm.waterSource.toLowerCase() === "surface_water" && "✓ Filter surface water before application to eliminate fungal spores."}
                  {farm.waterSource.toLowerCase() === "rainwater" && "✓ Perfect quality. Clean collection tanks to prevent bacterial buildup."}
                  {farm.waterSource.toLowerCase() === "municipal" && "✓ Check chlorine content weekly to avoid root damage."}
                </div>
              </div>
            </div>

            {/* Cultivation Method Strategy Card */}
            <div className="rounded-2xl border border-gray-100 dark:border-emerald-900/40 bg-gray-50 dark:bg-[#0c1a0e] p-6 transition-all duration-300 hover:shadow-md">
              <div className="mb-4 flex items-center justify-between">
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#4B5A44] dark:text-emerald-400">
                  Farming Strategy
                </h4>
                <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                  farm.farmingMethod === "residue_free"
                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400"
                    : farm.farmingMethod === "organic"
                      ? "bg-purple-100 text-purple-800 dark:bg-purple-950/40 dark:text-purple-400"
                      : "bg-gray-100 text-gray-800 dark:bg-[#081009] dark:text-gray-400"
                }`}>
                  {farm.farmingMethod === "residue_free" && "Residue-Free"}
                  {farm.farmingMethod === "organic" && "Organic"}
                  {farm.farmingMethod === "chemical" && "Chemical"}
                </span>
              </div>
              <div className="space-y-4">
                <div>
                  <span className="text-xs text-gray-400 dark:text-gray-500 block font-medium">Target Market</span>
                  <span className="font-bold text-gray-900 dark:text-[#e2ede4] block">
                    {farm.farmingMethod === "residue_free" && "International Export Market"}
                    {farm.farmingMethod === "organic" && "Premium Organic Retailers"}
                    {farm.farmingMethod === "chemical" && "Traditional Local Markets"}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-gray-400 dark:text-gray-500 block font-medium">Core Compliance</span>
                  <span className="font-bold text-gray-900 dark:text-[#e2ede4] block">
                    {farm.farmingMethod === "residue_free" && "GlobalGAP Certification Readiness"}
                    {farm.farmingMethod === "organic" && "IFOAM Standard (Zero Synthetic Inputs)"}
                    {farm.farmingMethod === "chemical" && "NPK Optimization Program"}
                  </span>
                </div>
                <div className="mt-2 text-sm text-gray-600 dark:text-gray-400 border-t border-gray-100 dark:border-emerald-900/10 pt-3 leading-relaxed">
                  {farm.farmingMethod === "residue_free" && "Priority: Zero pesticide trace. Rely on biological controls like Trichoderma viride and yellow sticky traps."}
                  {farm.farmingMethod === "organic" && "Priority: Soil life enhancement. Rely on compost, vermicompost, and organic liquid manure sprays."}
                  {farm.farmingMethod === "chemical" && "Priority: Cost containment. Optimize fertilizer application to prevent nutrient runoff and soil acidification."}
                </div>
              </div>
            </div>

            {/* Financial ROI and Cost Target Card */}
            <div className="rounded-2xl border border-gray-100 dark:border-emerald-900/40 bg-gray-50 dark:bg-[#0c1a0e] p-6 transition-all duration-300 hover:shadow-md">
              <div className="mb-4 flex items-center justify-between">
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#4B5A44] dark:text-emerald-400">
                  Financial Forecast
                </h4>
                <span className="rounded-full bg-amber-50 dark:bg-amber-950/30 px-2.5 py-1 text-xs font-bold text-amber-700 dark:text-amber-400">
                  75/25 Model
                </span>
              </div>
              <div className="space-y-3">
                <div>
                  <span className="text-xs text-gray-400 dark:text-gray-500 block font-medium">Annual Budget Allocation</span>
                  <div className="mt-1 flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                    <span>Inputs (75%): {Math.round(farm.annualBudget * 0.75).toLocaleString()} {farm.budgetCurrency}</span>
                    <span>Reserve (25%): {Math.round(farm.annualBudget * 0.25).toLocaleString()} {farm.budgetCurrency}</span>
                  </div>
                  <div className="mt-1 h-2 w-full rounded-full bg-gray-100 dark:bg-[#081009] overflow-hidden flex">
                    <div className="h-full bg-green-600" style={{ width: "75%" }} />
                    <div className="h-full bg-amber-500" style={{ width: "25%" }} />
                  </div>
                </div>
                <div className="border-t border-gray-100 dark:border-emerald-900/10 pt-3">
                  <span className="text-xs text-gray-400 dark:text-gray-500 block font-medium">Projected Yield (Est.)</span>
                  <span className="font-bold text-gray-900 dark:text-[#e2ede4] block text-lg">
                    {(() => {
                      const yieldPerAcre = farm.primaryCrop.toLowerCase() === "banana" ? 14 : 22;
                      const totalYield = Math.round(acres * yieldPerAcre * 10) / 10;
                      return `${totalYield} Metric Tons`;
                    })()}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-gray-400 dark:text-gray-500 block font-medium">Projected Revenue (Est.)</span>
                  <span className="font-bold text-[#00963F] dark:text-emerald-400 block text-xl">
                    {(() => {
                      const pricePerKg = farm.primaryCrop.toLowerCase() === "banana" ? 15 : 20;
                      const yieldPerAcre = farm.primaryCrop.toLowerCase() === "banana" ? 14 : 22;
                      const totalKg = acres * yieldPerAcre * 1000;
                      const revenue = Math.round(totalKg * pricePerKg);
                      return `${revenue.toLocaleString()} ${farm.budgetCurrency}`;
                    })()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Crop Calendar */}
        <div className="bg-white dark:bg-[#121c15] rounded-xl shadow-lg dark:shadow-none border border-transparent dark:border-emerald-900/40 p-6 transition-colors duration-300">
          <div className="flex items-center gap-2 mb-5">
            <Calendar className="w-5 h-5 text-green-600 dark:text-emerald-400" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Crop Calendar & Advisory
            </h2>
            <span className="text-xs bg-green-100 dark:bg-emerald-950/40 text-green-700 dark:text-emerald-400 px-2 py-0.5 rounded-full ml-auto">
              Auto-generated for {cropName}
            </span>
          </div>

          <div className="space-y-3">
            {calendar.map((week, index) => {
              const style =
                categoryStyles[
                  week.category as keyof typeof categoryStyles
                ];
              const isOpen = activeCalendarWeek === index;
              return (
                <div
                  key={index}
                  className={`border rounded-xl overflow-hidden transition-colors duration-300 ${isOpen ? `${style.border} ${style.darkBorder}` : "border-gray-200 dark:border-emerald-900/40"}`}
                >
                  <button
                    onClick={() =>
                      setActiveCalendarWeek(isOpen ? null : index)
                    }
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-emerald-900/20 transition cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 ${style.bg} ${style.darkBg} rounded-lg flex items-center justify-center`}
                      >
                        <Clock
                          className={`w-4 h-4 ${style.color} ${style.darkColor}`}
                        />
                      </div>
                      <div>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {week.week}
                        </span>
                        <span
                          className={`ml-2 text-xs px-2 py-0.5 rounded-full ${style.bg} ${style.darkBg} ${style.color} ${style.darkColor} font-medium capitalize`}
                        >
                          {week.category}
                        </span>
                      </div>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 text-gray-400 dark:text-gray-500 transition-transform ${isOpen ? "rotate-90" : ""}`}
                    />
                  </button>
                  {isOpen && (
                    <div
                      className={`px-4 pb-4 ${style.bg} ${style.darkBg}`}
                    >
                      <ul className="space-y-2">
                        {week.tasks.map((task, ti) => (
                          <li
                            key={ti}
                            className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
                          >
                            <AlertCircle
                              className={`w-4 h-4 ${style.color} ${style.darkColor} shrink-0 mt-0.5`}
                            />
                            {task}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 8-Stage Farming Workflow */}
        <div className="bg-white dark:bg-[#121c15] rounded-xl shadow-lg dark:shadow-none border border-transparent dark:border-emerald-900/40 p-6 transition-colors duration-300">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            8-Stage Farming Workflow
          </h2>
          <div className="space-y-4">
            {allStages.map((stage, index) => {
              const status = getStageStatus(index);
              return (
                <div
                  key={stage.id}
                  onClick={() =>
                    status !== "locked" &&
                    router.push(`/farm-overview/stage/${stage.id}?crop=${farm.primaryCrop.toLowerCase()}`)
                  }
                  className={`border-2 rounded-xl p-5 transition ${
                    status === "completed"
                      ? "border-green-500 dark:border-emerald-500 bg-green-50 dark:bg-emerald-950/20 cursor-pointer"
                      : status === "pending"
                        ? "border-green-500 dark:border-emerald-500 bg-white dark:bg-[#0c1a0e] hover:shadow-md cursor-pointer"
                        : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#081009] opacity-60"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                          status === "completed" || status === "pending"
                            ? "bg-green-600 dark:bg-emerald-600 text-white"
                            : "bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-400"
                        }`}
                      >
                        {status === "completed" ? (
                          <Check className="w-5 h-5" />
                        ) : (
                          index + 1
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                          {stage.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {stage.description}
                        </p>
                        {status === "pending" && (
                          <p className="text-sm text-green-600 dark:text-emerald-400 font-medium mt-2">
                            Click to start →
                          </p>
                        )}
                      </div>
                    </div>
                    {status === "locked" && (
                      <div className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-xs font-medium">
                        Locked
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Edit/Delete Settings Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-[#121c15] border border-gray-200 dark:border-emerald-950 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden transition-all duration-300 transform scale-100">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-emerald-900/20 bg-green-50/50 dark:bg-emerald-950/20">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white flex items-center gap-2">
                <Settings className="w-5 h-5 text-green-600 dark:text-emerald-400" /> Field Settings
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 hover:bg-gray-200 dark:hover:bg-emerald-900/30 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-xl transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleUpdateFarm} className="p-6 space-y-4">
              {modalError && (
                <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-xl text-red-600 dark:text-red-400 text-sm">
                  {modalError}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1.5">
                    Field Name
                  </label>
                  <input
                    type="text"
                    required
                    value={editForm.farmName}
                    onChange={(e) => setEditForm({ ...editForm, farmName: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 dark:border-emerald-900/40 bg-white dark:bg-[#0c1a0e] px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1.5">
                    Area Size
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={editForm.areaSize}
                    onChange={(e) => setEditForm({ ...editForm, areaSize: Number(e.target.value) })}
                    className="w-full rounded-xl border border-gray-200 dark:border-emerald-900/40 bg-white dark:bg-[#0c1a0e] px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1.5">
                    Area Unit
                  </label>
                  <select
                    value={editForm.areaUnit}
                    onChange={(e) => setEditForm({ ...editForm, areaUnit: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 dark:border-emerald-900/40 bg-white dark:bg-[#0c1a0e] px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                  >
                    <option value="bigha">Bigha</option>
                    <option value="katha">Katha</option>
                    <option value="decimal">Decimal</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1.5">
                    Farming Method
                  </label>
                  <select
                    value={editForm.farmingMethod}
                    onChange={(e) => setEditForm({ ...editForm, farmingMethod: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 dark:border-emerald-900/40 bg-white dark:bg-[#0c1a0e] px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                  >
                    <option value="residue_free">Residue-Free</option>
                    <option value="organic">Organic</option>
                    <option value="chemical">Chemical</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1.5">
                    Soil Type
                  </label>
                  <select
                    value={editForm.soilType}
                    onChange={(e) => setEditForm({ ...editForm, soilType: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 dark:border-emerald-900/40 bg-white dark:bg-[#0c1a0e] px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                  >
                    <option value="loamy">Loamy</option>
                    <option value="clay">Clay</option>
                    <option value="sandy">Sandy</option>
                    <option value="silty">Silty</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1.5">
                    Water Source
                  </label>
                  <select
                    value={editForm.waterSource}
                    onChange={(e) => setEditForm({ ...editForm, waterSource: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 dark:border-emerald-900/40 bg-white dark:bg-[#0c1a0e] px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                  >
                    <option value="groundwater">Groundwater</option>
                    <option value="surface_water">Surface Water</option>
                    <option value="rainwater">Rainwater</option>
                    <option value="municipal">Municipal</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1.5">
                    Annual Budget (BDT)
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={editForm.annualBudget}
                    onChange={(e) => setEditForm({ ...editForm, annualBudget: Number(e.target.value) })}
                    className="w-full rounded-xl border border-gray-200 dark:border-emerald-900/40 bg-white dark:bg-[#0c1a0e] px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-between border-t border-gray-100 dark:border-emerald-900/20 pt-5 mt-6">
                <button
                  type="button"
                  onClick={handleDeleteFarm}
                  disabled={deleting || submitting}
                  className="flex items-center gap-1.5 bg-red-50 hover:bg-red-100 dark:bg-red-950/20 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 font-semibold px-4 py-2.5 rounded-xl text-sm transition cursor-pointer disabled:opacity-50"
                >
                  <Trash2 className="w-4 h-4" /> Delete Field
                </button>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    disabled={deleting || submitting}
                    className="bg-gray-100 dark:bg-emerald-950/40 hover:bg-gray-200 dark:hover:bg-emerald-900/30 text-gray-700 dark:text-gray-300 font-semibold px-4 py-2.5 rounded-xl text-sm transition cursor-pointer disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={deleting || submitting}
                    className="bg-green-600 hover:bg-green-700 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition cursor-pointer disabled:opacity-50"
                  >
                    {submitting ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
