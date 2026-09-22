// One-off migration: pushes the static data files and their media into Sanity.
//
//   node scripts/migrate-to-sanity.mjs
//
// Needs SANITY_API_WRITE_TOKEN in .env.local (Editor role, created at
// sanity.io/manage under API > Tokens). Safe to run more than once: every document
// gets a deterministic _id and is replaced wholesale, and Sanity deduplicates
// assets by file hash, so a second run uploads nothing new.
//
// IDs use a hyphen, never a dot. Sanity reserves dotted IDs (drafts., versions.)
// for system documents and hides them from unauthenticated queries, so an _id like
// "project.dravin-enclave" migrates fine and then renders an empty site.

import { createClient } from "@sanity/client";
import { createReadStream, existsSync } from "node:fs";
import { mkdtemp, copyFile, rm, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = path.resolve(import.meta.dirname, "..");

// --- env -------------------------------------------------------------------

const env = Object.fromEntries(
  (await readFile(path.join(ROOT, ".env.local"), "utf8"))
    .split("\n")
    .filter((line) => line.trim() && !line.trim().startsWith("#"))
    .map((line) => {
      const at = line.indexOf("=");
      return [line.slice(0, at).trim(), line.slice(at + 1).trim()];
    })
);

const token = process.env.SANITY_API_WRITE_TOKEN || env.SANITY_API_WRITE_TOKEN;
if (!token) {
  console.error(
    "Missing SANITY_API_WRITE_TOKEN.\n" +
      "Create one at https://www.sanity.io/manage/project/qwbljh0m/api with the\n" +
      "Editor role, then add it to .env.local as SANITY_API_WRITE_TOKEN=..."
  );
  process.exit(1);
}

const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION,
  token,
  useCdn: false,
});

// --- loading the data files ------------------------------------------------

