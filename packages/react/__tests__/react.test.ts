import { describe, it, expect } from "vitest";
import {
  ArtifactProvider,
  ArtifactRenderer,
  useArtifactState,
  useArtifactEvent,
  useArtifactSelection
} from "../src/index.js";

describe("React Adapter Exports", () => {
  it("exports provider, renderer, and reactive hooks", () => {
    expect(ArtifactProvider).toBeDefined();
    expect(ArtifactRenderer).toBeDefined();
    expect(useArtifactState).toBeDefined();
    expect(useArtifactEvent).toBeDefined();
    expect(useArtifactSelection).toBeDefined();
  });
});
