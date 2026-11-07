"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BrandLogo } from "@/components/common/BrandLogo";
import { Lock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

function GateContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/";
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      // Set cookie valid for 7 days
      document.cookie = `proto_pass=${encodeURIComponent(password)}; path=/; max-age=604800; SameSite=Lax`;
      router.push(redirectPath);
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#151314] text-white">
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-sm space-y-6 text-center"
      >
        <div className="flex justify-center">
          <BrandLogo size="lg" />
        </div>

        <div className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#FFC800] bg-white/10 px-2.5 py-1 rounded-full border border-white/10">
            Private Client Preview
          </span>
          <h1 className="text-2xl font-black font-display uppercase tracking-tight">
            Confidential Sales Prototype
          </h1>
          <p className="text-xs text-stone-400">
            Prepared exclusively for Mr Segun, MD of Segalex Resources Global Limited.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          <div className="space-y-1 text-left">
            <label className="text-[10px] uppercase font-bold text-stone-300">
              Enter Access Key
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#008751]"
              />
            </div>
            {error && (
              <span className="text-[10px] text-red-400">
                Invalid key. Please check with The Edge Studio.
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 px-4 bg-[#008751] hover:bg-[#00563A] disabled:opacity-75 disabled:cursor-not-allowed text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98]"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Verifying Access...</span>
              </>
            ) : (
              <>
                <span>Enter Prototype</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <p className="text-[10px] text-stone-500">
          The Edge Studio • RC 7351342 • All rights reserved
        </p>
      </motion.div>
    </div>
  );
}

export default function GatePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#151314]" />}>
      <GateContent />
    </Suspense>
  );
}
