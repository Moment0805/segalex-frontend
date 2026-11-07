import React from "react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#FAFAF7] animate-pulse">
      {/* Header bar skeleton */}
      <div className="h-16 bg-white border-b border-[#E9E8E1] px-6 flex items-center justify-between">
        <div className="w-12 h-12 rounded-full bg-stone-200" />
        <div className="hidden md:flex gap-6">
          <div className="w-20 h-4 bg-stone-200 rounded" />
          <div className="w-16 h-4 bg-stone-200 rounded" />
          <div className="w-16 h-4 bg-stone-200 rounded" />
          <div className="w-24 h-4 bg-stone-200 rounded" />
        </div>
        <div className="w-28 h-9 bg-stone-200 rounded-lg" />
      </div>

      {/* Hero skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="w-32 h-4 bg-stone-200 rounded" />
            <div className="w-3/4 h-12 bg-stone-300 rounded" />
            <div className="w-1/2 h-6 bg-stone-200 rounded" />
            <div className="w-full h-32 bg-white rounded-xl border border-[#E9E8E1] p-4" />
          </div>
          <div className="lg:col-span-5">
            <div className="aspect-[4/3] rounded-2xl bg-stone-200" />
          </div>
        </div>

        {/* Cards skeleton */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-xl border border-[#E9E8E1] overflow-hidden p-4 space-y-3">
              <div className="aspect-[4/3] bg-stone-200 rounded-lg" />
              <div className="w-2/3 h-5 bg-stone-200 rounded" />
              <div className="w-full h-4 bg-stone-100 rounded" />
              <div className="w-1/2 h-4 bg-stone-100 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

