import type { Metadata } from "next";
import { Barlow_Condensed, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { MarketplaceProvider } from "@/context/MarketplaceContext";
import { ConceptBanner } from "@/components/common/ConceptBanner";
import { PrototypeGuide } from "@/components/common/PrototypeGuide";
import { ToastContainer } from "@/components/ui/Toast";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://segalex.com.ng"),
  title: "Segalex Property Hub | Verified Property Marketplace in Lagos, Nigeria",
  description:
    "Nigeria's verified property exchange by Segalex Resources Global Limited (RC 7351342). Find genuine houses, luxury flats, commercial spaces, and dry land verified by LASRERA registered agents in Lagos.",
  keywords: [
    "Lagos Real Estate",
    "Verified Property Lagos",
    "LASRERA Registered Agents",
    "Ikoyi Luxury Real Estate",
    "Lekki Houses for Sale",
    "Ibeju-Lekki Land",
    "Banana Island Mansions",
    "Segalex Resources Global Limited",
  ],
  authors: [{ name: "Segalex Resources Global Limited" }, { name: "The Edge Studio" }],
  openGraph: {
    title: "Segalex Property Hub | Verified Lagos Real Estate",
    description:
      "Find genuine property from agents we have verified. Zero fraud, authenticated cadastral surveys, and LASRERA compliant real estate.",
    siteName: "Segalex Property Hub",
    locale: "en_NG",
    type: "website",
    images: [
      {
        url: "/brand/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Segalex Property Hub - Verified Property Marketplace for Lagos",
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/brand/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${barlowCondensed.variable} ${plusJakartaSans.variable}`}>
      <body className="min-h-screen flex flex-col font-body bg-canvas text-darktext antialiased selection:bg-[#008751] selection:text-white">
        <MarketplaceProvider>
          <ConceptBanner />
          <div className="flex-1 flex flex-col">{children}</div>
          <PrototypeGuide />
          <ToastContainer />
        </MarketplaceProvider>
      </body>
    </html>
  );
}

