import { getContact } from "@/sanity/lib/content";

export const metadata = {
  title: "Privacy Policy",
  alternates: { canonical: "/privacy" },
};

export default async function PrivacyPage() {
  const contact = await getContact();

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-heading text-3xl font-extrabold text-ink">Privacy Policy</h1>
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-ink-muted">
        <p>
          Pinnacle Construction (&ldquo;we&rdquo;, &ldquo;us&rdquo;) collects the information you submit through our
          site-visit booking form &mdash; your name, phone number, email address, project of interest,
          preferred visit date, and any message you provide &mdash; solely to respond to your enquiry and
          arrange a site visit.
        </p>
        <p>
          This information is sent directly to our team by email and is not sold, shared with third
          parties for marketing purposes, or used for any purpose beyond responding to your request.
        </p>
        <p>
          If you would like your information removed from our records, contact us at{" "}
          <a href={`mailto:${contact.email}`} className="text-brand-blue-500 hover:underline">
            {contact.email}
          </a>{" "}
          or call {contact.phones[0]}.
        </p>
      </div>
    </section>
  );
}
