import assert from "node:assert/strict";

const owner = "badugujashwanth-create";
const repositories = [
  "badugujashwanth-create",
  "NiyamGuard",
  "NIRA",
  "social-media-control-center",
  "cricket-chatbot-api",
  "cricket-chatbot-web",
  "heart-analysis",
  "zettalogix-migration-suite",
  "workhub-os",
  "Neutro",
  "shadowops-hackathon",
  "hyd-vntg-storefront",
  "parkalert-india",
  "jashwanth-portfolio"
];
const requiredMp4 = new Map([
  ["NiyamGuard", "v1.1.0"],
  ["NIRA", "v0.5.0"],
  ["social-media-control-center", "v1.0.0"],
  ["cricket-chatbot-api", "v1.0.3"],
  ["heart-analysis", "v1.0.0"],
  ["zettalogix-migration-suite", "v0.3.0"],
  ["workhub-os", "v1.1.0"]
]);
const expectedTypes = new Map([
  [".mp4", "video/mp4"],
  [".webm", "video/webm"],
  [".vtt", "text/vtt"],
  [".png", "image/png"]
]);

let forcedDownloads = 0;

async function publicAsset(url, expectedType, allowAttachment = false) {
  const response = await fetch(url, { method: "HEAD", redirect: "follow", signal: AbortSignal.timeout(30_000) });
  const type = response.headers.get("content-type")?.split(";")[0].toLowerCase();
  let size = Number(response.headers.get("content-length") || 0);
  if (response.status === 200 && size <= 0) {
    const body = await fetch(url, { headers: { Range: "bytes=0-0" }, redirect: "follow", signal: AbortSignal.timeout(30_000) });
    const range = body.headers.get("content-range")?.match(/\/(\d+)$/);
    size = range ? Number(range[1]) : (await body.arrayBuffer()).byteLength;
  }
  assert.equal(response.status, 200, `${url}: HTTP ${response.status}`);
  if (allowAttachment && type === "application/octet-stream") forcedDownloads += 1;
  else assert.equal(type, expectedType, `${url}: ${type} instead of ${expectedType}`);
  assert.ok(size > 0, `${url}: empty asset`);
}

let releaseMedia = 0;
let readmeThumbnails = 0;
for (const repository of repositories) {
  const readmeUrl = `https://raw.githubusercontent.com/${owner}/${repository}/main/README.md`;
  const readmeResponse = await fetch(readmeUrl, { signal: AbortSignal.timeout(30_000) });
  assert.equal(readmeResponse.status, 200, `${repository}: public README unavailable`);
  const readme = await readmeResponse.text();
  assert.doesNotMatch(readme, /github\.com\/[^\s)]+\/blob\/[^\s)]+\.(?:mp4|webm|vtt)/i, `${repository}: media uses a GitHub HTML wrapper`);
  assert.doesNotMatch(readme, /\]\(docs\/demo\/demo\.webm\)/i, `${repository}: thumbnail links to GitHub-rendered WebM`);

  if (repository !== owner) {
    assert.match(readme, /jashwanth-portfolio-ten\.vercel\.app\/(?:media|work)\//, `${repository}: verified public media link missing`);
  }

  for (const match of readme.matchAll(/!\[[^\]]*\]\(([^)]+(?:demo-thumbnail|\/media\/[^)]+\/poster)[^)]*)\)/gi)) {
    const source = match[1].startsWith("http")
      ? match[1]
      : `https://raw.githubusercontent.com/${owner}/${repository}/main/${match[1]}`;
    await publicAsset(source, "image/png");
    readmeThumbnails += 1;
  }

  const releasesResponse = await fetch(`https://api.github.com/repos/${owner}/${repository}/releases?per_page=100`, {
    headers: { Accept: "application/vnd.github+json", "User-Agent": "portfolio-media-verifier" },
    signal: AbortSignal.timeout(30_000)
  });
  assert.equal(releasesResponse.status, 200, `${repository}: public releases API unavailable`);
  const releases = await releasesResponse.json();
  const requiredTag = requiredMp4.get(repository);
  if (requiredTag) {
    const release = releases.find((item) => item.tag_name === requiredTag);
    assert.ok(release, `${repository}: ${requiredTag} release missing`);
    assert.ok(release.assets.some((asset) => asset.name === "demo.mp4" && asset.content_type === "video/mp4"), `${repository}: ${requiredTag} MP4 missing`);
  }

  for (const release of releases) {
    for (const asset of release.assets) {
      const extension = [...expectedTypes.keys()].find((value) => asset.name.toLowerCase().endsWith(value));
      if (!extension) continue;
      assert.equal(asset.content_type.split(";")[0], expectedTypes.get(extension), `${repository}/${release.tag_name}/${asset.name}: API MIME mismatch`);
      await publicAsset(asset.browser_download_url, expectedTypes.get(extension), true);
      releaseMedia += 1;
    }
  }
}

console.log(`Verified ${releaseMedia} logged-out GitHub release media downloads (${forcedDownloads} CDN-forced attachments with correct API MIME) and ${readmeThumbnails} README thumbnails.`);
