"use client";

import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { PropertyListing } from "@/types";
import { formatNaira, formatRentPrice } from "@/lib/utils";

interface LeafletMapInnerProps {
  listings: PropertyListing[];
  selectedListingId?: string | null;
  hoveredListingId?: string | null;
  onSelectListing?: (id: string) => void;
  center?: [number, number];
  zoom?: number;
  highlightPolygon?: [number, number][]; // Cadastral survey boundary polygon
  agentPin?: [number, number];
  onMapClick?: (lat: number, lng: number) => void;
  interactivePinDrop?: boolean;
}

export default function LeafletMapInner({
  listings,
  selectedListingId,
  hoveredListingId,
  onSelectListing,
  center = [6.4698, 3.5852], // Lagos coastal axis
  zoom = 11,
  highlightPolygon,
  agentPin,
  onMapClick,
  interactivePinDrop = false,
}: LeafletMapInnerProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersGroupRef = useRef<L.LayerGroup | null>(null);
  const polygonLayerRef = useRef<L.Polygon | null>(null);
  const droppedMarkerRef = useRef<L.Marker | null>(null);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center,
      zoom,
      zoomControl: true,
      scrollWheelZoom: false,
    });

    // Clean OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    markersGroupRef.current = L.layerGroup().addTo(map);
    mapInstanceRef.current = map;

    if (interactivePinDrop && onMapClick) {
      map.on("click", (e: L.LeafletMouseEvent) => {
        const { lat, lng } = e.latlng;
        onMapClick(lat, lng);

        if (droppedMarkerRef.current) {
          droppedMarkerRef.current.setLatLng([lat, lng]);
        } else {
          const pinIcon = L.divIcon({
            className: "custom-pin",
            html: `<div style="background-color: #008751; color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; border: 2px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.3);">📍</div>`,
            iconSize: [28, 28],
            iconAnchor: [14, 28],
          });
          droppedMarkerRef.current = L.marker([lat, lng], { icon: pinIcon }).addTo(map);
        }
      });
    }

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update polygon if provided (e.g. In Admin Document Verification workstation)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (polygonLayerRef.current) {
      polygonLayerRef.current.remove();
      polygonLayerRef.current = null;
    }

    if (highlightPolygon && highlightPolygon.length > 2) {
      const polygon = L.polygon(highlightPolygon, {
        color: "#008751",
        fillColor: "#008751",
        fillOpacity: 0.25,
        weight: 3,
        dashArray: "4, 4",
      }).addTo(map);

      polygon.bindPopup(
        `<div style="font-size: 11px; font-weight: bold; color: #151314;">Surveyed Boundary Line (Charted Cadastral Parcel)</div>`
      );

      map.fitBounds(polygon.getBounds(), { padding: [50, 50] });
      polygonLayerRef.current = polygon;
    }
  }, [highlightPolygon]);

  // Update agent pin if provided
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !agentPin) return;

    if (droppedMarkerRef.current) {
      droppedMarkerRef.current.remove();
    }

    const pinIcon = L.divIcon({
      className: "agent-pin",
      html: `<div style="background-color: #D93025; color: white; padding: 4px 8px; border-radius: 20px; font-size: 10px; font-weight: 900; border: 2px solid white; box-shadow: 0 3px 8px rgba(0,0,0,0.3); white-space: nowrap;">Agent Pin</div>`,
      iconSize: [60, 24],
      iconAnchor: [30, 24],
    });

    droppedMarkerRef.current = L.marker(agentPin, { icon: pinIcon })
      .addTo(map)
      .bindPopup(`<strong style="font-size: 11px;">Agent Submitted Pin Coordinates</strong>`);
  }, [agentPin]);

  // Render Listing Markers
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersGroup = markersGroupRef.current;
    if (!map || !markersGroup) return;

    markersGroup.clearLayers();

    listings.forEach((listing) => {
      const isSelected = selectedListingId === listing.id;
      const isHovered = hoveredListingId === listing.id;

      const priceLabel =
        listing.purpose === "rent"
          ? formatRentPrice(listing.price, true)
          : formatNaira(listing.price, true);

      const isSpecial = listing.isDocumentsChecked || listing.isFeatured;
      const bgCol = isHovered || isSelected ? "#151314" : isSpecial ? "#008751" : "#FFFFFF";
      const textCol = isHovered || isSelected || isSpecial ? "#FFFFFF" : "#151314";
      const borderCol = isSpecial ? "#FFC800" : isHovered ? "#FFC800" : "#E4E3DB";

      const html = `
        <div style="
          background-color: ${bgCol};
          color: ${textCol};
          border: 2px solid ${borderCol};
          padding: 3px 8px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 800;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
          display: flex;
          align-items: center;
          gap: 4px;
          cursor: pointer;
          white-space: nowrap;
          transform: ${isHovered || isSelected ? "scale(1.15)" : "scale(1)"};
          transition: transform 0.15s ease;
        ">
          ${listing.isDocumentsChecked ? '<span style="color: #FFC800; font-size: 10px;">★</span>' : ""}
          <span>${priceLabel}</span>
        </div>
      `;

      const customIcon = L.divIcon({
        className: "property-map-pin",
        html,
        iconSize: [80, 28],
        iconAnchor: [40, 14],
      });

      const marker = L.marker([listing.coordinates.lat, listing.coordinates.lng], {
        icon: customIcon,
      });

      // Interactive Popup Content
      const popupContent = `
        <div style="font-family: system-ui, sans-serif; width: 220px; padding: 2px;">
          <img src="${listing.photos[0]}" style="width: 100%; height: 110px; object-fit: cover; border-radius: 8px; margin-bottom: 8px;" />
          <div style="font-weight: 900; font-size: 13px; color: #151314; margin-bottom: 2px;">
            ${listing.purpose === "rent" ? formatRentPrice(listing.price, false) : formatNaira(listing.price, false)}
          </div>
          <div style="font-weight: 700; font-size: 11px; color: #1B1B1B; line-height: 1.3; margin-bottom: 4px;">
            ${listing.title}
          </div>
          <div style="font-size: 10px; color: #5F6368; margin-bottom: 8px;">
            📍 ${listing.address}
          </div>
          <a href="/property/${listing.id}" style="
            display: block;
            text-align: center;
            background: #008751;
            color: white;
            text-decoration: none;
            font-size: 11px;
            font-weight: bold;
            padding: 6px 10px;
            border-radius: 6px;
          ">
            View Property Details →
          </a>
        </div>
      `;

      marker.bindPopup(popupContent, { maxWidth: 240 });

      marker.on("click", () => {
        onSelectListing?.(listing.id);
      });

      markersGroup.addLayer(marker);
    });
  }, [listings, selectedListingId, hoveredListingId]);

  return <div ref={mapContainerRef} className="w-full h-full min-h-[350px] relative z-0" />;
}

