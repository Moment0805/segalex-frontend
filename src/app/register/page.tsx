"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMarketplace } from "@/context/MarketplaceContext";
import { BrandLogo } from "@/components/common/BrandLogo";
import { showToast } from "@/components/ui/Toast";
import { Lock, Mail, User, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { setUserRole } = useMarketplace();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !fullName) return;

    setIsLoading(true);
    setTimeout(() => {
      setUserRole("buyer");
      setIsLoading(false);
      showToast(
        "Account Created Successfully!",
        `Welcome ${fullName}. You can now save verified listings and receive WhatsApp alert alerts.`
      );
      router.push("/account");
    }, 600);
  };

  const handleGoogleSignup = () => {
    setIsLoading(true);
    setTimeout(() => {
      setUserRole("buyer");
      setIsLoading(false);
      showToast("Signed Up via Google", "Your account is verified and ready.");
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
              Create Your Buyer Account
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              Join thousands of smart investors finding scam-free property in Lagos.
            </p>
          </div>
        </div>

        {/* Auth Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-card space-y-5">
          {/* Google OAuth Mock */}
          <button
            type="button"
            onClick={handleGoogleSignup}
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
            <span>Sign up with Google</span>
          </button>

          <div className="relative flex items-center justify-center">
            <div className="w-full border-t border-stone-200" />
            <span className="absolute bg-white px-3 text-[10px] uppercase font-bold text-stone-400">
              or register with email
            </span>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold uppercase text-stone-600 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Kelechi Amadi"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-[#FAFAF7] border border-stone-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-[#008751]"
                />
              </div>
            </div>

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
              <label className="block text-[10px] font-bold uppercase text-stone-600 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
                <input
                  type="password"
                  required
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#FAFAF7] border border-stone-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-[#008751]"
                />
              </div>
            </div>

            <label className="flex items-start gap-2 cursor-pointer text-[11px] text-stone-600 leading-tight">
              <input
                type="checkbox"
                required
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 rounded text-[#008751] focus:ring-[#008751]"
              />
              <span>
                I agree to the{" "}
                <Link href="/terms" className="text-[#008751] underline font-bold">
                  Terms of Service
                </Link>{" "}
                and acknowledge the records verification disclosure.
              </span>
            </label>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 bg-[#008751] hover:bg-[#00563A] text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <span>Setting Up Account...</span>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer Links */}
        <div className="text-center space-y-2 text-xs text-stone-500">
          <p>
            Already have an account?{" "}
            <Link href="/login" className="font-bold text-[#008751] hover:underline">
              Sign in here
            </Link>
          </p>
          <p>
            Are you a real estate firm or broker?{" "}
            <Link href="/agent/register" className="font-bold text-stone-800 hover:underline">
              Apply for LASRERA Agent Verification
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

