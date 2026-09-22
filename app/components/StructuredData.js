import { getContact } from "@/sanity/lib/content";
import { SITE_NAME, SITE_URL } from "@/sanity/lib/site";

// Tells Google that this site and the Google Business Profile are the same Nagpur
// business. GeneralContractor is a subtype of LocalBusiness, which is what makes the
// address and phone eligible for the business panel on a branded search.
export default async function StructuredData() {
  const contact = await getContact();

  const data = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    email: contact.email,
    telephone: contact.phones.map((phone) => `+91${phone}`),
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address,
      addressLocality: "Nagpur",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
    areaServed: { "@type": "City", name: "Nagpur" },
    ...(contact.googleBusinessProfileUrl
      ? { sameAs: [contact.googleBusinessProfileUrl] }
      : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
