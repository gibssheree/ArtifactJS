import type { ArtifactDefinition } from "@interactive-artifact/protocol";
import type { CapabilityDefinition } from "@interactive-artifact/registry";
import { SVGRenderer } from "@interactive-artifact/renderer-svg";

export const sampleMindMapArtifact: ArtifactDefinition = {
  version: "1.0",
  id: "artifact_mindmap_product",
  type: "diagram.mindmap",
  metadata: {
    title: "AI Product Strategy 2026",
    description: "Hierarchical mind map branching from core vision into research, engineering, and GTM",
    author: "AI Assistant"
  },
  canvas: {
    width: 960,
    height: 540,
    theme: "neutral",
    grid: true
  },
  elements: [
    {
      id: "mm_root",
      type: "node",
      position: { x: 380, y: 220 },
      size: { width: 200, height: 100 },
      header: {
        icon: "zap",
        title: "AI Artifacts",
        subtitle: "Core Platform",
        badge: "Vision",
        status: "active"
      },
      ports: [
        { id: "p_root_left", nodeId: "mm_root", direction: "output", position: "left" },
        { id: "p_root_right", nodeId: "mm_root", direction: "output", position: "right" },
        { id: "p_root_top", nodeId: "mm_root", direction: "output", position: "top" }
      ],
      style: { fill: "#eff6ff", stroke: "#2563eb", strokeWidth: 3, radius: 16 }
    },
    {
      id: "mm_branch_runtime",
      type: "node",
      position: { x: 80, y: 120 },
      size: { width: 190, height: 110 },
      header: {
        icon: "gear",
        title: "Micro-Runtime",
        subtitle: "Zero Sandboxed Eval",
        badge: "Core"
      },
      body: {
        description: "Provider-agnostic execution engine"
      },
      ports: [
        { id: "p_runtime_in", nodeId: "mm_branch_runtime", direction: "input", position: "right" }
      ],
      style: { fill: "#ffffff", stroke: "#3b82f6", strokeWidth: 2, radius: 12 }
    },
    {
      id: "mm_branch_protocol",
      type: "node",
      position: { x: 80, y: 310 },
      size: { width: 190, height: 110 },
      header: {
        icon: "cloud",
        title: "Artifact Protocol",
        subtitle: "Zod Schema Spec",
        badge: "RFC"
      },
      body: {
        description: "Structured JSON schema definition"
      },
      ports: [
        { id: "p_proto_in", nodeId: "mm_branch_protocol", direction: "input", position: "right" }
      ],
      style: { fill: "#ffffff", stroke: "#6366f1", strokeWidth: 2, radius: 12 }
    },
    {
      id: "mm_branch_capabilities",
      type: "node",
      position: { x: 690, y: 120 },
      size: { width: 200, height: 110 },
      header: {
        icon: "server",
        title: "10,000+ Capabilities",
        subtitle: "Extensible Registry",
        badge: "Ecosystem"
      },
      body: {
        description: "Pluggable domain visualizers"
      },
      ports: [
        { id: "p_cap_in", nodeId: "mm_branch_capabilities", direction: "input", position: "left" }
      ],
      style: { fill: "#ffffff", stroke: "#10b981", strokeWidth: 2, radius: 12 }
    },
    {
      id: "mm_branch_gtm",
      type: "node",
      position: { x: 690, y: 310 },
      size: { width: 200, height: 110 },
      header: {
        icon: "user",
        title: "Open Source GTM",
        subtitle: "Community Adoption",
        badge: "Growth"
      },
      body: {
        description: "npm packages & AI chatbot demos"
      },
      ports: [
        { id: "p_gtm_in", nodeId: "mm_branch_gtm", direction: "input", position: "left" }
      ],
      style: { fill: "#ffffff", stroke: "#f59e0b", strokeWidth: 2, radius: 12 }
    }
  ],
  connections: [
    {
      id: "c_root_runtime",
      from: { nodeId: "mm_root", portId: "p_root_left" },
      to: { nodeId: "mm_branch_runtime", portId: "p_runtime_in" },
      type: "curved"
    },
    {
      id: "c_root_proto",
      from: { nodeId: "mm_root", portId: "p_root_left" },
      to: { nodeId: "mm_branch_protocol", portId: "p_proto_in" },
      type: "curved"
    },
    {
      id: "c_root_cap",
      from: { nodeId: "mm_root", portId: "p_root_right" },
      to: { nodeId: "mm_branch_capabilities", portId: "p_cap_in" },
      type: "curved"
    },
    {
      id: "c_root_gtm",
      from: { nodeId: "mm_root", portId: "p_root_right" },
      to: { nodeId: "mm_branch_gtm", portId: "p_gtm_in" },
      type: "curved"
    }
  ],
  interactions: []
};

export const mindMapCapability: CapabilityDefinition = {
  id: "diagram.mindmap",
  name: "Mind Map",
  version: "1.0",
  description: "Radial and hierarchical mind map for brainstorming, concept decomposition, and strategy maps",
  tags: ["mindmap", "brainstorm", "concept", "hierarchy", "ideas", "strategy"],
  primitives: ["node", "port", "edge", "text"],
  interactions: ["drag", "connect", "zoom", "pan", "select"],
  renderer: new SVGRenderer(),
  sampleArtifact: sampleMindMapArtifact
};
