"use client";

import React, { useState } from "react";
import { useMarketplace } from "@/context/MarketplaceContext";
import { showToast } from "@/components/ui/Toast";
import { AlertTriangle, X, ShieldAlert, CheckCircle2 } from "lucide-react";

interface ReportModalProps {
  listingId: string;
  listingTitle: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ReportModal({
  listingId,
  listingTitle,
  isOpen,
  onClose,
}: ReportModalProps) {
  const { reportListing } = useMarketplace();
  const [reason, setReason] = useState("Suspected Counterfeit Title / Inaccurate Information");
  const [notes, setNotes] = useState("");
  const [reporterEmail, setReporterEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reporterEmail) return;

    reportListing(listingId, `${reason}: ${notes}`, reporterEmail);
    setSubmitted(true);
    showToast("Report Submitted", "Our compliance team will review this listing.");
    setTimeout(() => {
      onClose();
      setSubmitted(false);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden"
      >
        {/* Header */}
        <div className="p-4 bg-[#151314] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-red-500" />
            <h3 className="font-bold text-sm text-white">Report Listing</h3>
          </div>
          <button onClick={onClose} className="text-stone-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 text-xs text-stone-800">
          {submitted ? (
            <div className="py-8 text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-[#008751] mx-auto" />
              <h4 className="font-bold text-sm text-stone-900">Report Logged in Admin Desk</h4>
              <p className="text-stone-600">
                Thank you for helping protect Lagos buyers from fraudulent practices.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <p className="text-stone-600 leading-relaxed">
                Reporting: <strong className="text-stone-900">{listingTitle}</strong>
              </p>

              <div>
                <label className="block font-bold text-stone-700 uppercase tracking-wider text-[10px] mb-1">
                  Reason for Report
                </label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full bg-[#FAFAF7] border border-stone-200 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:border-[#008751]"
                >
                  <option value="Suspected Counterfeit Title / Inaccurate Information">
                    Suspected Counterfeit Title / Inaccurate Information
                  </option>
                  <option value="Incorrect Price / Hidden Demands">Incorrect Price / Hidden Demands</option>
                  <option value="Agent Not Reachable / Impersonation">
                    Agent Not Reachable / Impersonation
                  </option>
                  <option value="Property Already Sold / Unavailable">
                    Property Already Sold / Unavailable
                  </option>
                  <option value="Boundary Encroachment / Survey Dispute">
                    Boundary Encroachment / Survey Dispute
                  </option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-stone-700 uppercase tracking-wider text-[10px] mb-1">
                  Your Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={reporterEmail}
                  onChange={(e) => setReporterEmail(e.target.value)}
                  className="w-full bg-[#FAFAF7] border border-stone-200 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:border-[#008751]"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 uppercase tracking-wider text-[10px] mb-1">
                  Additional Details / Observations
                </label>
                <textarea
                  rows={3}
                  placeholder="Provide any evidence or details to help our compliance officer verify..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-[#FAFAF7] border border-stone-200 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:border-[#008751] resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-stone-200 rounded-lg text-stone-700 hover:bg-stone-50 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold shadow-sm"
                >
                  Submit Report
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

