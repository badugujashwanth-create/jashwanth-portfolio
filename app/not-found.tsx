import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="legal-page shell">
      <p className="eyebrow">404 / path not found</p>
      <h1>This node is outside the system.</h1>
      <p>The requested project or route does not exist. The rest of the portfolio remains available.</p>
      <Link className="button button-primary" href="/" prefetch={false}>Return to the system</Link>
    </main>
  );
}
