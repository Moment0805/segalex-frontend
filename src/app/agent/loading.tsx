import React from "react";

export default function AgentLoading() {
  return (
    <div className="min-h-screen bg-[#FAFAF7] animate-pulse">
      <div className="h-16 bg-white border-b border-[#E9E8E1] px-6 flex items-center justify-between">
        <div className="w-32 h-6 bg-stone-200 rounded" />
        <div className="w-24 h-8 bg-stone-200 rounded-lg" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-xl border border-[#E9E8E1] p-5 space-y-2">
              <div className="w-20 h-4 bg-stone-200 rounded" />
              <div className="w-16 h-7 bg-stone-300 rounded" />
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl border border-[#E9E8E1] h-64" />
      </div>
    </div>
  );
}

