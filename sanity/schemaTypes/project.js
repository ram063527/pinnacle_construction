import { defineField, defineType } from "sanity";
import { FIXED_LANDMARK_KINDS } from "./landmark";

const isResidential = ({ document }) => document?.type !== "residential";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  groups: [
    { name: "main", title: "Project", default: true },
    { name: "location", title: "Location" },
    { name: "media", title: "Media" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      group: "main",
      description: 'As it should appear on the site, e.g. "Dravin Enclave".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL",
      type: "slug",
      group: "main",
      description:
        "The web address for this project. Generated from the name. Changing it after launch breaks any link already shared.",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      group: "main",
      options: {
        list: [
          { title: "Residential", value: "residential" },
          { title: "Commercial", value: "commercial" },
          { title: "Redevelopment", value: "redevelopment" },
        ],
        layout: "radio",
      },
      initialValue: "residential",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      group: "main",
      description:
        "A development where different phases are at different stages should be entered as separate projects, one per phase.",
      options: {
        list: [
          { title: "Upcoming", value: "upcoming" },
          { title: "Ongoing", value: "ongoing" },
          { title: "Completed", value: "completed" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Show on homepage",
      type: "boolean",
      group: "main",
      description:
        "Featured projects appear in the homepage selection. Keep this to a handful.",
      initialValue: false,
    }),
    defineField({
      name: "badge",
      title: "Badge",
      type: "string",
      group: "main",
      description:
        "An optional label shown on the project card. Nothing sets this automatically, so remember to clear it when it stops being true.",
      options: {
        list: [
          { title: "Newly Launched", value: "newlyLaunched" },
          { title: "Booking Open", value: "bookingOpen" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      group: "main",
      rows: 4,
      description:
        "One or two sentences. Also used as the default search-result description.",
      validation: (rule) => rule.required().min(40).max(400),
    }),
    defineField({
      name: "reraNumber",
      title: "RERA number",
      type: "string",
      group: "main",
      description:
        'Leave blank until the project is registered. The site shows "Coming soon" instead.',
    }),
    defineField({
      name: "configurations",
      title: "Configurations",
      type: "array",
      group: "main",
      description: "The unit types available, e.g. 2BHK and 3BHK.",
      of: [{ type: "configuration" }],
      hidden: isResidential,
    }),

    defineField({
      name: "location",
      title: "Locality",
      type: "string",
      group: "location",
      description: 'Short area label shown on cards, e.g. "Manish Nagar, Nagpur".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "address",
      title: "Full address",
      type: "string",
      group: "location",
      description:
        "The complete address including plot number. This is what the map on the project page searches for, so make sure it finds the right place on Google Maps before publishing.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "landmarks",
      title: "Nearby landmarks",
      type: "array",
      group: "location",
      description:
        "Four rows are here by default. Fill in the ones that apply and delete the rest. Add more rows for anything else worth showing.",
      of: [{ type: "landmark" }],
      initialValue: FIXED_LANDMARK_KINDS.map((kind) => ({
        _type: "landmark",
        kind: kind.value,
      })),
    }),

    defineField({
      name: "renders",
      title: "Renders",
      type: "array",
      group: "media",
      description:
        "Marketing visualisations of the project. The first one is used as the cover image everywhere.",
      of: [{ type: "image", options: { hotspot: true } }],
      validation: (rule) => rule.required().min(1).max(12),
    }),
    defineField({
      name: "brochure",
      title: "Brochure",
      type: "file",
      group: "media",
      description: "The marketing PDF, if there is one.",
      options: { accept: ".pdf" },
    }),
    defineField({
      name: "videoReelYoutubeId",
      title: "Video reel (YouTube ID)",
      type: "string",
      group: "media",
      description:
        'Just the ID, not the full link. In https://youtu.be/hc9jiNurWJc the ID is hc9jiNurWJc.',
      validation: (rule) =>
        rule.regex(/^[A-Za-z0-9_-]{11}$/, {
          name: "YouTube video ID",
        }).error("That looks like a full link. Paste only the 11-character ID."),
    }),

    defineField({
      name: "seoTitle",
      title: "Search result title",
      type: "string",
      group: "seo",
      description:
        "Leave blank and the project name is used. Only fill this in if you want something different in Google.",
      validation: (rule) => rule.max(60),
    }),
    defineField({
      name: "seoDescription",
      title: "Search result description",
      type: "text",
      group: "seo",
      rows: 3,
      description:
        "Leave blank and the description above is used.",
      validation: (rule) => rule.max(160),
    }),
  ],
  orderings: [
    {
      title: "Status, then newest",
      name: "statusThenNewest",
      by: [
        { field: "status", direction: "asc" },
        { field: "_createdAt", direction: "desc" },
      ],
    },
  ],
  preview: {
    select: {
      title: "name",
      status: "status",
      location: "location",
      featured: "featured",
      media: "renders.0",
    },
    prepare({ title, status, location, featured, media }) {
      const parts = [status, location].filter(Boolean);
      return {
        title: featured ? `${title} ★` : title,
        subtitle: parts.join(" · "),
        media,
      };
    },
  },
});
