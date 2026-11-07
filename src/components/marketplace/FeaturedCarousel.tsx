"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PropertyListing } from "@/types";
import { PropertyCard } from "./PropertyCard";
import { ArrowRight } from "lucide-react";

interface FeaturedCarouselProps {
  listings: PropertyListing[];
}

export function FeaturedCarousel({ listings }: FeaturedCarouselProps) {
  const [filter, setFilter] = useState<"all" | "sale" | "rent" | "land">("all");

  const featuredListings = listings.filter((p) => p.isFeatured || p.isDocumentsChecked);

  const filtered = featuredListings.filter((p) => {
    if (filter === "sale") return p.purpose === "sale" && p.propertyType !== "land";
    if (filter === "rent") return p.purpose === "rent";
    if (filter === "land") return p.propertyType === "land";
    return true;
  });

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#151314] mb-1">
              <span className="w-2 h-2 rounded-full bg-[#FFC800]" />
              <span className="bg-[#FFC800] text-[#151314] px-2 py-0.5 rounded text-[10px] font-bold">
                Featured
              </span>
              <span className="text-stone-500 font-semibold">Priority Verified Placements</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-ink tracking-tight font-display uppercase">
              Handpicked Verified Properties
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 bg-[#F1F0EA] p-1 rounded-xl overflow-x-auto self-start md:self-auto max-w-full">
            {(["all", "sale", "rent", "land"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  filter === tab
                    ? "bg-[#151314] text-white shadow-sm"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                {tab === "all" ? "All Featured" : tab === "land" ? "Land (m²)" : `For ${tab}`}
              </button>
            ))}
          </div>
        </div>

        {/* Listings Grid: Responsive 1/2/3/4 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {filtered.slice(0, 8).map((listing) => (
            <PropertyCard key={listing.id} listing={listing} />
          ))}
        </div>

        {/* Bottom Explorer Action */}
        <div className="mt-10 text-center">
          <Link
            href="/properties?isFeatured=true"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#151314] hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-sm hover:shadow"
          >
            <span>View All {featuredListings.length} Featured Properties</span>
            <ArrowRight className="w-4 h-4 text-[#FFC800]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
