"use client";

import React, { useState } from "react";
import { PropertyListing, TitleDocumentCheck } from "@/types";
import { useMarketplace } from "@/context/MarketplaceContext";
import { LeafletMap } from "@/components/marketplace/LeafletMap";
import { showToast } from "@/components/ui/Toast";
import {
  FileCheck2,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  MapPin,
  ZoomIn,
  ZoomOut,
  FileText,
  AlertTriangle,
} from "lucide-react";

interface DocSplitViewerProps {
  listing: PropertyListing;
  onClose: () => void;
}

export function DocSplitViewer({ listing, onClose }: DocSplitViewerProps) {
  const { grantDocumentCheckedBadge, refuseDocumentCheckedBadge, simulatePinShift } = useMarketplace();
  const [docType, setDocType] = useState<TitleDocumentCheck["documentType"]>(
    (listing.documentDetails?.documentType as TitleDocumentCheck["documentType"]) ||
      "Certificate of Occupancy (C of O)"
  );
  const [titleRef, setTitleRef] = useState(
    listing.documentDetails?.titleReferenceNumber || `LASG/REV/${listing.id.toUpperCase()}`
  );
  const [refusalNote, setRefusalNote] = useState("");
  const [isRefusing, setIsRefusing] = useState(false);

  // Verification Checklist State
  const [checkedCadastral, setCheckedCadastral] = useState(true);
  const [checkedBeacons, setCheckedBeacons] = useState(true);
  const [checkedNoEncumbrance, setCheckedNoEncumbrance] = useState(true);
  const [checkedMinistryRegistry, setCheckedMinistryRegistry] = useState(true);

  // Polygon around coordinates
  const lat = listing.coordinates.lat;
  const lng = listing.coordinates.lng;
  const delta = 0.002;
  const boundaryPolygon: [number, number][] =
    listing.documentDetails?.surveyCoordinates?.polygonBounds || [
      [lat + delta, lng - delta],
      [lat + delta, lng + delta],
      [lat - delta, lng + delta],
      [lat - delta, lng - delta],
    ];

  const allChecksPass =
    checkedCadastral && checkedBeacons && checkedNoEncumbrance && checkedMinistryRegistry;

  const handleGrant = () => {
    const docDetails: TitleDocumentCheck = {
      isDocumentChecked: true,
      documentType: docType,
      titleReferenceNumber: titleRef,
      surveyCoordinates: {
        lat: listing.coordinates.lat,
        lng: listing.coordinates.lng,
        beaconNumbers: ["BCN-LG-001", "BCN-LG-002", "BCN-LG-003", "BCN-LG-004"],
        polygonBounds: boundaryPolygon,
      },
      checkedOnDate: new Date().toISOString().split("T")[0],
      verifiedBy: "Segalex Land Audit Bureau",
      notes: "Audited in Admin Console workstation. Cadastral coordinates align with survey beacon boundary.",
    };

    grantDocumentCheckedBadge(
      listing.id,
      docDetails,
      `Granted Documents Checked badge for ${docType} (Ref: ${titleRef})`
    );

    showToast("Badge Granted!", `Documents Checked badge attached to ${listing.title.slice(0, 30)}...`);
    onClose();
  };

  const handleRefuse = () => {
    refuseDocumentCheckedBadge(
      listing.id,
      refusalNote || "Survey coordinates do not match charted boundary records."
    );
    showToast("Application Refused", "Listing remains under standard verification status.", "info");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-6xl h-[90vh] bg-white rounded-2xl shadow-2xl border border-stone-200 flex flex-col overflow-hidden"
      >
        {/* Workstation Top Bar */}
        <div className="p-4 bg-[#151314] text-white flex items-center justify-between border-b border-white/10 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#008751]/20 rounded-lg text-[#008751]">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                Cadastral Split-Inspection Workstation
                <span className="text-[10px] bg-[#FFC800] text-[#151314] px-1.5 py-0.2 rounded font-black uppercase">
                  Auditor Console
                </span>
              </h3>
              <p className="text-xs text-stone-400 truncate max-w-xl">
                Evaluating: <strong>{listing.title}</strong> ({listing.area})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close split audit"
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Main Split Screen Area */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-stone-200 overflow-hidden">
          {/* Left Pane: Uploaded Title Document Preview */}
          <div className="p-5 flex flex-col justify-between overflow-y-auto bg-[#FAFAF7]">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-xs uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-[#008751]" />
                  Uploaded Document Dossier
                </span>
                <span className="text-[10px] bg-stone-200 px-2 py-0.5 rounded text-stone-700 font-mono">
                  Deed_Registration_Audit.pdf
                </span>
              </div>

              {/* Simulated High-Res Title Deed Visual */}
              <div className="relative border-2 border-stone-300 rounded-xl bg-white p-6 shadow-sm min-h-[300px] flex flex-col justify-between">
                <div className="border-b-2 border-stone-800 pb-3 text-center space-y-1">
                  <div className="text-[10px] font-black uppercase tracking-widest text-stone-500">
                    Federal Republic of Nigeria • Lagos State Lands Bureau
                  </div>
                  <div className="font-black text-sm uppercase tracking-tight text-stone-900 font-display">
                    {docType}
                  </div>
                  <div className="text-[10px] font-mono text-stone-600 font-bold">
                    Official Reference: {titleRef}
                  </div>
                </div>

                <div className="my-4 space-y-2 text-[11px] text-stone-700 leading-relaxed font-serif">
                  <p>
                    <strong>MEMORANDUM OF ASSIGNMENT:</strong> This title deed certifies that the parcel of land situated at{" "}
                    <strong>{listing.address}</strong>, delineated on Survey Plan No:{" "}
                    <strong>LA/SURV/{listing.id.toUpperCase()}/2024</strong> has been entered into the Register of Deeds at Alausa.
                  </p>
                  <p>
                    <strong>BEACON COORDINATES:</strong> BCN-LG-001 (Lat {lat.toFixed(4)}° N, Lng {lng.toFixed(4)}° E) to BCN-LG-004.
                  </p>
                  <p className="text-stone-500 italic text-[10px]">
                    Official Seal of the Lagos State Registrar of Titles applied.
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-stone-200 text-[10px] text-stone-500 font-mono">
                  <span>Auditor Hash: #8942-LAG-OK</span>
                  <span>Registered Stamp Cleared</span>
                </div>
              </div>

              {/* Edit Instrument Parameters */}
              <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-[10px] font-bold text-stone-600 uppercase mb-1">
                    Title Instrument
                  </label>
                  <select
                    value={docType}
                    onChange={(e) =>
                      setDocType(e.target.value as TitleDocumentCheck["documentType"])
                    }
                    className="w-full bg-white border border-stone-200 rounded-lg p-2 text-stone-900 font-semibold focus:outline-none"
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
                    Registry File Reference
                  </label>
                  <input
                    type="text"
                    value={titleRef}
                    onChange={(e) => setTitleRef(e.target.value)}
                    className="w-full bg-white border border-stone-200 rounded-lg p-2 text-stone-900 font-mono focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Checklist */}
            <div className="mt-4 p-4 bg-white rounded-xl border border-stone-200 space-y-2">
              <span className="font-bold text-xs uppercase tracking-wider text-stone-800 block mb-2">
                Cadastral Auditor Checklist
              </span>
              <label className="flex items-center gap-2 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={checkedCadastral}
                  onChange={(e) => setCheckedCadastral(e.target.checked)}
                  className="rounded text-[#008751] focus:ring-[#008751]"
                />
                <span>Survey coordinates match registered beacon boundaries</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={checkedBeacons}
                  onChange={(e) => setCheckedBeacons(e.target.checked)}
                  className="rounded text-[#008751] focus:ring-[#008751]"
                />
                <span>Beacon identification markers validated in field survey</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={checkedNoEncumbrance}
                  onChange={(e) => setCheckedNoEncumbrance(e.target.checked)}
                  className="rounded text-[#008751] focus:ring-[#008751]"
                />
                <span>No government acquisition, pipeline or right-of-way encumbrance</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={checkedMinistryRegistry}
                  onChange={(e) => setCheckedMinistryRegistry(e.target.checked)}
                  className="rounded text-[#008751] focus:ring-[#008751]"
                />
                <span>Lagos Lands Bureau (Alausa) gazette folio confirmed</span>
              </label>
            </div>
          </div>

          {/* Right Pane: Leaflet Map showing surveyed boundary polygon vs agent pin */}
          <div className="p-5 flex flex-col justify-between bg-stone-50 overflow-hidden">
            <div className="flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-xs uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#008751]" />
                  Cadastral Map Overlay
                </span>
                <span className="text-[10px] text-stone-500 font-semibold">
                  Green Polygon = Charted Land Bounds | Red Tag = Agent Pin
                </span>
              </div>

              {/* Map Container */}
              <div className="flex-1 rounded-xl overflow-hidden border border-stone-200 min-h-[340px]">
                <LeafletMap
                  listings={[listing]}
                  center={[lat, lng]}
                  zoom={14}
                  highlightPolygon={boundaryPolygon}
                  agentPin={[lat, lng]}
                />
              </div>
            </div>

            {/* Action Bar */}
            <div className="mt-4 pt-3 border-t border-stone-200">
              {isRefusing ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Enter reason for refusal (e.g. Survey beacon disparity)..."
                    value={refusalNote}
                    onChange={(e) => setRefusalNote(e.target.value)}
                    className="w-full p-2 bg-white border border-stone-300 rounded-lg text-xs"
                  />
                  <div className="flex gap-2 justify-end">
                    <button
                      type="button"
                      onClick={() => setIsRefusing(false)}
                      className="px-3 py-1.5 border border-stone-300 rounded-lg text-xs font-bold"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={handleRefuse}
                      className="px-4 py-1.5 bg-red-600 text-white rounded-lg text-xs font-bold"
                    >
                      Confirm Refusal
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      simulatePinShift(listing.id);
                      showToast(
                        "Pin Shifted!",
                        "Simulated agent coordinate modification outside boundary. Badge lapsed."
                      );
                      onClose();
                    }}
                    className="px-3 py-2.5 border border-amber-300 text-amber-800 bg-amber-50 hover:bg-amber-100 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                    title="Simulate agent moving pin to demonstrate automatic badge lapse"
                  >
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    <span>Test Pin Shift (Lapse Badge)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsRefusing(true)}
                    className="px-3 py-2.5 border border-red-200 text-red-600 hover:bg-red-50 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Refuse</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleGrant}
                    disabled={!allChecksPass}
                    className="flex-1 py-2.5 px-4 bg-[#008751] hover:bg-[#00563A] text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all disabled:opacity-50"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Grant "Documents Checked" Badge with Today's Date</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

