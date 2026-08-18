# Plan: Add 43" Floor Standing Non-Touch Digital Signage

Add a new product entry to the catalog based on the extracted specifications for the "ORTEQ 43inch Floor Standing Non-Touch Digital Signage".

## User Review Required

> [!IMPORTANT]
> I will use a placeholder image for the new 43" Floor Standing Signage until a specific asset is provided or generated.

## Proposed Changes

### Content Integration

#### [src/lib/site-data.ts](src/lib/site-data.ts)
- Add the 43" Floor Standing Non-Touch Digital Signage to the `PRODUCTS` array.
- **Specifications to be included:**
  - Name: ORTEQ 43" Floor Standing Non-Touch Digital Signage
  - Applications: Retail, Malls, Airports, Corporate Lobbies
  - Features: Industrial grade panel, 24/7 operation, tempered glass protection, integrated media player
  - Specs: 43" Display, 1920x1080 Resolution, 450-500 nits Brightness, Android OS

### Verification Plan

- Check the products listing page (`/products`) to ensure the new standee appears.
- Navigate to the new product detail page (`/products/43-floor-standing-signage`) and verify all specifications are rendered correctly.
- Verify the "Request Quote" and "Download Datasheet" buttons work as expected.
