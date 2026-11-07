"use client";

import React from "react";
import Link from "next/link";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { useMarketplace } from "@/context/MarketplaceContext";
import { formatNaira } from "@/lib/utils";
import {
  ShieldCheck,
  Building2,
  Users,
  MessageSquare,
  CreditCard,
  UserCheck,
  FileCheck2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Clock,
} from "lucide-react";

export default function AdminOverviewPage() {
  const { agents, listings, enquiries, auditLogs, tiers } = useMarketplace();

  const verifiedAgents = agents.filter((a) => a.verificationStatus === "verified").length;
  const pendingAgents = agents.filter((a) => a.verificationStatus === "pending").length;
  const liveListings = listings.filter((l) => l.status === "live").length;
  const docCheckedListings = listings.filter((l) => l.isDocumentsChecked).length;

  // Mock platform monthly revenue calculation based on active tiers
  const mockRevenue = agents.reduce((sum, a) => {
    if (a.verificationStatus !== "verified") return sum;
    if (a.tier === "basic") return sum + 15000;
    if (a.tier === "premium") return sum + 45000;
    return sum;
  }, 0);

  return (
    <div className="min-h-screen flex bg-[#FAFAF7] text-stone-900">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-10 overflow-y-auto space-y-8 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-ink font-display uppercase tracking-tight">
                Marketplace Compliance & Oversight Desk
              </h1>
              <span className="text-[10px] font-bold uppercase bg-[#FFC800] text-[#151314] px-2 py-0.5 rounded font-mono">
                Admin Lead
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              Operating under Segalex Resources Global Limited (RC 7351342) • Lagos, Nigeria
            </p>
          </div>
        </div>

        {/* 5 KPI Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-1">
            <span className="text-[10px] font-bold uppercase text-stone-400">Verified Agents</span>
            <div className="text-2xl font-black font-display text-stone-900">{verifiedAgents}</div>
            <span className="text-[10px] text-[#008751] font-bold flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              LASRERA Active
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-1">
            <span className="text-[10px] font-bold uppercase text-stone-400">Live Inventory</span>
            <div className="text-2xl font-black font-display text-stone-900">{liveListings}</div>
            <span className="text-[10px] text-stone-500">60-day rule enforced</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-1">
            <span className="text-[10px] font-bold uppercase text-stone-400">Documents Checked</span>
            <div className="text-2xl font-black font-sans text-[#008751]">{docCheckedListings}</div>
            <span className="text-[10px] text-stone-500">Cadastral verified</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-1">
            <span className="text-[10px] font-bold uppercase text-stone-400">Total Leads Handled</span>
            <div className="text-2xl font-black font-display text-stone-900">{enquiries.length}</div>
            <span className="text-[10px] text-[#008751] font-bold">WhatsApp + Form</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-1">
            <span className="text-[10px] font-bold uppercase text-stone-400">Est. Subscription Run-Rate</span>
            <div className="text-2xl font-black font-sans text-[#008751]">
              {formatNaira(mockRevenue)}
            </div>
            <span className="text-[10px] text-stone-500">Monthly recurring</span>
          </div>
        </div>

        {/* Action Banners & Queues */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Agent Queue Summary */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-[#008751]" />
                  Agent Verification Queue
                </span>
                {pendingAgents > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold text-xs animate-pulse">
                    {pendingAgents} Pending
                  </span>
                )}
              </div>
              <h3 className="font-bold text-base text-stone-900">
                {pendingAgents} Broker Application{pendingAgents === 1 ? "" : "s"} Awaiting Audit
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Review submitted LASRERA registration codes, CAC business documentation, and biometric IDs.
              </p>
            </div>
            <div className="pt-6 mt-4 border-t border-stone-100">
              <Link
                href="/admin/agents"
                className="w-full py-2.5 px-4 bg-[#151314] hover:bg-black text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <span>Open Agent Verification Queue</span>
                <ArrowRight className="w-4 h-4 text-[#FFC800]" />
              </Link>
            </div>
          </div>

          {/* Document Checks Split Station */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
                  <FileCheck2 className="w-4 h-4 text-[#008751]" />
                  Cadastral Title Inspections
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-[#008751] font-bold text-xs">
                  Active Station
                </span>
              </div>
              <h3 className="font-bold text-base text-stone-900">
                Split-Screen Title Deed & Map Workstation
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Inspect uploaded C of O / Governor's Consent documents side-by-side with surveyed GIS boundary coordinates.
              </p>
            </div>
            <div className="pt-6 mt-4 border-t border-stone-100">
              <Link
                href="/admin/documents"
                className="w-full py-2.5 px-4 bg-[#008751] hover:bg-[#00563A] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <span>Launch Document Workstation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Audit Log Preview */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="p-4 bg-[#FAFAF7] border-b border-stone-200 flex items-center justify-between">
            <h3 className="font-bold text-xs uppercase tracking-wide text-stone-700">
              Recent Administrative Audit Trail
            </h3>
            <Link href="/admin/audit-log" className="text-xs font-bold text-[#008751] hover:underline">
              View Full Audit Log ({auditLogs.length}) →
            </Link>
          </div>

          <div className="divide-y divide-stone-100 text-xs">
            {auditLogs.slice(0, 4).map((log) => (
              <div key={log.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-stone-900">{log.action}</span>
                    <span className="text-[10px] bg-stone-100 px-2 py-0.5 rounded font-mono uppercase text-stone-600">
                      {log.entityType}
                    </span>
                  </div>
                  <p className="text-stone-600 text-xs mt-0.5">
                    <strong>{log.entityName}</strong>: {log.reason}
                  </p>
                </div>
                <div className="text-[10px] text-stone-400 font-mono whitespace-nowrap">
                  {new Date(log.timestamp).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

