import { Suspense } from "react";
import { contact, faqs } from "@/data/contact";
import BookingForm from "./BookingForm";
import Faq from "./Faq";
import { Icon } from "@/app/components/icons";

export const metadata = {
  title: "Contact Us | Pinnacle Construction",
  description: "Get in touch with Pinnacle Construction or book a site visit to one of our Nagpur projects.",
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <h1 className="font-heading text-4xl font-extrabold text-ink">Get in Touch</h1>
        <p className="mt-3 text-ink-muted">
          Share your requirements with us to help us know your design in more detail.
        </p>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-2 text-brand-crimson-600">
              <Icon name="phone" className="h-5 w-5" />
              <h2 className="font-heading text-lg font-bold">Call Us</h2>
            </div>
            <p className="mt-1 text-sm text-ink-muted">Talk to our experts about how we can work together.</p>
            <div className="mt-2 flex flex-col items-start gap-1">
              {contact.phones.map((phone) => (
                <a
                  key={phone}
                  href={`tel:+91${phone}`}
                  className="font-heading text-xl font-bold text-ink underline-offset-4 transition-colors hover:text-brand-crimson-500 hover:underline"
                >
                  +91 {phone}
                </a>
              ))}
            </div>
            <p className="mt-2 text-sm text-ink-muted">{contact.hours}</p>
            <a
              href={`https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(contact.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-cta px-5 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-cta-hover hover:shadow-md"
            >
              <Icon name="phone" className="h-4 w-4" />
              Chat on WhatsApp
            </a>
          </div>

          <div>
            <div className="flex items-center gap-2 text-brand-crimson-600">
              <Icon name="envelope" className="h-5 w-5" />
              <h2 className="font-heading text-lg font-bold">Email Us</h2>
            </div>
            <p className="mt-1 text-sm text-ink-muted">We&apos;re usually replying within 24 hours.</p>
            <a
              href={`mailto:${contact.email}`}
              className="mt-2 inline-block font-heading text-lg font-semibold text-ink underline-offset-4 transition-colors hover:text-brand-crimson-500 hover:underline"
            >
              {contact.email}
            </a>
          </div>

          <div>
            <div className="flex items-center gap-2 text-brand-crimson-600">
              <Icon name="mapPin" className="h-5 w-5" />
              <h2 className="font-heading text-lg font-bold">Our Location</h2>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">{contact.address}</p>
            <div className="mt-4 overflow-hidden rounded-2xl border border-border">
              <iframe
                src={contact.mapEmbedUrl}
                title="Pinnacle Construction office location"
                className="h-72 w-full"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        <div>
          <Suspense fallback={null}>
            <BookingForm />
          </Suspense>
        </div>
      </div>

      <div className="mx-auto mt-20 max-w-3xl">
        <div className="text-center">
          <h2 className="font-heading text-2xl font-bold text-ink sm:text-3xl">
            Committed to quality construction you can trust
          </h2>
          <p className="mt-3 text-ink-muted">
            We&apos;ve been trusted by clients and housing societies across Nagpur for over 15
            years, backed by a team that delivers even on tight deadlines.
          </p>
        </div>
        <div className="mt-8">
          <Faq faqs={faqs} />
        </div>
      </div>
    </section>
  );
}
