import React from "react";

export default function AgentsLoading() {
  return (
    <div className="min-h-screen bg-[#FAFAF7] animate-pulse">
      {/* Top Banner Skeleton */}
      <div className="bg-white border-b border-[#E9E8E1] py-8 px-6">
        <div className="max-w-7xl mx-auto space-y-2">
          <div className="w-32 h-4 bg-stone-200 rounded" />
          <div className="w-64 h-8 bg-stone-300 rounded" />
          <div className="w-96 max-w-full h-4 bg-stone-100 rounded" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-[#E9E8E1] p-5 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-stone-200" />
                <div className="space-y-2">
                  <div className="w-36 h-5 bg-stone-300 rounded" />
                  <div className="w-24 h-4 bg-stone-200 rounded" />
                </div>
              </div>
              <div className="hidden sm:flex gap-6">
                <div className="w-24 h-4 bg-stone-200 rounded" />
                <div className="w-24 h-4 bg-stone-200 rounded" />
              </div>
              <div className="w-24 h-9 bg-stone-200 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

