"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { useMarketplace } from "@/context/MarketplaceContext";
import { showToast } from "@/components/ui/Toast";
import { LAGOS_AREAS } from "@/data/areas";
import {
  ShieldCheck,
  Award,
  Upload,
  CheckCircle2,
  Clock,
  ArrowRight,
  ArrowLeft,
  FileText,
  User,
  Building2,
} from "lucide-react";

export default function AgentRegistrationWizard() {
  const router = useRouter();
  const { registerAgent } = useMarketplace();

  const [step, setStep] = useState(1);
  const [isPending, setIsPending] = useState(false);

  // Form Fields
  const [name, setName] = useState("");
  const [agencyName, setAgencyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [lasreraNumber, setLasreraNumber] = useState("LASRERA/RN/2024/1190");
  const [hasErcaan, setHasErcaan] = useState(true);
  const [ercaanNumber, setErcaanNumber] = useState("ERCAAN/LAG/9821");
  const [bio, setBio] = useState("");
  const [selectedAreas, setSelectedAreas] = useState<string[]>(["Lekki Phase 1", "Ikoyi"]);

  // Upload States
  const [lasreraCertUploaded, setLasreraCertUploaded] = useState(true);
  const [idUploaded, setIdUploaded] = useState(true);
  const [cacUploaded, setCacUploaded] = useState(true);

  const toggleArea = (areaName: string) => {
    setSelectedAreas((prev) =>
      prev.includes(areaName) ? prev.filter((a) => a !== areaName) : [...prev, areaName]
    );
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Complete Registration
      registerAgent({
        name: name || "Tolu Ogunlesi",
        agencyName: agencyName || "Crown Ridge Properties Ltd",
        email: email || "tolu@crownridge.ng",
        phone: phone || "+234 803 999 1234",
        whatsapp: whatsapp || "2348039991234",
        lasreraNumber,
        isErcaanMember: hasErcaan,
        ercaanRegNumber: ercaanNumber,
        bio: bio || "Licensed real estate broker specializing in Lekki corridor investments.",
        coverageAreas: selectedAreas,
      });

      setIsPending(true);
      showToast("Application Submitted", "Your credentials have been submitted to Admin queue.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-darktext">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-8">
        {/* Wizard Header */}
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold text-[#008751] uppercase tracking-wider">
            Broker Accreditation Portal
          </span>
          <h1 className="text-2xl sm:text-4xl font-black font-display text-ink uppercase tracking-tight">
            Apply for Verified Agent Accreditation
          </h1>
          <p className="text-xs sm:text-sm text-stone-600">
            Comply with the Lagos State Real Estate Regulatory Authority (LASRERA) standard.
          </p>
        </div>

        {/* Pending Verification Timeline Screen (When Finished) */}
        {isPending ? (
          <div className="bg-white rounded-2xl p-8 sm:p-10 border border-stone-200 shadow-card space-y-8 animate-in zoom-in-95 duration-200">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
                <Clock className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-stone-900">Application Under Review</h2>
              <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{name || "Agent"}</strong>. Your application dossier has been
                transmitted to the Segalex Compliance & LASRERA Verification Desk.
              </p>
            </div>

            {/* Verification Timeline Tracker */}
            <div className="p-6 bg-[#FAFAF7] rounded-2xl border border-stone-200 space-y-6">
              <span className="text-xs font-black uppercase tracking-wider text-stone-700 block">
                Verification Progress Timeline
              </span>

              <div className="relative pl-6 space-y-6 border-l-2 border-[#008751]">
                {/* Stage 1 */}
                <div className="relative">
                  <span className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-[#008751] border-2 border-white" />
                  <h4 className="font-bold text-xs text-stone-900">
                    Step 1: Credentials Received & Dossier Generated
                  </h4>
                  <p className="text-[11px] text-[#008751] font-semibold">
                    ✓ Completed: Digital signatures and uploaded certificates logged.
                  </p>
                </div>

                {/* Stage 2 */}
                <div className="relative">
                  <span className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-amber-500 border-2 border-white animate-pulse" />
                  <h4 className="font-bold text-xs text-stone-900">
                    Step 2: LASRERA Registry Cross-Verification
                  </h4>
                  <p className="text-[11px] text-amber-700 font-semibold">
                    ● In Progress: Validating license code against Lagos State Ministry of Housing portal.
                  </p>
                </div>

                {/* Stage 3 */}
                <div className="relative">
                  <span className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-stone-300 border-2 border-white" />
                  <h4 className="font-bold text-xs text-stone-500">
                    Step 3: Cadastral Officer Compliance Check
                  </h4>
                  <p className="text-[11px] text-stone-400">
                    Pending administrator sign-off in the Admin Console.
                  </p>
                </div>

                {/* Stage 4 */}
                <div className="relative">
                  <span className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-stone-300 border-2 border-white" />
                  <h4 className="font-bold text-xs text-stone-500">
                    Step 4: Verified Badge Awarded & Marketplace Access
                  </h4>
                  <p className="text-[11px] text-stone-400">
                    Green badge goes live on your profile; inventory posting unlocked.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Demo Helper */}
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <strong>Prototype Walkthrough Note:</strong> You can open the <strong>Admin Console</strong> to immediately inspect and approve this application!
              </div>
              <Link
                href="/admin/agents"
                className="px-4 py-2 bg-[#008751] text-white rounded-lg font-bold text-xs uppercase tracking-wider text-center whitespace-nowrap"
              >
                Go to Admin Queue →
              </Link>
            </div>
          </div>
        ) : (
          /* Multi-step Wizard Container */
          <div className="bg-white rounded-2xl p-6 sm:p-10 border border-stone-200 shadow-card space-y-6">
            {/* Step Progress Pills */}
            <div className="flex items-center justify-between border-b border-stone-200 pb-4 text-xs">
              <span
                className={`font-bold uppercase tracking-wider ${
                  step === 1 ? "text-[#008751]" : "text-stone-400"
                }`}
              >
                1. Personal & Agency Details
              </span>
              <span
                className={`font-bold uppercase tracking-wider ${
                  step === 2 ? "text-[#008751]" : "text-stone-400"
                }`}
              >
                2. Regulatory Certificates
              </span>
              <span
                className={`font-bold uppercase tracking-wider ${
                  step === 3 ? "text-[#008751]" : "text-stone-400"
                }`}
              >
                3. Operating Scope
              </span>
            </div>

            {/* STEP 1: PERSONAL & AGENCY */}
            {step === 1 && (
              <div className="space-y-4 text-xs animate-in fade-in duration-150">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-stone-600 uppercase mb-1">
                      Full Legal Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tolu Ogunlesi"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#FAFAF7] border border-stone-200 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:border-[#008751]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-stone-600 uppercase mb-1">
                      Agency / Firm Registered Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Crown Ridge Properties Ltd"
                      value={agencyName}
                      onChange={(e) => setAgencyName(e.target.value)}
                      className="w-full bg-[#FAFAF7] border border-stone-200 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:border-[#008751]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-stone-600 uppercase mb-1">
                      Official Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@agency.ng"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#FAFAF7] border border-stone-200 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:border-[#008751]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-stone-600 uppercase mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+234 803 000 0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#FAFAF7] border border-stone-200 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:border-[#008751]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-stone-600 uppercase mb-1">
                      WhatsApp Number *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="2348030000000"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      className="w-full bg-[#FAFAF7] border border-stone-200 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:border-[#008751]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-stone-600 uppercase mb-1">
                    Broker Profile Summary / Bio
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Brief description of your brokerage track record in Lagos..."
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full bg-[#FAFAF7] border border-stone-200 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:border-[#008751] resize-none"
                  />
                </div>
              </div>
            )}

            {/* STEP 2: REGULATORY CERTIFICATES */}
            {step === 2 && (
              <div className="space-y-5 text-xs animate-in fade-in duration-150">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-stone-600 uppercase mb-1">
                      LASRERA Accreditation Code *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. LASRERA/RN/2024/1190"
                      value={lasreraNumber}
                      onChange={(e) => setLasreraNumber(e.target.value)}
                      className="w-full bg-[#FAFAF7] border border-stone-200 rounded-lg p-2.5 text-stone-900 font-mono font-bold focus:outline-none focus:border-[#008751]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-stone-600 uppercase mb-1">
                      ERCAAN Reg Number (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. ERCAAN/LAG/9821"
                      value={ercaanNumber}
                      onChange={(e) => setErcaanNumber(e.target.value)}
                      className="w-full bg-[#FAFAF7] border border-stone-200 rounded-lg p-2.5 text-stone-900 font-mono focus:outline-none focus:border-[#008751]"
                    />
                  </div>
                </div>

                {/* Drag-Drop Uploaders */}
                <div className="space-y-3">
                  <div className="p-4 border-2 border-dashed border-stone-300 rounded-xl bg-stone-50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-[#008751]" />
                      <div>
                        <span className="font-bold text-stone-800 block">
                          LASRERA Operating Certificate (PDF / PNG)
                        </span>
                        <span className="text-[10px] text-stone-500 font-mono">
                          {lasreraCertUploaded ? "lasrera-cert-2024.pdf (Attached)" : "Drag & drop file"}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] bg-emerald-100 text-[#008751] font-bold px-2 py-0.5 rounded">
                      Ready for Upload
                    </span>
                  </div>

                  <div className="p-4 border-2 border-dashed border-stone-300 rounded-xl bg-stone-50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-[#008751]" />
                      <div>
                        <span className="font-bold text-stone-800 block">
                          Government Biometric ID (NIN Slip / Passport)
                        </span>
                        <span className="text-[10px] text-stone-500 font-mono">
                          {idUploaded ? "nin-identity-card.jpeg (Attached)" : "Drag & drop file"}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] bg-emerald-100 text-[#008751] font-bold px-2 py-0.5 rounded">
                      Ready for Upload
                    </span>
                  </div>

                  <div className="p-4 border-2 border-dashed border-stone-300 rounded-xl bg-stone-50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Building2 className="w-5 h-5 text-[#008751]" />
                      <div>
                        <span className="font-bold text-stone-800 block">
                          CAC Business Registration Document
                        </span>
                        <span className="text-[10px] text-stone-500 font-mono">
                          {cacUploaded ? "cac-rc-certificate.pdf (Attached)" : "Drag & drop file"}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] bg-emerald-100 text-[#008751] font-bold px-2 py-0.5 rounded">
                      Ready for Upload
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: OPERATING SCOPE */}
            {step === 3 && (
              <div className="space-y-5 text-xs animate-in fade-in duration-150">
                <div>
                  <h3 className="font-bold text-sm text-stone-900 mb-1">
                    Select Your Operating Lagos Districts
                  </h3>
                  <p className="text-stone-500">
                    Buyers looking in these areas will discover your agency profile and verified listings.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {LAGOS_AREAS.map((a) => {
                    const isSelected = selectedAreas.includes(a.name);
                    return (
                      <button
                        key={a.id}
                        type="button"
                        onClick={() => toggleArea(a.name)}
                        className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                          isSelected
                            ? "bg-[#008751] text-white shadow-sm"
                            : "bg-[#FAFAF7] text-stone-700 border border-stone-200 hover:border-stone-400"
                        }`}
                      >
                        {a.name}
                      </button>
                    );
                  })}
                </div>

                <div className="p-4 rounded-xl bg-stone-100 border border-stone-200 text-stone-700 leading-relaxed text-[11px]">
                  <strong>Affidavit of Integrity:</strong> By submitting, I declare that my agency
                  operates in strict compliance with the Lagos State Real Estate Regulatory Authority
                  (LASRERA) Law 2022. Any misrepresentation of title documents or fraudulent listings
                  will result in immediate expulsion and referral to the Ministry of Housing.
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-stone-100">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-4 py-2 border border-stone-300 rounded-lg text-stone-700 font-bold flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>
              ) : (
                <div />
              )}

              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 bg-[#008751] hover:bg-[#00563A] text-white rounded-lg font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all"
              >
                <span>{step === 3 ? "Submit for Verification" : "Continue"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

