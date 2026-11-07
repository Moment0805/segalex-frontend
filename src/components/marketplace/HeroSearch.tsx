"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMarketplace } from "@/context/MarketplaceContext";
import { LAGOS_AREAS } from "@/data/areas";
import { motion } from "framer-motion";
import {
  Search,
  MapPin,
  Home,
  DollarSign,
  Bed,
  CheckCircle2,
  FileCheck2,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Award,
} from "lucide-react";

export function HeroSearch() {
  const router = useRouter();
  const { listings, agents } = useMarketplace();

  const [purpose, setPurpose] = useState<"sale" | "rent">("sale");
  const [area, setArea] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [documentsCheckedOnly, setDocumentsCheckedOnly] = useState(false);
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const verifiedAgentsCount = agents.filter((a) => a.verificationStatus === "verified").length || 10;
  const ercaanCount = agents.filter((a) => a.isErcaanMember).length || 12;
  const docCheckedCount = listings.filter((l) => l.isDocumentsChecked).length || 14;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    const params = new URLSearchParams();
    if (purpose) params.set("purpose", purpose);
    if (area) params.set("area", area);
    if (propertyType) params.set("propertyType", propertyType);
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (bedrooms) params.set("bedrooms", bedrooms);
    if (documentsCheckedOnly) params.set("documentsCheckedOnly", "true");

    setTimeout(() => {
      router.push(`/properties?${params.toString()}`);
    }, 200);
  };

  return (
    <section className="relative bg-[#FAFAF7] text-ink pt-8 pb-12 sm:pt-12 sm:pb-16 border-b border-[#E9E8E1] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-12">
          {/* Left Column (55% on desktop): Headline, Search Card, Trust Row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="w-full lg:w-[55%] flex flex-col justify-center"
          >
            {/* Small label */}
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#008751] mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#008751]" />
              <span>Lagos property, verified</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-black tracking-tight text-ink leading-[1.12] font-display uppercase">
              Find genuine property from agents we have{" "}
              <span className="underline decoration-[#FFC800] decoration-2 underline-offset-4">
                verified
              </span>
              .
            </h1>

            {/* Short supporting sentence (18 words) */}
            <p className="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed max-w-xl">
              Every listing backed by registered LASRERA practitioners and certified title document audits across prime Lagos corridors.
            </p>

            {/* Search Bar Card: Clean white surface on off-white */}
            <div className="mt-6 sm:mt-7 bg-white rounded-xl p-4 sm:p-5 border border-[#E9E8E1] shadow-sm">
              {/* Buy / Rent Segmented Toggle */}
              <div className="inline-flex items-center bg-stone-100 p-1 rounded-lg mb-4">
                <button
                  type="button"
                  onClick={() => setPurpose("sale")}
                  className={`px-4 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    purpose === "sale"
                      ? "bg-[#151314] text-white shadow-sm"
                      : "text-stone-600 hover:text-stone-900"
                  }`}
                >
                  For Sale (₦)
                </button>
                <button
                  type="button"
                  onClick={() => setPurpose("rent")}
                  className={`px-4 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    purpose === "rent"
                      ? "bg-[#151314] text-white shadow-sm"
                      : "text-stone-600 hover:text-stone-900"
                  }`}
                >
                  For Rent (₦ / year)
                </button>
              </div>

              {/* Main Search Inputs Grid */}
              <form onSubmit={handleSearch} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {/* District */}
                  <div>
                    <label className="block text-[11px] font-medium text-stone-500 mb-1">
                      District
                    </label>
                    <div className="relative">
                      <select
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        className="w-full bg-[#FAFAF7] border border-[#E9E8E1] rounded-lg px-2.5 py-2 text-xs font-medium text-stone-900 focus:outline-none focus:border-[#008751] appearance-none cursor-pointer pr-7"
                      >
                        <option value="">All Lagos</option>
                        {LAGOS_AREAS.map((a) => (
                          <option key={a.id} value={a.name}>
                            {a.name}
                          </option>
                        ))}
                      </select>
                      <MapPin className="w-3.5 h-3.5 text-stone-400 absolute right-2.5 top-2.5 pointer-events-none" />
                    </div>
                  </div>

                  {/* Property Type */}
                  <div>
                    <label className="block text-[11px] font-medium text-stone-500 mb-1">
                      Type
                    </label>
                    <div className="relative">
                      <select
                        value={propertyType}
                        onChange={(e) => setPropertyType(e.target.value)}
                        className="w-full bg-[#FAFAF7] border border-[#E9E8E1] rounded-lg px-2.5 py-2 text-xs font-medium text-stone-900 focus:outline-none focus:border-[#008751] appearance-none cursor-pointer pr-7"
                      >
                        <option value="">Any type</option>
                        <option value="house">Houses & Duplexes</option>
                        <option value="flat">Flats & Apartments</option>
                        <option value="land">Land (m²)</option>
                        <option value="commercial">Commercial</option>
                      </select>
                      <Home className="w-3.5 h-3.5 text-stone-400 absolute right-2.5 top-2.5 pointer-events-none" />
                    </div>
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="block text-[11px] font-medium text-stone-500 mb-1">
                      Max budget
                    </label>
                    <div className="relative">
                      <select
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="w-full bg-[#FAFAF7] border border-[#E9E8E1] rounded-lg px-2.5 py-2 text-xs font-medium text-stone-900 focus:outline-none focus:border-[#008751] appearance-none cursor-pointer pr-7"
                      >
                        <option value="">Any budget</option>
                        {purpose === "sale" ? (
                          <>
                            <option value="50000000">Up to ₦50m</option>
                            <option value="150000000">Up to ₦150m</option>
                            <option value="350000000">Up to ₦350m</option>
                            <option value="750000000">Up to ₦750m</option>
                            <option value="2000000000">Up to ₦2b</option>
                          </>
                        ) : (
                          <>
                            <option value="3000000">Up to ₦3m / yr</option>
                            <option value="6000000">Up to ₦6m / yr</option>
                            <option value="12000000">Up to ₦12m / yr</option>
                            <option value="25000000">Up to ₦25m / yr</option>
                            <option value="50000000">Up to ₦50m / yr</option>
                          </>
                        )}
                      </select>
                      <DollarSign className="w-3.5 h-3.5 text-stone-400 absolute right-2.5 top-2.5 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* More Filters Row (Bedrooms & Documents Checked tucked inside) */}
                {showMoreFilters && (
                  <div className="pt-2 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in duration-150">
                    <div className="flex items-center gap-2">
                      <label className="text-xs text-stone-600 font-medium whitespace-nowrap">
                        Bedrooms:
                      </label>
                      <select
                        value={bedrooms}
                        onChange={(e) => setBedrooms(e.target.value)}
                        className="bg-[#FAFAF7] border border-[#E9E8E1] rounded-lg px-2.5 py-1 text-xs font-medium text-stone-900 focus:outline-none focus:border-[#008751]"
                      >
                        <option value="">Any</option>
                        <option value="1">1+ bed</option>
                        <option value="2">2+ beds</option>
                        <option value="3">3+ beds</option>
                        <option value="4">4+ beds</option>
                        <option value="5">5+ beds</option>
                      </select>
                    </div>

                    <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={documentsCheckedOnly}
                        onChange={(e) => setDocumentsCheckedOnly(e.target.checked)}
                        className="w-4 h-4 rounded border-stone-300 text-[#008751] accent-[#008751]"
                      />
                      <span className="text-xs font-medium text-stone-800">
                        Documents Checked only
                      </span>
                    </label>
                  </div>
                )}

                {/* Bottom Row: Toggle More Filters & Search Button */}
                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={() => setShowMoreFilters(!showMoreFilters)}
                    className="text-xs text-stone-600 hover:text-stone-900 font-medium inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>{showMoreFilters ? "Fewer filters" : "More filters"}</span>
                    {showMoreFilters ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    type="submit"
                    disabled={isSearching}
                    className="px-5 py-2.5 bg-[#008751] hover:bg-[#00563A] text-white font-medium rounded-lg text-xs tracking-wide flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer active:scale-95 disabled:opacity-80"
                  >
                    {isSearching ? (
                      <>
                        <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Searching...</span>
                      </>
                    ) : (
                      <>
                        <Search className="w-3.5 h-3.5" />
                        <span>Search</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Single Quiet Trust Row Below Search */}
            <div className="mt-4 flex items-center gap-2 text-xs text-stone-500 font-medium flex-wrap">
              <span className="text-[#008751] font-semibold">{verifiedAgentsCount}</span>
              <span>LASRERA-verified agents</span>
              <span className="text-stone-300">·</span>
              <span className="text-ink font-semibold">{ercaanCount}</span>
              <span>ERCAAN members</span>
              <span className="text-stone-300">·</span>
              <span className="text-ink font-semibold">{docCheckedCount}</span>
              <span>Documents Checked listings</span>
            </div>
          </motion.div>

          {/* Right Column (45% on desktop): Tall Rounded Photo + 2 Floating Overlapping Cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="w-full lg:w-[45%] relative"
          >
            <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full rounded-2xl overflow-hidden border border-[#E9E8E1] shadow-md bg-stone-200">
              <Image
                src="/images/listings/prop-1/photo-1.webp"
                alt="Verified Luxury Property in Lagos"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Floating Card 1: Listing Mini-Card (Bottom-Left) */}
            <div className="absolute -bottom-4 -left-3 sm:-bottom-5 sm:-left-5 bg-white p-3 sm:p-3.5 rounded-xl border border-[#E9E8E1] shadow-elevated max-w-[270px] z-10 transition-all hover:scale-[1.01]">
              <div className="flex items-start gap-2.5">
                <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-stone-100">
                  <Image
                    src="/images/listings/prop-1/photo-1.webp"
                    alt="Banana Island Villa"
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1 mb-1">
                    <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-[#008751] bg-[#008751]/10 px-1.5 py-0.2 rounded">
                      <CheckCircle2 className="w-2.5 h-2.5" />
                      Verified Agent
                    </span>
                    <span className="inline-flex items-center text-[9px] font-bold text-white bg-[#151314] px-1.5 py-0.2 rounded">
                      Doc Checked
                    </span>
                  </div>
                  <h4 className="text-[11px] font-semibold text-stone-900 truncate">
                    6-Bed Luxury Waterfront Villa
                  </h4>
                  <p className="text-[10px] text-stone-500 truncate">Banana Island, Ikoyi</p>
                  <p className="text-xs font-black text-ink mt-0.5 font-sans">
                    ₦1,850,000,000
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Card 2: "What we checked" Panel (Top-Right) */}
            <div className="absolute -top-3 -right-2 sm:-top-4 sm:-right-4 bg-[#151314] text-white p-3 sm:p-3.5 rounded-xl border border-white/10 shadow-elevated max-w-[220px] z-10 text-xs">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#FFC800] mb-1.5">
                <FileCheck2 className="w-3.5 h-3.5 text-[#FFC800]" />
                <span>What we checked</span>
              </div>
              <ul className="space-y-1 text-[10px] text-stone-300">
                <li className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#008751]" />
                  <span>Title: Governor's Consent</span>
                </li>
                <li className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#008751]" />
                  <span>Survey beacons matched</span>
                </li>
                <li className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#008751]" />
                  <span>Checked 12 Oct 2026</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
