"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMarketplace } from "@/context/MarketplaceContext";
import { BrandLogo } from "@/components/common/BrandLogo";
import {
  ShieldCheck,
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
  AlertCircle,
} from "lucide-react";

export function AdminSidebar() {
  const pathname = usePathname();
  const { agents, listings, auditLogs } = useMarketplace();

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

  return (
    <aside className="w-64 bg-[#151314] text-white flex flex-col justify-between border-r border-white/10 min-h-screen p-4 flex-shrink-0">
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
  );
}

