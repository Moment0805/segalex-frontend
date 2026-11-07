"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AgentSidebar } from "@/components/agent/AgentSidebar";
import { LeafletMap } from "@/components/marketplace/LeafletMap";
import { PaystackModal } from "@/components/agent/PaystackModal";
import { useMarketplace } from "@/context/MarketplaceContext";
import { showToast } from "@/components/ui/Toast";
import { LAGOS_AREAS } from "@/data/areas";
import { PropertyType, PropertyPurpose } from "@/types";
import {
  Upload,
  Video,
  MapPin,
  FileCheck2,
  AlertCircle,
  Plus,
  Trash2,
  Award,
  CheckCircle2,
} from "lucide-react";

export default function NewListingPage() {
  const router = useRouter();
  const { activeAgentId, agents, tiers, addListing } = useMarketplace();

  const agent = agents.find((a) => a.id === activeAgentId) || agents[0];
  const tierConfig = tiers.find((t) => t.tier === agent.tier) || tiers[0];

  // Form State
  const [title, setTitle] = useState("");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [purpose, setPurpose] = useState<PropertyPurpose>("sale");
  const [propertyType, setPropertyType] = useState<PropertyType>("house");
  const [price, setPrice] = useState("");
  const [area, setArea] = useState("Lekki Phase 1");
  const [address, setAddress] = useState("");
  const [bedrooms, setBedrooms] = useState("4");
  const [bathrooms, setBathrooms] = useState("4");
  const [sizeSqm, setSizeSqm] = useState("450");
  const [pinCoords, setPinCoords] = useState<{ lat: number; lng: number }>({
    lat: 6.4474,
    lng: 3.4735,
  });

  // Photos State
  const [photos, setPhotos] = useState<string[]>([
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
  ]);

  // Video Uploader State
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [isUploadingVideo, setIsUploadingVideo] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoCompressing, setVideoCompressing] = useState(false);

  // Document Verification Request State
  const [requestDocCheck, setRequestDocCheck] = useState(false);
  const [docType, setDocType] = useState("Governor's Consent");
  const [docRef, setDocRef] = useState("");

  // Upsell Modal Trigger State
  const [upsellModalOpen, setUpsellModalOpen] = useState(false);

  const maxPhotosAllowed = tierConfig.photosPerListing;
  const canUploadVideo = tierConfig.videosAllowed > 0;

  const handleAddSamplePhoto = () => {
    if (photos.length >= maxPhotosAllowed) {
      setUpsellModalOpen(true);
      return;
    }
    const samplePool = [
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
    ];
    const nextPhoto = samplePool[photos.length % samplePool.length];
    setPhotos([...photos, nextPhoto]);
  };

  const handleRemovePhoto = (idx: number) => {
    setPhotos(photos.filter((_, i) => i !== idx));
  };

  const handleSimulateVideoUpload = () => {
    if (!canUploadVideo) {
      setUpsellModalOpen(true);
      return;
    }

    setIsUploadingVideo(true);
    setVideoProgress(15);

    setTimeout(() => setVideoProgress(45), 500);
    setTimeout(() => setVideoProgress(85), 1000);
    setTimeout(() => {
      setVideoProgress(100);
      setVideoCompressing(true); // "Compressing for mobile..." state
    }, 1400);

    setTimeout(() => {
      setVideoCompressing(false);
      setIsUploadingVideo(false);
      setVideoUrl("https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4");
      showToast("Video Optimized & Attached", "Short mobile-ready walkthrough added.");
    }, 2400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price) return;

    const numericPrice = Number(price.replace(/[^0-9]/g, "")) || 50000000;

    const newId = addListing({
      title,
      tagline: tagline || "Newly Listed Verified Lagos Property",
      description: description || "Modern property in a prime Lagos location.",
      purpose,
      propertyType,
      price: numericPrice,
      priceDisplay:
        purpose === "rent"
          ? `${new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(numericPrice)} / year`
          : new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(numericPrice),
      area,
      address: address || `${area}, Lagos`,
      bedrooms: propertyType !== "land" && propertyType !== "commercial" ? Number(bedrooms) : undefined,
      bathrooms: propertyType !== "land" && propertyType !== "commercial" ? Number(bathrooms) : undefined,
      sizeSqm: Number(sizeSqm) || 450,
      coordinates: pinCoords,
      photos,
      videoUrl: videoUrl || undefined,
      agentId: activeAgentId,
      isDocumentsChecked: requestDocCheck,
      documentDetails: requestDocCheck
        ? {
            isDocumentChecked: true,
            documentType: docType as any,
            titleReferenceNumber: docRef || "PENDING/AUDIT/2024",
            surveyCoordinates: {
              lat: pinCoords.lat,
              lng: pinCoords.lng,
              beaconNumbers: ["BCN-AGENT-01", "BCN-AGENT-02"],
            },
            checkedOnDate: new Date().toISOString().split("T")[0],
            verifiedBy: "Segalex Land Audit Bureau",
          }
        : undefined,
    });

    showToast("Listing Published Successfully!", "Your property is now live on the public marketplace.");
    router.push(`/property/${newId}`);
  };

  return (
    <div className="min-h-screen flex bg-[#FAFAF7] text-stone-900">
      <AgentSidebar />

      <main className="flex-1 p-6 sm:p-10 overflow-y-auto space-y-8 max-w-5xl">
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-ink font-display uppercase tracking-tight">
            Publish New Lagos Property
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Enter verified property attributes. All listings adhere to the 60-day expiry protocol.
          </p>
        </div>

        {/* Tier Limits Notice Card */}
        <div className="bg-white rounded-xl p-4 border border-stone-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-stone-900">Active Tier:</span>
            <span className="px-2 py-0.5 rounded bg-[#FFC800] text-[#151314] font-black uppercase text-[10px] font-mono">
              {agent.tier}
            </span>
            <span className="text-stone-500">
              ({tierConfig.photosPerListing} photos max • {tierConfig.videosAllowed} videos • {tierConfig.monthlyDocChecks} doc checks/mo)
            </span>
          </div>
          {agent.tier !== "premium" && (
            <button
              type="button"
              onClick={() => setUpsellModalOpen(true)}
              className="text-xs font-bold text-[#008751] hover:underline flex items-center gap-1"
            >
              <Award className="w-3.5 h-3.5 text-[#FFC800]" />
              <span>Upgrade Tier for More Features</span>
            </button>
          )}
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-8 text-xs">
          {/* Section 1: Core Details */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
            <h3 className="font-black text-sm uppercase tracking-wide text-stone-900 pb-2 border-b border-stone-100">
              1. Basic Property Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-stone-600 uppercase mb-1">
                  Listing Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 5-Bedroom Fully Detached Duplex with Swimming Pool"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-[#FAFAF7] border border-stone-200 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:border-[#008751]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-stone-600 uppercase mb-1">
                  Tagline / Highlight
                </label>
                <input
                  type="text"
                  placeholder="e.g. Lagoon View, Smart Home Automation & 24hr Power"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full bg-[#FAFAF7] border border-stone-200 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:border-[#008751]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-stone-600 uppercase mb-1">
                  Transaction Purpose *
                </label>
                <select
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value as PropertyPurpose)}
                  className="w-full bg-[#FAFAF7] border border-stone-200 rounded-lg p-2.5 text-stone-900 font-bold focus:outline-none focus:border-[#008751]"
                >
                  <option value="sale">For Sale (₦)</option>
                  <option value="rent">For Rent (Rent shown per year strictly)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-stone-600 uppercase mb-1">
                  Property Classification *
                </label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value as PropertyType)}
                  className="w-full bg-[#FAFAF7] border border-stone-200 rounded-lg p-2.5 text-stone-900 font-bold focus:outline-none focus:border-[#008751]"
                >
                  <option value="house">Houses & Duplexes</option>
                  <option value="flat">Flats & Apartments</option>
                  <option value="land">Land & Plots (m²)</option>
                  <option value="commercial">Commercial & Offices</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-stone-600 uppercase mb-1">
                  Price in Naira (₦) * {purpose === "rent" && <span className="text-[#008751] font-bold">(per year)</span>}
                </label>
                <input
                  type="number"
                  required
                  placeholder={purpose === "rent" ? "e.g. 4500000" : "e.g. 185000000"}
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full bg-[#FAFAF7] border border-stone-200 rounded-lg p-2.5 text-stone-900 font-mono font-bold focus:outline-none focus:border-[#008751]"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-[10px] font-bold text-stone-600 uppercase mb-1">
                Property Description & Architectural Notes
              </label>
              <textarea
                rows={4}
                placeholder="Describe interior finishes, access roads, power supply, and nearby landmarks..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-[#FAFAF7] border border-stone-200 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:border-[#008751] resize-none"
              />
            </div>
          </div>

          {/* Section 2: Location & Interactive Pin Dropper */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
            <h3 className="font-black text-sm uppercase tracking-wide text-stone-900 pb-2 border-b border-stone-100">
              2. Location & Coordinate Pinning
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-stone-600 uppercase mb-1">
                  Lagos Operating District *
                </label>
                <select
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="w-full bg-[#FAFAF7] border border-stone-200 rounded-lg p-2.5 text-stone-900 font-semibold focus:outline-none focus:border-[#008751]"
                >
                  {LAGOS_AREAS.map((a) => (
                    <option key={a.id} value={a.name}>
                      {a.name} ({a.category})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-stone-600 uppercase mb-1">
                  Street & District Address (Rule 9: No coordinates or numbers required)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Admiralty Way, Lekki Phase 1, Lagos"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-[#FAFAF7] border border-stone-200 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:border-[#008751]"
                />
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase text-stone-500 block mb-1">
                Drop Physical Pin on Lagos Map (Click anywhere to relocate pin)
              </span>
              <div className="h-64 rounded-xl overflow-hidden border border-stone-200">
                <LeafletMap
                  listings={[]}
                  center={[pinCoords.lat, pinCoords.lng]}
                  zoom={13}
                  interactivePinDrop={true}
                  agentPin={[pinCoords.lat, pinCoords.lng]}
                  onMapClick={(lat, lng) => setPinCoords({ lat, lng })}
                />
              </div>
              <span className="text-[10px] font-mono text-stone-500 mt-1 block">
                Selected Pin: Lat {pinCoords.lat.toFixed(4)}, Lng {pinCoords.lng.toFixed(4)}
              </span>
            </div>
          </div>

          {/* Section 3: Photo & Video Uploader */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <h3 className="font-black text-sm uppercase tracking-wide text-stone-900">
                3. High-Resolution Photos & Video Walkthrough
              </h3>
              <span className="text-[11px] font-bold text-stone-500">
                Photos: {photos.length} of {maxPhotosAllowed} allowed on your tier
              </span>
            </div>

            {/* Photo Gallery Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {photos.map((p, idx) => (
                <div
                  key={idx}
                  className="relative aspect-[4/3] rounded-xl overflow-hidden bg-stone-100 border border-stone-200 group"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p} alt={`Upload ${idx + 1}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemovePhoto(idx)}
                    className="absolute top-1.5 right-1.5 p-1 bg-red-600 text-white rounded-full opacity-80 hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                  <span className="absolute bottom-1.5 left-1.5 bg-black/60 text-white text-[9px] px-1.5 py-0.2 rounded font-mono">
                    #{idx + 1}
                  </span>
                </div>
              ))}

              {/* Add Photo Button */}
              <button
                type="button"
                onClick={handleAddSamplePhoto}
                className="aspect-[4/3] rounded-xl border-2 border-dashed border-stone-300 hover:border-[#008751] hover:bg-emerald-50/20 text-stone-600 flex flex-col items-center justify-center gap-1 transition-all"
              >
                <Plus className="w-5 h-5 text-stone-400" />
                <span className="text-[11px] font-bold">Add Photo</span>
              </button>
            </div>

            {/* Video Walkthrough Uploader */}
            <div className="pt-4 border-t border-stone-100 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="font-bold text-xs text-stone-900 flex items-center gap-1.5">
                    <Video className="w-4 h-4 text-[#008751]" />
                    <span>Video Walkthrough</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-[#151314] text-[#FFC800] border border-[#FFC800]">
                      Max 2 min / 100 MB
                    </span>
                  </h4>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    Strict guidelines: ≤ 2 minutes, ≤ 100 MB. Automatically compressed to mobile-friendly 720p H.264 for fast WhatsApp & phone viewing.
                  </p>
                </div>

                {!canUploadVideo && (
                  <span className="text-[10px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-bold">
                    Requires Basic or Premium Tier
                  </span>
                )}
              </div>

              {videoUrl ? (
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#008751]" />
                    <span className="font-bold text-xs text-stone-900">
                      Mobile Optimized Video Tour Attached
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setVideoUrl("")}
                    className="text-stone-400 hover:text-red-600 font-bold text-xs"
                  >
                    Remove
                  </button>
                </div>
              ) : isUploadingVideo ? (
                <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-stone-800">
                      {videoCompressing
                        ? "Compressing for mobile streaming (720p H.264)..."
                        : `Uploading Video... ${videoProgress}%`}
                    </span>
                    <span className="text-[10px] text-stone-500">Segalex Transcoder</span>
                  </div>
                  <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#008751] transition-all duration-300"
                      style={{ width: `${videoProgress}%` }}
                    />
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleSimulateVideoUpload}
                  className="py-3 px-4 border-2 border-dashed border-stone-300 hover:border-[#008751] rounded-xl w-full text-center text-xs font-bold text-stone-700 hover:text-[#008751] flex items-center justify-center gap-2 transition-all"
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload Video Clip (MP4 / MOV)</span>
                </button>
              )}
            </div>
          </div>

          {/* Section 4: Request Documents Checked Badge */}
          <div className="bg-white rounded-2xl p-6 border-2 border-[#008751]/30 shadow-sm space-y-4">
            <div className="flex items-start justify-between gap-4 pb-2 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-[#008751]" />
                <div>
                  <h3 className="font-black text-sm uppercase tracking-wide text-stone-900">
                    4. Request "Documents Checked" Badge
                  </h3>
                  <p className="text-[11px] text-stone-500">
                    Remaining allowance: <strong>{tierConfig.monthlyDocChecks} checks</strong> this month
                  </p>
                </div>
              </div>
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={requestDocCheck}
                  onChange={(e) => setRequestDocCheck(e.target.checked)}
                  className="w-4 h-4 rounded text-[#008751] focus:ring-[#008751]"
                />
                <span className="font-bold text-xs text-stone-900">Request Audit</span>
              </label>
            </div>

            {requestDocCheck && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in duration-150">
                <div>
                  <label className="block text-[10px] font-bold text-stone-600 uppercase mb-1">
                    Title Document Instrument
                  </label>
                  <select
                    value={docType}
                    onChange={(e) => setDocType(e.target.value)}
                    className="w-full bg-[#FAFAF7] border border-stone-200 rounded-lg p-2.5 text-stone-900 font-semibold focus:outline-none focus:border-[#008751]"
                  >
                    <option value="Governor's Consent">Governor's Consent</option>
                    <option value="Certificate of Occupancy (C of O)">Certificate of Occupancy (C of O)</option>
                    <option value="Lagos State Gazette">Lagos State Gazette</option>
                    <option value="Deed of Assignment">Deed of Assignment</option>
                    <option value="Excision">Excision</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-stone-600 uppercase mb-1">
                    Title Folio / Reference Number
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. GC/LEK/2024/0912"
                    value={docRef}
                    onChange={(e) => setDocRef(e.target.value)}
                    className="w-full bg-[#FAFAF7] border border-stone-200 rounded-lg p-2.5 text-stone-900 font-mono focus:outline-none focus:border-[#008751]"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Submit Action */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => router.push("/agent/listings")}
              className="px-5 py-3 border border-stone-300 rounded-xl font-bold text-stone-700 hover:bg-stone-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3.5 bg-[#008751] hover:bg-[#00563A] text-white rounded-xl font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all"
            >
              <span>Publish Property to Hub</span>
            </button>
          </div>
        </form>
      </main>

      {/* Upsell Modal */}
      {upsellModalOpen && (
        <PaystackModal
          isOpen={true}
          onClose={() => setUpsellModalOpen(false)}
          targetTier="premium"
          billingCycle="monthly"
        />
      )}
    </div>
  );
}

