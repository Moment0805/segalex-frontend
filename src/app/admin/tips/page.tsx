"use client";

import React, { useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { useMarketplace } from "@/context/MarketplaceContext";
import { showToast } from "@/components/ui/Toast";
import { TipOfTheDay } from "@/types";
import { Lightbulb, Plus, Trash2, CheckCircle2, Save } from "lucide-react";

export default function AdminTipsPage() {
  const { tips } = useMarketplace();
  const [tipList, setTipList] = useState<TipOfTheDay[]>(tips);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Title Verification");
  const [newSnippet, setNewSnippet] = useState("");

  const handleAddTip = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newSnippet) return;

    const newTip: TipOfTheDay = {
      id: `tip-${Date.now()}`,
      title: newTitle,
      category: newCategory,
      snippet: newSnippet,
      dateActive: "Scheduled Today",
    };

    setTipList([newTip, ...tipList]);
    setNewTitle("");
    setNewSnippet("");
    showToast("Tip Scheduled", "New tip has been added to homepage rotation.");
  };

  const handleDelete = (id: string) => {
    setTipList(tipList.filter((t) => t.id !== id));
    showToast("Tip Removed", undefined, "info");
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#FAFAF7] text-stone-900">
      <AdminSidebar />

      <main className="flex-1 w-full min-w-0 p-4 sm:p-6 lg:p-10 overflow-x-hidden space-y-6 sm:space-y-8 max-w-5xl">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-ink font-display uppercase tracking-tight">
            Tip of the Day Content Scheduler
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Manage educational real estate and land title security snippets published on the homepage.
          </p>
        </div>

        {/* Create Tip Form */}
        <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-stone-900 uppercase tracking-wide flex items-center gap-2">
            <Plus className="w-4 h-4 text-[#008751]" />
            <span>Schedule New Lagos Property Safety Tip</span>
          </h3>

          <form onSubmit={handleAddTip} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-stone-600 uppercase mb-1">
                  Tip Headline / Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Governor's Consent vs C of O"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-[#FAFAF7] border border-stone-200 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:border-[#008751]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-stone-600 uppercase mb-1">
                  Category Tag
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full bg-[#FAFAF7] border border-stone-200 rounded-lg p-2.5 text-stone-900 font-bold focus:outline-none focus:border-[#008751]"
                >
                  <option value="Title Verification">Title Verification</option>
                  <option value="Land Security">Land Security</option>
                  <option value="Agent Compliance">Agent Compliance</option>
                  <option value="Property Inspection">Property Inspection</option>
                  <option value="Tenancy Law">Tenancy Law</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-stone-600 uppercase mb-1">
                Tip Body / Practical Advice (Max 3 lines) *
              </label>
              <textarea
                rows={3}
                required
                placeholder="Write plain, high-trust educational advice for Lagos buyers and tenants..."
                value={newSnippet}
                onChange={(e) => setNewSnippet(e.target.value)}
                className="w-full bg-[#FAFAF7] border border-stone-200 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:border-[#008751] resize-none"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="py-2.5 px-6 bg-[#008751] hover:bg-[#00563A] text-white rounded-lg font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
              >
                Schedule Tip
              </button>
            </div>
          </form>
        </div>

        {/* Existing Tips List */}
        <div className="space-y-3">
          <h3 className="font-bold text-sm text-stone-900 uppercase tracking-wide">
            Currently Scheduled Tips ({tipList.length})
          </h3>

          <div className="space-y-3">
            {tipList.map((t) => (
              <div
                key={t.id}
                className="bg-white rounded-xl p-5 border border-stone-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-stone-900 text-sm">{t.title}</span>
                    <span className="text-[10px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded font-bold uppercase">
                      {t.category}
                    </span>
                  </div>
                  <p className="text-stone-600 text-xs leading-relaxed">{t.snippet}</p>
                </div>

                <button
                  type="button"
                  onClick={() => handleDelete(t.id)}
                  className="p-2 rounded-lg text-stone-400 hover:text-red-600 self-end sm:self-center transition-colors"
                  title="Remove Tip"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

