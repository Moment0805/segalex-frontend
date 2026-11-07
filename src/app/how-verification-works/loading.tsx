import React from "react";

export default function HowVerificationWorksLoading() {
  return (
    <div className="min-h-screen bg-[#FAFAF7] animate-pulse">
      {/* Header bar skeleton */}
      <div className="h-16 bg-white border-b border-[#E9E8E1] px-6 flex items-center justify-between">
        <div className="w-12 h-12 rounded-full bg-stone-200" />
        <div className="w-28 h-9 bg-stone-200 rounded-lg" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-10">
        <div className="text-center space-y-3">
          <div className="w-36 h-4 bg-stone-200 rounded mx-auto" />
          <div className="w-3/4 h-10 bg-stone-300 rounded mx-auto" />
          <div className="w-1/2 h-5 bg-stone-200 rounded mx-auto" />
        </div>

        {/* 4 Stages Vertical / Timeline Skeleton */}
        <div className="space-y-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-[#E9E8E1] p-6 flex gap-4">
              <div className="w-10 h-10 rounded-full bg-stone-200 flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="w-48 h-5 bg-stone-300 rounded" />
                <div className="w-full h-4 bg-stone-100 rounded" />
                <div className="w-2/3 h-4 bg-stone-100 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

