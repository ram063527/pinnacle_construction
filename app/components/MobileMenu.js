"use client";

import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-ink"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="1.8"
          stroke="currentColor"
          className="h-5 w-5 transition-transform duration-300"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            className="origin-center transition-all duration-300"
            d={open ? "M6 18L18 6M6 6l12 12" : "M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"}
          />
        </svg>
      </button>

      <nav
        className={`absolute inset-x-0 top-full overflow-hidden bg-surface shadow-lg transition-all duration-300 ease-out ${
          open ? "max-h-96 border-t border-border opacity-100" : "max-h-0 border-t-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-1 px-4 py-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-3 text-base font-medium text-ink transition-colors hover:bg-surface-raised"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 block rounded-full bg-cta px-4 py-3 text-center font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              Book a Site Visit
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
