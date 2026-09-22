import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "author",
      title: "Client name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 5,
      validation: (rule) => rule.required().min(20).max(600),
    }),
    defineField({
      name: "block",
      title: "Building block",
      type: "string",
      description:
        'The block only, e.g. "D-2". Never the flat number: a name plus a door number is more than a public review should give away.',
    }),
    defineField({
      name: "rating",
      title: "Rating",
      type: "number",
      description: "Out of 5. Leave blank to show no stars.",
      options: {
        list: [1, 2, 3, 4, 5],
        layout: "radio",
        direction: "horizontal",
      },
      initialValue: 5,
      validation: (rule) => rule.min(1).max(5).integer(),
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Lower numbers appear first in the homepage carousel.",
      initialValue: 100,
    }),
  ],
  orderings: [
    {
      title: "Display order",
      name: "displayOrder",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "author", block: "block", quote: "quote" },
    prepare({ title, block, quote }) {
      return { title: block ? `${title} · ${block}` : title, subtitle: quote };
    },
  },
});
