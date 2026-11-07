"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { BrandLogo } from "@/components/common/BrandLogo";
import { Lock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

function GateContent() {
  const searchParams = useSearchParams();
  const requestedRedirect = searchParams.get("redirect") || "/";
  // Only allow relative paths on this site; don't redirect to another host.
  const redirectPath = requestedRedirect.startsWith("/") && !requestedRedirect.startsWith("//")
    ? requestedRedirect
    : "/";
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;

    setError("");
    setIsLoading(true);
    try {
      const response = await fetch("/api/prototype-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
        cache: "no-store",
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null);
        setError(result?.error || "Unable to verify access. Please try again.");
        setIsLoading(false);
        return;
      }

      // Do a full navigation after the Set-Cookie response completes. This
      // avoids Next.js client-router cache/prefetch returning a stale gate page
      // on the first attempt, and makes the browser send the new cookie anew.
      window.location.replace(redirectPath);
    } catch {
      setError("Could not connect to verify access. Check your connection and try again.");
      setIsLoading(false);
    }
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
            <label htmlFor="access-password" className="text-[10px] uppercase font-bold text-stone-300">
              Enter Access Key
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
              <input
                id="access-password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="w-full bg-white/10 border border-white/20 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#008751] disabled:opacity-60"
              />
            </div>
            {error && (
              <span role="alert" className="text-[10px] text-red-400">
                {error}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 px-4 bg-[#008751] hover:bg-[#00563A] disabled:opacity-75 disabled:cursor-not-allowed text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
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
