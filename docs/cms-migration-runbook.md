# Static Next.js site to Sanity CMS: a runbook

Written from the Pinnacle Construction migration (September 2026), where a fully
static Next.js 16 site with content in `data/*.js` became a client-editable site
backed by Sanity, without touching the design or the frontend architecture.

Concrete values from that project are kept rather than genericised, because a real
example is easier to adapt than a template full of `<PLACEHOLDER>`. Project ID
`qwbljh0m`, dataset `production`, domain thepinnacleconstruction.in.

The traps at the end are the part worth reading twice. Every one of them cost real
time, and four of them fail silently.

---

## 0. Decide before you install anything

Three decisions shape everything else. Getting them wrong costs a rewrite, not an
edit.

### Headless CMS, not WordPress

WordPress means discarding the codebase. Animations, design, page structure all
become PHP templates or a theme, and you take on hosting, security patching, and
plugin rot. Headless means the client gets a dashboard and your frontend does not
move.

Choose WordPress only when the client needs to edit page *layouts*. If they need to
add a record with a dozen fields, headless wins easily.

A git-backed CMS (Decap, Tina) is the third option: content stays in version
control, zero recurring cost. Rejected here because it requires a non-technical
client to hold and use a GitHub account, and a publish becomes a commit. That is a
support burden that outlives the build.

### What stays in code

Every editable field is schema work plus one more way for the client to break the
design. Made editable: projects, testimonials, team, contact details. Left in code:
stats, services, features, mission, vision, story, FAQs.

Copy that changes once every three years does not belong in a CMS.

### Who owns the account

Decide on day one. Create an **organisation** named after the client and put the
project inside it. At handover you invite them as owner and remove yourself: one
invite, one removal.

If you make it a personal project instead, transferring later requires an
organisation on their side, admin rights on both, and a trip through the Danger
zone. The project ID does survive a transfer, so nothing in code changes, but the
permissions dance is avoidable.

Same principle for the Vercel project and the domain.

### Write the decisions down

We recorded these as ADRs (`docs/adr/0004-sanity-headless-cms.md`,
`0005-branded-search-only-seo.md`) before writing code, and marked the superseded
ones. Six months from now "why not WordPress?" is a question you will have to answer
again, possibly to a different person.

---

## 1. Create the Sanity project

At sanity.io/manage: **organisation first**, then the project inside it. Note the
project ID and dataset name (`production` by default).

Verify it is alive and publicly readable before going further:

```bash
curl -s "https://qwbljh0m.api.sanity.io/v2026-05-19/data/query/production?query=count(*)"
```

`{"result":0}` means the dataset exists and reads are public. That last part
matters: the site queries without a token, so if reads are not public, nothing
renders.

### Free tier limits (as of 2026)

100GB assets, 100GB bandwidth/month, 1M CDN requests, 250k API requests, 10,000
documents, 20 seats, $0 forever. Next tier is $15/seat/month.

For scale: 14 projects with renders, floor plans, and brochures came to roughly
250MB of assets. That is 0.25% of the storage limit.

---

## 2. Install

```bash
npm install sanity next-sanity @sanity/vision
npm install @sanity/webhook
```

`@sanity/image-url` is commonly recommended but we did not end up needing it. Image
URLs are resolved in GROQ with `asset->url`, so the builder was dead code. Install
it only if you need hotspot and crop control.

---

## 3. Wire the Studio into the app

The Studio is a React app that lives in **your repo** and deploys with your site. It
is not hosted by Sanity. The client visits `yoursite.com/studio`.

Four files:

**`sanity/env.js`** reads `NEXT_PUBLIC_SANITY_PROJECT_ID`, `_DATASET`,
`_API_VERSION` and **throws** when one is missing. Deliberate: a missing project ID
should fail the build loudly rather than render an empty site quietly.

**`sanity/lib/client.js`** creates the client. One setting to get right, see trap 3.

```js
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // see trap 3
  perspective: "published",
});
```

