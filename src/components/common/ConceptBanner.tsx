"use client";

import React from "react";
import { useMarketplace } from "@/context/MarketplaceContext";
import { X } from "lucide-react";

export function ConceptBanner() {
  const { topBannerDismissed, dismissTopBanner } = useMarketplace();

  if (topBannerDismissed) return null;

  return (
    <aside
      aria-label="Concept prototype disclaimer"
      className="bg-[#151314] text-[#F1F0EA] text-xs py-1.5 px-4 border-b border-white/10 relative z-50 transition-all duration-200"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-hidden text-ellipsis whitespace-nowrap text-[12px] text-stone-300">
          <span>Concept prototype by</span>
          <a
            href="mailto:contact@weareedge.studio"
            className="inline-flex items-center gap-1 text-white hover:text-[#FFC800] transition-colors"
            title="The Edge Studio"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/edge-studio-logo-white.svg"
              alt="The Edge Studio"
              className="h-3.5 w-auto inline-block"
            />
            <span className="font-semibold text-white">The Edge Studio</span>
          </a>
          <span className="text-stone-400 hidden sm:inline ml-1">
            · All agents, listings, and registration numbers are sample data.
          </span>
        </div>
        <button
          onClick={dismissTopBanner}
          className="text-stone-400 hover:text-white transition-colors p-1 rounded hover:bg-white/10 flex-shrink-0 flex items-center justify-center cursor-pointer"
          aria-label="Close prototype disclaimer"
          title="Dismiss"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
}
