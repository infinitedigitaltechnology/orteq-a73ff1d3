# Replace the ORTEQ Logo Site-Wide

Use the uploaded ORTEQ wordmark ("ORTEQ — Future Technology In Your Hands") everywhere the brand mark appears.

## What changes

### 1. Host the logo
- Upload the file to the CDN and store a pointer at `src/assets/orteq-logo.png.asset.json`.
- The original binary is not committed into the repo.

### 2. Rewrite the logo component
- **File**: `src/components/site/Logo.tsx`
- Render the uploaded wordmark image directly instead of the current `/logo.png` guess plus SVG fallback plus separate "Orteq / India" text.
- Since the uploaded image already contains the brand name and tagline, the duplicate text spans are removed.
- Keep the existing `variant` prop ("header" / "footer") so the header and footer sizing stays as-is; header renders a compact height, footer slightly larger.
- Add a white-panel-safe treatment for the footer (the mark is dark ink on white), so it stays legible on the dark footer surface.

### 3. Favicon
- Generate a square, padded 64x64 `public/favicon.png` from the same logo.
- Point the root route's icon link at it in `src/routes/__root.tsx` and remove the stale `public/favicon.ico`.

## Where it appears
No other files need edits — `SiteHeader.tsx` and `SiteFooter.tsx` already consume the shared `Logo` component, so both update automatically.

## Verification
- Run a production build to confirm the pointer import and route metadata resolve.
- Check the header and footer render the new mark cleanly at desktop and mobile widths.
