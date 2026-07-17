import type { Metadata } from "next";
import Link from "next/link";

import { PrintButton } from "@/components/PrintButton";
import { featuredProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Recruiter View",
  description: "Fast, printable evidence for Jashwanth Badugu's software and AI engineering work.",
  openGraph: { images: [{ url: "/assets/social/recruiter.png", width: 1200, height: 630 }] }
};

const capabilities = [
  "Explainable AI and rule workflows",
  "Local-first assistants and permissioned tools",
  "React/Next.js and Python/Node full-stack systems",
  "Data-grounded analysis and validation",
  "Background job and connector state",
  "Testing, CI, security boundaries, and technical documentation"
];

export default function RecruiterPage() {
  return (
    <main id="main-content" className="recruiter shell">
      <header className="recruiter-hero">
        <div>
          <p className="eyebrow">Fast / accessible / printable</p>
          <h1>Jashwanth Badugu</h1>
          <p className="recruiter-role">Software and AI Engineer</p>
          <p>
            Builds practical, testable workflow systems with explicit evidence, ownership, security,
            and integration boundaries.
          </p>
        </div>
        <div className="recruiter-actions">
          <a className="button button-primary" href="https://github.com/badugujashwanth-create" target="_blank" rel="noreferrer">
            GitHub / contact
          </a>
          <PrintButton />
          <span>Resume: pending approved file</span>
        </div>
      </header>

      <section aria-labelledby="recruiter-capabilities">
        <h2 id="recruiter-capabilities">Core capabilities</h2>
        <ul className="recruiter-capabilities">
          {capabilities.map((capability) => <li key={capability}>{capability}</li>)}
        </ul>
      </section>

      <section aria-labelledby="recruiter-projects">
        <div className="recruiter-section-heading">
          <h2 id="recruiter-projects">Six evidence-based projects</h2>
          <span>Ranked after repository-level review</span>
        </div>
        <div className="recruiter-project-list">
          {featuredProjects.map((project, index) => (
            <article key={project.slug}>
              <span className="recruiter-project-number">0{index + 1}</span>
              <div>
                <p className="project-status">{project.status}</p>
                <h3>{project.displayName}</h3>
                <p>{project.shortDescription}</p>
                <dl>
                  <div><dt>Contribution</dt><dd>{project.contribution}</dd></div>
                  <div><dt>Technology</dt><dd>{project.technologies.join(" · ")}</dd></div>
                  <div><dt>Test / CI evidence</dt><dd>{project.testEvidence.join(" · ")}</dd></div>
                  <div><dt>Interview topic</dt><dd>{project.challenge}</dd></div>
                </dl>
                <div className="recruiter-links">
                  <Link href={`/work/${project.slug}/`}>Case study</Link>
                  <a href={project.repositoryUrl} target="_blank" rel="noreferrer">Repository ↗</a>
                  {project.videoUrl ? <a href={project.videoUrl} target="_blank" rel="noreferrer">Demo ↗</a> : null}
                  {project.liveDemoUrl ? <a href={project.liveDemoUrl} target="_blank" rel="noreferrer">Live demo ↗</a> : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="recruiter-boundaries" aria-labelledby="recruiter-boundaries">
        <h2 id="recruiter-boundaries">What the evidence does not claim</h2>
        <p>
          No invented employment, education, clients, users, revenue, awards, performance outcomes,
          or years of experience. Zettalogix&apos;s backend is external; Heart Analysis is educational;
          ShadowOps is a collaborative fork; external provider integrations are not treated as
          universally verified.
        </p>
      </section>

      <footer className="recruiter-footer">
        <a href="https://github.com/badugujashwanth-create" target="_blank" rel="noreferrer">Contact through verified GitHub profile ↗</a>
        <Link href="/">Return to cinematic view</Link>
      </footer>
    </main>
  );
}
