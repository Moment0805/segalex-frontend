"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { useMarketplace } from "@/context/MarketplaceContext";
import { PaystackModal } from "@/components/agent/PaystackModal";
import { formatNaira } from "@/lib/utils";
import { AgentTier } from "@/types";
import {
  Check,
  X,
  Award,
  ShieldCheck,
  Zap,
  ArrowRight,
  HelpCircle,
} from "lucide-react";

export default function PackagesPage() {
  const { tiers, userRole } = useMarketplace();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [selectedUpgradeTier, setSelectedUpgradeTier] = useState<AgentTier | null>(null);

  const freeTier = tiers.find((t) => t.tier === "free") || tiers[0];
  const basicTier = tiers.find((t) => t.tier === "basic") || tiers[1];
  const premiumTier = tiers.find((t) => t.tier === "premium") || tiers[2];

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-darktext">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold text-[#008751] uppercase tracking-wider">
            Brokerage Partnership Plans
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-display text-ink uppercase tracking-tight">
            Transparent Packages for Verified Agents
          </h1>
          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
            Choose the plan that suits your inventory. All packages require active LASRERA
            accreditation. Zero disguised deductions.
          </p>

          {/* Billing Cycle Switcher */}
          <div className="pt-4 flex items-center justify-center gap-3">
            <div className="bg-[#F1F0EA] p-1 rounded-xl flex items-center border border-stone-200">
              <button
                type="button"
                onClick={() => setBillingCycle("monthly")}
                className={`px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                  billingCycle === "monthly"
                    ? "bg-[#151314] text-white shadow-sm"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                Monthly Billing
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle("yearly")}
                className={`px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                  billingCycle === "yearly"
                    ? "bg-[#151314] text-white shadow-sm"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                <span>Annual Billing</span>
                <span className="bg-[#008751] text-white text-[9px] px-1.5 py-0.2 rounded font-black">
                  Save ~17%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* 3 Tier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {/* 1. Free Starter */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-card flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-black uppercase tracking-wider bg-stone-100 text-stone-700 px-2 py-0.5 rounded">
                  Starter
                </span>
                <span className="text-[10px] text-stone-400 font-bold uppercase">
                  LASRERA Required
                </span>
              </div>
              <h3 className="text-xl font-bold text-stone-900">{freeTier.name}</h3>
              <p className="text-xs text-stone-500 mt-1 min-h-[32px]">{freeTier.description}</p>

              <div className="my-6">
                <span className="text-3xl font-black text-ink font-sans">₦0</span>
                <span className="text-stone-500 text-xs"> / forever</span>
              </div>

              {/* Feature List */}
              <ul className="space-y-3 text-xs text-stone-700 border-t border-stone-100 pt-6">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#008751] flex-shrink-0" />
                  <span>
                    <strong>{freeTier.listingLimit} Active Listings</strong> on marketplace
                  </span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#008751] flex-shrink-0" />
                  <span>{freeTier.photosPerListing} photos per property</span>
                </li>
                <li className="flex items-center gap-2.5 text-stone-400">
                  <X className="w-4 h-4 text-stone-300 flex-shrink-0" />
                  <span>No video walkthrough uploads</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#008751] flex-shrink-0" />
                  <span>Standard search placement</span>
                </li>
                <li className="flex items-center gap-2.5 text-stone-400">
                  <X className="w-4 h-4 text-stone-300 flex-shrink-0" />
                  <span>No exclusive search pop-up</span>
                </li>
                <li className="flex items-center gap-2.5 text-stone-400">
                  <X className="w-4 h-4 text-stone-300 flex-shrink-0" />
                  <span>No monthly document checks</span>
                </li>
              </ul>
            </div>

            <div className="pt-8 mt-6 border-t border-stone-100">
              <Link
                href="/agent/register"
                className="w-full py-3 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
              >
                <span>Register as Free Agent</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* 2. Basic Professional */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-card flex flex-col justify-between relative">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-black uppercase tracking-wider bg-emerald-50 text-[#008751] border border-emerald-200 px-2 py-0.5 rounded">
                  Professional
                </span>
                <span className="text-[10px] text-stone-400 font-bold uppercase">Active Broker</span>
              </div>
              <h3 className="text-xl font-bold text-stone-900">{basicTier.name}</h3>
              <p className="text-xs text-stone-500 mt-1 min-h-[32px]">{basicTier.description}</p>

              <div className="my-6">
                <span className="text-3xl font-black text-ink font-sans">
                  {formatNaira(
                    billingCycle === "yearly" ? basicTier.yearlyPrice : basicTier.monthlyPrice
                  )}
                </span>
                <span className="text-stone-500 text-xs">
                  {billingCycle === "yearly" ? " / year" : " / month"}
                </span>
              </div>

              {/* Feature List */}
              <ul className="space-y-3 text-xs text-stone-700 border-t border-stone-100 pt-6">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#008751] flex-shrink-0" />
                  <span>
                    <strong>{basicTier.listingLimit} Active Listings</strong> allowed
                  </span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#008751] flex-shrink-0" />
                  <span>{basicTier.photosPerListing} photos per property</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#008751] flex-shrink-0" />
                  <span>Up to {basicTier.videosAllowed} video tours</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#008751] flex-shrink-0" />
                  <span>Standard search ranking</span>
                </li>
                <li className="flex items-center gap-2.5 text-stone-400">
                  <X className="w-4 h-4 text-stone-300 flex-shrink-0" />
                  <span>No exclusive search pop-up</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#008751] flex-shrink-0" />
                  <span>
                    <strong>{basicTier.monthlyDocChecks} Document Check / month</strong>
                  </span>
                </li>
              </ul>
            </div>

            <div className="pt-8 mt-6 border-t border-stone-100">
              <button
                type="button"
                onClick={() => setSelectedUpgradeTier("basic")}
                className="w-full py-3 px-4 bg-[#151314] hover:bg-black text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
              >
                <span>Select Basic Plan</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#FFC800]" />
              </button>
            </div>
          </div>

          {/* 3. Premium Enterprise */}
          <div className="bg-[#151314] text-white rounded-2xl p-6 sm:p-8 border-2 border-[#FFC800] shadow-elevated flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#FFC800] text-[#151314] text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-bl-lg">
              Most Popular
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-black uppercase tracking-wider bg-[#FFC800] text-[#151314] px-2 py-0.5 rounded">
                  Enterprise Prime
                </span>
                <span className="text-[10px] text-stone-400 font-bold uppercase">Top Tier</span>
              </div>
              <h3 className="text-xl font-bold text-white">{premiumTier.name}</h3>
              <p className="text-xs text-stone-300 mt-1 min-h-[32px]">{premiumTier.description}</p>

              <div className="my-6">
                <span className="text-3xl font-black text-[#FFC800] font-sans">
                  {formatNaira(
                    billingCycle === "yearly" ? premiumTier.yearlyPrice : premiumTier.monthlyPrice
                  )}
                </span>
                <span className="text-stone-300 text-xs">
                  {billingCycle === "yearly" ? " / year" : " / month"}
                </span>
              </div>

              {/* Feature List */}
              <ul className="space-y-3 text-xs text-stone-200 border-t border-white/10 pt-6">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#FFC800] flex-shrink-0" />
                  <span>
                    <strong>{premiumTier.listingLimit} Active Listings</strong> allowance
                  </span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#FFC800] flex-shrink-0" />
                  <span>Unlimited high-res photos (fair use)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#FFC800] flex-shrink-0" />
                  <span>Up to {premiumTier.videosAllowed} video walkthroughs</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#FFC800] flex-shrink-0" />
                  <span>
                    <strong>Priority Placement</strong> (Featured badge)
                  </span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#FFC800] flex-shrink-0" />
                  <span>
                    <strong>Exclusive Search Pop-up</strong> in target area
                  </span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#FFC800] flex-shrink-0" />
                  <span>
                    <strong>{premiumTier.monthlyDocChecks} Title Document Checks / month</strong>
                  </span>
                </li>
              </ul>
            </div>

            <div className="pt-8 mt-6 border-t border-white/10">
              <button
                type="button"
                onClick={() => setSelectedUpgradeTier("premium")}
                className="w-full py-3 px-4 bg-[#008751] hover:bg-[#00563A] text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
              >
                <span>Upgrade to Premium</span>
                <Award className="w-4 h-4 text-[#FFC800]" />
              </button>
            </div>
          </div>
        </div>

        {/* Feature Comparison Detailed Table */}
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
          <div className="p-5 bg-[#FAFAF7] border-b border-stone-200">
            <h3 className="font-bold text-sm text-stone-900 uppercase tracking-wide">
              Detailed Plan Comparison Table
            </h3>
          </div>
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-stone-200 bg-stone-50 text-[11px] font-bold text-stone-500 uppercase">
                  <th className="p-4">Platform Feature</th>
                  <th className="p-4">Free Starter</th>
                  <th className="p-4">Basic (₦15k/mo)</th>
                  <th className="p-4 text-[#008751]">Premium (₦45k/mo)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                <tr>
                  <td className="p-4 font-bold text-stone-900">Active Listings Allowed</td>
                  <td className="p-4">{freeTier.listingLimit} listings</td>
                  <td className="p-4 font-bold">{basicTier.listingLimit} listings</td>
                  <td className="p-4 font-bold text-[#008751]">{premiumTier.listingLimit} listings</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-stone-900">Photos per Property</td>
                  <td className="p-4">2 photos</td>
                  <td className="p-4">10 photos</td>
                  <td className="p-4 font-bold text-[#008751]">Unlimited (fair use)</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-stone-900">Video Walkthroughs</td>
                  <td className="p-4 text-stone-400">None</td>
                  <td className="p-4">3 videos</td>
                  <td className="p-4 font-bold text-[#008751]">10 videos</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-stone-900">Search Placement</td>
                  <td className="p-4">Standard</td>
                  <td className="p-4">Standard</td>
                  <td className="p-4 font-bold text-[#008751]">Priority (Featured Top)</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-stone-900">Exclusive Search Pop-up</td>
                  <td className="p-4 text-stone-400">No</td>
                  <td className="p-4 text-stone-400">No</td>
                  <td className="p-4 font-bold text-[#008751]">Yes (Once per session in target area)</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-stone-900">Monthly Document Checks</td>
                  <td className="p-4 text-stone-400">0</td>
                  <td className="p-4">1 included / mo</td>
                  <td className="p-4 font-bold text-[#008751]">3 included / mo</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-stone-900">LASRERA Verification Mandate</td>
                  <td className="p-4 font-bold text-[#008751]">Mandatory</td>
                  <td className="p-4 font-bold text-[#008751]">Mandatory</td>
                  <td className="p-4 font-bold text-[#008751]">Mandatory</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Paystack Checkout Modal */}
      {selectedUpgradeTier && (
        <PaystackModal
          isOpen={true}
          onClose={() => setSelectedUpgradeTier(null)}
          targetTier={selectedUpgradeTier}
          billingCycle={billingCycle}
        />
      )}

      <Footer />
    </div>
  );
}

