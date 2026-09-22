// Canonical origin for absolute URLs (metadata, sitemap, structured data).
// Set NEXT_PUBLIC_SITE_URL on Vercel preview deployments so previews don't advertise
// themselves as the production domain.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://thepinnacleconstruction.in"
).replace(/\/$/, "");

export const SITE_NAME = "Pinnacle Construction";
