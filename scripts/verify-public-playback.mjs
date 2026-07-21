import assert from "node:assert/strict";

import { chromium, devices } from "@playwright/test";

const baseUrl = (process.env.MEDIA_BASE_URL || "https://jashwanth-portfolio-ten.vercel.app").replace(/\/$/, "");
const projects = [
  ["niyamguard", 337],
  ["nira", 340],
  ["social-media-control-center", 245],
  ["cricket-intelligence", 260],
  ["heart-analysis", 257],
  ["zettalogix-migration-suite", 340],
  ["workhub-os", 342],
  ["neutro", 195.92],
  ["shadowops", 55],
  ["hyd-vntg-storefront", 183.12],
  ["parking-alert", 55]
];

async function verifyMode({ name, executablePath, contextOptions = {}, args = [], throttle = false }) {
  const browser = await chromium.launch({ executablePath, headless: true, args: ["--autoplay-policy=no-user-gesture-required", ...args] });
  const context = await browser.newContext(contextOptions);
  const page = await context.newPage();
  let cdp;

  await page.goto(`${baseUrl}/`, { waitUntil: "domcontentloaded", timeout: 60_000 });
  const homepageImages = page.locator("img[src^='/assets/projects/']");
  assert.ok(await homepageImages.count() >= 6, `${name}: homepage project images missing`);
  for (let index = 0; index < await homepageImages.count(); index += 1) {
    const image = homepageImages.nth(index);
    await image.scrollIntoViewIfNeeded();
    await image.evaluate((element) => element.complete
      ? Promise.resolve()
      : new Promise((resolve, reject) => {
          const timer = setTimeout(() => reject(new Error("image timeout")), 15_000);
          element.addEventListener("load", () => { clearTimeout(timer); resolve(); }, { once: true });
          element.addEventListener("error", (error) => { clearTimeout(timer); reject(error); }, { once: true });
        }));
    const imageState = await image.evaluate((element) => ({ height: element.naturalHeight, width: element.naturalWidth }));
    const imageBox = await image.boundingBox();
    assert.ok(imageState.width > 0 && imageState.height > 0, `${name}: homepage image failed to decode`);
    assert.ok(imageBox && imageBox.width > 0 && imageBox.height > 0, `${name}: homepage image collapsed`);
    assert.ok(imageBox.x >= 0 && imageBox.x + imageBox.width <= page.viewportSize().width + 1, `${name}: homepage image overflow`);
  }

  if (throttle) {
    cdp = await context.newCDPSession(page);
    await cdp.send("Network.enable");
    await cdp.send("Network.emulateNetworkConditions", {
      offline: false,
      latency: 150,
      downloadThroughput: 750 * 1024 / 8,
      uploadThroughput: 256 * 1024 / 8
    });
  }

  for (const [slug, expectedDuration] of projects) {
    await page.goto(`${baseUrl}/work/${slug}/`, { waitUntil: "domcontentloaded", timeout: 60_000 });
    const video = page.locator("video");
    await video.waitFor({ state: "visible", timeout: 30_000 });
    await video.evaluate((element) => new Promise((resolve, reject) => {
      if (element.readyState >= 1) return resolve();
      const timer = setTimeout(() => reject(new Error("metadata timeout")), 30_000);
      element.addEventListener("loadedmetadata", () => { clearTimeout(timer); resolve(); }, { once: true });
      element.addEventListener("error", () => { clearTimeout(timer); reject(element.error || new Error("media error")); }, { once: true });
      element.load();
    }));

    const metadata = await video.evaluate((element) => ({
      controls: element.controls,
      currentSrc: element.currentSrc,
      duration: element.duration,
      height: element.videoHeight,
      playsInline: element.playsInline,
      readyState: element.readyState,
      tracks: element.querySelectorAll("track[kind='captions']").length,
      width: element.videoWidth
    }));
    assert.equal(metadata.controls, true, `${name}/${slug}: native controls missing`);
    assert.equal(metadata.playsInline, true, `${name}/${slug}: playsInline missing`);
    assert.match(metadata.currentSrc, /\/media\/.+\/demo\.(mp4|webm)$/i, `${name}/${slug}: unexpected source`);
    assert.ok(Math.abs(metadata.duration - expectedDuration) < 2, `${name}/${slug}: duration mismatch`);
    assert.equal(metadata.width, 1280, `${name}/${slug}: width mismatch`);
    assert.equal(metadata.height, 720, `${name}/${slug}: height mismatch`);
    assert.equal(metadata.tracks, 1, `${name}/${slug}: captions track missing`);
    assert.ok(metadata.readyState >= 1, `${name}/${slug}: metadata unavailable`);

    const heroImage = page.locator(".case-poster img");
    await heroImage.waitFor({ state: "visible" });
    const heroState = await heroImage.evaluate((element) => ({ complete: element.complete, height: element.naturalHeight, width: element.naturalWidth }));
    const heroBox = await heroImage.boundingBox();
    assert.ok(heroState.complete && heroState.width > 0 && heroState.height > 0, `${name}/${slug}: project image failed to decode`);
    assert.ok(heroBox && heroBox.width > 0 && heroBox.height > 0, `${name}/${slug}: project image collapsed`);
    assert.ok(heroBox.x >= 0 && heroBox.x + heroBox.width <= page.viewportSize().width + 1, `${name}/${slug}: project image overflow`);

    const box = await video.boundingBox();
    assert.ok(box && box.width > 250 && box.height > 140, `${name}/${slug}: collapsed video`);
    assert.ok(box.x >= 0 && box.x + box.width <= page.viewportSize().width + 1, `${name}/${slug}: horizontal overflow`);

    const captionState = await video.evaluate((element) => {
      const track = element.textTracks[0];
      if (track) track.mode = "showing";
      return new Promise((resolve) => {
        const finish = () => resolve({ count: track?.cues?.length || 0, mode: track?.mode });
        if (track?.cues?.length) return finish();
        setTimeout(finish, 2_000);
      });
    });
    assert.equal(captionState.mode, "showing", `${name}/${slug}: captions cannot be enabled`);
    assert.ok(captionState.count > 0, `${name}/${slug}: caption cues unavailable`);

    await video.evaluate(async (element) => {
      element.muted = true;
      element.currentTime = Math.min(3, element.duration / 2);
      await element.play();
    });
    await page.waitForFunction((element) => !element.paused && element.currentTime > 0, await video.elementHandle(), { timeout: 10_000 });
    await video.evaluate((element) => element.pause());

    const links = await page.locator(".media-actions a").evaluateAll((anchors) => anchors.map((anchor) => ({
      download: anchor.hasAttribute("download"),
      href: anchor.getAttribute("href"),
      text: anchor.textContent?.trim()
    })));
    assert.equal(links.length, 4, `${name}/${slug}: direct media links incomplete`);
    assert.ok(links.some((link) => link.text === "Open MP4" && link.href?.endsWith("demo.mp4")), `${name}/${slug}: MP4 link missing`);
    assert.ok(links.some((link) => link.text === "Download WebM" && link.download), `${name}/${slug}: download link missing`);
    assert.ok(links.some((link) => link.text === "Read captions" && link.href?.endsWith("demo-captions.vtt")), `${name}/${slug}: caption link missing`);

    if (slug === "niyamguard") {
      await video.evaluate((element) => {
        element.addEventListener("click", async () => {
          try {
            await element.requestFullscreen();
            element.dataset.fullscreenCheck = "entered";
          } catch (error) {
            element.dataset.fullscreenCheck = `error:${error instanceof Error ? error.name : "unknown"}`;
          }
        }, { once: true });
      });
      await video.click({ position: { x: 100, y: 100 } });
      await page.waitForFunction((element) => element.dataset.fullscreenCheck, await video.elementHandle(), { timeout: 10_000 });
      assert.equal(await video.getAttribute("data-fullscreen-check"), "entered", `${name}: native fullscreen failed`);
      assert.equal(await page.evaluate(() => Boolean(document.fullscreenElement)), true, `${name}: fullscreen element missing`);
      await page.evaluate(() => document.exitFullscreen());
    }

    if (throttle && cdp) {
      await cdp.send("Network.emulateNetworkConditions", { offline: false, latency: 0, downloadThroughput: -1, uploadThroughput: -1 });
      throttle = false;
    }
  }

  assert.equal((await context.cookies()).length, 0, `${name}: verification was not logged out`);
  await browser.close();
  console.log(`${name}: ${projects.length} case-study players loaded, sought, played, captioned, and fit the viewport.`);
}

