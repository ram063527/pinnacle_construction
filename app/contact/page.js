import { Suspense } from "react";
import { contact } from "@/data/contact";
import BookingForm from "./BookingForm";
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
            <p className="mt-2 font-heading text-xl font-bold text-ink">{contact.phones[0]}</p>
            <p className="font-heading text-xl font-bold text-ink">{contact.phones[1]}</p>
            <p className="mt-2 text-sm text-ink-muted">{contact.hours}</p>
          </div>

          <div>
            <div className="flex items-center gap-2 text-brand-crimson-600">
              <Icon name="envelope" className="h-5 w-5" />
              <h2 className="font-heading text-lg font-bold">Our Message</h2>
            </div>
            <p className="mt-1 text-sm text-ink-muted">We&apos;re usually replying within 24 hours.</p>
            <p className="mt-2 font-heading text-lg font-semibold text-ink">{contact.email}</p>
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
    </section>
  );
}
