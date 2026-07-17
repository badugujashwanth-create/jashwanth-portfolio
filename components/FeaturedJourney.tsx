"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

import type { Project } from "@/lib/projects";

gsap.registerPlugin(ScrollTrigger);

export function FeaturedJourney({ projects }: { projects: Project[] }) {
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".journey-project").forEach((project) => {
        const visual = project.querySelector(".journey-visual");
        const copy = project.querySelector(".journey-copy");
        gsap.fromTo(
          [visual, copy],
          { y: 54 },
          {
            y: 0,
            duration: 0.85,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: project, start: "top 78%", once: true }
          }
        );
      });
    }, section);
    return () => context.revert();
  }, []);

  return (
    <section id="featured" className="featured shell" aria-labelledby="featured-title" ref={section}>
      <header className="section-heading">
        <p className="eyebrow">Featured project journey</p>
        <h2 id="featured-title">The system reorganizes around the problem.</h2>
        <p>Motion reveals relationships; the engineering evidence remains ordinary HTML.</p>
      </header>
      <div className="journey-list">
        {projects.map((project, index) => (
          <article
            className="journey-project"
            key={project.slug}
            style={{ "--accent": project.theme.accent, "--glow": project.theme.glow } as React.CSSProperties}
          >
            <div className="journey-visual">
              <div className={`signature signature-${project.theme.signature}`} aria-hidden="true">
                {Array.from({ length: 12 }, (_, node) => (
                  <i key={node} />
                ))}
              </div>
              <Image
                src={project.videoPoster}
                alt={`${project.displayName} verified project preview`}
                fill
                sizes="(max-width: 900px) 100vw, 52vw"
              />
              <span className="project-number">0{index + 1}</span>
            </div>
            <div className="journey-copy">
              <p className="project-status">{project.status}</p>
              <h3>{project.displayName}</h3>
              <p className="project-problem">{project.problem}</p>
              <p>{project.solution}</p>
              <dl className="project-facts">
                <div>
                  <dt>Contribution</dt>
                  <dd>{project.contribution}</dd>
                </div>
                <div>
                  <dt>Stack</dt>
                  <dd>{project.technologies.join(" · ")}</dd>
                </div>
                <div>
                  <dt>Evidence</dt>
                  <dd>{project.testEvidence.join(" · ")}</dd>
                </div>
              </dl>
              <div className="project-actions">
                <Link className="button button-primary" href={`/work/${project.slug}/`} prefetch={false}>
                  Open case study
                </Link>
                <a className="text-link" href={project.repositoryUrl} target="_blank" rel="noreferrer">
                  Repository ↗
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
