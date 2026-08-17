---
name: Logo Update Plan
description: Optimized and Update the ORTEQ logo in the website header and footer.
type: feature
---

# Plan: Logo Optimization and Update

I will update the current text-based logo with a premium SVG-based brand identity for ORTEQ.

## Files to be modified:
1.  **`src/components/site/Logo.tsx`**: Create a new reusable logo component that encapsulates the ORTEQ brand identity (SVG + Typography).
2.  **`src/components/site/SiteHeader.tsx`**: Replace the current text-based logo with the new `<Logo />` component.
3.  **`src/components/site/SiteFooter.tsx`**: Replace the current text-based logo with the new `<Logo />` component (footer variant).

## Technical Details:
- The logo will use the brand colors: Midnight Indigo (#0A0F2C) and Signal Red (#D71920).
- The SVG will be optimized for fast loading and crisp rendering on all displays.
- The component will support different variants (header vs footer) and sizes.

I will now proceed with creating the logo component and updating the site.
