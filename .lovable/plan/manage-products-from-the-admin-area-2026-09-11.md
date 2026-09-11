# Manage products from the admin area

Right now the admin area can save products into the database, but the public
Products pages still show a fixed built-in list. Anything added in admin never
appears on the site. This connects the two.

## What you'll be able to do

- Open Admin > Products, click New, fill in the details (name, tagline,
  description, image, category, applications, key features, advantages, specs)
  and set it to Published.
- The new product immediately shows on the Products page, gets its own detail
  page, and appears in the downloads list.
- Editing or unpublishing a product updates the site the same way.
- The existing built-in products stay visible; a database product with the same
  short name replaces the built-in one.

## Changes

1. **Database** — add two fields to the products record: `applications` and
   `advantages` (both lists), so product detail pages are complete.
2. **New file `src/lib/products.functions.ts`** — a public read of published
   products, converted into the same shape the pages already use, merged with
   the built-in list.
3. **`src/routes/products.index.tsx`** — load the merged list instead of the
   fixed one.
4. **`src/routes/products.$slug.tsx`** — look up the product in the merged list.
5. **`src/routes/_authenticated/admin.tsx`** — add Applications and Advantages
   input boxes to the product form.

Nothing else changes: login, portals, other pages and the built-in product
content stay exactly as they are.

## Verification

- Build must pass.
- Create a test product in admin, confirm it appears on /products and its detail
  page, then delete it.
