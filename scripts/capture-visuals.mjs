import { chromium } from "@playwright/test";
import fs from "node:fs/promises";
import path from "node:path";

const base = process.env.PORTFOLIO_BASE_URL || "http://127.0.0.1:4173";
const screenshots = path.resolve("docs/assets/screenshots");
const social = path.resolve("public/assets/social");
await fs.mkdir(screenshots, { recursive: true });
await fs.mkdir(social, { recursive: true });

const projects = [
  ["niyamguard", "NiyamGuard", "Explainable policy pathways", "#7c5cff"],
  ["nira", "NIRA", "Local intelligence with permission boundaries", "#00c2a8"],
  ["social-media-control-center", "Social Media Control Center", "Streams converging into one operational surface", "#ff6b6b"],
  ["cricket-intelligence", "Cricket Intelligence", "Dataset-grounded statistical trajectories", "#f6c945"],
  ["heart-analysis", "Heart Analysis", "Educational signals with explicit limits", "#ff4d8d"],
  ["zettalogix-migration-suite", "Zettalogix Migration Suite", "Migration state without unsafe external actions", "#4e7cff"],
  ["workhub-os", "WorkHub OS", "Role-based operational modules", "#43d17d"],
  ["neutro", "Neutro", "Experimental accessibility adaptation", "#45a3ff"],
  ["shadowops", "ShadowOps", "Attributed collaborative security experiment", "#9d7bff"],
  ["hyd-vntg-storefront", "HYD VNTG Storefront", "Fail-closed storefront prototype", "#db9464"],
  ["parking-alert", "Parking Alert", "Experimental workflow under a Firebase security hold", "#ff9f43"]
];

const browser = await chromium.launch({ headless: true });

async function shot(name, route, viewport, options = {}) {
  const context = await browser.newContext({ viewport, colorScheme: "dark", reducedMotion: options.reducedMotion ? "reduce" : "no-preference" });
  if (options.noWebgl) {
    await context.addInitScript(() => {
      const original = HTMLCanvasElement.prototype.getContext;
      HTMLCanvasElement.prototype.getContext = function (type, ...args) {
        if (type === "webgl" || type === "webgl2") return null;
        return original.call(this, type, ...args);
      };
    });
  }
  const page = await context.newPage();
  const response = await page.goto(`${base}${route}`, { waitUntil: "networkidle", timeout: 60000 });
  if (!response || response.status() >= 400) throw new Error(`${route} returned ${response?.status()}`);
  await page.screenshot({ path: path.join(screenshots, `${name}.png`), fullPage: Boolean(options.fullPage) });
  await context.close();
}

await shot("home-desktop", "/", { width: 1440, height: 1000 });
await shot("home-mobile", "/", { width: 390, height: 844 }, { fullPage: true });
await shot("recruiter-desktop", "/recruiter/", { width: 1440, height: 1000 });
await shot("recruiter-mobile", "/recruiter/", { width: 390, height: 844 });
await shot("home-reduced-motion", "/", { width: 1440, height: 1000 }, { reducedMotion: true });
await shot("home-webgl-fallback", "/", { width: 1440, height: 1000 }, { noWebgl: true });
for (const [slug] of projects.slice(0, 6)) {
  await shot(`case-${slug}`, `/work/${slug}/`, { width: 1440, height: 1000 });
}

const socialContext = await browser.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
const socialPage = await socialContext.newPage();

async function socialCard(file, eyebrow, title, description, accent) {
  await socialPage.setContent(`<!doctype html><html><head><style>
    *{box-sizing:border-box}body{margin:0;width:1200px;height:630px;overflow:hidden;background:#070a12;color:#f5f7ff;font-family:Inter,system-ui,sans-serif}
    main{position:relative;width:100%;height:100%;display:flex;flex-direction:column;justify-content:space-between;padding:64px 72px;background:radial-gradient(circle at 86% 12%,${accent}55,transparent 36%),linear-gradient(135deg,#0d1220,#070a12 62%)}
    main:before{content:'';position:absolute;inset:0;opacity:.22;background-image:linear-gradient(#b6c5e922 1px,transparent 1px),linear-gradient(90deg,#b6c5e922 1px,transparent 1px);background-size:56px 56px}
    .top,.copy,.system{position:relative;z-index:1}.top{display:flex;justify-content:space-between;align-items:center;font-weight:750}.brand{letter-spacing:-.04em}.tag{color:#aeb8ce;font-size:16px;letter-spacing:.12em;text-transform:uppercase}
    .copy{max-width:860px}.eyebrow{margin-bottom:18px;color:${accent};font-size:17px;font-weight:800;letter-spacing:.17em;text-transform:uppercase}.title{margin:0 0 18px;font-size:${title.length>34?62:76}px;line-height:.95;letter-spacing:-.055em}.description{max-width:760px;margin:0;color:#b6c0d7;font-size:24px;line-height:1.35}
    .system{position:absolute;right:70px;bottom:54px;width:210px;height:210px;border:1px solid ${accent}88;border-radius:50%;box-shadow:0 0 80px ${accent}55}.system:before,.system:after{content:'';position:absolute;border-radius:50%;background:${accent};box-shadow:0 0 24px ${accent}}.system:before{width:34px;height:34px;left:88px;top:88px}.system:after{width:12px;height:12px;left:16px;top:98px;box-shadow:176px 0 24px ${accent},88px -86px 24px ${accent},88px 86px 24px ${accent}}
  </style></head><body><main><div class="top"><span class="brand">JB/SYS</span><span class="tag">Systems in Motion</span></div><div class="copy"><div class="eyebrow">${eyebrow}</div><h1 class="title">${title}</h1><p class="description">${description}</p></div><div class="system"></div></main></body></html>`);
  await socialPage.screenshot({ path: path.join(social, `${file}.png`) });
}

await socialCard("home", "Software and AI Engineer", "Practical systems, made understandable.", "Evidence-based workflow systems, local intelligence, grounded data, and safe demonstrations.", "#7c5cff");
await socialCard("recruiter", "Fast recruiter view", "Six systems. Direct evidence.", "Contributions, architecture, test results, demos, limitations, and interview topics in one printable route.", "#00c2a8");
for (const [slug, title, description, accent] of projects) await socialCard(slug, "Engineering case study", title, description, accent);

await socialContext.close();
await browser.close();
console.log(`Captured 12 review screenshots and ${projects.length + 2} social previews.`);
