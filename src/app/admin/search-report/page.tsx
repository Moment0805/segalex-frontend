"use client";

import React from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Search, TrendingUp, AlertCircle, MapPin } from "lucide-react";

export default function AdminSearchReportPage() {
  const topSearches = [
    { query: "Land in Ibeju-Lekki", count: 4890, growth: "+38%", category: "Land" },
    { query: "4-Bed Duplex Lekki Phase 1", count: 3410, growth: "+14%", category: "Residential" },
    { query: "Banana Island Waterfront", count: 2950, growth: "+22%", category: "Luxury" },
    { query: "Ikoyi Serviced Apartments", count: 2420, growth: "+9%", category: "Rental" },
    { query: "Commercial Warehouse Gbagada", count: 1840, growth: "+11%", category: "Commercial" },
    { query: "600 sqm Dry Plot Epe", count: 1680, growth: "+45%", category: "Land" },
  ];

  const zeroResultSearches = [
    {
      query: "3-Bed Flat in Banana Island under ₦5m/yr",
      count: 420,
      note: "Unrealistic market expectation (avg Banana Island rent is ₦25m/yr).",
    },
    {
      query: "Land with Federal C of O in Ajah under ₦10m",
      count: 280,
      note: "High unmet demand; alert agents for acquisition leads.",
    },
    {
      query: "Commercial cold-room warehouse Epe",
      count: 145,
      note: "Growing agribusiness interest along Epe expressway.",
    },
  ];

  return (
    <div className="min-h-screen flex bg-[#FAFAF7] text-stone-900">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-10 overflow-y-auto space-y-8 max-w-7xl">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-ink font-display uppercase tracking-tight">
            Lagos Search Intelligence & Buyer Demand Analytics
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Identify market trends, high-volume keyword queries, and unmet buyer inventory demand.
          </p>
        </div>

        {/* Top Searches Table */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="p-4 bg-[#FAFAF7] border-b border-stone-200 flex items-center justify-between">
            <h3 className="font-bold text-xs uppercase tracking-wide text-stone-700 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#008751]" />
              <span>Most Popular Search Queries in Lagos</span>
            </h3>
            <span className="text-[10px] text-stone-500 font-mono">Last 30 Days</span>
          </div>

          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-stone-200 bg-stone-50 text-[10px] font-black uppercase text-stone-500">
                  <th className="p-4">Search Keyword / Filter</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Search Volume</th>
                  <th className="p-4">Month-on-Month Growth</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {topSearches.map((s, idx) => (
                  <tr key={idx} className="hover:bg-stone-50">
                    <td className="p-4 font-bold text-stone-900 flex items-center gap-2">
                      <Search className="w-3.5 h-3.5 text-stone-400" />
                      <span>{s.query}</span>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#F1F0EA] text-stone-700">
                        {s.category}
                      </span>
                    </td>
                    <td className="p-4 font-mono font-bold text-stone-900">
                      {s.count.toLocaleString()} searches
                    </td>
                    <td className="p-4 font-bold text-[#008751]">{s.growth}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Zero Results Analysis */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="p-4 bg-[#FAFAF7] border-b border-stone-200 flex items-center justify-between">
            <h3 className="font-bold text-xs uppercase tracking-wide text-stone-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span>Zero-Result Queries (Unmet Inventory Opportunities)</span>
            </h3>
            <span className="text-[10px] text-amber-700 bg-amber-100 px-2 py-0.5 rounded font-bold">
              Agency Lead Opportunities
            </span>
          </div>

          <div className="divide-y divide-stone-100 text-xs">
            {zeroResultSearches.map((z, idx) => (
              <div key={idx} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="font-bold text-stone-900 block">"{z.query}"</span>
                  <p className="text-stone-500 text-[11px]">{z.note}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-stone-700 block">
                    {z.count} queries
                  </span>
                  <span className="text-[10px] text-stone-400">Zero matching listings</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

