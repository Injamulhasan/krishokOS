"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle } from "lucide-react";

interface StageConfig {
  title: string;
  subtitle: string;
  tasks: { id: number; title: string }[];
  guidelines: string[];
  timeline: string;
  cost: string;
  inputs: { name: string; desc: string; price: string }[];
}

const stageConfigs: Record<string, StageConfig> = {
  "land-preparation": {
    title: "Stage 1: Land Preparation",
    subtitle: "Prepare your land for planting",
    tasks: [
      { id: 1, title: "Clear the land of weeds and debris" },
      { id: 2, title: "Deep plowing to 30-40 cm depth" },
      { id: 3, title: "Conduct soil testing for NPK levels" },
      { id: 4, title: "Add organic compost (5-10 tons/acre)" },
      { id: 5, title: "Level the land for proper drainage" },
      { id: 6, title: "Prepare raised beds (1.5m wide, 30cm high)" },
      { id: 7, title: "Install irrigation system" },
    ],
    guidelines: [
      "Land should be plowed 2-3 times for proper soil tilth",
      "Ensure proper drainage to prevent waterlogging",
      "pH should be between 6.0-7.5 for optimal growth",
      "Add lime if soil is too acidic",
      "Use well-decomposed farmyard manure",
    ],
    timeline: "7-10 days",
    cost: "৳15,000 - ৳20,000 per acre",
    inputs: [
      { name: "Organic Compost", desc: "5-10 tons per acre", price: "৳3,000/ton" },
      { name: "Dolomite Lime", desc: "If pH adjustment needed", price: "৳800/bag (50kg)" },
      { name: "Labor Cost", desc: "Land clearing & preparation", price: "৳500/person/day" },
    ],
  },
  planting: {
    title: "Stage 2: Planting",
    subtitle: "Select and plant seedlings properly",
    tasks: [
      { id: 1, title: "Select disease-free tissue culture seedlings" },
      { id: 2, title: "Dig planting holes (45cm × 45cm × 45cm)" },
      { id: 3, title: "Apply basal fertilizer (DAP 100g per hole)" },
      { id: 4, title: "Plant seedlings at recommended spacing" },
      { id: 5, title: "Apply initial irrigation immediately after planting" },
      { id: 6, title: "Mulch around base of each plant" },
    ],
    guidelines: [
      "Use only certified, disease-free planting material",
      "Maintain 2m × 2m spacing for banana, 2.5m × 2.5m for papaya",
      "Plant during early morning or late afternoon to reduce transplant shock",
      "Ensure proper depth — crown should be at soil level",
      "Water immediately after planting",
    ],
    timeline: "3-5 days",
    cost: "৳25,000 - ৳35,000 per acre",
    inputs: [
      { name: "Tissue Culture Seedlings", desc: "Disease-free certified plants", price: "৳15-25/plant" },
      { name: "DAP Fertilizer", desc: "Basal application", price: "৳2,800/bag (50kg)" },
      { name: "Mulching Material", desc: "Rice straw or dry grass", price: "৳500/load" },
    ],
  },
  "crop-growth": {
    title: "Stage 3: Crop Growth Management",
    subtitle: "Manage irrigation, fertilization, and weeds",
    tasks: [
      { id: 1, title: "Set up drip irrigation schedule (15-20L/plant/day)" },
      { id: 2, title: "Apply first top dressing — Urea 75g/plant" },
      { id: 3, title: "Conduct weekly weed removal" },
      { id: 4, title: "Monitor soil moisture levels" },
      { id: 5, title: "Apply MoP (Muriate of Potash) 50g/plant" },
      { id: 6, title: "Record all input applications in log" },
    ],
    guidelines: [
      "Never allow soil to dry out during vegetative growth phase",
      "Apply nitrogen in split doses for better absorption",
      "Remove weeds manually — avoid herbicides for residue-free farming",
      "Monitor leaf color for nutrient deficiency symptoms",
      "Maintain detailed input records for traceability",
    ],
    timeline: "4-8 weeks (ongoing)",
    cost: "৳10,000 - ৳15,000 per acre per month",
    inputs: [
      { name: "Urea (46% N)", desc: "Top dressing nitrogen", price: "৳1,200/bag (50kg)" },
      { name: "MoP (60% K)", desc: "Potassium application", price: "৳1,800/bag (50kg)" },
      { name: "Drip Irrigation Kit", desc: "Per acre setup", price: "৳15,000-25,000" },
    ],
  },
  "plant-health": {
    title: "Stage 4: Plant Health Monitoring",
    subtitle: "Detect and manage diseases and pests",
    tasks: [
      { id: 1, title: "Inspect leaves weekly for disease symptoms" },
      { id: 2, title: "Set up yellow sticky traps for flying insects" },
      { id: 3, title: "Install pheromone traps for fruit flies" },
      { id: 4, title: "Apply neem oil spray if pests detected" },
      { id: 5, title: "Remove and destroy infected plant parts" },
      { id: 6, title: "Document all pest/disease observations" },
    ],
    guidelines: [
      "Scout fields every 3 days during flowering stage",
      "Look for Black Sigatoka spots on banana leaves",
      "Check for Papaya Ring Spot Virus in papaya crops",
      "Use biological controls first — Trichoderma, Beauveria bassiana",
      "Quarantine infected areas immediately",
    ],
    timeline: "Ongoing throughout crop cycle",
    cost: "৳5,000 - ৳8,000 per acre per season",
    inputs: [
      { name: "Neem Oil", desc: "Biological pest control", price: "৳350/liter" },
      { name: "Yellow Sticky Traps", desc: "Monitoring flying pests", price: "৳50/trap" },
      { name: "Pheromone Traps", desc: "Fruit fly monitoring", price: "৳120/trap" },
    ],
  },
  "fruit-development": {
    title: "Stage 5: Fruit Development",
    subtitle: "Manage nutrients and protect developing fruits",
    tasks: [
      { id: 1, title: "Apply potassium-rich fertilizer for fruit fill" },
      { id: 2, title: "Bag developing fruit bunches with perforated polythene" },
      { id: 3, title: "Apply micronutrients — Boron and Zinc" },
      { id: 4, title: "Maintain consistent irrigation" },
      { id: 5, title: "Support heavy bunches with props" },
      { id: 6, title: "Record bunch emergence dates" },
    ],
    guidelines: [
      "Potassium is critical during fruit development — do not skip",
      "Bag fruits to protect from insects and sunburn",
      "Boron deficiency causes deformed fruits",
      "Never allow water stress during bunch filling",
      "Support heavy banana bunches to prevent plant toppling",
    ],
    timeline: "4-8 weeks",
    cost: "৳8,000 - ৳12,000 per acre",
    inputs: [
      { name: "MoP (60% K)", desc: "Fruit filling potassium", price: "৳1,800/bag (50kg)" },
      { name: "Fruit Bags", desc: "Perforated polythene", price: "৳5/bag" },
      { name: "Boron Fertilizer", desc: "Micronutrient supplement", price: "৳300/kg" },
    ],
  },
  "pre-harvest": {
    title: "Stage 6: Pre-Harvest Care",
    subtitle: "Ensure harvest readiness and quality",
    tasks: [
      { id: 1, title: "Conduct pre-harvest quality inspection" },
      { id: 2, title: "Send fruit sample to lab for residue testing" },
      { id: 3, title: "Verify 21-day pre-harvest interval for all inputs" },
      { id: 4, title: "Arrange transport and cold chain logistics" },
      { id: 5, title: "Prepare packing and grading materials" },
      { id: 6, title: "Brief harvest labor on handling procedures" },
    ],
    guidelines: [
      "No chemical inputs in the last 21 days before harvest",
      "Test for pesticide residues — mandatory for export",
      "Arrange refrigerated transport in advance",
      "Train workers on gentle handling to minimize bruising",
      "Prepare all compliance documentation",
    ],
    timeline: "5-7 days before harvest",
    cost: "৳3,000 - ৳5,000 per batch",
    inputs: [
      { name: "Lab Residue Test", desc: "Pesticide residue analysis", price: "৳2,500/sample" },
      { name: "Packing Cartons", desc: "Export-grade cardboard boxes", price: "৳50/carton" },
      { name: "Cold Chain Transport", desc: "Refrigerated truck hire", price: "৳5,000-10,000/trip" },
    ],
  },
  harvesting: {
    title: "Stage 7: Harvesting",
    subtitle: "Harvest timing, techniques, and yield recording",
    tasks: [
      { id: 1, title: "Check fruit maturity indicators (color, shape)" },
      { id: 2, title: "Harvest banana when fingers are 3/4 full" },
      { id: 3, title: "Use sharp, clean tools for cutting" },
      { id: 4, title: "Handle fruits gently to prevent bruising" },
      { id: 5, title: "Record yield data (weight per bunch/tree)" },
      { id: 6, title: "Transport to packing house within 2 hours" },
    ],
    guidelines: [
      "Harvest in early morning when temperatures are cool",
      "Use padded containers for transport from field",
      "Do not drop or stack fruits carelessly",
      "Calibrate weighing equipment before recording",
      "Separate damaged fruits immediately at harvest point",
    ],
    timeline: "1-3 days per harvest cycle",
    cost: "৳5,000 - ৳8,000 per acre (labor)",
    inputs: [
      { name: "Harvesting Tools", desc: "Sharp knives, cutters", price: "৳200-500 each" },
      { name: "Harvest Crates", desc: "Padded plastic crates", price: "৳250/crate" },
      { name: "Weighing Scale", desc: "Digital scale for yield", price: "৳3,000" },
    ],
  },
  "post-harvest": {
    title: "Stage 8: Post-Harvest Management",
    subtitle: "Sorting, packaging, storage, and transportation",
    tasks: [
      { id: 1, title: "Sort and grade fruits by size and quality" },
      { id: 2, title: "Wash fruits with clean water if needed" },
      { id: 3, title: "Apply fungicide dip (for export compliance)" },
      { id: 4, title: "Pack in export-standard cartons with cushioning" },
      { id: 5, title: "Store at recommended temperature (13-14°C for banana)" },
      { id: 6, title: "Complete all traceability and export documentation" },
    ],
    guidelines: [
      "Grade A fruits only for export — Grade B for local market",
      "Maintain cold chain from packing to destination",
      "Label each carton with lot number, farm ID, and harvest date",
      "Complete phytosanitary certificate requirements",
      "Submit all records to the compliance system",
    ],
    timeline: "1-2 days",
    cost: "৳10,000 - ৳15,000 per shipment",
    inputs: [
      { name: "Export Cartons", desc: "Standard packing boxes", price: "৳50/carton" },
      { name: "Cold Storage", desc: "Per day rental", price: "৳500/pallet/day" },
      { name: "Phytosanitary Certificate", desc: "Government inspection", price: "৳1,500/batch" },
    ],
  },
};

