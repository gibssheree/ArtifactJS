import { describe, it, expect } from "vitest";
import {
  getBoxIntersection,
  calculateConnectionGeometry,
  sketchLine,
  sketchRect,
  sketchEllipse
} from "../src/index.js";
import type { ArtifactElement, Connection } from "@interactive-artifact/protocol";

describe("SVG Renderer & Geometry Engine", () => {
  describe("Bounding Box Intersections", () => {
    it("calculates correct intersection for ray exiting right edge", () => {
      const rect = { x: 100, y: 100, width: 100, height: 60 };
      const target = { x: 300, y: 130 }; // Directly to the right of center (150, 130)

      const pt = getBoxIntersection(rect, target, 0);
      expect(pt.x).toBe(200); // right edge is x + width = 100 + 100
      expect(pt.y).toBe(130);
    });

    it("calculates correct intersection for ray exiting bottom edge", () => {
      const rect = { x: 100, y: 100, width: 100, height: 60 };
      const target = { x: 150, y: 300 }; // Directly below center (150, 130)

      const pt = getBoxIntersection(rect, target, 0);
      expect(pt.x).toBe(150);
      expect(pt.y).toBe(160); // bottom edge is y + height = 100 + 60
    });
  });

  describe("Dynamic Connection Path Routing", () => {
    const fromEl: ArtifactElement = {
      id: "node1",
      type: "node",
      position: { x: 100, y: 100 },
      size: { width: 120, height: 60 }
    };
    const toEl: ArtifactElement = {
      id: "node2",
      type: "node",
      position: { x: 400, y: 100 },
      size: { width: 120, height: 60 }
    };
    const connection: Connection = {
      id: "conn1",
      from: "node1",
      to: "node2",
      type: "arrow"
    };

    it("computes connection geometry and arrowhead polygon without requiring AI coordinate math", () => {
      const geom = calculateConnectionGeometry(connection, fromEl, toEl);

      expect(geom.path).toContain("M");
      expect(geom.path).toContain("L");
      expect(geom.startPoint.x).toBeGreaterThanOrEqual(220); // Right edge of node1
      expect(geom.endPoint.x).toBeLessThanOrEqual(400); // Left edge of node2
      expect(geom.arrowPoints.length).toBe(3); // Arrow polygon has 3 points
    });

    it("computes curved bezier path when connection type is curved", () => {
      const curvedConn: Connection = { ...connection, type: "curved" };
      const geom = calculateConnectionGeometry(curvedConn, fromEl, toEl);
      expect(geom.path).toContain("C");
    });

    it("computes orthogonal stepped path when connection type is orthogonal", () => {
      const orthoConn: Connection = { ...connection, type: "orthogonal" };
      const geom = calculateConnectionGeometry(orthoConn, fromEl, toEl);
      expect(geom.path).toContain("L");
    });
  });

  describe("Hand-Drawn Sketch Generators", () => {
    it("generates sketchy line path", () => {
      const path = sketchLine(10, 10, 100, 100, 1.2);
      expect(path).toContain("M");
      expect(path).toContain("Q");
    });

    it("generates sketchy rect with multi-side paths", () => {
      const path = sketchRect(10, 10, 80, 50, 1.2);
      expect(path.length).toBeGreaterThan(50);
      expect(path).toContain("M");
    });

    it("generates sketchy ellipse with smooth curves", () => {
      const path = sketchEllipse(50, 50, 30, 20, 1.2);
      expect(path).toContain("M");
      expect(path).toContain("Q");
    });
  });
});
