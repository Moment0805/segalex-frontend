"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMarketplace } from "@/context/MarketplaceContext";
import {
  Compass,
  X,
  UserCheck,
  Building2,
  ShieldCheck,
  CreditCard,
  Award,
  ChevronRight,
  Eye,
  Sliders,
  ExternalLink,
  RotateCcw,
  FileText,
  LogIn,
} from "lucide-react";
import { showToast } from "@/components/ui/Toast";

export function PrototypeGuide() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { userRole, setUserRole, resetDemoData } = useMarketplace();

  const handleReset = () => {
    if (confirm("Reset demo data? This flushes local edits and restores the golden path state.")) {
      resetDemoData();
      showToast("Demo Data Reseeded", "All listings, agents, and golden state successfully restored.");
      setIsOpen(false);
    }
  };

  const handleRoleChange = (role: 'visitor' | 'buyer' | 'agent' | 'admin') => {
    setUserRole(role);
    if (role === 'admin') {
      router.push('/admin');
    } else if (role === 'agent') {
      router.push('/agent');
    } else if (role === 'buyer') {
      router.push('/account');
    } else {
      router.push('/');
    }
  };

  const keyJourneys = [
    {
      title: "1. Buyer Discovery & Enquiry",
      desc: "Search 'Land in Ibeju-Lekki', open a Documents Checked listing, play video tour, send enquiry & launch WhatsApp.",
      href: "/properties?propertyType=land&area=Ibeju-Lekki&documentsCheckedOnly=true",
      tag: "Buyer Flow",
      icon: Eye,
      role: "buyer" as const,
    },
    {
      title: "2. Agent Registration Wizard",
      desc: "Agent registers, uploads LASRERA license & CAC proof, and views live pending accreditation timeline.",
      href: "/agent/register",
      tag: "Agent Onboarding",
      icon: UserCheck,
      role: "agent" as const,
    },
    {
      title: "3. Admin Verification & Audit",
      desc: "Admin inspects applicant credentials, approves LASRERA agent, examines title boundary on map, and checks audit log.",
      href: "/admin/agents",
      tag: "Admin Workstation",
      icon: ShieldCheck,
      role: "admin" as const,
    },
    {
      title: "4. Agent Paystack Upgrade & Listing",
      desc: "Agent upgrades from Free to Premium using simulated Paystack checkout, then lists property with video and photo manager.",
      href: "/agent/billing",
      tag: "Monetization",
      icon: CreditCard,
      role: "agent" as const,
    },
    {
      title: "5. Exclusive Search Pop-up Demo",
      desc: "Demonstrates the small dismissible Premium agent sponsored card triggered when searching prime Lagos districts.",
      href: "/properties?area=Ibeju-Lekki&sponsoredTrigger=true",
      tag: "Ad Innovation",
      icon: Award,
      role: "visitor" as const,
    },
  ];

  return (
    <>
      {/* Floating Action Button (Positioned Bottom-Left to avoid covering any CTA/search buttons) */}
      <div className="fixed bottom-4 left-4 z-40 flex items-center gap-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-1.5 bg-[#151314]/95 backdrop-blur-sm text-white hover:bg-black rounded-full shadow-md border border-white/20 transition-all active:scale-95 group text-xs cursor-pointer"
          aria-label="Toggle Prototype Guide"
          title="Prototype Guide & Demo Journeys"
        >
          <span className="w-2 h-2 rounded-full bg-[#FFC800]" />
          <Compass className="w-3.5 h-3.5 text-[#FFC800] group-hover:rotate-45 transition-transform" />
          <span className="text-[11px] font-semibold tracking-tight">Guide</span>
          <span className="bg-white/15 text-[10px] px-1.5 py-0.2 rounded font-mono uppercase text-[#008751] font-bold">
            {userRole}
          </span>
        </button>
      </div>

      {/* Guide Slide-out Modal / Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end sm:justify-end p-0 sm:p-6 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="w-full sm:w-[480px] max-h-[90vh] bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-stone-200"
            role="dialog"
            aria-modal="true"
          >
            {/* Header */}
            <div className="p-4 sm:p-5 bg-[#151314] text-white flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-white/10 rounded-lg">
                  <Compass className="w-5 h-5 text-[#FFC800]" />
                </div>
                <div>
                  <h3 className="font-bold text-sm tracking-tight text-white flex items-center gap-2">
                    Client Prototype Guide
                    <span className="text-[10px] bg-[#008751] text-white px-1.5 py-0.5 rounded font-bold uppercase">
                      The Edge Studio
                    </span>
                  </h3>
                  <p className="text-xs text-stone-300">
                    Segalex Property Hub — Prepared for Mr. Segun (MD)
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/10 text-stone-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-5 overflow-y-auto space-y-5 text-stone-800 text-xs">
              {/* Role Switcher */}
              <div className="bg-[#FAFAF7] p-3.5 rounded-xl border border-stone-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold uppercase tracking-wider text-[11px] text-stone-700 flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-[#008751]" />
                    Simulate Role Switcher
                  </span>
                  <span className="text-[10px] text-stone-500 font-medium">Click to change experience</span>
                </div>
                <div className="grid grid-cols-4 gap-1.5">
                  {(['visitor', 'buyer', 'agent', 'admin'] as const).map((role) => {
                    const isActive = userRole === role;
                    return (
                      <button
                        key={role}
                        onClick={() => handleRoleChange(role)}
                        className={`py-2 px-1 rounded-lg text-center font-bold capitalize transition-all border ${
                          isActive
                            ? 'bg-[#151314] text-white border-[#151314] shadow-sm'
                            : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
                        }`}
                      >
                        {role}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Guided Walkthrough Journeys */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="font-bold uppercase tracking-wider text-[11px] text-stone-700">
                    Key Presentation Journeys
                  </span>
                  <span className="text-[10px] text-stone-500 font-medium">1-Click Launchers</span>
                </div>
                <div className="space-y-2">
                  {keyJourneys.map((j, idx) => {
                    const Icon = j.icon;
                    return (
                      <Link
                        key={idx}
                        href={j.href}
                        onClick={() => {
                          setUserRole(j.role);
                          setIsOpen(false);
                        }}
                        className="group block p-3 rounded-xl border border-stone-200 hover:border-[#008751] hover:bg-emerald-50/40 transition-all bg-white"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded-lg bg-[#F1F0EA] group-hover:bg-[#008751]/10 group-hover:text-[#008751] transition-colors">
                              <Icon className="w-4 h-4" />
                            </div>
                            <span className="font-bold text-stone-900 group-hover:text-[#008751] transition-colors text-xs">
                              {j.title}
                            </span>
                          </div>
                          <span className="text-[10px] bg-stone-100 text-stone-600 px-1.5 py-0.5 rounded font-semibold whitespace-nowrap">
                            {j.tag}
                          </span>
                        </div>
                        <p className="mt-1.5 text-stone-600 leading-relaxed text-[11px] pl-8">
                          {j.desc}
                        </p>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Quick Jump Links */}
              <div>
                <span className="font-bold uppercase tracking-wider text-[11px] text-stone-700 block mb-2">
                  Complete Site Map
                </span>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <Link
                    href="/"
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded bg-stone-50 hover:bg-stone-100 flex items-center justify-between text-stone-700"
                  >
                    <span>Homepage</span>
                    <ChevronRight className="w-3 h-3 text-stone-400" />
                  </Link>
                  <Link
                    href="/properties"
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded bg-stone-50 hover:bg-stone-100 flex items-center justify-between text-stone-700"
                  >
                    <span>Search & Map View</span>
                    <ChevronRight className="w-3 h-3 text-stone-400" />
                  </Link>
                  <Link
                    href="/agents"
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded bg-stone-50 hover:bg-stone-100 flex items-center justify-between text-stone-700"
                  >
                    <span>Agent Directory</span>
                    <ChevronRight className="w-3 h-3 text-stone-400" />
                  </Link>
                  <Link
                    href="/packages"
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded bg-stone-50 hover:bg-stone-100 flex items-center justify-between text-stone-700"
                  >
                    <span>Agent Packages</span>
                    <ChevronRight className="w-3 h-3 text-stone-400" />
                  </Link>
                  <Link
                    href="/how-verification-works"
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded bg-stone-50 hover:bg-stone-100 flex items-center justify-between text-stone-700"
                  >
                    <span>Verification Flow</span>
                    <ChevronRight className="w-3 h-3 text-stone-400" />
                  </Link>
                  <Link
                    href="/about"
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded bg-stone-50 hover:bg-stone-100 flex items-center justify-between text-stone-700"
                  >
                    <span>About Segalex</span>
                    <ChevronRight className="w-3 h-3 text-stone-400" />
                  </Link>
                  <Link
                    href="/agent"
                    onClick={() => {
                      setUserRole('agent');
                      setIsOpen(false);
                    }}
                    className="p-2 rounded bg-stone-50 hover:bg-stone-100 flex items-center justify-between text-stone-700"
                  >
                    <span>Agent Portal</span>
                    <ChevronRight className="w-3 h-3 text-stone-400" />
                  </Link>
                  <Link
                    href="/admin"
                    onClick={() => {
                      setUserRole('admin');
                      setIsOpen(false);
                    }}
                    className="p-2 rounded bg-stone-50 hover:bg-stone-100 flex items-center justify-between text-stone-700"
                  >
                    <span>Admin Console</span>
                    <ChevronRight className="w-3 h-3 text-stone-400" />
                  </Link>
                  <Link
                    href="/scope"
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded bg-amber-50 hover:bg-amber-100 flex items-center justify-between text-amber-900 font-bold border border-amber-200"
                  >
                    <span className="flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-amber-600" />
                      Scope & Proposal Matrix
                    </span>
                    <ChevronRight className="w-3 h-3 text-amber-600" />
                  </Link>
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded bg-stone-50 hover:bg-stone-100 flex items-center justify-between text-stone-700"
                  >
                    <span className="flex items-center gap-1.5">
                      <LogIn className="w-3.5 h-3.5 text-stone-500" />
                      Buyer Sign In
                    </span>
                    <ChevronRight className="w-3 h-3 text-stone-400" />
                  </Link>
                </div>
              </div>

              {/* Reset Demo State Action */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full py-2 px-3 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-bold flex items-center justify-center gap-2 transition-colors active:scale-98"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-red-600" />
                  <span>Reset Demo Data (Re-seed Golden State)</span>
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="p-3 bg-stone-50 border-t border-stone-200 text-center text-[10px] text-stone-500">
              Segalex Resources Global Limited • RC 7351342 • Lagos, Nigeria
            </div>
          </div>
        </div>
      )}
    </>
  );
}

