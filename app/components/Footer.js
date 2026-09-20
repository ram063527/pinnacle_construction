import Link from "next/link";
import { contact } from "@/data/contact";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface-raised">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <h3 className="font-heading text-lg font-bold text-brand-crimson-600">Pinnacle Construction</h3>
          <p className="mt-3 max-w-xs text-sm text-ink-muted">
            15 years of building trusted homes in Nagpur. 43 projects completed, 521 happy clients.
          </p>
        </div>

        <div>
          <h4 className="font-heading text-sm font-semibold uppercase tracking-wide text-ink-muted">
            Quick Links
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/" className="hover:text-brand-blue-500">Home</Link></li>
            <li><Link href="/about" className="hover:text-brand-blue-500">About Us</Link></li>
            <li><Link href="/projects" className="hover:text-brand-blue-500">Projects</Link></li>
            <li><Link href="/contact" className="hover:text-brand-blue-500">Contact</Link></li>
            <li><Link href="/privacy" className="hover:text-brand-blue-500">Privacy Policy</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-sm font-semibold uppercase tracking-wide text-ink-muted">
            Get in Touch
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-ink-muted">
            <li className="flex flex-wrap gap-x-2">
              {contact.phones.map((phone, index) => (
                <span key={phone} className="flex gap-x-2">
                  {index > 0 && <span aria-hidden="true">/</span>}
                  <a
                    href={`tel:+91${phone}`}
                    className="underline-offset-4 transition-colors hover:text-brand-crimson-500 hover:underline"
                  >
                    {phone}
                  </a>
                </span>
              ))}
            </li>
            <li>
              <a
                href={`mailto:${contact.email}`}
                className="break-all underline-offset-4 transition-colors hover:text-brand-crimson-500 hover:underline"
              >
                {contact.email}
              </a>
            </li>
            <li>
              <a
                href={`https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(contact.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-4 transition-colors hover:text-brand-crimson-500 hover:underline"
              >
                WhatsApp us
              </a>
            </li>
            <li>{contact.address}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border py-6 text-center text-xs text-ink-muted">
        © {new Date().getFullYear()} Pinnacle Construction. All rights reserved.
      </div>
    </footer>
  );
}
