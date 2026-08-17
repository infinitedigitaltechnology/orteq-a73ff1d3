# Homepage slider expansion — Kiosk, Drone, Interactive Panels

Add Kiosk, Drone, and Interactive Flat Panels (classroom) to both homepage sliders and keep the ORTEQ branding through text and product links.

## What changes

### 1. Hero banner (top slider)
- Expand the `SLIDES` array in `src/components/site/HeroBanner.tsx` from 3 to 6 slides.
- Add new featured slides:
  - **Self-Service Kiosks** — check-in, ordering, and public-service automation.
  - **Commercial Drones** — surveillance, inspection, and aerial intelligence.
  - **Interactive Flat Panels in classrooms** — smart-classroom collaboration.
- Reuse existing product images from `src/lib/site-data.ts` for the new slides.
- Each slide keeps the existing `kicker`, `title`, `highlight`, `copy`, `kind`, and `slug` pattern and links to the relevant product detail page.
- Maintain the existing premium dark overlay, auto-advance, pause-on-hover, dots, and arrow controls.

### 2. Product carousel (below the marquee)
- Confirm the carousel already pulls from `PRODUCTS`, so Kiosk, Drone, and IFP are present.
- Reorder the `PRODUCTS` array so the three featured products appear first in the carousel: Interactive Flat Panels, Self-Service Displays, Drones, then the rest.
- Keep the existing loop, swipe, arrows, dots, hover-pause, and card-to-product-page linking.

### 3. Branding
- Keep ORTEQ branding through the existing text hierarchy (eyebrow labels, product names, CTAs) and product-page links.
- No logo overlay or image regeneration is needed.

## Files to edit
- `src/components/site/HeroBanner.tsx` — expand slides.
- `src/lib/site-data.ts` — reorder products for the carousel.

## Verification
- Preview the homepage on desktop and mobile.
- Confirm the hero banner shows all 6 slides, auto-advances, and links correctly.
- Confirm the product carousel shows Kiosk, Drone, and IFP among the first cards.
