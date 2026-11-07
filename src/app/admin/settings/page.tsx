"use client";

import React, { useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { showToast } from "@/components/ui/Toast";
import { Settings, Save, Clock, ShieldCheck, Lock } from "lucide-react";

export default function AdminSettingsPage() {
  const [expiryDays, setExpiryDays] = useState("60");
  const [graceDays, setGraceDays] = useState("7");
  const [reminderDays, setReminderDays] = useState("7");
  const [strictLasrera, setStrictLasrera] = useState(true);
  const [passwordGateEnabled, setPasswordGateEnabled] = useState(false);
  const [prototypePassword, setPrototypePassword] = useState("segalex2025");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(
      "Settings Saved",
      `Expiry = ${expiryDays} days, Grace = ${graceDays} days, Reminder = ${reminderDays} days.`
    );
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#FAFAF7] text-stone-900">
      <AdminSidebar />

      <main className="flex-1 w-full min-w-0 p-4 sm:p-6 lg:p-10 overflow-x-hidden space-y-6 sm:space-y-8 max-w-4xl">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-ink font-display uppercase tracking-tight">
            System Rules & Freshness Automation
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Configure automated listing expiration thresholds, billing grace periods, and compliance gates.
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-6 text-xs">
          {/* Expiry & Grace Periods */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-stone-900 uppercase tracking-wide flex items-center gap-2 pb-2 border-b border-stone-100">
              <Clock className="w-4 h-4 text-[#008751]" />
              <span>Listing Freshness & Grace Thresholds</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-stone-600 uppercase mb-1">
                  Listing Expiry Duration (Days)
                </label>
                <input
                  type="number"
                  required
                  value={expiryDays}
                  onChange={(e) => setExpiryDays(e.target.value)}
                  className="w-full bg-[#FAFAF7] border border-stone-200 rounded-lg p-2.5 font-bold font-mono text-stone-900 focus:outline-none focus:border-[#008751]"
                />
                <span className="text-[10px] text-stone-400 mt-1 block">
                  Default: 60-day freshness rule
                </span>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-stone-600 uppercase mb-1">
                  Failed-Payment Grace (Days)
                </label>
                <input
                  type="number"
                  required
                  value={graceDays}
                  onChange={(e) => setGraceDays(e.target.value)}
                  className="w-full bg-[#FAFAF7] border border-stone-200 rounded-lg p-2.5 font-bold font-mono text-stone-900 focus:outline-none focus:border-[#008751]"
                />
                <span className="text-[10px] text-stone-400 mt-1 block">
                  Default: 7-day grace period
                </span>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-stone-600 uppercase mb-1">
                  Expiry Reminder Warning (Days)
                </label>
                <input
                  type="number"
                  required
                  value={reminderDays}
                  onChange={(e) => setReminderDays(e.target.value)}
                  className="w-full bg-[#FAFAF7] border border-stone-200 rounded-lg p-2.5 font-bold font-mono text-stone-900 focus:outline-none focus:border-[#008751]"
                />
                <span className="text-[10px] text-stone-400 mt-1 block">
                  Default: 7-day prior notice
                </span>
              </div>
            </div>
          </div>

          {/* Compliance & Regulatory Guardrails */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-stone-900 uppercase tracking-wide flex items-center gap-2 pb-2 border-b border-stone-100">
              <ShieldCheck className="w-4 h-4 text-[#008751]" />
              <span>Regulatory Gate Enforcement</span>
            </h3>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={strictLasrera}
                onChange={(e) => setStrictLasrera(e.target.checked)}
                className="w-4 h-4 rounded text-[#008751] mt-0.5"
              />
              <div>
                <span className="font-bold text-stone-900 block">
                  Enforce Strict LASRERA Accreditation Gate
                </span>
                <span className="text-stone-500 text-[11px] leading-relaxed block">
                  When enabled, unverified agent accounts cannot publish live listings to the public marketplace.
                </span>
              </div>
            </label>
          </div>

          {/* Prototype Security Gate */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-stone-900 uppercase tracking-wide flex items-center gap-2 pb-2 border-b border-stone-100">
              <Lock className="w-4 h-4 text-stone-700" />
              <span>Optional Client Demo Password Gate</span>
            </h3>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={passwordGateEnabled}
                onChange={(e) => setPasswordGateEnabled(e.target.checked)}
                className="w-4 h-4 rounded text-[#008751] mt-0.5"
              />
              <div>
                <span className="font-bold text-stone-900 block">
                  Enable Private Pitch Access Password
                </span>
                <span className="text-stone-500 text-[11px] block">
                  Requires PROTOTYPE_PASSWORD for client review links before public release.
                </span>
              </div>
            </label>

            {passwordGateEnabled && (
              <div className="pt-2 max-w-sm">
                <label className="block text-[10px] font-bold text-stone-600 uppercase mb-1">
                  Access Password
                </label>
                <input
                  type="text"
                  value={prototypePassword}
                  onChange={(e) => setPrototypePassword(e.target.value)}
                  className="w-full bg-[#FAFAF7] border border-stone-200 rounded-lg p-2 font-mono text-stone-900"
                />
              </div>
            )}
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="py-3 px-6 bg-[#008751] hover:bg-[#00563A] text-white rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Save System Parameters</span>
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

