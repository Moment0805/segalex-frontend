import React from "react";
import Link from "next/link";
import { BrandLogo } from "./BrandLogo";
import { ShieldCheck, Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#151314] text-white pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
          {/* Brand Column: Logo alone on the left */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo size="lg" />
            <p className="text-stone-400 text-xs leading-relaxed max-w-sm">
              Segalex Property Hub is Lagos State’s verified property marketplace. We partner with
              LASRERA-registered brokers and ERCAAN practitioners to stamp out property scams, forged
              surveys, and fraudulent allocations across Nigeria.
            </p>
            <div className="flex flex-col gap-1 text-xs text-stone-300">
              <span className="font-bold text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#008751]" />
                Segalex Resources Global Limited
              </span>
              <span className="text-stone-400">
                Corporate Affairs Commission: <strong className="text-white font-mono">RC 7351342</strong>
              </span>
              <span className="text-stone-400">
                Managing Director: <strong className="text-white">Mr Segun</strong>
              </span>
            </div>
          </div>

          {/* Lagos Prime Neighborhoods */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#FFC800]">
              Prime Lagos Districts
            </h4>
            <ul className="space-y-2 text-xs text-stone-300">
              <li>
                <Link href="/properties?area=Ikoyi" className="hover:text-white transition-colors">
                  Ikoyi Luxury Residences
                </Link>
              </li>
              <li>
                <Link href="/properties?area=Banana+Island" className="hover:text-white transition-colors">
                  Banana Island Waterfront
                </Link>
              </li>
              <li>
                <Link href="/properties?area=Victoria+Island" className="hover:text-white transition-colors">
                  Victoria Island Commercial
                </Link>
              </li>
              <li>
                <Link href="/properties?area=Lekki+Phase+1" className="hover:text-white transition-colors">
                  Lekki Phase 1 Homes
                </Link>
              </li>
              <li>
                <Link href="/properties?area=Ibeju-Lekki" className="hover:text-white transition-colors">
                  Ibeju-Lekki Free Zone Plots
                </Link>
              </li>
              <li>
                <Link href="/properties?area=Epe" className="hover:text-white transition-colors">
                  Epe Expressway Acreages
                </Link>
              </li>
              <li>
                <Link href="/properties?area=Ikeja+GRA" className="hover:text-white transition-colors">
                  Ikeja GRA Mainland Estates
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Platform Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#FFC800]">
              Marketplace & Portal
            </h4>
            <ul className="space-y-2 text-xs text-stone-300">
              <li>
                <Link href="/properties" className="hover:text-white transition-colors">
                  All Verified Listings
                </Link>
              </li>
              <li>
                <Link href="/agents" className="hover:text-white transition-colors">
                  LASRERA Agent Directory
                </Link>
              </li>
              <li>
                <Link href="/how-verification-works" className="hover:text-white transition-colors">
                  How Verification Works
                </Link>
              </li>
              <li>
                <Link href="/packages" className="hover:text-white transition-colors">
                  Agent Subscription Plans
                </Link>
              </li>
              <li>
                <Link href="/agent/register" className="hover:text-white transition-colors">
                  Register as an Agent
                </Link>
              </li>
              <li>
                <Link href="/agent" className="hover:text-white transition-colors">
                  Agent Portal Login
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-white transition-colors">
                  Admin Inspection Console
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  Buyer & Tenant FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#FFC800]">
              Lagos Office & Support
            </h4>
            <div className="space-y-2.5 text-xs text-stone-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#008751] flex-shrink-0 mt-0.5" />
                <span className="text-stone-400 italic">[Office address to be confirmed]</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#008751] flex-shrink-0" />
                <span className="text-stone-400 italic">[Official phone line to be confirmed]</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#008751] flex-shrink-0" />
                <span className="text-stone-400 italic">[Official email to be confirmed]</span>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-800 space-y-1.5 text-xs text-stone-400">
              <Link href="/terms" className="block hover:text-white transition-colors">
                Terms & Conditions
              </Link>
              <Link href="/privacy" className="block hover:text-white transition-colors">
                Privacy Policy (to be supplied by lawyer)
              </Link>
            </div>
          </div>
        </div>

        {/* Disclaimer & Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>
            © {new Date().getFullYear()} Segalex Resources Global Limited (RC 7351342). All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-stone-400">
            <span>Designed and built by</span>
            <a
              href="mailto:contact@weareedge.studio"
              className="inline-flex items-center gap-1.5 text-white hover:text-[#FFC800] transition-colors"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/edge-studio-logo-white.svg"
                alt="The Edge Studio"
                className="h-3.5 w-auto inline-block"
              />
              <span className="font-semibold text-white">The Edge Studio</span>
            </a>
            <span>·</span>
            <span>Made by Oluwamoment</span>
          </div>
        </div>

        <div className="mt-4 p-3 rounded-lg bg-white/5 border border-white/5 text-[11px] text-stone-400 text-center leading-relaxed">
          <strong>Legal Notice:</strong> The Documents Checked badge verifies that cadastral survey beacons and official land titles have been cross-referenced with public registry archives. This is a records verification check and does not constitute an absolute guarantee of title or judicial guarantee.
        </div>
      </div>
    </footer>
  );
}
