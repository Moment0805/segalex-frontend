"use client";

import React from "react";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { HeroSearch } from "@/components/marketplace/HeroSearch";
import { TrustStrip } from "@/components/marketplace/TrustStrip";
import { VerificationExplainer } from "@/components/marketplace/VerificationExplainer";
import { FeaturedCarousel } from "@/components/marketplace/FeaturedCarousel";
import { PopularAreas } from "@/components/marketplace/PopularAreas";
import { TipCard } from "@/components/marketplace/TipCard";
import { TopAgents } from "@/components/marketplace/TopAgents";
import { AdBannerCard } from "@/components/marketplace/AdBannerCard";
import { SegalexStory } from "@/components/marketplace/SegalexStory";
import { useMarketplace } from "@/context/MarketplaceContext";

export default function HomePage() {
  const { listings } = useMarketplace();

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-darktext">
      <Navbar />

      <main className="flex-1">
        {/* Full Bleed Hero & Search */}
        <HeroSearch />

        {/* Animated Trust Metrics Strip */}
        <TrustStrip />

        {/* How Verification Works 3-Step Visual */}
        <VerificationExplainer />

        {/* Featured Listings Carousel (Clearly Labelled "Featured") */}
        <FeaturedCarousel listings={listings} />

        {/* Popular Lagos Areas Showcase */}
        <PopularAreas />

        {/* Mid-page Grid: Tip of the Day & Banner Slot */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-8">
          <TipCard />
          <AdBannerCard slot="home_mid" className="my-0 px-0" />
        </div>

        {/* Top Verified Agents Spotlight */}
        <TopAgents />

        {/* Segalex Corporate Story & Executive Teaser */}
        <SegalexStory />
      </main>

      <Footer />
    </div>
  );
}

