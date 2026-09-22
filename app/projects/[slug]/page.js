import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, getProjectSlugs } from "@/sanity/lib/content";
import { Icon } from "@/app/components/icons";
import { badgeClass, badgeLabel } from "@/app/components/status";
import Reveal from "@/app/components/Reveal";

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  const title = project.seoTitle
    ? { absolute: project.seoTitle }
    : project.name;
  const description = project.seoDescription || project.description;
  const canonical = `/projects/${project.slug}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: canonical,
      title: project.seoTitle || project.name,
      description,
      // Renders are whatever shape the brochure gave us. Sanity crops on the fly to
      // the 1200x630 that link previews expect.
      ...(project.renders?.[0]
        ? {
            images: [
              {
                url: `${project.renders[0]}?w=1200&h=630&fit=crop`,
                width: 1200,
                height: 630,
                alt: project.name,
              },
            ],
          }
        : {}),
    },
  };
}

const landmarkLabels = {
  school: "School",
  hospital: "Hospital",
  metroOrStation: "Metro / Station",
  airport: "Airport",
  supermarket: "Supermarket",
  petrolPump: "Petrol Pump",
  temple: "Temple",
  park: "Park",
  college: "College",
  itPark: "IT Park",
  busStand: "Bus Stand",
};

// Temple and bus stand fall back to a map pin: there is no icon for either yet.
const landmarkIcons = {
  school: "academicCap",
  hospital: "medicalCross",
  metroOrStation: "train",
  airport: "plane",
  supermarket: "shoppingCart",
  petrolPump: "fuel",
  park: "leaf",
  college: "academicCap",
  itPark: "buildingOffice",
};

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  // A completed building has no brochure, floor plan, or RERA registration left to
  // publish, and nothing to book a visit to. Everything below branches on that rather
  // than promising a visitor something that can never arrive.
  const isCompleted = project.status === "completed";
  const hasLandmarks = project.landmarks.length > 0;
  const configLabels = project.configurations.map((c) => c.label).join(", ");

  return (
    <>
      <section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden">
        <Image
          src={project.renders[0]}
          alt={`${project.name} render`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-white/80 underline-offset-4 transition-colors hover:text-white hover:underline"
          >
            <Icon name="chevronLeft" className="h-4 w-4" />
            All projects
          </Link>
          <div className="mt-4">
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white ${badgeClass(
                project.status
              )}`}
            >
              {project.status}
            </span>
            {badgeLabel(project.badge) && (
              <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-crimson-600 shadow-sm">
                {badgeLabel(project.badge)}
              </span>
            )}
          </div>
          <h1 className="mt-3 font-heading text-4xl font-extrabold text-white sm:text-5xl">
            {project.name}
          </h1>
          <p className="mt-2 text-white/85">{project.address}</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div className="lg:col-span-2">
          <Reveal>
            <p className="text-ink-muted leading-relaxed">{project.description}</p>
          </Reveal>

          {project.renders.length > 1 && (
            <div
              className={`mt-8 grid gap-4 ${
                project.renders.length > 2 ? "sm:grid-cols-2" : "grid-cols-1"
              }`}
            >
              {project.renders.slice(1).map((render, index) => (
                <Reveal key={render} delay={index * 100}>
                  <div
                    className={`relative overflow-hidden rounded-2xl ${
                      project.renders.length > 2 ? "h-56" : "h-72 sm:h-96"
                    }`}
                  >
                    <Image
                      src={render}
                      alt={`${project.name} view ${index + 2}`}
                      fill
                      sizes={project.renders.length > 2 ? "(min-width: 640px) 33vw, 100vw" : "(min-width: 1024px) 66vw, 100vw"}
                      className="object-cover"
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          )}

          <Reveal className="mt-10">
            <h2 className="font-heading text-2xl font-bold text-ink">Configurations</h2>
            {isCompleted ? (
              <div className="mt-4 rounded-2xl border border-border bg-surface-raised p-6">
                <p className="text-sm leading-relaxed text-ink-muted">
                  Built as {configLabels} homes and handed over to residents. Floor plans and
                  brochures are only published while a project is selling.
                </p>
              </div>
            ) : (
              <div
                className={`mt-4 grid gap-6 ${
                  project.configurations.length > 1 ? "sm:grid-cols-2" : "grid-cols-1"
                }`}
              >
                {project.configurations.map((config) => (
                  <div key={config.label} className="rounded-2xl border border-border bg-surface-raised p-6 transition-all hover:shadow-md">
                    <h3 className="font-heading text-lg font-bold text-brand-crimson-600">{config.label}</h3>
                    <p className="mt-1 text-sm text-ink-muted">
                      {config.carpetAreaSqFt
                        ? `${config.carpetAreaSqFt} sq. ft. carpet area`
                        : "Approx. 1,650 sq. ft. carpet area (indicative, final figure to be confirmed)"}
                    </p>
                    {config.floorPlanImageUrl && (
                      <div className="relative mt-4 h-80 overflow-hidden rounded-xl border border-border">
                        <Image
                          src={config.floorPlanImageUrl}
                          alt={`${config.label} floor plan for ${project.name}`}
                          fill
                          sizes="(min-width: 1024px) 50vw, 100vw"
                          className="bg-white object-contain"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </Reveal>

          {hasLandmarks && (
            <Reveal className="mt-10">
              <h2 className="font-heading text-2xl font-bold text-ink">What&apos;s nearby</h2>
              <dl className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {project.landmarks.map((landmark) => (
                  <div
                    key={landmark.kind}
                    className="rounded-xl border border-border bg-surface-raised p-4 transition-all hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <Icon
                      name={landmarkIcons[landmark.kind] ?? "mapPin"}
                      className="h-5 w-5 text-brand-crimson-500"
                    />
                    <dt className="mt-2 text-xs uppercase tracking-wide text-ink-muted">
                      {landmarkLabels[landmark.kind] ?? landmark.kind}
                    </dt>
                    <dd className="mt-1 font-heading text-base font-semibold leading-snug text-ink">
                      {landmark.name}
                    </dd>
                    <dd className="mt-1 text-sm text-ink-muted">{landmark.km} km</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          )}

          {project.videoReelYoutubeId && (
            <Reveal className="mt-10">
              <h2 className="font-heading text-2xl font-bold text-ink">
                Sample apartment walkthrough
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                Filmed inside a sample apartment at {project.name}, not a render.
              </p>
              <div className="mt-4 rounded-2xl border border-border bg-surface-raised p-4 sm:p-6">
                <div className="mx-auto aspect-9/16 w-full max-w-[320px] overflow-hidden rounded-xl bg-black">
                  <iframe
                    className="h-full w-full"
                    src={`https://www.youtube-nocookie.com/embed/${project.videoReelYoutubeId}`}
                    title={`Sample apartment walkthrough at ${project.name}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </Reveal>
          )}

          <Reveal className="mt-10">
            <h2 className="font-heading text-2xl font-bold text-ink">Location</h2>
            <div className="mt-4 overflow-hidden rounded-2xl border border-border">
              <iframe
                src={`https://www.google.com/maps?q=${encodeURIComponent(project.address)}&output=embed`}
                title={`${project.name} location`}
                className="h-72 w-full"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>

        <Reveal delay={100} className="h-fit rounded-2xl border border-border bg-surface-raised p-6 lg:sticky lg:top-24 lg:self-start">
          <h2 className="font-heading text-lg font-bold text-ink">Project Details</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-ink-muted">Status</dt>
              <dd className="text-right font-semibold capitalize text-ink">
                {isCompleted ? "Handed over" : project.status}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-ink-muted">Configuration</dt>
              <dd className="text-right font-semibold text-ink">{configLabels}</dd>
            </div>
            {!isCompleted && (
              <div className="flex justify-between gap-4">
                <dt className="text-ink-muted">RERA Number</dt>
                <dd className="text-right font-semibold text-ink">
                  {project.reraNumber ?? "Coming soon"}
                </dd>
              </div>
            )}
            <div className="flex justify-between gap-4">
              <dt className="text-ink-muted">Location</dt>
              <dd className="text-right font-semibold text-ink">{project.location}</dd>
            </div>
          </dl>

          {isCompleted ? (
            <>
              <p className="mt-6 text-sm leading-relaxed text-ink-muted">
                This project is complete and occupied. There is nothing left to book here.
              </p>
              <Link
                href="/projects"
                className="mt-4 block rounded-full bg-cta px-6 py-3 text-center font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-cta-hover hover:shadow-md"
              >
                See what we&apos;re building now
              </Link>
            </>
          ) : (
            <>
              <Link
                href={`/contact?project=${encodeURIComponent(project.name)}`}
                className="mt-6 block rounded-full bg-cta px-6 py-3 text-center font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-cta-hover hover:shadow-md"
              >
                Book a Site Visit
              </Link>

              {project.brochureUrl && (
                <a
                  href={project.brochureUrl}
                  download
                  className="mt-3 flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-center font-semibold text-ink transition-colors hover:border-brand-crimson-500 hover:text-brand-crimson-500"
                >
                  <Icon name="download" className="h-5 w-5" />
                  Download Brochure
                </a>
              )}
            </>
          )}
        </Reveal>
      </section>
    </>
  );
}