async function verifyFallback(executablePath) {
  const browser = await chromium.launch({ executablePath, headless: true });
  const context = await browser.newContext();
  await context.route("**/media/niyamguard/demo.mp4", (route) => route.fulfill({ status: 404, contentType: "text/plain", body: "missing" }));
  await context.route("**/media/niyamguard/demo.webm", (route) => route.fulfill({ status: 404, contentType: "text/plain", body: "missing" }));
  const page = await context.newPage();
  await page.goto(`${baseUrl}/work/niyamguard/`, { waitUntil: "domcontentloaded" });
  await page.locator("video").evaluate((element) => element.load());
  await page.getByText("Embedded playback is unavailable. Use the direct MP4 or WebM link below.").waitFor({ timeout: 30_000 });
  assert.equal(await page.locator(".media-actions a").count(), 4, "fallback removed direct recovery links");
  await browser.close();
  console.log("Failure fallback: blocked sources produced the visible recovery message and retained direct links.");
}

const chrome = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const edge = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

if (process.env.PLAYBACK_FALLBACK_ONLY === "1") {
  await verifyFallback(chrome);
} else {
  await verifyMode({ name: "Chrome desktop", executablePath: chrome });
  await verifyMode({ name: "Edge desktop / WebGL disabled", executablePath: edge, args: ["--disable-webgl"] });
  await verifyMode({ name: "Chrome mobile / throttled first load", executablePath: chrome, contextOptions: { ...devices["Pixel 7"] }, throttle: true });
  await verifyFallback(chrome);
  console.log(`Verified logged-out public playback in three browser modes at ${baseUrl}.`);
}
