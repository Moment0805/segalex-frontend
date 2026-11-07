import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-canvas text-darktext">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-8">
        <div className="border-b border-stone-200 pb-6 space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
            Legal Framework • To be finalized by retained legal counsel
          </span>
          <h1 className="text-3xl sm:text-4xl font-black font-display text-ink uppercase tracking-tight">
            Terms & Conditions of Service
          </h1>
          <p className="text-xs text-stone-500">
            Last Updated: November 2024 • Segalex Resources Global Limited (RC 7351342)
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6 text-xs text-stone-700 leading-relaxed">
          <section className="space-y-2">
            <h3 className="font-bold text-sm text-stone-900 uppercase">1. Introduction & Acceptance</h3>
            <p>
              These Terms of Service govern access to and use of Segalex Property Hub, an online verified
              real estate marketplace operated by Segalex Resources Global Limited (RC 7351342), having its
              principal place of business at Admiralty Way, Lekki Phase 1, Lagos, Nigeria. By accessing
              or utilizing our platform, users agree to be bound by these Terms and the laws of the Federal
              Republic of Nigeria and Lagos State.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-bold text-sm text-stone-900 uppercase">
              2. Nature of Documents Checked Badge (Statutory Disclaimer)
            </h3>
            <p>
              The "Documents Checked" badge awarded to designated listings confirms that title instruments
              and cadastral survey beacon coordinates have been cross-checked with recorded public archives
              at the Lagos State Lands Bureau and Office of the Surveyor General.
            </p>
            <div className="p-3 bg-stone-100 rounded-lg border border-stone-200 font-semibold text-stone-800">
              This verification is an administrative records check, not a judicial guarantee of title or
              insurance policy. All purchasers and tenants remain strictly obligated to perform independent
              legal search and due diligence prior to the execution of deeds or transfer of funds.
            </div>
          </section>

          <section className="space-y-2">
            <h3 className="font-bold text-sm text-stone-900 uppercase">
              3. Agent Compliance with LASRERA
            </h3>
            <p>
              Every real estate broker or agent listing inventory on Segalex warrants that they maintain
              valid registration with the Lagos State Real Estate Regulatory Authority (LASRERA). Any broker
              found operating under forged or suspended licenses will be immediately barred, and their
              profile will be transmitted to the Ministry of Housing for regulatory prosecution.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-bold text-sm text-stone-900 uppercase">4. Governing Law & Jurisdiction</h3>
            <p>
              These terms are governed by and construed in accordance with the laws of Lagos State and the
              Federal Republic of Nigeria. Any disputes arising shall be subject to the exclusive jurisdiction
              of the High Court of Lagos State.
            </p>
          </section>

          <div className="pt-4 border-t border-stone-100 text-stone-400 italic text-[11px]">
            [Full legal text drafted by retained corporate solicitors to replace placeholder text upon production launch.]
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

