"use client";

import React, { useState } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { GalleryLightbox } from "@/components/marketplace/GalleryLightbox";
import { WhatWeCheckedPanel } from "@/components/marketplace/WhatWeCheckedPanel";
import { AgentStickyCard } from "@/components/marketplace/AgentStickyCard";
import { PropertyCard } from "@/components/marketplace/PropertyCard";
import { ReportModal } from "@/components/marketplace/ReportModal";
import { WhatsAppShareModal } from "@/components/marketplace/WhatsAppShareModal";
import { LeafletMap } from "@/components/marketplace/LeafletMap";
import { VerificationBadge } from "@/components/ui/Badge";
import { showToast } from "@/components/ui/Toast";
import { useMarketplace } from "@/context/MarketplaceContext";
import { formatNaira, formatRentPrice } from "@/lib/utils";
import {
  Bed,
  Bath,
  Maximize2,
  MapPin,
  Heart,
  Share2,
  ShieldCheck,
  AlertTriangle,
  Calendar,
  CheckCircle2,
  FileCheck2,
  Eye,
  ArrowLeft,
} from "lucide-react";

export default function PropertyDetailsPage() {
  const params = useParams();
  const propertyId = params.id as string;
  const { listings, agents, isListingSaved, toggleSaveListing } = useMarketplace();

  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const listing = listings.find((p) => p.id === propertyId);
  if (!listing) {
    return notFound();
  }

  const agent = agents.find((a) => a.id === listing.agentId) || agents[0];
  const saved = isListingSaved(listing.id);

  const similarListings = listings
    .filter((p) => p.id !== listing.id && (p.area === listing.area || p.propertyType === listing.propertyType))
    .slice(0, 3);

  const handleSave = () => {
    toggleSaveListing(listing.id);
    if (!saved) {
      showToast("Saved to Favorites", listing.title);
    } else {
      showToast("Removed from Favorites", undefined, "info");
    }
  };

  const handleShare = () => {
    setShareModalOpen(true);
  };

  const priceText =
    listing.purpose === "rent"
      ? formatRentPrice(listing.price, false)
      : formatNaira(listing.price, false);

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-darktext">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between text-xs text-stone-500">
          <Link
            href="/properties"
            className="inline-flex items-center gap-1.5 font-bold hover:text-stone-900 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Lagos Properties</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] text-stone-400">ID: {listing.id}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5 text-stone-400" />
              <span>{listing.views} views</span>
            </span>
          </div>
        </div>

        {/* Gallery Section (Photos + Playable Video Lightbox) */}
        <GalleryLightbox
          photos={listing.photos}
          videoUrl={listing.videoUrl}
          videoPoster={listing.videoPoster}
          title={listing.title}
        />

        {/* Main Content & Sticky Sidebar Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Details & Panels */}
          <div className="lg:col-span-8 space-y-8">
            {/* Title & Badges Header */}
            <div>
              {/* Badges Row */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {listing.isDocumentsChecked && (
                  <VerificationBadge
                    type="documents-checked"
                    date={listing.documentDetails?.checkedOnDate}
                  />
                )}
                {agent.verificationStatus === "verified" && (
                  <VerificationBadge type="verified-agent" />
                )}
                {agent.isErcaanMember && <VerificationBadge type="ercaan" />}
                {listing.isFeatured && <VerificationBadge type="featured" />}
                {listing.isSponsored && <VerificationBadge type="sponsored" />}
              </div>

              {/* Price & Actions Row */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-3 border-b border-stone-200">
                <div>
                  <div className="text-3xl sm:text-4xl font-black text-ink tracking-tight font-sans">
                    {priceText}
                  </div>
                  <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                    {listing.purpose === "rent" ? "Annual Lease Rent" : "Outright Purchase Price"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleShare}
                    className="px-3.5 py-2 rounded-xl border border-stone-200 hover:border-stone-400 bg-white text-stone-800 text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 shadow-sm"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share</span>
                  </button>
                  <button
                    onClick={handleSave}
                    className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 shadow-sm ${
                      saved
                        ? "bg-red-500 text-white"
                        : "bg-white border border-stone-200 text-stone-800 hover:text-red-500"
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${saved ? "fill-current" : ""}`} />
                    <span>{saved ? "Saved" : "Save"}</span>
                  </button>
                </div>
              </div>

              {/* Title & Address */}
              <h1 className="text-xl sm:text-3xl font-black text-stone-900 mt-4 leading-snug">
                {listing.title}
              </h1>
              <p className="flex items-center gap-1.5 text-xs sm:text-sm text-subtle mt-1.5">
                <MapPin className="w-4 h-4 text-[#008751] flex-shrink-0" />
                <span>{listing.address}</span>
              </p>
            </div>

            {/* Key Facts Specs Strip */}
            <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              {listing.bedrooms !== undefined && (
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-[#F1F0EA] flex items-center justify-center text-stone-700">
                    <Bed className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-stone-400 block">Bedrooms</span>
                    <span className="font-bold text-stone-900 text-sm">{listing.bedrooms} Beds</span>
                  </div>
                </div>
              )}

              {listing.bathrooms !== undefined && (
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-[#F1F0EA] flex items-center justify-center text-stone-700">
                    <Bath className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-stone-400 block">Bathrooms</span>
                    <span className="font-bold text-stone-900 text-sm">{listing.bathrooms} Baths</span>
                  </div>
                </div>
              )}

              {listing.sizeSqm !== undefined && (
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-[#F1F0EA] flex items-center justify-center text-stone-700">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-stone-400 block">Area / Size</span>
                    <span className="font-bold text-stone-900 text-sm">{listing.sizeSqm} m²</span>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-[#F1F0EA] flex items-center justify-center text-stone-700">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">Expiry Status</span>
                  <span className="font-bold text-[#008751] text-xs">Active (60-day rule)</span>
                </div>
              </div>
            </div>

            {/* "What We Checked" Panel */}
            <WhatWeCheckedPanel
              isDocumentsChecked={listing.isDocumentsChecked}
              documentDetails={listing.documentDetails}
            />

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200 shadow-sm space-y-4">
              <h3 className="font-black text-lg text-ink uppercase tracking-tight font-display">
                Property Overview & Description
              </h3>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed whitespace-pre-line">
                {listing.description}
              </p>
            </div>

            {/* Features & Amenities */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200 shadow-sm space-y-4">
              <h3 className="font-black text-lg text-ink uppercase tracking-tight font-display">
                Features & Security Infrastructure
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {listing.features.map((feat, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-xs font-semibold text-stone-800 p-2.5 rounded-lg bg-[#FAFAF7] border border-stone-100"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#008751] flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map Location Pin */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-lg text-ink uppercase tracking-tight font-display">
                  Location & Neighborhood Context
                </h3>
                <span className="text-xs text-stone-500 font-semibold">{listing.area}, Lagos</span>
              </div>
              <div className="h-72 rounded-xl overflow-hidden border border-stone-200">
                <LeafletMap
                  listings={[listing]}
                  center={[listing.coordinates.lat, listing.coordinates.lng]}
                  zoom={14}
                />
              </div>
            </div>

            {/* Report Listing Trigger */}
            <div className="p-4 rounded-xl bg-stone-100/70 border border-stone-200 flex items-center justify-between text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-stone-400" />
                <span>Notice any discrepancy or unverified claims?</span>
              </div>
              <button
                onClick={() => setReportModalOpen(true)}
                className="text-red-600 font-bold hover:underline"
              >
                Report this listing
              </button>
            </div>
          </div>

          {/* Right Column: Sticky Verified Agent Card */}
          <div className="lg:col-span-4">
            <AgentStickyCard agent={agent} listing={listing} />
          </div>
        </div>

        {/* Similar Listings Carousel */}
        {similarListings.length > 0 && (
          <div className="pt-10 border-t border-stone-200 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#008751] uppercase tracking-wider">
                  Similar Verified Options
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-ink uppercase font-display mt-0.5">
                  Properties You May Also Consider
                </h3>
              </div>
              <Link
                href={`/properties?area=${encodeURIComponent(listing.area)}`}
                className="text-xs font-bold text-[#008751] hover:underline uppercase tracking-wider"
              >
                More in {listing.area} →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarListings.map((sim) => (
                <PropertyCard key={sim.id} listing={sim} />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Report Modal */}
      <ReportModal
        listingId={listing.id}
        listingTitle={listing.title}
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
      />

      {/* WhatsApp Share Preview Modal */}
      <WhatsAppShareModal
        listing={listing}
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
      />

      <Footer />
    </div>
  );
}

