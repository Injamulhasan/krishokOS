export interface Alert {
  id: string;
  type: "outbreak" | "weather" | "advisory" | "government";
  severity: "critical" | "high" | "medium" | "low";
  title: string;
  location: string;
  district: string;
  timeAgo: string;
  description: string;
  source: string;
  affectedCrops: string[];
  confirmations: number;
  comments: number;
  verified: boolean;
}

export const alerts: Alert[] = [
  {
    id: "1",
    type: "outbreak",
    severity: "critical",
    title: "Banana Panama Disease Outbreak Detected",
    location: "Rangpur Sadar, Rangpur",
    district: "Rangpur",
    timeAgo: "2 hours ago",
    description: "AI system detected multiple confirmed cases of Fusarium Wilt (Panama Disease) in banana farms in Rangpur Sadar area. 12 farms affected, covering approximately 45 acres. Avoid movement of soil and planting material from this area.",
    source: "AgriOS AI Detection System",
    affectedCrops: ["Banana"],
    confirmations: 24,
    comments: 8,
    verified: true,
  },
  {
    id: "2",
    type: "outbreak",
    severity: "high",
    title: "Black Sigatoka Spreading in Mymensingh",
    location: "Trishal, Mymensingh",
    district: "Mymensingh",
    timeAgo: "5 hours ago",
    description: "Multiple farmer reports of Black Sigatoka (Leaf Streak Disease) in Trishal area. High humidity following recent rains has created favorable conditions. Apply preventive fungicide sprays immediately.",
    source: "Farmer Report (18 reports)",
    affectedCrops: ["Banana"],
    confirmations: 18,
    comments: 12,
    verified: true,
  },
  {
    id: "3",
    type: "outbreak",
    severity: "high",
    title: "Papaya Ring Spot Virus Spreading",
    location: "Gazipur Sadar, Gazipur",
    district: "Gazipur",
    timeAgo: "1 day ago",
    description: "PRSV detected in Gazipur papaya farms. Aphid population surge after recent weather. Use reflective mulch and mineral oil spray. Remove infected plants immediately.",
    source: "DAE Field Officer Report",
    affectedCrops: ["Papaya"],
    confirmations: 31,
    comments: 15,
    verified: true,
  },
  {
    id: "4",
    type: "weather",
    severity: "medium",
    title: "Heavy Rainfall Alert — Dhaka Division",
    location: "Dhaka Division",
    district: "Dhaka",
    timeAgo: "3 hours ago",
    description: "Bangladesh Meteorological Department forecasts 50-80mm rainfall in Dhaka Division over next 48 hours. Delay fertilizer application to prevent nutrient runoff.",
    source: "Bangladesh Meteorological Department",
    affectedCrops: ["Banana", "Papaya"],
    confirmations: 0,
    comments: 4,
    verified: true,
  },
  {
    id: "5",
    type: "advisory",
    severity: "low",
    title: "Optimal Planting Window — November 2024",
    location: "All Bangladesh",
    district: "All Districts",
    timeAgo: "2 days ago",
    description: "BARI advises November is optimal for Banana and Papaya planting across Bangladesh. Soil temperature and moisture levels are ideal. Plant certified disease-free tissue culture seedlings.",
    source: "Bangladesh Agricultural Research Institute (BARI)",
    affectedCrops: ["Banana", "Papaya"],
    confirmations: 45,
    comments: 22,
    verified: true,
  },
  {
    id: "6",
    type: "government",
    severity: "medium",
    title: "New Export Residue Limits Effective January 2025",
    location: "All Bangladesh",
    district: "All Districts",
    timeAgo: "3 days ago",
    description: "EU has tightened Maximum Residue Limits (MRLs) for banana imports effective January 2025. Several fungicides now banned. Ensure all spray programs comply with new limits. Contact DAE for approved product list.",
    source: "Department of Agricultural Extension (DAE)",
    affectedCrops: ["Banana"],
    confirmations: 67,
    comments: 34,
    verified: true,
  },
];

export const severityConfig = {
  critical: { color: "text-red-600 dark:text-red-400", bg: "bg-red-50 dark:bg-red-950/20", border: "border-red-300 dark:border-red-900/40", dot: "bg-red-500" },
  high: { color: "text-orange-600 dark:text-orange-400", bg: "bg-orange-50 dark:bg-orange-950/20", border: "border-orange-200 dark:border-orange-900/40", dot: "bg-orange-500" },
  medium: { color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-950/20", border: "border-amber-200 dark:border-amber-900/40", dot: "bg-amber-500" },
  low: { color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-950/20", border: "border-blue-200 dark:border-blue-900/40", dot: "bg-blue-500" },
};

export const typeLabels = {
  outbreak: "Disease Outbreak",
  weather: "Weather Alert",
  advisory: "Advisory",
  government: "Gov. Notice",
};
