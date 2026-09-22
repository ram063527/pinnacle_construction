import { defineField, defineType } from "sanity";

export const configuration = defineType({
  name: "configuration",
  title: "Configuration",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      description: 'The unit type, e.g. "2BHK" or "3BHK".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "carpetAreaSqFt",
      title: "Carpet area (sq ft)",
      type: "number",
      description: "Leave blank if not confirmed yet.",
      validation: (rule) => rule.min(100).max(20000),
    }),
    defineField({
      name: "floorPlan",
      title: "Floor plan",
      type: "image",
      description:
        "The layout diagram for this unit type, usually taken from the project brochure.",
      options: { hotspot: false },
    }),
  ],
  preview: {
    select: { label: "label", area: "carpetAreaSqFt", media: "floorPlan" },
    prepare({ label, area, media }) {
      return {
        title: label,
        subtitle: area ? `${area} sq ft carpet` : "Carpet area not set",
        media,
      };
    },
  },
});
