---
name: Pinnacle Construction
description: A classic Nagpur real-estate marketing site earning trust through corporate craft, not novelty.
colors:
  surface: "#faf8f5"
  surface-raised: "#ffffff"
  ink: "#1c2029"
  ink-muted: "#565d6d"
  border: "#e7e2d9"
  pinnacle-blue-50: "#eaf3fb"
  pinnacle-blue-100: "#cfe4f5"
  pinnacle-blue-400: "#2f86c4"
  pinnacle-blue-500: "#1c6dae"
  pinnacle-blue-600: "#14568a"
  pinnacle-blue-700: "#0f4570"
  pinnacle-crimson-50: "#fbeaee"
  pinnacle-crimson-100: "#f3ccd5"
  pinnacle-crimson-400: "#c9385a"
  pinnacle-crimson-500: "#ae1f3d"
  pinnacle-crimson-600: "#8a1830"
  pinnacle-crimson-700: "#6d1327"
typography:
  headline:
    fontFamily: "Sora, ui-sans-serif, system-ui"
    fontSize: "clamp(2.25rem, 4vw, 3.75rem)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "normal"
  title:
    fontFamily: "Sora, ui-sans-serif, system-ui"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "normal"
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Inter, ui-sans-serif, system-ui"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.05em"
rounded:
  input: "8px"
  panel: "12px"
  card: "16px"
  full: "9999px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "32px"
  section-y: "80px"
components:
  button-primary:
    backgroundColor: "{colors.pinnacle-blue-500}"
    textColor: "#ffffff"
    rounded: "{rounded.full}"
    padding: "14px 28px"
  button-primary-hover:
    backgroundColor: "{colors.pinnacle-blue-600}"
  button-accent:
    backgroundColor: "{colors.pinnacle-crimson-500}"
    textColor: "#ffffff"
    rounded: "{rounded.full}"
    padding: "14px 28px"
  button-accent-hover:
    backgroundColor: "{colors.pinnacle-crimson-600}"
  card:
    backgroundColor: "{colors.surface-raised}"
    rounded: "{rounded.card}"
    padding: "24px"
  input-field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.input}"
    padding: "10px 16px"
---

# Design System: Pinnacle Construction

## Overview

**Creative North Star: "The Trusted Developer's Office"** *(inferred descriptive choice — revise freely)*

Pinnacle Construction's site plays the real-estate marketing genre straight, at full craft, rather than reaching for a novel format: full-bleed renders, a confident hero with one clear CTA, a conventional project-card grid, and trust proof (stats, testimonials, RERA status) surfaced early. The palette carries the brand's own crimson-and-blue mark into a warm-neutral light theme and a charcoal near-black dark theme — never pure white or pure black in either mode — and the system uses two named brand colors as fixed semantic roles rather than one dominant accent. The result reads closer to Godrej Properties or Prestige Group than to a startup landing page: legible hierarchy, generous section rhythm, bordered cards over heavy shadow, and pill-shaped CTAs that never compete with each other for attention on the same surface.

Confirmed rejections observed in the build: no hard-offset/neobrutalist shadows, no filled/decorative icon style (a single 1.7px-stroke line-icon set covers amenities, why-choose-us, services, landmarks, stats, and contact), no system-default typefaces (Sora and Inter are both intentionally loaded), no scroll-jacking or parallax (motion is limited to fade/slide reveals, count-up numbers, and hover lifts).

**Key Characteristics:**
- Two named brand colors (Pinnacle Blue, Pinnacle Crimson) each locked to a distinct semantic job, never interchangeable
- Warm-neutral light theme / charcoal-not-black dark theme, both built from the same custom-property scale
- Bordered, rounded-2xl cards as the default container; shadow is a hover accent, not a resting state
- Sora for all headings, Inter for all body and UI text
- Pill-shaped (`rounded-full`) buttons and status badges throughout; no square or slightly-rounded buttons observed

## Colors

The palette is warm and restrained at rest, with the two brand hues doing all of the color signaling — nothing else in the system carries color.

### Primary
- **Pinnacle Blue** (`#1c6dae`, dark-mode: `#5aabe2`): navigation hover states, primary hero CTA ("Explore Projects"), section headings on card content (Why Choose Us titles, Mission heading), links, focus ring on all form fields (`focus:border-brand-blue-500`). This is the "informational/navigational" voice — it invites exploration.

### Secondary
- **Pinnacle Crimson** (`#ae1f3d`, dark-mode: `#e77e97`): every conversion moment — "Book a Site Visit" in the header, on project cards, on the final CTA band, and as the BookingForm submit button; also the project status badge (`Ongoing`/`Upcoming`/`Completed`) and the Vision/service/team-role accents. This is the "act now" voice.

