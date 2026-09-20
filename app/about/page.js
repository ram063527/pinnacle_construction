import { stats, whyChooseUs, story, mission, vision, team } from "@/data/siteContent";
import { Icon } from "@/app/components/icons";
import Reveal from "@/app/components/Reveal";
import CountUp from "@/app/components/CountUp";

export const metadata = {
  title: "About Us | Pinnacle Construction",
  description: "Founded in 2010, Pinnacle Construction has delivered 43 projects and 521 happy clients across Nagpur.",
};

function initials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function AboutPage() {
  return (
    <>
      <section className="bg-brand-blue-600 py-16 text-center">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
            Since {story.since}
          </p>
          <h1 className="mt-3 font-heading text-4xl font-extrabold text-white sm:text-5xl">
            {story.heading}
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="font-heading text-2xl font-bold text-ink">Our Story</h2>
        <div className="mt-4 space-y-4 text-ink-muted leading-relaxed">
          {story.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-brand-blue-600">
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
          <h2 className="font-heading text-xl font-bold text-brand-blue-600">Our Mission</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted">{mission}</p>
        </Reveal>
        <Reveal delay={100} className="rounded-2xl border border-border bg-surface-raised p-8 transition-all hover:-translate-y-1 hover:shadow-md">
          <h2 className="font-heading text-xl font-bold text-brand-crimson-500">Our Vision</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted">{vision}</p>
        </Reveal>
      </section>

      <section className="bg-surface-raised py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-heading text-3xl font-bold text-ink">Why Choose Us</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((item, index) => (
              <Reveal
                key={item.title}
                delay={(index % 3) * 100}
                className="rounded-2xl border border-border bg-surface p-6 transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-blue-50 text-brand-blue-600">
                  <Icon name={item.icon} className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-heading text-lg font-semibold text-brand-blue-600">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-center font-heading text-3xl font-bold text-ink">Our Team</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member, index) => (
            <Reveal
              key={member.role ?? index}
              delay={(index % 4) * 100}
              className="rounded-2xl border border-border bg-surface-raised p-6 text-center transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-blue-500 font-heading text-lg font-bold text-white">
                {initials(member.name)}
              </div>
              <h3 className="mt-4 font-heading text-base font-semibold text-ink">{member.name}</h3>
              <p className="text-sm text-brand-crimson-500">{member.role}</p>
              <p className="mt-2 text-sm text-ink-muted">{member.bio}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
