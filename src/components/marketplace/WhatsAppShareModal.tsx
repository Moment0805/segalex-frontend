"use client";

import React, { useState } from "react";
import { PropertyListing } from "@/types";
import { formatNaira, formatRentPrice } from "@/lib/utils";
import { showToast } from "@/components/ui/Toast";
import { X, Copy, Check, MessageCircle, ExternalLink, ShieldCheck, Share2 } from "lucide-react";

interface WhatsAppShareModalProps {
  listing: PropertyListing;
  isOpen: boolean;
  onClose: () => void;
}

export function WhatsAppShareModal({ listing, isOpen, onClose }: WhatsAppShareModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== "undefined" ? window.location.href : `https://segalex.com.ng/property/${listing.id}`;
  const priceDisplay = listing.purpose === "rent"
    ? formatRentPrice(listing.price, false)
    : formatNaira(listing.price, false);

  const shareText = `*${listing.title}*\n📍 ${listing.address}\n💰 ${priceDisplay}\n🛡️ Segalex Verified Listing\n👉 ${currentUrl}`;
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      showToast("Link Copied!", "Listing URL copied to clipboard.");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl w-full max-w-md border border-stone-200 shadow-elevated overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="p-4 bg-[#151314] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Share2 className="w-4 h-4 text-[#FFC800]" />
            <h3 className="font-bold text-sm uppercase tracking-wide">
              Share Property Listing
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-stone-400 hover:text-white p-1 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* WhatsApp Unfurl Mock Preview */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
              WhatsApp Link Preview in Chat
            </span>

            {/* Simulated WhatsApp Chat Screen & Bubble */}
            <div className="p-4 rounded-xl bg-[#EFEAE2] border border-stone-300 relative overflow-hidden">
              <div className="max-w-[85%] bg-white rounded-lg shadow-sm p-2.5 text-xs space-y-2 border border-stone-200">
                {/* Photo Thumbnail */}
                <div className="relative aspect-video rounded-md overflow-hidden bg-stone-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={listing.photos[0]}
                    alt={listing.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-1.5 left-1.5 bg-[#151314]/90 text-white px-1.5 py-0.2 rounded text-[9px] font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-[#008751]" />
                    <span>Verified</span>
                  </div>
                </div>

                {/* Link Unfurl Details */}
                <div className="space-y-0.5">
                  <h4 className="font-bold text-stone-900 text-[11px] line-clamp-1 leading-snug">
                    {listing.title}
                  </h4>
                  <p className="text-[10px] font-black font-sans text-[#008751]">
                    {priceDisplay} · {listing.area}
                  </p>
                  <p className="text-[9px] text-stone-500 line-clamp-1">
                    {listing.tagline || "Verified by LASRERA registered broker on Segalex."}
                  </p>
                  <span className="text-[8px] text-stone-400 font-mono block pt-0.5">
                    segalex.com.ng
                  </span>
                </div>

                <div className="text-[9px] text-stone-400 text-right pt-0.5">
                  12:45 PM · Read ✓✓
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5">
            {/* Direct WhatsApp Share */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => showToast("Opening WhatsApp...", "Preparing chat draft.")}
              className="w-full py-2.5 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white text-transparent" />
              <span>Share to WhatsApp Chat or Status</span>
              <ExternalLink className="w-3.5 h-3.5 ml-1" />
            </a>

            {/* Copy Link */}
            <button
              type="button"
              onClick={handleCopy}
              className="w-full py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-[#008751]" />
                  <span className="text-[#008751]">Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-stone-500" />
                  <span>Copy Listing Link</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