### Neutral
- **Warm Paper** (`#faf8f5`, dark-mode `#14181f`): page background (`surface`).
- **Raised White** (`#ffffff`, dark-mode `#1b212b`): card, form, and header-panel background (`surface-raised`) — always one step lighter (light mode) or lighter-adjacent (dark mode) than the page background.
- **Ink** (`#1c2029`, dark-mode `#edeff3`): primary text.
- **Muted Ink** (`#565d6d`, dark-mode `#a4acbb`): secondary/supporting text — descriptions, captions, labels.
- **Hairline Border** (`#e7e2d9`, dark-mode `#2a313d`): all card, input, and section-divider borders.

### Named Rules
**The Two-Voice Rule.** Blue and Crimson never share a job. Blue drives wayfinding and primary exploration actions; Crimson is reserved exclusively for conversion (booking, WhatsApp-adjacent CTAs, status badges). A single button or badge is never given both colors, and a screen's primary CTA and secondary CTA are never both Crimson.

**The Never-Pure Rule.** Neither theme touches `#ffffff`/`#000000` as a background: light mode sits on warm paper (`#faf8f5`), dark mode sits on charcoal (`#14181f`). Card surfaces borrow true white/near-black only as the *raised* layer, never as the page base.

## Typography

**Display/Heading Font:** Sora (with `ui-sans-serif, system-ui` fallback), weights 600/700/800 only
**Body Font:** Inter (with `ui-sans-serif, system-ui` fallback)

**Character:** A geometric, slightly rounded display face carrying all headings against a workhorse humanist sans for everything read at length — confident without being decorative.

### Hierarchy
- **Headline** (extrabold 800, `text-4xl` → `text-6xl` responsive, tight leading): hero H1 and project-detail H1 only.
- **Title** (bold 700, `text-3xl`/`text-4xl`): section H2s ("Why Choose Us", "Featured Projects", etc.).
- **Subtitle** (semibold 600–bold 700, `text-lg`/`text-xl`): card and panel H3s (why-choose-us titles, config labels, team names).
- **Body** (regular 400, `text-sm`–`text-lg`, `leading-relaxed`): descriptions, testimonial quotes, form copy; muted-ink color for anything secondary.
- **Label** (semibold 600, `text-xs`, `tracking-wide` or `tracking-[0.2em]`, uppercase): status badges, footer column headers, form field labels (`text-sm font-medium`, not uppercase), and the two hero/about eyebrow lines.

### Named Rules
**The Heading-Only Sora Rule.** Sora is applied exclusively via the `h1`–`h6` selector and `.font-heading` utility; body copy, buttons, form fields, and nav links are always Inter, even inside heading-adjacent components.

## Layout

Every page shares a `max-w-7xl` content container (`max-w-4xl`/`max-w-6xl` for narrower reading sections like Our Story or the Mission/Vision pair), with `px-4 sm:px-6 lg:px-8` gutters. Sections stack with `py-16`–`py-20` vertical rhythm; card grids use `gap-6`–`gap-8`. Card grids step from 1 column on mobile to 2 (`sm:grid-cols-2`) to 3 (`lg:grid-cols-3`) or 4 for the team grid — never more than 4 across. The project detail page uses a 2:1 asymmetric split (`lg:grid-cols-3`, content spans 2, a sticky sidebar spans 1) once past `lg`. Hero sections are full-bleed image sections with content pinned to the bottom (`items-end`) rather than centered.

## Elevation & Depth

The system is border-driven, not shadow-driven. Cards and panels rest on a 1px hairline border (`--border`) plus `bg-surface-raised` for contrast against `bg-surface`; box-shadow is reserved as a *state* signal, not a resting attribute.

### Shadow Vocabulary
- **Resting card shadow** (`shadow-sm`): the default on interactive cards (why-choose-us, featured project, projects-browser cards).
- **Hover lift** (`shadow-md` / `shadow-lg`): applied only on `:hover` for clickable cards, deepening the resting `shadow-sm`.

### Named Rules
**The Border-First Rule.** Depth is established by a hairline border and a background-shade step before shadow is ever introduced. Shadow only appears as a hover response on clickable cards — never as a static resting effect, and never as a hard offset/neobrutalist shadow.

## Shapes

Radius is deliberately tiered by role: `rounded-lg` (8px) on all form inputs and selects; `rounded-xl` (12px) on secondary image panels (floor plans, landmark stat tiles); `rounded-2xl` (16px) on every card, panel, and content image; `rounded-full` on every button, pill badge, and avatar circle. Nothing in the shipped system uses a sharp (0px) corner or an asymmetric/cut corner. Borders are always 1px solid `--border`; no double borders or dashed treatments appear.

## Components

### Buttons
- **Shape:** `rounded-full` (pill), always — no square or slightly-rounded button exists in the build.
- **Primary (Blue):** `bg-brand-blue-500` / white text, `px-7 py-3.5` on hero-scale CTAs. Used for exploration ("Explore Projects").
- **Accent (Crimson):** `bg-brand-crimson-500` / white text, same padding scale. Used for every conversion action ("Book a Site Visit," form submit).
- **Hover:** solid color step-down one tint (`-600`), `transition-colors`; no scale or shadow change on buttons themselves.
- **Ghost (hero secondary only):** `border border-white/40 bg-white/10 backdrop-blur`, white text — used once, over full-bleed hero imagery where a solid pill would compete with the primary CTA.

