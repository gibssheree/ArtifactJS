import { describe, it, expect } from "vitest";
import { ArtifactRegistry } from "@interactive-artifact/registry";
import {
  createArtifactTool,
  createUpdateArtifactTool,
  createArtifactSystemPrompt,
  PatchBuilder
} from "../src/index.js";

describe("AI Integration & Tool Generation", () => {
  const registry = new ArtifactRegistry();
  registry.register({
    id: "diagram.flowchart",
    name: "Flowchart",
    version: "1.0",
    description: "Interactive architecture diagram",
    tags: ["architecture", "flowchart"],
    primitives: ["node", "connector"],
    interactions: ["drag", "connect"]
  });

  it("generates OpenAI/Gemini/Anthropic compatible create_artifact tool", () => {
    const tool = createArtifactTool({ registry });
    expect(tool.name).toBe("create_interactive_artifact");
    expect(tool.parameters.type).toBe("object");

    const props = tool.parameters.properties as any;
    expect(props.id).toBeDefined();
    expect(props.type.enum).toContain("diagram.flowchart");
    expect(props.elements).toBeDefined();
    expect(props.connections).toBeDefined();
  });

  it("generates update_artifact patch tool", () => {
    const tool = createUpdateArtifactTool();
    expect(tool.name).toBe("update_interactive_artifact");
    const props = tool.parameters.properties as any;
    expect(props.artifactId).toBeDefined();
    expect(props.patch).toBeDefined();
  });

  it("generates system prompt containing instructions and capabilities list", () => {
    const prompt = createArtifactSystemPrompt({ registry });
    expect(prompt).toContain("Interactive Artifact Generation Guidelines");
    expect(prompt).toContain("diagram.flowchart");
    expect(prompt).toContain("Never generate arbitrary React components");
    expect(prompt).toContain("Never calculate low-level SVG path coordinates");
  });

  it("builds typed patches with PatchBuilder", () => {
    const move = PatchBuilder.move("db", 100, 200);
    expect(move.operation).toBe("move");
    expect(move.elementId).toBe("db");
    expect(move.position).toEqual({ x: 100, y: 200 });

    const update = PatchBuilder.update("db", { props: { label: "New DB" } });
    expect(update.operation).toBe("update");
    expect(update.changes.props?.label).toBe("New DB");
  });
});
