"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  ["Projects", "/#featured"],
  ["Capabilities", "/#capabilities"],
  ["All work", "/#all-projects"],
  ["Recruiter view", "/recruiter/"]
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <Link className="monogram" href="/" aria-label="JB/SYS — Jashwanth Badugu home" prefetch={false}>
        JB<span aria-hidden="true">/</span>SYS
      </Link>
      <button
        className="menu-toggle"
        type="button"
        aria-expanded={open}
        aria-controls="primary-navigation"
        onClick={() => setOpen((value) => !value)}
      >
        <span aria-hidden="true">{open ? "Close" : "Menu"}</span>
        <span className="sr-only">Toggle navigation</span>
      </button>
      <nav id="primary-navigation" aria-label="Primary" data-open={open}>
        {links.map(([label, href]) => (
          <Link
            key={href}
            href={href}
            prefetch={false}
            aria-current={pathname === href ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
