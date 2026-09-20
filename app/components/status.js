// Status drives what a visitor can actually do with a project, so it is encoded in
// colour rather than in text they have to read card by card.
export const STATUS_BADGE = {
  ongoing: "bg-status-ongoing",
  upcoming: "bg-status-upcoming",
  completed: "bg-status-completed",
};

export const STATUS_ORDER = ["ongoing", "upcoming", "completed"];

export function badgeClass(status) {
  return STATUS_BADGE[status] ?? "bg-status-completed";
}

// Buyable work first; finished work is portfolio, not inventory.
export function byActionability(a, b) {
  return STATUS_ORDER.indexOf(a.status) - STATUS_ORDER.indexOf(b.status);
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
