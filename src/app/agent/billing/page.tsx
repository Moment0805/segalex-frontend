"use client";

import React, { useState } from "react";
import { AgentSidebar } from "@/components/agent/AgentSidebar";
import { PaystackModal } from "@/components/agent/PaystackModal";
import { useMarketplace } from "@/context/MarketplaceContext";
import { formatNaira } from "@/lib/utils";
import { AgentTier } from "@/types";
import {
  CreditCard,
  Award,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Download,
  ShieldCheck,
} from "lucide-react";

export default function AgentBillingPage() {
  const { activeAgentId, agents, tiers } = useMarketplace();
  const [showGraceBanner, setShowGraceBanner] = useState(false);
  const [selectedUpgradeTier, setSelectedUpgradeTier] = useState<AgentTier | null>(null);

  const agent = agents.find((a) => a.id === activeAgentId) || agents[0];
  const tierConfig = tiers.find((t) => t.tier === agent.tier) || tiers[0];

  const paymentHistory = [
    {
      id: "INV-2024-1002",
      date: "01 Oct 2024",
      plan: `${tierConfig.name} (Monthly)`,
      amount: tierConfig.monthlyPrice,
      status: "Successful",
      method: "Mastercard •••• 0840",
    },
    {
      id: "INV-2024-0901",
      date: "01 Sep 2024",
      plan: `${tierConfig.name} (Monthly)`,
      amount: tierConfig.monthlyPrice,
      status: "Successful",
      method: "Mastercard •••• 0840",
    },
  ];

  return (
    <div className="min-h-screen flex bg-[#FAFAF7] text-stone-900">
      <AgentSidebar />

      <main className="flex-1 p-6 sm:p-10 overflow-y-auto space-y-8 max-w-5xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-ink font-display uppercase tracking-tight">
              Subscription & Paystack Billing
            </h1>
            <p className="text-xs text-stone-500 mt-0.5">
              Manage your verified brokerage tier, billing cycles, and invoice receipts.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowGraceBanner(!showGraceBanner)}
            className="text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-300 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>{showGraceBanner ? "Hide Grace Demo" : "Simulate Failed-Payment Grace Banner"}</span>
          </button>
        </div>

        {/* Failed Payment Grace Period Banner Demo */}
        {showGraceBanner && (
          <div className="p-4 rounded-2xl bg-amber-500 text-stone-900 border-2 border-amber-600 shadow-md flex items-start justify-between gap-4 animate-in slide-in-from-top duration-200">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-stone-900 flex-shrink-0 mt-0.5" />
              <div className="space-y-0.5 text-xs">
                <span className="font-black text-sm uppercase tracking-wide">
                  Card Charge Failed: 7-Day Grace Period Active
                </span>
                <p className="leading-relaxed">
                  Your last recurring charge for the <strong>{tierConfig.name}</strong> was declined by
                  your card issuer. Your active listings remain live under our 7-day grace protocol.
                  Please update your payment method within 5 days to avoid listing pausing.
                </p>
              </div>
            </div>
            <button
              onClick={() => setSelectedUpgradeTier(agent.tier)}
              className="px-4 py-2 bg-stone-900 text-white rounded-lg font-bold text-xs whitespace-nowrap shadow-sm hover:bg-black"
            >
              Update Payment Card
            </button>
          </div>
        )}

        {/* Current Active Plan Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider bg-[#FFC800] text-[#151314] px-2 py-0.5 rounded font-mono">
                {agent.tier} Plan Active
              </span>
              <span className="text-xs text-[#008751] font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Auto-Renew Enabled
              </span>
            </div>

            <h3 className="text-2xl font-black text-stone-900 leading-tight">
              {tierConfig.name}
            </h3>
            <p className="text-xs text-stone-600 max-w-md">{tierConfig.description}</p>

            <div className="flex items-center gap-3 pt-2 text-xs text-stone-500">
              <span>Cost: <strong>{formatNaira(tierConfig.monthlyPrice)} / month</strong></span>
              <span>•</span>
              <span>Quota: <strong>{tierConfig.listingLimit} Listings</strong></span>
              <span>•</span>
              <span>Checks: <strong>{tierConfig.monthlyDocChecks} included / mo</strong></span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch gap-2.5 flex-shrink-0">
            {agent.tier !== "premium" ? (
              <button
                type="button"
                onClick={() => setSelectedUpgradeTier("premium")}
                className="py-3 px-6 bg-[#008751] hover:bg-[#00563A] text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <Award className="w-4 h-4 text-[#FFC800]" />
                <span>Upgrade to Premium (₦45k)</span>
              </button>
            ) : (
              <span className="text-xs font-bold text-[#008751] bg-emerald-50 px-4 py-2.5 rounded-xl border border-emerald-200 text-center">
                Top Tier Active
              </span>
            )}
          </div>
        </div>

        {/* Payment History Invoices Table */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="p-4 bg-[#FAFAF7] border-b border-stone-200 flex items-center justify-between">
            <h3 className="font-bold text-xs uppercase tracking-wide text-stone-700">
              Paystack Settlement & Invoicing Records
            </h3>
            <span className="text-[10px] text-stone-400 font-mono">Currency: NGN</span>
          </div>

          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-stone-200 bg-stone-50 text-[10px] font-black uppercase text-stone-500">
                  <th className="p-4">Invoice Ref</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Description</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {paymentHistory.map((inv) => (
                  <tr key={inv.id} className="hover:bg-stone-50">
                    <td className="p-4 font-mono font-bold text-stone-800">{inv.id}</td>
                    <td className="p-4 text-stone-600">{inv.date}</td>
                    <td className="p-4 font-semibold text-stone-900">{inv.plan}</td>
                    <td className="p-4 font-mono font-bold text-[#008751]">
                      {formatNaira(inv.amount)}
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-[#008751] border border-emerald-200">
                        {inv.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        type="button"
                        className="p-1.5 rounded hover:bg-stone-200 text-stone-600"
                        title="Download Receipt"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Paystack Modal */}
      {selectedUpgradeTier && (
        <PaystackModal
          isOpen={true}
          onClose={() => setSelectedUpgradeTier(null)}
          targetTier={selectedUpgradeTier}
          billingCycle="monthly"
        />
      )}
    </div>
  );
}

