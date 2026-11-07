"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Agent, PropertyListing } from "@/types";
import { useMarketplace } from "@/context/MarketplaceContext";
import { showToast } from "@/components/ui/Toast";
import {
  MessageCircle,
  Phone,
  ShieldCheck,
  Award,
  Send,
  CheckCircle2,
  Building2,
} from "lucide-react";

interface AgentStickyCardProps {
  agent: Agent;
  listing: PropertyListing;
}

export function AgentStickyCard({ agent, listing }: AgentStickyCardProps) {
  const { submitEnquiry, logWhatsAppClick } = useMarketplace();
  const [buyerName, setBuyerName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [buyerPhone, setBuyerPhone] = useState("");
  const [message, setMessage] = useState(
    `Hello ${agent.name}, I would like to schedule an inspection for "${listing.title}" (${listing.priceDisplay}). Please confirm availability.`
  );
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const prefilledWhatsAppMessage = encodeURIComponent(
    `Hello ${agent.name}, I found your listing "${listing.title}" (${listing.priceDisplay}) on Segalex Property Hub. I would like to enquire about its availability and title documents.`
  );

  const handleWhatsApp = () => {
    logWhatsAppClick(listing.id);
    const url = `https://wa.me/${agent.whatsapp}?text=${prefilledWhatsAppMessage}`;
    window.open(url, "_blank");
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerName || !buyerEmail) return;

    setIsLoading(true);
    setTimeout(() => {
      submitEnquiry({
        listingId: listing.id,
        listingTitle: listing.title,
        listingPrice: listing.priceDisplay,
        agentId: agent.id,
        buyerName,
        buyerEmail,
        buyerPhone: buyerPhone || "+234 800 000 0000",
        message,
        channel: "form",
      });

      setIsLoading(false);
      setIsSubmitted(true);
      showToast("Enquiry Dispatched!", "The verified agent has received your details.");
    }, 600);
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-card sticky top-24 space-y-5">
      {/* Agent Bio Header */}
      <div className="flex items-start gap-3.5 pb-4 border-b border-stone-100">
        <div className="relative flex-shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={agent.avatar}
            alt={agent.name}
            className="w-14 h-14 rounded-full object-cover border-2 border-stone-100"
          />
          <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-[#008751] border-2 border-white flex items-center justify-center text-white text-[9px]">
            ✓
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-[#008751] px-1.5 py-0.2 rounded border border-emerald-200">
              Verified
            </span>
            {agent.isErcaanMember && (
              <span className="text-[10px] font-bold uppercase tracking-wider bg-stone-100 text-stone-700 px-1.5 py-0.2 rounded">
                ERCAAN
              </span>
            )}
          </div>
          <h4 className="font-bold text-stone-900 text-sm mt-0.5 truncate">{agent.name}</h4>
          <p className="text-xs font-semibold text-stone-600 truncate">{agent.agencyName}</p>
          <span className="text-[10px] text-stone-500 font-mono block mt-0.5 truncate">
            {agent.lasreraNumber}
          </span>
        </div>
      </div>

      {/* Instant Action CTA: WhatsApp */}
      <button
        type="button"
        onClick={handleWhatsApp}
        className="w-full py-3 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white font-black rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98] cursor-pointer"
      >
        <MessageCircle className="w-4 h-4" />
        <span>Chat on WhatsApp</span>
      </button>

      {/* Direct Phone Call */}
      <a
        href={`tel:${agent.phone}`}
        className="w-full py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors"
      >
        <Phone className="w-3.5 h-3.5 text-stone-600" />
        <span>Call Agent: {agent.phone}</span>
      </a>

      {/* Enquiry Form */}
      <div className="pt-2 border-t border-stone-100">
        <h5 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-2.5">
          Send Direct Message
        </h5>

        {isSubmitted ? (
          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-center space-y-1">
            <CheckCircle2 className="w-6 h-6 text-[#008751] mx-auto" />
            <p className="font-bold text-xs text-stone-900">Enquiry Successfully Sent!</p>
            <p className="text-[11px] text-stone-600 leading-normal">
              Mr. {agent.name.split(" ")[0]} will contact you shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className="space-y-2.5 text-xs">
            <div>
              <input
                type="text"
                required
                placeholder="Your Full Name *"
                value={buyerName}
                onChange={(e) => setBuyerName(e.target.value)}
                className="w-full bg-[#FAFAF7] border border-stone-200 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:border-[#008751]"
              />
            </div>
            <div>
              <input
                type="email"
                required
                placeholder="Email Address *"
                value={buyerEmail}
                onChange={(e) => setBuyerEmail(e.target.value)}
                className="w-full bg-[#FAFAF7] border border-stone-200 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:border-[#008751]"
              />
            </div>
            <div>
              <input
                type="tel"
                placeholder="Phone Number (e.g. +234...)"
                value={buyerPhone}
                onChange={(e) => setBuyerPhone(e.target.value)}
                className="w-full bg-[#FAFAF7] border border-stone-200 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:border-[#008751]"
              />
            </div>
            <div>
              <textarea
                rows={3}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-[#FAFAF7] border border-stone-200 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:border-[#008751] resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 bg-[#151314] hover:bg-black disabled:opacity-75 text-white font-bold rounded-lg text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Sending Enquiry...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Enquiry</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>

      <div className="text-[10px] text-stone-400 text-center leading-tight">
        Protected by Segalex Fraud Shield • LASRERA Licensed Broker
      </div>
    </div>
  );
}

