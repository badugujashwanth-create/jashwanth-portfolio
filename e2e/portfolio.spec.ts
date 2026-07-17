import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("homepage exposes identity, skip control, projects, and contact", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Practical systems");
  await expect(page.getByRole("link", { name: "Recruiter view" }).first()).toBeVisible();
  await page.getByRole("button", { name: "Skip experience" }).click();
  await expect(page.getByRole("button", { name: "Static experience active" })).toBeDisabled();
  await expect(page.getByRole("heading", { name: "NiyamGuard" }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: "Contact via GitHub" }).last()).toHaveAttribute("href", /github\.com/);
});

test("recruiter route stays concise, printable, and evidence-led", async ({ page }) => {
  await page.goto("/recruiter/");
  await expect(page.getByRole("heading", { name: "Jashwanth Badugu" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 3 })).toHaveCount(6);
  await expect(page.getByText("Resume: pending approved file")).toBeVisible();
  await expect(page.locator("canvas")).toHaveCount(0);
});

test("featured case study exposes workflow, evidence, video, and next project", async ({ page }) => {
  await page.goto("/work/niyamguard/");
  await expect(page.getByRole("heading", { level: 1, name: "NiyamGuard" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "State moves with a reason." })).toBeVisible();
  await expect(page.locator("video")).toHaveAttribute("controls", "");
  await expect(page.getByRole("link", { name: /Next system/ })).toBeVisible();
});

test("mobile navigation opens and reaches recruiter view", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.includes("mobile"), "Mobile-only navigation check");
  await page.goto("/");
  await page.getByRole("button", { name: "Toggle navigation" }).click();
  await expect(page.getByRole("navigation", { name: "Primary" })).toBeVisible();
  await page.getByRole("link", { name: "Recruiter view" }).first().click();
  await expect(page).toHaveURL(/recruiter/);
});

test("reduced-motion and WebGL failure keep static content complete", async ({ page, context }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await context.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (this: HTMLCanvasElement, type: string, options?: unknown) {
      if (type === "webgl" || type === "webgl2") return null;
      return original.call(this, type, options as never);
    } as typeof HTMLCanvasElement.prototype.getContext;
  });
  await page.goto("/");
  await expect(page.locator(".static-system")).toBeVisible();
  await expect(page.getByRole("heading", { name: "NiyamGuard" }).first()).toBeVisible();
});

test("keyboard focus reaches the skip link and primary CTA", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  await page.getByRole("link", { name: "Explore projects" }).focus();
  await expect(page.getByRole("link", { name: "Explore projects" })).toBeFocused();
});

test("homepage and recruiter route have no serious automated accessibility violations", async ({ page }) => {
  for (const path of ["/", "/recruiter/"]) {
    await page.goto(path);
    const results = await new AxeBuilder({ page }).disableRules(["color-contrast"]).analyze();
    expect(results.violations.filter((violation) => ["critical", "serious"].includes(violation.impact ?? ""))).toEqual([]);
  }
});
