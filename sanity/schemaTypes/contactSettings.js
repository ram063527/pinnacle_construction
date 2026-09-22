import { defineField, defineType } from "sanity";

// Singleton. Only one of these should ever exist; sanity/structure.js pins it to a
// fixed document ID and sanity.config.js hides the "create new" action.
export const contactSettings = defineType({
  name: "contactSettings",
  title: "Contact details",
  type: "document",
  fields: [
    defineField({
      name: "phones",
      title: "Phone numbers",
      type: "array",
      of: [{ type: "string" }],
      description: "Shown in the header, footer, and on the contact page.",
      validation: (rule) => rule.required().min(1).max(3),
    }),
    defineField({
      name: "whatsappNumber",
      title: "WhatsApp number",
      type: "string",
      description:
        "With country code and no spaces or plus sign, e.g. 917770020599. This builds the WhatsApp button link, so a wrong format means a dead button.",
      validation: (rule) =>
        rule
          .required()
          .regex(/^\d{10,15}$/, { name: "digits only" })
          .error("Digits only, including the country code. No + and no spaces."),
    }),
    defineField({
      name: "whatsappMessage",
      title: "WhatsApp opening message",
      type: "string",
      description:
        "Pre-filled in the visitor's WhatsApp when they tap the button.",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: "address",
      title: "Office address",
      type: "text",
      rows: 3,
      description:
        "The full office address. The map on the contact page searches for exactly this text, so check it finds the right place on Google Maps before publishing. Keep it identical to the address on the Google Business Profile.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "hours",
      title: "Opening hours",
      type: "string",
      description: 'Free text, e.g. "Mon - Sat: 10:00 AM - 7:00 PM".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "googleBusinessProfileUrl",
      title: "Google Business Profile link",
      type: "url",
      description:
        "Paste the profile link once it's verified. It tells Google that the site and the profile are the same business.",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Contact details" }),
  },
});
