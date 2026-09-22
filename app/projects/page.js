import { getProjects } from "@/sanity/lib/content";
import ProjectsBrowser from "./ProjectsBrowser";

export const metadata = {
  title: "Projects",
  alternates: { canonical: "/projects" },
  description: "Browse Pinnacle Construction's ongoing, upcoming, and completed residential projects in Nagpur.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <h1 className="font-heading text-4xl font-extrabold text-ink">Our Projects</h1>
      </div>

      <div className="mt-10">
        <ProjectsBrowser projects={projects} />
      </div>
    </section>
  );
}
