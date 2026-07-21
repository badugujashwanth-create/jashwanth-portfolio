const baseUrl = (process.env.MEDIA_BASE_URL || "https://jashwanth-portfolio-ten.vercel.app").replace(/\/$/, "");
const recordings = [
  "portfolio",
  "niyamguard",
  "nira",
  "social-media-control-center",
  "cricket-api",
  "heart-analysis",
  "zettalogix",
  "workhub",
  "neutro",
  "shadowops",
  "hyd-vntg",
  "parkalert"
];
const assets = recordings.flatMap((project) => [
  [`/media/${project}/demo.mp4`, "video/mp4"],
  [`/media/${project}/demo.webm`, "video/webm"],
  [`/media/${project}/demo-captions.vtt`, "text/vtt"],
  [`/media/${project}/poster.png`, "image/png"]
]);
assets.push(["/media/cricket-web/poster.png", "image/png"]);

const failures = [];
for (const [pathname, expectedType] of assets) {
  const url = `${baseUrl}${pathname}`;
  const response = await fetch(url, { method: "HEAD", redirect: "follow", signal: AbortSignal.timeout(30_000) }).catch(() => null);
  const type = response?.headers.get("content-type")?.split(";")[0].toLowerCase();
  const size = Number(response?.headers.get("content-length") || 0);
  if (!response || response.status !== 200 || type !== expectedType || size <= 0) {
    failures.push(`${response?.status ?? "network"} ${type ?? "no-type"} ${size}B ${url} (expected ${expectedType})`);
  }
}

if (failures.length) {
  console.error(`Public media failures (${failures.length}):\n${failures.join("\n")}`);
  process.exit(1);
}

console.log(`Verified ${assets.length} logged-out public assets at ${baseUrl}: HTTP 200, expected MIME, non-zero length.`);
