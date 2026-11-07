"use client";

import React, { useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { DocSplitViewer } from "@/components/admin/DocSplitViewer";
import { useMarketplace } from "@/context/MarketplaceContext";
import { PropertyListing } from "@/types";
import { formatNaira, formatRentPrice } from "@/lib/utils";
import {
  FileCheck2,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  ExternalLink,
  Split,
  Eye,
  AlertTriangle,
  RotateCcw,
} from "lucide-react";
import { showToast } from "@/components/ui/Toast";

export default function AdminDocumentsQueuePage() {
  const { listings, simulatePinShift } = useMarketplace();
  const [selectedListing, setSelectedListing] = useState<PropertyListing | null>(null);

  const handleSimulatePinShift = (listing: PropertyListing) => {
    simulatePinShift(listing.id);
    showToast(
      "Badge Lapsed Automatically!",
      `Agent shifted map pin on "${listing.title}". Coordinates mismatch detected. Badge revoked.`
    );
  };

  // Show listings with document audit requests or active verified badges
  const auditListings = listings.filter((l) => l.isDocumentsChecked || l.documentDetails?.titleReferenceNumber || l.id === "prop-30");

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#FAFAF7] text-stone-900">
      <AdminSidebar />

      <main className="flex-1 w-full min-w-0 p-4 sm:p-6 lg:p-10 overflow-x-hidden space-y-6 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-ink font-display uppercase tracking-tight">
              Cadastral Document Auditing Workstation
            </h1>
            <p className="text-xs text-stone-500 mt-0.5">
              Cross-reference uploaded deeds, C of O certificates, and GIS coordinates against Lagos State survey records.
            </p>
          </div>
        </div>

        {/* Informational Guidance Banner */}
        <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-sm flex items-start gap-3 text-xs text-stone-700">
          <div className="p-2 rounded-lg bg-[#008751]/10 text-[#008751] flex-shrink-0">
            <Split className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-stone-900 text-sm block">
              Side-by-Side Split Verification Protocol
            </span>
            <p className="leading-relaxed mt-0.5">
              Click <strong>"Launch Split Audit"</strong> on any property below to open the dual-pane workstation. The left pane renders the uploaded deed instrument, and the right pane displays the interactive Leaflet cadastral map with the surveyed boundary polygon.
            </p>
          </div>
        </div>

        {/* Listings Requiring Document Check */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="p-4 bg-[#FAFAF7] border-b border-stone-200 flex items-center justify-between">
            <h3 className="font-bold text-xs uppercase tracking-wide text-stone-700">
              Title Instruments Ready for Cadastral Verification
            </h3>
            <span className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded font-mono">
              Total Auditable: {auditListings.length}
            </span>
          </div>

          <div className="overflow-x-auto text-xs">
            <table className="w-full min-w-[700px] text-left">
              <thead>
                <tr className="border-b border-stone-200 bg-stone-50 text-[10px] font-black uppercase text-stone-500">
                  <th className="p-4">Property</th>
                  <th className="p-4">Area / Location</th>
                  <th className="p-4">Current Title Status</th>
                  <th className="p-4">Instrument Folio</th>
                  <th className="p-4 text-right">Audit Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {auditListings.map((listing) => (
                  <tr key={listing.id} className="hover:bg-stone-50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={listing.photos[0]}
                          alt={listing.title}
                          className="w-12 h-10 rounded-lg object-cover bg-stone-100 flex-shrink-0"
                        />
                        <div className="min-w-0 max-w-xs">
                          <span className="font-bold text-stone-900 truncate block">
                            {listing.title}
                          </span>
                          <span className="text-[10px] text-stone-500">
                            {listing.purpose === "rent"
                              ? formatRentPrice(listing.price, true)
                              : formatNaira(listing.price, true)}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="p-4 font-semibold text-stone-700">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-stone-400" />
                        <span>{listing.area}</span>
                      </div>
                    </td>

                    <td className="p-4">
                      {listing.isDocumentsChecked ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#151314] text-white border border-[#FFC800] inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-[#FFC800]" />
                          Badge Granted
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-50 text-amber-700 border border-amber-200">
                          Pending Audit
                        </span>
                      )}
                    </td>

                    <td className="p-4 font-mono text-[11px] text-stone-600">
                      {listing.documentDetails?.titleReferenceNumber || "AWAITING_UPLOAD"}
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {listing.isDocumentsChecked && (
                          <button
                            type="button"
                            onClick={() => handleSimulatePinShift(listing)}
                            className="py-1.5 px-2.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 rounded-lg text-[11px] font-bold inline-flex items-center gap-1 transition-colors"
                            title="Demonstrate badge integrity: simulate agent shifting coordinates after audit"
                          >
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                            <span>Shift Pin (Test Lapse)</span>
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => setSelectedListing(listing)}
                          className="py-1.5 px-3.5 bg-[#008751] hover:bg-[#00563A] text-white rounded-lg text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                        >
                          <Split className="w-3.5 h-3.5" />
                          <span>Launch Split Audit</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Split Screen Modal Station */}
      {selectedListing && (
        <DocSplitViewer
          listing={selectedListing}
          onClose={() => setSelectedListing(null)}
        />
      )}
    </div>
  );
}

