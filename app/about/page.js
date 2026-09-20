import Image from "next/image";
import Link from "next/link";
import { stats, story, mission, vision } from "@/data/siteContent";
import { projects } from "@/data/projects";
import { Icon } from "@/app/components/icons";
import Reveal from "@/app/components/Reveal";
import CountUp from "@/app/components/CountUp";

export const metadata = {
  title: "About Us | Pinnacle Construction",
  description: "Founded in 2010, Pinnacle Construction has delivered 43 projects and 521 happy clients across Nagpur.",
};

export default function AboutPage() {
  const delivered = projects.filter((project) => project.status === "completed");

  // The one fact a generic builder page can't borrow: the actual Nagpur localities
  // we've built in. Derived from project data so it can never drift from the catalog.
  // "Narendra Nagar Ext." folds into Narendra Nagar; everything before the first
  // comma is the locality, everything after is the city.
  const localities = Object.entries(
    projects.reduce((acc, project) => {
      const locality = project.location.split(",")[0].replace(/\s+Ext\.$/, "");
      acc[locality] = (acc[locality] || 0) + 1;
      return acc;
    }, {})
  ).sort(([nameA, countA], [nameB, countB]) => countB - countA || nameA.localeCompare(nameB));

  return (
    <>
      <section className="relative flex min-h-[52vh] items-end overflow-hidden">
        <Image
          src="/images/completed/dravin-heights.jpg"
          alt="Dravin Heights, a completed Pinnacle Construction residential project in Nagpur"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/25" />
        <div className="relative mx-auto w-full max-w-4xl px-4 pb-14 sm:px-6 lg:px-8">
          <h1 className="font-heading text-4xl font-extrabold text-white sm:text-5xl">
            {story.heading}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/85">
            Homes for Nagpur families, since {story.since}.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <Reveal direction="left">
              <h2 className="font-heading text-2xl font-bold text-ink">Our Story</h2>
            </Reveal>
            <div className="mt-4 max-w-prose space-y-4 leading-relaxed text-ink-muted">
              {story.paragraphs.map((paragraph, index) => (
                <Reveal key={index} direction="left" delay={120 + index * 120}>
                  <p>{paragraph}</p>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal direction="right" delay={150} className="lg:col-span-2">
            <div className="rounded-2xl border border-border bg-surface-raised p-6 sm:p-8">
              <h3 className="font-heading text-lg font-bold text-ink">Where we have built</h3>
              <ul className="mt-5 grid border-t border-border sm:grid-cols-2 sm:gap-x-8">
                {localities.map(([name, count]) => (
                  <li
                    key={name}
                    className="flex items-baseline justify-between gap-6 border-b border-border py-3"
                  >
                    <span className="text-sm font-medium text-ink">{name}</span>
                    <span className="font-heading text-sm font-bold tabular-nums text-brand-crimson-500">
                      {count}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-xs leading-relaxed text-ink-muted">
                Projects delivered or under way, by locality. All of them in Nagpur, all of
                them since {story.since}.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-border bg-band-deep">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-10 text-center sm:px-6 md:grid-cols-4 lg:px-8">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 80} className="flex flex-col items-center">
              <Icon name={stat.icon} className="h-7 w-7 text-white/70" />
              <div className="mt-2 font-heading text-3xl font-extrabold text-white sm:text-4xl">
                <CountUp value={stat.value} suffix={stat.label !== "Years Experience" ? "+" : ""} />
              </div>
              <div className="mt-1 text-sm font-medium text-white/80">{stat.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Mission and vision read as two stacked rows rather than a side-by-side pair:
          the one-line statement carries the heading, the existing detail sits beside it,
          and the two rows mirror each other (statement left, then statement right) so the
          eye crosses the page instead of scanning two matching columns. Not a crimson
          band: the stats bar directly above already is one, and two filled bands back to
          back read as a single slab of maroon, worst of all in dark mode. */}
      <section className="bg-surface py-20 sm:py-24">
        <div className="mx-auto max-w-6xl divide-y divide-border px-4 sm:px-6 lg:px-8">
          <Reveal direction="left">
            <div className="grid gap-5 pb-14 md:grid-cols-2 md:gap-16 md:pb-16">
              <h2 className="font-heading text-2xl font-bold leading-snug text-ink sm:text-3xl">
                {mission.statement}
              </h2>
              <p className="leading-relaxed text-ink-muted md:pt-2">{mission.body}</p>
            </div>
          </Reveal>

          <Reveal direction="right" delay={100}>
            <div className="grid gap-5 pt-14 md:grid-cols-2 md:gap-16 md:pt-16">
              <h2 className="font-heading text-2xl font-bold leading-snug text-ink sm:text-3xl md:order-2">
                {vision.statement}
              </h2>
              <p className="leading-relaxed text-ink-muted md:order-1 md:pt-2">{vision.body}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Delivered work stands in for the generic "why choose us" grid that used to sit here. */}
      <section className="bg-surface-raised py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <h2 className="font-heading text-3xl font-bold text-ink">Delivered in Nagpur</h2>
            <p className="mt-3 text-ink-muted">
              Homes we have finished and handed over. Every one of them is a family living
              somewhere we built.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {delivered.map((project, index) => (
              <Reveal key={project.slug} delay={(index % 4) * 80}>
                <Link
                  href={`/projects/${project.slug}`}
                  className="group block overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative h-40 w-full overflow-hidden">
                    <Image
                      src={project.renders[0]}
                      alt={`${project.name} render`}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-heading text-base font-bold text-ink">{project.name}</h3>
                    <p className="mt-1 text-sm text-ink-muted">{project.location}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="font-heading text-3xl font-bold text-ink">Come and see one</h2>
          <p className="mt-3 text-ink-muted">
            The quickest way to judge a builder is to stand inside what they built. Pick a project
            and we will arrange a visit.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-full bg-cta px-8 py-3.5 font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-cta-hover hover:shadow-lg"
          >
            Book a Site Visit
          </Link>
        </Reveal>
      </section>
    </>
  );
}
