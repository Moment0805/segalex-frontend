"use client";

import React from "react";
import dynamic from "next/dynamic";
import { PropertyListing } from "@/types";

const DynamicMap = dynamic(() => import("./LeafletMapInner"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[350px] bg-stone-100 flex flex-col items-center justify-center p-6 text-stone-500 gap-2 border border-stone-200 rounded-brand">
      <div className="w-8 h-8 rounded-full border-2 border-[#008751] border-t-transparent animate-spin" />
      <span className="text-xs font-bold uppercase tracking-wider text-stone-600">
        Loading Lagos Cadastral Map...
      </span>
      <span className="text-[11px] text-stone-400">OpenStreetMap & LASG coordinate overlay</span>
    </div>
  ),
});

interface LeafletMapProps {
  listings: PropertyListing[];
  selectedListingId?: string | null;
  hoveredListingId?: string | null;
  onSelectListing?: (id: string) => void;
  center?: [number, number];
  zoom?: number;
  highlightPolygon?: [number, number][];
  agentPin?: [number, number];
  onMapClick?: (lat: number, lng: number) => void;
  interactivePinDrop?: boolean;
  className?: string;
}

export function LeafletMap({ className = "", ...props }: LeafletMapProps) {
  return (
    <div className={`w-full h-full overflow-hidden rounded-brand border border-stone-200 relative ${className}`}>
      <DynamicMap {...props} />
    </div>
  );
}

