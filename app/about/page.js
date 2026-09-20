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
            Building homes across Nagpur since {story.since}.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <h2 className="font-heading text-2xl font-bold text-ink">Our Story</h2>
            <div className="mt-4 max-w-prose space-y-4 leading-relaxed text-ink-muted">
              {story.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-2">
            {/* Licensed stock texture, never a Pinnacle render. See public/images/texture/CREDITS.md */}
            <div className="relative aspect-4/5 overflow-hidden rounded-2xl border border-border">
              <Image
                src="/images/texture/drafting-hands.jpg"
                alt="An architect drafting building plans by hand"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover grayscale"
              />
              <div className="absolute inset-0 bg-brand-crimson-700/35 mix-blend-multiply" />
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

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 md:grid-cols-2 lg:px-8">
        <Reveal className="rounded-2xl border border-border bg-surface-raised p-8 transition-all hover:-translate-y-1 hover:shadow-md">
          <h2 className="font-heading text-xl font-bold text-ink">Our Mission</h2>
          <p className="mt-3 max-w-prose text-sm leading-relaxed text-ink-muted">{mission}</p>
        </Reveal>
        <Reveal delay={100} className="rounded-2xl border border-border bg-surface-raised p-8 transition-all hover:-translate-y-1 hover:shadow-md">
          <h2 className="font-heading text-xl font-bold text-ink">Our Vision</h2>
          <p className="mt-3 max-w-prose text-sm leading-relaxed text-ink-muted">{vision}</p>
        </Reveal>
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
