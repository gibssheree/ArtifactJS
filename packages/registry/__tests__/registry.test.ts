import { describe, it, expect } from "vitest";
import { ArtifactRegistry } from "../src/index.js";

describe("ArtifactRegistry & Capability Discovery", () => {
  it("registers and retrieves capabilities", () => {
    const registry = new ArtifactRegistry();
    registry.register({
      id: "diagram.flowchart",
      name: "Flowchart",
      version: "1.0",
      description: "Interactive flowchart",
      tags: ["flowchart", "diagram"],
      primitives: ["node", "connector"],
      interactions: ["drag", "connect"]
    });

    expect(registry.has("diagram.flowchart")).toBe(true);
    const cap = registry.get("diagram.flowchart");
    expect(cap?.name).toBe("Flowchart");
    expect(registry.list().length).toBe(1);
  });

  it("searches and scores capabilities based on keywords and tags", () => {
    const registry = new ArtifactRegistry();
    registry.register({
      id: "diagram.flowchart",
      name: "Flowchart",
      version: "1.0",
      description: "Interactive node flowchart",
      tags: ["flowchart", "diagram", "workflow"],
      primitives: ["node", "connector"],
      interactions: ["drag"]
    });

    registry.register({
      id: "diagram.erd",
      name: "Entity Relationship Diagram",
      version: "1.0",
      description: "Database schema architecture diagram",
      tags: ["database", "erd", "schema", "architecture"],
      primitives: ["table", "column"],
      interactions: ["drag"]
    });

    registry.register({
      id: "data.chart",
      name: "Bar and Line Charts",
      version: "1.0",
      description: "Statistical data visualizations",
      tags: ["chart", "data", "analytics"],
      primitives: ["bar", "line"],
      interactions: ["hover"]
    });

    // Query for database
    const dbResults = registry.search("database architecture");
    expect(dbResults.length).toBeGreaterThan(0);
    expect(dbResults[0]?.id).toBe("diagram.erd");

    // Query for chart
    const chartResults = registry.search("analytics chart");
    expect(chartResults[0]?.id).toBe("data.chart");
  });

  it("unregisters capabilities cleanly", () => {
    const registry = new ArtifactRegistry();
    registry.register({
      id: "test.cap",
      name: "Test",
      version: "1.0",
      description: "Test cap",
      tags: [],
      primitives: [],
      interactions: []
    });

    expect(registry.has("test.cap")).toBe(true);
    registry.unregister("test.cap");
    expect(registry.has("test.cap")).toBe(false);
  });
});
