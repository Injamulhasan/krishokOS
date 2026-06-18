"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Bell,
  AlertTriangle,
  MapPin,
  Clock,
  ChevronRight,
  ThumbsUp,
  MessageSquare,
  Shield,
} from "lucide-react";
import { Alert, alerts, severityConfig, typeLabels } from "@/lib/alertsData";

export default function AlertsWidget() {
  const router = useRouter();
  const [filter, setFilter] = useState<"all" | "outbreak" | "weather" | "advisory" | "government">("all");
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);

  const filtered = filter === "all" ? alerts : alerts.filter((a) => a.type === filter);

  if (selectedAlert) {
    const sev = severityConfig[selectedAlert.severity];
    return (
      <div className="bg-white dark:bg-[#121c15] rounded-2xl border border-gray-150 dark:border-emerald-900/40 p-6 shadow-sm transition-all duration-300">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100 dark:border-emerald-900/40">
          <button
            onClick={() => setSelectedAlert(null)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-emerald-950/40 rounded-lg text-gray-600 dark:text-gray-400 transition cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h3 className="font-bold text-gray-900 dark:text-[#e2ede4]">Alert Details</h3>
        </div>

        <div className="space-y-4">
          <div className={`${sev.bg} ${sev.border} border-2 rounded-2xl p-5`}>
            <div className="flex items-start gap-3">
              <div className={`w-3 h-3 ${sev.dot} rounded-full mt-1.5 shrink-0 animate-pulse`} />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-bold uppercase ${sev.color}`}>
                    {selectedAlert.severity} — {typeLabels[selectedAlert.type]}
                  </span>
                  {selectedAlert.verified && <Shield className="w-3.5 h-3.5 text-green-600 dark:text-emerald-400" />}
                </div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-[#e2ede4]">{selectedAlert.title}</h4>
                <div className="flex items-center gap-3 mt-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-gray-400 dark:text-emerald-500" />
                    {selectedAlert.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-gray-400 dark:text-emerald-500" />
                    {selectedAlert.timeAgo}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-[#081009]/60 rounded-xl border border-gray-100 dark:border-emerald-900/40 p-5">
            <h5 className="font-bold text-gray-900 dark:text-[#e2ede4] mb-2">Description</h5>
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{selectedAlert.description}</p>
          </div>

          <div className="bg-gray-50 dark:bg-[#081009]/60 rounded-xl border border-gray-100 dark:border-emerald-900/40 p-5 grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-semibold">Source</p>
              <p className="text-sm font-bold text-gray-900 dark:text-[#e2ede4]">{selectedAlert.source}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-semibold">Affected Crops</p>
              <div className="flex flex-wrap gap-1">
                {selectedAlert.affectedCrops.map((c) => (
                  <span key={c} className="text-xs bg-green-50 dark:bg-emerald-950 text-green-700 dark:text-emerald-400 px-2.5 py-0.5 rounded-full font-bold">
                    {c}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-semibold">Community Confirmations</p>
              <p className="text-sm font-bold text-gray-900 dark:text-[#e2ede4]">{selectedAlert.confirmations} farmers confirmed</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-semibold">Verified</p>
              <p className="text-sm font-bold text-green-600 dark:text-emerald-400">
                {selectedAlert.verified ? "✓ Verified by AgriOS" : "Unverified"}
              </p>
            </div>
          </div>

          <button
            onClick={() => router.push("/ai-agronomist")}
            className="w-full bg-green-600 dark:bg-emerald-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 dark:hover:bg-emerald-700 transition cursor-pointer shadow-sm"
          >
            Ask AI Agronomist About This
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Active critical alert banner */}
      <div className="bg-red-600 dark:bg-red-950/60 border border-transparent dark:border-red-900/40 rounded-2xl p-4 text-white flex items-center gap-3 shadow-md animate-pulse">
        <AlertTriangle className="w-6 h-6 shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="font-bold text-sm">1 Critical Alert in Your Region</p>
          <p className="text-red-100 dark:text-red-300 text-xs truncate">
            Panama Disease detected in Rangpur — check details immediately
          </p>
        </div>
        <button
          onClick={() => setSelectedAlert(alerts[0])}
          className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition cursor-pointer"
        >
          View →
        </button>
      </div>

      {/* Main Alert List Card */}
      <div className="bg-white dark:bg-[#121c15] rounded-2xl border border-gray-150 dark:border-emerald-900/40 p-6 shadow-sm transition-all duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100 dark:border-emerald-900/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shrink-0 shadow-md">
              <Bell className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-[#e2ede4] text-lg">Disease & Pest Alert Network</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                Community-powered intelligence • {alerts.length} active alerts
              </p>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-1.5 flex-wrap">
            {(["all", "outbreak", "weather", "advisory", "government"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer border ${
                  filter === f
                    ? "bg-amber-500 text-white border-amber-500 dark:bg-amber-600 dark:border-amber-600"
                    : "bg-white dark:bg-[#081009] text-gray-600 dark:text-gray-400 border-gray-200 dark:border-emerald-900/40 hover:border-amber-300 dark:hover:border-amber-500/50"
                }`}
              >
                {f === "all" ? "All Alerts" : typeLabels[f]}
              </button>
            ))}
          </div>
        </div>

        {/* Alert List */}
        <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
          {filtered.map((alert) => {
            const sev = severityConfig[alert.severity];
            return (
              <div
                key={alert.id}
                onClick={() => setSelectedAlert(alert)}
                className="bg-white dark:bg-[#081009]/40 rounded-xl border border-gray-100 dark:border-emerald-900/40 p-4 hover:shadow-md hover:border-green-200 dark:hover:border-emerald-800/60 cursor-pointer transition-all duration-200"
              >
                <div className="flex items-start gap-3">
                  <div className={`w-2.5 h-2.5 ${sev.dot} rounded-full mt-1.5 shrink-0 ${alert.severity === "critical" ? "animate-pulse" : ""}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div>
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${sev.color}`}>
                          {alert.severity} • {typeLabels[alert.type]}
                        </span>
                        {alert.verified && <Shield className="w-3 h-3 text-green-600 dark:text-emerald-400 inline ml-1 align-middle" />}
                      </div>
                      <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium shrink-0">{alert.timeAgo}</span>
                    </div>
                    <h4 className="font-bold text-gray-900 dark:text-[#e2ede4] text-sm mb-1 line-clamp-1">{alert.title}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">{alert.description}</p>
                    <div className="flex items-center gap-3 mt-3 pt-2 border-t border-gray-50 dark:border-emerald-900/10">
                      <span className="flex items-center gap-1 text-[10px] text-gray-400 dark:text-gray-500 font-semibold">
                        <MapPin className="w-3 h-3 text-emerald-600" />
                        {alert.district}
                      </span>
                      <div className="flex gap-1">
                        {alert.affectedCrops.map((c) => (
                          <span key={c} className="text-[10px] bg-green-50 dark:bg-emerald-950/40 text-green-600 dark:text-emerald-400 px-1.5 py-0.5 rounded font-bold">
                            {c}
                          </span>
                        ))}
                      </div>
                      <span className="flex items-center gap-1 text-[10px] text-gray-400 dark:text-gray-500 font-semibold ml-auto">
                        <ThumbsUp className="w-3 h-3 text-amber-500" />
                        {alert.confirmations}
                      </span>
                      <span className="flex items-center gap-1 text-[10px] text-gray-400 dark:text-gray-500 font-semibold">
                        <MessageSquare className="w-3 h-3 text-blue-500" />
                        {alert.comments}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300 dark:text-gray-600 shrink-0 mt-1" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
