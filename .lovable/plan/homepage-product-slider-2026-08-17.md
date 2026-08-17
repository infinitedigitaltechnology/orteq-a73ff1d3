# Homepage product slider

Add an auto-sliding image carousel of products to the homepage.

## What it looks like
- A full-width section titled "The ORTEQ range" placed between the client marquee and the bento grid.
- Each slide is a large product image card with the product name, tagline and a "View product" link.
- Desktop shows about 3 cards at once, tablet 2, mobile 1 — with peek of the next slide.
- Auto-advances every ~4 seconds, pauses on hover, loops infinitely.
- Prev/next arrow buttons plus dot indicators; swipe works on touch.
- Whole card links to the product detail page.

## Technical notes
- New component `src/components/site/ProductCarousel.tsx` using the existing shadcn `carousel.tsx` (embla is already installed) with `loop: true` and a small autoplay effect via `setInterval` on the carousel API (no new dependency).
- Data comes from `PRODUCTS` in `src/lib/site-data.ts` — no new data or backend changes.
- Styling uses existing tokens (platinum canvas, indigo ink, Signal Red accent), rounded-3xl cards, hairline borders, hover scale on the image.
- `src/routes/index.tsx` renders `<ProductCarousel />` after `<MarqueeClients />`.
- Images keep `loading="lazy"` and descriptive alt text.
