import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a number into Nigerian Naira format
 * e.g. 185000000 -> ₦185,000,000
 * Or compact: ₦185m
 */
export function formatNaira(amount: number, compact: boolean = false): string {
  if (compact) {
    if (amount >= 1_000_000_000) {
      return `₦${(amount / 1_000_000_000).toFixed(amount % 1_000_000_000 === 0 ? 0 : 1)}b`;
    }
    if (amount >= 1_000_000) {
      return `₦${(amount / 1_000_000).toFixed(amount % 1_000_000 === 0 ? 0 : 1)}m`;
    }
    if (amount >= 1_000) {
      return `₦${(amount / 1_000).toFixed(0)}k`;
    }
  }
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(amount).replace('NGN', '₦').trim();
}

/**
 * Format rent price strictly with / year
 */
export function formatRentPrice(amount: number, compact: boolean = false): string {
  return `${formatNaira(amount, compact)} / year`;
}

/**
 * Calculate days remaining until expiry
 */
export function getDaysRemaining(expiryIsoString: string): number {
  const expiry = new Date(expiryIsoString).getTime();
  const now = new Date().getTime();
  const diffTime = expiry - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
}

/**
 * Standard date formatter
 */
export function formatDate(isoString: string): string {
  const d = new Date(isoString);
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

