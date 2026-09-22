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
      name: "floorPlans",
      title: "Floor plans",
      type: "array",
      description:
        "Layout diagrams for this unit type, usually taken from the project brochure. Add one per variant, e.g. east- and west-facing. They show on the site in this order.",
      of: [{ type: "image", options: { hotspot: false } }],
      validation: (rule) => rule.max(6),
    }),
  ],
  preview: {
    select: { label: "label", area: "carpetAreaSqFt", media: "floorPlans.0" },
    prepare({ label, area, media }) {
      return {
        title: label,
        subtitle: area ? `${area} sq ft carpet` : "Carpet area not set",
        media,
      };
    },
  },
});