interface StageClientProps {
  stageId: string;
  crop?: string;
}

export default function StageClient({ stageId, crop }: StageClientProps) {
  const router = useRouter();
  const config = stageConfigs[stageId];

  const [checkedTasks, setCheckedTasks] = useState<Record<number, boolean>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  // Load completion state from localStorage with crop-specific suffix
  useEffect(() => {
    const suffix = crop ? `-${crop.toLowerCase()}` : "";
    const saved = localStorage.getItem(`krishokos-stage-${stageId}${suffix}`);
    if (saved) {
      const parsed = JSON.parse(saved);
      setCheckedTasks(parsed.checkedTasks || {});
      setIsCompleted(parsed.isCompleted || false);
    } else {
      setCheckedTasks({});
      setIsCompleted(false);
    }
  }, [stageId, crop]);

  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-[#081009]">
        Stage not found.
      </div>
    );
  }

  const allTasksChecked =
    config.tasks.length > 0 &&
    config.tasks.every((task) => checkedTasks[task.id]);

  const handleToggleTask = (taskId: number) => {
    if (isCompleted) return; // Don't allow changes after completion
    setCheckedTasks((prev) => {
      const updated = { ...prev, [taskId]: !prev[taskId] };
      // Save to localStorage with crop-specific suffix
      const suffix = crop ? `-${crop.toLowerCase()}` : "";
      localStorage.setItem(
        `krishokos-stage-${stageId}${suffix}`,
        JSON.stringify({ checkedTasks: updated, isCompleted: false })
      );
      return updated;
    });
  };

  const handleMarkComplete = () => {
    if (!allTasksChecked) return;

    const suffix = crop ? `-${crop.toLowerCase()}` : "";

    // Save completion
    localStorage.setItem(
      `krishokos-stage-${stageId}${suffix}`,
      JSON.stringify({ checkedTasks, isCompleted: true })
    );
    setIsCompleted(true);

    // Update global completed stages list with crop-specific suffix
    const saved = localStorage.getItem(`krishokos-completed-stages${suffix}`);
    const completedStages: string[] = saved ? JSON.parse(saved) : [];
    if (!completedStages.includes(stageId)) {
      completedStages.push(stageId);
      localStorage.setItem(
        `krishokos-completed-stages${suffix}`,
        JSON.stringify(completedStages)
      );
    }

    // Navigate back to farm overview after a brief delay
    setTimeout(() => {
      router.push(`/farm-overview${crop ? `?crop=${crop}` : ""}`);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-[#081009] dark:via-[#0c1a0e] dark:to-[#081009] transition-colors duration-300">
      <header className="bg-white dark:bg-[#121c15] shadow-sm border-b border-gray-200 dark:border-emerald-900/40 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push(`/farm-overview${crop ? `?crop=${crop}` : ""}`)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-emerald-900/30 rounded-lg transition cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                {crop ? `${crop.charAt(0).toUpperCase() + crop.slice(1)} - ` : ""}{config.title}
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {config.subtitle}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Tasks Checklist */}
          <div className="bg-white dark:bg-[#121c15] rounded-xl shadow-lg dark:shadow-none border border-transparent dark:border-emerald-900/40 p-6 transition-colors duration-300">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Tasks Checklist
            </h2>
            <div className="space-y-3">
              {config.tasks.map((task) => (
                <label
                  key={task.id}
                  className={`flex items-start gap-3 p-3 rounded-lg transition cursor-pointer ${
                    isCompleted
                      ? "opacity-70 cursor-default"
                      : "hover:bg-gray-50 dark:hover:bg-emerald-900/20"
                  } ${checkedTasks[task.id] ? "bg-green-50/50 dark:bg-emerald-950/20" : ""}`}
                >
                  <input
                    type="checkbox"
                    checked={checkedTasks[task.id] || false}
                    onChange={() => handleToggleTask(task.id)}
                    disabled={isCompleted}
                    className="w-5 h-5 text-green-600 border-gray-300 dark:border-gray-600 rounded focus:ring-green-500 mt-0.5 accent-green-600 cursor-pointer disabled:cursor-default"
                  />
                  <span
                    className={`text-gray-700 dark:text-gray-300 ${checkedTasks[task.id] ? "line-through text-gray-400 dark:text-gray-500" : ""}`}
                  >
                    {task.title}
                  </span>
                </label>
              ))}
            </div>
            <button
              onClick={handleMarkComplete}
              disabled={!allTasksChecked || isCompleted}
              className={`w-full mt-6 py-3 rounded-lg font-medium transition cursor-pointer ${
                isCompleted
                  ? "bg-green-100 dark:bg-emerald-950/30 text-green-700 dark:text-emerald-400 cursor-default"
                  : allTasksChecked
                    ? "bg-green-600 dark:bg-emerald-600 text-white hover:bg-green-700 dark:hover:bg-emerald-700"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
              }`}
            >
              {isCompleted
                ? "✓ Stage Completed"
                : "Mark Stage as Complete"}
            </button>
          </div>

          {/* Guidelines */}
          <div className="bg-white dark:bg-[#121c15] rounded-xl shadow-lg dark:shadow-none border border-transparent dark:border-emerald-900/40 p-6 transition-colors duration-300">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Guidelines & Best Practices
            </h2>
            <div className="space-y-3">
              {config.guidelines.map((guideline, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700 dark:text-gray-300">
                    {guideline}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/40 rounded-lg transition-colors duration-300">
              <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
                Estimated Timeline
              </h3>
              <p className="text-blue-800 dark:text-blue-400">
                {config.timeline}
              </p>
            </div>

            <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 rounded-lg transition-colors duration-300">
              <h3 className="font-semibold text-amber-900 dark:text-amber-300 mb-2">
                Estimated Cost
              </h3>
              <p className="text-amber-800 dark:text-amber-400">
                {config.cost}
              </p>
            </div>
          </div>
        </div>

        {/* Recommended Inputs */}
        <div className="mt-6 bg-white dark:bg-[#121c15] rounded-xl shadow-lg dark:shadow-none border border-transparent dark:border-emerald-900/40 p-6 transition-colors duration-300">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Recommended Inputs
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {config.inputs.map((input) => (
              <div
                key={input.name}
                className="p-4 border border-gray-200 dark:border-emerald-900/40 rounded-lg transition-colors duration-300"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {input.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {input.desc}
                </p>
                <p className="text-green-600 dark:text-emerald-400 font-medium mt-2">
                  {input.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
