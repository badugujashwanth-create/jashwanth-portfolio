import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Privacy", description: "Privacy posture for the Systems in Motion portfolio." };

export default function PrivacyPage() {
  return (
    <main id="main-content" className="legal-page shell">
      <p className="eyebrow">Privacy</p>
      <h1>No analytics, forms, fingerprints, or advertising trackers.</h1>
      <p>
        This static portfolio does not collect typed contact information and does not set an
        application account. External repository and demo links are governed by their destination
        services. The optional WebGL quality selector reads only browser capability signals in the
        current session and does not transmit them.
      </p>
      <Link className="text-link" href="/">Return home</Link>
    </main>
  );
}
