
# ORTEQ India — Premium Website Build Plan

Stack: TanStack Start (React + Vite) + Tailwind v4 + Framer Motion + Lovable Cloud (Postgres, Auth, Storage). Next.js/Prisma/MySQL from the brief are replaced by equivalents on the supported stack — feature parity is preserved.

Brand: white base, red accent `#D71920`, dark grey neutrals, glass morphism, soft shadows, rounded cards. Type: Montserrat (display), Poppins (subhead), Inter (body) loaded via `<link>` in `__root.tsx`.

## Phase 0 — Design directions (do first)

1. Generate 3 rendered homepage directions (locked palette + type + premium bar above Samsung/LG/Sony Business):
   - **A — "Precision Studio"**: Apple-grade minimalism, oversized hero product, generous whitespace, restrained red used as a single punctuation mark, thin dividers, monochrome imagery.
   - **B — "Signal Grid"**: Sony/Samsung-editorial bento of product tiles under a video hero, layered glass cards, sharper typographic contrast, scroll-driven parallax product reveal.
   - **C — "Kinetic Showcase"**: cinematic full-bleed video hero with animated product carousel, GSAP scroll pinning, larger red accents, denser industries strip, motion-forward.
2. User picks one → locks composition, tokens, type, motion register for every subsequent page.

## Phase 1 — Foundation + Homepage + Global shell

- Design tokens in `src/styles.css` (white bg, `#D71920` primary, dark-grey scale, radii, shadows, glass utilities).
- Root shell: sticky header with mega menu (Products/Industries/Solutions/Support), footer (quick links, social, newsletter), floating WhatsApp + call, smooth scroll, page transitions.
- Homepage sections: full-width video hero, animated headline, three CTAs (Explore Products / Request Quote / Download Catalogue), scrolling trusted-by logo strip, animated counters (Years/Projects/Cities/Clients), product-category slider, industries grid, latest projects, testimonials, why-ORTEQ, latest blogs, dealer CTA.
- SEO: Organization + WebSite JSON-LD in `__root`, per-route head metadata, robots.txt, dynamic `/sitemap.xml` server route, canonical + og:* on every leaf.

## Phase 2 — Products (9 detail pages + index)

Reusable `ProductDetail` template driven by CMS data: hero banner, applications, features, specs table, advantages, downloadable datasheet, gallery, video embed, FAQs, related products, quote form. Product schema JSON-LD per page. Pages: All-In-One, Digital LED Walls, Commercial Displays, LCD Video Walls, Digital Standees, Self-Service, POS, Industrial, Interactive Flat Panels.

## Phase 3 — Industries (12) + Solutions (12)

Two more reusable templates (Challenges → ORTEQ Solutions → Recommended Products → Case Studies → Gallery → CTA for industries; hero + scenarios + products + CTA for solutions). Content stored in Cloud so admin can edit.

## Phase 4 — Secondary marketing pages

About (overview, mission, vision, values, leadership, infra, manufacturing, quality, service network), Projects (filterable interactive gallery, before/after), Downloads (brochures, datasheets, software, drivers, manuals, warranty, certificates), Support (raise ticket, AMC, warranty, remote support, FAQs, installation), Blog (list + article + category), Contact (map, branches, sales team, WhatsApp, email, form), Dealer Registration, Become Partner. FAQ + Breadcrumb schema where applicable.

## Phase 5 — Backend, CMS, portals, AI

Enable Lovable Cloud, then:

- **Schema (migrations)**: `products`, `product_media`, `categories`, `industries`, `solutions`, `projects`, `blog_posts`, `downloads`, `testimonials`, `clients`, `faqs`, `dealers`, `quote_requests`, `contact_leads`, `support_tickets`, `newsletter_subscribers`, `partners`, `user_roles` (enum admin/editor/dealer/support/customer) + `has_role()` security-definer. GRANTs + RLS on every table (public reads via narrow anon SELECT on marketing content; writes gated by role).
- **Auth**: email/password + Google (via Lovable broker). `/auth` public page; `_authenticated/` layout for portals.
- **Admin dashboard** at `/_authenticated/admin/*`: products, categories, blog, downloads, dealer leads, quote requests, contact leads, newsletter, SEO manager (title/description/OG overrides per route stored in `seo_overrides`).
- **Dealer portal** `/_authenticated/dealer`: order enquiries, downloads, co-branded assets.
- **Customer portal** `/_authenticated/account`: quote history, saved products.
- **Support portal** `/_authenticated/support`: ticket list + detail.
- **Forms** (all with Zod validation, honeypot + rate-limited server fns): Quote, Dealer, Support, Newsletter, Contact, Career.
- **AI features via Lovable AI Gateway** (`openai/gpt-5.5` default): semantic product search, product recommender (embeddings on product descriptions stored in a `product_embeddings` table), smart filters, product-comparison assistant, live chat widget.
- **Public API routes** under `src/routes/api/public/`: newsletter subscribe, quote submit webhook, sitemap ping.

## Phase 6 — Performance, SEO polish, launch

Image lazy-loading, `vite-imagetools` for AVIF/WebP variants, preload LCP hero, dynamic imports for heavy sections (map, chat, video), font-display swap. Lighthouse pass targeting 95+. Rescan SEO, fix findings, wire canonical/og:image per leaf, submit sitemap. Then publish.

## Technical notes

- Data reads: loader → `queryClient.ensureQueryData(queryOptions)` + `useSuspenseQuery` in components.
- Server logic: `createServerFn` (protected fns use `requireSupabaseAuth` + `has_role` for admin).
- Admin writes never use `supabaseAdmin` for authorization checks — role verified via `context.supabase.rpc('has_role', ...)` first.
- Assets (hero video, product renders, client logos) generated via Lovable image tools and uploaded through `lovable-assets` CLI so the repo stays lean.
- Every migration that creates a public-schema table ships GRANTs + RLS + policies in the same file.
- No Next.js, no Prisma, no MySQL, no Supabase Edge Functions — replaced by TanStack server fns and Lovable Cloud Postgres.

## What ships after each phase

Phase 0 → three clickable homepage previews.
Phase 1 → live homepage + shell, publishable.
Phase 2–4 → full public site, still mock-data-friendly.
Phase 5 → dynamic CMS + auth + portals + AI.
Phase 6 → performance + SEO cleared, published to `.lovable.app`, custom domain guidance for `orteq.in`.

Approve to start Phase 0 (design directions).
