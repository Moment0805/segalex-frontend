import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import {
  ShieldCheck,
  Award,
  FileCheck2,
  CheckCircle2,
  AlertCircle,
  MapPin,
  ArrowRight,
  FileText,
} from "lucide-react";

export default function HowVerificationWorksPage() {
  const steps = [
    {
      step: "01",
      name: "LASRERA Registry Check",
      authority: "Lagos State Ministry of Housing",
      desc: "Every practicing agent must provide proof of active registration under the Lagos State Real Estate Regulatory Authority (LASRERA Law 2022). Our compliance desk authenticates the license number directly against state registry rolls.",
      checks: [
        "Valid LASRERA registration code verified",
        "No disciplinary revocations on file",
        "Confirmed physical office address in Lagos",
      ],
      icon: ShieldCheck,
      color: "bg-[#008751]/10 text-[#008751] border-[#008751]",
    },
    {
      step: "02",
      name: "ERCAAN Standing & Biometric ID",
      authority: "Industry Association & CAC",
      desc: "We cross-reference membership with the Estate Rent and Commission Agents Association of Nigeria (ERCAAN) Lagos Chapter, corporate CAC filings, and government biometric NIN or International Passport identities.",
      checks: [
        "ERCAAN Chapter membership validated",
        "Corporate Affairs Commission (RC/BN) proof",
        "Biometric government photo ID matching",
      ],
      icon: Award,
      color: "bg-emerald-50 text-emerald-800 border-emerald-300",
    },
    {
      step: "03",
      name: "Verified Agent Badge Awarded",
      authority: "Segalex Property Hub Standards",
      desc: "Once steps 1 and 2 are satisfied, the agent receives our green 'Verified Agent • LASRERA Reg' badge and is authorized to list properties on the public hub. Unverified brokers cannot post inventory.",
      checks: [
        "Verified badge attached to agent profile",
        "Public directory listing enabled",
        "Direct verified WhatsApp routing enabled",
      ],
      icon: CheckCircle2,
      color: "bg-[#151314] text-white border-[#FFC800]",
    },
    {
      step: "04",
      name: "Documents Checked On Request",
      authority: "Cadastral Audit Bureau (Alausa)",
      desc: "For premium transparency, agents request our 'Documents Checked' badge for specific properties. Our cadastral team examines registered title instruments (C of O, Governor's Consent, Gazette) and matches survey beacon coordinates with cadastral charts.",
      checks: [
        "Survey beacon coordinates charted on GIS map",
        "Title document instrument authenticated",
        "Encumbrance and government acquisition check",
        "Badge stamped with exact verification date",
      ],
      icon: FileCheck2,
      color: "bg-[#FFC800]/20 text-stone-900 border-[#FFC800]",
    },
  ];

  const titleTypes = [
    {
      title: "Governor's Consent",
      badge: "Highest Private Transfer Security",
      desc: "Required on every subsequent sale of property already covered by a C of O. Signifies formal approval from the Executive Governor of Lagos State via the Lands Bureau.",
    },
    {
      title: "Certificate of Occupancy (C of O)",
      badge: "Primary 99-Year State Lease",
      desc: "Issued by the Lagos State Government granting ownership rights for 99 years on virgin land. Checked at the Alausa land registry.",
    },
    {
      title: "Lagos State Gazette",
      badge: "Published Excision Record",
      desc: "An official government record showing that customary family land was excised from general government acquisition and returned to traditional owners.",
    },
    {
      title: "Registered Survey Plan",
      badge: "Cadastral Ground Truth",
      desc: "The geometric blueprint prepared by a registered surveyor with beacon coordinates, submitted to the Office of the Surveyor General of Lagos State.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-darktext">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-[#151314] text-white py-16 sm:py-20 border-b border-white/10 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
            <div className="max-w-3xl space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#FFC800] text-xs font-bold uppercase tracking-wider border border-white/10">
                <ShieldCheck className="w-4 h-4 text-[#008751]" />
                Institutional Due Diligence
              </span>
              <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white uppercase leading-[1.08]">
                How Property Verification Works in Lagos
              </h1>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                Segalex Property Hub combines regulatory law enforcement with cadastral land auditing
                to protect buyers, tenants, and investors from counterfeit titles and fraudulent brokers.
              </p>
            </div>
          </div>
        </div>

        {/* 4-Step Visual Flowchart */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 space-y-16">
          <div>
            <div className="text-center max-w-xl mx-auto mb-12">
              <span className="text-xs font-bold text-[#008751] uppercase tracking-wider block">
                The 4-Stage Protocol
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-ink uppercase font-display mt-1">
                From Broker Vetting to Cadastral Audit
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((s, idx) => {
                const Icon = s.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl p-6 border border-stone-200 shadow-card hover:shadow-elevated transition-all flex flex-col justify-between relative"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-display font-black text-3xl text-stone-300">
                          {s.step}
                        </span>
                        <div className={`p-2 rounded-xl border ${s.color}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>

                      <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
                        {s.authority}
                      </span>
                      <h3 className="text-base font-bold text-stone-900 leading-snug mb-2">
                        {s.name}
                      </h3>
                      <p className="text-xs text-stone-600 leading-relaxed mb-4">{s.desc}</p>
                    </div>

                    <div className="pt-4 border-t border-stone-100 space-y-1.5 text-[11px] text-stone-700">
                      {s.checks.map((c, i) => (
                        <div key={i} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#008751] flex-shrink-0 mt-0.5" />
                          <span>{c}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Guide to Lagos Land Title Documents */}
          <div className="space-y-6 pt-8 border-t border-stone-200">
            <div>
              <span className="text-xs font-bold text-[#008751] uppercase tracking-wider block">
                Legal Instruments Explained
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-ink uppercase font-display mt-1">
                Understanding Title Documents on Segalex
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {titleTypes.map((t, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-base text-stone-900">{t.title}</h3>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-stone-100 px-2 py-0.5 rounded text-stone-700">
                      {t.badge}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mandatory Transparency Disclaimer Box */}
          <div className="bg-[#151314] text-white rounded-2xl p-6 sm:p-8 border border-stone-800 space-y-3">
            <div className="flex items-center gap-2 text-[#FFC800] text-xs font-bold uppercase tracking-wider">
              <AlertCircle className="w-4 h-4 text-[#FFC800]" />
              <span>Statutory Records Check Disclaimer</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white">
              This is a records check, not a guarantee of title.
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed max-w-3xl">
              Segalex Property Hub conducts thorough records verification against the Lagos State Real
              Estate Regulatory Authority (LASRERA) database and documented Surveyor General charting
              records. However, administrative records audits do not constitute judicial title insurance
              or guarantee against latent private claims. Buyers and diaspora investors must always
              engage a registered solicitor to conduct final search reports at Alausa before executing deeds.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

