import { AdBanner } from "@/types";

export const INITIAL_ADS: AdBanner[] = [
  {
    id: 'ad-banner-home',
    title: 'Eko Atlantic Prime Tower Residences - Now Selling Off-Plan',
    slot: 'home_mid',
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1400&q=80',
    destinationUrl: '/properties?area=Victoria+Island',
    sponsorName: 'Eko Atlantic Development Group',
    isActive: true,
    impressions: 12480,
    clicks: 642,
    startDate: '2024-01-01',
    endDate: '2025-12-31',
  },
  {
    id: 'ad-banner-search',
    title: 'Dangote Corridor Industrial Mega-Plots - Ibeju-Lekki Free Zone',
    slot: 'search_feed',
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    destinationUrl: '/properties?area=Ibeju-Lekki',
    sponsorName: 'Lekki Coastal Investment Corp',
    isActive: true,
    impressions: 8930,
    clicks: 488,
    startDate: '2024-02-01',
    endDate: '2025-12-31',
  },
];

