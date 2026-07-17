import { describe, expect, test } from "vitest";

import { featuredProjects, projectBySlug, projects } from "@/lib/projects";

describe("portfolio content model", () => {
  test("contains six uniquely ordered featured projects", () => {
    expect(featuredProjects).toHaveLength(6);
    expect(new Set(featuredProjects.map((project) => project.slug)).size).toBe(6);
    expect(featuredProjects.map((project) => project.displayOrder)).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test("keeps forks and held projects out of the featured set", () => {
    expect(featuredProjects.map((project) => project.slug)).not.toContain("shadowops");
    expect(projectBySlug.get("shadowops")?.status).toContain("fork");
  });

  test("uses HTTPS evidence links and local poster paths", () => {
    for (const project of projects) {
      expect(new URL(project.repositoryUrl).protocol).toBe("https:");
      if (project.videoUrl) expect(new URL(project.videoUrl).protocol).toBe("https:");
      expect(project.videoPoster).toMatch(/^\/assets\/projects\/.+\.png$/);
    }
  });

  test("every related-project slug resolves", () => {
    for (const project of projects) {
      for (const slug of project.relatedProjects) expect(projectBySlug.has(slug)).toBe(true);
    }
  });
});
