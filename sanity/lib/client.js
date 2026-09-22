import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Not the CDN. Content is fetched at build time and on webhook revalidation, never
  // per visitor, so there are only a few hundred requests a month and no bandwidth to
  // save. The CDN caches query results for around a minute, which races the webhook:
  // publish, revalidate immediately, re-render against a stale response, then cache
  // that as the new page. The site would sit stale with no error anywhere.
  useCdn: false,
  perspective: "published",
});
