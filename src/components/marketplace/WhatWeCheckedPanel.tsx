import React from "react";
import { TitleDocumentCheck } from "@/types";
import { FileCheck2, ShieldCheck, MapPin, AlertCircle, Calendar } from "lucide-react";

interface WhatWeCheckedPanelProps {
  documentDetails?: TitleDocumentCheck;
  isDocumentsChecked: boolean;
}

export function WhatWeCheckedPanel({
  documentDetails,
  isDocumentsChecked,
}: WhatWeCheckedPanelProps) {
  if (!isDocumentsChecked || !documentDetails) {
    return (
      <div className="bg-[#F1F0EA] rounded-2xl p-6 border border-stone-200">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-stone-200 text-stone-600">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-stone-900">
              Standard Listing Verification
            </h4>
            <p className="text-xs text-stone-600 mt-1 leading-relaxed">
              This listing is represented by an accredited LASRERA-registered agent. Formal cadastral title records check has not yet been requested by the listing agent for this property.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-7 border-2 border-[#008751]/30 shadow-card relative overflow-hidden">
      {/* Top Badge Header */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#008751]/10 flex items-center justify-center text-[#008751]">
            <FileCheck2 className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-[#008751] block">
              Official Cadastral Audit Report
            </span>
            <h3 className="font-bold text-base text-ink">What We Checked</h3>
          </div>
        </div>
        <span className="bg-[#151314] text-white px-2.5 py-1 rounded text-xs font-bold border border-[#FFC800]">
          Documents Checked
        </span>
      </div>

      {/* Grid of Verified Records */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5 text-xs">
        {/* Document Type */}
        <div className="bg-[#FAFAF7] p-3.5 rounded-xl border border-stone-200">
          <span className="text-stone-400 block uppercase font-bold text-[10px] mb-1">
            Registered Title Instrument
          </span>
          <span className="font-bold text-stone-900 text-sm block">
            {documentDetails.documentType}
          </span>
          <span className="text-[11px] font-mono text-stone-600 mt-0.5 block truncate">
            Ref: {documentDetails.titleReferenceNumber}
          </span>
        </div>

        {/* Survey Coordinates */}
        <div className="bg-[#FAFAF7] p-3.5 rounded-xl border border-stone-200">
          <span className="text-stone-400 block uppercase font-bold text-[10px] mb-1">
            Cadastral Survey Coordinates
          </span>
          <div className="flex items-center gap-1 font-mono font-bold text-stone-900">
            <MapPin className="w-3.5 h-3.5 text-[#008751]" />
            <span>
              {documentDetails.surveyCoordinates.lat.toFixed(4)}° N,{" "}
              {documentDetails.surveyCoordinates.lng.toFixed(4)}° E
            </span>
          </div>
          {documentDetails.surveyCoordinates.beaconNumbers && (
            <span className="text-[10px] text-stone-600 block mt-0.5 truncate">
              Beacons: {documentDetails.surveyCoordinates.beaconNumbers.join(", ")}
            </span>
          )}
        </div>

        {/* Checked on Date */}
        <div className="bg-[#FAFAF7] p-3.5 rounded-xl border border-stone-200">
          <span className="text-stone-400 block uppercase font-bold text-[10px] mb-1">
            Audit Inspection Date
          </span>
          <div className="flex items-center gap-1.5 font-bold text-stone-900">
            <Calendar className="w-3.5 h-3.5 text-stone-500" />
            <span>{documentDetails.checkedOnDate}</span>
          </div>
        </div>

        {/* Audited By */}
        <div className="bg-[#FAFAF7] p-3.5 rounded-xl border border-stone-200">
          <span className="text-stone-400 block uppercase font-bold text-[10px] mb-1">
            Auditing Authority
          </span>
          <div className="flex items-center gap-1.5 font-bold text-[#008751]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#008751]" />
            <span>{documentDetails.verifiedBy}</span>
          </div>
        </div>
      </div>

      {documentDetails.notes && (
        <div className="mt-4 p-3 bg-stone-50 rounded-lg text-xs text-stone-700 border border-stone-200">
          <strong>Auditor Notes:</strong> {documentDetails.notes}
        </div>
      )}

      {/* Mandatory Statutory Disclaimer */}
      <div className="mt-5 pt-4 border-t border-stone-100 flex items-start gap-2 text-stone-500 text-[11px] leading-relaxed">
        <AlertCircle className="w-4 h-4 text-stone-400 flex-shrink-0 mt-0.5" />
        <p>
          <strong className="text-stone-700">Statutory Notice:</strong> This is a records check,
          not a guarantee of title. Prospective buyers are advised to conduct independent due diligence
          with a registered solicitor and surveyor at the Lagos State Lands Bureau (Alausa).
        </p>
      </div>
    </div>
  );
}

