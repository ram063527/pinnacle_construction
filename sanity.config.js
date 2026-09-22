"use client";

import { buildLegacyTheme, defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";
import { StudioIcon } from "./sanity/components/StudioIcon";

// Brand blue and crimson from DESIGN.md. Everything not listed keeps Sanity's default.
const theme = buildLegacyTheme({
  "--brand-primary": "#1c6dae",
  "--focus-color": "#2f86c4",
  "--default-button-primary-color": "#1c6dae",
  "--state-info-color": "#1c6dae",
  "--default-button-danger-color": "#ae1f3d",
  "--state-danger-color": "#ae1f3d",
});

// Vision is a query console for developers. The client never needs it, so it only
// loads when running locally.
const devOnlyPlugins =
  process.env.NODE_ENV === "development"
    ? [visionTool({ defaultApiVersion: apiVersion })]
    : [];

export default defineConfig({
  name: "pinnacle-construction",
  title: "Pinnacle Construction",
  basePath: "/studio",
  icon: StudioIcon,
  theme,
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [structureTool({ structure }), ...devOnlyPlugins],
  document: {
    // The singleton is created once by the migration script and never duplicated.
    newDocumentOptions: (prev) =>
      prev.filter((item) => item.templateId !== "contactSettings"),
  },
});
