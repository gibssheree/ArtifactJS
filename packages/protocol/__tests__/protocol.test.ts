import { describe, it, expect } from "vitest";
import {
  validateArtifact,
  validatePatch,
  isArtifactDefinition,
  type ArtifactDefinition
} from "../src/index.js";

describe("Artifact Protocol & Validation", () => {
  const sampleValidArtifact: ArtifactDefinition = {
    version: "1.0",
    id: "art_test_1",
    type: "diagram.flowchart",
    metadata: {
      title: "Test Architecture"
    },
    canvas: {
      width: 800,
      height: 600,
      theme: "neutral"
    },
    elements: [
      {
        id: "el1",
        type: "node",
        position: { x: 100, y: 100 },
        size: { width: 120, height: 60 },
        props: { label: "Client" }
      },
      {
        id: "el2",
        type: "node",
        position: { x: 300, y: 100 },
        size: { width: 120, height: 60 },
        props: { label: "Server" }
      }
    ],
    connections: [
      {
        id: "c1",
        from: "el1",
        to: "el2",
        type: "arrow",
        label: "Request"
      }
    ],
    interactions: []
  };

  it("successfully validates a valid artifact", () => {
    const result = validateArtifact(sampleValidArtifact);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.id).toBe("art_test_1");
      expect(result.data.elements.length).toBe(2);
      expect(result.data.connections.length).toBe(1);
    }
  });

  it("identifies valid artifact via type guard", () => {
    expect(isArtifactDefinition(sampleValidArtifact)).toBe(true);
    expect(isArtifactDefinition({ invalid: "data" })).toBe(false);
  });

  it("fails validation when required fields are missing", () => {
    const invalid = {
      version: "1.0",
      // missing id and type
      elements: []
    };
    const result = validateArtifact(invalid);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.length).toBeGreaterThan(0);
    }
  });

  it("fails validation on unsupported protocol version", () => {
    const invalidVersion = {
      ...sampleValidArtifact,
      version: "99.0" // unsupported version
    };
    const result = validateArtifact(invalidVersion);
    expect(result.success).toBe(false);
  });

  it("validates incremental patches", () => {
    const movePatch = {
      operation: "move",
      elementId: "el1",
      position: { x: 250, y: 350 }
    };
    const res = validatePatch(movePatch);
    expect(res.success).toBe(true);

    const updatePatch = {
      operation: "update",
      elementId: "el1",
      changes: {
        props: { label: "Updated Label" }
      }
    };
    expect(validatePatch(updatePatch).success).toBe(true);

    const invalidPatch = {
      operation: "unknown_op",
      elementId: "el1"
    };
    expect(validatePatch(invalidPatch).success).toBe(false);
  });

  describe("Security Sanitization", () => {
    it("rejects malicious script tag injections", () => {
      const malicious = {
        ...sampleValidArtifact,
        elements: [
          {
            id: "bad1",
            type: "node",
            position: { x: 0, y: 0 },
            size: { width: 100, height: 50 },
            props: { label: "<script>alert('xss')</script>" }
          }
        ]
      };
      const res = validateArtifact(malicious);
      expect(res.success).toBe(false);
      if (!res.success) {
        expect(res.errors[0]?.code).toBe("security_violation");
      }
    });

    it("rejects javascript: URI protocol injections", () => {
      const malicious = {
        ...sampleValidArtifact,
        metadata: {
          title: "Architecture",
          url: "javascript:evilCall()"
        }
      };
      const res = validateArtifact(malicious);
      expect(res.success).toBe(false);
    });

    it("rejects patch with malicious script injection", () => {
      const maliciousPatch = {
        operation: "update",
        elementId: "el1",
        changes: {
          props: { label: "<script>eval('bad')</script>" }
        }
      };
      const res = validatePatch(maliciousPatch);
      expect(res.success).toBe(false);
    });
  });
});
