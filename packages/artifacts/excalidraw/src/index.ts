import type { ArtifactDefinition } from "@interactive-artifact/protocol";
import type { CapabilityDefinition } from "@interactive-artifact/registry";
import { SVGRenderer } from "@interactive-artifact/renderer-svg";

export const sampleExcalidrawArtifact: ArtifactDefinition = {
  version: "1.0",
  id: "artifact_sketch_001",
  type: "canvas.excalidraw",
  metadata: {
    title: "Sketch Brainstorm Canvas",
    description: "Hand-drawn interactive whiteboard brainstorming diagram",
    author: "AI Assistant"
  },
  canvas: {
    width: 900,
    height: 550,
    theme: "neutral",
    grid: false
  },
  elements: [
    {
      id: "box1",
      type: "rectangle",
      position: { x: 100, y: 120 },
      size: { width: 180, height: 100 },
      props: {
        label: "💡 Idea Backlog"
      },
      style: {
        fill: "#fef3c7",
        stroke: "#d97706",
        strokeWidth: 2,
        roughness: 1.8,
        fontFamily: "Comic Sans MS, cursive, sans-serif"
      }
    },
    {
      id: "box2",
      type: "rectangle",
      position: { x: 420, y: 120 },
      size: { width: 190, height: 100 },
      props: {
        label: "⚡ Prototype Phase"
      },
      style: {
        fill: "#ede9fe",
        stroke: "#7c3aed",
        strokeWidth: 2,
        roughness: 1.5,
        fontFamily: "Comic Sans MS, cursive, sans-serif"
      }
    },
    {
      id: "circle1",
      type: "ellipse",
      position: { x: 440, y: 320 },
      size: { width: 150, height: 120 },
      props: {
        label: "🚀 Launch!"
      },
      style: {
        fill: "#dcfce7",
        stroke: "#16a34a",
        strokeWidth: 2.2,
        roughness: 2.0,
        fontFamily: "Comic Sans MS, cursive, sans-serif"
      }
    },
    {
      id: "note1",
      type: "text",
      position: { x: 100, y: 50 },
      size: { width: 350, height: 40 },
      props: {
        text: "Sprint Planning Whiteboard (Hand-Drawn)"
      },
      style: {
        color: "#1e293b",
        fontSize: 20,
        fontWeight: "700",
        fontFamily: "Comic Sans MS, cursive, sans-serif"
      }
    }
  ],
  connections: [
    {
      id: "conn_idea_proto",
      from: "box1",
      to: "box2",
      type: "arrow",
      label: "Validate",
      style: {
        stroke: "#7c3aed",
        strokeWidth: 2
      }
    },
    {
      id: "conn_proto_launch",
      from: "box2",
      to: "circle1",
      type: "arrow",
      label: "Ship MVP",
      style: {
        stroke: "#16a34a",
        strokeWidth: 2
      }
    }
  ],
  interactions: []
};

export const excalidrawCapability: CapabilityDefinition = {
  id: "canvas.excalidraw",
  name: "Excalidraw-Style Hand-Drawn Canvas",
  version: "1.0",
  description: "Hand-drawn sketch whiteboard capability supporting rectangles, ellipses, arrows, and freehand drawing",
  tags: [
    "excalidraw",
    "sketch",
    "whiteboard",
    "hand-drawn",
    "canvas",
    "wireframe",
    "brainstorm"
  ],
  primitives: [
    "rectangle",
    "ellipse",
    "line",
    "arrow",
    "text",
    "freehand"
  ],
  interactions: [
    "drag",
    "resize",
    "delete",
    "zoom",
    "pan",
    "select"
  ],
  renderer: new SVGRenderer(),
  sampleArtifact: sampleExcalidrawArtifact
};

export const excalidraw = excalidrawCapability;
