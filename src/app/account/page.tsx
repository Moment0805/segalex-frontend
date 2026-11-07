"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { PropertyCard } from "@/components/marketplace/PropertyCard";
import { useMarketplace } from "@/context/MarketplaceContext";
import { showToast } from "@/components/ui/Toast";
import {
  Heart,
  Bell,
  Search,
  MessageSquare,
  Trash2,
  CheckCircle2,
  Clock,
  ArrowRight,
  User,
  ShieldCheck,
} from "lucide-react";

export default function BuyerAccountPage() {
  const {
    listings,
    savedListingIds,
    savedSearches,
    removeSavedSearch,
    toggleSearchAlert,
    enquiries,
    notifications,
    markAllNotificationsRead,
    userRole,
    setUserRole,
  } = useMarketplace();

  const [activeTab, setActiveTab] = useState<"saved" | "searches" | "enquiries" | "alerts">("saved");
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const savedListings = listings.filter((p) => savedListingIds.includes(p.id));

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-darktext">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
        {/* User Account Header */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#151314] text-white flex items-center justify-center font-bold text-xl font-display">
              BA
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-stone-900 leading-tight">
                  Dr. Babatunde Adele
                </h1>
                <span className="text-[10px] bg-emerald-50 text-[#008751] font-bold px-2 py-0.5 rounded border border-emerald-200">
                  Verified Buyer
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                babatunde.adele@example.com • Lagos, Nigeria
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <span className="text-[10px] uppercase font-bold text-stone-400 block">
                Active Inquiries
              </span>
              <span className="font-bold text-stone-900 text-sm">{enquiries.length} Active Leads</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-stone-200 overflow-x-auto pb-1 text-xs font-bold uppercase tracking-wider">
          <button
            onClick={() => setActiveTab("saved")}
            className={`pb-3 px-3 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "saved"
                ? "border-[#008751] text-[#008751]"
                : "border-transparent text-stone-500 hover:text-stone-900"
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Saved Listings ({savedListings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("searches")}
            className={`pb-3 px-3 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "searches"
                ? "border-[#008751] text-[#008751]"
                : "border-transparent text-stone-500 hover:text-stone-900"
            }`}
          >
            <Search className="w-4 h-4" />
            <span>Saved Searches ({savedSearches.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("enquiries")}
            className={`pb-3 px-3 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "enquiries"
                ? "border-[#008751] text-[#008751]"
                : "border-transparent text-stone-500 hover:text-stone-900"
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Enquiries & Viewings ({enquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("alerts")}
            className={`pb-3 px-3 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "alerts"
                ? "border-[#008751] text-[#008751]"
                : "border-transparent text-stone-500 hover:text-stone-900"
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>Alerts & Activity ({notifications.length})</span>
          </button>
        </div>

        {/* Content Panes */}
        <div>
          {/* TAB 1: SAVED LISTINGS */}
          {activeTab === "saved" && (
            <div>
              {savedListings.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 border border-stone-200 text-center space-y-3">
                  <Heart className="w-10 h-10 text-stone-300 mx-auto" />
                  <h3 className="font-bold text-base text-stone-800">No saved properties yet</h3>
                  <p className="text-xs text-stone-500 max-w-sm mx-auto">
                    Tap the heart icon on any property in Lagos to bookmark it for inspection.
                  </p>
                  <Link
                    href="/properties"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#008751] text-white rounded-xl text-xs font-bold uppercase tracking-wider"
                  >
                    <span>Browse Listings</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedListings.map((listing) => (
                    <PropertyCard key={listing.id} listing={listing} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: SAVED SEARCHES */}
          {activeTab === "searches" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-stone-600">
                  Manage search criteria and automated notification triggers.
                </p>
                <Link
                  href="/properties"
                  className="text-xs font-bold text-[#008751] hover:underline"
                >
                  Create New Search →
                </Link>
              </div>

              <div className="space-y-3">
                {savedSearches.map((search) => (
                  <div
                    key={search.id}
                    className="bg-white rounded-xl p-4 border border-stone-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <h4 className="font-bold text-sm text-stone-900">{search.queryTitle}</h4>
                      <div className="flex flex-wrap items-center gap-2 text-[11px] text-stone-500">
                        {search.area && <span>Area: {search.area}</span>}
                        {search.propertyType && <span>• Type: {search.propertyType}</span>}
                        {search.documentsCheckedOnly && (
                          <span className="text-[#008751] font-bold">• Documents Checked</span>
                        )}
                        <span>• Saved on {new Date(search.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleSearchAlert(search.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                          search.alertEnabled
                            ? "bg-emerald-50 text-[#008751] border border-emerald-200"
                            : "bg-stone-100 text-stone-500"
                        }`}
                      >
                        <Bell className="w-3.5 h-3.5" />
                        <span>{search.alertEnabled ? "Alerts Active" : "Alerts Muted"}</span>
                      </button>

                      <button
                        onClick={() => {
                          removeSavedSearch(search.id);
                          showToast("Search Removed", undefined, "info");
                        }}
                        className="p-2 text-stone-400 hover:text-red-600 rounded-lg transition-colors"
                        title="Delete saved search"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <Link
                        href={`/properties?area=${encodeURIComponent(search.area || "")}`}
                        className="px-3.5 py-1.5 bg-[#151314] text-white rounded-lg text-xs font-bold"
                      >
                        Run Search
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: ENQUIRY HISTORY */}
          {activeTab === "enquiries" && (
            <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
              <div className="p-4 bg-[#FAFAF7] border-b border-stone-200">
                <h3 className="font-bold text-xs uppercase tracking-wide text-stone-700">
                  Direct Inquiries & WhatsApp Activity
                </h3>
              </div>
              <div className="divide-y divide-stone-100 text-xs">
                {enquiries.map((enq) => (
                  <div key={enq.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-stone-900">{enq.listingTitle}</span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            enq.status === "Closed"
                              ? "bg-stone-100 text-stone-600"
                              : enq.status === "Viewing"
                              ? "bg-purple-50 text-purple-700"
                              : enq.status === "Contacted"
                              ? "bg-blue-50 text-blue-700"
                              : "bg-emerald-50 text-[#008751]"
                          }`}
                        >
                          Status: {enq.status}
                        </span>
                      </div>
                      <p className="text-stone-600 text-xs line-clamp-1 italic">
                        "{enq.message}"
                      </p>
                      <div className="text-[11px] text-stone-400 flex items-center gap-2">
                        <span>Price: <strong>{enq.listingPrice}</strong></span>
                        <span>•</span>
                        <span>Sent via {enq.channel} on {new Date(enq.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <Link
                      href={`/property/${enq.listingId}`}
                      className="px-3.5 py-2 border border-stone-200 hover:border-stone-400 rounded-lg font-bold text-stone-800 whitespace-nowrap text-center"
                    >
                      View Property
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: ALERTS */}
          {activeTab === "alerts" && (
            <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <h3 className="font-bold text-sm text-stone-900">Recent Notifications & Activity</h3>
                <button
                  onClick={markAllNotificationsRead}
                  className="text-xs text-[#008751] font-bold hover:underline"
                >
                  Mark all as read
                </button>
              </div>

              <div className="divide-y divide-stone-100">
                {notifications.map((n) => (
                  <div key={n.id} className="py-3 flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {!n.isRead && <span className="w-2 h-2 rounded-full bg-[#008751]" />}
                        <span className="font-bold text-xs text-stone-900">{n.title}</span>
                        <span className="text-[10px] text-stone-400">{n.timestamp}</span>
                      </div>
                      <p className="text-xs text-stone-600">{n.message}</p>
                    </div>
                    {n.link && (
                      <Link
                        href={n.link}
                        className="text-xs font-bold text-[#008751] hover:underline whitespace-nowrap"
                      >
                        Inspect →
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

