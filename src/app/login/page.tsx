"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMarketplace } from "@/context/MarketplaceContext";
import { BrandLogo } from "@/components/common/BrandLogo";
import { showToast } from "@/components/ui/Toast";
import { Lock, Mail, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { setUserRole } = useMarketplace();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setTimeout(() => {
      setUserRole("buyer");
      setIsLoading(false);
      showToast("Welcome Back!", `Signed in as ${email}. Your saved properties are synchronized.`);
      router.push("/account");
    }, 600);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setUserRole("buyer");
      setIsLoading(false);
      showToast("Google Account Linked", "Signed in with Google. Welcome to Segalex Property Hub.");
      router.push("/account");
    }, 600);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-12 bg-[#FAFAF7] text-stone-900">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <BrandLogo size="lg" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black font-display text-ink uppercase tracking-tight">
              Sign In to Your Account
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              Access saved listings, cadastral document alerts, and direct WhatsApp agent records.
            </p>
          </div>
        </div>

        {/* Auth Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-card space-y-5">
          {/* Google OAuth Mock */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full py-2.5 px-4 bg-white hover:bg-stone-50 border border-stone-300 rounded-xl text-xs font-bold text-stone-700 flex items-center justify-center gap-3 transition-colors shadow-sm disabled:opacity-50"
          >
            <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          <div className="relative flex items-center justify-center">
            <div className="w-full border-t border-stone-200" />
            <span className="absolute bg-white px-3 text-[10px] uppercase font-bold text-stone-400">
              or continue with email
            </span>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold uppercase text-stone-600 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#FAFAF7] border border-stone-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-[#008751]"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[10px] font-bold uppercase text-stone-600">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => showToast("Password Reset", "Demo reset instruction sent to your email.")}
                  className="text-[10px] font-bold text-[#008751] hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#FAFAF7] border border-stone-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-[#008751]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 bg-[#008751] hover:bg-[#00563A] text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <span>Verifying Credentials...</span>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Pre-fill */}
          <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-stone-600 space-y-1 text-center">
            <span className="text-[10px] uppercase font-bold text-stone-500 block">
              Sales Demo Helper
            </span>
            <button
              type="button"
              onClick={() => {
                setEmail("investor.diaspora@gmail.com");
                setPassword("Lagos2024*Verified");
              }}
              className="text-[11px] font-bold text-[#008751] hover:underline"
            >
              Autofill Sample Investor Account
            </button>
          </div>
        </div>

        {/* Footer Links */}
        <div className="text-center space-y-2 text-xs text-stone-500">
          <p>
            Don&apos;t have an account yet?{" "}
            <Link href="/register" className="font-bold text-[#008751] hover:underline">
              Create a free buyer account
            </Link>
          </p>
          <p>
            Are you a licensed Lagos broker?{" "}
            <Link href="/agent/register" className="font-bold text-stone-800 hover:underline">
              Register as an Agent
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

