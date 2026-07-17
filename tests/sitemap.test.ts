import { describe, expect, it } from "vitest";

import sitemap from "@/app/sitemap";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

describe("sitemap", () => {
  it("emits one direct canonical URL per public route", () => {
    const entries = sitemap();

    expect(entries).toHaveLength(projects.length + 3);
    expect(entries[0]?.url).toBe(`${site.url}/`);
    expect(entries.every((entry) => entry.url.startsWith(site.url) && entry.url.endsWith("/"))).toBe(true);
  });
});
