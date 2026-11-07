import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { BrandLogo } from "@/components/common/BrandLogo";
import { ShieldCheck, Award, Building2, CheckCircle2, ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-canvas text-darktext">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-[#151314] text-white py-16 sm:py-24 border-b border-white/10 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="max-w-3xl space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#FFC800] text-xs font-bold uppercase tracking-wider border border-white/10">
                <ShieldCheck className="w-4 h-4 text-[#008751]" />
                Segalex Resources Global Limited • RC 7351342
              </span>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white uppercase leading-[1.08]">
                Creating Wealth Through Real Estate.
              </h1>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                Segalex Property Hub was established in Lagos, Nigeria, with an uncompromising mandate:
                to restore absolute integrity, regulatory compliance, and institutional transparency to
                property acquisition and leasing across Lagos State.
              </p>
            </div>
          </div>
        </div>

        {/* Story & Philosophy */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-5 text-xs sm:text-sm text-stone-700 leading-relaxed">
              <span className="text-xs font-bold text-[#008751] uppercase tracking-wider block">
                The Lagos Reality & Our Solution
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-ink uppercase font-display leading-tight">
                Why Lagos Needed A Verified Property Exchange
              </h2>
              <p>
                In a dynamic metropolis of over 20 million people, property represents the single largest
                store of family and corporate capital. However, counterfeit survey plans, phantom land
                allocations, and unregistered freelance brokers have eroded trust for both local residents
                and diaspora investors.
              </p>
              <p>
                Under the visionary leadership of our Managing Director, <strong>Mr Segun</strong>,
                Segalex Resources Global Limited introduced a new paradigm: every agent must be legally
                authenticated under the <strong>LASRERA Law (2022)</strong>, and listings can undergo
                stringent cadastral survey and title deed cross-referencing before earning our trusted
                badge.
              </p>
            </div>

            <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-card space-y-5">
              <div className="flex items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
                  alt="Mr Segun"
                  className="w-16 h-16 rounded-full object-cover border-2 border-[#FFC800]"
                />
                <div>
                  <h3 className="font-bold text-stone-900 text-base">Mr Segun</h3>
                  <p className="text-xs text-[#008751] font-bold">Managing Director</p>
                  <p className="text-[10px] text-stone-500 font-mono">RC 7351342 • Lagos, Nigeria</p>
                </div>
              </div>
              <blockquote className="text-xs text-stone-600 italic border-l-2 border-[#FFC800] pl-3 py-1">
                “Trust is not a marketing slogan; it is a legal and cadastral duty. When you see our badge,
                you know due diligence was performed.”
              </blockquote>
              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                <span>Corporate Registration</span>
                <span className="font-bold text-stone-800">CAC RC 7351342</span>
              </div>
            </div>
          </div>

          {/* Core Institutional Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#008751]/10 text-[#008751] flex items-center justify-center font-bold">
                01
              </div>
              <h3 className="font-bold text-base text-stone-900">Regulatory Compliance</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                We strictly interface with LASRERA-registered brokers and ERCAAN accredited practitioners,
                eliminating unregistered roadside intermediaries.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#FFC800]/20 text-stone-900 flex items-center justify-center font-bold">
                02
              </div>
              <h3 className="font-bold text-base text-stone-900">Cadastral Ground Truth</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Survey plans and beacon numbers are validated against recorded charting lines at the Lagos
                State Surveyor General’s database and Alausa Lands Bureau.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#151314] text-white flex items-center justify-center font-bold">
                03
              </div>
              <h3 className="font-bold text-base text-stone-900">Transparent Terms</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Rents are displayed strictly per year with no disguised monthly traps. Sales clearly specify
                title types: Governor's Consent, C of O, or Gazette.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

