import React from "react";

export default function PropertyDetailLoading() {
  return (
    <div className="min-h-screen bg-[#FAFAF7] animate-pulse">
      {/* Top Breadcrumb & Actions Bar */}
      <div className="bg-white border-b border-[#E9E8E1] py-3 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="w-64 h-4 bg-stone-200 rounded" />
          <div className="flex gap-2">
            <div className="w-20 h-8 bg-stone-200 rounded-lg" />
            <div className="w-20 h-8 bg-stone-200 rounded-lg" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Title & Price Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div className="space-y-2">
            <div className="w-24 h-4 bg-stone-200 rounded" />
            <div className="w-96 max-w-full h-8 bg-stone-300 rounded" />
            <div className="w-48 h-4 bg-stone-200 rounded" />
          </div>
          <div className="w-48 h-10 bg-stone-300 rounded" />
        </div>

        {/* Gallery Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 h-[420px] mb-8">
          <div className="md:col-span-2 bg-stone-200 rounded-xl h-full" />
          <div className="hidden md:grid col-span-2 grid-cols-2 gap-3 h-full">
            <div className="bg-stone-200 rounded-xl" />
            <div className="bg-stone-200 rounded-xl" />
            <div className="bg-stone-200 rounded-xl" />
            <div className="bg-stone-200 rounded-xl" />
          </div>
        </div>

        {/* Details & Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-xl border border-[#E9E8E1] p-6 space-y-4">
              <div className="w-32 h-5 bg-stone-300 rounded" />
              <div className="w-full h-20 bg-stone-100 rounded" />
            </div>
            <div className="bg-white rounded-xl border border-[#E9E8E1] p-6 space-y-4">
              <div className="w-48 h-5 bg-stone-300 rounded" />
              <div className="w-full h-32 bg-stone-100 rounded" />
            </div>
          </div>
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-xl border border-[#E9E8E1] p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-stone-200 mx-auto" />
              <div className="w-32 h-5 bg-stone-300 rounded mx-auto" />
              <div className="w-full h-10 bg-stone-200 rounded-lg" />
              <div className="w-full h-10 bg-stone-200 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

