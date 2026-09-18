import { describe, it, expect } from "vitest";
import { flowchartCapability, sampleFlowchartArtifact } from "../src/index.js";
import { validateArtifact } from "@interactive-artifact/protocol";

describe("Flowchart Capability", () => {
  it("has valid metadata, tags, and primitives", () => {
    expect(flowchartCapability.id).toBe("diagram.flowchart");
    expect(flowchartCapability.primitives).toContain("node");
    expect(flowchartCapability.primitives).toContain("connector");
    expect(flowchartCapability.interactions).toContain("drag");
  });

  it("validates the sample flowchart artifact against protocol schema", () => {
    const result = validateArtifact(sampleFlowchartArtifact);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.elements.length).toBeGreaterThanOrEqual(3);
      expect(result.data.connections.length).toBeGreaterThanOrEqual(2);
    }
  });
});
