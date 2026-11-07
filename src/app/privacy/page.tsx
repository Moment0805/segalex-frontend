import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-canvas text-darktext">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-8">
        <div className="border-b border-stone-200 pb-6 space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
            Nigeria Data Protection Regulation (NDPR) • Placeholder text marked to be supplied by lawyer
          </span>
          <h1 className="text-3xl sm:text-4xl font-black font-display text-ink uppercase tracking-tight">
            Privacy Policy & Data Protection
          </h1>
          <p className="text-xs text-stone-500">
            Segalex Resources Global Limited (RC 7351342) • Lagos, Nigeria
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6 text-xs text-stone-700 leading-relaxed">
          <section className="space-y-2">
            <h3 className="font-bold text-sm text-stone-900 uppercase">1. Information We Collect</h3>
            <p>
              Segalex Property Hub collects personal information necessary to facilitate property inquiries,
              agent credential audits, and search notifications. This includes buyer names, email addresses,
              telephone contacts, agent LASRERA license numbers, government identification cards, and CAC
              incorporation records.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-bold text-sm text-stone-900 uppercase">2. Use of Information</h3>
            <p>
              Your data is used solely to authenticate real estate practitioners, route property inspection
              requests to verified listing brokers, and provide automated notifications for saved searches.
              We do not sell, rent, or trade user data to third-party marketing brokers.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-bold text-sm text-stone-900 uppercase">3. NDPR & Security Standards</h3>
            <p>
              Segalex complies with the Nigeria Data Protection Act (NDPA 2023) and the Nigeria Data
              Protection Regulation (NDPR). All submitted identity documents and cadastral surveys are
              encrypted at rest using industry-standard AES-256 protocols.
            </p>
          </section>

          <div className="pt-4 border-t border-stone-100 text-stone-400 italic text-[11px]">
            [Comprehensive privacy schedule and data compliance clauses marked to be supplied by company lawyer prior to commercial go-live.]
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

