"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMarketplace } from "@/context/MarketplaceContext";
import { BrandLogo } from "@/components/common/BrandLogo";
import {
  LayoutDashboard,
  Building2,
  PlusCircle,
  Users,
  BarChart3,
  CreditCard,
  UserCheck,
  ArrowLeft,
  Award,
  Menu,
  X,
} from "lucide-react";

export function AgentSidebar() {
  const pathname = usePathname();
  const { activeAgentId, agents } = useMarketplace();
  const [mobileOpen, setMobileOpen] = useState(false);

  const agent = agents.find((a) => a.id === activeAgentId) || agents[0];

  const navItems = [
    { label: "Dashboard", href: "/agent", icon: LayoutDashboard },
    { label: "My Listings", href: "/agent/listings", icon: Building2 },
    { label: "Post New Property", href: "/agent/listings/new", icon: PlusCircle },
    { label: "Leads & Enquiries", href: "/agent/enquiries", icon: Users },
    { label: "Performance", href: "/agent/performance", icon: BarChart3 },
    { label: "Billing & Plans", href: "/agent/billing", icon: CreditCard },
    { label: "Profile & LASRERA", href: "/agent/profile", icon: UserCheck },
  ];

  const currentItem = navItems.find((item) => item.href === pathname);

  return (
    <>
      {/* Mobile Top App Bar (< lg) */}
      <div className="lg:hidden sticky top-0 z-40 bg-[#151314] text-white px-4 py-3 flex items-center justify-between border-b border-white/10 shadow-sm w-full">
        <div className="flex items-center gap-3">
          <BrandLogo size="xs" variant="white" />
          <div className="leading-tight">
            <span className="text-[9px] font-black uppercase tracking-wider text-[#008751] bg-[#008751]/10 px-1.5 py-0.2 rounded border border-[#008751]/20 inline-block mb-0.5">
              Agent Portal
            </span>
            <h2 className="text-xs font-bold text-white truncate max-w-[190px]">
              {currentItem?.label || "Dashboard"}
            </h2>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg bg-white/10 hover:bg-white/15 text-white transition-colors relative flex items-center justify-center cursor-pointer active:scale-95"
          aria-label="Toggle agent navigation menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Slide-over Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="lg:hidden fixed inset-0 z-50 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
          aria-hidden="true"
        />
      )}

      {/* Mobile Slide-over Drawer */}
      <div
        className={`lg:hidden fixed top-0 bottom-0 left-0 w-72 sm:w-80 bg-[#151314] text-white z-50 flex flex-col justify-between p-5 shadow-2xl transition-transform duration-300 ease-out ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-label="Agent Navigation Menu"
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
            <div className="flex items-center gap-2.5">
              <BrandLogo size="xs" variant="white" />
              <div>
                <h3 className="font-bold text-xs text-white">Agent Portal</h3>
                <span className="text-[9px] text-[#008751] font-mono">LASRERA Registered</span>
              </div>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-1.5 rounded-lg bg-white/10 text-stone-300 hover:text-white cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Profile Card */}
          <div className="bg-white/5 rounded-xl p-3 border border-white/10 mb-4">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={agent.avatar}
                alt={agent.name}
                className="w-10 h-10 rounded-full object-cover border border-[#FFC800]"
              />
              <div className="min-w-0 flex-1">
                <h4 className="font-bold text-xs text-white truncate">{agent.name}</h4>
                <p className="text-[10px] text-stone-400 truncate">{agent.agencyName}</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-[9px] font-black uppercase tracking-wider bg-[#FFC800] text-[#151314] px-1.5 py-0.2 rounded font-mono">
                    {agent.tier}
                  </span>
                  <span className="text-[9px] text-[#008751] font-bold">● {agent.verificationStatus}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? "bg-[#008751] text-white shadow-sm"
                      : "text-stone-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-stone-400"}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Links */}
        <div className="space-y-3 pt-4 border-t border-white/10">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2 text-xs font-bold text-stone-400 hover:text-white px-3 py-2 transition-colors rounded-lg hover:bg-white/5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Marketplace</span>
          </Link>
        </div>
      </div>

      {/* Desktop Permanent Sidebar (Hidden on mobile < lg) */}
      <aside className="hidden lg:flex w-64 bg-[#151314] text-white flex-col justify-between border-r border-white/10 min-h-screen p-4 flex-shrink-0 sticky top-0 h-screen">
        <div>
          {/* Brand Header */}
          <div className="p-2 mb-6">
            <BrandLogo size="sm" variant="white" />
            <div className="mt-2 text-[10px] font-bold uppercase tracking-wider text-[#008751] bg-[#008751]/10 px-2 py-0.5 rounded border border-[#008751]/20 inline-block">
              Agent Management Portal
            </div>
          </div>

          {/* Agent Profile Teaser in Sidebar */}
          <div className="bg-white/5 rounded-xl p-3 border border-white/10 mb-6">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={agent.avatar}
                alt={agent.name}
                className="w-10 h-10 rounded-full object-cover border border-[#FFC800]"
              />
              <div className="min-w-0 flex-1">
                <h4 className="font-bold text-xs text-white truncate">{agent.name}</h4>
                <p className="text-[10px] text-stone-400 truncate">{agent.agencyName}</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-[9px] font-black uppercase tracking-wider bg-[#FFC800] text-[#151314] px-1.5 py-0.2 rounded font-mono">
                    {agent.tier}
                  </span>
                  <span className="text-[9px] text-[#008751] font-bold">● {agent.verificationStatus}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? "bg-[#008751] text-white shadow-sm"
                      : "text-stone-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-stone-400"}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Upgrade & Return Links */}
        <div className="space-y-3 pt-6 border-t border-white/10">
          {agent.tier !== "premium" && (
            <Link
              href="/agent/billing"
              className="block p-3 rounded-xl bg-[#FFC800]/10 border border-[#FFC800]/30 text-xs text-white hover:border-[#FFC800] transition-all"
            >
              <div className="flex items-center gap-1.5 text-[#FFC800] font-bold text-[11px] uppercase tracking-wider mb-1">
                <Award className="w-3.5 h-3.5" />
                <span>Upgrade to Premium</span>
              </div>
              <p className="text-[10px] text-stone-300 leading-tight">
                Unlock 50 listings, exclusive search pop-up & 3 monthly document checks.
              </p>
            </Link>
          )}

          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-bold text-stone-400 hover:text-white px-3 py-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Marketplace</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
