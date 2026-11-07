import React from "react";
import Link from "next/link";

interface BrandLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  alt?: string;
  variant?: "white" | "dark" | "default";
}

export function BrandLogo({
  className = "",
  size = "md",
  alt = "Segalex Resources Global Limited - Verified Property Hub",
}: BrandLogoProps) {
  const sizeMap = {
    sm: "w-9 h-9",        // 36px
    md: "w-12 h-12",      // 48px (standard header circle)
    lg: "w-14 h-14",      // 56px
    xl: "w-16 h-16",      // 64px
  };

  return (
    <Link
      href="/"
      className={`inline-flex items-center justify-center flex-shrink-0 group ${className}`}
      title="Segalex Property Hub — Home"
      aria-label="Segalex Property Hub"
    >
      <div
        className={`relative ${sizeMap[size]} rounded-full overflow-hidden bg-black border border-stone-200/40 flex items-center justify-center transition-transform group-hover:scale-[1.02]`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/logo.png"
          alt={alt}
          width={160}
          height={160}
          className="w-full h-full object-contain select-none"
        />
      </div>
    </Link>
  );
}
