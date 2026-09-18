import { describe, it, expect } from "vitest";
import { validateArtifact } from "@interactive-artifact/protocol";
import { ArtifactRegistry } from "@interactive-artifact/registry";
import {
  CATALOG_CAPABILITIES,
  registerCatalogCapabilities,
  sampleNodeGraphArtifact,
  sampleArchitectureArtifact,
  sampleERDArtifact,
  sampleMindMapArtifact,
  sampleSequenceArtifact,
  sampleTimelineArtifact,
  sampleOrgHierarchyArtifact,
  sampleWorkflowArtifact,
  sampleDashboardArtifact,
  sampleTableArtifact,
  sampleFormArtifact
} from "../src/index.js";

describe("Catalog Capabilities Suite", () => {
  it("exports all 11 required capabilities", () => {
    expect(CATALOG_CAPABILITIES.length).toBe(11);
    const ids = CATALOG_CAPABILITIES.map(c => c.id);
    expect(ids).toContain("diagram.nodegraph");
    expect(ids).toContain("diagram.architecture");
    expect(ids).toContain("diagram.erd");
    expect(ids).toContain("diagram.mindmap");
    expect(ids).toContain("diagram.sequence");
    expect(ids).toContain("diagram.timeline");
    expect(ids).toContain("diagram.orghierarchy");
    expect(ids).toContain("diagram.workflow");
    expect(ids).toContain("data.dashboard");
    expect(ids).toContain("data.table");
    expect(ids).toContain("ui.form");
  });

  it("successfully registers all catalog capabilities into ArtifactRegistry", () => {
    const registry = new ArtifactRegistry();
    registerCatalogCapabilities(registry);
    expect(registry.list().length).toBeGreaterThanOrEqual(11);
    expect(registry.has("diagram.erd")).toBe(true);
    expect(registry.has("data.dashboard")).toBe(true);
  });

  it("validates sample artifacts against the Artifact Protocol schema", () => {
    const samples = [
      sampleNodeGraphArtifact,
      sampleArchitectureArtifact,
      sampleERDArtifact,
      sampleMindMapArtifact,
      sampleSequenceArtifact,
      sampleTimelineArtifact,
      sampleOrgHierarchyArtifact,
      sampleWorkflowArtifact,
      sampleDashboardArtifact,
      sampleTableArtifact,
      sampleFormArtifact
    ];

    for (const sample of samples) {
      const result = validateArtifact(sample);
      expect(result.success).toBe(true);
    }
  });

  it("verifies ERD artifacts contain structured tables and ports", () => {
    expect(sampleERDArtifact.elements.length).toBeGreaterThanOrEqual(3);
    const table = sampleERDArtifact.elements.find(e => e.id === "table_users");
    expect(table).toBeDefined();
    expect(table?.header?.title).toBe("users");
    expect(table?.ports?.length).toBeGreaterThanOrEqual(1);
  });
});
