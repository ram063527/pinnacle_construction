"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/app/components/icons";
import { areaOf, badgeClass, byActionability, STATUS_ORDER } from "@/app/components/status";

const STATUS_TABS = [
  { value: "all", label: "All" },
  { value: "ongoing", label: "Ongoing" },
  { value: "upcoming", label: "Upcoming" },
  { value: "completed", label: "Completed" },
];

export default function ProjectsBrowser({ projects }) {
  const [query, setQuery] = useState("");
  const [area, setArea] = useState("all");
  const [status, setStatus] = useState("all");

  const areas = useMemo(
    () => ["all", ...[...new Set(projects.map((p) => areaOf(p.location)))].sort()],
    [projects]
  );

  const counts = useMemo(() => {
    const result = { all: projects.length };
    for (const value of STATUS_ORDER) {
      result[value] = projects.filter((p) => p.status === value).length;
    }
    return result;
  }, [projects]);

  const filtered = useMemo(
    () =>
      projects
        .filter((project) => {
          const matchesQuery =
            project.name.toLowerCase().includes(query.trim().toLowerCase()) ||
            project.location.toLowerCase().includes(query.trim().toLowerCase());
          const matchesArea = area === "all" || areaOf(project.location) === area;
          const matchesStatus = status === "all" || project.status === status;
          return matchesQuery && matchesArea && matchesStatus;
        })
        .sort(byActionability),
    [projects, query, area, status]
  );

  const isFiltered = query.trim() !== "" || area !== "all" || status !== "all";

  function reset() {
    setQuery("");
    setArea("all");
    setStatus("all");
  }

  return (
    <div>
      <div className="rounded-2xl border border-border bg-surface-raised p-6">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by status">
          {STATUS_TABS.map((tab) => {
            const active = status === tab.value;
            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => setStatus(tab.value)}
                aria-pressed={active}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                  active
                    ? "border-cta bg-cta text-white"
                    : "border-border text-ink-muted hover:border-brand-crimson-500 hover:text-brand-crimson-500"
                }`}
              >
                {tab.label}
                <span className={active ? "text-white/70" : "text-ink-muted"}> ({counts[tab.value]})</span>
              </button>
            );
          })}
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="relative">
            <label htmlFor="project-search" className="sr-only">
              Search projects
            </label>
            <Icon name="search" className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
            <input
              id="project-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by name or locality"
              className="w-full rounded-lg border border-border bg-surface py-2.5 pl-10 pr-4 text-sm text-ink placeholder:text-ink-muted transition-colors focus:border-brand-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="project-area" className="sr-only">
              Filter by area
            </label>
            <select
              id="project-area"
              value={area}
              onChange={(event) => setArea(event.target.value)}
              className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-ink transition-colors focus:border-brand-blue-500 focus:outline-none"
            >
              {areas.map((value) => (
                <option key={value} value={value}>
                  {value === "all" ? "All areas" : value}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-ink-muted" role="status">
          {filtered.length} project{filtered.length === 1 ? "" : "s"} found
        </p>
        {isFiltered && (
          <button
            type="button"
            onClick={reset}
            className="text-sm font-semibold text-brand-crimson-500 underline-offset-4 hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>

      <h2 className="sr-only">Matching projects</h2>

      <div className="mt-6 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => {
          const carpet = project.configurations[0]?.carpetAreaSqFt;
          return (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group overflow-hidden rounded-2xl border border-border bg-surface-raised shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={project.renders[0]}
                  alt={`${project.name} render`}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span
                  className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white ${badgeClass(
                    project.status
                  )}`}
                >
                  {project.status}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-heading text-lg font-bold text-ink">{project.name}</h3>
                <p className="mt-1 text-sm text-ink-muted">{project.location}</p>
                <p className="mt-3 text-sm text-ink-muted">
                  {project.configurations.map((c) => c.label).join(", ")}
                  {carpet ? ` · ${carpet} sq. ft. carpet` : ""}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="mt-10 rounded-2xl border border-border bg-surface-raised p-10 text-center">
          <p className="text-ink-muted">No projects match those filters.</p>
          <button
            type="button"
            onClick={reset}
            className="mt-4 rounded-full bg-cta px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-cta-hover"
          >
            Show all projects
          </button>
        </div>
      )}
    </div>
  );
}
