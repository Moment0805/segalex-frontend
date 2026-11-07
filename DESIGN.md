# DESIGN SYSTEM: SEGALEX PROPERTY HUB

**Segalex Resources Global Limited** (RC: 7351342)  
*"Creating Wealth Through Real Estate"*  
Design System & Interface Guidelines by **The Edge Studio**

---

## 1. Brand Philosophy & Tone of Voice

Segalex Property Hub is designed as Nigeria’s most trusted real estate exchange for verified properties in Lagos. In a market where property fraud, counterfeit survey plans, and unverified agents cost buyers millions of Naira annually, Segalex communicates **institutional confidence, regulatory rigor, and Lagos commercial energy**.

### Core Pillars
1. **Private-Bank Confidence**: Clean lines, generous whitespace, authoritative typography, and structured document auditing.
2. **Lagos Energy & Realities**: Pragmatic filters reflecting how Lagosians actually transact (rents priced strictly *per year*, land plots in *m²*, titles explicitly named: *Governor's Consent, C of O, Gazette, Deed of Assignment*).
3. **Uncompromising Verification**: Distinct, unmissable verification badges backed by transparent inspection records and an explicit legal disclaimer: *"This is a records check, not a guarantee of title."*
4. **Anti-Slop & Anti-Generic**: Zero generic AI gradient blobs or vague template placeholders. Every component serves an exact functional and communicative purpose.

---

## 2. Color Tokens & Semantic Roles

| Token Name | Hex Code | Semantic Role & Usage |
|---|---|---|
| **Ink** | `#151314` | Primary brand dark, luxury contrast sections, deep authority, navigation, hero headers |
| **Naija Green** | `#008751` | Primary action color, verified badge, trust indicators, primary CTA buttons |
| **Deep Green** | `#00563A` | Button hover state, trust accents, active filter fills |
| **Gold / Yellow** | `#FFC800` | Exclusively for paid/featured highlights, Premium agent tiers, and sponsored tags |
| **Off-White Canvas** | `#FAFAF7` | Default site background, clean, warm, easy on the eyes in Lagos sunlight |
| **Surface Light** | `#FFFFFF` | Card containers, modal windows, elevated sheets |
| **Warm Grey Surface** | `#F1F0EA` | Secondary cards, pill filters, table headers, subdued backgrounds |
| **Border Neutral** | `#E4E3DB` | Clean structural dividing lines, input outlines |
| **Body Text** | `#1B1B1B` | High-contrast primary reading text (WCAG AAA compliant on light) |
| **Muted Text** | `#5F6368` | Secondary labels, timestamps, metadata, supporting text |
| **Error / Alert** | `#D93025` | Warning tags, failed status, destructive actions |
| **Success Alert** | `#0F9D58` | Verified status confirmation, toast notifications |

### Rule on Color Semantics
> **Never use color alone to convey meaning.**  
> Every badge, tag, and indicator **must include clear text** (e.g., "Verified Agent", "Documents Checked", "Sponsored", "Featured", "Pending Review"). Green is reserved for trust, compliance, and primary actions. Gold is strictly reserved for paid, sponsored, and premium tier visibility.

---

## 3. Typography Hierarchy

### Typefaces
- **Headings & Display**: `Barlow Condensed` (Google Fonts via `next/font`), Bold/Semibold (weights 600, 700, 800), tracking slightly tightened or uppercase spaced for strong architectural presence.
- **Body & Numerical Data**: `Plus Jakarta Sans`, clean geometric neo-grotesque with exceptional legibility on mobile screens and WhatsApp webviews.

### Mandatory Price Rendering Rule
> **All prices and Naira monetary amounts MUST be rendered in the body font (`Plus Jakarta Sans` / `font-sans`), NEVER in condensed display fonts.**  
> Condensed display typefaces frequently lack the Nigerian Naira currency symbol (`₦`, Unicode `U+20A6`) or clip its double crossbar glyph. Using `font-sans` guarantees unclipped, crisp, and accessible price tags across all mobile and desktop viewports.

### Scale
- **Display 1 (Hero)**: `3rem` to `4.25rem` (48px–68px), `font-bold`, uppercase, leading tight (`1.05`)
- **Heading 1**: `2.25rem` to `2.75rem` (36px–44px), `font-bold`, tracking tight
- **Heading 2**: `1.75rem` to `2rem` (28px–32px), `font-semibold`
- **Heading 3**: `1.25rem` to `1.5rem` (20px–24px), `font-semibold`
- **Body Large**: `1.125rem` (18px), line height `1.6`
- **Body Regular**: `1rem` (16px), line height `1.5`
- **Body Small / Meta**: `0.875rem` (14px), line height `1.4`
- **Microcopy / Badges**: `0.75rem` (12px), `font-bold`, tracking wider (`uppercase tracking-wider`)

---

## 4. Component Standards

### 1. Verification Badges
- **Verified Agent Badge**:
  - Background: `bg-[#008751]/10` with border `border-[#008751]/30`, text `text-[#008751]`
  - Icon: ShieldCheck (Lucide)
  - Label: `VERIFIED AGENT • LASRERA REG`
- **ERCAAN Member Badge**:
  - Background: `bg-emerald-50`, border `border-emerald-200`, text `text-emerald-900`
  - Icon: Award (Lucide)
  - Label: `ERCAAN MEMBER`
- **Documents Checked Badge**:
  - Background: `bg-[#151314]`, text `text-white`, accent `border-[#FFC800]`
  - Icon: FileCheck2 (Lucide)
  - Label: `DOCUMENTS CHECKED • [DATE]`
- **Featured / Sponsored Badge**:
  - Background: `bg-[#FFC800]`, text `text-[#151314]`, `font-bold`
  - Label: `FEATURED` or `SPONSORED`

### 2. Buttons & Actions
- **Primary Action (Trust / CTA)**: Solid `#008751`, text `#FFFFFF`, rounded-lg, 44px min height. Hover `#00563A`. Subtly lifts 1px on hover, presses on click.
- **WhatsApp Direct Action**: Solid `#25D366` or `#008751`, text `#FFFFFF`, with WhatsApp message icon. Launches prefilled WhatsApp chat with property title and price.
- **Secondary Action**: Border `#151314`, text `#151314`, transparent background. Hover `bg-[#151314] text-white`.
- **Tertiary / Ghost**: Soft warm grey surface `bg-[#F1F0EA]`, text `#1B1B1B`, hover `bg-[#E4E3DB]`.
- **Destructive**: `bg-red-50 text-red-600 border border-red-200 hover:bg-red-100`.

### 3. Property Cards
- Contained surface with `1px` subtle border `#E4E3DB`, rounded-xl (`12px`), overflow hidden.
- Image container (aspect ratio 4:3 or 16:10) with verified badges overlaid neatly in top corners.
- Play video icon overlay when a video tour is available.
- Content zone: Price prominently displayed (e.g. `₦120,000,000` or `₦4,500,000 / year`), bed/bath/sqm icons, exact district (e.g. "Lekki Phase 1, Lagos"), agent badge teaser, and interactive favorite heart.
- Hover state: Card lifts `2px`, image gently scales `1.02` within its frame.

### 4. Search Filter Bar
- Mobile-first segmented control: `Buy` vs `Rent`.
- Fast selects for: Lagos Zone, Property Type, Budget, Bedrooms.
- One-click quick filters: "Documents Checked Only", "Verified Agents Only".
- Sticky execution on scroll.

### 5. Document Inspection Workstation (Admin)
- High-efficiency split screen:
  - Left: Cadastral document viewer with zoom & pan.
  - Right: OpenStreetMap / Leaflet tile container showing mapped coordinate boundaries vs physical pin.
  - Action tray: Verification checklist with one-click approval & audit logging.

---

## 5. Motion & Interaction Principles

1. **Subtle Elevation, Never Chaotic**: Use Framer Motion for graceful layout transitions and page entry.
2. **Hover Micro-Interactions**:
   - Cards lift `2px` with a gentle drop shadow.
   - Images zoom `1.02` inside an overflow-hidden frame.
   - Buttons step slightly on hover and compress `scale(0.98)` on click.
3. **Animated Number Count-Ups**:
   - Homepage trust metrics (Verified Agents, Documents Checked, Lagos Zones) smoothly count up on scroll into viewport.
4. **Accessibility First (`prefers-reduced-motion`)**:
   - Motion is automatically disabled or reduced to simple opacity fades if the user's operating system requests reduced motion.
5. **Touch Targets**:
   - All interactive elements adhere strictly to a minimum touch target size of `44px x 44px` for seamless mobile usability.

---

## 6. Component Directory Architecture

```
src/
├── app/                  # Next.js App Router pages (38 routes)
├── components/           # UI primitives, marketplace, agent, and admin components
├── context/              # Centralized MarketplaceContext & localStorage provider
├── data/                 # 40 Lagos listings, 12 agents, tiers, and images-manifest.json
├── types/                # TypeScript schemas for properties, audits, and users
└── lib/                  # Formatters (Naira, rent per year, dates) and map helpers
```

---

## 7. Media & Asset Pipeline Standards

1. **Local WebP Photography**:
   - All listing photography is stored locally in `/public/images/listings/<listing-id>/`.
   - Never hotlinked from external servers.
   - Converted to WebP format, maximum width of `1600px`, and strictly under `250 KB` per file for lightning-fast loading on Nigerian 3G/4G networks.
2. **Video Tours**:
   - Video walkthroughs stored locally in `/public/videos/tour-*.mp4`.
   - 720p H.264 compression, duration 10–20 seconds, file size under `4 MB`.
   - Accompanying local WebP poster frames.
3. **Images Manifest**:
   - Mapped cleanly via `/src/data/images-manifest.json` with descriptive alt tags for accessibility.

---

## 8. Badge Integrity & Cadastral Verification Rule

1. **Documents Checked Badge**:
   - Awarded solely after side-by-side cadastral comparison confirming that registered survey coordinates match the physical plot location and title folio.
2. **Coordinate Shift Automatic Lapse**:
   - If an agent modifies property coordinates post-audit, the system detects beacon perimeter disparity and **immediately revokes the Documents Checked badge**, logging the event to `/admin/audit-log`.


