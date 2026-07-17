import { describe, expect, test } from "vitest";

import { particleCountFor, selectRenderQuality } from "@/lib/capability";

const capable = {
  webgl: true,
  reducedMotion: false,
  saveData: false,
  memoryGb: 8,
  cores: 8,
  width: 1440
};

describe("render quality selection", () => {
  test("selects high quality only for a capable desktop", () => {
    expect(selectRenderQuality(capable)).toBe("high");
  });

  test.each([
    [{ ...capable, webgl: false }, "missing WebGL"],
    [{ ...capable, reducedMotion: true }, "reduced motion"],
    [{ ...capable, saveData: true }, "Save-Data"]
  ])("uses the static system for %s", (input) => {
    expect(selectRenderQuality(input)).toBe("static");
  });

  test("reduces quality for small and constrained devices", () => {
    expect(selectRenderQuality({ ...capable, width: 390 })).toBe("low");
    expect(selectRenderQuality({ ...capable, width: 900 })).toBe("medium");
    expect(selectRenderQuality({ ...capable, cores: 4 })).toBe("medium");
  });

  test("particle counts remain bounded", () => {
    expect(particleCountFor("high")).toBe(96);
    expect(particleCountFor("medium")).toBeLessThan(particleCountFor("high"));
    expect(particleCountFor("low")).toBeLessThan(particleCountFor("medium"));
    expect(particleCountFor("static")).toBe(0);
  });
});
