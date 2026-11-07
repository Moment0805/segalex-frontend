# Segalex Property Hub

**A Verified Property Marketplace for Lagos, Nigeria**  
Built for **Mr Segun**, Managing Director of **Segalex Resources Global Limited** (RC 7351342)  
Presented by **The Edge Studio**

*"Creating Wealth Through Real Estate"*

---

## Executive Summary

Segalex Property Hub is a high-fidelity, frontend-only clickable sales prototype engineered to demonstrate Nigeria’s premier verified property exchange. In a market where counterfeit survey plans, unverified roadside agents, and phantom land allocations cost buyers billions of Naira annually, Segalex provides **private-bank confidence, regulatory rigor, and Lagos commercial energy**.

This prototype is completely frontend-only: all data is realistic mock Lagos data held in React Context with `localStorage` persistence, allowing Mr. Segun and prospective stakeholders to save listings, submit inquiries, approve agents, perform cadastral survey split-screen audits, and process Paystack upgrades with realistic interactive feedback.

---

## Prototype Presentation Guide & Verification Journeys

A floating **"Prototype Guide"** button is present on the bottom-right corner of all screens. It features an instant **Role Switcher** (`Visitor` | `Buyer` | `Agent` | `Admin`), a **"Reset Demo Data"** action, and 1-click launchers for the key presentation journeys:

1. **Buyer Discovery, Video Tour & WhatsApp Share Preview**:
   - Navigate to `/properties?propertyType=land&area=Ibeju-Lekki&documentsCheckedOnly=true`
   - Open the verified Ibeju-Lekki land listing (`prop-3`), play the local video walkthrough, inspect the *"What we checked"* records panel (*"This is a records check, not a guarantee of title"*), and click **Share** to inspect the **"Shared on WhatsApp"** live card unfurl preview modal.
2. **Agent Registration & Timeline Tracking**:
   - Navigate to `/agent/register`
   - Walk through the 3-step wizard: personal details, LASRERA certificate upload, ERCAAN standing, CAC registration, and operating areas.
   - Submit to view the live "Pending Verification" timeline tracker.
3. **Admin Verification & Cadastral Audit Workstation**:
   - Navigate to `/admin/agents` to inspect the pre-seeded pending applicant (*"Engr. Babatunde Jinadu - PrimeShield Properties"*), verify credentials, and click **Approve** (the verified badge immediately appears publicly and logs to the Audit Trail).
   - Navigate to `/admin/documents` and click **"Launch Split Audit"** on the pending listing (`prop-30`, prime Admiralty Way plot): inspect the uploaded title deed on the left and the interactive Leaflet cadastral map with surveyed boundary polygon beacons on the right. Click **"Grant Badge with Today's Date"**.
4. **Badge Integrity Demonstration (Pin-Shift Lapse)**:
   - In `/admin/documents` (or inside the split-screen audit view), click **"Shift Pin (Test Lapse)"**.
   - Simulates an agent attempting to move property coordinates outside the surveyed boundary after receiving the badge.
   - The badge **immediately and automatically lapses**, revoking the verified badge, marking the audit notes with an alert, and writing a security event to `/admin/audit-log`.
5. **Agent Monetization & Listing Creation**:
   - Switch role to Agent, visit `/agent/billing`, and click **Upgrade to Premium**.
   - Test the Paystack checkout modal (use the one-click **"Autofill Nigerian Test Card"** helper) to complete the simulation, and review the failed-payment grace banner demo.
   - Visit `/agent/listings/new` to test the listing studio with photo quota checks, video uploader with mobile H.264 guidelines (max 2 minutes / 100 MB), and Leaflet pin dropper.
   - Review the **7-Day Expiry Reminder** on the Agent Dashboard (`/agent`) enforcing the 60-day freshness rule.
6. **Exclusive Sponsored Pop-up Demonstration**:
   - Navigate to `/properties?area=Ibeju-Lekki&sponsoredTrigger=true`
   - When searching prime corridors (Ibeju-Lekki or Ikoyi), a discrete, dismissible sponsored card appears in the lower corner without obscuring the viewport.
7. **Scope & Commercial Feature Roadmap**:
   - Navigate to `/scope` to review the complete matrix mapping each proposal deliverable to its interactive screen, culminating in The Edge Studio partnership call to action.

---

## Brand & Design Integrity Standards

