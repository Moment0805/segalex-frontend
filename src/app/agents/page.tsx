"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { useMarketplace } from "@/context/MarketplaceContext";
import { VerificationBadge } from "@/components/ui/Badge";
import {
  Search,
  ShieldCheck,
  Award,
  MessageCircle,
  MapPin,
  Building2,
  ArrowRight,
  Filter,
} from "lucide-react";

export default function AgentsDirectoryPage() {
  const { agents } = useMarketplace();
  const [searchTerm, setSearchTerm] = useState("");
  const [areaFilter, setAreaFilter] = useState("all");
  const [tierFilter, setTierFilter] = useState("all");

  const filteredAgents = useMemo(() => {
    return agents.filter((agent) => {
      // Name or agency match
      const term = searchTerm.toLowerCase();
      const matchesSearch =
        agent.name.toLowerCase().includes(term) ||
        agent.agencyName.toLowerCase().includes(term) ||
        agent.lasreraNumber.toLowerCase().includes(term);

      if (!matchesSearch) return false;

      // Area filter
      if (areaFilter !== "all") {
        const covers = agent.coverageAreas.some((a) =>
          a.toLowerCase().includes(areaFilter.toLowerCase())
        );
        if (!covers) return false;
      }

      // Tier filter
      if (tierFilter !== "all" && agent.tier !== tierFilter) {
        return false;
      }

      return true;
    });
  }, [agents, searchTerm, areaFilter, tierFilter]);

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-darktext">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-10 space-y-8">
        {/* Page Banner */}
        <div className="bg-[#151314] text-white rounded-2xl p-6 sm:p-10 border border-white/10 relative">
          <div className="relative max-w-2xl space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#FFC800] text-xs font-bold uppercase tracking-wider border border-white/10">
              <ShieldCheck className="w-4 h-4 text-[#008751]" />
              Accredited Lagos Brokerages
            </span>
            <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white uppercase">
              LASRERA Verified Real Estate Agents
            </h1>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
              Every broker listed on Segalex holds documented regulatory accreditation with the Lagos
              State Real Estate Regulatory Authority. Verify licenses, check closed deals, and contact
              them directly via WhatsApp.
            </p>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="bg-white rounded-xl p-4 border border-stone-200 shadow-sm flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Search Box */}
          <div className="relative flex-1 min-w-[240px]">
            <input
              type="text"
              placeholder="Search by agent name, agency, or LASRERA code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#FAFAF7] border border-stone-200 rounded-lg p-2.5 pl-9 text-stone-900 focus:outline-none focus:border-[#008751]"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Area Filter */}
            <select
              value={areaFilter}
              onChange={(e) => setAreaFilter(e.target.value)}
              className="bg-[#FAFAF7] border border-stone-200 rounded-lg p-2.5 font-bold text-stone-800 focus:outline-none focus:border-[#008751]"
            >
              <option value="all">All Operating Districts</option>
              <option value="Ikoyi">Ikoyi</option>
              <option value="Lekki Phase 1">Lekki Phase 1</option>
              <option value="Banana Island">Banana Island</option>
              <option value="Victoria Island">Victoria Island</option>
              <option value="Ibeju-Lekki">Ibeju-Lekki</option>
              <option value="Ikeja GRA">Ikeja GRA</option>
              <option value="Epe">Epe</option>
              <option value="Yaba">Yaba</option>
              <option value="Surulere">Surulere</option>
            </select>

            {/* Tier Filter */}
            <select
              value={tierFilter}
              onChange={(e) => setTierFilter(e.target.value)}
              className="bg-[#FAFAF7] border border-stone-200 rounded-lg p-2.5 font-bold text-stone-800 focus:outline-none focus:border-[#008751]"
            >
              <option value="all">All Tiers</option>
              <option value="premium">Premium Tiers</option>
              <option value="basic">Basic Tiers</option>
              <option value="free">Free Tiers</option>
            </select>
          </div>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgents.map((agent) => {
            const whatsappText = encodeURIComponent(
              `Hello ${agent.name}, I am contacting you through Segalex Property Hub regarding your verified listings.`
            );

            return (
              <div
                key={agent.id}
                className="bg-white rounded-brand p-5 border border-stone-200 shadow-card hover:shadow-elevated transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={agent.avatar}
                        alt={agent.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-stone-100"
                      />
                      <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-[#008751] border-2 border-white flex items-center justify-center text-white text-[9px]">
                        ✓
                      </span>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-[#FFC800] text-[#151314] font-mono">
                        {agent.tier}
                      </span>
                      {agent.isErcaanMember && (
                        <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded">
                          ERCAAN
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="font-bold text-stone-900 text-base leading-snug">
                    {agent.name}
                  </h3>
                  <p className="text-xs font-semibold text-stone-600 truncate mt-0.5">
                    {agent.agencyName}
                  </p>

                  <div className="mt-2 text-[10px] text-stone-500 font-mono bg-[#FAFAF7] px-2 py-1 rounded border border-stone-100 truncate">
                    {agent.lasreraNumber}
                  </div>

                  <p className="text-xs text-stone-600 line-clamp-3 mt-3 leading-relaxed">
                    {agent.bio}
                  </p>

                  {/* Coverage Areas */}
                  <div className="mt-3 flex flex-wrap gap-1">
                    {agent.coverageAreas.map((area, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-semibold bg-[#F1F0EA] text-stone-700 px-2 py-0.5 rounded"
                      >
                        {area}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="mt-4 pt-3 border-t border-stone-100 grid grid-cols-2 gap-2 text-[11px]">
                    <div>
                      <span className="text-stone-400 block uppercase font-bold text-[9px]">
                        Active Listings
                      </span>
                      <span className="font-bold text-stone-900">
                        {agent.activeListingsCount} Properties
                      </span>
                    </div>
                    <div>
                      <span className="text-stone-400 block uppercase font-bold text-[9px]">
                        Verified Since
                      </span>
                      <span className="font-bold text-stone-900">
                        {agent.verifiedSince}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                  <a
                    href={`https://wa.me/${agent.whatsapp}?text=${whatsappText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-lg text-xs font-bold transition-all shadow-sm"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>

                  <Link
                    href={`/agents/${agent.id}`}
                    className="p-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-xs font-bold transition-colors"
                    title="View Profile & Listings"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}

