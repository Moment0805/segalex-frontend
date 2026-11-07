import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

export function VerificationExplainer() {
  const timelineSteps = [
    {
      step: "01",
      title: "LASRERA License Check",
      desc: "Every agent practicing on Segalex submits active LASRERA accreditation credentials, verified directly against Lagos State Ministry of Housing records.",
      tag: "Statutory Law",
    },
    {
      step: "02",
      title: "Corporate & Identity Vetting",
      desc: "Brokers are screened for registered corporate status with CAC, government biometric ID, and ERCAAN professional standing.",
      tag: "Identity & CAC",
    },
    {
      step: "03",
      title: "Cadastral Survey Cross-Match",
      desc: "For each Documents Checked listing, survey beacon coordinates and title instruments (C of O, Governor's Consent, Gazette) are cross-referenced at Alausa.",
      tag: "Title Due Diligence",
    },
    {
      step: "04",
      title: "Continuous Audit & Badge Guard",
      desc: "If an agent modifies physical map coordinates post-audit, the system automatically revokes the Documents Checked badge to prevent bait-and-switch plots.",
      tag: "Badge Integrity",
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-white border-b border-[#E9E8E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-semibold text-[#008751] uppercase tracking-wider">
              Verification Framework
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-ink tracking-tight font-display uppercase mt-1">
              How Verification Works
            </h2>
          </div>
          <Link
            href="/how-verification-works"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#008751] hover:text-[#00563A] transition-colors"
          >
            <span>Learn about our title checks</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Horizontal Timeline (Desktop & Tablet) */}
        <div className="relative">
          {/* Subtle horizontal connecting line */}
          <div
            className="hidden md:block absolute top-4 left-[12%] right-[12%] h-[1px] bg-stone-200 z-0"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
            {timelineSteps.map((s, idx) => (
              <div key={idx} className="flex flex-col">
                {/* Timeline node */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-[#151314] text-white flex items-center justify-center font-display font-bold text-xs shadow-sm flex-shrink-0">
                    {s.step}
                  </div>
                  <span className="text-[10px] font-semibold text-stone-500 uppercase tracking-wide bg-stone-100 px-2 py-0.5 rounded">
                    {s.tag}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-ink mb-1.5 font-display uppercase tracking-tight">
                  {s.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mandatory Legal Transparency Note */}
        <div className="mt-8 p-3.5 rounded-lg bg-[#FAFAF7] border border-[#E9E8E1] text-center text-xs text-stone-600">
          <strong className="text-ink font-semibold">Transparency Notice:</strong> A "Documents Checked" badge indicates that title documents and survey beacon coordinates have been vetted against recorded land registry archives. This is an administrative records audit and does not constitute a legal title insurance guarantee.
        </div>
      </div>
    </section>
  );
}