**`sanity.config.js`** at the repo root. Needs `"use client"` at the top.

```js
"use client";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

export default defineConfig({
  name: "pinnacle-construction",
  title: "Pinnacle Construction",
  basePath: "/studio",
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
});
```

**`app/studio/[[...tool]]/page.js`**

```js
import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";

export const dynamic = "force-static";
export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
```

Add the image host to `next.config.mjs` or every `next/image` fails:

```js
images: { remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }] }
```

---

## 4. Model the content

### Documents vs objects

A **document** exists on its own: sidebar entry, create button, its own publish
button. Ours: `project`, `testimonial`, `teamMember`, `contactSettings`.

An **object** only exists nested inside a document. Ours: `configuration`,
`landmark`. A landmark has no meaning without a project to be near.

The test: would the client ever open this directly from the sidebar? "Show me all
3BHK configurations" is not something anyone wants. So it is an object.

### Field types

`image` gets Sanity's resize and reformat pipeline. `file` is plain storage with a
URL. Brochures are PDFs with nothing to optimise, so `file`.

### Patterns worth copying

**Groups** turn one intimidating wall of fields into tabs:

```js
groups: [
  { name: "main", title: "Project", default: true },
  { name: "location", title: "Location" },
  { name: "media", title: "Media" },
  { name: "seo", title: "SEO" },
]
```

**Conditional fields** hide what does not apply:

```js
hidden: ({ document }) => document?.type !== "residential"
```

**`initialValue` on arrays** beats an empty "Add item" button. Our landmark array
pre-seeds four rows with the kind already set; the client fills what applies and
deletes the rest.

```js
initialValue: FIXED_LANDMARK_KINDS.map((k) => ({ _type: "landmark", kind: k.value }))
```

**Cross-field validation** catches half-finished rows:

```js
validation: (rule) => rule.custom((value, context) => {
  const km = context.parent?.km;
  if (km != null && !value) return "Add the place name, or delete this row.";
  return true;
})
```

**Constrain free text.** Landmark kind is a dropdown, never a text box, because
every kind maps to an icon. Give the client free text and the first thing they type
is `"Nagpur Airport - 3 kms away"` into a label field sized for one word.

**Singletons.** Contact details is not a list. Pin it to a fixed document ID in
`sanity/structure.js`:

```js
S.listItem().title("Contact details").id("contactSettings").child(
  S.document().schemaType("contactSettings").documentId("contactSettings")
)
```

and strip it from the create menu in `sanity.config.js`:

```js
document: {
  newDocumentOptions: (prev) => prev.filter((i) => i.templateId !== "contactSettings"),
}
```

Without both, the client creates a second contact document, edits that one, and the
site keeps showing the first. They change the phone number, nothing happens, they
call you. That is the exact support call the CMS was supposed to prevent.

### Build schemas from the real data and the real components

Not from your notes or your glossary. Writing `testimonial` and `contactSettings`
from our domain glossary missed `block`, `rating`, `phones` (two numbers, not one),
`whatsappMessage`, and `hours`. All of them rendered by components that already
existed. Read the components.

---

## 5. CLI auth, CORS, token

```bash
npx sanity login --provider google
```

Without `--provider` it fails in non-interactive shells with "Multiple login
providers available".

```bash
npx sanity cors add http://localhost:3000 --credentials --project-id qwbljh0m
npx sanity cors list --project-id qwbljh0m
```

The flag is `--project-id`, not `--project`. `--credentials` is required: without
it the Studio cannot send its session and every request returns unauthorized.

```bash
npx sanity tokens create "migration" --project-id qwbljh0m \
  --role editor --expires-at 2026-10-21 --json -y
```

The JSON field is **`token`**, not `key`. Give it an expiry; it exists for one
script. It goes in `.env.local` and nowhere else. Never add it to Vercel.

### Verify a token with a real write

