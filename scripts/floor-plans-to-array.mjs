// One-off: moves each configuration's single `floorPlan` image into the
// `floorPlans` array that replaced it. Safe to re-run; configurations that have
// already moved are skipped. Covers drafts too, so an unpublished edit isn't lost.
//
//   node scripts/floor-plans-to-array.mjs          dry run, prints what would change
//   node scripts/floor-plans-to-array.mjs --write  applies it
//
// Needs SANITY_API_WRITE_TOKEN in .env.local, same as migrate-to-sanity.mjs.

import { createClient } from "@sanity/client";
import { readFile } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const write = process.argv.includes("--write");

const env = Object.fromEntries(
  (await readFile(path.join(ROOT, ".env.local"), "utf8"))
    .split("\n")
    .filter((line) => line.trim() && !line.trim().startsWith("#"))
    .map((line) => {
      const at = line.indexOf("=");
      return [line.slice(0, at).trim(), line.slice(at + 1).trim().replace(/^"|"$/g, "")];
    })
);

const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION,
  token: env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
  perspective: "raw",
});

const docs = await client.fetch(
  `*[_type == "project" && count(configurations[defined(floorPlan)]) > 0]{ _id, configurations }`
);

// No process.exit() below: on Windows it aborts while the HTTP agent is still
// closing its socket. Let the script end naturally instead.
const transaction = client.transaction();
for (const doc of docs) {
  const configurations = doc.configurations.map((config) => {
    if (!config.floorPlan) return config;
    const { floorPlan, ...rest } = config;
    return {
      ...rest,
      floorPlans: [...(rest.floorPlans ?? []), { ...floorPlan, _key: `${config._key}-plan-0` }],
    };
  });
  console.log(`${doc._id}: ${doc.configurations.filter((c) => c.floorPlan).length} floor plan(s)`);
  transaction.patch(doc._id, (patch) => patch.set({ configurations }));
}

if (docs.length === 0) {
  console.log("Nothing to migrate.");
} else if (!write) {
  console.log("\nDry run. Re-run with --write to apply.");
} else {
  await transaction.commit();
  console.log("\nDone.");
}
