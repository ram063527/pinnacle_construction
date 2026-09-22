"use client";

import { useState } from "react";

export default function Faq({ faqs }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="divide-y divide-border rounded-2xl border border-border bg-surface-raised">
      {faqs.map((faq, index) => {
        const open = openIndex === index;
        return (
          <div key={faq.question}>
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : index)}
              aria-expanded={open}
              className="flex w-full items-center justify-between gap-4 p-5 text-left"
            >
              <span className="font-heading font-semibold text-ink">{faq.question}</span>
              <span
                aria-hidden="true"
                className={`shrink-0 text-xl font-semibold text-brand-crimson-500 transition-transform ${open ? "rotate-45" : ""}`}
              >
                +
              </span>
            </button>
            {open && (
              <p className="px-5 pb-5 text-sm leading-relaxed text-ink-muted">{faq.answer}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
