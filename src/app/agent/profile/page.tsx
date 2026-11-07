"use client";

import React, { useState } from "react";
import { AgentSidebar } from "@/components/agent/AgentSidebar";
import { useMarketplace } from "@/context/MarketplaceContext";
import { showToast } from "@/components/ui/Toast";
import { LAGOS_AREAS } from "@/data/areas";
import { ShieldCheck, UserCheck, Save, Camera } from "lucide-react";

export default function AgentProfileSettingsPage() {
  const { activeAgentId, agents } = useMarketplace();
  const agent = agents.find((a) => a.id === activeAgentId) || agents[0];

  const [name, setName] = useState(agent.name);
  const [agencyName, setAgencyName] = useState(agent.agencyName);
  const [email, setEmail] = useState(agent.email);
  const [phone, setPhone] = useState(agent.phone);
  const [whatsapp, setWhatsapp] = useState(agent.whatsapp);
  const [bio, setBio] = useState(agent.bio);
  const [selectedAreas, setSelectedAreas] = useState<string[]>(agent.coverageAreas);

  const toggleArea = (areaName: string) => {
    setSelectedAreas((prev) =>
      prev.includes(areaName) ? prev.filter((a) => a !== areaName) : [...prev, areaName]
    );
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Profile Updated", "Your brokerage profile changes have been saved.");
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#FAFAF7] text-stone-900">
      <AgentSidebar />

      <main className="flex-1 w-full min-w-0 p-4 sm:p-6 lg:p-10 overflow-x-hidden space-y-6 sm:space-y-8 max-w-4xl">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-ink font-display uppercase tracking-tight">
            Practitioner Profile & LASRERA Info
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Maintain your official regulatory credentials and contact channels.
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-6 text-xs">
          {/* Avatar & Photo */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm flex items-center gap-5">
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={agent.avatar}
                alt={agent.name}
                className="w-20 h-20 rounded-full object-cover border-2 border-stone-200"
              />
              <button
                type="button"
                className="absolute bottom-0 right-0 p-1.5 bg-[#151314] text-white rounded-full hover:bg-black"
                title="Change Photo"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>
            <div>
              <h3 className="font-bold text-sm text-stone-900">{name}</h3>
              <p className="text-stone-500 text-xs">{agencyName}</p>
              <div className="flex items-center gap-1.5 mt-2">
                <span className="text-[10px] font-bold uppercase bg-emerald-50 text-[#008751] px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  LASRERA Verified
                </span>
                <span className="font-mono text-[10px] text-stone-500">{agent.lasreraNumber}</span>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-stone-900 pb-2 border-b border-stone-100">
              Personal & Agency Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-stone-600 uppercase mb-1">
                  Lead Broker Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#FAFAF7] border border-stone-200 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:border-[#008751]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-stone-600 uppercase mb-1">
                  Registered Agency / Firm Name *
                </label>
                <input
                  type="text"
                  required
                  value={agencyName}
                  onChange={(e) => setAgencyName(e.target.value)}
                  className="w-full bg-[#FAFAF7] border border-stone-200 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:border-[#008751]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-stone-600 uppercase mb-1">
                  Official Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#FAFAF7] border border-stone-200 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:border-[#008751]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-stone-600 uppercase mb-1">
                  Phone (Voice Calls)
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#FAFAF7] border border-stone-200 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:border-[#008751]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-stone-600 uppercase mb-1">
                  WhatsApp Number (with country code)
                </label>
                <input
                  type="text"
                  required
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="w-full bg-[#FAFAF7] border border-stone-200 rounded-lg p-2.5 text-stone-900 font-mono focus:outline-none focus:border-[#008751]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-stone-600 uppercase mb-1">
                Practitioner Professional Biography
              </label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full bg-[#FAFAF7] border border-stone-200 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:border-[#008751] resize-none"
              />
            </div>
          </div>

          {/* Operating Areas Selector */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-3">
            <h3 className="font-bold text-sm text-stone-900">Coverage Corridors</h3>
            <p className="text-stone-500 text-xs">
              Select the primary Lagos neighborhoods where your agency maintains active mandates.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {LAGOS_AREAS.map((a) => {
                const isSelected = selectedAreas.includes(a.name);
                return (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => toggleArea(a.name)}
                    className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all ${
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
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-3 bg-[#008751] hover:bg-[#00563A] text-white rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile Updates</span>
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

