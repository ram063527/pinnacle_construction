import { client } from "./client";

// Everything the site reads from Sanity goes through this file. Each function
// returns the same shape the old data/*.js modules did, so components stayed put
// when the CMS landed.
//
// Nothing here is cached by Next. Pages are statically prerendered, so a visitor is
// served HTML without touching Sanity; when the client publishes, the webhook at
// /api/revalidate invalidates the routes and the next request re-renders against
// fresh data. Next 16 does not cache fetch by default, so tagging the fetches here
// would register nothing for revalidateTag to invalidate.

const PROJECT_FIELDS = `
  _id,
  _createdAt,
  name,
  "slug": slug.current,
  type,
  status,
  featured,
  badge,
  location,
  address,
  reraNumber,
  description,
  seoTitle,
  seoDescription,
  landmarks[]{ kind, name, km },
  configurations[]{
    label,
    carpetAreaSqFt,
    "floorPlanImageUrls": floorPlans[].asset->url
  },
  "renders": renders[].asset->url,
  "brochureUrl": brochure.asset->url,
  videoReelYoutubeId
`;

// Buyable work first, finished work last, newest first within each group. Done in
// GROQ rather than JavaScript because "order(status asc)" sorts alphabetically,
// which puts completed projects at the top.
const PROJECT_ORDER = `order(
  select(status == "ongoing" => 0, status == "upcoming" => 1, 2) asc,
  _createdAt desc
)`;

function query(groq, params) {
  return client.fetch(groq, params);
}

export function getProjects() {
  return query(
    `*[_type == "project" && defined(slug.current)] | ${PROJECT_ORDER} { ${PROJECT_FIELDS} }`,
    {}
  );
}

export function getProjectSlugs() {
  return query(
    `*[_type == "project" && defined(slug.current)] | ${PROJECT_ORDER} { "slug": slug.current, _updatedAt }`,
    {}
  );
}

export function getProjectBySlug(slug) {
  return query(
    `*[_type == "project" && slug.current == $slug][0] { ${PROJECT_FIELDS} }`,
    { slug }
  );
}

export function getTestimonials() {
  return query(
    `*[_type == "testimonial"] | order(order asc, _createdAt asc) {
      author, quote, block, rating
    }`,
    {}
  );
}

export function getTeam() {
  return query(
    `*[_type == "teamMember"] | order(order asc, _createdAt asc) {
      name, role, bio
    }`,
    {}
  );
}

export async function getContact() {
  const contact = await query(
    `*[_type == "contactSettings"][0] {
      phones, whatsappNumber, whatsappMessage, email, address, hours,
      googleBusinessProfileUrl
    }`,
    {}
  );

  // The map used to be a hand-written embed URL sitting next to the address, which
  // meant the client could change one and not the other. It is derived now.
  return {
    ...contact,
    mapEmbedUrl: `https://www.google.com/maps?q=${encodeURIComponent(
      contact.address
    )}&output=embed`,
  };
}
