
# Palette Update — Midnight Indigo + Red

Apply the selected palette across the site without touching layout, copy, or business logic.

## Palette

- Deep Indigo (base ink / dark surfaces): `#0A0F2C`
- Indigo Elevated (secondary dark, header/footer, hero backdrop): `#1A2350`
- Signal Red (primary accent — CTAs, links, highlights): `#D71920`
- Platinum (background canvas, light surfaces): `#F5F6FA`
- Supporting neutrals derived from indigo (hairline, muted text)

## Scope of changes

Single file: `src/styles.css`

1. Update `:root` tokens:
   - `--background` → platinum `#F5F6FA`
   - `--foreground` / `--ink` → deep indigo `#0A0F2C`
   - `--ink-soft` / `--muted-foreground` → indigo-tinted grey
   - `--brand-dark` → `#1A2350` (elevated indigo for dark bands)
   - `--hairline` / `--border` → cool indigo-tinted hairline
   - `--secondary` → very light indigo tint (replaces neutral grey)
   - `--primary` stays Signal Red `#D71920`
2. Update `.dark` tokens so dark mode uses `#0A0F2C` base and `#1A2350` cards, keeping red accent.
3. Update `::selection` to indigo-tinted red highlight for consistency.
4. Keep glass-panel utility but retint its border toward indigo.

All values written in `oklch()` to match existing token format.

## Not changing

- No component, route, or copy edits.
- Typography (Montserrat / Poppins / Inter) unchanged.
- Layouts, hero image, bento grid, marquee — untouched.
- No token renames — every existing utility (`bg-primary`, `text-foreground`, `border-hairline`, `bg-foreground`, etc.) continues to work; only the values behind them shift.

## Verification

- Load `/`, `/products`, `/industries`, `/contact`, `/auth` in preview and confirm: white → platinum canvas, dark CTA band renders indigo (not near-black), red accents remain crisp, text contrast passes on both light and dark surfaces.
