"use client";

import React, { useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { useMarketplace } from "@/context/MarketplaceContext";
import { History, Search, ShieldCheck, Filter } from "lucide-react";

export default function AdminAuditLogPage() {
  const { auditLogs } = useMarketplace();
  const [filterType, setFilterType] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLogs = auditLogs.filter((log) => {
    if (filterType !== "all" && log.entityType !== filterType) return false;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return (
        log.action.toLowerCase().includes(term) ||
        log.entityName.toLowerCase().includes(term) ||
        log.reason.toLowerCase().includes(term)
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#FAFAF7] text-stone-900">
      <AdminSidebar />

      <main className="flex-1 w-full min-w-0 p-4 sm:p-6 lg:p-10 overflow-x-hidden space-y-6 max-w-7xl">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-ink font-display uppercase tracking-tight">
            Immutable Administrative Audit Trail
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Every regulatory accreditation, document badge grant, suspension, and tier adjustment is logged.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-xl p-3 border border-stone-200 shadow-sm flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {(["all", "agent", "document", "listing", "tier", "ad"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3 py-1.5 rounded-lg font-bold capitalize transition-all whitespace-nowrap ${
                  filterType === type
                    ? "bg-[#151314] text-white shadow-sm"
                    : "text-stone-600 hover:bg-stone-100"
                }`}
              >
                {type} ({type === "all" ? auditLogs.length : auditLogs.filter((l) => l.entityType === type).length})
              </button>
            ))}
          </div>

          <div className="relative min-w-[240px]">
            <input
              type="text"
              placeholder="Search audit trail by action or reason..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#FAFAF7] border border-stone-200 rounded-lg p-2 pl-8 text-stone-900 text-xs focus:outline-none focus:border-[#008751]"
            />
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
          </div>
        </div>

        {/* Audit Log Table */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="p-4 bg-[#FAFAF7] border-b border-stone-200 flex items-center justify-between">
            <h3 className="font-bold text-xs uppercase tracking-wide text-stone-700 flex items-center gap-2">
              <History className="w-4 h-4 text-[#008751]" />
              <span>Audit Entries ({filteredLogs.length})</span>
            </h3>
            <span className="text-[10px] text-stone-400 font-mono">Chain: Log_v1_LocalStore</span>
          </div>

          <div className="overflow-x-auto text-xs">
            <table className="w-full min-w-[700px] text-left">
              <thead>
                <tr className="border-b border-stone-200 bg-stone-50 text-[10px] font-black uppercase text-stone-500">
                  <th className="p-4">Timestamp (WAT)</th>
                  <th className="p-4">Admin Officer</th>
                  <th className="p-4">Action Executed</th>
                  <th className="p-4">Target Entity</th>
                  <th className="p-4">Documented Rationale / Reference</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 font-mono text-[11px]">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-stone-50">
                    <td className="p-4 text-stone-500 whitespace-nowrap">
                      {new Date(log.timestamp).toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>

                    <td className="p-4 font-bold text-stone-900 whitespace-nowrap font-sans text-xs">
                      {log.adminName}
                    </td>

                    <td className="p-4 whitespace-nowrap">
                      <span className="font-bold text-[#008751] font-sans text-xs">
                        {log.action}
                      </span>
                    </td>

                    <td className="p-4 font-sans text-xs">
                      <span className="font-bold text-stone-900 block">{log.entityName}</span>
                      <span className="text-[10px] text-stone-400 uppercase font-mono">
                        {log.entityType} • {log.entityId}
                      </span>
                    </td>

                    <td className="p-4 font-sans text-xs text-stone-600 max-w-sm">
                      {log.reason}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

