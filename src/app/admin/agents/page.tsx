"use client";

import React, { useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AgentVerificationModal } from "@/components/admin/AgentVerificationModal";
import { useMarketplace } from "@/context/MarketplaceContext";
import { Agent, AgentVerificationStatus } from "@/types";
import { showToast } from "@/components/ui/Toast";
import {
  UserCheck,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Search,
  ExternalLink,
  Eye,
} from "lucide-react";

export default function AdminAgentsQueuePage() {
  const { agents, approveAgent, rejectAgent, suspendAgent } = useMarketplace();
  const [filter, setFilter] = useState<"all" | AgentVerificationStatus>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  const filteredAgents = agents.filter((a) => {
    if (filter !== "all" && a.verificationStatus !== filter) return false;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return (
        a.name.toLowerCase().includes(term) ||
        a.agencyName.toLowerCase().includes(term) ||
        a.lasreraNumber.toLowerCase().includes(term)
      );
    }
    return true;
  });

  const handleQuickApprove = (e: React.MouseEvent, agent: Agent) => {
    e.stopPropagation();
    approveAgent(agent.id, agent.lasreraNumber, "Fast-tracked verification approval in Admin desk.");
    showToast("Agent Approved", `${agent.name} is now verified on Segalex.`);
  };

  const handleQuickSuspend = (e: React.MouseEvent, agent: Agent) => {
    e.stopPropagation();
    suspendAgent(agent.id, "Administrative hold pending annual license validation.");
    showToast("Agent Suspended", `${agent.name} access held.`, "error");
  };

  return (
    <div className="min-h-screen flex bg-[#FAFAF7] text-stone-900">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-10 overflow-y-auto space-y-6 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-ink font-display uppercase tracking-tight">
              Agent Accreditation & Verification Queue
            </h1>
            <p className="text-xs text-stone-500 mt-0.5">
              Review and enforce LASRERA regulatory compliance across all registered brokerage applicants.
            </p>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-xl p-3 border border-stone-200 shadow-sm flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {(["all", "pending", "verified", "suspended", "rejected"] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-3 py-1.5 rounded-lg font-bold capitalize transition-all whitespace-nowrap ${
                  filter === status
                    ? "bg-[#151314] text-white shadow-sm"
                    : "text-stone-600 hover:bg-stone-100"
                }`}
              >
                {status} ({status === "all" ? agents.length : agents.filter((a) => a.verificationStatus === status).length})
              </button>
            ))}
          </div>

          <div className="relative min-w-[220px]">
            <input
              type="text"
              placeholder="Filter by name or LASRERA code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#FAFAF7] border border-stone-200 rounded-lg p-2 pl-8 text-stone-900 text-xs focus:outline-none focus:border-[#008751]"
            />
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
          </div>
        </div>

        {/* Agents Table */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-stone-200 bg-[#FAFAF7] text-[10px] font-black uppercase text-stone-500">
                  <th className="p-4">Practitioner / Firm</th>
                  <th className="p-4">LASRERA Code</th>
                  <th className="p-4">Standing</th>
                  <th className="p-4">Tier</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredAgents.map((agent) => {
                  const statusStyles = {
                    verified: "bg-emerald-50 text-[#008751] border-emerald-200",
                    pending: "bg-amber-50 text-amber-700 border-amber-200",
                    suspended: "bg-red-50 text-red-600 border-red-200",
                    rejected: "bg-stone-100 text-stone-600 border-stone-200",
                  };

                  return (
                    <tr
                      key={agent.id}
                      onClick={() => setSelectedAgent(agent)}
                      className="hover:bg-stone-50 cursor-pointer transition-colors"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={agent.avatar}
                            alt={agent.name}
                            className="w-10 h-10 rounded-full object-cover border border-stone-200"
                          />
                          <div>
                            <span className="font-bold text-stone-900 block">{agent.name}</span>
                            <span className="text-[11px] text-stone-500">{agent.agencyName}</span>
                          </div>
                        </div>
                      </td>

                      <td className="p-4 font-mono font-bold text-stone-800">
                        {agent.lasreraNumber}
                      </td>

                      <td className="p-4">
                        {agent.isErcaanMember ? (
                          <span className="text-[10px] font-bold uppercase text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded">
                            ERCAAN Reg
                          </span>
                        ) : (
                          <span className="text-[10px] text-stone-400">Independent</span>
                        )}
                      </td>

                      <td className="p-4 font-mono font-bold uppercase text-[11px] text-stone-700">
                        {agent.tier}
                      </td>

                      <td className="p-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                            statusStyles[agent.verificationStatus]
                          }`}
                        >
                          {agent.verificationStatus}
                        </span>
                      </td>

                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {agent.verificationStatus !== "verified" ? (
                            <button
                              type="button"
                              onClick={(e) => handleQuickApprove(e, agent)}
                              className="px-2.5 py-1 bg-[#008751] text-white rounded text-[11px] font-bold hover:bg-[#00563A] transition-colors"
                            >
                              Approve
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={(e) => handleQuickSuspend(e, agent)}
                              className="px-2.5 py-1 bg-red-50 text-red-600 rounded text-[11px] font-bold hover:bg-red-100 border border-red-200 transition-colors"
                            >
                              Suspend
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedAgent(agent);
                            }}
                            className="p-1.5 rounded hover:bg-stone-200 text-stone-600"
                            title="Inspect Documents"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
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

      {/* Verification Inspection Modal */}
      {selectedAgent && (
        <AgentVerificationModal
          agent={selectedAgent}
          isOpen={true}
          onClose={() => setSelectedAgent(null)}
        />
      )}
    </div>
  );
}

