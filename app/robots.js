import { SITE_URL } from "@/sanity/lib/site";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The Studio is behind a login anyway, but there is no reason for it to be
      // crawled or to show up alongside the site in search results.
      disallow: ["/studio", "/api/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
