import Link from "next/link";

export function RecruiterSnapshot() {
  const facts = [
    ["06", "verified featured systems"],
    ["Python + TypeScript", "primary engineering languages"],
    ["AI · workflows · data", "current technical focus"],
    ["Tests + demos", "evidence before claims"]
  ];

  return (
    <section className="snapshot shell" aria-labelledby="snapshot-title">
      <div>
        <p className="eyebrow">30-second snapshot</p>
        <h2 id="snapshot-title">Engineering depth without the scavenger hunt.</h2>
        <p>
          Each featured project links directly to architecture, test evidence, limitations, a real
          repository, and a verified demonstration.
        </p>
        <Link className="text-link" href="/recruiter/">
          Open the fast, printable recruiter route <span aria-hidden="true">↗</span>
        </Link>
      </div>
      <dl className="fact-grid">
        {facts.map(([value, label]) => (
          <div key={label}>
            <dt>{value}</dt>
            <dd>{label}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
