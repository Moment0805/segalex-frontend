import React from "react";
import Link from "next/link";
import { BrandLogo } from "@/components/common/BrandLogo";
import { Search, Home, Building2, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#151314] text-white flex flex-col justify-between p-6 sm:p-12 relative">

      {/* Top Header */}
      <div className="flex items-center justify-between">
        <BrandLogo size="md" />
        <Link
          href="/"
          className="text-xs font-bold text-stone-300 hover:text-white uppercase tracking-wider"
        >
          Return Home
        </Link>
      </div>

      {/* Main 404 Center */}
      <div className="max-w-xl mx-auto text-center space-y-4 my-auto relative z-10 py-16">
        <span className="text-sm font-black uppercase tracking-widest text-[#FFC800] bg-white/10 px-3 py-1 rounded-full border border-white/10">
          Page Not Located
        </span>
        <div className="text-7xl sm:text-9xl font-black font-display text-white tracking-tighter">
          404
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-white">
          This Lagos property or page is unmapped.
        </h1>
        <p className="text-xs sm:text-sm text-stone-300 max-w-md mx-auto leading-relaxed">
          The listing may have expired under our 60-day freshness rule, or the coordinate URL has
          changed.
        </p>

        <div className="pt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/properties"
            className="px-6 py-3 bg-[#008751] hover:bg-[#00563A] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all"
          >
            <Search className="w-4 h-4" />
            <span>Search Verified Properties</span>
          </Link>
          <Link
            href="/"
            className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Go to Homepage</span>
          </Link>
        </div>
      </div>

      {/* Footer Credentials */}
      <div className="text-center text-[11px] text-stone-500">
        Segalex Property Hub • Segalex Resources Global Limited (RC 7351342) • Lagos, Nigeria
      </div>
    </div>
  );
}

