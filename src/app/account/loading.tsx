import React from "react";

export default function AccountLoading() {
  return (
    <div className="min-h-screen bg-[#FAFAF7] animate-pulse">
      {/* Header bar skeleton */}
      <div className="h-16 bg-white border-b border-[#E9E8E1] px-6 flex items-center justify-between">
        <div className="w-12 h-12 rounded-full bg-stone-200" />
        <div className="w-28 h-9 bg-stone-200 rounded-lg" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        {/* User Card Skeleton */}
        <div className="bg-white rounded-2xl border border-[#E9E8E1] p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-stone-200" />
            <div className="space-y-2">
              <div className="w-40 h-6 bg-stone-300 rounded" />
              <div className="w-56 h-4 bg-stone-100 rounded" />
            </div>
          </div>
          <div className="w-28 h-9 bg-stone-200 rounded-lg" />
        </div>

        {/* Saved Listings Grid Skeleton */}
        <div className="space-y-4">
          <div className="w-48 h-6 bg-stone-200 rounded" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl border border-[#E9E8E1] overflow-hidden p-4 space-y-3">
                <div className="aspect-[4/3] bg-stone-200 rounded-lg" />
                <div className="w-1/2 h-5 bg-stone-300 rounded" />
                <div className="w-3/4 h-4 bg-stone-100 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
