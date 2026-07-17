import type { Metadata, Viewport } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

import { SiteHeader } from "@/components/SiteHeader";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s — ${site.name}` },
  description: site.description,
  applicationName: "Systems in Motion",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: site.title,
    description: site.description,
    url: "/",
    images: [{ url: "/assets/social/home.png", width: 1200, height: 630, alt: "Jashwanth Badugu — Systems in Motion" }]
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: ["/assets/social/home.png"]
  },
  icons: { icon: "/assets/icons/favicon.svg", apple: "/assets/icons/app-icon.svg" }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
  themeColor: "#070a12"
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Link className="skip-link" href="#main-content">
          Skip to content
        </Link>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
