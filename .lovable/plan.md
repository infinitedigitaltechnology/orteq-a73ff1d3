
# Phase 5 — CMS, Dealer Portal & Support Portal

Enable Lovable Cloud (Postgres + Auth + Storage) and layer three authenticated experiences on top of the existing public site: an admin CMS, a dealer portal, and a support portal. All writes go through `createServerFn` with `requireSupabaseAuth`; role-based access is enforced via a `has_role()` security-definer function.

## 1. Backend foundation

Enable Lovable Cloud, then ship a single migration that creates:

**Auth & roles**
- `app_role` enum: `admin`, `editor`, `dealer`, `support`, `customer`
- `user_roles(user_id, role)` — separate table, unique per pair
- `profiles(id, full_name, company, phone, created_at)` auto-created via `handle_new_user()` trigger on `auth.users`
- `has_role(_user_id uuid, _role app_role)` security-definer function used by every RLS policy

**CMS content tables** (all with slug, status draft/published, seo_title, seo_description, cover_image, body, timestamps):
- `products` (+ `product_media`, `product_specs`, `product_faqs`)
- `industries`, `solutions`, `projects`, `blog_posts`, `downloads`

**Portal tables**
- `dealers` — dealer application (company, GST, city, region, status: pending/approved/rejected)
- `quote_requests` — dealer-submitted leads (product refs, customer info, value, status)
- `quote_status_history` — append-only status log (quote_id, from_status, to_status, note, changed_by, at)
- `support_tickets` — subject, description, priority, status (open/in_progress/waiting_customer/resolved/closed), created_by, assigned_to
- `ticket_messages` — threaded replies (ticket_id, author_id, body, created_at)
- `ticket_attachments` — file metadata pointing at Storage
- `ticket_status_history` — append-only

Every `CREATE TABLE` ships `GRANT`s (authenticated + service_role; anon SELECT only on published marketing content), `ENABLE ROW LEVEL SECURITY`, and policies:
- Public reads on published marketing rows (`status = 'published'`) for anon
- Admins/editors: full write on CMS tables via `has_role`
- Dealers: read/write only their own `dealers`, `quote_requests`, and can read `quote_status_history` for their own quotes
- Customers/dealers: read/write their own `support_tickets` and message threads; support role reads/writes all
- Owner-scoped SELECT policies alongside public ones so authors can see their own draft rows

**Storage buckets** (via `supabase--storage_create_bucket`):
- `cms-media` (public) — product images, blog covers, project shots
- `downloads` (public) — datasheets/brochures
- `ticket-attachments` (private) — RLS on `storage.objects` restricts to ticket owner + support

**Triggers**: on quote/ticket status change, insert a row into the `_history` table with `auth.uid()` as `changed_by`.

## 2. Auth surface

- Public `/auth` route: email/password sign-up + Google OAuth (via `lovable.auth.signInWithOAuth`). Sign-up asks for role intent (customer vs dealer application) and creates the profile row via trigger.
- Managed `_authenticated/route.tsx` layout (ssr:false, redirects to `/auth`) — auto-created by integration.
- Nested pathless layouts for role gating:
  - `_authenticated/_admin/` — requires `admin` or `editor`
  - `_authenticated/_dealer/` — requires `dealer` (or shows "pending approval" if `dealers.status != 'approved'`)
  - `_authenticated/_support/` — requires `support` or `admin`
- Header updates: session-aware account menu (Sign in → avatar + role-based dashboard link + sign out).

## 3. Admin CMS — `/admin/*`

Dashboard shell with sidebar nav. For each content type (products, industries, solutions, projects, blog posts, downloads):
- List view: table with search, status filter, published toggle
- Create/edit form: slug, title, cover image upload (to `cms-media`), rich body (markdown textarea for v1), SEO fields, status
- Delete with confirm
- Public pages (`/products`, `/products/$slug`, `/industries`, etc.) refactor to load from Cloud via `useSuspenseQuery` + a public server fn using the publishable-key server client, keeping the current `site-data.ts` content as a one-time seed inserted in the migration.

