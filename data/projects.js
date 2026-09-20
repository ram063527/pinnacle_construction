// Real Pinnacle Construction developments, cross-referenced from the client-supplied
// brochures and the live site (thepinnacleconstruction.in). Every name, address, and
// render below is real. Fields with no confirmed source value are left null so the UI
// shows "Coming soon" / omits them, rather than inventing numbers.
//
// Landmark distances: the client publishes none, so these were researched per locality
// rather than measured per plot. Read `landmarkAccuracy` below before trusting a number.
// The UI labels every figure "approx." for this reason. Get the client to confirm them
// before launch; correcting one is a one-line edit.
//
// Known gap: 4 more real completed-project names appear on the live site's project
// portfolio (Vishnu Laxmi, Durvang Residency-1 & 4, Avighna Residency, Mahalaxmi) but
// their gallery images on the live site are generic/unlabeled renders that can't be
// confidently matched to a specific name — omitted rather than guessed. Add them once
// the client confirms which render belongs to which project.

// Which of the figures below came from a source and which are locality estimates.
//   SOURCED  - published distance found during research, reused for projects in that locality
//   ESTIMATE - real named place, distance inferred from locality geography. Confirm with the client.
// SOURCED: airport 3 km from Somalwada; Ajni station ~7 km from Somalwada; Jaiprakash Nagar
// metro 1.25 km from Manish Nagar; Airport South metro 1.65 km from Somalwada.
// Everything else is ESTIMATE. Place names are real and were verified as existing in the
// corridor; it is the kilometre figures that are approximate.
export const landmarkAccuracy = "locality-researched";

const nearby = (school, hospital, supermarket, petrolPump, metro, airport) => [
  { kind: "school", ...school },
  { kind: "hospital", ...hospital },
  { kind: "supermarket", ...supermarket },
  { kind: "petrolPump", ...petrolPump },
  { kind: "metro", ...metro },
  { kind: "airportOrStation", ...airport },
];

// --- Wardha Road corridor (Somalwada, Jaiprakash Nagar, Wardha Road) ---
const wardhaRoadCorridor = nearby(
  { name: "Narayana Vidyalayam, Somalwada", km: 1.5 },
  { name: "KRIMS Hospitals", km: 2 },
  { name: "D-Mart", km: 2 },
  { name: "Wardha Road fuel station", km: 0.6 },
  { name: "Airport South Metro", km: 1.2 },
  { name: "Dr. Babasaheb Ambedkar International Airport", km: 2 }
);

const jaiprakashNagar = nearby(
  { name: "Narayana Vidyalayam, Somalwada", km: 1.5 },
  { name: "KRIMS Hospitals", km: 2 },
  { name: "D-Mart", km: 1.8 },
  { name: "Wardha Road fuel station", km: 0.9 },
  { name: "Jaiprakash Nagar Metro", km: 0.6 },
  { name: "Dr. Babasaheb Ambedkar International Airport", km: 3.5 }
);

const somalwada = nearby(
  { name: "Narayana Vidyalayam, Somalwada", km: 1 },
  { name: "KRIMS Hospitals", km: 2.5 },
  { name: "D-Mart", km: 1.5 },
  { name: "Wardha Road fuel station", km: 1 },
  { name: "Airport South Metro", km: 1.65 },
  { name: "Dr. Babasaheb Ambedkar International Airport", km: 3 }
);

// --- Manish Nagar ---
const manishNagar = nearby(
  { name: "Seven Stars School", km: 1.2 },
  { name: "Sanjeevani Hospital", km: 1.5 },
  { name: "D-Mart, Manish Nagar", km: 1.8 },
  { name: "Manish Nagar fuel station", km: 1.4 },
  { name: "Jaiprakash Nagar Metro", km: 1.25 },
  { name: "Dr. Babasaheb Ambedkar International Airport", km: 3.5 }
);

// --- Narendra Nagar ---
const narendraNagar = nearby(
  { name: "Royal Gondwana Public School", km: 1.8 },
  { name: "Suyog Hospital", km: 1.5 },
  { name: "Big Bazaar", km: 2.5 },
  { name: "Ring Road fuel station", km: 1.2 },
  { name: "Jaiprakash Nagar Metro", km: 2.2 },
  { name: "Dr. Babasaheb Ambedkar International Airport", km: 4.5 }
);

