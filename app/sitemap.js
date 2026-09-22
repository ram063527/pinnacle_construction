import { getProjectSlugs } from "@/sanity/lib/content";
import { SITE_URL } from "@/sanity/lib/site";

const STATIC_ROUTES = [
  { path: "/", priority: 1 },
  { path: "/projects", priority: 0.9 },
  { path: "/about", priority: 0.7 },
  { path: "/contact", priority: 0.8 },
  { path: "/privacy", priority: 0.2 },
];

export default async function sitemap() {
  const projects = await getProjectSlugs();
  const now = new Date();

  return [
    ...STATIC_ROUTES.map(({ path, priority }) => ({
      url: `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority,
    })),
    ...projects.map(({ slug, _updatedAt }) => ({
      url: `${SITE_URL}/projects/${slug}`,
      lastModified: new Date(_updatedAt),
      changeFrequency: "monthly",
      priority: 0.8,
    })),
  ];
}
