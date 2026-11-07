export type PropertyPurpose = 'sale' | 'rent';
export type PropertyType = 'house' | 'flat' | 'land' | 'commercial';

export type AgentTier = 'free' | 'basic' | 'premium';
export type AgentVerificationStatus = 'verified' | 'pending' | 'rejected' | 'suspended';
export type ListingStatus = 'live' | 'paused' | 'expired' | 'sold' | 'let';

export interface TitleDocumentCheck {
  isDocumentChecked: boolean;
  documentType: "Governor's Consent" | "Certificate of Occupancy (C of O)" | "Federal Certificate of Occupancy (C of O)" | "Gazette" | "Lagos State Gazette" | "Deed of Assignment" | "Excision" | "Governor's Approval";
  titleReferenceNumber: string;
  surveyCoordinates: {
    lat: number;
    lng: number;
    beaconNumbers?: string[];
    polygonBounds?: [number, number][];
  };
  checkedOnDate: string;
  verifiedBy: string;
  notes?: string;
}

export interface Agent {
  id: string;
  name: string;
  agencyName: string;
  tier: AgentTier;
  verificationStatus: AgentVerificationStatus;
  lasreraNumber: string;
  isErcaanMember: boolean;
  ercaanRegNumber?: string;
  verifiedSince: string;
  email: string;
  phone: string;
  whatsapp: string;
  avatar: string;
  bio: string;
  coverageAreas: string[];
  activeListingsCount: number;
  totalDealsClosed: number;
  rating: number;
  documentsUploaded?: {
    lasreraCertUrl?: string;
    idCardUrl?: string;
    cacCertUrl?: string;
  };
}

export interface PropertyListing {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  purpose: PropertyPurpose;
  propertyType: PropertyType;
  price: number; // In Naira (₦)
  priceDisplay: string; // e.g. "₦185,000,000" or "₦4,500,000 / year"
  period?: 'year' | null; // For rent: strictly 'year'
  area: string; // e.g. "Lekki Phase 1"
  address: string; // Street & District e.g. "Admiralty Way, Lekki Phase 1"
  coordinates: {
    lat: number;
    lng: number;
  };
  bedrooms?: number;
  bathrooms?: number;
  toilets?: number;
  sizeSqm?: number; // Land or floor size in m²
  features: string[];
  photos: string[];
  videoUrl?: string;
  videoPoster?: string;
  isFeatured: boolean;
  isSponsored: boolean;
  isDocumentsChecked: boolean;
  documentDetails?: TitleDocumentCheck;
  agentId: string;
  status: ListingStatus;
  views: number;
  saves: number;
  enquiriesCount: number;
  whatsappClicks: number;
  createdAt: string;
  expiresAt: string; // 60-day rule
}

export interface Enquiry {
  id: string;
  listingId: string;
  listingTitle: string;
  listingPrice: string;
  agentId: string;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  message: string;
  status: 'New' | 'Contacted' | 'Viewing' | 'Closed';
  channel: 'form' | 'whatsapp';
  createdAt: string;
}

export interface SavedSearch {
  id: string;
  queryTitle: string;
  purpose?: PropertyPurpose;
  propertyType?: PropertyType;
  area?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  documentsCheckedOnly?: boolean;
  verifiedAgentsOnly?: boolean;
  alertEnabled: boolean;
  createdAt: string;
}

export interface TierConfig {
  tier: AgentTier;
  name: string;
  monthlyPrice: number; // ₦0, ₦15000, ₦45000
  yearlyPrice: number; // ₦0, ₦150000, ₦450000
  listingLimit: number; // 2, 15, 50
  photosPerListing: number; // 2, 10, 999
  videosAllowed: number; // 0, 3, 10
  placement: 'Standard' | 'Standard' | 'Priority';
  hasExclusiveSearchPopup: boolean;
  monthlyDocChecks: number; // 0, 1, 3
  description: string;
}

export interface AdBanner {
  id: string;
  title: string;
  slot: 'home_mid' | 'search_feed';
  imageUrl: string;
  destinationUrl: string;
  sponsorName: string;
  isActive: boolean;
  impressions: number;
  clicks: number;
  startDate: string;
  endDate: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  adminName: string;
  action: string;
  entityType: 'agent' | 'listing' | 'document' | 'tier' | 'ad' | 'system';
  entityId: string;
  entityName: string;
  reason: string;
}

export interface TipOfTheDay {
  id: string;
  title: string;
  category: string;
  snippet: string;
  dateActive: string;
}

export type UserRole = 'visitor' | 'buyer' | 'agent' | 'admin';

