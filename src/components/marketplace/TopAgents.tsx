"use client";

import React from "react";
import Link from "next/link";
import { useMarketplace } from "@/context/MarketplaceContext";
import { ArrowRight, CheckCircle2, MessageCircle } from "lucide-react";

export function TopAgents() {
  const { agents, listings } = useMarketplace();
  const verifiedAgents = agents.filter((a) => a.verificationStatus === "verified").slice(0, 5);

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-[#E9E8E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#008751] mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#008751]" />
              <span>Accredited Lagos Brokerages</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-ink tracking-tight font-display uppercase">
              Top Verified Agents
            </h2>
          </div>
          <Link
            href="/agents"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#008751] hover:text-[#00563A] transition-colors"
          >
            <span>View All {agents.length} Registered Agents</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Clean Row-List (Institutional Table/Row Layout) */}
        <div className="bg-white rounded-xl border border-[#E9E8E1] overflow-hidden divide-y divide-[#E9E8E1]">
          {verifiedAgents.map((agent) => {
            const agentListingCount = listings.filter((l) => l.agentId === agent.id).length;
            const whatsappText = encodeURIComponent(
              `Hello ${agent.name}, I am contacting you through Segalex Property Hub regarding your verified listings.`
            );
            const whatsappUrl = `https://wa.me/${agent.phone.replace(/[^0-9]/g, "")}?text=${whatsappText}`;

            return (
              <div
                key={agent.id}
                className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#FAFAF7] transition-colors"
              >
                {/* Agent Identity */}
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="relative flex-shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={agent.avatar}
                      alt={agent.name}
                      className="w-12 h-12 rounded-full object-cover border border-[#E9E8E1]"
                    />
                    <span
                      className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#008751] border-2 border-white flex items-center justify-center text-white text-[9px]"
                      title="LASRERA Verified"
                    >
                      ✓
                    </span>
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Link
                        href={`/agents/${agent.id}`}
                        className="font-bold text-ink hover:text-[#008751] text-sm sm:text-base leading-tight truncate transition-colors"
                      >
                        {agent.name}
                      </Link>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#008751] bg-[#008751]/10 px-2 py-0.5 rounded">
                        {agent.tier}
                      </span>
                      {agent.isErcaanMember && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-700 bg-stone-100 px-1.5 py-0.5 rounded border border-stone-200">
                          ERCAAN
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-stone-600 mt-0.5 truncate">
                      {agent.agencyName}
                    </p>
                  </div>
                </div>

                {/* License & Listings Info */}
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-stone-600">
                  <div>
                    <span className="text-[10px] text-stone-400 block uppercase font-mono">LASRERA Reg</span>
                    <span className="font-mono font-medium text-ink">{agent.lasreraNumber}</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-stone-400 block uppercase font-mono">Inventory</span>
                    <span className="font-semibold text-ink">
                      {agentListingCount || 3} active listings
                    </span>
                  </div>

                  <div className="hidden lg:block max-w-[200px]">
                    <span className="text-[10px] text-stone-400 block uppercase font-mono">Core Coverage</span>
                    <span className="truncate block text-stone-600" title={agent.coverageAreas.join(", ")}>
                      {agent.coverageAreas.slice(0, 2).join(", ")}
                    </span>
                  </div>
                </div>

                {/* Actions: Direct WhatsApp + View Profile */}
                <div className="flex items-center gap-2 self-start md:self-auto flex-shrink-0">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#008751] hover:bg-[#00563A] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                  <Link
                    href={`/agents/${agent.id}`}
                    className="px-3 py-2 border border-[#E9E8E1] hover:border-stone-400 text-stone-700 hover:text-ink text-xs font-semibold rounded-lg transition-colors"
                  >
                    Profile
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
