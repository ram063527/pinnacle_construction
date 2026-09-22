// Status drives what a visitor can actually do with a project, so it is encoded in
// colour rather than in text they have to read card by card.
export const STATUS_BADGE = {
  ongoing: "bg-status-ongoing",
  upcoming: "bg-status-upcoming",
  completed: "bg-status-completed",
};

export const STATUS_ORDER = ["ongoing", "upcoming", "completed"];

// The client picks this per project; nothing derives it. Status says where the build
// is, the badge says what the sales team wants shouted about. They are independent.
export const BADGE_LABELS = {
  newlyLaunched: "Newly Launched",
  bookingOpen: "Booking Open",
};

export function badgeLabel(badge) {
  return BADGE_LABELS[badge];
}

// Status pills are solid brand colour. The badge sits opposite them as a pale
// sticker so the two never read as one row of the same thing.
export const BADGE_PILL =
  "absolute right-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-crimson-600 shadow-sm";

export function badgeClass(status) {
  return STATUS_BADGE[status] ?? "bg-status-completed";
}

// Buyable work first; finished work is portfolio, not inventory. Within a status,
// newest first, so a project the client just added surfaces without him ranking it.
export function byActionability(a, b) {
  const byStatus =
    STATUS_ORDER.indexOf(a.status) - STATUS_ORDER.indexOf(b.status);
  if (byStatus !== 0) return byStatus;
  return String(b._createdAt ?? "").localeCompare(String(a._createdAt ?? ""));
}

// "Narendra Nagar Ext." and "Narendra Nagar" are one place to a buyer. Beyond merging
// obvious variants we do not group localities: inventing Nagpur area groupings would
// be guessing, and this catalog's rule is to never guess.
export function areaOf(location) {
  return location
    .replace(/,\s*Nagpur$/, "")
    .replace(/\s*(Ext\.?|Extension)$/i, "")
    .trim();
}
