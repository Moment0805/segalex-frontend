"use client";

import React from "react";
import Link from "next/link";
import { AdBanner } from "@/types";
import { useMarketplace } from "@/context/MarketplaceContext";
import { ExternalLink } from "lucide-react";

interface AdBannerCardProps {
  slot: "home_mid" | "search_feed";
  className?: string;
}

export function AdBannerCard({ slot, className = "" }: AdBannerCardProps) {
  const { ads, updateAdBanner } = useMarketplace();

  const banner = ads.find((a) => a.slot === slot && a.isActive);
  if (!banner) return null;

  const handleClick = () => {
    updateAdBanner(banner.id, { clicks: banner.clicks + 1 });
  };

  return (
    <div className={`my-8 max-w-7xl mx-auto px-4 sm:px-6 ${className}`}>
      <div className="relative rounded-2xl overflow-hidden border border-stone-200 bg-[#151314] shadow-card group">
        {/* Subtle Label */}
        <div className="absolute top-2.5 right-3 z-10 bg-black/60 backdrop-blur-sm text-stone-300 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-white/10">
          Advertisement
        </div>

        <Link
          href={banner.destinationUrl}
          onClick={handleClick}
          className="block relative aspect-[21/9] sm:aspect-[24/6] overflow-hidden"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={banner.imageUrl}
            alt={banner.title}
            className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-300 opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent flex items-center p-6 sm:p-10">
            <div className="max-w-xl text-white">
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-[#FFC800] bg-[#FFC800]/20 px-2 py-0.5 rounded">
                Sponsored Partner • {banner.sponsorName}
              </span>
              <h3 className="text-base sm:text-2xl lg:text-3xl font-black font-display uppercase tracking-tight mt-2 text-white leading-tight">
                {banner.title}
              </h3>
              <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#008751] px-4 py-2 rounded-lg hover:bg-[#00563A] transition-colors">
                <span>Explore Investment Details</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