// --- Pannase Layout ---
const pannaseLayout = nearby(
  { name: "Seven Stars School", km: 1.8 },
  { name: "Medipoint Hospital", km: 2.2 },
  { name: "D-Mart", km: 2 },
  { name: "Beltarodi Road fuel station", km: 1.3 },
  { name: "Ujjwal Nagar Metro", km: 2 },
  { name: "Dr. Babasaheb Ambedkar International Airport", km: 4 }
);

// --- Khamla / Bhamti / Sonegaon side ---
const bhamti = nearby(
  { name: "Centre Point School, Wardha Road", km: 2.5 },
  { name: "Orange City Hospital, Khamla", km: 3 },
  { name: "Reliance Smart, Khamla", km: 2 },
  { name: "Khamla Road fuel station", km: 1.5 },
  { name: "Jaiprakash Nagar Metro", km: 3.5 },
  { name: "Dr. Babasaheb Ambedkar International Airport", km: 5.5 }
);

const sonegaon = nearby(
  { name: "Centre Point School, Wardha Road", km: 2 },
  { name: "Orange City Hospital, Khamla", km: 2 },
  { name: "Big Bazaar, Khamla", km: 2 },
  { name: "Khamla Road fuel station", km: 1.2 },
  { name: "Jaiprakash Nagar Metro", km: 3 },
  { name: "Dr. Babasaheb Ambedkar International Airport", km: 5 }
);

const pandeLayout = nearby(
  { name: "Yashwant Public School", km: 2 },
  { name: "Orange City Hospital, Khamla", km: 2.5 },
  { name: "D-Mart", km: 2.5 },
  { name: "Beltarodi Road fuel station", km: 1.5 },
  { name: "Jaiprakash Nagar Metro", km: 3.5 },
  { name: "Dr. Babasaheb Ambedkar International Airport", km: 6 }
);

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
    landmarks: bhamti,
    configurations: [
      {
        label: "3BHK",
        carpetAreaSqFt: 1575,
        floorPlanImageUrl: "/images/dravin-enclave/floorplan-3bhk.jpg",
      },
    ],
    // cutaway-3bhk was extracted from this project's own brochure PDF.
    renders: [
      "/images/dravin-enclave/exterior-day.jpg",
      "/images/dravin-enclave/exterior-night.jpg",
      "/images/dravin-enclave/cutaway-3bhk.jpg",
    ],
    brochureUrl: "/brochure/dravin-enclave-brochure.pdf",
    videoReelYoutubeId: "hc9jiNurWJc",
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
    landmarks: manishNagar,
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
    landmarks: wardhaRoadCorridor,
    configurations: [
      {
        label: "3BHK",
        carpetAreaSqFt: 1625,
        floorPlanImageUrl: "/images/durvang-residency-9/floorplan-3bhk.jpg",
      },
    ],
    // interior-living and cutaway-3bhk were extracted from this project's own brochure
    // PDF. See public/images/durvang-residency-9/CREDITS.md for provenance.
    renders: [
      "/images/durvang-residency-9/exterior.jpg",
      "/images/durvang-residency-9/cutaway-3bhk.jpg",
      "/images/durvang-residency-9/interior-living.jpg",
    ],
    brochureUrl: "/brochure/durvang-residency-9-brochure.pdf",
    videoReelYoutubeId: "6EEVSM6ZHGM",
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
    landmarks: narendraNagar,
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
    videoReelYoutubeId: "TCIeNLlFrQU",
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
    landmarks: sonegaon,
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
    landmarks: pandeLayout,
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
    landmarks: narendraNagar,
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
    landmarks: narendraNagar,
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
    landmarks: jaiprakashNagar,
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
    landmarks: pannaseLayout,
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
    landmarks: somalwada,
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
    landmarks: manishNagar,
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
    landmarks: manishNagar,
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
    landmarks: pannaseLayout,
    configurations: [{ label: "3BHK", carpetAreaSqFt: null, floorPlanImageUrl: null }],
    renders: ["/images/completed/durvang-enclave-3.jpg"],
    brochureUrl: null,
    videoReelYoutubeId: null,
  },
];

export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug);
}
