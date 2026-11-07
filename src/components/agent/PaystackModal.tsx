"use client";

import React, { useState } from "react";
import { AgentTier, TierConfig } from "@/types";
import { useMarketplace } from "@/context/MarketplaceContext";
import { showToast } from "@/components/ui/Toast";
import { formatNaira } from "@/lib/utils";
import { ShieldCheck, Lock, X, CheckCircle2, CreditCard } from "lucide-react";

interface PaystackModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetTier: AgentTier;
  billingCycle: "monthly" | "yearly";
}

export function PaystackModal({
  isOpen,
  onClose,
  targetTier,
  billingCycle,
}: PaystackModalProps) {
  const { activeAgentId, upgradeAgentTier, tiers, agents } = useMarketplace();
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [email, setEmail] = useState("agent@segalexglobal.com");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const tierConfig = tiers.find((t) => t.tier === targetTier) || tiers[2];
  const agent = agents.find((a) => a.id === activeAgentId) || agents[0];

  const amount = billingCycle === "yearly" ? tierConfig.yearlyPrice : tierConfig.monthlyPrice;

  if (!isOpen) return null;

  const fillTestCard = () => {
    setCardNumber("4084 0840 0840 0840");
    setExpiry("12/28");
    setCvv("408");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      upgradeAgentTier(activeAgentId, targetTier);
      setIsProcessing(false);
      setIsSuccess(true);
      showToast("Payment Successful!", `Upgraded to ${tierConfig.name}.`);
    }, 1500);
  };

  const handleDone = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-stone-200"
      >
        {/* Paystack Mock Header */}
        <div className="bg-[#0BA4DB] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-black text-sm tracking-wider uppercase">Paystack</span>
            <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded font-mono">
              Secured Checkout
            </span>
          </div>
          <button onClick={onClose} aria-label="Close Paystack modal" className="text-white/80 hover:text-white p-1 rounded cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 text-stone-800 text-xs">
          {isSuccess ? (
            <div className="py-6 text-center space-y-3 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#008751] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-lg font-bold text-stone-900">Payment Approved!</h3>
              <p className="text-stone-600 text-xs max-w-xs mx-auto">
                Your subscription for <strong>{tierConfig.name}</strong> ({billingCycle}) has been activated on Segalex Property Hub.
              </p>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-left font-mono text-[11px] space-y-1">
                <div>Ref: PSTK_{Date.now().toString().slice(-8)}</div>
                <div>Amount: {formatNaira(amount)}</div>
                <div>Status: Settled (Access Bank NGN)</div>
              </div>
              <button
                onClick={handleDone}
                className="w-full py-3 bg-[#008751] hover:bg-[#00563A] text-white font-bold rounded-xl text-xs uppercase tracking-wider"
              >
                Return to Portal
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Payment Summary */}
              <div className="bg-[#FAFAF7] p-3.5 rounded-xl border border-stone-200 flex items-center justify-between">
                <div>
                  <span className="text-stone-500 text-[10px] uppercase font-bold block">
                    Paying For
                  </span>
                  <span className="font-bold text-stone-900 text-sm">
                    {tierConfig.name} ({billingCycle})
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-stone-500 text-[10px] uppercase font-bold block">
                    Total Due
                  </span>
                  <span className="font-black text-stone-900 text-base font-sans text-[#008751]">
                    {formatNaira(amount)}
                  </span>
                </div>
              </div>

              {/* Nigerian Test Card Shortcut */}
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-stone-700">Payment Details</span>
                <button
                  type="button"
                  onClick={fillTestCard}
                  className="text-[10px] font-bold text-[#008751] hover:underline bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200"
                >
                  Autofill Nigerian Test Card
                </button>
              </div>

              {/* Card Inputs */}
              <div>
                <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-1">
                  Card Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="4084 0840 0840 0840"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full bg-white border border-stone-200 rounded-lg p-2.5 pl-9 text-stone-900 font-mono text-xs focus:outline-none focus:border-[#008751]"
                  />
                  <CreditCard className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-1">
                    Valid Thru (MM/YY)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="12/28"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    className="w-full bg-white border border-stone-200 rounded-lg p-2.5 text-stone-900 font-mono text-xs focus:outline-none focus:border-[#008751]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-1">
                    CVV
                  </label>
                  <input
                    type="password"
                    required
                    maxLength={3}
                    placeholder="408"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    className="w-full bg-white border border-stone-200 rounded-lg p-2.5 text-stone-900 font-mono text-xs focus:outline-none focus:border-[#008751]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-1">
                  Cardholder Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-stone-200 rounded-lg p-2.5 text-stone-900 text-xs focus:outline-none focus:border-[#008751]"
                />
              </div>

              {/* Pay Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3 bg-[#008751] hover:bg-[#00563A] text-white font-bold rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                {isProcessing ? (
                  <span>Authorizing via Paystack...</span>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5" />
                    <span>Pay {formatNaira(amount)}</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-stone-400">
                <ShieldCheck className="w-3.5 h-3.5 text-[#008751]" />
                <span>256-bit SSL Encrypted • PCI-DSS Level 1 Certified</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

