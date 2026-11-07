"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  PropertyListing,
  Agent,
  Enquiry,
  SavedSearch,
  TierConfig,
  AdBanner,
  AuditLogEntry,
  TipOfTheDay,
  UserRole,
  ListingStatus,
  AgentTier,
  AgentVerificationStatus,
  TitleDocumentCheck,
} from "@/types";
import { INITIAL_LISTINGS } from "@/data/listings";
import { INITIAL_AGENTS } from "@/data/agents";
import { INITIAL_TIERS } from "@/data/tiers";
import { INITIAL_ADS } from "@/data/ads";
import { LAGOS_PROPERTY_TIPS } from "@/data/tips";

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  link?: string;
}

interface MarketplaceContextType {
  // Data
  listings: PropertyListing[];
  agents: Agent[];
  tiers: TierConfig[];
  ads: AdBanner[];
  auditLogs: AuditLogEntry[];
  tips: TipOfTheDay[];
  notifications: AppNotification[];
  enquiries: Enquiry[];
  savedListingIds: string[];
  savedSearches: SavedSearch[];
  
  // User & Session State
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  activeAgentId: string;
  setActiveAgentId: (id: string) => void;
  topBannerDismissed: boolean;
  dismissTopBanner: () => void;
  exclusivePopupShownThisSession: boolean;
  markExclusivePopupShown: () => void;

  // Actions
  toggleSaveListing: (listingId: string) => void;
  isListingSaved: (listingId: string) => boolean;
  saveSearch: (search: Omit<SavedSearch, "id" | "createdAt">) => void;
  removeSavedSearch: (id: string) => void;
  toggleSearchAlert: (id: string) => void;
  
  submitEnquiry: (enquiry: Omit<Enquiry, "id" | "createdAt" | "status">) => void;
  updateEnquiryStatus: (enquiryId: string, status: Enquiry["status"]) => void;
  logWhatsAppClick: (listingId: string) => void;
  
  registerAgent: (agentData: Partial<Agent>) => string;
  approveAgent: (agentId: string, reference: string, reason: string) => void;
  rejectAgent: (agentId: string, reason: string) => void;
  suspendAgent: (agentId: string, reason: string) => void;
  upgradeAgentTier: (agentId: string, newTier: AgentTier) => void;

  addListing: (listing: Partial<PropertyListing>) => string;
  updateListingStatus: (listingId: string, status: ListingStatus) => void;
  grantDocumentCheckedBadge: (listingId: string, docDetails: TitleDocumentCheck, reason: string) => void;
  refuseDocumentCheckedBadge: (listingId: string, reason: string) => void;
  reportListing: (listingId: string, reason: string, reporterEmail: string) => void;

  updateTierConfig: (tier: AgentTier, updates: Partial<TierConfig>) => void;
  updateAdBanner: (bannerId: string, updates: Partial<AdBanner>) => void;
  recordAuditLog: (entry: Omit<AuditLogEntry, "id" | "timestamp" | "adminName">) => void;
  markAllNotificationsRead: () => void;
  simulatePinShift: (listingId: string) => void;
  resetDemoData: () => void;
}

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(undefined);

const STORAGE_KEYS = {
  LISTINGS: "segalex_listings_v1",
  AGENTS: "segalex_agents_v1",
  TIERS: "segalex_tiers_v1",
  SAVED_LISTINGS: "segalex_saved_listings_v1",
  SAVED_SEARCHES: "segalex_saved_searches_v1",
  ENQUIRIES: "segalex_enquiries_v1",
  AUDIT_LOGS: "segalex_audit_logs_v1",
  USER_ROLE: "segalex_user_role_v1",
  TOP_BANNER: "segalex_top_banner_v1",
  ADS: "segalex_ads_v1",
  NOTIFICATIONS: "segalex_notifications_v1",
};

