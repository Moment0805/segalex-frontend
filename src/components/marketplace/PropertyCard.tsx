"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PropertyListing } from "@/types";
import { useMarketplace } from "@/context/MarketplaceContext";
import { VerificationBadge } from "@/components/ui/Badge";
import { showToast } from "@/components/ui/Toast";
import { formatNaira, formatRentPrice } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Heart,
  Bed,
  Bath,
  Maximize2,
  Video,
  MapPin,
  CheckCircle2,
  Share2,
} from "lucide-react";

interface PropertyCardProps {
  listing: PropertyListing;
  onHover?: (id: string | null) => void;
  className?: string;
}

export function PropertyCard({ listing, onHover, className = "" }: PropertyCardProps) {
  const { isListingSaved, toggleSaveListing, agents } = useMarketplace();
  const saved = isListingSaved(listing.id);
  const [imgSrc, setImgSrc] = useState(
    listing.photos[0] || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
  );

  const agent = agents.find((a) => a.id === listing.agentId);

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSaveListing(listing.id);
    if (!saved) {
      showToast("Saved to Favorites", `${listing.title.slice(0, 32)}...`);
    } else {
      showToast("Removed from Favorites", undefined, "info");
    }
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof window !== "undefined" && navigator.clipboard) {
      const url = `${window.location.origin}/property/${listing.id}`;
      navigator.clipboard.writeText(url);
      showToast("Link Copied!", "Listing link copied to your clipboard.");
    }
  };

  const priceText =
    listing.purpose === "rent"
      ? formatRentPrice(listing.price, false)
      : formatNaira(listing.price, false);

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      onMouseEnter={() => onHover?.(listing.id)}
      onMouseLeave={() => onHover?.(null)}
      className={`group bg-white rounded-xl border border-stone-200 overflow-hidden shadow-card hover:shadow-elevated transition-shadow duration-200 flex flex-col relative ${className}`}
    >
      {/* Photo Viewport: Strictly 4:3 Aspect Ratio */}
      <div className="relative aspect-[4/3] w-full bg-stone-100 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imgSrc}
          alt={listing.title}
          onError={() =>
            setImgSrc(
              "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
            )
          }
          className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500 ease-out"
          loading="eager"
        />

        {/* Gradient Overlay for Top Badges */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent pointer-events-none" />

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-start justify-between gap-1.5 pointer-events-none z-10">
          <div className="flex flex-wrap items-center gap-1.5 max-w-[70%]">
            {listing.isFeatured && <VerificationBadge type="featured" size="sm" />}
            {listing.isDocumentsChecked && (
              <VerificationBadge
                type="documents-checked"
                size="sm"
                date={listing.documentDetails?.checkedOnDate}
              />
            )}
            {listing.isSponsored && <VerificationBadge type="sponsored" size="sm" />}
          </div>

          <div className="flex items-center gap-1.5 pointer-events-auto">
            <button
              onClick={handleShare}
              title="Share listing"
              aria-label="Share listing"
              className="w-8 h-8 rounded-full bg-white/90 hover:bg-white text-stone-700 flex items-center justify-center shadow-sm backdrop-blur transition-all active:scale-95"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleSave}
              title={saved ? "Remove from saved" : "Save property"}
              aria-label={saved ? "Remove from saved" : "Save property"}
              className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm backdrop-blur transition-all active:scale-95 ${
                saved
                  ? "bg-red-500 text-white"
                  : "bg-white/90 hover:bg-white text-stone-700 hover:text-red-500"
              }`}
            >
              <Heart className={`w-4 h-4 ${saved ? "fill-current" : ""}`} />
            </button>
          </div>
        </div>

        {/* Video Tour Badge Indicator */}
        {listing.videoUrl && (
          <div className="absolute bottom-2.5 left-2.5 z-10 bg-[#151314]/90 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 border border-white/20">
            <Video className="w-3 h-3 text-[#FFC800]" />
            <span>Video Tour</span>
          </div>
        )}

        {/* Purpose Tag Bottom Right */}
        <div className="absolute bottom-2.5 right-2.5 z-10 bg-[#008751] text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shadow-sm">
          For {listing.purpose}
        </div>
      </div>

      {/* Content Area */}
      <Link href={`/property/${listing.id}`} className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Price (Rendered in font-sans to guarantee unclipped ₦ Naira glyph) */}
          <div className="flex items-baseline justify-between gap-2 mb-1">
            <span className="text-xl font-black text-ink tracking-tight font-sans">
              {priceText}
            </span>
            <span className="text-[11px] font-bold text-stone-600 uppercase tracking-wider bg-stone-100 px-2 py-0.5 rounded">
              {listing.propertyType}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-stone-900 group-hover:text-[#008751] transition-colors text-sm line-clamp-1 leading-snug">
            {listing.title}
          </h3>

          {/* Location */}
          <p className="flex items-center gap-1 text-xs text-subtle mt-1 line-clamp-1">
            <MapPin className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
            <span>{listing.address}</span>
          </p>

          {/* Specs / Attributes */}
          <div className="flex items-center gap-3 mt-3 pt-3 border-t border-stone-100 text-xs text-stone-600 font-medium">
            {listing.bedrooms !== undefined && (
              <span className="flex items-center gap-1" title={`${listing.bedrooms} Bedrooms`}>
                <Bed className="w-3.5 h-3.5 text-stone-400" />
                <span>{listing.bedrooms} Beds</span>
              </span>
            )}
            {listing.bathrooms !== undefined && (
              <span className="flex items-center gap-1" title={`${listing.bathrooms} Bathrooms`}>
                <Bath className="w-3.5 h-3.5 text-stone-400" />
                <span>{listing.bathrooms} Baths</span>
              </span>
            )}
            {listing.sizeSqm !== undefined && (
              <span className="flex items-center gap-1" title={`${listing.sizeSqm} Square Meters`}>
                <Maximize2 className="w-3.5 h-3.5 text-stone-400" />
                <span>{listing.sizeSqm} m²</span>
              </span>
            )}
          </div>
        </div>

        {/* Agent Badge in Card Footer */}
        {agent && (
          <div className="mt-3.5 pt-2.5 border-t border-stone-100 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={agent.avatar}
                alt={agent.name}
                className="w-5 h-5 rounded-full object-cover flex-shrink-0"
              />
              <span className="text-[11px] font-semibold text-stone-700 truncate">
                {agent.agencyName}
              </span>
            </div>
            {agent.verificationStatus === "verified" ? (
              <span
                className="flex items-center gap-1 text-[10px] font-bold text-[#008751] bg-[#008751]/10 px-1.5 py-0.5 rounded flex-shrink-0"
                title="LASRERA Verified Broker"
              >
                <CheckCircle2 className="w-3 h-3 text-[#008751]" />
                <span>Verified Agent</span>
              </span>
            ) : (
              <span className="text-[10px] font-semibold text-stone-400">
                Agent
              </span>
            )}
          </div>
        )}
      </Link>
    </motion.div>
  );
}
