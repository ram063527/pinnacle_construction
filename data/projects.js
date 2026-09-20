// Real Pinnacle Construction developments, cross-referenced from the client-supplied
// brochures and the live site (thepinnacleconstruction.in). Every name, address, and
// render below is real. Fields with no confirmed source value are left null so the UI
// shows "Coming soon" / omits them, rather than inventing numbers.
//
// Known gap: landmark distances (school/petrol pump/hospital/etc.) are not published
// anywhere by the client yet, so every project below has them set to null pending
// real measurements — do not fill these in with guessed values.
//
// Known gap: 4 more real completed-project names appear on the live site's project
// portfolio (Vishnu Laxmi, Durvang Residency-1 & 4, Avighna Residency, Mahalaxmi) but
// their gallery images on the live site are generic/unlabeled renders that can't be
// confidently matched to a specific name — omitted rather than guessed. Add them once
// the client confirms which render belongs to which project.

const emptyLandmarks = {
  school: null,
  petrolPump: null,
  hospital: null,
  supermarket: null,
  airportOrStation: null,
};

export const projects = [
  // --- Ongoing ---
  {
    slug: "dravin-enclave",
    name: "Dravin Enclave",
    type: "residential",
    status: "ongoing",
    featured: true,
    location: "Bhende Layout, Nagpur",
    address: "Plot No. 80-81, Indraprasth Nagar, Bhende Layout, London Street Road, Bhamti, Nagpur",
    reraNumber: null,
    description:
      "Spacious, modern 3BHK homes in Bhende Layout, designed for everyday family living with generous balconies and natural light.",
    landmarks: emptyLandmarks,
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
    slug: "durvang-avenue",
    name: "Durvang Avenue-1 & 2",
    type: "residential",
    status: "ongoing",
    location: "Manish Nagar, Nagpur",
    address: "Plot No. 165-173, Shilpa Society, Manish Nagar, Nagpur",
    reraNumber: null,
    description:
      "Twin residential towers in Manish Nagar offering spacious 3BHK homes with modern amenities.",
    landmarks: emptyLandmarks,
    configurations: [
      { label: "3BHK", carpetAreaSqFt: null, floorPlanImageUrl: null },
    ],
    renders: ["/images/durvang-avenue/exterior.jpg"],
    // Note: the client's own live site links a "Durvang Avenue" brochure that is
    // actually mislabeled Dravin Castle content (verified byte-for-byte identical).
    // Left null here rather than shipping the wrong project's brochure.
    brochureUrl: null,
    videoReelYoutubeId: null,
  },
  {
    slug: "durvang-residency-9",
    name: "Durvang Residency-9",
    type: "residential",
    status: "ongoing",
    featured: true,
    location: "Wardha Road, Nagpur",
    address: "Plot No. 45, Engg. Housing Society, Behind Airport Centre Point Hotel, Wardha Road, Nagpur",
    reraNumber: null,
    description:
      "Spacious 3BHK homes behind Airport Centre Point Hotel on Wardha Road, close to the airport and major commercial hubs.",
    landmarks: emptyLandmarks,
    configurations: [
      {
        label: "3BHK",
        carpetAreaSqFt: 1625,
        floorPlanImageUrl: "/images/durvang-residency-9/floorplan-3bhk.jpg",
      },
    ],
    renders: ["/images/durvang-residency-9/exterior.jpg"],
    brochureUrl: "/brochure/durvang-residency-9-brochure.pdf",
    videoReelYoutubeId: null,
  },

  // --- Upcoming ---
  {
    slug: "dravin-castle",
    name: "Dravin Castle",
    type: "residential",
    status: "upcoming",
    featured: true,
    location: "Narendra Nagar, Nagpur",
    address: "Plot No. 54 & 54A, Narendra Nagar, Near Gajanan Maharaj Mandir, Nagpur",
    reraNumber: null,
    description:
      "Premium 3BHK residences at Narendra Nagar, addressing the needs of a modern lifestyle with curated common areas and lush landscaping.",
    landmarks: emptyLandmarks,
    configurations: [
      {
        label: "3BHK",
        carpetAreaSqFt: 1925,
        floorPlanImageUrl: "/images/dravin-enclave/castle-floorplan.jpg",
      },
    ],
    renders: [
      "/images/dravin-enclave/castle-exterior-night.jpg",
      "/images/dravin-enclave/castle-interior-balcony.jpg",
    ],
    brochureUrl: "/brochure/dravin-castle-brochure.pdf",
    videoReelYoutubeId: null,
  },
  {
    slug: "dravin-pride",
    name: "Dravin Pride",
    type: "residential",
    status: "upcoming",
    location: "Sonegaon Lake, Nagpur",
    address: "Plot No. 18 & 19, Welcome Society, Near Sonegaon Lake, Nagpur",
    reraNumber: null,
    description: "Premium 3BHK homes near Sonegaon Lake, Nagpur.",
    landmarks: emptyLandmarks,
    configurations: [
      { label: "3BHK", carpetAreaSqFt: null, floorPlanImageUrl: null },
    ],
    renders: ["/images/dravin-pride/exterior.jpg"],
    brochureUrl: null,
    videoReelYoutubeId: null,
  },
  {
    slug: "safalya-heights",
    name: "Safalya Heights",
    type: "residential",
    status: "upcoming",
    location: "Pande Layout, Kamala, Nagpur",
    address: "Plot No. 8B, Pande Layout, Kamala, Nagpur",
    reraNumber: null,
    description: "A new residential tower in Pande Layout, Kamala.",
    landmarks: emptyLandmarks,
    configurations: [
      { label: "3BHK", carpetAreaSqFt: null, floorPlanImageUrl: null },
    ],
    renders: ["/images/safalya-heights/exterior.jpg"],
    brochureUrl: null,
    videoReelYoutubeId: null,
  },

  // --- Completed (single reused pre-construction render each, per client convention) ---
  {
    slug: "dravin-heights",
    name: "Dravin Heights",
    type: "residential",
    status: "completed",
    location: "Narendra Nagar, Nagpur",
    address: "Plot No. 313-314, Nagar Vikas Society, Narendra Nagar, Nagpur",
    reraNumber: null,
    description: "A completed residential development in Narendra Nagar, Nagpur.",
    landmarks: emptyLandmarks,
    configurations: [{ label: "3BHK", carpetAreaSqFt: null, floorPlanImageUrl: null }],
    renders: ["/images/completed/dravin-heights.jpg"],
    brochureUrl: null,
    videoReelYoutubeId: null,
  },
  {
    slug: "durvang-vasant-imperial",
    name: "Durvang Vasant Imperial",
    type: "residential",
    status: "completed",
    location: "Narendra Nagar Ext., Nagpur",
    address: "Narendra Nagar Extension, Nagpur",
    reraNumber: null,
    description: "A completed residential development at Narendra Nagar Extension, Nagpur.",
    landmarks: emptyLandmarks,
    configurations: [{ label: "3BHK", carpetAreaSqFt: null, floorPlanImageUrl: null }],
    renders: ["/images/completed/durvang-vasant-imperial.jpg"],
    brochureUrl: null,
    videoReelYoutubeId: null,
  },
  {
    slug: "durvang-residency-7",
    name: "Durvang Residency-7",
    type: "residential",
    status: "completed",
    location: "Jaiprakash Nagar, Nagpur",
    address: "Jaiprakash Nagar, Nagpur",
    reraNumber: null,
    description: "A completed residential development in Jaiprakash Nagar, Nagpur.",
    landmarks: emptyLandmarks,
    configurations: [{ label: "3BHK", carpetAreaSqFt: null, floorPlanImageUrl: null }],
    renders: ["/images/completed/durvang-residency-7.jpg"],
    brochureUrl: null,
    videoReelYoutubeId: null,
  },
  {
    slug: "durvang-residency-5",
    name: "Durvang Residency-5",
    type: "residential",
    status: "completed",
    location: "Pannase Layout, Nagpur",
    address: "Pannase Layout, Nagpur",
    reraNumber: null,
    description: "A completed residential development in Pannase Layout, Nagpur.",
    landmarks: emptyLandmarks,
    configurations: [{ label: "3BHK", carpetAreaSqFt: null, floorPlanImageUrl: null }],
    renders: ["/images/completed/durvang-residency-5.jpg"],
    brochureUrl: null,
    videoReelYoutubeId: null,
  },
  {
    slug: "durvang-residency-3",
    name: "Durvang Residency-3",
    type: "residential",
    status: "completed",
    location: "Omkar Nagar, Nagpur",
    address: "Omkar Nagar, Somalwada, Nagpur",
    reraNumber: null,
    description: "A completed residential development in Omkar Nagar, Nagpur.",
    landmarks: emptyLandmarks,
    configurations: [{ label: "3BHK", carpetAreaSqFt: null, floorPlanImageUrl: null }],
    renders: ["/images/completed/durvang-residency-3.jpg"],
    brochureUrl: null,
    videoReelYoutubeId: null,
  },
  {
    slug: "durvang-residency-6",
    name: "Durvang Residency-6",
    type: "residential",
    status: "completed",
    location: "Manish Nagar, Nagpur",
    address: "Manish Nagar, Nagpur",
    reraNumber: null,
    description: "A completed residential development in Manish Nagar, Nagpur.",
    landmarks: emptyLandmarks,
    configurations: [{ label: "3BHK", carpetAreaSqFt: null, floorPlanImageUrl: null }],
    renders: ["/images/completed/durvang-residency-6.jpg"],
    brochureUrl: null,
    videoReelYoutubeId: null,
  },
  {
    slug: "durvang-residency-2",
    name: "Durvang Residency-2",
    type: "residential",
    status: "completed",
    location: "Manish Nagar, Nagpur",
    address: "Manish Nagar, Nagpur",
    reraNumber: null,
    description: "A completed residential development in Manish Nagar, Nagpur.",
    landmarks: emptyLandmarks,
    configurations: [{ label: "3BHK", carpetAreaSqFt: null, floorPlanImageUrl: null }],
    renders: ["/images/completed/durvang-residency-2.jpg"],
    brochureUrl: null,
    videoReelYoutubeId: null,
  },
  {
    slug: "durvang-enclave-3",
    name: "Durvang Enclave-3",
    type: "residential",
    status: "completed",
    location: "Pannase Layout, Nagpur",
    address: "Patil Layout / Pannase Layout, Nagpur",
    reraNumber: null,
    description: "A completed residential development in Pannase Layout, Nagpur.",
    landmarks: emptyLandmarks,
    configurations: [{ label: "3BHK", carpetAreaSqFt: null, floorPlanImageUrl: null }],
    renders: ["/images/completed/durvang-enclave-3.jpg"],
    brochureUrl: null,
    videoReelYoutubeId: null,
  },
];

export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug);
}
