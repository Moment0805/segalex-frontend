import React from "react";
import Link from "next/link";
import { ShieldCheck, Award, ArrowRight, CheckCircle2 } from "lucide-react";

export function SegalexStory() {
  return (
    <section className="py-16 sm:py-24 bg-[#151314] text-white border-b border-stone-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Brand & Vision */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#FFC800] text-xs font-bold uppercase tracking-wider border border-white/10">
              <ShieldCheck className="w-4 h-4 text-[#008751]" />
              <span>Segalex Resources Global Limited · RC 7351342</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white uppercase leading-[1.08]">
              Creating Wealth Through Real Estate.
            </h2>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Founded on the conviction that genuine property acquisition should never feel like a gamble.
              In Lagos, land and home ownership are the foundational engines of generational family
              wealth. Yet, buyers and diaspora investors have historically suffered from phantom allocations,
              counterfeit surveys, and unaccredited middle-men.
            </p>

            <p className="text-stone-300 text-sm leading-relaxed">
              Segalex Property Hub was established by Segalex Resources Global Limited to unite Lagos State’s
              most reputable, LASRERA-registered brokers and ERCAAN practitioners on a single transparent platform.
            </p>

            {/* Core Commitments */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 text-xs text-stone-200">
                <CheckCircle2 className="w-4 h-4 text-[#008751] flex-shrink-0" />
                <span>Zero tolerance for unregistered brokers</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-stone-200">
                <CheckCircle2 className="w-4 h-4 text-[#008751] flex-shrink-0" />
                <span>Cadastral survey coordinate cross-checks</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-stone-200">
                <CheckCircle2 className="w-4 h-4 text-[#008751] flex-shrink-0" />
                <span>Transparent yearly rental terms (no hidden fees)</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-stone-200">
                <CheckCircle2 className="w-4 h-4 text-[#008751] flex-shrink-0" />
                <span>Direct WhatsApp connection to verified agents</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/about"
                className="px-6 py-3 bg-[#008751] hover:bg-[#00563A] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all"
              >
                Read The Segalex Story
              </Link>
              <Link
                href="/packages"
                className="px-6 py-3 border border-white/20 hover:border-white text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all"
              >
                Agent Partnership Tiers
              </Link>
            </div>
          </div>

          {/* Right Column: Executive Quote */}
          <div className="lg:col-span-5">
            <div className="bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/10">
              <div className="flex items-center gap-4 mb-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
                  alt="Mr Segun"
                  className="w-16 h-16 rounded-full object-cover border-2 border-[#FFC800]"
                />
                <div>
                  <h3 className="font-bold text-white text-base">Mr Segun</h3>
                  <p className="text-xs text-[#FFC800] font-semibold">
                    Managing Director, Segalex Resources Global Limited
                  </p>
                  <p className="text-[11px] text-stone-400">RC 7351342 · Lagos, Nigeria</p>
                </div>
              </div>

              <blockquote className="text-xs text-stone-300 italic leading-relaxed border-l-2 border-[#FFC800] pl-4 py-1 mb-6">
                &ldquo;When a Nigerian in the diaspora or a hard-working family in Lagos invests in real estate,
                they are not just buying bricks or sand. They are building their future. Every property on
                Segalex must stand up to rigorous regulatory and cadastral scrutiny.&rdquo;
              </blockquote>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-stone-400">
                <span className="flex items-center gap-1.5 text-stone-300 font-semibold">
                  <Award className="w-4 h-4 text-[#008751]" />
                  Verified Corporate Identity
                </span>
                <span className="font-mono text-stone-400 text-[11px]">Alausa Registry Aligned</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
