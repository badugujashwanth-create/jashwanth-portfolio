import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

import { describe, expect, test } from "vitest";

import { featuredProjects, projects } from "@/lib/projects";

const publicRoot = path.resolve("public");
const recordings = [
  { directory: "portfolio", duration: 104.6, narrated: false },
  { directory: "niyamguard", duration: 337.4, narrated: true },
  { directory: "nira", duration: 340, narrated: true },
  { directory: "social-media-control-center", duration: 245.36, narrated: true },
  { directory: "cricket-api", duration: 260.73, narrated: true },
  { directory: "heart-analysis", duration: 257.48, narrated: true },
  { directory: "zettalogix", duration: 340, narrated: true },
  { directory: "workhub", duration: 342.72, narrated: true },
  { directory: "neutro", duration: 55.04, narrated: false },
  { directory: "shadowops", duration: 55.04, narrated: false },
  { directory: "hyd-vntg", duration: 58.24, narrated: false },
  { directory: "parkalert", duration: 55.12, narrated: false }
] as const;

function assertExactPath(relativePath: string) {
  let current = publicRoot;
  for (const segment of relativePath.split("/")) {
    expect(readdirSync(current), `casing mismatch in ${relativePath}`).toContain(segment);
    current = path.join(current, segment);
  }
  return current;
}

function boxes(buffer: Buffer, start = 0, end = buffer.length) {
  const result: Array<{ type: string; start: number; end: number; content: number }> = [];
  let offset = start;
  while (offset + 8 <= end) {
    let size = buffer.readUInt32BE(offset);
    const type = buffer.toString("ascii", offset + 4, offset + 8);
    let header = 8;
    if (size === 1 && offset + 16 <= end) {
      size = Number(buffer.readBigUInt64BE(offset + 8));
      header = 16;
    }
    if (size === 0) size = end - offset;
    if (size < header || offset + size > end) break;
    result.push({ type, start: offset, end: offset + size, content: offset + header });
    offset += size;
  }
  return result;
}

function mp4Duration(buffer: Buffer) {
  const moov = boxes(buffer).find((box) => box.type === "moov");
  expect(moov, "MP4 is missing moov metadata").toBeDefined();
  const mvhd = boxes(buffer, moov!.content, moov!.end).find((box) => box.type === "mvhd");
  expect(mvhd, "MP4 is missing mvhd metadata").toBeDefined();
  const version = buffer[mvhd!.content];
  const timescaleOffset = mvhd!.content + (version === 1 ? 20 : 12);
  const durationOffset = mvhd!.content + (version === 1 ? 24 : 16);
  const timescale = buffer.readUInt32BE(timescaleOffset);
  const duration = version === 1 ? Number(buffer.readBigUInt64BE(durationOffset)) : buffer.readUInt32BE(durationOffset);
  return duration / timescale;
}

function vttEndSeconds(vtt: string) {
  const timestamps = [...vtt.matchAll(/(?:\d{2}:)?(\d{2}):(\d{2})\.(\d{3})/g)].map((match) => {
    const full = match[0].split(/[.:]/).map(Number);
    return full.length === 4
      ? full[0] * 3600 + full[1] * 60 + full[2] + full[3] / 1000
      : Number(match[1]) * 60 + Number(match[2]) + Number(match[3]) / 1000;
  });
  return Math.max(...timestamps);
}

describe("public media integrity", () => {
  test("all project players use same-origin media and avoid delivery anti-patterns", () => {
    for (const project of projects) {
      for (const value of Object.values(project.video)) {
        expect(value).toMatch(/^\/media\/[a-z0-9-]+\/[a-z0-9.-]+$/);
        expect(value).not.toMatch(/github\.com|raw\.githubusercontent|\/blob\/|localhost|127\.0\.0\.1|[A-Z]:\\/i);
      }
    }
  });

  test("every published recording has exact-case, non-empty MP4, WebM, captions, and poster files", () => {
    for (const recording of recordings) {
      for (const filename of ["demo.mp4", "demo.webm", "demo-captions.vtt", "poster.png"]) {
        const file = assertExactPath(`media/${recording.directory}/${filename}`);
        expect(existsSync(file)).toBe(true);
        expect(statSync(file).size).toBeGreaterThan(100);
        expect(readFileSync(file, "utf8").slice(0, 100)).not.toContain("version https://git-lfs.github.com/spec");
      }
    }
    expect(existsSync(assertExactPath("media/cricket-web/poster.png"))).toBe(true);
  });

  test("MP4 fallbacks are H.264, duration-aligned, fast-start files with AAC when the source is narrated", () => {
    for (const recording of recordings) {
      const buffer = readFileSync(path.join(publicRoot, "media", recording.directory, "demo.mp4"));
      const text = buffer.toString("latin1");
      expect(text.slice(0, 64)).toContain("ftyp");
      expect(text.indexOf("moov")).toBeLessThan(text.indexOf("mdat"));
      expect(text).toContain("avc1");
      if (recording.narrated) expect(text).toContain("mp4a");
      expect(mp4Duration(buffer)).toBeCloseTo(recording.duration, 0);
    }
  });

  test("WebM originals, 1280x720 posters, and captions are structurally valid", () => {
    for (const recording of recordings) {
      const directory = path.join(publicRoot, "media", recording.directory);
      const webm = readFileSync(path.join(directory, "demo.webm"));
      const png = readFileSync(path.join(directory, "poster.png"));
      const vtt = readFileSync(path.join(directory, "demo-captions.vtt"), "utf8").replace(/^\uFEFF/, "");
      expect(webm.subarray(0, 4).toString("hex")).toBe("1a45dfa3");
      expect(png.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
      expect(png.readUInt32BE(16)).toBe(1280);
      expect(png.readUInt32BE(20)).toBe(720);
      expect(vtt).toMatch(/^WEBVTT/);
      expect(vtt).toContain("-->");
      expect(vttEndSeconds(vtt)).toBeGreaterThan(recording.duration - 20);
      expect(createHash("sha256").update(webm).digest("hex")).toHaveLength(64);
    }
  });

  test("every featured project retains narrated audio and captions", () => {
    const narratedDirectories = new Set(recordings.filter((recording) => recording.narrated).map((recording) => recording.directory));
    for (const project of featuredProjects) {
      const directory = project.video.mp4.split("/")[2];
      expect(narratedDirectories).toContain(directory);
      expect(project.video.captions.endsWith("demo-captions.vtt")).toBe(true);
    }
  });
});
