import React from "react";

export default function PackagesLoading() {
  return (
    <div className="min-h-screen bg-[#FAFAF7] animate-pulse">
      {/* Header bar skeleton */}
      <div className="h-16 bg-white border-b border-[#E9E8E1] px-6 flex items-center justify-between">
        <div className="w-12 h-12 rounded-full bg-stone-200" />
        <div className="w-28 h-9 bg-stone-200 rounded-lg" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <div className="w-36 h-4 bg-stone-200 rounded mx-auto" />
          <div className="w-3/4 h-10 bg-stone-300 rounded mx-auto" />
          <div className="w-1/2 h-5 bg-stone-200 rounded mx-auto" />
        </div>

        {/* 3 Tier Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-[#E9E8E1] p-6 space-y-6"
            >
              <div className="space-y-2">
                <div className="w-24 h-5 bg-stone-200 rounded" />
                <div className="w-36 h-8 bg-stone-300 rounded" />
                <div className="w-full h-4 bg-stone-100 rounded" />
              </div>

              <div className="space-y-3 pt-4 border-t border-stone-100">
                {[1, 2, 3, 4, 5].map((j) => (
                  <div key={j} className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-stone-200 flex-shrink-0" />
                    <div className="w-full h-4 bg-stone-100 rounded" />
                  </div>
                ))}
              </div>

              <div className="w-full h-11 bg-stone-200 rounded-xl" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
