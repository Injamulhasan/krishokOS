"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bell,
  User,
  LogOut,
  X,
  ChevronRight,
  MapPin,
  Clock,
  ThumbsUp,
  MessageSquare,
  Shield,
  AlertTriangle,
} from "lucide-react";
import { Alert, alerts, severityConfig, typeLabels } from "@/lib/alertsData";
import ThemeToggle from "@/components/ThemeToggle";

interface HeaderActionsProps {
  userName: string;
}

export default function HeaderActions({ userName }: HeaderActionsProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const criticalCount = alerts.filter((a) => a.severity === "critical").length;

  return (
    <div className="flex items-center gap-2 relative" ref={dropdownRef}>
      {/* Theme Toggle Button */}
      <ThemeToggle />

      {/* ── Notification Bell ── */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative rounded-lg p-2 transition text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-emerald-950/40 cursor-pointer ${
          isOpen ? "bg-gray-100 dark:bg-emerald-950/40" : ""
        }`}
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5" />
        {criticalCount > 0 && (
          <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white dark:border-[#121c15] animate-pulse" />
        )}
      </button>

      {/* ── Notifications Dropdown ── */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white dark:bg-[#121c15] border border-gray-150 dark:border-emerald-900/40 rounded-2xl shadow-xl z-50 overflow-hidden transition-all duration-300">
          <div className="p-4 border-b border-gray-100 dark:border-emerald-900/40 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-gray-900 dark:text-[#e2ede4]">Live Alerts</span>
              {criticalCount > 0 && (
                <span className="text-[10px] bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400 px-2 py-0.5 rounded-full font-bold">
                  {criticalCount} critical
                </span>
              )}
            </div>
            <Link
              href="/alerts"
              onClick={() => setIsOpen(false)}
              className="text-xs text-green-600 dark:text-emerald-400 font-bold hover:underline"
            >
              View Network
            </Link>
          </div>

          <div className="max-h-[360px] overflow-y-auto divide-y divide-gray-50 dark:divide-emerald-950/20">
            {alerts.map((alert) => {
              const sev = severityConfig[alert.severity];
              return (
                <div
                  key={alert.id}
                  onClick={() => {
                    setSelectedAlert(alert);
                    setIsOpen(false);
                  }}
                  className="p-4 hover:bg-gray-50 dark:hover:bg-[#081009]/40 cursor-pointer transition-colors duration-150"
                >
                  <div className="flex items-start gap-2.5">
                    <div className={`w-2 h-2 ${sev.dot} rounded-full mt-1.5 shrink-0 ${alert.severity === "critical" ? "animate-pulse" : ""}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-0.5">
                        <span className={`text-[9px] font-bold uppercase ${sev.color}`}>
                          {alert.severity} • {typeLabels[alert.type]}
                        </span>
                        <span className="text-[9px] text-gray-400 dark:text-gray-500">{alert.timeAgo}</span>
                      </div>
                      <h4 className="font-bold text-gray-900 dark:text-[#e2ede4] text-xs truncate">
                        {alert.title}
                      </h4>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400 line-clamp-2 mt-0.5 leading-relaxed">
                        {alert.description}
                      </p>
                      <div className="flex items-center gap-2 mt-2 text-[9px] text-gray-400">
                        <span className="flex items-center gap-0.5"><MapPin className="w-2.5 h-2.5 text-emerald-600" />{alert.district}</span>
                        <span className="flex items-center gap-0.5 ml-auto"><ThumbsUp className="w-2.5 h-2.5 text-amber-500" />{alert.confirmations}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-3 h-3 text-gray-300 dark:text-gray-600 shrink-0 mt-1" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── User Profile Link ── */}
      <Link
        href="/profile"
        className="flex items-center gap-2 rounded-lg px-3 py-2 transition hover:bg-gray-100 dark:hover:bg-emerald-950/40"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-white font-bold">
          <User className="w-4 h-4" />
        </div>
        <span className="hidden text-sm text-gray-700 dark:text-[#e2ede4] sm:block font-bold">
          {userName}
        </span>
      </Link>

      {/* ── Logout Link ── */}
      <Link
        href="/auth/signin"
        className="flex items-center gap-2 rounded-lg px-3 py-2 text-red-600 dark:text-red-400 transition hover:bg-red-50 dark:hover:bg-red-950/20"
      >
        <LogOut className="w-4 h-4" />
        <span className="hidden text-sm sm:block font-bold">Logout</span>
      </Link>

      {/* ── Alert Details Modal ── */}
      {selectedAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/45 dark:bg-black/70 backdrop-blur-xs transition-opacity"
            onClick={() => setSelectedAlert(null)}
          />

          {/* Modal Box */}
          <div className="relative w-full max-w-lg bg-white dark:bg-[#121c15] rounded-2xl shadow-2xl border border-gray-100 dark:border-emerald-900/40 overflow-hidden transform transition-all animate-scaleUp">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-100 dark:border-emerald-900/40 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900 dark:text-[#e2ede4]">Alert Details</h3>
              <button
                onClick={() => setSelectedAlert(null)}
                className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-emerald-950/40 hover:text-gray-600 dark:hover:text-emerald-200 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4">
              {(() => {
                const sev = severityConfig[selectedAlert.severity];
                return (
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
                        <h4 className="text-base font-bold text-gray-900 dark:text-[#e2ede4]">{selectedAlert.title}</h4>
                        <div className="flex items-center gap-3 mt-2 text-xs text-gray-500 dark:text-gray-400">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-gray-400" />
                            {selectedAlert.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-gray-400" />
                            {selectedAlert.timeAgo}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}

              <div className="bg-gray-50 dark:bg-[#081009]/60 rounded-xl border border-gray-100 dark:border-emerald-900/40 p-4">
                <h5 className="font-bold text-gray-900 dark:text-[#e2ede4] text-sm mb-2">Description</h5>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{selectedAlert.description}</p>
              </div>

              <div className="bg-gray-50 dark:bg-[#081009]/60 rounded-xl border border-gray-100 dark:border-emerald-900/40 p-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-semibold">Source</p>
                  <p className="text-xs font-bold text-gray-900 dark:text-[#e2ede4]">{selectedAlert.source}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-semibold">Affected Crops</p>
                  <div className="flex flex-wrap gap-1">
                    {selectedAlert.affectedCrops.map((c) => (
                      <span key={c} className="text-[10px] bg-green-50 dark:bg-emerald-950 text-green-700 dark:text-emerald-400 px-2.5 py-0.5 rounded-full font-bold">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-semibold">Community Confirmations</p>
                  <p className="text-xs font-bold text-gray-900 dark:text-[#e2ede4]">{selectedAlert.confirmations} farmers confirmed</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-semibold">Verified</p>
                  <p className="text-xs font-bold text-green-600 dark:text-emerald-400">
                    {selectedAlert.verified ? "✓ Verified by AgriOS" : "Unverified"}
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedAlert(null);
                  router.push("/ai-agronomist");
                }}
                className="w-full bg-green-600 dark:bg-emerald-600 text-white py-2.5 rounded-xl font-bold hover:bg-green-700 dark:hover:bg-emerald-700 transition cursor-pointer shadow-sm text-sm"
              >
                Ask AI Agronomist About This
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
