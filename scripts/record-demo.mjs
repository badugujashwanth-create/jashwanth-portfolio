import { chromium } from "@playwright/test";
import fs from "node:fs/promises";
import path from "node:path";

const base = process.env.PORTFOLIO_BASE_URL || "http://127.0.0.1:4173";
const temporary = path.resolve("test-results/demo-recording");
const output = path.resolve("docs/demo");
await fs.mkdir(temporary, { recursive: true });
await fs.mkdir(output, { recursive: true });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1280, height: 720 },
  recordVideo: { dir: temporary, size: { width: 1280, height: 720 } },
  colorScheme: "dark"
});
const page = await context.newPage();

await page.goto(base, { waitUntil: "networkidle" });
await page.screenshot({ path: path.join(output, "demo-thumbnail.png") });
await page.waitForTimeout(6000);

for (const [x, y] of [[970, 180], [1110, 520], [720, 610], [1030, 330]]) {
  await page.mouse.move(x, y, { steps: 30 });
  await page.waitForTimeout(2500);
}

await page.getByRole("link", { name: "Explore projects" }).click();
await page.waitForTimeout(3500);
await page.evaluate(() => window.scrollBy({ top: 720, behavior: "smooth" }));
await page.waitForTimeout(4500);
await page.evaluate(() => window.scrollBy({ top: 900, behavior: "smooth" }));
await page.waitForTimeout(5000);
await page.evaluate(() => window.scrollBy({ top: 1050, behavior: "smooth" }));
await page.waitForTimeout(5000);

await page.goto(`${base}/recruiter/`, { waitUntil: "networkidle" });
await page.waitForTimeout(5000);
await page.evaluate(() => window.scrollBy({ top: 800, behavior: "smooth" }));
await page.waitForTimeout(5500);

await page.goto(`${base}/work/niyamguard/`, { waitUntil: "networkidle" });
await page.waitForTimeout(5000);
await page.evaluate(() => window.scrollBy({ top: 820, behavior: "smooth" }));
await page.waitForTimeout(4500);
await page.evaluate(() => window.scrollBy({ top: 980, behavior: "smooth" }));
await page.waitForTimeout(5000);

await page.setViewportSize({ width: 390, height: 720 });
await page.goto(base, { waitUntil: "networkidle" });
await page.waitForTimeout(4500);
await page.getByRole("button", { name: "Toggle navigation" }).click();
await page.waitForTimeout(2500);
await page.getByRole("link", { name: "Recruiter view" }).first().click();
await page.waitForTimeout(4500);

await page.emulateMedia({ reducedMotion: "reduce" });
await page.goto(base, { waitUntil: "networkidle" });
await page.waitForTimeout(4500);
await page.getByRole("button", { name: "Skip experience" }).click();
await page.waitForTimeout(3000);

await page.setViewportSize({ width: 1280, height: 720 });
await page.goto(`${base}/#contact`, { waitUntil: "networkidle" });
await page.locator("#contact").scrollIntoViewIfNeeded();
await page.waitForTimeout(6500);

const video = page.video();
await page.close();
await context.close();
const recorded = await video.path();
await fs.copyFile(recorded, path.join(output, "portfolio-demo.webm"));
await browser.close();
console.log(`Recorded real portfolio behavior to ${path.join(output, "portfolio-demo.webm")}`);
