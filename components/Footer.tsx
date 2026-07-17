import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer shell" id="contact">
      <p className="eyebrow">Contact</p>
      <h2>Interested in software engineering, AI, automation, data, and full-stack opportunities.</h2>
      <p>
        No public email or LinkedIn was provided, so GitHub is the verified contact route. A resume
        will appear only after an approved file is supplied.
      </p>
      <div className="footer-actions">
        <a className="button button-primary" href="https://github.com/badugujashwanth-create" target="_blank" rel="noreferrer">
          Contact via GitHub
        </a>
        <Link className="button button-secondary" href="/recruiter/" prefetch={false}>Recruiter view</Link>
      </div>
      <div className="footer-meta">
        <span>Systems in Motion / 2026</span>
        <Link href="/privacy/" prefetch={false}>Privacy</Link>
        <a href="https://github.com/badugujashwanth-create/jashwanth-portfolio" target="_blank" rel="noreferrer">Source ↗</a>
      </div>
    </footer>
  );
}
