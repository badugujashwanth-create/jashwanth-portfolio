const steps = [
  "Understand the problem",
  "Model the system",
  "Build the workflow",
  "Test critical behavior",
  "Document decisions",
  "Demonstrate honestly",
  "Improve from evidence"
];

export function EngineeringProcess() {
  return (
    <section className="process shell" aria-labelledby="process-title">
      <header className="section-heading">
        <p className="eyebrow">Engineering process</p>
        <h2 id="process-title">A visible chain of decisions.</h2>
      </header>
      <ol>
        {steps.map((step, index) => (
          <li key={step}>
            <span>0{index + 1}</span>
            <strong>{step}</strong>
          </li>
        ))}
      </ol>
    </section>
  );
}
