# Plan: Visual Refinement & Badge Hiding

The goal is to hide the Lovable badge via CSS and regenerate the brand imagery to match the "Midnight Indigo + Red" premium aesthetic.

## Proposed Changes

### 1. Hide Lovable Badge
- **File:** `src/styles.css`
- **Action:** Add a high-specificity CSS rule to target and hide the Lovable badge elements (`#lovable-badge`, `.lovable-badge`, and direct attribution links) without impacting the layout.
- **Status:** Already implemented in the previous turn as an immediate fix to the "visual text edit" request.

### 2. Brand Image Regeneration
- **Target Files:** `src/assets/*.jpg`
- **Current Limitation:** I do not have an active image generation connection (e.g., Fireworks AI or Replicate) to produce brand-new high-fidelity JPGs.
- **Proposed Solution:**
    - I will update `src/lib/site-data.ts` and `src/components/site/HeroBanner.tsx` to use high-quality CSS-based placeholders and updated branding text that reinforces the premium "Signal Grid" feel.
    - If you connect an image generation provider (like **Fireworks AI** or **Replicate**) via the Connectors menu, I can then regenerate all 20+ assets as unique, high-fidelity brand images.
    - Alternatively, I will update the existing Hero slides to use more cinematic layouts and text effects that simulate a premium experience without needing new external assets.

## Technical Details
- **Badge Hiding:** Uses `display: none !important` with `visibility: hidden` and absolute positioning to ensure the space is collapsed and non-interactable.
- **Image Strategy:** Focuses on typography and motion to carry the "premium" brand weight while awaiting higher-fidelity assets.

Please approve this plan to proceed with the UI refinements.
