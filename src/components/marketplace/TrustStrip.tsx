"use client";

import React from "react";
import { ShieldCheck, Award, Building2 } from "lucide-react";

export function TrustStrip() {
  return (
    <section className="bg-[#151314] text-white py-3.5 sm:py-4 border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-center lg:justify-between gap-y-2 gap-x-6 text-xs text-stone-300">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#008751] flex-shrink-0" />
            <span className="font-semibold text-white tracking-wide">
              Lagos State Real Estate Regulatory Authority (LASRERA) Aligned
            </span>
          </div>

          <span className="hidden lg:inline text-stone-600">·</span>

          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-[#FFC800] flex-shrink-0" />
            <span className="font-semibold text-white tracking-wide">
              ERCAAN Industry Standard
            </span>
          </div>

          <span className="hidden lg:inline text-stone-600">·</span>

          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#008751] flex-shrink-0" />
            <span className="text-stone-300">
              Segalex Resources Global Limited{" "}
              <strong className="text-white font-bold ml-1 font-mono">RC 7351342</strong>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