### Cards / Containers
- **Corner Style:** `rounded-2xl` (16px).
- **Background:** `bg-surface-raised` (or `bg-surface` when nested inside an already-raised section, to keep a visible step).
- **Shadow Strategy:** `shadow-sm` resting → `shadow-md`/`shadow-lg` on hover for clickable cards only; static info cards (Why Choose Us, Mission/Vision, testimonials) carry no shadow, border only.
- **Border:** 1px `border-border` on all cards.
- **Internal Padding:** `p-6` standard, `p-8` for feature/hero-weight panels (Mission/Vision, services, forms).

### Inputs / Fields
- **Style:** `rounded-lg`, `border-border`, `bg-surface`, `px-4 py-2.5 text-sm`.
- **Focus:** border color shifts to `brand-blue-500`, no ring/glow (`focus:outline-none`).
- **Labels:** `text-sm font-medium text-ink`, sentence case, positioned above the field — never uppercase, never inline.

### Navigation
- **Style:** sticky header, `bg-surface/90 backdrop-blur`, 1px bottom border that only appears once the page is scrolled (`shadow-sm` state added past 8px of scroll). Desktop links are Inter medium, `text-ink-muted` at rest, `text-brand-blue-500` on hover, with an animated underline (width 0 to 100%) as the hover signal. The header's own CTA is always the Crimson pill. Mobile collapses to a standard hamburger icon that expands a full-width dropdown panel below the header on a height/opacity transition, listing the same links plus the Crimson CTA.
- **Status badges:** `rounded-full bg-brand-crimson-500`, white uppercase label text, used identically across home, projects listing, and project-detail hero to mark Ongoing/Upcoming/Completed.

### Icons
- **Style:** custom line-icon set (`app/components/icons.js`, `Icon` component keyed by name), 24x24 viewBox, `currentColor` stroke at 1.7px, rounded caps/joins — matches the WhatsApp and theme-toggle glyphs already in the header.
- **Placement:** stats bar (above each number), Why Choose Us / Amenities / Services cards (in a tinted rounded-square or circle swatch above the title), landmark tiles on project pages, contact info headings, form fields (phone/email/date), and the search input.
- **Color:** icons inherit the section's semantic color (Blue for informational cards and stats, Crimson for services/conversion), never a neutral gray.

### Motion
- **Reveal:** `app/components/Reveal.js` fades and slides content up (`opacity-0 translate-y-6` to `opacity-100 translate-y-0`, 700ms ease-out) via `IntersectionObserver`, applied once per section/card with a staggered delay across grid items. Skips straight to visible when `prefers-reduced-motion: reduce`.
- **Count-up:** `app/components/CountUp.js` animates the stats bar numbers from 0 to their real value (cubic ease-out, ~1.2s) the first time they scroll into view; shows the final number immediately under reduced motion.
- **Hover:** cards and buttons lift (`-translate-y-0.5` to `-translate-y-1`) and gain elevation (`shadow-md`/`shadow-lg`) on hover; nothing else moves on hover (no rotation, no color-only card hovers).

## Do's and Don'ts

### Do:
- **Do** keep Blue for exploration/navigation and Crimson for conversion; never let a single button or badge carry both.
- **Do** use `rounded-full` for every button, pill badge, and avatar; `rounded-2xl` for every card.
- **Do** rest cards on a border + `shadow-sm`, and reserve `shadow-md`/`shadow-lg` for hover on clickable cards only.
- **Do** keep both themes off pure white/black — warm paper in light mode, charcoal in dark mode.
- **Do** set all headings in Sora and all body/UI text in Inter; never mix the two within the same text role.
- **Do** pair every icon-bearing section with the shared line-icon set and the `Reveal`/hover-lift motion pattern already established, rather than inventing a new visual treatment per section.

### Don't:
- **Don't** introduce a third named color role; the system is deliberately two-brand-color plus neutrals, not a broader palette.
- **Don't** apply a hard-offset or neobrutalist shadow anywhere; this is a corporate-trust craft world (Godrej/Prestige-level), not that genre.
- **Don't** treat the hero's uppercase eyebrow line ("Pinnacle Construction · Nagpur" / "Since 2010") as a reusable system component — it appears in exactly two places in the shipped build and is not confirmed as a general pattern; do not multiply it across new surfaces.
- **Don't** mix icon styles: every icon in the system is a 1.7px-stroke outline glyph on a 24x24 grid (`app/components/icons.js`), never filled/solid, never a third-party icon font.
- **Don't** animate beyond fade/slide reveals, count-up numbers, and hover lifts (translate + shadow); no scroll-jacking, parallax, or auto-playing carousels.
