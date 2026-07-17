import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { ProjectIndex } from "@/components/ProjectIndex";
import { categories, projects } from "@/lib/projects";

describe("ProjectIndex", () => {
  test("filters project entries without hiding the accessible status", () => {
    render(<ProjectIndex projects={projects} categories={categories} />);
    expect(screen.getByRole("heading", { name: "NiyamGuard" })).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: "Migration" }));
    expect(screen.getByRole("heading", { name: "Zettalogix Migration Suite" })).toBeVisible();
    expect(screen.queryByRole("heading", { name: "Heart Analysis" })).not.toBeInTheDocument();
    expect(screen.getByText("Showing 1 projects for Migration.")).toBeInTheDocument();
  });

  test("renders working case-study and repository actions", () => {
    render(<ProjectIndex projects={[projects[0]]} categories={categories} />);
    expect(screen.getByRole("link", { name: "Case study" })).toHaveAttribute("href", "/work/niyamguard");
    expect(screen.getByRole("link", { name: /Repository/ })).toHaveAttribute("href", projects[0].repositoryUrl);
  });
});