Not with `/users/me`. That endpoint is for user sessions and returns
`"Session not found"` for a perfectly valid project token, which sends you chasing a
problem that does not exist.

```bash
curl -X POST "https://qwbljh0m.api.sanity.io/v2026-05-19/data/mutate/production" \
  -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"mutations":[{"createOrReplace":{"_id":"probe","_type":"probe"}}]}'
```

Delete the probe afterwards.

---

## 6. The migration script

`scripts/migrate-to-sanity.mjs`, run once:

```bash
node scripts/migrate-to-sanity.mjs
```

### Importing your own data files is awkward

`package.json` has no `"type": "module"`, so Node reads `data/*.js` as CommonJS and
chokes on `export`. The least invasive fix is to copy them to a temp directory as
`.mjs`, import those, and delete the copies:

```js
const dir = await mkdtemp(path.join(tmpdir(), "migrate-"));
await copyFile(path.join(ROOT, "data", "projects.js"), path.join(dir, "projects.mjs"));
const mod = await import(pathToFileURL(path.join(dir, "projects.mjs")).href);
```

### Uploading assets

```js
const asset = await client.assets.upload("image", createReadStream(absPath), {
  filename: path.basename(absPath),
});
const ref = { _type: "image", asset: { _type: "reference", _ref: asset._id } };
```

Cache by source path so a file shared between projects uploads once per run. Sanity
also deduplicates by content hash, so re-runs upload nothing new.

### Make it idempotent

Deterministic IDs plus `createOrReplace`: `project-${slug}`,
`testimonial-${slugify(author)}`, `teamMember-${index + 1}`. Re-running replaces
rather than duplicating.

### Array items need `_key`

Every object inside an array needs a stable unique `_key` or the Studio misbehaves.

### Control creation order

We wrote projects in **reverse file order** so `_createdAt desc` reproduces the
catalogue order the data file had:

```js
for (const project of [...projects].reverse()) { ... }
```

### Map renamed values explicitly

Our landmark vocabulary changed during design (`metro` to `metroOrStation`,
`airportOrStation` to `airport`), so the script carries a `KIND_MAP` and drops rows
missing a name or distance rather than migrating empty ones.

### Verify with an unauthenticated query

Authenticated reads hide trap 1 completely.

---

## 7. Rewire the frontend

One file is the entire read layer: `sanity/lib/content.js`. Every function returns
**the same shape the old data files did**. That is what kept the change small.
Twelve consumer files, most of them a two-line diff.

### Resolve assets in GROQ

So components keep receiving plain URL strings and never learn about Sanity:

```groq
"renders": renders[].asset->url,
"brochureUrl": brochure.asset->url,
configurations[]{ label, carpetAreaSqFt, "floorPlanImageUrl": floorPlan.asset->url }
```

### Sort in GROQ, carefully

`order(status asc)` is alphabetical: completed, ongoing, upcoming. Exactly
backwards. Use an explicit rank:

```groq
| order(select(status == "ongoing" => 0, status == "upcoming" => 1, 2) asc, _createdAt desc)
```

### Server components fetch, client components take props

Pages and server components become `async` and call the fetchers directly. Anything
with `"use client"` gets its data as props from a server parent.

### Module-scope reads must move inside functions

```js
// before: cannot await at module scope
const TO = process.env.CONTACT_TO_EMAIL ?? contact.email;

// after: inside the handler
const TO = process.env.CONTACT_TO_EMAIL ?? (await getContact()).email;
```

`generateStaticParams` becomes async and reads slugs from Sanity.

---

## 8. Delete the old sources

Once the site renders from the CMS, delete the data files and the migrated media.
Keep both and eventually someone edits the wrong one and wonders why nothing
changes. Git has the history.

Find orphaned media by diffing references against disk:

```bash
grep -rhoE '"/(images|brochure)/[^"]+"' app data --include=*.js | tr -d '"' | sort -u > refs.txt
find public/images public/brochure -type f | sed 's|^public||' | sort > disk.txt
comm -23 disk.txt refs.txt
```

