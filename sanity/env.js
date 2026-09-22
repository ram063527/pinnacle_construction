export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-05-19";

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "Missing environment variable: NEXT_PUBLIC_SANITY_DATASET"
);

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID"
);

function assertValue(value, errorMessage) {
  if (value === undefined) throw new Error(errorMessage);
  return value;
}
