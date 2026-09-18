import { describe, it, expect } from "vitest";
import {
  chartCapability,
  sampleBarChartArtifact,
  sampleLineChartArtifact,
  samplePieChartArtifact,
  sampleScatterArtifact,
  createChartArtifact
} from "../src/index.js";
import { validateArtifact } from "@interactive-artifact/protocol";

describe("Charts Capability", () => {
  it("has valid metadata and primitives", () => {
    expect(chartCapability.id).toBe("data.chart");
    expect(chartCapability.primitives).toContain("rectangle");
    expect(chartCapability.primitives).toContain("ellipse");
  });

  it("normalizes bar, line, pie, and scatter charts into valid protocol artifacts", () => {
    expect(validateArtifact(sampleBarChartArtifact).success).toBe(true);
    expect(validateArtifact(sampleLineChartArtifact).success).toBe(true);
    expect(validateArtifact(samplePieChartArtifact).success).toBe(true);
    expect(validateArtifact(sampleScatterArtifact).success).toBe(true);
  });

  it("generates chart elements from custom dataset", () => {
    const custom = createChartArtifact({
      title: "Quarterly Revenue",
      chartType: "bar",
      data: [
        { category: "Q1", value: 100 },
        { category: "Q2", value: 200 }
      ]
    });
    expect(validateArtifact(custom).success).toBe(true);
    expect(custom.elements.length).toBeGreaterThanOrEqual(4); // title, axes, bars, labels
  });
});