Cross-cutting admin pages:
- Dealer applications: approve/reject (updates `dealers.status` and grants `dealer` role via admin server fn)
- Quote requests inbox: view all, assign, update status
- Support tickets inbox: same, for support role
- Newsletter subscribers export (basic list)

## 4. Dealer portal — `/dealer-portal/*`

- `/dealer-portal` dashboard: application status, quick stats (open leads, quotes this month)
- `/dealer-portal/apply` — dealer registration form (only if no `dealers` row yet)
- `/dealer-portal/leads` — list of own quote requests, filters by status
- `/dealer-portal/leads/new` — submit a new quote request (customer details, product picker from CMS, value, notes)
- `/dealer-portal/leads/$id` — detail with full **status history timeline** (from `quote_status_history`), plus internal notes thread

Existing public `/dealer` marketing page stays; adds a CTA linking to `/auth?intent=dealer`.

## 5. Support portal — `/support-portal/*`

Public `/support` page keeps the marketing form but now, when the user is signed in, redirects submissions into an authenticated ticket.

- `/support-portal` — list of own tickets with status badges
- `/support-portal/new` — create ticket (subject, priority, description, attachments uploaded to private `ticket-attachments` bucket)
- `/support-portal/$id` — ticket detail:
  - Threaded messages (customer + support replies)
  - Attachment list with signed URLs
  - **Status history timeline** (open → in_progress → resolved etc. with timestamps and actor)
  - Reply composer with optional attachments
- Support/admin see all tickets under `/admin/tickets` with assign + status controls.

## 6. Public site data migration

- Refactor `products.tsx`, `products.$slug.tsx`, `industries.tsx`, `industries.$slug.tsx`, `solutions.*`, `projects.tsx`, `blog.tsx`, `downloads.tsx` to fetch from Cloud via public server fns.
- Seed initial rows in the migration from current `site-data.ts` so nothing on the live site disappears.
- `site-data.ts` kept only for static config (nav labels, brand copy).

## 7. Out of scope for this phase

- AI features (semantic search, recommender, chat) — deferred to a follow-up phase.
- Rich text editor (using markdown textarea for v1); can upgrade to TipTap later.
- Email notifications on ticket/quote updates — deferred.
- Newsletter double opt-in and campaign sending — deferred.

## Technical section

- **Server fns**: one `*.functions.ts` module per domain (`cms/products.functions.ts`, `dealer/leads.functions.ts`, `support/tickets.functions.ts`, `admin/moderation.functions.ts`). Admin/support mutations use `requireSupabaseAuth` + `context.supabase.rpc('has_role', ...)` before any privileged work; `supabaseAdmin` loaded via `await import()` inside handler only for role grants and cross-user reads that RLS can't express.
- **Reads**: `queryOptions` + `ensureQueryData` in loaders + `useSuspenseQuery` in components; public loaders call anon-safe fns, `_authenticated/*` loaders call protected fns.
- **File uploads**: browser uploads directly to Storage via the browser client using signed policies (public bucket for CMS media, RLS for ticket attachments). Server fn stores the returned path on the row.
- **Role assignment on approval**: admin server fn calls `supabaseAdmin.from('user_roles').insert(...)` after verifying caller is admin via authenticated `has_role` rpc.
- **Status history**: DB triggers on `quote_requests.status` and `support_tickets.status` writing to their `_history` tables — no application code required to keep the timeline consistent.
- **Bearer middleware**: verify `attachSupabaseAuth` (or existing project middleware) is registered in `src/start.ts`; add if missing.
- **Route naming**: `dealer-portal` and `support-portal` chosen to avoid clashing with existing public `/dealer` and `/support` marketing routes.

## Deliverable order

1. Enable Cloud + ship schema migration + seed
2. Auth page + role-gated layouts + header account menu
3. Admin CMS (list/edit/delete for all 6 content types) + refactor public pages to load from Cloud
4. Dealer portal (apply, leads, quote submission, timeline)
5. Support portal (tickets, threaded messages, attachments, timeline) + admin/support inbox
6. Smoke test all flows end-to-end, then publish

Approve to enable Lovable Cloud and start the migration.
