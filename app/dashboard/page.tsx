import { requireUser } from "@/lib/auth";
import { getFarmerByUserId, getFarmByFarmerId } from "@/lib/wizardDb";
import Link from "next/link";
import { redirect } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";

// ─── Icon components (inline SVG to avoid adding lucide-react dep) ───────────
const SproutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 0 1 3.4 6c.4 2.5-.3 4.5-1.5 5.7"/></svg>
);
const BeefIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12.5" cy="8.5" r="2.5"/><path d="M12.5 2a6.5 6.5 0 0 0-6.22 4.6c-1.1 3.13-.78 3.9-3.18 6.08A3 3 0 0 0 5 18c4 0 8.4-1.8 11.56-4.57A6.5 6.5 0 0 0 12.5 2Z"/><path d="m18.5 6 2.19 4.5a6.48 6.48 0 0 1 .31 2 6.49 6.49 0 0 1-2.6 5.2C15.4 19.8 11 22 7 22a3 3 0 0 1-2.68-1.66L2.4 16.5"/></svg>
);
const FishIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6s-7.56-2.53-8.5-6Z"/><path d="M18 12v.5"/><path d="M16 17.93a9.77 9.77 0 0 1 0-11.86"/><path d="M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 3.98-.23 7.23 1.95 8.05C5.9 14.1 7 13.16 7 12v-.33"/><path d="M10.46 7.26C10.2 5.88 9.17 4.24 8 3h5.8a2 2 0 0 1 1.98 1.67l.23 1.4"/><path d="m16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H8a9.58 9.58 0 0 0 2.46-3.26"/></svg>
);
const BotIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
);
const ScanIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><line x1="7" x2="17" y1="12" y2="12"/></svg>
);
const CloudSunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="M20 12h2"/><path d="m19.07 4.93-1.41 1.41"/><path d="M15.947 12.650a4 4 0 0 0-5.925-4.128"/><path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z"/></svg>
);
const BellIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
);
const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>
);
const LogOutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
);
const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);
const BookOpenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
);
const DollarSignIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
);
const GitBranchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="6" x2="6" y1="3" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg>
);
const ShieldCheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>
);
const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);
const BarChart3Icon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>
);
const LeafIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
);
const TrendingUpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
);
const AlertTriangleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
);
const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
);

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function DashboardPage() {
  const user = await requireUser();
  if (!user) redirect("/auth/signin");

  // Load user's actual farm details if they completed the setup wizard
  const farmer = await getFarmerByUserId(user.id);
  const farm = farmer ? await getFarmByFarmerId(farmer.id) : null;

  const userName = user.name || "Farmer";
  const userDistrict = farm?.district || "Bangladesh";

  const today = new Date().toLocaleDateString("en-BD", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Dynamic Advisory Tasks based on primary crop and farming method
  let advisoryTasks = [
    {
      time: "Morning",
      task: "Complete your farm profile setup to get daily advice.",
    },
    {
      time: "Afternoon",
      task: "Open 'Plant Management' ERP module below.",
    },
    {
      time: "Evening",
      task: "Provide your farm location, soil & crop profile.",
    },
  ];

  if (farm) {
    const crop = farm.primaryCrop.toLowerCase();
    const method = farm.farmingMethod || "organic";

    if (crop === "banana") {
      if (method === "residue_free") {
        advisoryTasks = [
          {
            time: "Morning",
            task: "Inspect leaf canopy for Sigatoka disease spots. Apply bio-agent if spotted.",
          },
          {
            time: "Afternoon",
            task: "Check soil moisture level. Calibrate drip irrigation system to 65% capacity.",
          },
          {
            time: "Evening",
            task: "Log today's organic inputs in the Export Traceability compliance ledger.",
          },
        ];
      } else if (method === "organic") {
        advisoryTasks = [
          {
            time: "Morning",
            task: "Inspect banana stem for weevil attacks. Use pheromone traps if active.",
          },
          {
            time: "Afternoon",
            task: "Apply organic mulch (banana leaves/rice straw) around the tree base.",
          },
          {
            time: "Evening",
            task: "Prepare vermicompost mixture for tomorrow's root zone application.",
          },
        ];
      } else { // chemical
        advisoryTasks = [
          {
            time: "Morning",
            task: "Apply potash and urea fertilizer mix as per Week 8 growth schedule.",
          },
          {
            time: "Afternoon",
            task: "Check chemical sprayers; calibrate nozzle for even distribution.",
          },
          {
            time: "Evening",
            task: "Verify pump flow rate and runtime for evening irrigation cycle.",
          },
        ];
      }
    } else if (crop === "papaya") {
      if (method === "residue_free") {
        advisoryTasks = [
          {
            time: "Morning",
            task: "Inspect under-leaves for whiteflies (virus vectors). Spray bio-soap.",
          },
          {
            time: "Afternoon",
            task: "Regulate drip irrigation to avoid waterlogging (sensitive root system).",
          },
          {
            time: "Evening",
            task: "Log biocontrol agent application in the compliance register.",
          },
        ];
      } else if (method === "organic") {
        advisoryTasks = [
          {
            time: "Morning",
            task: "Search for Papaya Ringspot Virus symptoms. Remove infected plants.",
          },
          {
            time: "Afternoon",
            task: "Feed root zone with 5kg vermicompost and cow dung per tree.",
          },
          {
            time: "Evening",
            task: "Apply organic neem cake around root base to prevent nematodes.",
          },
        ];
      } else { // chemical
        advisoryTasks = [
          {
            time: "Morning",
            task: "Apply standard NPK chemical fertilizer (100g per plant) and water.",
          },
          {
            time: "Afternoon",
            task: "Spray chemical fungicide if anthracnose spot is seen on fruits.",
          },
          {
            time: "Evening",
            task: "Verify sprinkler system covers all root basins.",
          },
        ];
      }
    }
  }

  const mainModules = [
    {
      id: "plant",
      title: "Plant Management",
      description:
        "Manage crop production end-to-end from land preparation to harvest",
      icon: <SproutIcon />,
      headerBg: "bg-green-600",
      badge: "Active",
      badgeClass: "bg-green-100 text-green-700",
      active: true,
      path: "/plant-management",
    },
    {
      id: "livestock",
      title: "Livestock Management",
      description:
        "Track animals, vaccination, feed management and health monitoring",
      icon: <BeefIcon />,
      headerBg: "bg-orange-500",
      badge: "Phase 3",
      badgeClass: "bg-orange-100 text-orange-700",
      active: false,
    },
    {
      id: "aquaculture",
      title: "Aquaculture Management",
      description:
        "Pond management, water quality monitoring and feed tracking",
      icon: <FishIcon />,
      headerBg: "bg-blue-500",
      badge: "Phase 3",
      badgeClass: "bg-blue-100 text-blue-700",
      active: false,
    },
  ];

  const aiTools = [
    {
      id: "ai-agronomist",
      title: "AI Agronomist",
      description: "Ask any farming question and get expert advice instantly",
      icon: <BotIcon />,
      gradientFrom: "#8B5CF6",
      gradientTo: "#7C3AED",
      tag: "AI Powered",
      tagClass: "text-purple-600 bg-purple-50",
      path: "/ai-agronomist",
    },
    {
      id: "disease-detection",
      title: "Disease Detection",
      description: "Upload a photo for instant AI-powered crop diagnosis",
      icon: <ScanIcon />,
      gradientFrom: "#F43F5E",
      gradientTo: "#DC2626",
      tag: "AI Vision",
      tagClass: "text-rose-600 bg-rose-50",
      path: "/disease-detection",
    },
    {
      id: "weather",
      title: "Weather Intelligence",
      description: "7-day forecast with agronomic recommendations for your farm",
      icon: <CloudSunIcon />,
      gradientFrom: "#0EA5E9",
      gradientTo: "#2563EB",
      tag: "Live Data",
      tagClass: "text-sky-600 bg-sky-50",
      path: "/weather",
    },
    {
      id: "alerts",
      title: "Disease Alert Network",
      description:
        "Community-powered pest and disease outbreak notifications",
      icon: <BotIcon />,
      gradientFrom: "#F59E0B",
      gradientTo: "#EA580C",
      tag: "Live Alerts",
      tagClass: "text-amber-600 bg-amber-50",
      path: "/alerts",
    },
  ];

  const platformFeatures = [
    {
      id: "knowledge-base",
      title: "Knowledge Base",
      description: "Disease, pest & nutrient library",
      icon: <BookOpenIcon />,
      iconColor: "text-indigo-600",
      iconBg: "bg-indigo-50",
      path: "/knowledge-base",
    },
    {
      id: "financial",
      title: "Financial Management",
      description: "Track expenses, income & ROI",
      icon: <DollarSignIcon />,
      iconColor: "text-emerald-600",
      iconBg: "bg-emerald-50",
      path: "/financial",
    },
    {
      id: "traceability",
      title: "Traceability",
      description: "Farm-to-market supply chain tracking",
      icon: <GitBranchIcon />,
      iconColor: "text-teal-600",
      iconBg: "bg-teal-50",
      path: "/traceability",
    },
    {
      id: "compliance",
      title: "Residue-Free Compliance",
      description: "Export readiness & safety checks",
      icon: <ShieldCheckIcon />,
      iconColor: "text-green-600",
      iconBg: "bg-green-50",
      path: "/compliance",
    },
    {
      id: "community",
      title: "Community",
      description: "Ask experts and share knowledge",
      icon: <UsersIcon />,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-50",
      path: "/community",
    },
    {
      id: "reports",
      title: "Reports & Analytics",
      description: "Farm performance & yield reports",
      icon: <BarChart3Icon />,
      iconColor: "text-purple-600",
      iconBg: "bg-purple-50",
      path: "/reports",
    },
  ];

  // Dynamically populate quickStats based on completed farm setup
  const activeFarms = farm ? "1" : "2";
  const totalArea = farm ? `${farm.areaSize} ${farm.areaUnit === "decimal" ? "Dec" : farm.areaUnit === "bigha" ? "Bigha" : "Katha"}` : "0 ac";
  
  let cropsGrowing = "2";
  if (farm) {
    const primary = farm.primaryCrop.charAt(0).toUpperCase() + farm.primaryCrop.slice(1);
    const count = farm.secondaryCrops?.length || 0;
    cropsGrowing = count > 0 ? `${primary} + ${count}` : primary;
  }
  
  const alertsCount = farm ? (farm.farmingMethod === "residue_free" ? "1" : "0") : "3";

  const quickStats = [
    {
      label: "Active Farms",
      value: activeFarms,
      icon: <LeafIcon />,
      iconColor: "text-green-600",
      iconBg: "bg-green-50",
    },
    {
      label: "Total Area",
      value: totalArea,
      icon: <TrendingUpIcon />,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-50",
    },
    {
      label: "Crops Growing",
      value: cropsGrowing,
      icon: <SproutIcon />,
      iconColor: "text-emerald-600",
      iconBg: "bg-emerald-50",
    },
    {
      label: "Alerts",
      value: alertsCount,
      icon: <AlertTriangleIcon />,
      iconColor: "text-amber-600",
      iconBg: "bg-amber-50",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-[#081009] dark:via-[#09150c] dark:to-[#0a1b11] text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* ── Header ── */}
      <header className="sticky top-0 z-50 border-b border-gray-200 dark:border-[#1d2f21] bg-white dark:bg-[#081009] shadow-sm transition-colors duration-300">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600 text-white">
              <SproutIcon />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">KrishokOS</h1>
              <p className="text-xs font-medium text-green-600 dark:text-green-500">
                Agriculture Operating System
              </p>
            </div>
          </div>

          {/* Nav actions */}
          <div className="flex items-center gap-2">
            <Link
              href="/alerts"
              className="relative rounded-lg p-2 transition hover:bg-gray-100 dark:hover:bg-[#121c15] text-gray-700 dark:text-gray-300"
            >
              <BellIcon />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
            </Link>
            <ThemeToggle />
            <Link
              href="/profile"
              className="flex items-center gap-2 rounded-lg px-3 py-2 transition hover:bg-gray-100 dark:hover:bg-[#121c15] text-gray-700 dark:text-gray-300"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-white">
                <UserIcon />
              </div>
              <span className="hidden text-sm text-gray-700 dark:text-gray-300 sm:block">
                {userName}
              </span>
            </Link>
            <Link
              href="/auth/signin"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-red-600 dark:text-red-400 transition hover:bg-red-50 dark:hover:bg-red-950/20"
            >
              <LogOutIcon />
              <span className="hidden text-sm sm:block">Logout</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-10 px-4 py-8 sm:px-6 lg:px-8">
        {/* ── Welcome + Stats + Advisory ── */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left: welcome + quick stats */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Welcome back, {userName}!
            </h2>
            <p className="mb-6 text-gray-500 dark:text-gray-400">
              {userDistrict} &bull; {today}
            </p>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {quickStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-gray-100 dark:border-[#1d2f21] bg-white dark:bg-[#121c15] p-4 shadow-sm"
                >
                  <div
                    className={`mb-3 flex h-9 w-9 items-center justify-center rounded-lg ${stat.iconBg} ${stat.iconColor} dark:bg-green-950/35 dark:text-green-400`}
                  >
                    {stat.icon}
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Today's Advisory */}
          <div className="rounded-2xl bg-gradient-to-br from-green-600 to-emerald-700 p-6 text-white">
            <div className="mb-4 flex items-center gap-2">
              <CalendarIcon />
              <span className="font-semibold">Today&apos;s Advisory</span>
            </div>
            <div className="space-y-3">
              {advisoryTasks.map((item) => (
                <div key={item.time} className="flex gap-3">
                  <span className="mt-0.5 w-16 shrink-0 text-xs text-green-200">
                    {item.time}
                  </span>
                  <p className="text-sm text-white/90">{item.task}</p>
                </div>
              ))}
            </div>
            <Link
              href="/ai-agronomist"
              className="mt-4 block w-full rounded-lg bg-white/20 py-2 text-center text-sm font-medium text-white transition hover:bg-white/30"
            >
              Ask AI Agronomist →
            </Link>
          </div>
        </div>
        {/* ── Personalized Farm Setup Alert / Analytics ── */}
        {!farm ? (
          <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 text-xl">⚠️</span>
                <div>
                  <h4 className="font-bold text-amber-900">Farm Setup Not Complete</h4>
                  <p className="text-sm text-amber-700 mt-1">
                    Please complete your 11-step farm profile setup to activate AI disease detection, compliance score trackers, soil analysis diagnostics, and daily advisory calendars.
                  </p>
                </div>
              </div>
              <Link
                href="/plant-management"
                className="inline-flex shrink-0 items-center justify-center rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold px-5 py-2.5 text-sm transition shadow-sm"
              >
                Set Up Your Farm →
              </Link>
            </div>
          </div>
        ) : (
          <section className="space-y-6">
            <div className="flex items-center gap-2 border-b border-gray-200 dark:border-[#1d2f21] pb-3">
              <span className="text-green-600 dark:text-green-500">
                <SproutIcon />
              </span>
              <h3 className="text-xl font-extrabold text-gray-900 dark:text-white">
                Personalized Farm Insights &amp; Analytics
              </h3>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Soil & Irrigation Diagnostics Card */}
              <div className="rounded-2xl border border-gray-100 dark:border-[#1d2f21] bg-white dark:bg-[#121c15] p-6 shadow-sm transition hover:shadow-md">
                <div className="mb-4 flex items-center justify-between">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-[#4B5A44] dark:text-[#a0b098]">
                    Soil &amp; Irrigation
                  </h4>
                  <span className="rounded-full bg-blue-50 dark:bg-blue-950/45 px-2.5 py-1 text-xs font-semibold text-blue-700 dark:text-blue-400">
                    Active Profile
                  </span>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <span className="text-xs text-gray-400 dark:text-gray-500 block font-medium">Soil Type</span>
                    <span className="font-bold text-gray-900 dark:text-white block capitalize">{farm.soilType} Soil</span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 dark:text-gray-500 block font-medium">Water Source</span>
                    <span className="font-bold text-gray-900 dark:text-white block capitalize">{farm.waterSource.replace(/_/g, " ")}</span>
                  </div>
                  <div className="mt-2 text-sm text-gray-600 dark:text-gray-400 border-t border-gray-100 dark:border-[#1d2f21] pt-3 leading-relaxed">
                    {farm.soilType.toLowerCase() === "loamy" && "Loamy soil is ideal for banana/papaya crops, providing excellent nutrient absorption and drainage."}
                    {farm.soilType.toLowerCase() === "clay" && "Clay soil is highly compact. Build raised beds to avoid root rot and monitor irrigation closely."}
                    {farm.soilType.toLowerCase() === "sandy" && "Sandy soil drains nutrients quickly. Supplement with organic compost and irrigate in short, frequent intervals."}
                    {farm.soilType.toLowerCase() === "silty" && "Silty soil holds moisture well but can crust. Aerate soil around crop root zones regularly."}
                  </div>
                  <div className="text-xs text-[#00963F] dark:text-[#00c853] font-semibold bg-green-50 dark:bg-green-950/20 p-2.5 rounded-lg border border-transparent dark:border-green-900/40">
                    {farm.waterSource.toLowerCase() === "groundwater" && "✓ Groundwater is optimal. Annual pH test recommended to target 6.5."}
                    {farm.waterSource.toLowerCase() === "surface_water" && "✓ Filter surface water before application to eliminate fungal spores."}
                    {farm.waterSource.toLowerCase() === "rainwater" && "✓ Perfect quality. Clean collection tanks to prevent bacterial buildup."}
                    {farm.waterSource.toLowerCase() === "municipal" && "✓ Check chlorine content weekly to avoid root damage."}
                  </div>
                </div>
              </div>

              {/* Cultivation Method Strategy Card */}
              <div className="rounded-2xl border border-gray-100 dark:border-[#1d2f21] bg-white dark:bg-[#121c15] p-6 shadow-sm transition hover:shadow-md">
                <div className="mb-4 flex items-center justify-between">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-[#4B5A44] dark:text-[#a0b098]">
                    Farming Strategy
                  </h4>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                    farm.farmingMethod === "residue_free"
                      ? "bg-emerald-100 dark:bg-emerald-950/45 text-emerald-800 dark:text-emerald-400"
                      : farm.farmingMethod === "organic"
                      ? "bg-purple-100 dark:bg-purple-950/45 text-purple-800 dark:text-purple-400"
                      : "bg-gray-100 dark:bg-[#1d2f21] text-gray-800 dark:text-gray-300"
                  }`}>
                    {farm.farmingMethod === "residue_free" && "Residue-Free"}
                    {farm.farmingMethod === "organic" && "Organic"}
                    {farm.farmingMethod === "chemical" && "Chemical"}
                  </span>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <span className="text-xs text-gray-400 dark:text-gray-500 block font-medium">Target Market</span>
                    <span className="font-bold text-gray-900 dark:text-white block">
                      {farm.farmingMethod === "residue_free" && "International Export Market"}
                      {farm.farmingMethod === "organic" && "Premium Organic Retailers"}
                      {farm.farmingMethod === "chemical" && "Traditional Local Markets"}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 dark:text-gray-500 block font-medium">Core Compliance</span>
                    <span className="font-bold text-gray-900 dark:text-white block">
                      {farm.farmingMethod === "residue_free" && "GlobalGAP Certification Readiness"}
                      {farm.farmingMethod === "organic" && "IFOAM Standard (Zero Synthetic Inputs)"}
                      {farm.farmingMethod === "chemical" && "NPK Optimization Program"}
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-gray-600 dark:text-gray-400 border-t border-gray-100 dark:border-[#1d2f21] pt-3 leading-relaxed">
                    {farm.farmingMethod === "residue_free" && "Priority: Zero pesticide trace. Rely on biological controls like Trichoderma viride and yellow sticky traps."}
                    {farm.farmingMethod === "organic" && "Priority: Soil life enhancement. Rely on compost, vermicompost, and organic liquid manure sprays."}
                    {farm.farmingMethod === "chemical" && "Priority: Cost containment. Optimize fertilizer application to prevent nutrient runoff and soil acidification."}
                  </div>
                </div>
              </div>

              {/* Financial ROI and Cost Target Card */}
              <div className="rounded-2xl border border-gray-100 dark:border-[#1d2f21] bg-white dark:bg-[#121c15] p-6 shadow-sm transition hover:shadow-md">
                <div className="mb-4 flex items-center justify-between">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-[#4B5A44] dark:text-[#a0b098]">
                    Financial Forecast
                  </h4>
                  <span className="rounded-full bg-amber-50 dark:bg-amber-950/45 px-2.5 py-1 text-xs font-semibold text-amber-700 dark:text-amber-400">
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
                    <div className="mt-1 h-2 w-full rounded-full bg-gray-100 dark:bg-[#1d2f21] overflow-hidden flex">
                      <div className="h-full bg-green-600" style={{ width: "75%" }} />
                      <div className="h-full bg-amber-500" style={{ width: "25%" }} />
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-100 dark:border-[#1d2f21] pt-3">
                    <span className="text-xs text-gray-400 dark:text-gray-500 block font-medium">Projected Yield (Est.)</span>
                    <span className="font-bold text-gray-900 dark:text-white block text-lg">
                      {/* Yield calculation: Banana ≈ 14 tons/acre, Papaya ≈ 22 tons/acre */}
                      {(() => {
                        let acres = 0;
                        if (farm.areaUnit === "decimal") acres = farm.areaSize / 100;
                        else if (farm.areaUnit === "bigha") acres = farm.areaSize / 3.03;
                        else if (farm.areaUnit === "katha") acres = farm.areaSize / 60.6;
                        else acres = farm.areaSize; // fallback

                        const yieldPerAcre = farm.primaryCrop.toLowerCase() === "banana" ? 14 : 22;
                        const totalYield = Math.round(acres * yieldPerAcre * 10) / 10;
                        return `${totalYield} Metric Tons`;
                      })()}
                    </span>
                  </div>

                  <div>
                    <span className="text-xs text-gray-400 dark:text-gray-500 block font-medium">Projected Revenue (Est.)</span>
                    <span className="font-bold text-[#00963F] dark:text-[#00c853] block text-xl">
                      {(() => {
                        let acres = 0;
                        if (farm.areaUnit === "decimal") acres = farm.areaSize / 100;
                        else if (farm.areaUnit === "bigha") acres = farm.areaSize / 3.03;
                        else if (farm.areaUnit === "katha") acres = farm.areaSize / 60.6;
                        else acres = farm.areaSize;

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
          </section>
        )}

        {/* ── ERP Modules ── */}
        <section>
          <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">ERP Modules</h3>
          <div className="grid gap-5 md:grid-cols-3">
            {mainModules.map((mod) => (
              <div
                key={mod.id}
                className={`overflow-hidden rounded-2xl border border-gray-100 dark:border-[#1d2f21] bg-white dark:bg-[#121c15] shadow-sm transition-all ${
                  mod.active
                    ? "cursor-pointer hover:-translate-y-0.5 hover:shadow-lg"
                    : "opacity-70"
                }`}
              >
                <Link href={mod.active ? mod.path! : "#"}>
                  <div className={`${mod.headerBg} p-5 text-white`}>
                    {mod.icon}
                  </div>
                  <div className="p-5">
                    <div className="mb-2 flex items-start justify-between">
                      <h4 className="font-bold text-gray-900 dark:text-white">{mod.title}</h4>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${mod.badgeClass}`}
                      >
                        {mod.badge}
                      </span>
                    </div>
                    <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                      {mod.description}
                    </p>
                    {mod.active ? (
                      <span className="flex items-center gap-1 text-sm font-medium text-green-600 dark:text-green-400">
                        Open Module <ArrowRightIcon />
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400 dark:text-gray-500">
                        Coming in Phase 3
                      </span>
                    )}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* ── AI & Smart Tools ── */}
        <section>
          <div className="mb-4 flex items-center gap-2">
            <span className="text-purple-600 dark:text-purple-400">
              <BotIcon />
            </span>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              AI &amp; Smart Tools
            </h3>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {aiTools.map((tool) => (
              <Link
                key={tool.id}
                href={tool.path}
                className="group overflow-hidden rounded-2xl border border-gray-100 dark:border-[#1d2f21] bg-white dark:bg-[#121c15] shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <div
                  className="p-5 text-white"
                  style={{
                    background: `linear-gradient(135deg, ${tool.gradientFrom}, ${tool.gradientTo})`,
                  }}
                >
                  {tool.icon}
                </div>
                <div className="p-4">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${tool.tagClass} dark:bg-purple-950/45 dark:text-purple-400`}
                  >
                    {tool.tag}
                  </span>
                  <h4 className="mb-1 mt-2 font-bold text-gray-900 dark:text-white">
                    {tool.title}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{tool.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Platform Features ── */}
        <section>
          <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
            Platform Features
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {platformFeatures.map((feat) => (
              <Link
                key={feat.id}
                href={feat.path}
                className="flex cursor-pointer items-start gap-4 rounded-xl border border-gray-100 dark:border-[#1d2f21] bg-white dark:bg-[#121c15] p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${feat.iconBg} ${feat.iconColor} dark:bg-[#1b2b1e] dark:text-[#00c853]`}
                >
                  {feat.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white">{feat.title}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{feat.description}</p>
                </div>
                <span className="mt-1 shrink-0 text-gray-300 dark:text-gray-500">
                  <ArrowRightIcon />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Footer ── */}
        <div className="border-t border-gray-100 dark:border-[#1d2f21] py-4 text-center text-sm text-gray-400 dark:text-gray-500 font-medium">
          KrishokOS v2.0 — Agriculture Operating System for Residue-Free Export
          Production
        </div>
      </main>
    </div>
  );
}