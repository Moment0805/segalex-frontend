"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { useMarketplace } from "@/context/MarketplaceContext";
import { showToast } from "@/components/ui/Toast";
import { ListingStatus } from "@/types";
import { formatNaira, formatRentPrice } from "@/lib/utils";
import {
  Building2,
  AlertTriangle,
  Pause,
  Play,
  Trash2,
  ExternalLink,
  ShieldAlert,
  CheckCircle2,
} from "lucide-react";

export default function AdminListingsModerationPage() {
  const { listings, updateListingStatus, recordAuditLog } = useMarketplace();
  const [activeTab, setActiveTab] = useState<"listings" | "reports">("listings");

  const [reports, setReports] = useState([
    {
      id: "rep-1",
      listingId: "prop-9",
      listingTitle: "2-Bedroom Serviced Apartment near Tejuosho & Tech Hubs",
      reporter: "chinedu.investor@example.com",
      reason: "Agent requested viewing fee of ₦10,000 before physical inspection.",
      status: "Investigating",
      date: "2024-11-02",
    },
    {
      id: "rep-2",
      listingId: "prop-13",
      listingTitle: "4-Bedroom Contemporary Terrace Duplex in Badore Corridor",
      reporter: "mrs.folake@example.com",
      reason: "Property reported as already let out yesterday.",
      status: "Resolved",
      date: "2024-10-29",
    },
  ]);

  const handleUnpublish = (listingId: string, title: string) => {
    updateListingStatus(listingId, "paused");
    recordAuditLog({
      action: "Admin Paused/Unpublished Listing",
      entityType: "listing",
      entityId: listingId,
      entityName: title,
      reason: "Administrative moderation intervention.",
    });
    showToast("Listing Unpublished", `${title.slice(0, 30)} removed from public view.`);
  };

  const handlePublish = (listingId: string, title: string) => {
    updateListingStatus(listingId, "live");
    recordAuditLog({
      action: "Admin Restored Listing Live Status",
      entityType: "listing",
      entityId: listingId,
      entityName: title,
      reason: "Compliance checks cleared.",
    });
    showToast("Listing Reinstated", `${title.slice(0, 30)} is now live.`);
  };

  const handleResolveReport = (reportId: string) => {
    setReports((prev) =>
      prev.map((r) => (r.id === reportId ? { ...r, status: "Resolved" } : r))
    );
    showToast("Report Resolved", "Compliance ticket closed.");
  };

  return (
    <div className="min-h-screen flex bg-[#FAFAF7] text-stone-900">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-10 overflow-y-auto space-y-6 max-w-7xl">
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-ink font-display uppercase tracking-tight">
            Listings Moderation & Dispute Desk
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Maintain platform trust by auditing reported properties and managing live statuses.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 border-b border-stone-200 pb-2 text-xs font-bold uppercase tracking-wider">
          <button
            onClick={() => setActiveTab("listings")}
            className={`pb-2 px-3 border-b-2 transition-all ${
              activeTab === "listings"
                ? "border-[#008751] text-[#008751]"
                : "border-transparent text-stone-500 hover:text-stone-900"
            }`}
          >
            All Published Listings ({listings.length})
          </button>
          <button
            onClick={() => setActiveTab("reports")}
            className={`pb-2 px-3 border-b-2 transition-all flex items-center gap-2 ${
              activeTab === "reports"
                ? "border-red-600 text-red-600"
                : "border-transparent text-stone-500 hover:text-stone-900"
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Reported Listings Queue ({reports.filter((r) => r.status !== "Resolved").length})</span>
          </button>
        </div>

        {activeTab === "listings" ? (
          /* All Listings Table */
          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto text-xs">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-stone-200 bg-stone-50 text-[10px] font-black uppercase text-stone-500">
                    <th className="p-4">Property</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Area</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Moderation Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {listings.map((l) => (
                    <tr key={l.id} className="hover:bg-stone-50">
                      <td className="p-4">
                        <Link href={`/property/${l.id}`} className="font-bold text-stone-900 hover:text-[#008751] block truncate max-w-sm">
                          {l.title}
                        </Link>
                        <span className="text-[10px] text-stone-400 font-mono">ID: {l.id}</span>
                      </td>

                      <td className="p-4 font-black font-sans text-sm text-stone-900">
                        {l.purpose === "rent"
                          ? formatRentPrice(l.price, false)
                          : formatNaira(l.price, false)}
                      </td>

                      <td className="p-4 font-semibold text-stone-700">{l.area}</td>

                      <td className="p-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            l.status === "live"
                              ? "bg-emerald-50 text-[#008751]"
                              : "bg-amber-50 text-amber-700"
                          }`}
                        >
                          {l.status}
                        </span>
                      </td>

                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {l.status === "live" ? (
                            <button
                              type="button"
                              onClick={() => handleUnpublish(l.id, l.title)}
                              className="px-2.5 py-1 bg-amber-50 text-amber-800 hover:bg-amber-100 rounded text-xs font-bold"
                            >
                              Unpublish
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handlePublish(l.id, l.title)}
                              className="px-2.5 py-1 bg-emerald-50 text-[#008751] hover:bg-emerald-100 rounded text-xs font-bold"
                            >
                              Set Live
                            </button>
                          )}
                          <Link
                            href={`/property/${l.id}`}
                            className="p-1.5 rounded hover:bg-stone-100 text-stone-600"
                            title="Inspect page"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* Reports Queue */
          <div className="space-y-4">
            {reports.map((rep) => (
              <div
                key={rep.id}
                className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-stone-900 text-sm">{rep.listingTitle}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        rep.status === "Resolved"
                          ? "bg-emerald-50 text-[#008751]"
                          : "bg-red-50 text-red-600"
                      }`}
                    >
                      {rep.status}
                    </span>
                  </div>
                  <p className="text-stone-700 leading-relaxed font-semibold">
                    Issue: "{rep.reason}"
                  </p>
                  <div className="text-[11px] text-stone-400">
                    Reporter: {rep.reporter} • Filed on {rep.date}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {rep.status !== "Resolved" && (
                    <button
                      type="button"
                      onClick={() => handleResolveReport(rep.id)}
                      className="px-4 py-2 bg-[#008751] hover:bg-[#00563A] text-white rounded-lg font-bold text-xs"
                    >
                      Mark Resolved
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => handleUnpublish(rep.listingId, rep.listingTitle)}
                    className="px-3.5 py-2 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-lg font-bold text-xs"
                  >
                    Suspend Listing
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

