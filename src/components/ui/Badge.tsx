import React from "react";
import { ShieldCheck, Award, FileCheck2, AlertCircle } from "lucide-react";

interface VerificationBadgeProps {
  type: "verified-agent" | "ercaan" | "documents-checked" | "featured" | "sponsored" | "pending";
  date?: string;
  className?: string;
  size?: "sm" | "md";
}

export function VerificationBadge({ type, date, className = "", size = "md" }: VerificationBadgeProps) {
  const sizeClasses = size === "sm" ? "text-[10px] px-2 py-0.5" : "text-[11px] px-2.5 py-1";

  switch (type) {
    case "verified-agent":
      return (
        <span
          className={`inline-flex items-center gap-1.5 font-bold uppercase tracking-wider rounded-md bg-[#008751]/10 text-[#008751] border border-[#008751]/30 shadow-sm ${sizeClasses} ${className}`}
        >
          <ShieldCheck className="w-3.5 h-3.5 text-[#008751]" />
          <span>Verified Agent • LASRERA Reg</span>
        </span>
      );

    case "ercaan":
      return (
        <span
          className={`inline-flex items-center gap-1.5 font-bold uppercase tracking-wider rounded-md bg-emerald-50 text-emerald-900 border border-emerald-300 shadow-sm ${sizeClasses} ${className}`}
        >
          <Award className="w-3.5 h-3.5 text-emerald-700" />
          <span>ERCAAN Member</span>
        </span>
      );

    case "documents-checked":
      return (
        <span
          className={`inline-flex items-center gap-1.5 font-bold uppercase tracking-wider rounded-md bg-[#151314] text-white border border-[#FFC800] shadow-sm ${sizeClasses} ${className}`}
        >
          <FileCheck2 className="w-3.5 h-3.5 text-[#FFC800]" />
          <span>Documents Checked {date ? `• ${date}` : ""}</span>
        </span>
      );

    case "featured":
      return (
        <span
          className={`inline-flex items-center gap-1 font-black uppercase tracking-wider rounded-md bg-[#FFC800] text-[#151314] shadow-sm ${sizeClasses} ${className}`}
        >
          <Award className="w-3 h-3 text-[#151314]" />
          <span>Featured</span>
        </span>
      );

    case "sponsored":
      return (
        <span
          className={`inline-flex items-center gap-1 font-black uppercase tracking-wider rounded-md bg-[#FFC800] text-[#151314] shadow-sm ${sizeClasses} ${className}`}
        >
          <span>Sponsored</span>
        </span>
      );

    case "pending":
      return (
        <span
          className={`inline-flex items-center gap-1.5 font-bold uppercase tracking-wider rounded-md bg-amber-50 text-amber-900 border border-amber-300 shadow-sm ${sizeClasses} ${className}`}
        >
          <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
          <span>Pending Verification</span>
        </span>
      );

    default:
      return null;
  }
}

