import { revalidatePath } from "next/cache";
import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";

// Sanity calls this when the client publishes. We drop the whole route cache and
// every page re-renders against fresh content on its next request. Seconds, not a
// redeploy.
//
// Why the blunt instrument: contact details and the footer appear on every page, a
// project appears on the homepage, the catalog, and its own page, and the sitemap
// covers all of them. Working out the precise set is more code and more ways to be
// subtly wrong, and this site is 19 pages that each take milliseconds to render.
//
// Set up at sanity.io/manage > API > Webhooks:
//   URL         https://<domain>/api/revalidate
//   Dataset     production
//   Trigger     Create, Update, Delete
//   Filter      _type in ["project","testimonial","teamMember","contactSettings"]
//   Projection  {_type}
//   Secret      same value as SANITY_REVALIDATE_SECRET

const CONTENT_TYPES = [
  "project",
  "testimonial",
  "teamMember",
  "contactSettings",
];

export async function POST(request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return Response.json(
      { message: "SANITY_REVALIDATE_SECRET is not set" },
      { status: 500 }
    );
  }

  const body = await request.text();
  const signature = request.headers.get(SIGNATURE_HEADER_NAME);

  if (!(await isValidSignature(body, signature, secret))) {
    return Response.json({ message: "Invalid signature" }, { status: 401 });
  }

  let type;
  try {
    ({ _type: type } = JSON.parse(body));
  } catch {
    return Response.json({ message: "Malformed body" }, { status: 400 });
  }

  if (!CONTENT_TYPES.includes(type)) {
    // Assets and system documents fire the hook too. Nothing to do, but a 200 stops
    // Sanity marking the webhook as failing and retrying it.
    return Response.json({ revalidated: false, type: type ?? null });
  }

  revalidatePath("/", "layout");
  return Response.json({ revalidated: true, type });
}
