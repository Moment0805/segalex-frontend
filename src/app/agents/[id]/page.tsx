"use client";

import React from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { PropertyCard } from "@/components/marketplace/PropertyCard";
import { VerificationBadge } from "@/components/ui/Badge";
import { useMarketplace } from "@/context/MarketplaceContext";
import {
  ShieldCheck,
  Award,
  Phone,
  Mail,
  MessageCircle,
  MapPin,
  Building2,
  Calendar,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";

export default function AgentProfilePage() {
  const params = useParams();
  const agentId = params.id as string;
  const { agents, listings } = useMarketplace();

  const agent = agents.find((a) => a.id === agentId);
  if (!agent) {
    return notFound();
  }

  const agentListings = listings.filter((p) => p.agentId === agent.id);

  const whatsappMessage = encodeURIComponent(
    `Hello ${agent.name}, I am viewing your verified profile on Segalex Property Hub. I would like to enquire about your available property portfolio in Lagos.`
  );

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-darktext">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Navigation Breadcrumb */}
        <Link
          href="/agents"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-500 hover:text-stone-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Verified Agents</span>
        </Link>

        {/* Hero Profile Header */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={agent.avatar}
                alt={agent.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-stone-100 shadow-sm"
              />
              <span className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-[#008751] border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                ✓
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider bg-[#FFC800] text-[#151314] px-2 py-0.5 rounded font-mono">
                  {agent.tier} Partner
                </span>
                {agent.verificationStatus === "verified" && (
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-[#008751] px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    LASRERA Verified
                  </span>
                )}
                {agent.isErcaanMember && (
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-stone-100 text-stone-700 px-2 py-0.5 rounded">
                    ERCAAN Member
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-stone-900 leading-tight">
                {agent.name}
              </h1>
              <p className="text-sm font-semibold text-stone-600">{agent.agencyName}</p>

              <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-stone-500">
                <span className="font-mono bg-stone-100 px-2 py-0.5 rounded text-[11px]">
                  {agent.lasreraNumber}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-stone-400" />
                  <span>Verified since {agent.verifiedSince}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Direct CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full md:w-auto">
            <a
              href={`https://wa.me/${agent.whatsapp}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-5 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Message on WhatsApp</span>
            </a>
            <a
              href={`tel:${agent.phone}`}
              className="py-3 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-stone-600" />
              <span>Call: {agent.phone}</span>
            </a>
          </div>
        </div>

        {/* Bio & Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
            <h3 className="font-black text-lg text-ink uppercase tracking-tight font-display">
              About {agent.name} & Practice
            </h3>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed whitespace-pre-line">
              {agent.bio}
            </p>

            <div className="pt-4 border-t border-stone-100">
              <span className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-2">
                Primary Lagos Operating Districts
              </span>
              <div className="flex flex-wrap gap-1.5">
                {agent.coverageAreas.map((area, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg bg-[#FAFAF7] text-stone-800 text-xs font-semibold border border-stone-200 flex items-center gap-1"
                  >
                    <MapPin className="w-3 h-3 text-[#008751]" />
                    <span>{area}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Accreditation Verification Card */}
          <div className="bg-[#151314] text-white rounded-2xl p-6 border border-stone-800 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#FFC800] text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-[#008751]" />
                <span>Regulatory Credentials</span>
              </div>
              <h4 className="font-bold text-base text-white">
                Accredited Real Estate Practitioner
              </h4>
              <p className="text-stone-300 text-xs leading-relaxed">
                Registered under the Lagos State Real Estate Regulatory Authority (LASRERA) Law 2022.
                Authorized to transact real estate agency, property leases, and title representations in Lagos State.
              </p>

              <div className="p-3 bg-white/5 rounded-xl border border-white/10 space-y-1.5 text-xs">
                <div className="text-stone-400 text-[10px] uppercase font-bold">
                  License Serial
                </div>
                <div className="font-mono font-bold text-white text-xs">{agent.lasreraNumber}</div>
                {agent.ercaanRegNumber && (
                  <div className="text-[11px] text-stone-300">
                    ERCAAN Chapter Reg: {agent.ercaanRegNumber}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-stone-400">
              <span>Status: <strong className="text-[#008751]">Audited & Active</strong></span>
              <span>Deals: {agent.totalDealsClosed}+</span>
            </div>
          </div>
        </div>

        {/* Active Property Inventory */}
        <div className="space-y-6 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-[#008751] uppercase tracking-wider">
                Agent Inventory
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-ink uppercase font-display mt-0.5">
                Active Listings by {agent.agencyName} ({agentListings.length})
              </h2>
            </div>
          </div>

          {agentListings.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 border border-stone-200 text-center text-xs text-stone-500">
              No active public listings currently live for this broker.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {agentListings.map((listing) => (
                <PropertyCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

