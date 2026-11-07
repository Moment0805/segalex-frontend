"use client";

import React from "react";
import Link from "next/link";
import { LAGOS_AREAS } from "@/data/areas";
import { useMarketplace } from "@/context/MarketplaceContext";
import { ArrowUpRight, MapPin, TrendingUp } from "lucide-react";

export function PopularAreas() {
  const { listings } = useMarketplace();

  // Find the 6 key target areas
  const getArea = (slug: string) => LAGOS_AREAS.find((a) => a.slug === slug) || LAGOS_AREAS[0];

  const ikoyi = getArea("ikoyi");
  const bananaIsland = getArea("banana-island");
  const lekki1 = getArea("lekki-phase-1");
  const vi = getArea("victoria-island");
  const ibeju = getArea("ibeju-lekki") || LAGOS_AREAS.find((a) => a.name.includes("Ibeju")) || LAGOS_AREAS[4];
  const epe = getArea("epe") || LAGOS_AREAS.find((a) => a.name.includes("Epe")) || LAGOS_AREAS[5];

  const getListingCount = (areaName: string) => {
    const count = listings.filter((l) =>
      l.area.toLowerCase().includes(areaName.toLowerCase()) ||
      l.address.toLowerCase().includes(areaName.toLowerCase())
    ).length;
    return count > 0 ? `${count} verified ${count === 1 ? 'listing' : 'listings'}` : 'Active corridor';
  };

  return (
    <section id="areas" className="py-16 sm:py-20 bg-[#FAFAF7] border-b border-[#E9E8E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#008751] mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#008751]" />
              <span>Lagos Prime Corridors</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-ink tracking-tight font-display uppercase">
              Explore Popular Neighborhoods
            </h2>
          </div>
          <p className="text-xs text-stone-600 max-w-md leading-relaxed">
            From diplomatic Island waterfronts to fast-appreciating commercial enclaves and the Ibeju-Lekki free trade zone.
          </p>
        </div>

        {/* Asymmetric Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Item 1: Ikoyi (Large feature, 7 cols) */}
          <Link
            href={`/properties?area=${encodeURIComponent(ikoyi.name)}`}
            className="group relative md:col-span-7 h-[300px] sm:h-[340px] rounded-xl overflow-hidden border border-[#E9E8E1] shadow-sm hover:shadow-md transition-all duration-300"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ikoyi.image}
              alt={ikoyi.name}
              className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />

            <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
              <span className="text-[11px] font-bold text-white bg-black/60 backdrop-blur-md px-2.5 py-1 rounded border border-white/10">
                {ikoyi.category}
              </span>
              <span className="text-[11px] font-semibold text-emerald-300 bg-[#008751]/80 backdrop-blur-md px-2.5 py-1 rounded">
                {getListingCount(ikoyi.name)}
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
              <div>
                <h3 className="font-black text-2xl sm:text-3xl font-display uppercase leading-none text-white tracking-tight">
                  {ikoyi.name}
                </h3>
                <p className="text-xs text-stone-300 mt-1.5 max-w-md line-clamp-1">
                  {ikoyi.description}
                </p>
                <div className="mt-2 flex items-center gap-3 text-[11px] text-stone-300">
                  <span>Avg Sale: <strong className="text-white font-sans">{ikoyi.avgSalePrice}</strong></span>
                  <span>·</span>
                  <span>Avg Rent: <strong className="text-white font-sans">{ikoyi.avgRentPrice}</strong></span>
                </div>
              </div>
              <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-[#008751] transition-colors flex-shrink-0">
                <ArrowUpRight className="w-4 h-4 text-white" />
              </div>
            </div>
          </Link>

          {/* Item 2: Banana Island (5 cols) */}
          <Link
            href={`/properties?area=${encodeURIComponent(bananaIsland.name)}`}
            className="group relative md:col-span-5 h-[300px] sm:h-[340px] rounded-xl overflow-hidden border border-[#E9E8E1] shadow-sm hover:shadow-md transition-all duration-300"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={bananaIsland.image}
              alt={bananaIsland.name}
              className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />

            <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
              <span className="text-[11px] font-bold text-white bg-black/60 backdrop-blur-md px-2.5 py-1 rounded border border-white/10">
                {bananaIsland.category}
              </span>
              <span className="text-[11px] font-semibold text-emerald-300 bg-[#008751]/80 backdrop-blur-md px-2.5 py-1 rounded">
                {getListingCount(bananaIsland.name)}
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
              <div>
                <h3 className="font-black text-2xl font-display uppercase leading-none text-white tracking-tight">
                  {bananaIsland.name}
                </h3>
                <p className="text-xs text-stone-300 mt-1.5 line-clamp-1">
                  Private jetties & ultra-luxury waterfront
                </p>
                <div className="mt-2 text-[11px] text-stone-300">
                  <span>Avg Sale: <strong className="text-white font-sans">{bananaIsland.avgSalePrice}</strong></span>
                </div>
              </div>
              <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-[#008751] transition-colors flex-shrink-0">
                <ArrowUpRight className="w-4 h-4 text-white" />
              </div>
            </div>
          </Link>

          {/* Item 3: Lekki Phase 1 (4 cols) */}
          <Link
            href={`/properties?area=${encodeURIComponent(lekki1.name)}`}
            className="group relative md:col-span-4 h-[250px] sm:h-[280px] rounded-xl overflow-hidden border border-[#E9E8E1] shadow-sm hover:shadow-md transition-all duration-300"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={lekki1.image}
              alt={lekki1.name}
              className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />

            <div className="absolute top-3 left-3 flex items-center gap-1.5">
              <span className="text-[10px] font-semibold text-emerald-300 bg-[#008751]/80 backdrop-blur-md px-2 py-0.5 rounded">
                {getListingCount(lekki1.name)}
              </span>
            </div>

            <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-end justify-between text-white">
              <div>
                <h3 className="font-black text-xl font-display uppercase leading-none text-white">
                  {lekki1.name}
                </h3>
                <p className="text-[11px] text-stone-300 mt-1 line-clamp-1">
                  Admiralty commercial & modern duplexes
                </p>
                <p className="text-[11px] text-stone-300 mt-1 font-sans">
                  From {lekki1.avgSalePrice.split("-")[0]}
                </p>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-[#008751] transition-colors flex-shrink-0">
                <ArrowUpRight className="w-3.5 h-3.5 text-white" />
              </div>
            </div>
          </Link>

          {/* Item 4: Victoria Island (4 cols) */}
          <Link
            href={`/properties?area=${encodeURIComponent(vi.name)}`}
            className="group relative md:col-span-4 h-[250px] sm:h-[280px] rounded-xl overflow-hidden border border-[#E9E8E1] shadow-sm hover:shadow-md transition-all duration-300"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={vi.image}
              alt={vi.name}
              className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />

            <div className="absolute top-3 left-3 flex items-center gap-1.5">
              <span className="text-[10px] font-semibold text-emerald-300 bg-[#008751]/80 backdrop-blur-md px-2 py-0.5 rounded">
                {getListingCount(vi.name)}
              </span>
            </div>

            <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-end justify-between text-white">
              <div>
                <h3 className="font-black text-xl font-display uppercase leading-none text-white">
                  {vi.name}
                </h3>
                <p className="text-[11px] text-stone-300 mt-1 line-clamp-1">
                  Grade-A commercial & high-yield rentals
                </p>
                <p className="text-[11px] text-stone-300 mt-1 font-sans">
                  Avg rent {vi.avgRentPrice}
                </p>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-[#008751] transition-colors flex-shrink-0">
                <ArrowUpRight className="w-3.5 h-3.5 text-white" />
              </div>
            </div>
          </Link>

          {/* Item 5: Ibeju-Lekki (4 cols) */}
          <Link
            href={`/properties?area=${encodeURIComponent(ibeju.name)}`}
            className="group relative md:col-span-4 h-[250px] sm:h-[280px] rounded-xl overflow-hidden border border-[#E9E8E1] shadow-sm hover:shadow-md transition-all duration-300"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ibeju.image}
              alt={ibeju.name}
              className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />

            <div className="absolute top-3 left-3 flex items-center gap-1.5">
              <span className="text-[10px] font-semibold text-emerald-300 bg-[#008751]/80 backdrop-blur-md px-2 py-0.5 rounded">
                {getListingCount(ibeju.name)}
              </span>
            </div>

            <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-end justify-between text-white">
              <div>
                <h3 className="font-black text-xl font-display uppercase leading-none text-white">
                  {ibeju.name}
                </h3>
                <p className="text-[11px] text-stone-300 mt-1 line-clamp-1">
                  Free Trade Zone, deep seaport & verified land
                </p>
                <p className="text-[11px] text-stone-300 mt-1 font-sans">
                  Plots from {ibeju.avgSalePrice.split("-")[0]}
                </p>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-[#008751] transition-colors flex-shrink-0">
                <ArrowUpRight className="w-3.5 h-3.5 text-white" />
              </div>
            </div>
          </Link>

          {/* Item 6: Epe Corridor Wide Panorama (12 cols) */}
          <Link
            href={`/properties?area=${encodeURIComponent(epe.name)}`}
            className="group relative md:col-span-12 h-[160px] sm:h-[180px] rounded-xl overflow-hidden border border-[#E9E8E1] shadow-sm hover:shadow-md transition-all duration-300"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={epe.image}
              alt={epe.name}
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30" />

            <div className="absolute inset-0 p-5 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-white">
              <div className="max-w-xl">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-[#FFC800] text-black px-2 py-0.5 rounded">
                    High Capital Growth
                  </span>
                  <span className="text-xs text-stone-300">Lekki-Epe Expressway Axis</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black font-display uppercase leading-tight text-white">
                  {epe.name} Corridor & Alaro City
                </h3>
                <p className="text-xs text-stone-300 mt-1 line-clamp-1">
                  Dry titled agricultural and residential acreages with approved layout plans.
                </p>
              </div>

              <div className="flex items-center gap-3 self-start sm:self-auto">
                <span className="text-xs font-semibold text-emerald-300 bg-[#008751]/80 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                  {getListingCount(epe.name)}
                </span>
                <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-[#008751] transition-colors flex-shrink-0">
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* View All Areas Link */}
        <div className="mt-8 text-center">
          <Link
            href="/properties"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#008751] hover:underline uppercase tracking-wider"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Browse listings across all 13 Lagos operating corridors →</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
