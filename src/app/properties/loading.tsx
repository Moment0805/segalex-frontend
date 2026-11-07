import React from "react";

export default function PropertiesLoading() {
  return (
    <div className="min-h-screen bg-[#FAFAF7] animate-pulse">
      {/* Top Filter Bar Skeleton */}
      <div className="bg-white border-b border-[#E9E8E1] py-4 px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="w-48 h-8 bg-stone-200 rounded-lg" />
          <div className="flex gap-2">
            <div className="w-24 h-9 bg-stone-200 rounded-lg" />
            <div className="w-24 h-9 bg-stone-200 rounded-lg" />
            <div className="w-32 h-9 bg-stone-200 rounded-lg" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="w-40 h-6 bg-stone-200 rounded" />
          <div className="w-28 h-8 bg-stone-200 rounded" />
        </div>

        {/* Property Cards Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 6, 7, 8].map((i) => (
            <div key={i} className="bg-white rounded-xl border border-[#E9E8E1] overflow-hidden p-4 space-y-3">
              <div className="aspect-[4/3] bg-stone-200 rounded-lg" />
              <div className="w-1/2 h-6 bg-stone-300 rounded" />
              <div className="w-3/4 h-5 bg-stone-200 rounded" />
              <div className="w-1/3 h-4 bg-stone-100 rounded" />
              <div className="pt-3 border-t border-stone-100 flex justify-between">
                <div className="w-1/4 h-4 bg-stone-100 rounded" />
                <div className="w-1/4 h-4 bg-stone-100 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

