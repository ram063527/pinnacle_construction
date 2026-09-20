import { projects } from "@/data/projects";
import ProjectsBrowser from "./ProjectsBrowser";

export const metadata = {
  title: "Projects | Pinnacle Construction",
  description: "Browse Pinnacle Construction's ongoing, upcoming, and completed residential projects in Nagpur.",
};

export default function ProjectsPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <h1 className="font-heading text-4xl font-extrabold text-ink">Our Projects</h1>
        <p className="mt-3 text-ink-muted">
          Filter by build stage or area, or search by name. Ongoing and upcoming homes are listed first.
        </p>
      </div>

      <div className="mt-10">
        <ProjectsBrowser projects={projects} />
      </div>
    </section>
  );
}
