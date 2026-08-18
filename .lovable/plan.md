# Production Polish Plan — Contact Details & Content Completeness

Apply the requested contact information and ensure all product/detail pages are properly linked.

## Proposed Changes

### 1. Update Contact Information
- **File**: `src/routes/contact.tsx`
- **Updates**:
  - Replace placeholder phone number with `+91 9524733999, +91 8122273295, +91 9840909409`.
  - Replace placeholder email with `admin@orteq.in`.
  - Replace placeholder address with `37, Old No.62, South West Boag Road, T. Nagar, Chennai-600017`.

### 2. Complete Content & Internal Linking
- **Action**: Review and ensure every product in `src/lib/site-data.ts` has a fully rendered detail page accessible from the homepage/mega-menu.
- **Verification**: Check `src/routes/products.$slug.tsx` for data availability.

## Verification Plan

### Automated Checks
- **Build**: Run `bun run build` to ensure no routing or type errors.
- **Syntax**: Verify each file after modification.

### Manual Verification
- Check the contact page UI to confirm the new details are rendered clearly.
- Navigate from the homepage to at least 3 different product categories to verify linking.
