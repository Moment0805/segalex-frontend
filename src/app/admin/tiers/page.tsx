"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { useMarketplace } from "@/context/MarketplaceContext";
import { formatNaira } from "@/lib/utils";
import { showToast } from "@/components/ui/Toast";
import { AgentTier, TierConfig } from "@/types";
import { CreditCard, Save, ExternalLink } from "lucide-react";

export default function AdminTiersManagerPage() {
  const { tiers, updateTierConfig } = useMarketplace();

  // Local editable draft state
  const [tierForms, setTierForms] = useState<TierConfig[]>(tiers);

  const handleFieldChange = (
    tier: AgentTier,
    field: keyof TierConfig,
    value: string | number
  ) => {
    setTierForms((prev) =>
      prev.map((t) => (t.tier === tier ? { ...t, [field]: value } : t))
    );
  };

  const handleSaveTier = (tier: AgentTier) => {
    const updated = tierForms.find((t) => t.tier === tier);
    if (!updated) return;

    updateTierConfig(tier, {
      monthlyPrice: Number(updated.monthlyPrice),
      yearlyPrice: Number(updated.yearlyPrice),
      listingLimit: Number(updated.listingLimit),
      photosPerListing: Number(updated.photosPerListing),
      videosAllowed: Number(updated.videosAllowed),
      monthlyDocChecks: Number(updated.monthlyDocChecks),
    });

    showToast(
      "Tier Settings Updated",
      `${tier.toUpperCase()} prices and allowances updated. Now live on public Packages page!`
    );
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#FAFAF7] text-stone-900">
      <AdminSidebar />

      <main className="flex-1 w-full min-w-0 p-4 sm:p-6 lg:p-10 overflow-x-hidden space-y-6 sm:space-y-8 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-ink font-display uppercase tracking-tight">
              Agent Tiers & Commercial Pricing Controls
            </h1>
            <p className="text-xs text-stone-500 mt-0.5">
              Edit subscription pricing and feature quotas. Modifications instantly synchronize with
              the public /packages page.
            </p>
          </div>

          <Link
            href="/packages"
            target="_blank"
            className="py-2 px-3.5 bg-white border border-stone-300 hover:border-stone-900 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <span>View Public /packages Page</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#008751]" />
          </Link>
        </div>

        {/* 3 Tier Editor Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {tierForms.map((t) => (
            <div
              key={t.tier}
              className="bg-white rounded-2xl p-6 border border-stone-200 shadow-card flex flex-col justify-between space-y-5"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <div>
                    <span className="text-[10px] font-black uppercase text-stone-400 font-mono">
                      {t.tier} Tier Configuration
                    </span>
                    <h3 className="font-bold text-base text-stone-900">{t.name}</h3>
                  </div>
                  <span
                    className={`text-[10px] font-black uppercase px-2 py-0.5 rounded font-mono ${
                      t.tier === "premium"
                        ? "bg-[#FFC800] text-[#151314]"
                        : t.tier === "basic"
                        ? "bg-emerald-100 text-[#008751]"
                        : "bg-stone-100 text-stone-700"
                    }`}
                  >
                    {t.placement}
                  </span>
                </div>

                {/* Monthly & Yearly Prices */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-[10px] font-bold text-stone-500 uppercase mb-1">
                      Monthly Price (₦)
                    </label>
                    <input
                      type="number"
                      value={t.monthlyPrice}
                      onChange={(e) =>
                        handleFieldChange(t.tier, "monthlyPrice", Number(e.target.value))
                      }
                      className="w-full bg-[#FAFAF7] border border-stone-200 rounded-lg p-2 font-mono font-bold text-stone-900 focus:outline-none focus:border-[#008751]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-stone-500 uppercase mb-1">
                      Yearly Price (₦)
                    </label>
                    <input
                      type="number"
                      value={t.yearlyPrice}
                      onChange={(e) =>
                        handleFieldChange(t.tier, "yearlyPrice", Number(e.target.value))
                      }
                      className="w-full bg-[#FAFAF7] border border-stone-200 rounded-lg p-2 font-mono font-bold text-stone-900 focus:outline-none focus:border-[#008751]"
                    />
                  </div>
                </div>

                {/* Quotas */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-[10px] font-bold text-stone-500 uppercase mb-1">
                      Listing Limit
                    </label>
                    <input
                      type="number"
                      value={t.listingLimit}
                      onChange={(e) =>
                        handleFieldChange(t.tier, "listingLimit", Number(e.target.value))
                      }
                      className="w-full bg-[#FAFAF7] border border-stone-200 rounded-lg p-2 font-bold text-stone-900 focus:outline-none focus:border-[#008751]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-stone-500 uppercase mb-1">
                      Photos Allowed
                    </label>
                    <input
                      type="number"
                      value={t.photosPerListing}
                      onChange={(e) =>
                        handleFieldChange(t.tier, "photosPerListing", Number(e.target.value))
                      }
                      className="w-full bg-[#FAFAF7] border border-stone-200 rounded-lg p-2 font-bold text-stone-900 focus:outline-none focus:border-[#008751]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-[10px] font-bold text-stone-500 uppercase mb-1">
                      Videos Allowed
                    </label>
                    <input
                      type="number"
                      value={t.videosAllowed}
                      onChange={(e) =>
                        handleFieldChange(t.tier, "videosAllowed", Number(e.target.value))
                      }
                      className="w-full bg-[#FAFAF7] border border-stone-200 rounded-lg p-2 font-bold text-stone-900 focus:outline-none focus:border-[#008751]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-stone-500 uppercase mb-1">
                      Doc Checks / Mo
                    </label>
                    <input
                      type="number"
                      value={t.monthlyDocChecks}
                      onChange={(e) =>
                        handleFieldChange(t.tier, "monthlyDocChecks", Number(e.target.value))
                      }
                      className="w-full bg-[#FAFAF7] border border-stone-200 rounded-lg p-2 font-bold text-stone-900 focus:outline-none focus:border-[#008751]"
                    />
                  </div>
                </div>

                <div className="p-3 bg-stone-50 rounded-xl text-[11px] text-stone-600 border border-stone-100">
                  <strong>Current Rule:</strong> Exclusive Search Pop-up is{" "}
                  {t.hasExclusiveSearchPopup ? (
                    <strong className="text-[#008751]">Enabled</strong>
                  ) : (
                    <strong className="text-stone-400">Disabled</strong>
                  )}
                  .
                </div>
              </div>

              {/* Save Button */}
              <button
                type="button"
                onClick={() => handleSaveTier(t.tier)}
                className="w-full py-2.5 bg-[#151314] hover:bg-black text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm transition-all"
              >
                <Save className="w-3.5 h-3.5 text-[#FFC800]" />
                <span>Save {t.tier.toUpperCase()} Configuration</span>
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