Read the result before deleting. Ours included an unrelated texture file that had
nothing to do with the migration.

---

## 9. Publishing: webhook and revalidation

`app/api/revalidate/route.js`:

```js
const body = await request.text();
const signature = request.headers.get(SIGNATURE_HEADER_NAME);
if (!(await isValidSignature(body, signature, secret))) {
  return Response.json({ message: "Invalid signature" }, { status: 401 });
}
const { _type: type } = JSON.parse(body);
if (!CONTENT_TYPES.includes(type)) {
  return Response.json({ revalidated: false, type: type ?? null }); // 200, not an error
}
revalidatePath("/", "layout");
return Response.json({ revalidated: true, type });
```

Return **200, not an error**, for document types you do not care about. Assets fire
the hook too, and a non-200 makes Sanity mark the webhook as failing and retry it.

`revalidatePath("/", "layout")` is blunt but correct for a small site. Contact
details appear on every page, a project appears on three, and the sitemap covers all
of them. Working out the precise set is more code and more ways to be subtly wrong.

Generate the secret with `crypto.randomBytes(24).toString("base64url")`.

### Test locally with genuinely signed requests

```js
const sig = await encodeSignatureHeader(body, Date.now(), secret);
```

`encodeSignatureHeader` is **async**. Forgetting to await it sends `[object Promise]`
as the header and every case returns 401, which looks exactly like a broken handler.

Test five cases: valid, unknown type, wrong secret, tampered body, no signature.

### Test the full loop, not just the handler

The test that proves anything has three steps, and the middle one is the one people
skip:

1. Baseline: content absent from the page
2. Publish to Sanity, confirm the page is **still stale**
3. Fire the webhook, confirm the page updates

Without step 2 you cannot tell revalidation from a page that was never cached.

---

## 10. SEO

For a local business whose goal is appearing on a branded search, this is the whole
technical list:

- `app/sitemap.js` built from the CMS, with `lastModified` from `_updatedAt`
- `app/robots.js` disallowing `/studio` and `/api/`
- `metadataBase`, a title template, and per-page canonicals
- Open Graph and Twitter cards
- `LocalBusiness` (or a subtype like `GeneralContractor`) JSON-LD with address and
  phone, plus `sameAs` pointing at the Google Business Profile

Crop OG images with Sanity's transform: `?w=1200&h=630&fit=crop`. Renders are
whatever shape the brochure gave you, and near-square previews look broken in
WhatsApp.

If you add `title.template`, strip the site name from every page's title or you get
it twice.

**Ranking for non-branded terms is a marketing retainer, not a build task.** Google
Business Profile, local citations, content, backlinks, months of waiting. Scope it
explicitly and in writing, or you will be asked about it in four months.

---

## 11. Deploy

### Environment variables

```bash
for N in NEXT_PUBLIC_SANITY_PROJECT_ID NEXT_PUBLIC_SANITY_DATASET \
         NEXT_PUBLIC_SANITY_API_VERSION SANITY_REVALIDATE_SECRET; do
  for E in production preview development; do
    printf '%s' "$VALUE" | vercel env add "$N" "$E"
  done
done
```

Verify with `vercel env pull .env.check --environment=production`. Values stored as
sensitive come back as `[REDACTED]`, which is correct behaviour and not a mismatch.
Confirm the write token did **not** make it up there.

### CORS for production

Use the **stable alias** (`project-xi.vercel.app`), not per-deployment hash URLs,
which change every push.

```bash
npx sanity cors add https://pinnacle-construction-xi.vercel.app --credentials --project-id qwbljh0m
```

Note that a Vercel project can have several aliases and not all are public. Ours had
one returning 200 and another 302-ing to a login.

### Preview deployments are protected

Deployment Protection 302s everything to a login. Use `vercel curl <url>` to test
them. Point the webhook at **production**, because Sanity cannot authenticate
through that login page.

### Create the webhook

