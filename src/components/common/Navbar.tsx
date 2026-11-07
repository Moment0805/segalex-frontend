"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "@/components/common/BrandLogo";
import { useMarketplace } from "@/context/MarketplaceContext";
import { UserRole } from "@/types";
import {
  Heart,
  Bell,
  Menu,
  X,
  ChevronDown,
  Plus,
} from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const { savedListingIds, notifications, userRole, setUserRole } = useMarketplace();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Find property", href: "/properties" },
    { label: "Areas", href: "/#areas" },
    { label: "Agents", href: "/agents" },
    { label: "How it works", href: "/how-verification-works" },
    { label: "For agents", href: "/packages" },
  ];

  const roles: UserRole[] = ["visitor", "buyer", "agent", "admin"];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 border-b border-[#E9E8E1] ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm py-2"
          : "bg-white/95 backdrop-blur-md py-2.5 sm:py-3"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Logo alone on the left */}
        <BrandLogo size={scrolled ? "sm" : "md"} />

        {/* Center Nav: Sentence case, calm and tight */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 flex-shrink-0">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-[#008751] ${
                  isActive
                    ? "text-[#008751] font-semibold"
                    : "text-stone-700"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right side controls */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {/* Saved Listings */}
          <Link
            href="/account"
            className="relative p-2 rounded-lg text-stone-700 hover:text-stone-900 hover:bg-stone-100 transition-colors"
            title="Saved properties"
            aria-label="Saved properties"
          >
            <Heart className="w-5 h-5" />
            {savedListingIds.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#D93025] text-white text-[10px] font-bold flex items-center justify-center">
                {savedListingIds.length}
              </span>
            )}
          </Link>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-2 rounded-lg text-stone-700 hover:text-stone-900 hover:bg-stone-100 transition-colors"
              title="Notifications"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#008751] text-white text-[10px] font-bold flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-elevated border border-[#E9E8E1] p-3 z-50 text-xs animate-in fade-in duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                  <span className="font-semibold text-stone-900">Notifications</span>
                  <span className="text-[10px] bg-stone-100 px-1.5 py-0.5 rounded text-stone-600 font-medium">
                    {notifications.length} updates
                  </span>
                </div>
                <div className="divide-y divide-stone-100 max-h-60 overflow-y-auto">
                  {notifications.map((n) => (
                    <div key={n.id} className="py-2.5 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-stone-900">{n.title}</span>
                        <span className="text-[10px] text-stone-400">{n.timestamp}</span>
                      </div>
                      <p className="text-stone-600 leading-relaxed text-[11px]">{n.message}</p>
                      {n.link && (
                        <Link
                          href={n.link}
                          onClick={() => setNotificationsOpen(false)}
                          className="inline-block text-[#008751] font-medium text-[11px] hover:underline"
                        >
                          View details →
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Small Role Switcher Pill */}
          <div className="relative">
            <button
              onClick={() => setRoleMenuOpen(!roleMenuOpen)}
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200/80 border border-[#E9E8E1] text-stone-800 text-xs font-medium transition-colors"
              title="Change active role"
            >
              <span className="text-stone-500 text-[11px]">Role:</span>
              <span className="capitalize font-semibold text-ink">{userRole}</span>
              <ChevronDown className="w-3.5 h-3.5 text-stone-500" />
            </button>

            {roleMenuOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-white rounded-xl shadow-elevated border border-[#E9E8E1] py-1 z-50 text-xs">
                {roles.map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      setUserRole(r);
                      setRoleMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs capitalize flex items-center justify-between hover:bg-stone-50 ${
                      userRole === r ? "text-[#008751] font-semibold bg-[#008751]/5" : "text-stone-700"
                    }`}
                  >
                    <span>{r}</span>
                    {userRole === r && <span className="w-1.5 h-1.5 rounded-full bg-[#008751]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Green "List property" button */}
          <Link
            href={userRole === "agent" ? "/agent/listings/new" : "/agent/register"}
            className="hidden sm:inline-flex items-center justify-center gap-1.5 px-4 min-h-[40px] bg-[#008751] hover:bg-[#00563A] text-white text-xs font-semibold rounded-lg transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>List property</span>
          </Link>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-stone-700 hover:bg-stone-100"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#E9E8E1] px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2.5 px-3 rounded-lg text-sm font-medium text-stone-800 hover:bg-stone-50 hover:text-[#008751]"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-[#E9E8E1] space-y-2">
            <div className="flex items-center justify-between px-3 py-2 bg-stone-50 rounded-lg text-xs font-medium">
              <span className="text-stone-500">Active role:</span>
              <div className="flex items-center gap-1">
                {roles.map((r) => (
                  <button
                    key={r}
                    onClick={() => setUserRole(r)}
                    className={`px-2 py-1 rounded text-xs capitalize ${
                      userRole === r ? "bg-[#008751] text-white font-semibold" : "text-stone-700 bg-white border border-stone-200"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <Link
              href={userRole === "agent" ? "/agent/listings/new" : "/agent/register"}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#008751] text-white font-medium rounded-lg text-sm"
            >
              <Plus className="w-4 h-4" />
              <span>List property</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