- **Authentic Client Logo**: Original medallion artwork from `public/brand/logo.jpg` (cleaned of the blue overlay arrow) used across navbar, footer, favicon, and Open Graph share cards (`/brand/og-image.jpg`).
- **Naira Glyph Safety**: All prices and monetary amounts are rendered strictly in the body font (`font-sans` / Plus Jakarta Sans) to guarantee universal, unclipped rendering of the `₦` glyph.
- **Rents Shown Per Year**: All rental listings display prices strictly on an annual lease basis (e.g. `₦3.5m / year`).
- **Fictional Real Estate Agencies**: All agencies except Segalex Resources Global Limited are fictionalized (e.g. *Eko Horizon Realty*, *DwellStone Capital*, *Meridian Bay Advisory*, *Citadel Crest Homes*, *PrimeShield Properties*).
- **Segalex Credentials**: Segalex address, telephone, and email use clearly marked placeholders (`[Office address to be confirmed]`, `[Official phone line to be confirmed]`, `[Official email to be confirmed]`).
- **Local Media Pipeline**: All 40 listings use local WebP photography (< 250 KB each, max 1600px wide) and local MP4 video tours stored in `/public/images/listings/` and `/public/videos/`, with complete mappings in `/src/data/images-manifest.json` and attributions in `ATTRIBUTIONS.md`.
- **Optional Password Gate**: Set `PROTOTYPE_PASSWORD=your_password` in `.env.local` to gate the entire prototype behind `/gate` for private client sharing.
- **Accessibility & Motion**: Meets WCAG AA contrast standards, 44px min tap targets, and respects `prefers-reduced-motion`.

---

## Architecture & Technology Stack

- **Framework**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS + Custom Segalex Design Tokens
- **Design System**: Documented in [`DESIGN.md`](./DESIGN.md)
- **Icons**: Lucide React
- **Maps**: Leaflet + OpenStreetMap tiles via dynamic SSR-safe client components (`LeafletMap`)
- **Analytics & Charts**: Recharts for responsive agent performance and lead channels
- **State & Persistence**: Centralized `MarketplaceContext` saving to `localStorage` with 1-click **Reset Demo Data**

---

## Directory Structure

```
segalex/
├── public/                     # Client brand assets, local WebP photos, videos
│   ├── brand/                  # Cleaned logo.jpg, logo.png, og-image.jpg
│   ├── images/listings/        # Local WebP galleries: prop-1/ to prop-40/
│   ├── videos/                 # Local 720p tour-1.mp4 to tour-5.mp4 & posters
│   └── favicon.ico             # 64x64 brand icon
├── src/
│   ├── app/
│   │   ├── page.tsx            # Homepage
│   │   ├── properties/         # Search & Leaflet map split view
│   │   ├── property/[id]/      # Property details, records check & share sheet
│   │   ├── agents/             # Agent directory & profiles
│   │   ├── scope/              # Proposal feature matrix & The Edge Studio CTA
│   │   ├── login/ & register/  # Buyer authentication mock (Email + Google)
│   │   ├── gate/               # Private prototype password gate
│   │   ├── about/ & contact/   # Corporate story & verified contact placeholders
│   │   ├── packages/           # Dynamic tier comparison table
│   │   ├── how-verification-works/ # 4-step accreditation flowchart
│   │   ├── agent/              # Agent Portal (Dashboard, Listings, Studio, Billing)
│   │   ├── admin/              # Admin Console (Agents, Documents, Tiers, Audit Log)
│   │   └── account/            # Buyer dashboard
│   ├── components/
│   │   ├── common/             # BrandLogo, Navbar, Footer, PrototypeGuide
│   │   ├── marketplace/        # PropertyCard, LeafletMap, WhatsAppShareModal, ExclusivePopup
│   │   ├── agent/              # AgentSidebar, PaystackModal
│   │   └── admin/              # AdminSidebar, DocSplitViewer, AgentVerificationModal
│   ├── context/
│   │   └── MarketplaceContext.tsx # Centralized state, local storage & audit trail
│   ├── data/
│   │   ├── listings.ts         # 40 Lagos listings with local WebP & video paths
│   │   ├── agents.ts           # 12 Nigerian agents (fictional + Segalex)
│   │   ├── tiers.ts            # Free / Basic / Premium tier pricing and quotas
│   │   └── images-manifest.json# Image manifest mapping all 40 listings
│   └── middleware.ts           # Optional PROTOTYPE_PASSWORD gate middleware
├── ATTRIBUTIONS.md             # Creative commons media attributions
├── DESIGN.md                   # Visual tokens, badge rules, anti-slop guidelines
└── package.json
```

---

## How to Run & Deploy

```bash
# Install dependencies
npm install

# Run local development server
npm run dev

# Run production build check
npm run build
```

Open `http://localhost:3000` in any desktop or mobile browser. Use the floating **Prototype Guide** in the bottom-right corner to explore roles and presentation journeys.
# segalex-frontend
