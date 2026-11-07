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
import { motion } from "framer-motion";

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
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <VerificationExplainer />
        </motion.div>

        {/* Featured Listings Carousel (Clearly Labelled "Featured") */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <FeaturedCarousel listings={listings} />
        </motion.div>

        {/* Popular Lagos Areas Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <PopularAreas />
        </motion.div>

        {/* Mid-page Grid: Tip of the Day & Banner Slot */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-8"
        >
          <TipCard />
          <AdBannerCard slot="home_mid" className="my-0 px-0" />
        </motion.div>

        {/* Top Verified Agents Spotlight */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <TopAgents />
        </motion.div>

        {/* Segalex Corporate Story & Executive Teaser */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <SegalexStory />
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}

