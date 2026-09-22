"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/app/components/icons";

const FIELD =
  "w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-ink transition-colors focus:border-brand-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-crimson-400/50";
const FIELD_WITH_ICON =
  "w-full rounded-lg border border-border bg-surface py-2.5 pl-10 pr-4 text-sm text-ink transition-colors focus:border-brand-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-crimson-400/50";

function Required() {
  return (
    <span className="text-brand-crimson-500" aria-hidden="true">
      *
    </span>
  );
}

export default function BookingForm({ projects, contact }) {
  // Visitors can only book a visit to something we are still building.
  const bookable = projects.filter((project) => project.status !== "completed");

  const searchParams = useSearchParams();
  const preselected = searchParams.get("project") ?? "";
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const dateRef = useRef(null);

  // Written straight to the DOM rather than through state: "today" differs between
  // the server render and the visitor's clock, and nothing else depends on it.
  useEffect(() => {
    if (dateRef.current) {
      dateRef.current.min = new Date().toISOString().slice(0, 10);
    }
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    setStatus("sending");
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = await response.json().catch(() => ({}));

      if (!response.ok) {
        setError(body.error ?? "We couldn't send that just now.");
        setStatus("error");
        return;
      }

      form.reset();
      setStatus("sent");
    } catch {
      setError("We couldn't reach our booking system.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-border bg-surface-raised p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-crimson-50 text-brand-crimson-600">
          <Icon name="check" className="h-6 w-6" />
        </div>
        <h3 className="mt-4 font-heading text-xl font-bold text-ink">Request sent</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">
          Your site visit request is with our team. Someone will call you on the number you gave us
          within one working day to confirm a time.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 rounded-full border border-border px-6 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-brand-crimson-500 hover:text-brand-crimson-500"
        >
          Book another visit
        </button>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-border bg-surface-raised p-8">
      <div>
        <label className="text-sm font-medium text-ink" htmlFor="name">
          Full name <Required />
        </label>
        <input id="name" name="name" required className={`mt-1 ${FIELD}`} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-ink" htmlFor="phone">
            Phone <Required />
          </label>
          <div className="relative mt-1">
            <Icon name="phone" className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
            <input
              id="phone"
              name="phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              pattern="[0-9+\s-]{10,15}"
              title="Enter a 10-digit mobile number"
              required
              className={FIELD_WITH_ICON}
            />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-ink" htmlFor="email">
            Email <Required />
          </label>
          <div className="relative mt-1">
            <Icon name="envelope" className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className={FIELD_WITH_ICON}
            />
          </div>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-ink" htmlFor="project">
          Project of interest
        </label>
        <select id="project" name="project" defaultValue={preselected} className={`mt-1 ${FIELD}`}>
          <option value="">Select a project</option>
          {bookable.map((project) => (
            <option key={project.slug} value={project.name}>
              {project.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-sm font-medium text-ink" htmlFor="date">
          Preferred visit date
        </label>
        <div className="relative mt-1">
          <Icon name="calendar" className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
          <input id="date" name="date" type="date" ref={dateRef} className={FIELD_WITH_ICON} />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-ink" htmlFor="message">
          Message
        </label>
        <textarea id="message" name="message" rows={3} className={`mt-1 ${FIELD}`} />
      </div>

      {status === "error" && (
        <div role="alert" className="rounded-lg border border-brand-crimson-500 bg-brand-crimson-50 p-4">
          <p className="text-sm font-semibold text-brand-crimson-600">{error}</p>
          <p className="mt-1 text-sm text-ink-muted">
            Nothing was sent. Reach us directly and we&apos;ll book your visit right away.
          </p>
          <div className="mt-3 flex flex-wrap gap-3">
            <a
              href={`tel:+91${contact.phones[0]}`}
              className="rounded-full bg-cta px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-cta-hover"
            >
              Call {contact.phones[0]}
            </a>
            <a
              href={`https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(contact.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-border px-5 py-2 text-sm font-semibold text-ink transition-colors hover:border-brand-crimson-500 hover:text-brand-crimson-500"
            >
              WhatsApp us
            </a>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={sending}
        className="w-full rounded-full bg-cta px-6 py-3 font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-cta-hover hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none"
      >
        {sending ? "Sending…" : "Book a Site Visit"}
      </button>

      <p className="text-center text-xs leading-relaxed text-ink-muted">
        We use your number only to arrange this visit. No obligation, and we never share your
        details. Read our{" "}
        <Link href="/privacy" className="text-ink underline underline-offset-2 hover:text-brand-crimson-500">
          privacy policy
        </Link>
        .
      </p>
    </form>
  );
}
