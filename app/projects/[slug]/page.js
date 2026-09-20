import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProjectBySlug } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.name} | Pinnacle Construction`,
    description: project.description,
  };
}

const landmarkLabels = {
  school: "Nearest School",
  petrolPump: "Petrol Pump",
  hospital: "Hospital",
  supermarket: "Supermarket",
  airportOrStation: "Airport / Station",
};

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <>
      <section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden">
        <Image
          src={project.renders[0]}
          alt={`${project.name} render`}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
          <span className="rounded-full bg-brand-crimson-500 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
            {project.status}
          </span>
          <h1 className="mt-3 font-heading text-4xl font-extrabold text-white sm:text-5xl">
            {project.name}
          </h1>
          <p className="mt-2 text-white/85">{project.address}</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div className="lg:col-span-2">
          <p className="text-ink-muted leading-relaxed">{project.description}</p>

          {project.renders.length > 1 && (
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {project.renders.slice(1).map((render, index) => (
                <div key={render} className="relative h-56 overflow-hidden rounded-2xl">
                  <Image
                    src={render}
                    alt={`${project.name} view ${index + 2}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          <div className="mt-10">
            <h2 className="font-heading text-2xl font-bold text-ink">Configurations</h2>
            <div className="mt-4 grid gap-6 sm:grid-cols-2">
              {project.configurations.map((config) => (
                <div key={config.label} className="rounded-2xl border border-border bg-surface-raised p-6">
                  <h3 className="font-heading text-lg font-bold text-brand-blue-600">{config.label}</h3>
                  <p className="mt-1 text-sm text-ink-muted">
                    {config.carpetAreaSqFt
                      ? `${config.carpetAreaSqFt} sq. ft. carpet area`
                      : "Carpet area to be announced"}
                  </p>
                  {config.floorPlanImageUrl ? (
                    <div className="relative mt-4 h-64 overflow-hidden rounded-xl border border-border">
                      <Image
                        src={config.floorPlanImageUrl}
                        alt={`${config.label} floor plan for ${project.name}`}
                        fill
                        className="object-contain bg-white"
                      />
                    </div>
                  ) : (
                    <p className="mt-4 text-sm italic text-ink-muted">Floor plan coming soon.</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <h2 className="font-heading text-2xl font-bold text-ink">Nearby</h2>
            <dl className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {Object.entries(project.landmarks).map(([key, value]) => (
                <div key={key} className="rounded-xl border border-border bg-surface-raised p-4">
                  <dt className="text-xs uppercase tracking-wide text-ink-muted">
                    {landmarkLabels[key] ?? key}
                  </dt>
                  <dd className="mt-1 font-heading text-base font-semibold text-ink">
                    {value ?? "N/A"}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {project.videoReelYoutubeId && (
            <div className="mt-10">
              <h2 className="font-heading text-2xl font-bold text-ink">Video Tour</h2>
              <div className="mt-4 aspect-video overflow-hidden rounded-2xl">
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube-nocookie.com/embed/${project.videoReelYoutubeId}`}
                  title={`${project.name} video tour`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}
        </div>

        <aside className="h-fit rounded-2xl border border-border bg-surface-raised p-6 lg:sticky lg:top-24 lg:self-start">
          <h2 className="font-heading text-lg font-bold text-ink">Project Details</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-ink-muted">RERA Number</dt>
              <dd className="text-right font-semibold text-ink">
                {project.reraNumber ?? "Coming soon"}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-ink-muted">Location</dt>
              <dd className="text-right font-semibold text-ink">{project.location}</dd>
            </div>
          </dl>

          <Link
            href={`/contact?project=${encodeURIComponent(project.name)}`}
            className="mt-6 block rounded-full bg-brand-crimson-500 px-6 py-3 text-center font-semibold text-white transition-colors hover:bg-brand-crimson-600"
          >
            Book a Site Visit
          </Link>

          {project.brochureUrl && (
            <a
              href={project.brochureUrl}
              download
              className="mt-3 block rounded-full border border-border px-6 py-3 text-center font-semibold text-ink transition-colors hover:border-brand-blue-500 hover:text-brand-blue-500"
            >
              Download Brochure
            </a>
          )}
        </aside>
      </section>
    </>
  );
}
