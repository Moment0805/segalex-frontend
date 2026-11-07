"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { BrandLogo } from "@/components/common/BrandLogo";
import {
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Layers,
  ArrowRight,
  Building2,
  FileCheck2,
  CreditCard,
  Search,
  MessageCircle,
  Eye,
  Sliders,
  Award,
} from "lucide-react";

interface ScopeItem {
  module: string;
  feature: string;
  description: string;
  businessValue: string;
  route: string;
  badge: "Core" | "Monetization" | "Regulatory" | "Innovation";
}

const SCOPE_MATRIX: ScopeItem[] = [
  // 1. Regulatory & Trust
  {
    module: "Regulatory Rigor",
    feature: "LASRERA Agent Accreditation Workflow",
    description: "Multi-step license verification, CAC validation, and mandatory accreditation check.",
    businessValue: "Eliminates roadside scam agents; positions Segalex as the official trusted gatekeeper.",
    route: "/admin/agents",
    badge: "Regulatory",
  },
  {
    module: "Regulatory Rigor",
    feature: "Cadastral Split-Screen Audit Workstation",
    description: "Side-by-side verification: uploaded deed instrument on left, Leaflet surveyed polygon on right.",
    businessValue: "Prevents duplicate allocations and coordinate tampering; grants 'Documents Checked' badge.",
    route: "/admin/documents",
    badge: "Regulatory",
  },
  {
    module: "Regulatory Rigor",
    feature: "Coordinate Tamper & Badge Lapse Demo",
    description: "Automatic revocation of 'Documents Checked' badge if an agent shifts map pin post-audit.",
    businessValue: "Guarantees zero badge fraud; protects buyers against bait-and-switch plots.",
    route: "/admin/documents",
    badge: "Regulatory",
  },
  {
    module: "Regulatory Rigor",
    feature: "Immutable Administrative Audit Trail",
    description: "Chronological logging of every approval, rejection, tier change, and badge revocation.",
    businessValue: "Corporate governance compliance and judicial audit defense.",
    route: "/admin/audit-log",
    badge: "Regulatory",
  },

  // 2. Public Marketplace
  {
    module: "Public Marketplace",
    feature: "Verified Property Exchange & Hero Search",
    description: "Buy/Rent toggle, 13 Lagos zones, type filters, and live animated trust counters.",
    businessValue: "Immediate private-bank credibility and high-converting Lagos buyer engagement.",
    route: "/",
    badge: "Core",
  },
  {
    module: "Public Marketplace",
    feature: "Interactive Split List + Leaflet Map Search",
    description: "Real-time sync between listing cards and OpenStreetMap price pins with mobile switcher.",
    businessValue: "World-class search UX on par with international portals (Zillow/Rightmove).",
    route: "/properties",
    badge: "Core",
  },
  {
    module: "Public Marketplace",
    feature: "Listing Dossier & 'What We Checked' Panel",
    description: "High-res gallery lightbox, video walkthrough, legal title disclaimer, and sticky agent card.",
    businessValue: "Transparent title due diligence answers buyer skepticism upfront.",
    route: "/property/prop-3",
    badge: "Core",
  },
  {
    module: "Public Marketplace",
    feature: "WhatsApp Share Card Live Preview",
    description: "Interactive preview modal rendering how listing links unfurl in WhatsApp chats.",
    businessValue: "Capitalizes on Nigeria's primary property deal channel (WhatsApp).",
    route: "/property/prop-3",
    badge: "Innovation",
  },
  {
    module: "Public Marketplace",
    feature: "LASRERA Verified Agent Directory",
    description: "Directory of accredited practitioners with license numbers and active inventory.",
    businessValue: "Encourages agency signups and builds industry authority.",
    route: "/agents",
    badge: "Core",
  },

  // 3. Monetization & SaaS
  {
    module: "Commercial Monetization",
    feature: "Tier Subscriptions & Paystack Checkout Mock",
    description: "Free (₦0), Basic (₦15k/mo), Premium (₦45k/mo) with simulated card payment & invoice history.",
    businessValue: "Predictable recurring SaaS revenue from Lagos' 10,000+ real estate agents.",
    route: "/agent/billing",
    badge: "Monetization",
  },
  {
    module: "Commercial Monetization",
    feature: "Exclusive Sponsored Search Pop-up",
    description: "Discrete, non-intrusive card highlighting a Premium agent's listing in targeted search zones.",
    businessValue: "High-margin advertising upsell without degrading user experience.",
    route: "/properties?area=Ibeju-Lekki&sponsoredTrigger=true",
    badge: "Innovation",
  },
  {
    module: "Commercial Monetization",
    feature: "Dynamic Pricing & Tier Sync Console",
    description: "Admin edits tier prices and quotas; updates reflect immediately on public /packages.",
    businessValue: "Enables instant pricing experimentation and promotional campaigns.",
    route: "/admin/tiers",
    badge: "Monetization",
  },
  {
    module: "Commercial Monetization",
    feature: "Direct Advertising & Banner Ad Manager",
    description: "Admin manager for Home and Search banner slots with impression and click analytics.",
    businessValue: "Monetizes developer launches, mortgage banks, and building material suppliers.",
    route: "/admin/advertising",
    badge: "Monetization",
  },

  // 4. Agent Operations
  {
    module: "Agent Operations",
    feature: "Agent Onboarding & Timeline Wizard",
    description: "3-step registration with LASRERA certificate upload, ending in pending timeline.",
    businessValue: "Frictionless onboarding while strictly filtering for legitimate brokers.",
    route: "/agent/register",
    badge: "Core",
  },
  {
    module: "Agent Operations",
    feature: "Agent Listing Studio & Video Compressor",
    description: "Photo quota enforcement, video compression state (≤2 min / 100 MB), Leaflet pin dropper.",
    businessValue: "Ensures high-quality, mobile-optimized listing inventory.",
    route: "/agent/listings/new",
    badge: "Core",
  },
  {
    module: "Agent Operations",
    feature: "Agent Dashboard & 7-Day Expiry Guard",
    description: "Recharts performance charts, quota gauges, and 60-day expiry warning reminders.",
    businessValue: "Maintains platform inventory freshness and drives listing renewals.",
    route: "/agent",
    badge: "Core",
  },
];