// package.json has no "type": "module", so Node reads data/*.js as CommonJS and
// chokes on the export keyword. Copying them to .mjs in a temp dir is the least
// invasive way to import them; the copies are deleted before the script exits.
async function loadDataModules() {
  const dir = await mkdtemp(path.join(tmpdir(), "pinnacle-migrate-"));
  const load = async (name) => {
    const target = path.join(dir, `${name}.mjs`);
    await copyFile(path.join(ROOT, "data", `${name}.js`), target);
    return import(pathToFileURL(target).href);
  };
  try {
    return {
      projects: await load("projects"),
      siteContent: await load("siteContent"),
      contact: await load("contact"),
    };
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}

// --- assets ----------------------------------------------------------------

const uploaded = new Map();

async function upload(kind, publicPath) {
  if (!publicPath) return undefined;
  const cacheKey = `${kind}:${publicPath}`;
  if (uploaded.has(cacheKey)) return uploaded.get(cacheKey);

  const absolute = path.join(ROOT, "public", publicPath.replace(/^\//, ""));
  if (!existsSync(absolute)) {
    console.warn(`  ! missing file, skipped: ${publicPath}`);
    return undefined;
  }

  const asset = await client.assets.upload(kind, createReadStream(absolute), {
    filename: path.basename(absolute),
  });
  const ref = {
    _type: kind === "image" ? "image" : "file",
    asset: { _type: "reference", _ref: asset._id },
  };
  uploaded.set(cacheKey, ref);
  console.log(`  + ${kind}: ${publicPath}`);
  return ref;
}

// --- landmarks -------------------------------------------------------------

// The old data used six fixed kinds. Two were renamed when the vocabulary changed;
// the other four carried over unchanged.
const KIND_MAP = {
  school: "school",
  hospital: "hospital",
  metro: "metroOrStation",
  airportOrStation: "airport",
  supermarket: "supermarket",
  petrolPump: "petrolPump",
};

const KIND_ORDER = [
  "school",
  "hospital",
  "metroOrStation",
  "airport",
  "supermarket",
  "petrolPump",
];

function mapLandmarks(landmarks = [], slug) {
  return landmarks
    .filter(
      (landmark) =>
        landmark.name && landmark.km !== undefined && landmark.km !== null
    )
    .map((landmark) => ({
      _type: "landmark",
      _key: `${slug}-${landmark.kind}`,
      kind: KIND_MAP[landmark.kind] ?? landmark.kind,
      name: landmark.name,
      km: landmark.km,
    }))
    .sort((a, b) => KIND_ORDER.indexOf(a.kind) - KIND_ORDER.indexOf(b.kind));
}

// --- main ------------------------------------------------------------------

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

async function run() {
  const {
    projects: projectsModule,
    siteContent,
    contact: contactModule,
  } = await loadDataModules();
  const { projects } = projectsModule;
  const { testimonials, team } = siteContent;
  const { contact } = contactModule;

  // Projects are written oldest-last so that _createdAt descending reproduces the
  // order they currently sit in the data file.
  console.log(`\nProjects (${projects.length})`);
  for (const project of [...projects].reverse()) {
    console.log(`- ${project.name}`);

    const renders = [];
    for (const [index, render] of (project.renders ?? []).entries()) {
      const image = await upload("image", render);
      if (image) {
        renders.push({ ...image, _key: `${project.slug}-render-${index}` });
      }
    }

    const configurations = [];
    for (const [index, config] of (project.configurations ?? []).entries()) {
      const floorPlan = config.floorPlanImageUrl
        ? await upload("image", config.floorPlanImageUrl)
        : undefined;
      configurations.push({
        _type: "configuration",
        _key: `${project.slug}-config-${index}`,
        label: config.label,
        ...(config.carpetAreaSqFt
          ? { carpetAreaSqFt: config.carpetAreaSqFt }
          : {}),
        ...(floorPlan
          ? { floorPlans: [{ ...floorPlan, _key: `${project.slug}-plan-0` }] }
          : {}),
      });
    }

    const brochure = await upload("file", project.brochureUrl);

    await client.createOrReplace({
      _id: `project-${project.slug}`,
      _type: "project",
      name: project.name,
      slug: { _type: "slug", current: project.slug },
      type: project.type,
      status: project.status,
      featured: Boolean(project.featured),
      description: project.description,
      ...(project.reraNumber ? { reraNumber: project.reraNumber } : {}),
      location: project.location,
      address: project.address,
      landmarks: mapLandmarks(project.landmarks, project.slug),
      ...(configurations.length ? { configurations } : {}),
      renders,
      ...(brochure ? { brochure } : {}),
      ...(project.videoReelYoutubeId
        ? { videoReelYoutubeId: project.videoReelYoutubeId }
        : {}),
    });
  }

  console.log(`\nTestimonials (${testimonials.length})`);
  for (const [index, testimonial] of testimonials.entries()) {
    await client.createOrReplace({
      _id: `testimonial-${slugify(testimonial.author)}`,
      _type: "testimonial",
      author: testimonial.author,
      quote: testimonial.quote,
      ...(testimonial.block ? { block: testimonial.block } : {}),
      ...(testimonial.rating ? { rating: testimonial.rating } : {}),
      order: (index + 1) * 10,
    });
    console.log(`- ${testimonial.author}`);
  }

  console.log(`\nTeam (${team.length})`);
  for (const [index, member] of team.entries()) {
    await client.createOrReplace({
      _id: `teamMember-${index + 1}`,
      _type: "teamMember",
      name: member.name,
      role: member.role,
      ...(member.bio ? { bio: member.bio } : {}),
      order: (index + 1) * 10,
    });
    console.log(`- ${member.role}`);
  }

  console.log("\nContact details");
  await client.createOrReplace({
    _id: "contactSettings",
    _type: "contactSettings",
    phones: contact.phones,
    whatsappNumber: contact.whatsappNumber,
    whatsappMessage: contact.whatsappMessage,
    email: contact.email,
    address: contact.address,
    hours: contact.hours,
  });

  console.log("\nDone.");
}

run().catch((error) => {
  console.error("\nMigration failed:", error.message);
  process.exit(1);
});
