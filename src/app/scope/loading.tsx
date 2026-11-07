import React from "react";

export default function ScopeLoading() {
  return (
    <div className="min-h-screen bg-[#FAFAF7] animate-pulse">
      {/* Header bar skeleton */}
      <div className="h-16 bg-white border-b border-[#E9E8E1] px-6 flex items-center justify-between">
        <div className="w-12 h-12 rounded-full bg-stone-200" />
        <div className="w-28 h-9 bg-stone-200 rounded-lg" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-8">
        {/* Banner Skeleton */}
        <div className="w-full h-44 bg-stone-800 rounded-2xl p-8 space-y-3">
          <div className="w-48 h-4 bg-stone-700 rounded" />
          <div className="w-2/3 h-10 bg-stone-600 rounded" />
          <div className="w-1/2 h-4 bg-stone-700 rounded" />
        </div>

        {/* Matrix Table Skeleton */}
        <div className="bg-white rounded-2xl border border-[#E9E8E1] p-6 space-y-4">
          <div className="flex justify-between items-center mb-6">
            <div className="w-56 h-6 bg-stone-200 rounded" />
            <div className="w-32 h-6 bg-stone-200 rounded" />
          </div>
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div key={i} className="h-14 border-b border-stone-100 flex items-center justify-between gap-4">
              <div className="w-28 h-4 bg-stone-200 rounded" />
              <div className="w-1/3 h-4 bg-stone-100 rounded" />
              <div className="w-1/4 h-4 bg-stone-100 rounded" />
              <div className="w-24 h-8 bg-stone-200 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

