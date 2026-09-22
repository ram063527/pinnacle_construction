import { defineField, defineType } from "sanity";

// The four kinds offered on every Project, pre-seeded into the array. The client
// fills in the ones that apply and deletes the rows that don't. Everything below
// the divider is opt-in: the client adds those rows himself.
export const FIXED_LANDMARK_KINDS = [
  { title: "School", value: "school" },
  { title: "Hospital", value: "hospital" },
  { title: "Metro / Station", value: "metroOrStation" },
  { title: "Airport", value: "airport" },
];

export const OPTIONAL_LANDMARK_KINDS = [
  { title: "Supermarket", value: "supermarket" },
  { title: "Petrol Pump", value: "petrolPump" },
  { title: "Temple", value: "temple" },
  { title: "Park", value: "park" },
  { title: "College", value: "college" },
  { title: "IT Park", value: "itPark" },
  { title: "Bus Stand", value: "busStand" },
];

export const LANDMARK_KINDS = [
  ...FIXED_LANDMARK_KINDS,
  ...OPTIONAL_LANDMARK_KINDS,
];

export const landmark = defineType({
  name: "landmark",
  title: "Landmark",
  type: "object",
  fields: [
    defineField({
      name: "kind",
      title: "Kind",
      type: "string",
      description:
        "Pick from the list. Every kind has its own icon on the site, which is why this isn't a free text box.",
      options: { list: LANDMARK_KINDS },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "name",
      title: "Place name",
      type: "string",
      description:
        'The real name of the place, e.g. "Narayana Vidyalayam, Somalwada". Leave the whole row blank and delete it if this kind does not apply to the project.',
      validation: (rule) =>
        rule.custom((value, context) => {
          const km = context.parent?.km;
          if (km !== undefined && km !== null && !value) {
            return "Add the place name, or clear the distance and delete this row.";
          }
          return true;
        }),
    }),
    defineField({
      name: "km",
      title: "Distance (km)",
      type: "number",
      description:
        "Approximate distance by road. The site always labels these as approximate.",
      validation: (rule) =>
        rule
          .min(0)
          .max(100)
          .custom((value, context) => {
            const name = context.parent?.name;
            if (name && (value === undefined || value === null)) {
              return "Add the distance, or clear the place name and delete this row.";
            }
            return true;
          }),
    }),
  ],
  preview: {
    select: { kind: "kind", name: "name", km: "km" },
    prepare({ kind, name, km }) {
      const label =
        LANDMARK_KINDS.find((option) => option.value === kind)?.title || kind;
      return {
        title: name || `${label} (not set)`,
        subtitle: km !== undefined && km !== null ? `${label} · ${km} km` : label,
      };
    },
  },
});
