"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMarketplace } from "@/context/MarketplaceContext";
import { BrandLogo } from "@/components/common/BrandLogo";
import {
  LayoutDashboard,
  UserCheck,
  FileCheck2,
  Building2,
  Users,
  CreditCard,
  Megaphone,
  Search,
  Lightbulb,
  Settings,
  History,
  ArrowLeft,
  Menu,
  X,
} from "lucide-react";

export function AdminSidebar() {
  const pathname = usePathname();
  const { agents, auditLogs } = useMarketplace();
  const [mobileOpen, setMobileOpen] = useState(false);

  const pendingAgents = agents.filter((a) => a.verificationStatus === "pending").length;

  const navItems = [
    { label: "Overview", href: "/admin", icon: LayoutDashboard },
    {
      label: "Agent Queue",
      href: "/admin/agents",
      icon: UserCheck,
      badge: pendingAgents > 0 ? pendingAgents : undefined,
    },
    { label: "Document Checks", href: "/admin/documents", icon: FileCheck2 },
    { label: "Listings & Reports", href: "/admin/listings", icon: Building2 },
    { label: "Users & Roles", href: "/admin/users", icon: Users },
    { label: "Tiers & Pricing", href: "/admin/tiers", icon: CreditCard },
    { label: "Advertising & Slots", href: "/admin/advertising", icon: Megaphone },
    { label: "Search Analytics", href: "/admin/search-report", icon: Search },
    { label: "Tip of the Day", href: "/admin/tips", icon: Lightbulb },
    { label: "System Rules", href: "/admin/settings", icon: Settings },
    {
      label: "Audit Log",
      href: "/admin/audit-log",
      icon: History,
      badge: auditLogs.length,
    },
  ];

  const currentItem = navItems.find((item) => item.href === pathname);

  return (
    <>
      {/* Mobile Top App Bar (Visible on mobile/tablet < lg) */}
      <div className="lg:hidden sticky top-0 z-40 bg-[#151314] text-white px-4 py-3 flex items-center justify-between border-b border-white/10 shadow-sm w-full">
        <div className="flex items-center gap-3">
          <BrandLogo size="xs" variant="white" />
          <div className="leading-tight">
            <span className="text-[9px] font-black uppercase tracking-wider text-[#FFC800] bg-[#FFC800]/10 px-1.5 py-0.2 rounded border border-[#FFC800]/20 inline-block mb-0.5">
              Admin Console
            </span>
            <h2 className="text-xs font-bold text-white truncate max-w-[190px]">
              {currentItem?.label || "Overview"}
            </h2>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg bg-white/10 hover:bg-white/15 text-white transition-colors relative flex items-center justify-center cursor-pointer active:scale-95"
          aria-label="Toggle admin navigation menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          {pendingAgents > 0 && !mobileOpen && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#008751] text-white text-[9px] font-bold flex items-center justify-center border border-[#151314]">
              {pendingAgents}
            </span>
          )}
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

      {/* Mobile Slide-over Navigation Drawer */}
      <div
        className={`lg:hidden fixed top-0 bottom-0 left-0 w-72 sm:w-80 bg-[#151314] text-white z-50 flex flex-col justify-between p-5 shadow-2xl transition-transform duration-300 ease-out ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-label="Admin Navigation Menu"
      >
        <div>
          {/* Drawer Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
            <div className="flex items-center gap-2.5">
              <BrandLogo size="xs" variant="white" />
              <div>
                <h3 className="font-bold text-xs text-white">Administrative Control</h3>
                <span className="text-[9px] text-[#FFC800] font-mono">Segalex Resources Global</span>
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

          {/* Workstation Pill */}
          <div className="bg-white/5 rounded-xl p-2.5 border border-white/10 mb-3 text-xs flex items-center justify-between">
            <span className="text-stone-400 text-[10px] font-bold uppercase">The Edge Studio Admin</span>
            <span className="flex items-center gap-1 text-[10px] text-[#008751] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#008751] animate-ping" />
              Live Online
            </span>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1 overflow-y-auto max-h-[calc(100vh-230px)] pr-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? "bg-[#008751] text-white shadow-sm"
                      : "text-stone-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-stone-400"}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                        isActive ? "bg-white text-[#008751]" : "bg-white/10 text-stone-300"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Return to Marketplace */}
        <div className="pt-3 border-t border-white/10">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2 text-xs font-bold text-stone-400 hover:text-white px-3 py-2 transition-colors rounded-lg hover:bg-white/5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Exit to Marketplace</span>
          </Link>
        </div>
      </div>

      {/* Desktop Permanent Sidebar (Hidden on mobile < lg) */}
      <aside className="hidden lg:flex w-64 bg-[#151314] text-white flex-col justify-between border-r border-white/10 min-h-screen p-4 flex-shrink-0 sticky top-0 h-screen">
        <div>
          {/* Brand Header */}
          <div className="p-2 mb-4">
            <BrandLogo size="sm" variant="white" />
            <div className="mt-2 text-[10px] font-bold uppercase tracking-wider text-[#FFC800] bg-[#FFC800]/10 px-2 py-0.5 rounded border border-[#FFC800]/20 inline-block">
              Administrative Control Console
            </div>
          </div>

          {/* Admin Desk Status Card */}
          <div className="bg-white/5 rounded-xl p-3 border border-white/10 mb-4 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-stone-400 text-[10px] font-bold uppercase">Workstation</span>
              <span className="flex items-center gap-1 text-[10px] text-[#008751] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#008751] animate-ping" />
                Live Online
              </span>
            </div>
            <div className="mt-1 font-bold text-white text-xs">The Edge Studio • Lead Admin</div>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1 overflow-y-auto max-h-[calc(100vh-280px)] pr-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? "bg-[#008751] text-white shadow-sm"
                      : "text-stone-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-stone-400"}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                        isActive ? "bg-white text-[#008751]" : "bg-white/10 text-stone-300"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Return to Marketplace */}
        <div className="pt-4 border-t border-white/10">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-bold text-stone-400 hover:text-white px-3 py-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Exit to Marketplace</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
