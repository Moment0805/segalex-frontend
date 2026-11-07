"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PropertyListing, Agent } from "@/types";
import { useMarketplace } from "@/context/MarketplaceContext";
import { formatNaira, formatRentPrice } from "@/lib/utils";
import { X, Award, MessageCircle, ArrowRight, ShieldCheck } from "lucide-react";

interface ExclusivePopupProps {
  areaSearched?: string;
  forceShow?: boolean;
}

export function ExclusivePopup({ areaSearched, forceShow = false }: ExclusivePopupProps) {
  const { listings, agents, exclusivePopupShownThisSession, markExclusivePopupShown } = useMarketplace();
  const [dismissed, setDismissed] = useState(false);

  // Check if we should trigger: target area e.g. "Ibeju-Lekki" or "Ikoyi" or forced demo trigger
  const isTargetArea =
    forceShow ||
    (areaSearched &&
      (areaSearched.toLowerCase().includes("ibeju") ||
        areaSearched.toLowerCase().includes("ikoyi") ||
        areaSearched.toLowerCase().includes("banana")));

  if (dismissed || (!forceShow && (exclusivePopupShownThisSession || !isTargetArea))) {
    return null;
  }

  // Find a Premium listing in this area (e.g., Segalex prop-3 or prop-1)
  const premiumListing: PropertyListing =
    listings.find(
      (p) =>
        p.isSponsored &&
        (areaSearched ? p.area.toLowerCase().includes(areaSearched.toLowerCase()) : true)
    ) || listings[2]; // Default to prop-3 (Ibeju-Lekki commercial land)

  const agent: Agent | undefined = agents.find((a) => a.id === premiumListing.agentId) || agents[0];

  const handleDismiss = () => {
    setDismissed(true);
    markExclusivePopupShown();
  };

  const whatsappMessage = encodeURIComponent(
    `Hello ${agent.name}, I noticed your exclusive sponsored listing on Segalex Property Hub: "${premiumListing.title}" (${premiumListing.priceDisplay}). I would like more information.`
  );

  return (
    <div className="fixed bottom-6 left-6 z-40 max-w-sm w-full bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
      {/* Top Gold Sponsored Ribbon */}
      <div className="bg-[#151314] text-white px-3.5 py-1.5 flex items-center justify-between text-xs border-b border-white/10">
        <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[10px] text-[#FFC800]">
          <Award className="w-3.5 h-3.5 text-[#FFC800]" />
          <span>Exclusive Sponsored Feature • {premiumListing.area}</span>
        </div>
        <button
          onClick={handleDismiss}
          className="text-stone-400 hover:text-white transition-colors p-0.5 rounded"
          aria-label="Dismiss sponsored card"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="p-3.5">
        <div className="flex gap-3 items-start">
          {/* Thumbnail */}
          <div className="w-20 h-20 rounded-lg overflow-hidden bg-stone-100 flex-shrink-0 relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={premiumListing.photos[0]}
              alt={premiumListing.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="text-[10px] bg-emerald-50 text-[#008751] font-bold px-1.5 py-0.2 rounded border border-emerald-200 flex items-center gap-1">
                <ShieldCheck className="w-2.5 h-2.5" />
                Verified
              </span>
              <span className="text-[10px] font-semibold text-stone-500 truncate">
                {agent.agencyName}
              </span>
            </div>

            <h4 className="font-bold text-stone-900 text-xs line-clamp-1 leading-snug">
              {premiumListing.title}
            </h4>

            <p className="text-sm font-black text-[#008751] mt-0.5 font-sans">
              {premiumListing.purpose === "rent"
                ? formatRentPrice(premiumListing.price, false)
                : formatNaira(premiumListing.price, false)}
            </p>

            <p className="text-[10px] text-stone-500 line-clamp-1 mt-0.5">
              {premiumListing.tagline}
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-2 mt-3 pt-2.5 border-t border-stone-100">
          <a
            href={`https://wa.me/${agent.whatsapp}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleDismiss}
            className="flex items-center justify-center gap-1.5 py-1.5 px-2 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-lg text-xs font-bold transition-all shadow-sm"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>

          <Link
            href={`/property/${premiumListing.id}`}
            onClick={handleDismiss}
            className="flex items-center justify-center gap-1 py-1.5 px-2 bg-[#151314] hover:bg-stone-800 text-white rounded-lg text-xs font-bold transition-all"
          >
            <span>View Property</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}

