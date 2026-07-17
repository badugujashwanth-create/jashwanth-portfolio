export type RenderQuality = "high" | "medium" | "low" | "static";

export interface CapabilityInput {
  webgl: boolean;
  reducedMotion: boolean;
  saveData: boolean;
  memoryGb?: number;
  cores?: number;
  width: number;
}

export function selectRenderQuality(input: CapabilityInput): RenderQuality {
  if (!input.webgl || input.reducedMotion || input.saveData) return "static";
  if (input.width < 520 || (input.memoryGb !== undefined && input.memoryGb <= 2)) return "low";
  if (input.width < 1024 || (input.cores !== undefined && input.cores <= 4)) return "medium";
  return "high";
}

export const particleCountFor = (quality: RenderQuality): number =>
  ({ high: 96, medium: 56, low: 24, static: 0 })[quality];

export function canUseWebGL(documentRef: Document = document): boolean {
  try {
    const canvas = documentRef.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}
