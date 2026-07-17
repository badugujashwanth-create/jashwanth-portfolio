import Link from "next/link";

const capabilities = [
  ["AI and local intelligence", "Permissioned orchestration, deterministic evidence boundaries, local-model paths.", ["NIRA", "NiyamGuard", "Cricket Intelligence"]],
  ["Full-stack product engineering", "Typed interfaces, services, validation, state, failure handling, reproducible builds.", ["Social Media Control Center", "Heart Analysis", "WorkHub"]],
  ["Automation and workflows", "Review gates, connectors, background state, retries, explainable progression.", ["NiyamGuard", "Social Media Control Center", "Zettalogix"]],
  ["Data and analytics", "Grounded calculations, risk explanation, provenance-aware responses.", ["Cricket Intelligence", "Heart Analysis"]],
  ["Testing and delivery", "Business logic, state transitions, security boundaries, lint, build, CI, demos.", ["NiyamGuard", "NIRA", "Zettalogix"]],
  ["Security and privacy awareness", "Fail-closed configuration, synthetic modes, attribution, permission and integration limits.", ["NIRA", "Zettalogix", "HYD VNTG"]]
] as const;

export function Capabilities() {
  return (
    <section id="capabilities" className="capabilities shell" aria-labelledby="capabilities-title">
      <header className="section-heading">
        <p className="eyebrow">Capabilities with evidence</p>
        <h2 id="capabilities-title">Skills are useful when they survive contact with a workflow.</h2>
      </header>
      <div className="capability-grid">
        {capabilities.map(([name, description, evidence]) => (
          <article key={name}>
            <span className="capability-index" aria-hidden="true" />
            <h3>{name}</h3>
            <p>{description}</p>
            <p className="evidence-line">Evidence: {evidence.join(" · ")}</p>
          </article>
        ))}
      </div>
      <Link className="text-link" href="/recruiter/">
        Map capabilities to projects in Recruiter View ↗
      </Link>
    </section>
  );
}
