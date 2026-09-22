import Image from "next/image";
import Link from "next/link";
import { stats, whyChooseUs, features, services, loanPartners } from "@/data/siteContent";
import { getProjects, getTestimonials } from "@/sanity/lib/content";
import { Icon } from "@/app/components/icons";
import { badgeLabel, BADGE_PILL } from "@/app/components/status";
import Reveal from "@/app/components/Reveal";
import CountUp from "@/app/components/CountUp";
import TestimonialsCarousel from "@/app/components/TestimonialsCarousel";
import HomePageAnimations from "@/app/components/HomePageAnimations";

// The hero already shows this one full-bleed; the strip beneath it covers the rest.
const HERO_SLUG = "dravin-enclave";

export default async function HomePage() {
  const [projects, testimonials] = await Promise.all([
    getProjects(),
    getTestimonials(),
  ]);

  const featuredProjects = projects.filter((project) => project.featured);
  const heroStrip = projects
    .filter((project) => project.status !== "completed" && project.slug !== HERO_SLUG)
    .slice(0, 5);

  return (
    <>
      <HomePageAnimations />
      {/* Hero */}
      <section data-hero className="relative flex min-h-[88vh] items-end overflow-hidden">
        <Image
          data-hero-image
          src="/images/dravin-enclave/exterior-day.jpg"
          alt="Dravin Enclave, an ongoing Pinnacle Construction residential project in Nagpur"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div data-hero-overlay className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10" />

        <div data-hero-content className="relative mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
          <h1 data-hero-title className="max-w-2xl font-heading text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
            15 years of building homes families trust
          </h1>
          <p data-hero-description className="mt-5 max-w-xl text-lg text-white/85">
            From foundation to handover, Pinnacle Construction delivers residential projects across
            Nagpur with proven reliability, transparent process, and on-time delivery.
          </p>
          <div data-hero-buttons className="mt-8 flex flex-wrap gap-4">
            <Link
              data-hero-button
              href="/projects"
              className="rounded-full bg-cta px-7 py-3.5 font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-cta-hover hover:shadow-lg"
            >
              Explore Projects
            </Link>
            <Link
              data-hero-button
              href="/contact"
              className="rounded-full border border-white/40 bg-white/10 px-7 py-3.5 font-semibold text-white backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-white/20"
            >
              Book a Site Visit
            </Link>
          </div>

          <div className="mt-10 hidden gap-3 border-t border-white/20 pt-6 sm:flex">
            {heroStrip.map((project) => (
              <Link
                key={project.slug}
                data-hero-strip-item
                href={`/projects/${project.slug}`}
                className="group relative h-20 w-32 shrink-0 overflow-hidden rounded-xl border border-white/25 transition-all hover:-translate-y-1 hover:border-white/60 lg:h-24 lg:w-40"
              >
                <Image
                  src={project.renders[0]}
                  alt=""
                  fill
                  sizes="160px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-black/85 to-black/10" />
                <span className="absolute inset-x-2 bottom-1.5 truncate text-[11px] font-semibold text-white">
                  {project.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-b border-border bg-band-deep">
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

      {/* Featured projects */}
      <section className="bg-surface-raised py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-heading text-3xl font-bold text-ink sm:text-4xl">Featured Projects</h2>
              <p className="mt-3 max-w-xl text-ink-muted">
                Ongoing and upcoming residences, ready for you to explore in detail.
              </p>
            </div>
            <Link
              href="/projects"
              className="font-semibold text-brand-blue-500 hover:text-brand-blue-600"
            >
              View all projects →
            </Link>
          </Reveal>

          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project, index) => (
              <Reveal key={project.slug} delay={index * 100}>
                <Link
                  href={`/projects/${project.slug}`}
                  className="group block overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image
                      src={project.renders[0]}
                      alt={`${project.name} render`}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-cta px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                      {project.status}
                    </span>
                    {badgeLabel(project.badge) && (
                      <span className={BADGE_PILL}>{badgeLabel(project.badge)}</span>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading text-xl font-bold text-ink">{project.name}</h3>
                    <p className="mt-1 text-sm text-ink-muted">{project.location}</p>
                    <p className="mt-3 text-sm leading-relaxed text-ink-muted">{project.description}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold text-ink sm:text-4xl">Why Choose Us</h2>
          <p className="mt-3 text-ink-muted">
            A track record built on quality, transparency, and homes delivered on schedule.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {whyChooseUs.map((item, index) => (
            <Reveal
              key={item.title}
              delay={(index % 3) * 100}
              className="rounded-2xl border border-border bg-surface-raised p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-crimson-50 text-brand-crimson-600">
                <Icon name={item.icon} className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-heading text-lg font-semibold text-brand-crimson-600">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.description}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Amenities */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold text-ink sm:text-4xl">Amenities</h2>
          <p className="mt-3 text-ink-muted">Amenities designed for comfortable, modern family living.</p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((item, index) => (
            <Reveal
              key={item.title}
              delay={(index % 3) * 100}
              className="rounded-2xl border border-border bg-surface-raised p-6 transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-crimson-50 text-brand-crimson-600">
                <Icon name={item.icon} className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-heading text-lg font-semibold text-brand-crimson-600">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.description}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="bg-surface-raised py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-bold text-ink sm:text-4xl">Services We Offer</h2>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {services.map((service, index) => (
              <Reveal key={service.title} delay={index * 100}>
                <div className="group relative overflow-hidden rounded-2xl border border-border">
                  <div className="relative h-72">
                    <Image
                      src={service.image}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/20" />
                  </div>
                  <div className="absolute inset-0 flex flex-col justify-end p-8">
                    <Icon name={service.icon} className="h-8 w-8 text-white" />
                    <h3 className="mt-4 font-heading text-xl font-bold text-white">{service.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/85">{service.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold text-ink sm:text-4xl">What Our Happy Customers Say</h2>
        </Reveal>
        <Reveal delay={100} className="mt-12">
          <TestimonialsCarousel testimonials={testimonials} />
        </Reveal>
      </section>

      {/* Home loan partners */}
      <section className="bg-surface-raised py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <p className="font-body text-sm font-semibold uppercase tracking-[0.15em] text-ink-muted">
              Home Loan Partners
            </p>
          </Reveal>
          <Reveal delay={100} className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {loanPartners.map((partner) => (
              <Image
                key={partner.name}
                src={partner.logo}
                alt={partner.name}
                width={120}
                height={48}
                className="h-9 w-auto object-contain transition-transform hover:scale-105"
              />
            ))}
          </Reveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-band py-16">
        <Reveal className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
            Ready to find your next home?
          </h2>
          <p className="mt-3 text-white/85">
            Book a site visit and see why 521 families have already chosen Pinnacle Construction.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-full bg-white px-8 py-3.5 font-semibold text-band transition-all hover:-translate-y-0.5 hover:bg-white/90 hover:shadow-lg"
          >
            Book a Site Visit
          </Link>
        </Reveal>
      </section>
    </>
  );
}
