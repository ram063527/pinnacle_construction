"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { projects } from "@/data/projects";

export default function BookingForm() {
  const searchParams = useSearchParams();
  const preselected = searchParams.get("project") ?? "";
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-border bg-surface-raised p-8 text-center">
        <h3 className="font-heading text-xl font-bold text-brand-blue-600">Thank you</h3>
        <p className="mt-2 text-sm text-ink-muted">
          We&apos;ve received your request and will get back to you within 24 hours to confirm your site visit.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-border bg-surface-raised p-8">
      <div>
        <label className="text-sm font-medium text-ink" htmlFor="name">Full Name</label>
        <input id="name" name="name" required className="mt-1 w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm focus:border-brand-blue-500 focus:outline-none" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-ink" htmlFor="phone">Phone</label>
          <input id="phone" name="phone" type="tel" required className="mt-1 w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm focus:border-brand-blue-500 focus:outline-none" />
        </div>
        <div>
          <label className="text-sm font-medium text-ink" htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required className="mt-1 w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm focus:border-brand-blue-500 focus:outline-none" />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-ink" htmlFor="project">Project of Interest</label>
        <select id="project" name="project" defaultValue={preselected} className="mt-1 w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm focus:border-brand-blue-500 focus:outline-none">
          <option value="">Select a project</option>
          {projects.map((project) => (
            <option key={project.slug} value={project.name}>{project.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-sm font-medium text-ink" htmlFor="date">Preferred Visit Date</label>
        <input id="date" name="date" type="date" className="mt-1 w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm focus:border-brand-blue-500 focus:outline-none" />
      </div>
      <div>
        <label className="text-sm font-medium text-ink" htmlFor="message">Message</label>
        <textarea id="message" name="message" rows={3} className="mt-1 w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm focus:border-brand-blue-500 focus:outline-none" />
      </div>
      <button
        type="submit"
        className="w-full rounded-full bg-brand-crimson-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-crimson-600"
      >
        Book a Site Visit
      </button>
    </form>
  );
}
