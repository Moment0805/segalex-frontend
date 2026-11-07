"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { ChevronDown, HelpCircle, ShieldCheck } from "lucide-react";

export default function FAQPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "What does the 'Documents Checked' badge mean on a listing?",
      a: "The 'Documents Checked' badge means our cadastral audit team has vetted the property's title instrument (such as a Governor's Consent, C of O, or Gazette) and verified that the survey beacon coordinates physically match recorded charting lines at the Lagos State Lands Bureau in Alausa. Every badge displays the exact date of verification. Please note that this is an administrative records audit, not a guarantee of title.",
    },
    {
      q: "Why are rents on Segalex displayed strictly 'per year'?",
      a: "Under the Lagos State Tenancy Law and established commercial standard practice, residential and commercial leases are executed on an annual or multi-year basis. Displaying rents per month often masks hidden legal fees, agency percentages, and caution deposits. On Segalex, what you see is the true annual cost.",
    },
    {
      q: "How do you verify agents under LASRERA?",
      a: "By Lagos State law (LASRERA Law 2022), it is an offence to engage in real estate transactions without valid accreditation. Every agent on Segalex must submit their government-issued LASRERA registration code, corporate registration (CAC), and government biometric ID. We cross-reference license numbers directly with the Ministry of Housing before granting public posting access.",
    },
    {
      q: "Can I inspect the physical survey beacons before paying for land in Ibeju-Lekki or Epe?",
      a: "Yes, absolutely. We strongly recommend that buyers inspect the physical beacon markers on site accompanied by their own registered surveyor to verify that the coordinate points on the ground align with the cadastral plan provided on our platform.",
    },
    {
      q: "How does the Exclusive Search Pop-up feature work for Premium agents?",
      a: "Premium tier agencies can select a prime operating district (such as Ibeju-Lekki, Ikoyi, or Banana Island). When a prospective buyer searches that specific corridor, a discrete, non-intrusive sponsored card appears once per browsing session, presenting the agent's premier listing and direct WhatsApp contact. It never obscures the full screen and is easily dismissed.",
    },
    {
      q: "What is the 60-day listing expiry rule?",
      a: "To keep our Lagos property database pristine and eliminate stale or already-sold ghost listings, all listings automatically expire after 60 days unless actively renewed by the listing broker. Agents receive an automated notification 7 days prior to expiry.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-darktext">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-10">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold text-[#008751] uppercase tracking-wider">
            Clear Answers
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-display text-ink uppercase tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-stone-600 text-xs sm:text-sm max-w-lg mx-auto">
            Everything you need to know about Lagos land title verification, LASRERA regulations, and
            safe real estate transactions.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-stone-900 hover:text-[#008751] transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-[#008751] flex-shrink-0" />
                    <span>{faq.q}</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-stone-400 transition-transform ${
                      isOpen ? "rotate-180 text-[#008751]" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-stone-600 leading-relaxed border-t border-stone-100 animate-in fade-in duration-150">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Need More Assistance Banner */}
        <div className="bg-[#151314] text-white rounded-2xl p-6 sm:p-8 border border-stone-800 text-center space-y-3">
          <h3 className="font-bold text-base text-white">Have a Specific Due Diligence Question?</h3>
          <p className="text-xs text-stone-400 max-w-md mx-auto">
            Contact our Lagos client advisory desk for assistance with title searches or agent verification.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#008751] hover:bg-[#00563A] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all"
            >
              <span>Speak with Segalex Advisory</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

