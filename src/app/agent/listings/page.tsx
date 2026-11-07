"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AgentSidebar } from "@/components/agent/AgentSidebar";
import { useMarketplace } from "@/context/MarketplaceContext";
import { ListingStatus } from "@/types";
import { formatNaira, formatRentPrice } from "@/lib/utils";
import { showToast } from "@/components/ui/Toast";
import {
  PlusCircle,
  Eye,
  Pause,
  Play,
  RotateCw,
  CheckCircle,
  ExternalLink,
  FileCheck2,
  MapPin,
  Filter,
} from "lucide-react";

export default function AgentListingsManagerPage() {
  const { activeAgentId, listings, updateListingStatus } = useMarketplace();
  const [filter, setFilter] = useState<"all" | ListingStatus>("all");

  const agentListings = listings.filter((l) => l.agentId === activeAgentId);

  const filtered = agentListings.filter((l) => {
    if (filter === "all") return true;
    return l.status === filter;
  });

  const handleStatusChange = (id: string, newStatus: ListingStatus, title: string) => {
    updateListingStatus(id, newStatus);
    showToast(`Listing ${newStatus.toUpperCase()}`, `${title.slice(0, 30)} status updated.`);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#FAFAF7] text-stone-900">
      <AgentSidebar />

      <main className="flex-1 w-full min-w-0 p-4 sm:p-6 lg:p-10 overflow-x-hidden space-y-6 max-w-7xl">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-ink font-display uppercase tracking-tight">
              Listings Inventory Manager
            </h1>
            <p className="text-xs text-stone-500 mt-0.5">
              Manage live statuses, renewals, and sales conversions.
            </p>
          </div>

          <Link
            href="/agent/listings/new"
            className="py-2.5 px-4 bg-[#008751] hover:bg-[#00563A] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Post New Listing</span>
          </Link>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-xl p-3 border border-stone-200 shadow-sm flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {(["all", "live", "paused", "expired", "sold", "let"] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-3 py-1.5 rounded-lg font-bold capitalize transition-all whitespace-nowrap ${
                  filter === status
                    ? "bg-[#151314] text-white shadow-sm"
                    : "text-stone-600 hover:bg-stone-100"
                }`}
              >
                {status} ({status === "all" ? agentListings.length : agentListings.filter((l) => l.status === status).length})
              </button>
            ))}
          </div>
        </div>

        {/* Listings Table / Cards */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto text-xs">
            <table className="w-full min-w-[700px] text-left">
              <thead>
                <tr className="border-b border-stone-200 bg-[#FAFAF7] text-[10px] font-black uppercase tracking-wider text-stone-500">
                  <th className="p-4">Property</th>
                  <th className="p-4">Price (Naira)</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Verification</th>
                  <th className="p-4">Engagement</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filtered.map((listing) => {
                  const statusColors = {
                    live: "bg-emerald-50 text-[#008751] border-emerald-200",
                    paused: "bg-amber-50 text-amber-700 border-amber-200",
                    expired: "bg-red-50 text-red-600 border-red-200",
                    sold: "bg-stone-100 text-stone-700 border-stone-200",
                    let: "bg-stone-100 text-stone-700 border-stone-200",
                  };

                  return (
                    <tr key={listing.id} className="hover:bg-stone-50/70 transition-colors">
                      {/* Property Thumbnail & Info */}
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={listing.photos[0]}
                            alt={listing.title}
                            className="w-14 h-11 rounded-lg object-cover flex-shrink-0 bg-stone-100"
                          />
                          <div className="min-w-0 max-w-xs">
                            <Link
                              href={`/property/${listing.id}`}
                              className="font-bold text-stone-900 hover:text-[#008751] truncate block"
                            >
                              {listing.title}
                            </Link>
                            <span className="text-[10px] text-stone-500 flex items-center gap-1 mt-0.5">
                              <MapPin className="w-3 h-3" />
                              {listing.area}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Price (Rendered in font-sans to guarantee unclipped ₦ Naira glyph) */}
                      <td className="p-4 font-black font-sans text-sm text-stone-900">
                        {listing.purpose === "rent"
                          ? formatRentPrice(listing.price, false)
                          : formatNaira(listing.price, false)}
                      </td>

                      {/* Status Chip */}
                      <td className="p-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                            statusColors[listing.status]
                          }`}
                        >
                          {listing.status}
                        </span>
                      </td>

                      {/* Verification Badge */}
                      <td className="p-4">
                        {listing.isDocumentsChecked ? (
                          <span className="text-[10px] font-bold text-[#008751] flex items-center gap-1">
                            <FileCheck2 className="w-3 h-3 text-[#FFC800]" />
                            Documents Checked
                          </span>
                        ) : (
                          <span className="text-[10px] text-stone-400 font-semibold">Standard</span>
                        )}
                      </td>

                      {/* Metrics */}
                      <td className="p-4 text-stone-600 text-[11px]">
                        <div>{listing.views} views • {listing.saves} saves</div>
                        <div className="text-[10px] text-[#008751] font-semibold">
                          {listing.whatsappClicks} WhatsApp chats
                        </div>
                      </td>

                      {/* Action Controls */}
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {listing.status === "live" ? (
                            <button
                              onClick={() => handleStatusChange(listing.id, "paused", listing.title)}
                              className="p-1.5 rounded hover:bg-stone-200 text-stone-600"
                              title="Pause Listing"
                            >
                              <Pause className="w-3.5 h-3.5" />
                            </button>
                          ) : (
                            <button
                              onClick={() => handleStatusChange(listing.id, "live", listing.title)}
                              className="p-1.5 rounded hover:bg-emerald-100 text-[#008751]"
                              title="Set Live"
                            >
                              <Play className="w-3.5 h-3.5" />
                            </button>
                          )}

                          <button
                            onClick={() =>
                              handleStatusChange(
                                listing.id,
                                listing.purpose === "rent" ? "let" : "sold",
                                listing.title
                              )
                            }
                            className="p-1.5 rounded hover:bg-stone-200 text-stone-600"
                            title={listing.purpose === "rent" ? "Mark as Let" : "Mark as Sold"}
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                          </button>

                          <Link
                            href={`/property/${listing.id}`}
                            className="p-1.5 rounded hover:bg-stone-200 text-stone-600"
                            title="View Public Page"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                        </div>
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

