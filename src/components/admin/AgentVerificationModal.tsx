"use client";

import React, { useState } from "react";
import { Agent } from "@/types";
import { useMarketplace } from "@/context/MarketplaceContext";
import { showToast } from "@/components/ui/Toast";
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  UserCheck,
  FileText,
  Building,
  Mail,
  Phone,
  Calendar,
} from "lucide-react";

interface AgentVerificationModalProps {
  agent: Agent;
  isOpen: boolean;
  onClose: () => void;
}

export function AgentVerificationModal({
  agent,
  isOpen,
  onClose,
}: AgentVerificationModalProps) {
  const { approveAgent, rejectAgent, suspendAgent } = useMarketplace();
  const [lasreraRef, setLasreraRef] = useState(agent.lasreraNumber || "LASRERA/RN/2024/0999");
  const [lasreraChecked, setLasreraChecked] = useState(true);
  const [ercaanChecked, setErcaanChecked] = useState(agent.isErcaanMember);
  const [cacChecked, setCacChecked] = useState(true);
  const [idChecked, setIdChecked] = useState(true);
  const [actionReason, setActionReason] = useState("");
  const [activeTab, setActiveTab] = useState<"dossier" | "docs">("dossier");

  if (!isOpen) return null;

  const handleApprove = () => {
    approveAgent(
      agent.id,
      lasreraRef,
      actionReason || `Accredited via LASRERA Registry. License ref: ${lasreraRef}`
    );
    showToast("Agent Approved!", `${agent.name} is now a Verified Agent with badges.`);
    onClose();
  };

  const handleReject = () => {
    rejectAgent(agent.id, actionReason || "LASRERA credentials could not be validated.");
    showToast("Application Rejected", `${agent.name}'s application rejected.`, "error");
    onClose();
  };

  const handleSuspend = () => {
    suspendAgent(agent.id, actionReason || "Administrative compliance hold.");
    showToast("Agent Suspended", `${agent.name} has been suspended.`, "error");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-4 bg-[#151314] text-white flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={agent.avatar}
              alt={agent.name}
              className="w-10 h-10 rounded-full object-cover border border-[#FFC800]"
            />
            <div>
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                {agent.name}
                <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded uppercase font-mono">
                  {agent.verificationStatus}
                </span>
              </h3>
              <p className="text-xs text-stone-300">{agent.agencyName}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-stone-400 hover:text-white">
            ✕
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-2 px-6 pt-4 border-b border-stone-200 bg-[#FAFAF7]">
          <button
            onClick={() => setActiveTab("dossier")}
            className={`pb-3 text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${
              activeTab === "dossier"
                ? "border-[#008751] text-[#008751]"
                : "border-transparent text-stone-500 hover:text-stone-800"
            }`}
          >
            Applicant Credentials & Checklist
          </button>
          <button
            onClick={() => setActiveTab("docs")}
            className={`pb-3 text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${
              activeTab === "docs"
                ? "border-[#008751] text-[#008751]"
                : "border-transparent text-stone-500 hover:text-stone-800"
            }`}
          >
            Uploaded Certificates Viewer
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-stone-800">
          {activeTab === "dossier" ? (
            <>
              {/* Agent Overview Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">
                    LASRERA Code
                  </span>
                  <span className="font-mono font-bold text-stone-900 text-xs truncate block">
                    {agent.lasreraNumber}
                  </span>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">
                    ERCAAN Member
                  </span>
                  <span className="font-bold text-stone-900 text-xs">
                    {agent.isErcaanMember ? "Yes (Accredited)" : "No"}
                  </span>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">
                    Current Tier
                  </span>
                  <span className="font-bold text-[#008751] uppercase text-xs">
                    {agent.tier}
                  </span>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">
                    Contact Phone
                  </span>
                  <span className="font-bold text-stone-900 text-xs truncate block">
                    {agent.phone}
                  </span>
                </div>
              </div>

              {/* Bio & Coverage */}
              <div className="bg-[#FAFAF7] p-4 rounded-xl border border-stone-200 space-y-2">
                <span className="font-bold text-[11px] text-stone-700 uppercase">
                  Practitioner Bio & Operational Scope
                </span>
                <p className="text-stone-600 leading-relaxed text-xs">{agent.bio}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {agent.coverageAreas.map((area, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-white text-stone-700 text-[10px] font-semibold border border-stone-200"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              {/* Verification Checklist */}
              <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-2.5">
                <span className="font-bold text-xs uppercase tracking-wider text-stone-900 block">
                  LASRERA Compliance Checklist
                </span>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={lasreraChecked}
                    onChange={(e) => setLasreraChecked(e.target.checked)}
                    className="rounded text-[#008751]"
                  />
                  <span>
                    LASRERA Register Checked: Valid license active in Lagos State Ministry records
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={ercaanChecked}
                    onChange={(e) => setErcaanChecked(e.target.checked)}
                    className="rounded text-[#008751]"
                  />
                  <span>
                    ERCAAN Membership verified with Lagos State Chapter (if applicable)
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={cacChecked}
                    onChange={(e) => setCacChecked(e.target.checked)}
                    className="rounded text-[#008751]"
                  />
                  <span>CAC Business Registration / Incorporation documents verified</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={idChecked}
                    onChange={(e) => setIdChecked(e.target.checked)}
                    className="rounded text-[#008751]"
                  />
                  <span>Government Biometric ID (NIN / International Passport) confirmed</span>
                </label>
              </div>

              {/* Verified LASRERA Reference */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-stone-600 uppercase mb-1">
                    Confirmed LASRERA Reference Number
                  </label>
                  <input
                    type="text"
                    value={lasreraRef}
                    onChange={(e) => setLasreraRef(e.target.value)}
                    className="w-full p-2.5 bg-[#FAFAF7] border border-stone-200 rounded-lg text-xs font-mono font-bold focus:outline-none focus:border-[#008751]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-stone-600 uppercase mb-1">
                    Auditor Reason / Audit Log Note
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Validated against LASRERA portal database."
                    value={actionReason}
                    onChange={(e) => setActionReason(e.target.value)}
                    className="w-full p-2.5 bg-[#FAFAF7] border border-stone-200 rounded-lg text-xs focus:outline-none focus:border-[#008751]"
                  />
                </div>
              </div>
            </>
          ) : (
            /* Uploaded Certificates Viewer */
            <div className="space-y-4">
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 font-bold text-stone-900">
                    <FileText className="w-4 h-4 text-[#008751]" />
                    <span>LASRERA Operating Certificate</span>
                  </div>
                  <span className="text-[10px] text-[#008751] font-bold">PDF • Verified Digital Copy</span>
                </div>
                <div className="h-40 bg-white border border-stone-200 rounded-lg p-4 flex flex-col justify-center items-center text-center space-y-1">
                  <span className="font-bold text-xs text-stone-800">
                    Lagos State Real Estate Regulatory Authority Certificate
                  </span>
                  <span className="text-[11px] font-mono text-stone-500">
                    Registered Name: {agent.agencyName}
                  </span>
                  <span className="text-[10px] bg-emerald-50 text-[#008751] px-2 py-0.5 rounded font-bold">
                    Serial No: {agent.lasreraNumber}
                  </span>
                </div>
              </div>

              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 font-bold text-stone-900">
                    <FileText className="w-4 h-4 text-[#008751]" />
                    <span>Government Biometric ID (NIN Card)</span>
                  </div>
                  <span className="text-[10px] text-[#008751] font-bold">JPEG • Biometrics Clear</span>
                </div>
                <div className="h-28 bg-white border border-stone-200 rounded-lg p-3 flex items-center gap-4">
                  <div className="w-16 h-16 bg-stone-100 rounded-md overflow-hidden flex-shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={agent.avatar} alt="NIN Portrait" className="w-full h-full object-cover" />
                  </div>
                  <div className="text-[11px] space-y-0.5">
                    <div className="font-bold text-stone-900">{agent.name}</div>
                    <div className="text-stone-500 font-mono">NIN: 8940 **** ****</div>
                    <div className="text-[10px] text-stone-400">Federal Republic of Nigeria</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Decision Tray */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleReject}
              className="px-4 py-2 border border-red-300 text-red-600 hover:bg-red-50 rounded-xl font-bold text-xs transition-colors"
            >
              Reject Application
            </button>
            <button
              onClick={handleSuspend}
              className="px-4 py-2 border border-stone-300 text-stone-700 hover:bg-stone-100 rounded-xl font-bold text-xs transition-colors"
            >
              Suspend Agent
            </button>
          </div>

          <button
            onClick={handleApprove}
            className="px-6 py-2.5 bg-[#008751] hover:bg-[#00563A] text-white rounded-xl font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Approve & Grant Verified Status</span>
          </button>
        </div>
      </div>
    </div>
  );
}

