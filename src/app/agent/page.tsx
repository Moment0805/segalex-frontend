"use client";

import React from "react";
import Link from "next/link";
import { AgentSidebar } from "@/components/agent/AgentSidebar";
import { useMarketplace } from "@/context/MarketplaceContext";
import { formatNaira } from "@/lib/utils";
import {
  Building2,
  Eye,
  Heart,
  MessageSquare,
  MessageCircle,
  PlusCircle,
  AlertCircle,
  Clock,
  Award,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";

export default function AgentDashboardPage() {
  const { activeAgentId, agents, listings, tiers, enquiries } = useMarketplace();

  const agent = agents.find((a) => a.id === activeAgentId) || agents[0];
  const tierConfig = tiers.find((t) => t.tier === agent.tier) || tiers[0];
  const agentListings = listings.filter((l) => l.agentId === agent.id);
  const activeCount = agentListings.filter((l) => l.status === "live").length;

  // Aggregate metrics
  const totalViews = agentListings.reduce((sum, l) => sum + l.views, 0);
  const totalSaves = agentListings.reduce((sum, l) => sum + l.saves, 0);
  const totalEnquiries = agentListings.reduce((sum, l) => sum + l.enquiriesCount, 0);
  const totalWhatsAppClicks = agentListings.reduce((sum, l) => sum + l.whatsappClicks, 0);

  // Expiring listings in 7 days (mock based on 60 day rule)
  const expiringListings = agentListings.filter(
    (l) => l.status === "live" && (l.id === "prop-1" || l.id === "prop-3")
  );

  // Mock weekly activity for Recharts
  const activityData = [
    { day: "Mon", views: 240, enquiries: 14, whatsapp: 18 },
    { day: "Tue", views: 320, enquiries: 19, whatsapp: 24 },
    { day: "Wed", views: 410, enquiries: 22, whatsapp: 31 },
    { day: "Thu", views: 390, enquiries: 18, whatsapp: 27 },
    { day: "Fri", views: 480, enquiries: 29, whatsapp: 38 },
    { day: "Sat", views: 560, enquiries: 34, whatsapp: 45 },
    { day: "Sun", views: 430, enquiries: 25, whatsapp: 33 },
  ];

  const quotaPercent = Math.min(100, Math.round((activeCount / tierConfig.listingLimit) * 100));

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#FAFAF7] text-stone-900">
      <AgentSidebar />

      <main className="flex-1 w-full min-w-0 p-4 sm:p-6 lg:p-10 overflow-x-hidden space-y-6 sm:space-y-8 max-w-7xl">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-ink font-display uppercase tracking-tight">
                Welcome, {agent.name.split(" ")[0]}
              </h1>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-[#008751] px-2 py-0.5 rounded border border-emerald-200">
                Verified Broker
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              {agent.agencyName} • License: {agent.lasreraNumber}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/agent/listings/new"
              className="py-2.5 px-4 bg-[#008751] hover:bg-[#00563A] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post New Property</span>
            </Link>
          </div>
        </div>

        {/* Tier Limit Progress Bar & Expiring Notice */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Tier Gauge Card */}
          <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase text-stone-400 block">
                  Active Listings Quota
                </span>
                <span className="text-base font-bold text-stone-900">
                  {activeCount} of {tierConfig.listingLimit} Listings Used
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-stone-400 block">
                  Current Tier
                </span>
                <span className="font-mono font-bold text-xs uppercase bg-[#FFC800] text-[#151314] px-2 py-0.5 rounded">
                  {agent.tier} Plan
                </span>
              </div>
            </div>

            {/* Visual Progress Bar */}
            <div className="w-full h-3 bg-stone-100 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 rounded-full ${
                  quotaPercent > 80 ? "bg-amber-500" : "bg-[#008751]"
                }`}
                style={{ width: `${quotaPercent}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-stone-500">
              <span>{tierConfig.listingLimit - activeCount} listing slots remaining</span>
              {agent.tier !== "premium" && (
                <Link
                  href="/agent/billing"
                  className="font-bold text-[#008751] hover:underline flex items-center gap-1"
                >
                  <Award className="w-3.5 h-3.5 text-[#FFC800]" />
                  <span>Upgrade to Premium for 50 listings →</span>
                </Link>
              )}
            </div>
          </div>

          {/* Renewal Date Card */}
          <div className="lg:col-span-4 bg-[#151314] text-white rounded-2xl p-6 border border-stone-800 shadow-sm flex flex-col justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase text-[#FFC800]">
                Subscription Cycle
              </span>
              <h4 className="text-lg font-bold text-white">Tier Renews in 24 Days</h4>
              <p className="text-xs text-stone-400">
                Automatic renewal enabled via Paystack tokenization.
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-stone-400">Monthly Checks:</span>
              <span className="font-bold text-[#FFC800]">
                {tierConfig.monthlyDocChecks} included / mo
              </span>
            </div>
          </div>
        </div>

        {/* 4 Performance KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase text-stone-400">Total Views</span>
              <Eye className="w-4 h-4 text-stone-400" />
            </div>
            <div className="text-2xl font-black font-display text-stone-900">{totalViews}</div>
            <span className="text-[10px] text-[#008751] font-bold">↑ +14% vs last week</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase text-stone-400">Buyer Saves</span>
              <Heart className="w-4 h-4 text-stone-400" />
            </div>
            <div className="text-2xl font-black font-display text-stone-900">{totalSaves}</div>
            <span className="text-[10px] text-[#008751] font-bold">↑ +8% vs last week</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase text-stone-400">Inquiries</span>
              <MessageSquare className="w-4 h-4 text-[#008751]" />
            </div>
            <div className="text-2xl font-black font-display text-stone-900">{totalEnquiries}</div>
            <span className="text-[10px] text-[#008751] font-bold">↑ +21% lead surge</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase text-stone-400">WhatsApp Clicks</span>
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
            </div>
            <div className="text-2xl font-black font-display text-[#008751]">
              {totalWhatsAppClicks}
            </div>
            <span className="text-[10px] text-[#008751] font-bold">High intent direct chats</span>
          </div>
        </div>

        {/* Recharts Analytics Graph */}
        <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-stone-900">
                Weekly Engagement & Lead Conversion
              </h3>
              <p className="text-xs text-stone-500">
                Track views, enquiry form submissions, and direct WhatsApp launches
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1 text-stone-600 font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-[#151314]" />
                Views
              </span>
              <span className="flex items-center gap-1 text-stone-600 font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-[#008751]" />
                WhatsApp
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E4E3DB" />
                <XAxis dataKey="day" stroke="#5F6368" fontSize={11} />
                <YAxis stroke="#5F6368" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#151314",
                    borderRadius: "8px",
                    color: "#FFFFFF",
                    fontSize: "11px",
                    border: "none",
                  }}
                />
                <Bar dataKey="views" fill="#151314" radius={[4, 4, 0, 0]} />
                <Bar dataKey="whatsapp" fill="#008751" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 7-Day Expiry Reminder (60-Day Freshness Rule) */}
        {expiringListings.length > 0 && (
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-amber-100 text-amber-800 flex-shrink-0">
                <Clock className="w-5 h-5 text-amber-700" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-black text-xs uppercase tracking-wider text-amber-900">
                    7-Day Expiry Reminder
                  </h4>
                  <span className="px-1.5 py-0.2 rounded text-[10px] font-black uppercase bg-amber-200 text-amber-900 font-mono">
                    Action Required
                  </span>
                </div>
                <p className="text-[11px] text-amber-800 mt-0.5 leading-relaxed">
                  <strong>{expiringListings.length} of your listings</strong> will expire in less than 7 days under the platform's 60-day freshness rule. Renew them now with 1-click to maintain priority placement and active WhatsApp lead routing.
                </p>
              </div>
            </div>
            <Link
              href="/agent/listings"
              className="px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white font-bold rounded-xl text-xs whitespace-nowrap shadow-sm text-center flex-shrink-0"
            >
              Review & Renew Now
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}

