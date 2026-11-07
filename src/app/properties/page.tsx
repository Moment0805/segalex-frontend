"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { PropertyCard } from "@/components/marketplace/PropertyCard";
import { LeafletMap } from "@/components/marketplace/LeafletMap";
import { ExclusivePopup } from "@/components/marketplace/ExclusivePopup";
import { AdBannerCard } from "@/components/marketplace/AdBannerCard";
import { useMarketplace } from "@/context/MarketplaceContext";
import { showToast } from "@/components/ui/Toast";
import { LAGOS_AREAS } from "@/data/areas";
import { PropertyType, PropertyPurpose } from "@/types";
import {
  Search,
  Filter,
  Map as MapIcon,
  List as ListIcon,
  Bell,
  CheckCircle2,
  FileCheck2,
  SlidersHorizontal,
  X,
  ChevronDown,
} from "lucide-react";

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const { listings, agents, saveSearch } = useMarketplace();

  // Search parameters
  const initialPurpose = (searchParams.get("purpose") as PropertyPurpose) || "all";
  const initialType = (searchParams.get("propertyType") as PropertyType) || "all";
  const initialArea = searchParams.get("area") || "all";
  const initialMaxPrice = searchParams.get("maxPrice") || "";
  const initialMinPrice = searchParams.get("minPrice") || "";
  const initialBedrooms = searchParams.get("bedrooms") || "all";
  const initialDocChecked = searchParams.get("documentsCheckedOnly") === "true";
  const initialFeatured = searchParams.get("isFeatured") === "true";
  const sponsoredTrigger = searchParams.get("sponsoredTrigger") === "true";

  // Filter States
  const [purpose, setPurpose] = useState<string>(initialPurpose);
  const [propertyType, setPropertyType] = useState<string>(initialType);
  const [area, setArea] = useState<string>(initialArea);
  const [minPrice, setMinPrice] = useState<string>(initialMinPrice);
  const [maxPrice, setMaxPrice] = useState<string>(initialMaxPrice);
  const [bedrooms, setBedrooms] = useState<string>(initialBedrooms);
  const [documentsCheckedOnly, setDocumentsCheckedOnly] = useState<boolean>(initialDocChecked);
  const [verifiedAgentsOnly, setVerifiedAgentsOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<"relevance" | "newest" | "price_asc" | "price_desc">("relevance");

  // Mobile View Toggle: 'list' vs 'map'
  const [mobileView, setMobileView] = useState<"list" | "map">("list");
  const [hoveredListingId, setHoveredListingId] = useState<string | null>(null);
  const [selectedListingId, setSelectedListingId] = useState<string | null>(null);

  // Saved Search State
  const [searchSaved, setSearchSaved] = useState(false);

  // Filtering Logic
  const filteredListings = useMemo(() => {
    return listings
      .filter((p) => {
        // Purpose
        if (purpose !== "all" && p.purpose !== purpose) return false;
        // Type
        if (propertyType !== "all" && p.propertyType !== propertyType) return false;
        // Area
        if (area !== "all" && p.area.toLowerCase() !== area.toLowerCase()) return false;
        // Bedrooms
        if (bedrooms !== "all") {
          const bedCount = parseInt(bedrooms, 10);
          if (!p.bedrooms || p.bedrooms < bedCount) return false;
        }
        // Min / Max Price
        if (minPrice && p.price < Number(minPrice)) return false;
        if (maxPrice && p.price > Number(maxPrice)) return false;
        // Documents Checked
        if (documentsCheckedOnly && !p.isDocumentsChecked) return false;
        // Verified Agents Only
        if (verifiedAgentsOnly) {
          const agent = agents.find((a) => a.id === p.agentId);
          if (!agent || agent.verificationStatus !== "verified") return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "relevance") {
          // Priority to Featured / Sponsored
          const scoreA = (a.isSponsored ? 10 : 0) + (a.isFeatured ? 5 : 0) + (a.isDocumentsChecked ? 3 : 0);
          const scoreB = (b.isSponsored ? 10 : 0) + (b.isFeatured ? 5 : 0) + (b.isDocumentsChecked ? 3 : 0);
          return scoreB - scoreA;
        }
        if (sortBy === "newest") {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        if (sortBy === "price_asc") {
          return a.price - b.price;
        }
        if (sortBy === "price_desc") {
          return b.price - a.price;
        }
        return 0;
      });
  }, [
    listings,
    agents,
    purpose,
    propertyType,
    area,
    bedrooms,
    minPrice,
    maxPrice,
    documentsCheckedOnly,
    verifiedAgentsOnly,
    sortBy,
  ]);

  const handleSaveSearch = () => {
    saveSearch({
      queryTitle: `${propertyType !== "all" ? propertyType : "Property"} in ${
        area !== "all" ? area : "Lagos"
      } ${purpose !== "all" ? `(${purpose})` : ""}`,
      purpose: purpose !== "all" ? (purpose as PropertyPurpose) : undefined,
      propertyType: propertyType !== "all" ? (propertyType as PropertyType) : undefined,
      area: area !== "all" ? area : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      documentsCheckedOnly,
      verifiedAgentsOnly,
      alertEnabled: true,
    });
    setSearchSaved(true);
    showToast("Search Alert Created", "You will be notified when new matching properties are listed.");
  };

  const handleResetFilters = () => {
    setPurpose("all");
    setPropertyType("all");
    setArea("all");
    setMinPrice("");
    setMaxPrice("");
    setBedrooms("all");
    setDocumentsCheckedOnly(false);
    setVerifiedAgentsOnly(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-darktext">
      <Navbar />

      {/* Top Filter Bar */}
      <section className="bg-white border-b border-stone-200 sticky top-14 z-30 py-3.5 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Quick Filter Selects */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              {/* Purpose */}
              <select
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="bg-[#FAFAF7] border border-stone-200 rounded-lg px-2.5 py-1.5 font-bold text-stone-800 focus:outline-none focus:border-[#008751]"
              >
                <option value="all">Sale & Rent</option>
                <option value="sale">For Sale (₦)</option>
                <option value="rent">For Rent (₦/yr)</option>
              </select>

              {/* Area */}
              <select
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="bg-[#FAFAF7] border border-stone-200 rounded-lg px-2.5 py-1.5 font-bold text-stone-800 focus:outline-none focus:border-[#008751]"
              >
                <option value="all">All Lagos Areas</option>
                {LAGOS_AREAS.map((a) => (
                  <option key={a.id} value={a.name}>
                    {a.name}
                  </option>
                ))}
              </select>

              {/* Type */}
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="bg-[#FAFAF7] border border-stone-200 rounded-lg px-2.5 py-1.5 font-bold text-stone-800 focus:outline-none focus:border-[#008751]"
              >
                <option value="all">All Types</option>
                <option value="house">Houses & Duplexes</option>
                <option value="flat">Flats & Penthouses</option>
                <option value="land">Land Plots (m²)</option>
                <option value="commercial">Commercial Space</option>
              </select>

              {/* Bedrooms */}
              <select
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="bg-[#FAFAF7] border border-stone-200 rounded-lg px-2.5 py-1.5 font-bold text-stone-800 focus:outline-none focus:border-[#008751]"
              >
                <option value="all">Bedrooms (Any)</option>
                <option value="1">1+ Bed</option>
                <option value="2">2+ Beds</option>
                <option value="3">3+ Beds</option>
                <option value="4">4+ Beds</option>
                <option value="5">5+ Beds</option>
              </select>

              {/* Badges Toggles */}
              <button
                type="button"
                onClick={() => setDocumentsCheckedOnly(!documentsCheckedOnly)}
                className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
                  documentsCheckedOnly
                    ? "bg-[#151314] text-white border border-[#FFC800]"
                    : "bg-[#FAFAF7] text-stone-700 border border-stone-200 hover:border-stone-400"
                }`}
              >
                <FileCheck2 className="w-3.5 h-3.5 text-[#FFC800]" />
                <span>Documents Checked</span>
              </button>

              <button
                type="button"
                onClick={() => setVerifiedAgentsOnly(!verifiedAgentsOnly)}
                className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
                  verifiedAgentsOnly
                    ? "bg-[#008751] text-white"
                    : "bg-[#FAFAF7] text-stone-700 border border-stone-200 hover:border-stone-400"
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified Agents</span>
              </button>

              {(purpose !== "all" ||
                propertyType !== "all" ||
                area !== "all" ||
                bedrooms !== "all" ||
                documentsCheckedOnly ||
                verifiedAgentsOnly) && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-stone-500 hover:text-stone-800 underline text-xs font-semibold px-2 py-1"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Right: Sort and Mobile List/Map Switcher */}
            <div className="flex items-center gap-3">
              {/* Sort By */}
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-stone-400 font-bold uppercase hidden sm:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-[#FAFAF7] border border-stone-200 rounded-lg px-2.5 py-1.5 font-bold text-stone-800 focus:outline-none focus:border-[#008751]"
                >
                  <option value="relevance">Relevance (Featured first)</option>
                  <option value="newest">Newest Listed</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                </select>
              </div>

              {/* Mobile View Toggle */}
              <div className="lg:hidden flex items-center bg-[#F1F0EA] p-0.5 rounded-lg border border-stone-200">
                <button
                  onClick={() => setMobileView("list")}
                  className={`p-1.5 rounded font-bold text-xs flex items-center gap-1 ${
                    mobileView === "list" ? "bg-white text-stone-900 shadow-sm" : "text-stone-600"
                  }`}
                  aria-label="List view"
                >
                  <ListIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setMobileView("map")}
                  className={`p-1.5 rounded font-bold text-xs flex items-center gap-1 ${
                    mobileView === "map" ? "bg-white text-stone-900 shadow-sm" : "text-stone-600"
                  }`}
                  aria-label="Map view"
                >
                  <MapIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Split Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {/* Results Counter Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-200">
          <div>
            <h1 className="text-lg sm:text-2xl font-black font-display text-ink uppercase tracking-tight">
              {area !== "all" ? `${area} Properties` : "All Verified Lagos Properties"}
            </h1>
            <p className="text-xs text-subtle">
              Showing <strong>{filteredListings.length}</strong> matching verified properties
            </p>
          </div>

          {/* Save Search Alert Button */}
          <button
            onClick={handleSaveSearch}
            disabled={searchSaved}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
              searchSaved
                ? "bg-emerald-50 text-[#008751] border border-emerald-200"
                : "bg-white border border-stone-300 hover:border-stone-800 text-stone-800"
            }`}
          >
            <Bell className="w-3.5 h-3.5" />
            <span>{searchSaved ? "Alert Activated" : "Alert Me for Matches"}</span>
          </button>
        </div>

        {/* Split Layout: List on Left (or responsive) + Map on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[600px]">
          {/* Listings Column */}
          <div
            className={`lg:col-span-7 flex flex-col space-y-6 ${
              mobileView === "map" ? "hidden lg:flex" : "flex"
            }`}
          >
            {filteredListings.length === 0 ? (
              /* Empty State */
              <div className="bg-white rounded-2xl p-10 border border-stone-200 text-center space-y-4 my-8">
                <div className="w-14 h-14 rounded-full bg-[#F1F0EA] flex items-center justify-center mx-auto text-stone-400">
                  <Search className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-stone-900">
                    No matching properties found
                  </h3>
                  <p className="text-xs text-stone-600 max-w-md mx-auto mt-1 leading-relaxed">
                    We could not find verified listings matching your exact combination. Try broadening
                    your budget or resetting filters.
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    onClick={handleResetFilters}
                    className="px-5 py-2.5 bg-[#151314] text-white rounded-lg text-xs font-bold uppercase tracking-wider"
                  >
                    Reset All Filters
                  </button>
                  <button
                    onClick={handleSaveSearch}
                    className="px-5 py-2.5 bg-[#008751] text-white rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
                  >
                    <Bell className="w-4 h-4" />
                    <span>Alert me when a match is listed</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Search Feed Banner Ad */}
                <AdBannerCard slot="search_feed" className="my-0 px-0" />

                {/* Grid of Listings */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {filteredListings.map((listing) => (
                    <PropertyCard
                      key={listing.id}
                      listing={listing}
                      onHover={(id) => setHoveredListingId(id)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Interactive Map Column */}
          <div
            className={`lg:col-span-5 h-[500px] lg:h-[calc(100vh-180px)] lg:sticky lg:top-36 rounded-2xl overflow-hidden border border-stone-200 shadow-card ${
              mobileView === "list" ? "hidden lg:block" : "block"
            }`}
          >
            <LeafletMap
              listings={filteredListings}
              hoveredListingId={hoveredListingId}
              selectedListingId={selectedListingId}
              onSelectListing={(id) => setSelectedListingId(id)}
            />
          </div>
        </div>
      </main>

      {/* Exclusive Sponsored Pop-up (Premium Feature Trigger) */}
      <ExclusivePopup
        areaSearched={area !== "all" ? area : undefined}
        forceShow={sponsoredTrigger}
      />

      <Footer />
    </div>
  );
}

export default function PropertiesSearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-canvas flex items-center justify-center text-xs text-stone-500 font-bold">
          Loading Segalex Verified Properties...
        </div>
      }
    >
      <SearchResultsContent />
    </Suspense>
  );
}

