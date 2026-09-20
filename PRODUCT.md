# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js (App Router), plain JavaScript, Tailwind CSS, deployed on Vercel. Media hosted on Cloudinary; site-visit form submissions are emailed via a transactional email service (e.g. Resend), never stored. No CMS or database — project and content data live as static files in the repo, maintained by a developer.

## Users

Primary users are individual families researching a home to live in (not investors or resale buyers), evaluating projects by location, configuration, and proximity to schools/amenities. Secondary: prospective clients following up on a project already underway, and Pinnacle Construction staff who receive site-visit leads by email.

## Product Purpose

Marketing and lead-generation site for Pinnacle Construction, a construction company in Nagpur. Lets prospective buyers browse ongoing, completed, and upcoming residential projects, dig into a project via floor plans, brochures, and renders, and convert into a site-visit request or a direct WhatsApp/phone/email contact. Success is a visitor finding a matching project and submitting a site-visit request or reaching out directly.

## Positioning

Trust and track record: 15 years in business, 43 projects completed, 521 happy clients. The claim is proven reliability and longevity, not a specific feature or price point a competitor could copy overnight.

## Operating Context

Visitors browse the Projects listing, filter/search by name, location/area, and configuration, open a project's detail page to see renders, floor plans (ongoing/upcoming only), a brochure download (ongoing/upcoming only), an embedded video reel (ongoing/upcoming only), RERA status, and landmark distances, then either book a site visit (pre-filled with the project name) or contact via WhatsApp, phone, or email. A developer maintains project and content data by editing files and deploying; there is no admin panel, and Pinnacle Construction staff do not edit the site themselves.

## Capabilities and Constraints

- ~50 projects total; all client-side search/filtering, no backend search index.
- Projects have a type (residential/commercial/redevelopment, only residential populated today) and a status (upcoming/ongoing/completed, one value per project), an optional RERA number (shows "Coming soon" when absent), and manually entered landmark distances (school, petrol pump, hospital, supermarket, airport/station).
- Residential projects have configurations (e.g. 2BHK/3BHK), each with carpet area and a floor plan image; floor plans exist only for ongoing/upcoming projects since they're sourced from the brochure.
- Media varies by status: ongoing/upcoming projects get a brochure PDF, floor plans, several renders, and a roughly 1.5-minute video reel (unlisted YouTube upload, embedded); completed projects get exactly one render (the original pre-construction visualization, reused as-is — never an actual photo) and nothing else.
- The site-visit booking form (name, phone, email, project dropdown, preferred date, message) appears on the Contact page and on every project detail page, pre-filled with that project's name; submissions email directly to the business inbox and are never stored.
- A floating WhatsApp click-to-chat button appears site-wide, using the primary phone number with a pre-filled message.
- The office location is a static Google Maps iframe embed (no API key).
- Light/dark theme auto-detects the OS preference, with a manual toggle that persists.
- English only, no other locales planned.
- No accessibility standard was specified beyond ordinary good practice.

## Brand Commitments

Name: Pinnacle Construction. Logo at `logo/logo.jpg`: a crimson-red angular "P" mark with a bold blue wordmark. The site palette builds on this red and blue for both light and dark themes.

Visual direction: the classic real-estate marketing site, played straight and executed at full craft (not a novel or experimental structure) — full-bleed project photography/renders, a clear hero with headline/subhead/primary CTA, a conventional project card grid, and trust badges. Held to the craft level of Godrej Properties and Prestige Group: clean corporate trust, generous whitespace, confident photography, and strong project search/filter UX at scale.

## Evidence on Hand

- Logo: `logo/logo.jpg`.
- Sample brochures: `brochure/` (Dravin Enclave, Durvang Avenue — real PDFs to source renders, floor plans, and copy from).
- Real company copy already collected: Our Story (founded 2010), Mission, Vision, six "Why Choose Us" items, six amenities/features, three services (Residential/Commercial/Redevelopment Construction), and stats (43 projects completed, 521 happy clients, 21 team members, 15 years experience).
- Real team member names, roles, and bios exist, but no photos — display with initials avatars.
- Real client testimonials exist (author and quote), but no photos.
- Contact details: phones 7770020599 (primary/WhatsApp) and 7775947600, email Pinnacleconstruction03@gmail.com, address "Pinnacle Construction, Mulik Complex, Flat No. A/1, Near Airport Centre Point, Wardha Road, Somalwada, Nagpur."
- No project photography beyond brochure renders exists yet; do not fabricate additional imagery claims.

## Product Principles

- Trust over hype: lean on track record (years, completed count, client count) rather than invented claims.
- Every project detail page must clearly signal what's available for its status; never imply a brochure, video, or floor plan exists for a completed project.
- Reduce friction to a site visit: WhatsApp, phone, and a pre-filled booking form should all be one click or tap away from any project.
- Content changes go through a developer; the design and data shape should stay simple enough that a catalog this size (~50 projects) doesn't need a CMS.
- Family-livability framing (schools, safety, amenities, neighborhood) outweighs investment/ROI framing throughout.

## Accessibility & Inclusion

No specific standard was established; follow ordinary web accessibility best practice.