export function MarketplaceProvider({ children }: { children: React.ReactNode }) {
  // Core datasets
  const [listings, setListings] = useState<PropertyListing[]>(INITIAL_LISTINGS);
  const [agents, setAgents] = useState<Agent[]>(INITIAL_AGENTS);
  const [tiers, setTiers] = useState<TierConfig[]>(INITIAL_TIERS);
  const [ads, setAds] = useState<AdBanner[]>(INITIAL_ADS);
  const [tips] = useState<TipOfTheDay[]>(LAGOS_PROPERTY_TIPS);
  
  // User state
  const [userRole, setUserRoleState] = useState<UserRole>('visitor');
  const [activeAgentId, setActiveAgentId] = useState<string>('agent-segalex');
  const [savedListingIds, setSavedListingIds] = useState<string[]>(['prop-1', 'prop-3']);
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([
    {
      id: 'search-1',
      queryTitle: 'Land in Ibeju-Lekki (Under ₦70m)',
      propertyType: 'land',
      area: 'Ibeju-Lekki',
      maxPrice: 70000000,
      documentsCheckedOnly: true,
      alertEnabled: true,
      createdAt: '2024-10-15T09:00:00Z',
    },
    {
      id: 'search-2',
      queryTitle: '4-Bed Duplex in Lekki Phase 1',
      propertyType: 'house',
      area: 'Lekki Phase 1',
      purpose: 'sale',
      bedrooms: 4,
      verifiedAgentsOnly: true,
      alertEnabled: false,
      createdAt: '2024-10-20T14:30:00Z',
    },
  ]);

  const [enquiries, setEnquiries] = useState<Enquiry[]>([
    {
      id: 'enq-1',
      listingId: 'prop-3',
      listingTitle: '1,200 m² Dry Commercial Land along Lekki-Epe Expressway',
      listingPrice: '₦65,000,000',
      agentId: 'agent-segalex',
      buyerName: 'Dr. Kunle Adele',
      buyerEmail: 'kunle.adele@example.com',
      buyerPhone: '+234 803 555 1209',
      message: 'Hello Mr. Segun, I am interested in this parcel for a commercial clinic development. Is the survey beacon verification available for inspection?',
      status: 'Contacted',
      channel: 'form',
      createdAt: '2024-10-28T11:20:00Z',
    },
    {
      id: 'enq-2',
      listingId: 'prop-1',
      listingTitle: '6-Bedroom Ultra-Luxury Waterfront Villa with Private Jetty',
      listingPrice: '₦1,850,000,000',
      agentId: 'agent-segalex',
      buyerName: 'Alhaji Mansur Bello',
      buyerEmail: 'bello.investments@example.com',
      buyerPhone: '+234 802 119 4432',
      message: 'Direct WhatsApp enquiry regarding the private jetty title registration.',
      status: 'Viewing',
      channel: 'whatsapp',
      createdAt: '2024-11-01T15:40:00Z',
    },
  ]);

  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([
    {
      id: 'log-1',
      timestamp: '2024-10-06T11:05:00Z',
      adminName: 'Lead Admin (The Edge Studio)',
      action: 'Granted Documents Checked Badge',
      entityType: 'document',
      entityId: 'prop-3',
      entityName: '1,200 m² Commercial Land (Ibeju-Lekki)',
      reason: 'Gazette and Alausa survey coordinates verified against cadastral database.',
    },
    {
      id: 'log-2',
      timestamp: '2024-10-01T09:30:00Z',
      adminName: 'Lead Admin (The Edge Studio)',
      action: 'Approved Agent Accreditation',
      entityType: 'agent',
      entityId: 'agent-folashade',
      entityName: 'Folashade Balogun (Apex Haven Realty)',
      reason: 'Valid LASRERA registration number LASRERA/RN/2024/0142 verified with Ministry.',
    },
  ]);

  const [notifications, setNotifications] = useState<AppNotification[]>([
    {
      id: 'notif-1',
      title: 'New Listing Alert',
      message: 'A new Documents Checked property was listed in Ibeju-Lekki matching your saved search.',
      timestamp: '10 mins ago',
      isRead: false,
      link: '/property/prop-3',
    },
    {
      id: 'notif-2',
      title: 'Enquiry Received',
      message: 'New prospect Dr. Kunle Adele sent an enquiry for your Ibeju-Lekki listing.',
      timestamp: '2 hours ago',
      isRead: false,
      link: '/agent/enquiries',
    },
  ]);

  const [topBannerDismissed, setTopBannerDismissed] = useState<boolean>(false);
  const [exclusivePopupShownThisSession, setExclusivePopupShownThisSession] = useState<boolean>(false);

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const storedListings = localStorage.getItem(STORAGE_KEYS.LISTINGS);
      if (storedListings) setListings(JSON.parse(storedListings));

      const storedAgents = localStorage.getItem(STORAGE_KEYS.AGENTS);
      if (storedAgents) setAgents(JSON.parse(storedAgents));

      const storedTiers = localStorage.getItem(STORAGE_KEYS.TIERS);
      if (storedTiers) setTiers(JSON.parse(storedTiers));

      const storedSaved = localStorage.getItem(STORAGE_KEYS.SAVED_LISTINGS);
      if (storedSaved) setSavedListingIds(JSON.parse(storedSaved));

      const storedSearches = localStorage.getItem(STORAGE_KEYS.SAVED_SEARCHES);
      if (storedSearches) setSavedSearches(JSON.parse(storedSearches));

      const storedEnquiries = localStorage.getItem(STORAGE_KEYS.ENQUIRIES);
      if (storedEnquiries) setEnquiries(JSON.parse(storedEnquiries));

      const storedLogs = localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS);
      if (storedLogs) setAuditLogs(JSON.parse(storedLogs));

      const storedRole = localStorage.getItem(STORAGE_KEYS.USER_ROLE);
      if (storedRole) setUserRoleState(storedRole as UserRole);

      const storedTopBanner = localStorage.getItem(STORAGE_KEYS.TOP_BANNER);
      if (storedTopBanner) setTopBannerDismissed(JSON.parse(storedTopBanner));

      const storedAds = localStorage.getItem(STORAGE_KEYS.ADS);
      if (storedAds) setAds(JSON.parse(storedAds));
    } catch {
      // LocalStorage access failback
    }
  }, []);

  // Sync state helpers
  const saveToLocal = (key: string, data: unknown) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch {
      // Ignore storage quota errors
    }
  };

  const setUserRole = (role: UserRole) => {
    setUserRoleState(role);
    saveToLocal(STORAGE_KEYS.USER_ROLE, role);
  };

  const dismissTopBanner = () => {
    setTopBannerDismissed(true);
    saveToLocal(STORAGE_KEYS.TOP_BANNER, true);
  };

  const markExclusivePopupShown = () => {
    setExclusivePopupShownThisSession(true);
  };

  const recordAuditLog = (entry: Omit<AuditLogEntry, "id" | "timestamp" | "adminName">) => {
    const newEntry: AuditLogEntry = {
      ...entry,
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      adminName: 'Admin Desk (The Edge Studio)',
    };
    const updated = [newEntry, ...auditLogs];
    setAuditLogs(updated);
    saveToLocal(STORAGE_KEYS.AUDIT_LOGS, updated);
  };

  // Saved Listings (Favorites)
  const toggleSaveListing = (listingId: string) => {
    const updated = savedListingIds.includes(listingId)
      ? savedListingIds.filter(id => id !== listingId)
      : [...savedListingIds, listingId];
    
    setSavedListingIds(updated);
    saveToLocal(STORAGE_KEYS.SAVED_LISTINGS, updated);

    // Update listing saves count
    const updatedListings = listings.map(p => {
      if (p.id === listingId) {
        return {
          ...p,
          saves: Math.max(0, p.saves + (savedListingIds.includes(listingId) ? -1 : 1)),
        };
      }
      return p;
    });
    setListings(updatedListings);
    saveToLocal(STORAGE_KEYS.LISTINGS, updatedListings);
  };

  const isListingSaved = (listingId: string) => savedListingIds.includes(listingId);

  // Saved Searches
  const saveSearch = (searchData: Omit<SavedSearch, "id" | "createdAt">) => {
    const newSearch: SavedSearch = {
      ...searchData,
      id: `search-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    const updated = [newSearch, ...savedSearches];
    setSavedSearches(updated);
    saveToLocal(STORAGE_KEYS.SAVED_SEARCHES, updated);
  };

  const removeSavedSearch = (id: string) => {
    const updated = savedSearches.filter(s => s.id !== id);
    setSavedSearches(updated);
    saveToLocal(STORAGE_KEYS.SAVED_SEARCHES, updated);
  };

  const toggleSearchAlert = (id: string) => {
    const updated = savedSearches.map(s => (s.id === id ? { ...s, alertEnabled: !s.alertEnabled } : s));
    setSavedSearches(updated);
    saveToLocal(STORAGE_KEYS.SAVED_SEARCHES, updated);
  };

  // Enquiries & WhatsApp
  const submitEnquiry = (enquiryData: Omit<Enquiry, "id" | "createdAt" | "status">) => {
    const newEnquiry: Enquiry = {
      ...enquiryData,
      id: `enq-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'New',
    };
    const updatedEnquiries = [newEnquiry, ...enquiries];
    setEnquiries(updatedEnquiries);
    saveToLocal(STORAGE_KEYS.ENQUIRIES, updatedEnquiries);

    // Update listing enquiry count
    const updatedListings = listings.map(p => {
      if (p.id === enquiryData.listingId) {
        return { ...p, enquiriesCount: p.enquiriesCount + 1 };
      }
      return p;
    });
    setListings(updatedListings);
    saveToLocal(STORAGE_KEYS.LISTINGS, updatedListings);

    // Add in-app notification
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'Enquiry Dispatched',
      message: `Your enquiry for ${enquiryData.listingTitle} has been routed to the verified agent.`,
      timestamp: 'Just now',
      isRead: false,
      link: `/account`,
    };
    setNotifications([newNotif, ...notifications]);
  };

  const updateEnquiryStatus = (enquiryId: string, status: Enquiry["status"]) => {
    const updated = enquiries.map(e => (e.id === enquiryId ? { ...e, status } : e));
    setEnquiries(updated);
    saveToLocal(STORAGE_KEYS.ENQUIRIES, updated);
  };

  const logWhatsAppClick = (listingId: string) => {
    const updated = listings.map(p => {
      if (p.id === listingId) {
        return { ...p, whatsappClicks: p.whatsappClicks + 1 };
      }
      return p;
    });
    setListings(updated);
    saveToLocal(STORAGE_KEYS.LISTINGS, updated);
  };

  // Agent Operations
  const registerAgent = (agentData: Partial<Agent>): string => {
    const newId = `agent-${Date.now()}`;
    const newAgent: Agent = {
      id: newId,
      name: agentData.name || 'New Registered Agent',
      agencyName: agentData.agencyName || 'Independent Brokerage',
      tier: 'free',
      verificationStatus: 'pending',
      lasreraNumber: agentData.lasreraNumber || 'LASRERA/RN/2024/0999',
      isErcaanMember: !!agentData.isErcaanMember,
      ercaanRegNumber: agentData.ercaanRegNumber,
      verifiedSince: new Date().toISOString().split('T')[0],
      email: agentData.email || 'agent@example.com',
      phone: agentData.phone || '+234 800 000 0000',
      whatsapp: agentData.whatsapp || '2348000000000',
      avatar: agentData.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      bio: agentData.bio || 'Newly registered agent on Segalex Property Hub.',
      coverageAreas: agentData.coverageAreas || ['Lekki Phase 1', 'Ajah'],
      activeListingsCount: 0,
      totalDealsClosed: 0,
      rating: 5.0,
      documentsUploaded: agentData.documentsUploaded,
    };
    const updated = [newAgent, ...agents];
    setAgents(updated);
    saveToLocal(STORAGE_KEYS.AGENTS, updated);
    setActiveAgentId(newId);

    recordAuditLog({
      action: 'Agent Registered (Pending Verification)',
      entityType: 'agent',
      entityId: newId,
      entityName: newAgent.agencyName,
      reason: 'Agent self-submitted registration credentials and LASRERA documentation.',
    });

    return newId;
  };

  const approveAgent = (agentId: string, reference: string, reason: string) => {
    const agent = agents.find(a => a.id === agentId);
    if (!agent) return;

    const updated = agents.map(a => {
      if (a.id === agentId) {
        return {
          ...a,
          verificationStatus: 'verified' as AgentVerificationStatus,
          verifiedSince: new Date().toISOString().split('T')[0],
          lasreraNumber: reference || a.lasreraNumber,
        };
      }
      return a;
    });
    setAgents(updated);
    saveToLocal(STORAGE_KEYS.AGENTS, updated);

    recordAuditLog({
      action: 'Approved Agent LASRERA Accreditation',
      entityType: 'agent',
      entityId: agentId,
      entityName: agent.agencyName,
      reason: reason || `Verified against LASRERA registry with reference: ${reference}`,
    });
  };

  const rejectAgent = (agentId: string, reason: string) => {
    const agent = agents.find(a => a.id === agentId);
    if (!agent) return;

    const updated = agents.map(a => {
      if (a.id === agentId) {
        return { ...a, verificationStatus: 'rejected' as AgentVerificationStatus };
      }
      return a;
    });
    setAgents(updated);
    saveToLocal(STORAGE_KEYS.AGENTS, updated);

    recordAuditLog({
      action: 'Rejected Agent Application',
      entityType: 'agent',
      entityId: agentId,
      entityName: agent.agencyName,
      reason: reason || 'Submitted documents could not be authenticated with LASRERA portal.',
    });
  };

  const suspendAgent = (agentId: string, reason: string) => {
    const agent = agents.find(a => a.id === agentId);
    if (!agent) return;

    const updated = agents.map(a => {
      if (a.id === agentId) {
        return { ...a, verificationStatus: 'suspended' as AgentVerificationStatus };
      }
      return a;
    });
    setAgents(updated);
    saveToLocal(STORAGE_KEYS.AGENTS, updated);

    recordAuditLog({
      action: 'Suspended Agent Access',
      entityType: 'agent',
      entityId: agentId,
      entityName: agent.agencyName,
      reason: reason || 'Administrative suspension.',
    });
  };

  const upgradeAgentTier = (agentId: string, newTier: AgentTier) => {
    const agent = agents.find(a => a.id === agentId);
    if (!agent) return;

    const updated = agents.map(a => (a.id === agentId ? { ...a, tier: newTier } : a));
    setAgents(updated);
    saveToLocal(STORAGE_KEYS.AGENTS, updated);

    recordAuditLog({
      action: `Upgraded Tier to ${newTier.toUpperCase()}`,
      entityType: 'agent',
      entityId: agentId,
      entityName: agent.agencyName,
      reason: 'Processed via Paystack checkout simulation.',
    });
  };

  // Listing Operations
  const addListing = (listingData: Partial<PropertyListing>): string => {
    const newId = `prop-${Date.now()}`;
    const newListing: PropertyListing = {
      id: newId,
      title: listingData.title || 'Untitled Property',
      slug: (listingData.title || 'untitled').toLowerCase().replace(/\s+/g, '-'),
      tagline: listingData.tagline || 'Verified Lagos Property Listing',
      description: listingData.description || 'Modern property in prime Lagos location.',
      purpose: listingData.purpose || 'sale',
      propertyType: listingData.propertyType || 'house',
      price: listingData.price || 50000000,
      priceDisplay: listingData.priceDisplay || '₦50,000,000',
      period: listingData.purpose === 'rent' ? 'year' : null,
      area: listingData.area || 'Lekki Phase 1',
      address: listingData.address || 'Lagos, Nigeria',
      coordinates: listingData.coordinates || { lat: 6.4474, lng: 3.4735 },
      bedrooms: listingData.bedrooms,
      bathrooms: listingData.bathrooms,
      toilets: listingData.toilets,
      sizeSqm: listingData.sizeSqm || 400,
      features: listingData.features || ['Security', 'Water Treatment', 'Ample Parking'],
      photos: listingData.photos?.length ? listingData.photos : [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
      ],
      videoUrl: listingData.videoUrl,
      videoPoster: listingData.videoPoster,
      isFeatured: !!listingData.isFeatured,
      isSponsored: !!listingData.isSponsored,
      isDocumentsChecked: !!listingData.isDocumentsChecked,
      documentDetails: listingData.documentDetails,
      agentId: listingData.agentId || activeAgentId,
      status: 'live',
      views: 12,
      saves: 0,
      enquiriesCount: 0,
      whatsappClicks: 0,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(), // 60 days
    };

    const updated = [newListing, ...listings];
    setListings(updated);
    saveToLocal(STORAGE_KEYS.LISTINGS, updated);

    // Increment agent listing count
    setAgents(agents.map(a => a.id === newListing.agentId ? { ...a, activeListingsCount: a.activeListingsCount + 1 } : a));

    recordAuditLog({
      action: 'Published New Listing',
      entityType: 'listing',
      entityId: newId,
      entityName: newListing.title,
      reason: 'Agent created new inventory within tier allowance.',
    });

    return newId;
  };

  const updateListingStatus = (listingId: string, status: ListingStatus) => {
    const updated = listings.map(p => (p.id === listingId ? { ...p, status } : p));
    setListings(updated);
    saveToLocal(STORAGE_KEYS.LISTINGS, updated);
  };

  const grantDocumentCheckedBadge = (listingId: string, docDetails: TitleDocumentCheck, reason: string) => {
    const listing = listings.find(p => p.id === listingId);
    if (!listing) return;

    const today = new Date().toISOString().split('T')[0];
    const updatedDetails: TitleDocumentCheck = {
      ...docDetails,
      isDocumentChecked: true,
      checkedOnDate: today,
      verifiedBy: 'Segalex Land Audit Bureau',
    };

    const updatedListings = listings.map(p => {
      if (p.id === listingId) {
        return {
          ...p,
          isDocumentsChecked: true,
          documentDetails: updatedDetails,
        };
      }
      return p;
    });
    setListings(updatedListings);
    saveToLocal(STORAGE_KEYS.LISTINGS, updatedListings);

    recordAuditLog({
      action: 'Granted Documents Checked Badge',
      entityType: 'document',
      entityId: listingId,
      entityName: listing.title,
      reason: reason || 'Survey coordinates and title deed confirmed against Alausa master registry.',
    });
  };

  const refuseDocumentCheckedBadge = (listingId: string, reason: string) => {
    const listing = listings.find(p => p.id === listingId);
    if (!listing) return;

    recordAuditLog({
      action: 'Refused Documents Checked Badge',
      entityType: 'document',
      entityId: listingId,
      entityName: listing.title,
      reason: reason || 'Title survey beacons do not correlate with charted coordinates.',
    });
  };

  const reportListing = (listingId: string, reason: string, reporterEmail: string) => {
    const listing = listings.find(p => p.id === listingId);
    if (!listing) return;

    recordAuditLog({
      action: 'Listing Reported by User',
      entityType: 'listing',
      entityId: listingId,
      entityName: listing.title,
      reason: `Report filed by ${reporterEmail}: ${reason}`,
    });
  };

  // Tier configuration updates
  const updateTierConfig = (tier: AgentTier, updates: Partial<TierConfig>) => {
    const updated = tiers.map(t => (t.tier === tier ? { ...t, ...updates } : t));
    setTiers(updated);
    saveToLocal(STORAGE_KEYS.TIERS, updated);

    recordAuditLog({
      action: `Updated Tier Pricing/Limits (${tier.toUpperCase()})`,
      entityType: 'tier',
      entityId: tier,
      entityName: `${tier.toUpperCase()} Tier Settings`,
      reason: 'Admin adjusted platform commercial limits or pricing.',
    });
  };

  const updateAdBanner = (bannerId: string, updates: Partial<AdBanner>) => {
    const updated = ads.map(a => (a.id === bannerId ? { ...a, ...updates } : a));
    setAds(updated);
    saveToLocal(STORAGE_KEYS.ADS, updated);
  };

  const markAllNotificationsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const simulatePinShift = (listingId: string) => {
    const listing = listings.find(p => p.id === listingId);
    if (!listing) return;

    const shiftedLat = Number((listing.coordinates.lat + 0.0085).toFixed(4));
    const shiftedLng = Number((listing.coordinates.lng + 0.0075).toFixed(4));

    const updatedListings = listings.map(p => {
      if (p.id === listingId) {
        return {
          ...p,
          coordinates: { lat: shiftedLat, lng: shiftedLng },
          isDocumentsChecked: false,
          documentDetails: p.documentDetails
            ? {
                ...p.documentDetails,
                isDocumentChecked: false,
                notes: "INTEGRITY ALERT: Map pin shifted post-audit. Coordinates deviate from charted survey boundary. Documents Checked badge lapsed automatically.",
              }
            : undefined,
        };
      }
      return p;
    });

    setListings(updatedListings);
    saveToLocal(STORAGE_KEYS.LISTINGS, updatedListings);

    recordAuditLog({
      action: "Badge Automatically Lapsed: Coordinate Pin Shift",
      entityType: "document",
      entityId: listingId,
      entityName: listing.title,
      reason: "Agent altered property coordinates. Location no longer matches verified survey beacons. Badge revoked for buyer safety.",
    });
  };

  const resetDemoData = () => {
    if (typeof window !== "undefined") {
      Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
    }
    setListings(INITIAL_LISTINGS);
    setAgents(INITIAL_AGENTS);
    setTiers(INITIAL_TIERS);
    setAds(INITIAL_ADS);
    setSavedListingIds(['prop-1', 'prop-3']);
    setAuditLogs([
      {
        id: `audit-reset-${Date.now()}`,
        timestamp: new Date().toISOString(),
        adminName: "Mr Segun (MD / Root)",
        action: "Demo Data Reset to Master Golden State",
        entityType: "system",
        entityId: "SYS-RESET",
        entityName: "Master Storage",
        reason: "User reseeded prototype via floating guide reset action.",
      },
    ]);
  };

  return (
    <MarketplaceContext.Provider
      value={{
        listings,
        agents,
        tiers,
        ads,
        auditLogs,
        tips,
        notifications,
        enquiries,
        savedListingIds,
        savedSearches,
        userRole,
        setUserRole,
        activeAgentId,
        setActiveAgentId,
        topBannerDismissed,
        dismissTopBanner,
        exclusivePopupShownThisSession,
        markExclusivePopupShown,
        toggleSaveListing,
        isListingSaved,
        saveSearch,
        removeSavedSearch,
        toggleSearchAlert,
        submitEnquiry,
        updateEnquiryStatus,
        logWhatsAppClick,
        registerAgent,
        approveAgent,
        rejectAgent,
        suspendAgent,
        upgradeAgentTier,
        addListing,
        updateListingStatus,
        grantDocumentCheckedBadge,
        refuseDocumentCheckedBadge,
        reportListing,
        updateTierConfig,
        updateAdBanner,
        recordAuditLog,
        markAllNotificationsRead,
        simulatePinShift,
        resetDemoData,
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
}

export function useMarketplace() {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error("useMarketplace must be used within a MarketplaceProvider");
  }
  return context;
}

