import Image from "next/image";
import Link from "next/link";
import { stats, whyChooseUs, features, services, testimonials } from "@/data/siteContent";
import { projects } from "@/data/projects";
import { Icon } from "@/app/components/icons";
import Reveal from "@/app/components/Reveal";
import CountUp from "@/app/components/CountUp";
import TestimonialsCarousel from "@/app/components/TestimonialsCarousel";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[88vh] items-end overflow-hidden">
        <Image
          src="/images/dravin-enclave/exterior-day.jpg"
          alt="Dravin Enclave, an ongoing Pinnacle Construction residential project in Nagpur"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10" />

        <div className="relative mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-brand-crimson-400">
            Pinnacle Construction · Nagpur
          </p>
          <h1 className="mt-4 max-w-2xl font-heading text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
            15 years of building homes families trust
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/85">
            From foundation to handover, Pinnacle Construction delivers residential projects across
            Nagpur with proven reliability, transparent process, and on-time delivery.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/projects"
              className="rounded-full bg-brand-blue-500 px-7 py-3.5 font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-brand-blue-600 hover:shadow-lg"
            >
              Explore Projects
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-white/40 bg-white/10 px-7 py-3.5 font-semibold text-white backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-white/20"
            >
              Book a Site Visit
            </Link>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-b border-border bg-brand-blue-600">
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
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-blue-50 text-brand-blue-600">
                <Icon name={item.icon} className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-heading text-lg font-semibold text-brand-blue-600">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.description}</p>
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

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {projects.map((project, index) => (
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
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-brand-crimson-500 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                      {project.status}
                    </span>
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

      {/* Amenities */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold text-ink sm:text-4xl">Our Features</h2>
          <p className="mt-3 text-ink-muted">Amenities designed for comfortable, modern family living.</p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((item, index) => (
            <Reveal
              key={item.title}
              delay={(index % 3) * 100}
              className="rounded-2xl bg-brand-blue-50 p-6 transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface-raised text-brand-blue-600">
                <Icon name={item.icon} className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-heading text-lg font-semibold text-brand-blue-700">{item.title}</h3>
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
              <Reveal
                key={service.title}
                delay={index * 100}
                className="rounded-2xl border border-border bg-surface p-8 text-center transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-crimson-50 text-brand-crimson-500">
                  <Icon name={service.icon} className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-heading text-lg font-semibold text-brand-crimson-500">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{service.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold text-ink sm:text-4xl">What Our Clients Say</h2>
        </Reveal>
        <Reveal delay={100} className="mt-12">
          <TestimonialsCarousel testimonials={testimonials} />
        </Reveal>
      </section>

      {/* Final CTA */}
      <section className="bg-brand-crimson-500 py-16">
        <Reveal className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
            Ready to find your next home?
          </h2>
          <p className="mt-3 text-white/85">
            Book a site visit and see why 521 families have already chosen Pinnacle Construction.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-full bg-white px-8 py-3.5 font-semibold text-brand-crimson-600 transition-all hover:-translate-y-0.5 hover:bg-white/90 hover:shadow-lg"
          >
            Book a Site Visit
          </Link>
        </Reveal>
      </section>
    </>
  );
}
