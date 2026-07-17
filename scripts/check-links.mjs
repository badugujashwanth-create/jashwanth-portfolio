import fs from "node:fs/promises";
import path from "node:path";

const output = path.resolve("out");
const files = [];

async function walk(directory) {
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) await walk(absolute);
    else if (entry.name.endsWith(".html")) files.push(absolute);
  }
}

await walk(output);
const missing = [];
const external = new Set();

for (const file of files) {
  const html = await fs.readFile(file, "utf8");
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const value = match[1];
    if (!value || value.startsWith("#") || value.startsWith("data:")) continue;
    if (/^https?:\/\//.test(value)) {
      external.add(value);
      continue;
    }
    const clean = value.split(/[?#]/)[0];
    const candidate = clean.startsWith("/") ? path.join(output, clean) : path.resolve(path.dirname(file), clean);
    const possible = path.extname(candidate) ? [candidate] : [candidate, `${candidate}.html`, path.join(candidate, "index.html")];
    if (!(await Promise.all(possible.map((item) => fs.access(item).then(() => true).catch(() => false)))).some(Boolean)) {
      missing.push(`${path.relative(output, file)} -> ${value}`);
    }
  }
}

if (missing.length) {
  console.error(`Broken internal links (${missing.length}):\n${missing.join("\n")}`);
  process.exit(1);
}

const criticalExternal = [...external].filter((url) =>
  url.includes("github.com/badugujashwanth-create") || url.includes("sharepoint-one.vercel.app")
);
const failures = [];
for (const url of criticalExternal) {
  const response = await fetch(url, { method: "HEAD", redirect: "follow", signal: AbortSignal.timeout(15000) })
    .catch(() => fetch(url, { redirect: "follow", signal: AbortSignal.timeout(15000) }))
    .catch(() => null);
  if (!response || response.status >= 400) failures.push(`${response?.status ?? "network"} ${url}`);
}

if (failures.length) {
  console.error(`Broken critical external links (${failures.length}):\n${failures.join("\n")}`);
  process.exit(1);
}

console.log(`Checked ${files.length} HTML files, ${external.size} external URLs, and ${criticalExternal.length} critical evidence links: 0 broken.`);
