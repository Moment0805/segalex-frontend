"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AgentSidebar } from "@/components/agent/AgentSidebar";
import { useMarketplace } from "@/context/MarketplaceContext";
import { showToast } from "@/components/ui/Toast";
import { Enquiry } from "@/types";
import {
  MessageSquare,
  MessageCircle,
  Phone,
  Mail,
  Calendar,
  CheckCircle2,
  Clock,
  Filter,
} from "lucide-react";

export default function AgentEnquiriesPage() {
  const { activeAgentId, enquiries, updateEnquiryStatus } = useMarketplace();
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const agentEnquiries = enquiries.filter((e) => e.agentId === activeAgentId);

  const filtered = agentEnquiries.filter((e) => {
    if (statusFilter === "all") return true;
    return e.status === statusFilter;
  });

  const handleStatusChange = (id: string, newStatus: Enquiry["status"]) => {
    updateEnquiryStatus(id, newStatus);
    showToast("Lead Status Updated", `Status shifted to ${newStatus}.`);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#FAFAF7] text-stone-900">
      <AgentSidebar />

      <main className="flex-1 w-full min-w-0 p-4 sm:p-6 lg:p-10 overflow-x-hidden space-y-6 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-ink font-display uppercase tracking-tight">
              Leads & Inquiries Inbox
            </h1>
            <p className="text-xs text-stone-500 mt-0.5">
              Prospect inspection requests and direct WhatsApp conversation tracking.
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-xl p-3 border border-stone-200 shadow-sm flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {(["all", "New", "Contacted", "Viewing", "Closed"] as const).map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all whitespace-nowrap ${
                  statusFilter === status
                    ? "bg-[#151314] text-white shadow-sm"
                    : "text-stone-600 hover:bg-stone-100"
                }`}
              >
                {status} ({status === "all" ? agentEnquiries.length : agentEnquiries.filter((e) => e.status === status).length})
              </button>
            ))}
          </div>
        </div>

        {/* Leads Cards */}
        <div className="space-y-4">
          {filtered.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 border border-stone-200 text-center text-xs text-stone-500">
              No inquiries found in this category.
            </div>
          ) : (
            filtered.map((enq) => {
              const whatsappReplyUrl = `https://wa.me/${enq.buyerPhone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                `Hello ${enq.buyerName}, thank you for inquiring about "${enq.listingTitle}" on Segalex Property Hub. When would you like to schedule an inspection?`
              )}`;

              return (
                <div
                  key={enq.id}
                  className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-sm text-stone-900">{enq.buyerName}</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          enq.status === "New"
                            ? "bg-emerald-50 text-[#008751] border border-emerald-200"
                            : enq.status === "Viewing"
                            ? "bg-purple-50 text-purple-700 border border-purple-200"
                            : enq.status === "Contacted"
                            ? "bg-blue-50 text-blue-700 border border-blue-200"
                            : "bg-stone-100 text-stone-600"
                        }`}
                      >
                        {enq.status}
                      </span>
                      <span className="text-[10px] text-stone-400 font-mono">
                        via {enq.channel.toUpperCase()}
                      </span>
                    </div>

                    <p className="text-xs text-stone-700 bg-[#FAFAF7] p-3 rounded-xl border border-stone-100 italic leading-relaxed">
                      "{enq.message}"
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500">
                      <span className="flex items-center gap-1 font-semibold text-stone-800">
                        Property: {enq.listingTitle} ({enq.listingPrice})
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5 text-stone-400" />
                        {enq.buyerEmail}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-stone-400" />
                        {enq.buyerPhone}
                      </span>
                    </div>
                  </div>

                  {/* Actions & Lifecycle Stage Selector */}
                  <div className="flex flex-col sm:flex-row md:flex-col items-stretch md:items-end gap-2.5 flex-shrink-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase text-stone-400">
                        Lifecycle:
                      </span>
                      <select
                        value={enq.status}
                        onChange={(e) =>
                          handleStatusChange(enq.id, e.target.value as Enquiry["status"])
                        }
                        className="bg-[#FAFAF7] border border-stone-200 rounded-lg p-1.5 text-xs font-bold text-stone-800 focus:outline-none"
                      >
                        <option value="New">New Lead</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Viewing">Viewing Booked</option>
                        <option value="Closed">Deal Closed</option>
                      </select>
                    </div>

                    <a
                      href={whatsappReplyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Reply on WhatsApp</span>
                    </a>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
}

