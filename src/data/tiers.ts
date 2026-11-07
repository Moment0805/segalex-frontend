import { TierConfig } from "@/types";

export const INITIAL_TIERS: TierConfig[] = [
  {
    tier: 'free',
    name: 'Free Starter',
    monthlyPrice: 0,
    yearlyPrice: 0,
    listingLimit: 2,
    photosPerListing: 2,
    videosAllowed: 0,
    placement: 'Standard',
    hasExclusiveSearchPopup: false,
    monthlyDocChecks: 0,
    description: 'For newly registered individual agents getting started on Segalex.',
  },
  {
    tier: 'basic',
    name: 'Professional Agent',
    monthlyPrice: 15000,
    yearlyPrice: 150000,
    listingLimit: 15,
    photosPerListing: 10,
    videosAllowed: 3,
    placement: 'Standard',
    hasExclusiveSearchPopup: false,
    monthlyDocChecks: 1,
    description: 'For active brokers and boutique real estate firms in Lagos.',
  },
  {
    tier: 'premium',
    name: 'Enterprise & Prime',
    monthlyPrice: 45000,
    yearlyPrice: 450000,
    listingLimit: 50,
    photosPerListing: 50, // unlimited fair use
    videosAllowed: 10,
    placement: 'Priority',
    hasExclusiveSearchPopup: true,
    monthlyDocChecks: 3,
    description: 'For top real estate developers, agencies & prime brokerage leaders.',
  },
];

