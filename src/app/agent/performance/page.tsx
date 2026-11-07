"use client";

import React from "react";
import Link from "next/link";
import { AgentSidebar } from "@/components/agent/AgentSidebar";
import { useMarketplace } from "@/context/MarketplaceContext";
import { formatNaira, formatRentPrice } from "@/lib/utils";
import { Eye, Heart, MessageSquare, MessageCircle, BarChart3, TrendingUp } from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function AgentPerformancePage() {
  const { activeAgentId, listings } = useMarketplace();
  const agentListings = listings.filter((l) => l.agentId === activeAgentId);

  const chartData = agentListings.map((l) => ({
    name: l.title.length > 20 ? l.title.slice(0, 18) + "..." : l.title,
    views: l.views,
    enquiries: l.enquiriesCount,
    whatsapp: l.whatsappClicks,
  }));

  return (
    <div className="min-h-screen flex bg-[#FAFAF7] text-stone-900">
      <AgentSidebar />

      <main className="flex-1 p-6 sm:p-10 overflow-y-auto space-y-8 max-w-7xl">
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-ink font-display uppercase tracking-tight">
            Inventory Performance & Conversion Metrics
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Audit engagement channels, buyer saves, and high-intent WhatsApp inquiries per listing.
          </p>
        </div>

        {/* Visual Graph Card */}
        <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-stone-900 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[#008751]" />
              <span>Listing Views vs. WhatsApp Direct Inquiries</span>
            </h3>
            <span className="text-[10px] bg-emerald-50 text-[#008751] font-bold px-2 py-0.5 rounded">
              Live Real-Time Sync
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E4E3DB" />
                <XAxis dataKey="name" stroke="#5F6368" fontSize={10} />
                <YAxis stroke="#5F6368" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#151314",
                    borderRadius: "8px",
                    color: "#FFFFFF",
                    fontSize: "11px",
                  }}
                />
                <Bar dataKey="views" fill="#151314" radius={[4, 4, 0, 0]} name="Views" />
                <Bar dataKey="whatsapp" fill="#008751" radius={[4, 4, 0, 0]} name="WhatsApp" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Table of Listing Analytics */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="p-4 bg-[#FAFAF7] border-b border-stone-200">
            <h3 className="font-bold text-xs uppercase tracking-wide text-stone-700">
              Listing-by-Listing Conversion Breakdown
            </h3>
          </div>
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-stone-200 bg-stone-50 text-[10px] font-black uppercase text-stone-500">
                  <th className="p-4">Property</th>
                  <th className="p-4">Views</th>
                  <th className="p-4">Saves</th>
                  <th className="p-4">Enquiries</th>
                  <th className="p-4">WhatsApp Clicks</th>
                  <th className="p-4">Conv. Ratio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {agentListings.map((l) => {
                  const conversion = l.views > 0 ? (((l.enquiriesCount + l.whatsappClicks) / l.views) * 100).toFixed(1) : "0.0";
                  return (
                    <tr key={l.id} className="hover:bg-stone-50">
                      <td className="p-4">
                        <Link href={`/property/${l.id}`} className="font-bold text-stone-900 hover:text-[#008751]">
                          {l.title}
                        </Link>
                        <div className="text-[10px] text-stone-500">{l.area}</div>
                      </td>
                      <td className="p-4 font-mono font-bold">{l.views}</td>
                      <td className="p-4 font-mono">{l.saves}</td>
                      <td className="p-4 font-mono">{l.enquiriesCount}</td>
                      <td className="p-4 font-mono font-bold text-[#008751]">{l.whatsappClicks}</td>
                      <td className="p-4">
                        <span className="font-bold text-stone-800 bg-emerald-50 text-[#008751] px-2 py-0.5 rounded text-[11px]">
                          {conversion}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

