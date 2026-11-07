"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useMarketplace } from "@/context/MarketplaceContext";
import { ArrowRight, ChevronRight, BookOpen } from "lucide-react";

export function TipCard() {
  const { tips } = useMarketplace();
  const [currentIdx, setCurrentIdx] = useState(0);

  const activeTip = tips[currentIdx] || tips[0];

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % tips.length);
  };

  return (
    <div className="bg-white rounded-xl border border-[#E9E8E1] p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#008751] bg-[#008751]/10 px-2 py-0.5 rounded">
              Due Diligence Note
            </span>
            <span className="text-xs text-stone-400 font-medium">·</span>
            <span className="text-xs text-stone-500 font-medium">{activeTip.category}</span>
          </div>

          <h3 className="text-lg sm:text-xl font-black font-display text-ink uppercase tracking-tight leading-snug">
            {activeTip.title}
          </h3>

          <blockquote className="mt-3 text-sm text-stone-600 leading-relaxed border-l-2 border-[#008751] pl-3.5 py-0.5 font-normal">
            &ldquo;{activeTip.snippet}&rdquo;
          </blockquote>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-stone-500">
            <span>Curated by Segalex Legal Advisory</span>
            <span>·</span>
            <Link
              href="/how-verification-works"
              className="font-semibold text-[#008751] hover:underline inline-flex items-center gap-1"
            >
              <span>Read the 4-step verification framework</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <div className="flex items-center md:flex-col md:items-end justify-between md:justify-start gap-3 border-t md:border-t-0 pt-4 md:pt-0 border-[#E9E8E1]">
          <span className="text-xs text-stone-400 font-mono">
            0{currentIdx + 1} / 0{tips.length}
          </span>
          <button
            type="button"
            onClick={handleNext}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-ink bg-[#FAFAF7] hover:bg-stone-100 rounded-lg border border-[#E9E8E1] transition-colors cursor-pointer"
          >
            <span>Next note</span>
            <ChevronRight className="w-3.5 h-3.5 text-stone-500" />
          </button>
        </div>
      </div>
    </div>
  );
}
