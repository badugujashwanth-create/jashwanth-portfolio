import { readdir } from "node:fs/promises";
import path from "node:path";

const baseUrl = (process.env.MEDIA_BASE_URL || "https://jashwanth-portfolio-ten.vercel.app").replace(/\/$/, "");
const publicRoot = path.resolve("public");
const types = new Map([
  [".mp4", "video/mp4"],
  [".webm", "video/webm"],
  [".vtt", "text/vtt"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".webp", "image/webp"],
  [".gif", "image/gif"],
  [".svg", "image/svg+xml"]
]);

async function collect(directory) {
  const assets = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) assets.push(...await collect(absolute));
    else if (types.has(path.extname(entry.name).toLowerCase())) {
      const pathname = `/${path.relative(publicRoot, absolute).split(path.sep).join("/")}`;
      assets.push([pathname, types.get(path.extname(entry.name).toLowerCase())]);
    }
  }
  return assets;
}

const assets = await collect(publicRoot);

const failures = [];
for (const [pathname, expectedType] of assets) {
  const url = `${baseUrl}${pathname}`;
  const response = await fetch(url, { method: "HEAD", redirect: "follow", signal: AbortSignal.timeout(30_000) }).catch(() => null);
  const type = response?.headers.get("content-type")?.split(";")[0].toLowerCase();
  let size = Number(response?.headers.get("content-length") || 0);
  if (response?.status === 200 && size <= 0) {
    const bodyResponse = await fetch(url, {
      headers: { Range: "bytes=0-0" },
      redirect: "follow",
      signal: AbortSignal.timeout(30_000)
    }).catch(() => null);
    const contentRange = bodyResponse?.headers.get("content-range")?.match(/\/(\d+)$/);
    size = contentRange ? Number(contentRange[1]) : (await bodyResponse?.arrayBuffer())?.byteLength || 0;
  }
  if (!response || response.status !== 200 || type !== expectedType || size <= 0) {
    failures.push(`${response?.status ?? "network"} ${type ?? "no-type"} ${size}B ${url} (expected ${expectedType})`);
  }
}

if (failures.length) {
  console.error(`Public media failures (${failures.length}):\n${failures.join("\n")}`);
  process.exit(1);
}

console.log(`Verified ${assets.length} logged-out public assets at ${baseUrl}: HTTP 200, expected MIME, non-zero length.`);