export default function ScopeProposalPage() {
  const badgeColors = {
    Core: "bg-blue-50 text-blue-700 border-blue-200",
    Monetization: "bg-amber-50 text-amber-800 border-amber-300",
    Regulatory: "bg-emerald-50 text-emerald-800 border-emerald-300",
    Innovation: "bg-purple-50 text-purple-800 border-purple-200",
  };

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-darktext">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-12 space-y-12">
        {/* Header Hero */}
        <div className="bg-[#151314] text-white rounded-2xl p-8 sm:p-12 border border-white/10 relative">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-white/10 text-[#FFC800] text-xs font-bold uppercase tracking-wider border border-white/10">
                The Edge Studio × Segalex Resources Global Limited
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-display uppercase tracking-tight leading-tight">
              Prototype Scope & Proposal Feature Matrix
            </h1>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
              Every feature proposed for <strong>Segalex Property Hub</strong> has been faithfully engineered as a high-fidelity, interactive clickable prototype. Review each functional module below and test the live screens with 1-click.
            </p>
          </div>
        </div>

        {/* Feature Matrix Table */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden space-y-4 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-stone-200">
            <div>
              <h2 className="text-lg font-black font-display uppercase text-ink">
                Verified Deliverables (16 Key Modules)
              </h2>
              <p className="text-xs text-stone-500">
                100% of proposed user journeys, administrative workstations, and revenue models are functional.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-[#008751] font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Prototype Validated (33 Routes)
              </span>
            </div>
          </div>

          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-stone-200 bg-stone-50 text-[10px] font-black uppercase text-stone-500">
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Feature Specification</th>
                  <th className="p-3.5">Commercial & User Value</th>
                  <th className="p-3.5">Scope Tag</th>
                  <th className="p-3.5 text-right">Interactive Preview</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {SCOPE_MATRIX.map((item, idx) => (
                  <tr key={idx} className="hover:bg-stone-50/80 transition-colors">
                    <td className="p-3.5 font-bold text-stone-900 whitespace-nowrap">
                      {item.module}
                    </td>
                    <td className="p-3.5">
                      <span className="font-bold text-stone-900 block">{item.feature}</span>
                      <span className="text-[11px] text-stone-500 line-clamp-1">{item.description}</span>
                    </td>
                    <td className="p-3.5 text-stone-600 max-w-xs leading-relaxed">
                      {item.businessValue}
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${badgeColors[item.badge]}`}>
                        {item.badge}
                      </span>
                    </td>
                    <td className="p-3.5 text-right whitespace-nowrap">
                      <Link
                        href={item.route}
                        className="py-1.5 px-3 bg-[#151314] hover:bg-[#008751] text-white rounded-lg text-[11px] font-bold inline-flex items-center gap-1.5 transition-colors"
                      >
                        <span>Open Screen</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* The Edge Studio Call to Action */}
        <div className="bg-[#151314] text-white rounded-2xl p-8 sm:p-12 border border-white/10 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/edge-studio-logo-white.svg"
              alt="The Edge Studio"
              className="h-6 w-auto"
            />
            <span className="text-xs font-bold text-[#FFC800] uppercase tracking-wider">
              The Next Stage · The Edge Studio
            </span>
          </div>

          <div className="max-w-2xl space-y-3">
            <h2 className="text-2xl sm:text-4xl font-black font-display uppercase tracking-tight">
              Ready to build this for real?
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
              This clickable prototype proves the UX, the regulatory framework, and the commercial architecture. <strong>The Edge Studio</strong> is ready to engineer the complete production platform: live PostgreSQL database, real LASRERA registry API integration, verified Paystack payments, AWS S3 image/video pipeline, and full Nigerian data privacy compliance (NDPR).
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 text-xs">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <span className="text-[#008751] font-black uppercase text-[10px] block">Production Ready</span>
              <p className="font-bold text-white text-sm">Full Next.js Architecture</p>
              <p className="text-stone-400 text-[11px]">Clean App Router, zero technical debt.</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <span className="text-[#FFC800] font-black uppercase text-[10px] block">Target Delivery</span>
              <p className="font-bold text-white text-sm">8–10 Weeks to Launch</p>
              <p className="text-stone-400 text-[11px]">Agile sprints with weekly client reviews.</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <span className="text-white font-black uppercase text-[10px] block">Engagement Lead</span>
              <p className="font-bold text-white text-sm">The Edge Studio Team</p>
              <p className="text-stone-400 text-[11px]">Direct partner engagement with Mr Segun.</p>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto py-3.5 px-8 bg-[#008751] hover:bg-[#00563A] text-white rounded-xl text-xs font-black uppercase tracking-wider text-center shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <span>Talk to The Edge Studio — Commission Build</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/"
              className="w-full sm:w-auto py-3.5 px-6 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold uppercase tracking-wider text-center transition-colors"
            >
              Return to Marketplace Demo
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

