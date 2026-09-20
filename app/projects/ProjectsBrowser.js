"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ProjectsBrowser({ projects }) {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("all");
  const [configuration, setConfiguration] = useState("all");

  const locations = useMemo(
    () => ["all", ...new Set(projects.map((p) => p.location))],
    [projects]
  );
  const configurations = useMemo(
    () =>
      ["all", ...new Set(projects.flatMap((p) => p.configurations.map((c) => c.label)))],
    [projects]
  );

  const filtered = projects.filter((project) => {
    const matchesQuery = project.name.toLowerCase().includes(query.toLowerCase());
    const matchesLocation = location === "all" || project.location === location;
    const matchesConfiguration =
      configuration === "all" ||
      project.configurations.some((c) => c.label === configuration);
    return matchesQuery && matchesLocation && matchesConfiguration;
  });

  return (
    <div>
      <div className="grid gap-4 rounded-2xl border border-border bg-surface-raised p-6 sm:grid-cols-3">
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by project name"
          className="rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-ink placeholder:text-ink-muted focus:border-brand-blue-500 focus:outline-none"
        />
        <select
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          className="rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-ink focus:border-brand-blue-500 focus:outline-none"
        >
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc === "all" ? "All locations" : loc}
            </option>
          ))}
        </select>
        <select
          value={configuration}
          onChange={(event) => setConfiguration(event.target.value)}
          className="rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-ink focus:border-brand-blue-500 focus:outline-none"
        >
          {configurations.map((config) => (
            <option key={config} value={config}>
              {config === "all" ? "All configurations" : config}
            </option>
          ))}
        </select>
      </div>

      <p className="mt-4 text-sm text-ink-muted">
        {filtered.length} project{filtered.length === 1 ? "" : "s"} found
      </p>

      <div className="mt-6 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="group overflow-hidden rounded-2xl border border-border bg-surface-raised shadow-sm transition-shadow hover:shadow-lg"
          >
            <div className="relative h-56 w-full overflow-hidden">
              <Image
                src={project.renders[0]}
                alt={`${project.name} render`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute left-4 top-4 rounded-full bg-brand-crimson-500 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                {project.status}
              </span>
            </div>
            <div className="p-6">
              <h3 className="font-heading text-lg font-bold text-ink">{project.name}</h3>
              <p className="mt-1 text-sm text-ink-muted">{project.location}</p>
              <p className="mt-1 text-xs uppercase tracking-wide text-brand-blue-500">
                {project.configurations.map((c) => c.label).join(", ")}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-ink-muted">
          No projects match your search. Try a different name, location, or configuration.
        </p>
      )}
    </div>
  );
}
