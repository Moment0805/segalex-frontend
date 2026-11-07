"use client";

import React, { useState } from "react";
import { X, ChevronLeft, ChevronRight, Play, Video, Maximize2 } from "lucide-react";

interface GalleryLightboxProps {
  photos: string[];
  videoUrl?: string;
  videoPoster?: string;
  title: string;
}

export function GalleryLightbox({
  photos,
  videoUrl,
  videoPoster,
  title,
}: GalleryLightboxProps) {
  const [activeTab, setActiveTab] = useState<"photos" | "video">("photos");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIdx(index);
    setActiveTab("photos");
    setLightboxOpen(true);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  return (
    <div>
      {/* Tab Switcher if video exists */}
      {videoUrl && (
        <div className="flex items-center gap-2 mb-3">
          <button
            onClick={() => setActiveTab("photos")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === "photos"
                ? "bg-[#151314] text-white shadow-sm"
                : "bg-stone-100 text-stone-600 hover:text-stone-900"
            }`}
          >
            Photos ({photos.length})
          </button>
          <button
            onClick={() => setActiveTab("video")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
              activeTab === "video"
                ? "bg-[#008751] text-white shadow-sm"
                : "bg-stone-100 text-stone-600 hover:text-stone-900"
            }`}
          >
            <Video className="w-3.5 h-3.5 text-[#FFC800]" />
            <span>Video Walkthrough</span>
          </button>
        </div>
      )}

      {/* Video View */}
      {activeTab === "video" && videoUrl ? (
        <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-black shadow-card border border-stone-200">
          <video
            src={videoUrl}
            poster={videoPoster || photos[0]}
            controls
            autoPlay
            className="w-full h-full object-contain"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      ) : (
        /* Photo Mosaic Grid */
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2.5 rounded-2xl overflow-hidden aspect-[16/10] md:aspect-[21/9] max-h-[520px]">
          {/* Main Hero Photo (Takes 2 columns and full height) */}
          <div
            onClick={() => openLightbox(0)}
            className="md:col-span-2 relative h-full bg-stone-100 cursor-pointer overflow-hidden group"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photos[0]}
              alt={`${title} - Main View`}
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
            <div className="absolute bottom-3 left-3 bg-[#151314]/80 backdrop-blur-sm text-white px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5 text-[#FFC800]" />
              <span>Click to expand gallery</span>
            </div>
          </div>

          {/* Secondary Photos Grid */}
          <div className="hidden md:grid col-span-2 grid-cols-2 gap-2.5 h-full">
            {photos.slice(1, 5).map((photo, i) => {
              const isLast = i === 3;
              const remaining = photos.length - 5;

              return (
                <div
                  key={i}
                  onClick={() => openLightbox(i + 1)}
                  className="relative h-full bg-stone-100 cursor-pointer overflow-hidden group"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo}
                    alt={`${title} - Photo ${i + 2}`}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors" />
                  {isLast && remaining > 0 && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-bold text-sm">
                      +{remaining} more photos
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {lightboxOpen && (
        <div
          onClick={() => setLightboxOpen(false)}
          className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-between p-4 sm:p-8 animate-in fade-in duration-200"
        >
          {/* Top Bar */}
          <div className="w-full max-w-5xl flex items-center justify-between text-white pb-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-white truncate max-w-md">{title}</span>
              <span className="text-xs text-stone-400">
                ({currentIdx + 1} of {photos.length})
              </span>
            </div>
            <button
              onClick={() => setLightboxOpen(false)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Photo Viewport */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex-1 flex items-center justify-center max-w-5xl w-full my-4"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photos[currentIdx]}
              alt={`${title} - Slide ${currentIdx + 1}`}
              className="max-h-[75vh] max-w-full object-contain rounded-lg select-none"
            />

            {/* Navigation Arrows */}
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black text-white transition-all"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black text-white transition-all"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Thumbnails */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-2 max-w-4xl overflow-x-auto py-2"
          >
            {photos.map((p, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIdx(idx)}
                className={`relative w-16 h-12 rounded overflow-hidden flex-shrink-0 border-2 transition-all ${
                  currentIdx === idx ? "border-[#FFC800] scale-105" : "border-transparent opacity-60"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

