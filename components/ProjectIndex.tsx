"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import type { Project } from "@/lib/projects";

export function ProjectIndex({ projects, categories }: { projects: Project[]; categories: string[] }) {
  const [active, setActive] = useState("All");
  const visible = useMemo(
    () => (active === "All" ? projects : projects.filter((project) => project.categories.includes(active))),
    [active, projects]
  );

  return (
    <section id="all-projects" className="project-index shell" aria-labelledby="project-index-title">
      <header className="section-heading">
        <p className="eyebrow">Accessible project index</p>
        <h2 id="project-index-title">Every public project, without WebGL.</h2>
      </header>
      <div className="filters" aria-label="Filter projects">
        {["All", ...categories].map((category) => (
          <button
            type="button"
            key={category}
            aria-pressed={active === category}
            onClick={() => setActive(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {visible.length} projects for {active}.
      </p>
      <div className="index-grid">
        {visible.map((project) => (
          <article key={project.slug} style={{ "--accent": project.theme.accent } as React.CSSProperties}>
            <div className="index-meta">
              <span>{project.status}</span>
              <span>{project.categories.join(" / ")}</span>
            </div>
            <h3>{project.displayName}</h3>
            <p>{project.shortDescription}</p>
            <p className="contribution"><strong>Contribution:</strong> {project.contribution}</p>
            <p className="technologies">{project.technologies.join(" · ")}</p>
            <div className="index-actions">
              <Link href={`/work/${project.slug}/`} prefetch={false}>Case study</Link>
              <a href={project.repositoryUrl} target="_blank" rel="noreferrer">Repository ↗</a>
              <a href={project.video.mp4} target="_blank" rel="noreferrer">Demo ↗</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
