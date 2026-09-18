import { describe, it, expect } from "vitest";
import { excalidrawCapability, sampleExcalidrawArtifact } from "../src/index.js";
import { validateArtifact } from "@interactive-artifact/protocol";

describe("Excalidraw Capability", () => {
  it("has valid metadata and sketch primitives", () => {
    expect(excalidrawCapability.id).toBe("canvas.excalidraw");
    expect(excalidrawCapability.primitives).toContain("rectangle");
    expect(excalidrawCapability.primitives).toContain("ellipse");
    expect(excalidrawCapability.primitives).toContain("arrow");
    expect(excalidrawCapability.primitives).toContain("freehand");
  });

  it("validates the sample sketch artifact against protocol schema", () => {
    const result = validateArtifact(sampleExcalidrawArtifact);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.elements.some(el => (el.style?.roughness ?? 0) > 0)).toBe(true);
    }
  });
});
