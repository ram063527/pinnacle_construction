// Real Pinnacle Construction developments (from client-supplied brochures).
// Only Dravin Enclave and Dravin Castle have extracted imagery so far; the other
// four real project names below (Dravin Heights, Durvang Vasant Imperial, Durvang
// Avenue 1&2, Durvang Residency-9) are known from the brochure's own project
// portfolio page but still need source photos before they can ship with media.

export const projects = [
  {
    slug: "dravin-enclave",
    name: "Dravin Enclave",
    type: "residential",
    status: "ongoing",
    location: "Bhende Layout, Nagpur",
    address: "Plot No. 80-81, Indraprasth Nagar, Bhende Layout, London Street Road, Bhamti, Nagpur",
    reraNumber: null,
    description:
      "Spacious, modern 3BHK homes in Bhende Layout, designed for everyday family living with generous balconies and natural light.",
    landmarks: {
      school: "1.1 km",
      petrolPump: "0.9 km",
      hospital: "2.3 km",
      supermarket: "0.6 km",
      airportOrStation: "7 km",
    },
    configurations: [
      {
        label: "3BHK",
        carpetAreaSqFt: 1575,
        floorPlanImageUrl: "/images/dravin-enclave/floorplan-3bhk.jpg",
      },
    ],
    renders: [
      "/images/dravin-enclave/exterior-day.jpg",
      "/images/dravin-enclave/exterior-night.jpg",
    ],
    brochureUrl: "/brochure/dravin-enclave-brochure.pdf",
    videoReelYoutubeId: null,
  },
  {
    slug: "dravin-castle",
    name: "Dravin Castle",
    type: "residential",
    status: "upcoming",
    location: "Narendra Nagar, Nagpur",
    address: "Plot No. 54 & 54A, Narendra Nagar, Near Gajanan Maharaj Mandir, Nagpur",
    reraNumber: null,
    description:
      "Premium 3BHK residences at Narendra Nagar, addressing the needs of a modern lifestyle with curated common areas and lush landscaping.",
    landmarks: {
      school: "1.4 km",
      petrolPump: "1.2 km",
      hospital: "3 km",
      supermarket: "0.8 km",
      airportOrStation: "5.5 km",
    },
    configurations: [
      {
        label: "3BHK",
        carpetAreaSqFt: null,
        floorPlanImageUrl: null,
      },
    ],
    renders: [
      "/images/dravin-enclave/castle-exterior-night.jpg",
      "/images/dravin-enclave/castle-interior-balcony.jpg",
    ],
    brochureUrl: null,
    videoReelYoutubeId: null,
  },
];

export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug);
}
