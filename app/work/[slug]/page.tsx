import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { projectBySlug, projects } from "@/lib/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projectBySlug.get(slug);
  if (!project) return {};
  return {
    title: project.displayName,
    description: project.shortDescription,
    alternates: { canonical: `/work/${project.slug}/` },
    openGraph: {
      title: project.displayName,
      description: project.shortDescription,
      images: [{ url: `/assets/social/${project.slug}.png`, width: 1200, height: 630 }]
    }
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projectBySlug.get(slug);
  if (!project) notFound();
  const index = projects.findIndex((item) => item.slug === project.slug);
  const nextProject = projects[(index + 1) % projects.length];
  const related = project.relatedProjects.map((relatedSlug) => projectBySlug.get(relatedSlug)).filter(Boolean);
  const captions = project.videoUrl?.replace(/demo\.webm$/, "demo-captions.vtt");

  return (
    <main id="main-content" className="case-study" style={{ "--accent": project.theme.accent, "--glow": project.theme.glow } as React.CSSProperties}>
      <header className="case-hero shell">
        <div className={`case-signature signature-${project.theme.signature}`} aria-hidden="true">
          {Array.from({ length: 28 }, (_, node) => <i key={node} />)}
        </div>
        <div className="case-title">
          <p className="eyebrow">Case study / {project.status}</p>
          <h1>{project.displayName}</h1>
          <p>{project.shortDescription}</p>
          <div className="case-actions">
            <a className="button button-primary" href={project.repositoryUrl} target="_blank" rel="noreferrer">Repository ↗</a>
            {project.liveDemoUrl ? <a className="button button-secondary" href={project.liveDemoUrl} target="_blank" rel="noreferrer">Live synthetic demo ↗</a> : null}
          </div>
        </div>
        <div className="case-poster">
          <Image src={project.videoPoster} alt={`${project.displayName} verified interface`} fill priority sizes="(max-width: 900px) 100vw, 50vw" />
        </div>
      </header>

      <div className="case-body shell">
        <section className="case-overview" aria-label="Project overview">
          <article><p className="eyebrow">Problem</p><h2>{project.problem}</h2></article>
          <article><p className="eyebrow">Target user</p><p>{project.targetUser}</p></article>
          <article><p className="eyebrow">Solution</p><p>{project.solution}</p></article>
          <article><p className="eyebrow">Personal contribution</p><p>{project.contribution}</p></article>
        </section>

        <section className="case-split" aria-labelledby="architecture-title">
          <div><p className="eyebrow">Architecture</p><h2 id="architecture-title">Boundaries before buzzwords.</h2></div>
          <ol className="architecture-list">{project.architecture.map((item) => <li key={item}>{item}</li>)}</ol>
        </section>

        <section className="workflow-section" aria-labelledby="workflow-title">
          <p className="eyebrow">Main workflow</p>
          <h2 id="workflow-title">State moves with a reason.</h2>
          <ol>{project.workflow.map((item, workflowIndex) => <li key={item}><span>0{workflowIndex + 1}</span><p>{item}</p></li>)}</ol>
        </section>

        <section className="case-split" aria-labelledby="decisions-title">
          <div><p className="eyebrow">Technical decisions</p><h2 id="decisions-title">The trade-offs that define the system.</h2></div>
          <ul className="decision-list">{project.technicalDecisions.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>

        <section className="challenge-section">
          <p className="eyebrow">Difficult engineering challenge</p>
          <blockquote>{project.challenge}</blockquote>
        </section>

        <section className="evidence-section" aria-labelledby="evidence-title">
          <div><p className="eyebrow">Verification</p><h2 id="evidence-title">Evidence and boundaries.</h2></div>
          <div className="evidence-columns">
            <article><h3>Testing</h3><ul>{project.testEvidence.map((item) => <li key={item}>{item}</li>)}</ul></article>
            <article><h3>Security and privacy</h3><ul>{project.securityNotes.map((item) => <li key={item}>{item}</li>)}</ul></article>
            <article><h3>Known limitations</h3><ul>{project.limitations.map((item) => <li key={item}>{item}</li>)}</ul></article>
            <article><h3>Focused future work</h3><ul>{project.roadmap.map((item) => <li key={item}>{item}</li>)}</ul></article>
          </div>
        </section>

        {project.videoUrl ? (
          <section className="demo-section" aria-labelledby="demo-title">
            <div><p className="eyebrow">Verified demonstration</p><h2 id="demo-title">Rendered product behavior.</h2></div>
            <video controls preload="metadata" poster={project.videoPoster}>
              <source src={project.videoUrl} type="video/webm" />
              {captions ? <track kind="captions" src={captions} srcLang="en" label="English" default /> : null}
              Your browser cannot play this video. Use the repository demo link instead.
            </video>
          </section>
        ) : null}

        <section className="related-section" aria-labelledby="related-title">
          <h2 id="related-title">Related systems</h2>
          <div>{related.map((item) => item ? <Link key={item.slug} href={`/work/${item.slug}/`}>{item.displayName}<span>↗</span></Link> : null)}</div>
        </section>
      </div>

      <Link className="next-project" href={`/work/${nextProject.slug}/`}>
        <span>Next system</span>
        <strong>{nextProject.displayName}</strong>
      </Link>
    </main>
  );
}
