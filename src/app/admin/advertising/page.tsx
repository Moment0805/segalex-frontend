"use client";

import React, { useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { useMarketplace } from "@/context/MarketplaceContext";
import { showToast } from "@/components/ui/Toast";
import { AdBanner } from "@/types";
import {
  Megaphone,
  Award,
  Eye,
  MousePointerClick,
  Calendar,
  ToggleLeft,
  ToggleRight,
  ExternalLink,
  MapPin,
  Save,
} from "lucide-react";

export default function AdminAdvertisingManagerPage() {
  const { ads, updateAdBanner } = useMarketplace();

  // Premium Exclusive Pop-up Targeted Areas
  const [popupAreas, setPopupAreas] = useState<string[]>([
    "Ibeju-Lekki",
    "Ikoyi",
    "Banana Island",
  ]);
  const [newAreaInput, setNewAreaInput] = useState("");

  const handleToggleActive = (banner: AdBanner) => {
    updateAdBanner(banner.id, { isActive: !banner.isActive });
    showToast(
      banner.isActive ? "Banner Deactivated" : "Banner Activated",
      `${banner.title.slice(0, 30)} slot updated.`
    );
  };

  const handleAddPopupArea = () => {
    if (!newAreaInput) return;
    if (!popupAreas.includes(newAreaInput)) {
      setPopupAreas([...popupAreas, newAreaInput]);
      showToast("Target Area Assigned", `Exclusive pop-ups now trigger in ${newAreaInput}.`);
      setNewAreaInput("");
    }
  };

  const handleRemovePopupArea = (area: string) => {
    setPopupAreas(popupAreas.filter((a) => a !== area));
  };

  return (
    <div className="min-h-screen flex bg-[#FAFAF7] text-stone-900">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-10 overflow-y-auto space-y-8 max-w-7xl">
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-ink font-display uppercase tracking-tight">
            Advertising Slots & Sponsored Campaign Manager
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Manage public marketplace banner positions and configure target corridors for Premium search pop-ups.
          </p>
        </div>

        {/* Banner Slots Grid */}
        <div className="space-y-4">
          <h3 className="font-bold text-sm text-stone-900 uppercase tracking-wide">
            Active Banner Inventory Slots
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ads.map((banner) => {
              const ctr = banner.impressions > 0 ? ((banner.clicks / banner.impressions) * 100).toFixed(2) : "0.00";

              return (
                <div
                  key={banner.id}
                  className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm flex flex-col justify-between space-y-4"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                      <div>
                        <span className="text-[10px] font-mono font-bold uppercase text-stone-400 block">
                          Slot: {banner.slot === "home_mid" ? "Homepage Mid-Feed" : "Search Feed Top"}
                        </span>
                        <h4 className="font-bold text-sm text-stone-900">{banner.sponsorName}</h4>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleToggleActive(banner)}
                        className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${
                          banner.isActive
                            ? "bg-emerald-50 text-[#008751] border border-emerald-200"
                            : "bg-stone-100 text-stone-500"
                        }`}
                      >
                        <span className={`w-2 h-2 rounded-full ${banner.isActive ? "bg-[#008751]" : "bg-stone-400"}`} />
                        <span>{banner.isActive ? "Active" : "Paused"}</span>
                      </button>
                    </div>

                    {/* Creative Preview */}
                    <div className="relative aspect-[21/9] rounded-xl overflow-hidden bg-stone-100 my-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={banner.imageUrl}
                        alt={banner.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                        <span className="text-white text-xs font-bold line-clamp-1">
                          {banner.title}
                        </span>
                      </div>
                    </div>

                    {/* Metrics Strip */}
                    <div className="grid grid-cols-3 gap-2 p-3 bg-[#FAFAF7] rounded-xl border border-stone-200 text-center text-xs">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-stone-400 block">
                          Impressions
                        </span>
                        <span className="font-mono font-bold text-stone-900">
                          {banner.impressions.toLocaleString()}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-stone-400 block">
                          Clicks
                        </span>
                        <span className="font-mono font-bold text-[#008751]">
                          {banner.clicks.toLocaleString()}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-stone-400 block">
                          CTR
                        </span>
                        <span className="font-mono font-bold text-stone-900">{ctr}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-[11px] text-stone-500 flex items-center justify-between pt-2 border-t border-stone-100">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-stone-400" />
                      <span>Flight: {banner.startDate} to {banner.endDate}</span>
                    </span>
                    <a
                      href={banner.destinationUrl}
                      className="text-[#008751] font-bold hover:underline flex items-center gap-1"
                    >
                      <span>Destination</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Premium Exclusive Pop-up Target Areas */}
        <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div>
              <h3 className="font-bold text-sm text-stone-900 flex items-center gap-2">
                <Award className="w-4 h-4 text-[#FFC800]" />
                <span>Premium Exclusive Search Pop-Up: Target Districts</span>
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                When visitors search these Lagos zones, the discrete sponsored card appears once per session.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {popupAreas.map((area) => (
              <span
                key={area}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-300 text-xs font-bold"
              >
                <MapPin className="w-3.5 h-3.5 text-[#008751]" />
                <span>{area}</span>
                <button
                  type="button"
                  onClick={() => handleRemovePopupArea(area)}
                  className="text-stone-400 hover:text-red-600 ml-1"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>

          {/* Add Target Area */}
          <div className="flex items-center gap-2 pt-2 max-w-md">
            <input
              type="text"
              placeholder="Assign new corridor (e.g. Victoria Island)..."
              value={newAreaInput}
              onChange={(e) => setNewAreaInput(e.target.value)}
              className="flex-1 bg-[#FAFAF7] border border-stone-200 rounded-lg p-2 text-xs font-semibold text-stone-900 focus:outline-none focus:border-[#008751]"
            />
            <button
              type="button"
              onClick={handleAddPopupArea}
              className="py-2 px-4 bg-[#151314] hover:bg-black text-white rounded-lg text-xs font-bold uppercase tracking-wider"
            >
              Add Area
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