Dashboard only: `sanity.io/manage/project/<id>/api/webhooks`. I tried four ways to
script it; the management API the CLI uses rejects both `filter` and `projection`,
and `sanity hooks create` is interactive-only.

| Field | Value |
|---|---|
| URL | `https://<domain>/api/revalidate` |
| Dataset | `production` |
| Trigger | Create, Update, Delete |
| Filter | `_type in ["project","testimonial","teamMember","contactSettings"]` |
| Projection | `{_type}` |
| HTTP method | POST |
| API version | `v2021-03-25` |
| Drafts | off |
| Secret | same as `SANITY_REVALIDATE_SECRET` |

**Projection `{_type}` is required** or your handler gets a body it cannot read.

### Inspect deliveries

```bash
npx sanity hooks logs --project-id qwbljh0m
```

For the full attempt including your handler's response body:

```
GET https://api.sanity.io/v2025-08-04/hooks/projects/<id>/<hookId>/attempts
```

with the CLI token from `~/.config/sanity/config.json`. The `resultBody` field is
what told us the handler was returning `{"revalidated":true}` while the page stayed
stale, which is what led to trap 3.

---

## The traps

Four of these fail silently. That is what makes them expensive.

### 1. Dotted document IDs are invisible

`_id: "project.dravin-enclave"` migrated 14 projects perfectly, and every
unauthenticated query returned zero results. Sanity reserves dotted IDs for system
documents (`drafts.`, `versions.`). The site would have rendered an empty catalogue
with no error anywhere.

**Use hyphens. Verify migrations with an unauthenticated query.**

### 2. `revalidateTag` does nothing in Next 16

`fetch` is not cached by default, so `next: { tags: [...] }` registers nothing and
there is no cache entry for the tag to invalidate. The webhook returned
`{"revalidated":true}` while the page never changed.

Use `revalidatePath`, or commit to `cacheComponents: true` with `'use cache'` and
`cacheTag`.

### 3. `useCdn: true` races the webhook

The nastiest one. Sanity's CDN caches query results for around a minute. Publish,
revalidate immediately, and the page re-renders against the **pre-publish** response
and then caches that as the new HTML. It sits stale indefinitely, because nothing
will revalidate it again.

Every signal says success: webhook 200, `revalidated: true`, clean delivery log.

Observed in production: after publishing a badge, `/projects` picked it up while `/`
and the project page did not.

**Set `useCdn: false`.** Content is fetched at build and on revalidation, never per
visitor, so you save a few hundred requests a month and buy a silent staleness bug.

### 4. Testing revalidation against settled data hides trap 3

Our first production test failed. Waiting 30 seconds and retrying "worked". Test
**both**: publish-then-immediately-revalidate, and revalidate against data that has
been settled for minutes. Only the first catches the CDN race.

### 5. Storing a field but never rendering it

I built the Badge schema, which was the client's headline requirement, and never
displayed it anywhere. Nothing failed. The field sat in the CMS doing nothing, and
it took a full end-to-end test to notice.

**After adding any field, grep for it in `app/`.**

### 6. Derive, do not duplicate

The old contact data had both an address and a hand-written Google Maps embed URL.
Two fields for one fact, so the client can change one and not the other. Derive the
map URL from the address.

### 7. `vercel env pull` overwrites `.env.local`

Pull to a scratch file and delete it:

```bash
vercel env pull .env.check --environment=production
```

---

## Handover checklist

- [ ] Sanity organisation owned by the client, you invited as administrator
- [ ] Vercel project and domain under the client's account
- [ ] Migration write token deleted or expired
- [ ] CORS origins cover the production domain
- [ ] Webhook points at production, not a protected preview
- [ ] Launch on the **existing** domain, with 301s from any changed URLs
- [ ] Google Business Profile created and verified (postcard, one to two weeks, so
      start early)
- [ ] Client walked through adding one project end to end, with a written list of
      data gaps to fill in themselves
