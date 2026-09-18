import type { ArtifactDefinition } from "@interactive-artifact/protocol";
import type { CapabilityDefinition } from "@interactive-artifact/registry";
import { SVGRenderer } from "@interactive-artifact/renderer-svg";

export const sampleTimelineArtifact: ArtifactDefinition = {
  version: "1.0",
  id: "artifact_timeline_q1",
  type: "diagram.timeline",
  metadata: {
    title: "Engineering Roadmap Q1 - Q4",
    description: "Chronological milestone pipeline across protocol standardization, runtime, and ecosystem",
    author: "AI Assistant"
  },
  canvas: {
    width: 980,
    height: 520,
    theme: "neutral",
    grid: true
  },
  elements: [
    {
      id: "tl_m1",
      type: "node",
      position: { x: 50, y: 160 },
      size: { width: 200, height: 160 },
      header: {
        icon: "check",
        title: "Q1: MVP Protocol",
        subtitle: "Foundation",
        badge: "Done",
        status: "success"
      },
      body: {
        description: "Standardize JSON schema and primitive models",
        sections: [
          { id: "sec_t1_prog", type: "progress", props: { value: 100, max: 100 } },
          { id: "sec_t1_tests", type: "key-value", props: { keyName: "Tests", value: "40 Passing" } }
        ]
      },
      ports: [
        { id: "p_t1_out", nodeId: "tl_m1", direction: "output", position: "right" }
      ],
      style: { fill: "#ffffff", stroke: "#10b981", strokeWidth: 2, radius: 10 }
    },
    {
      id: "tl_m2",
      type: "node",
      position: { x: 280, y: 160 },
      size: { width: 200, height: 160 },
      header: {
        icon: "gear",
        title: "Q2: Component Model",
        subtitle: "Composability",
        badge: "Active",
        status: "active"
      },
      body: {
        description: "First-class ports, structured nodes & deep tree indexing",
        sections: [
          { id: "sec_t2_prog", type: "progress", props: { value: 80, max: 100 } },
          { id: "sec_t2_nodes", type: "key-value", props: { keyName: "Ports", value: "Multi-socket" } }
        ]
      },
      ports: [
        { id: "p_t2_in", nodeId: "tl_m2", direction: "input", position: "left" },
        { id: "p_t2_out", nodeId: "tl_m2", direction: "output", position: "right" }
      ],
      style: { fill: "#ffffff", stroke: "#3b82f6", strokeWidth: 2, radius: 10 }
    },
    {
      id: "tl_m3",
      type: "node",
      position: { x: 510, y: 160 },
      size: { width: 200, height: 160 },
      header: {
        icon: "server",
        title: "Q3: 10k Capabilities",
        subtitle: "Scale Ecosystem",
        badge: "Planned"
      },
      body: {
        description: "Community capability catalog and AI generators",
        sections: [
          { id: "sec_t3_prog", type: "progress", props: { value: 25, max: 100 } },
          { id: "sec_t3_target", type: "key-value", props: { keyName: "Target", value: "10,000+" } }
        ]
      },
      ports: [
        { id: "p_t3_in", nodeId: "tl_m3", direction: "input", position: "left" },
        { id: "p_t3_out", nodeId: "tl_m3", direction: "output", position: "right" }
      ],
      style: { fill: "#ffffff", stroke: "#8b5cf6", strokeWidth: 2, radius: 10 }
    },
    {
      id: "tl_m4",
      type: "node",
      position: { x: 740, y: 160 },
      size: { width: 200, height: 160 },
      header: {
        icon: "cloud",
        title: "Q4: Web3 & 3D WebGPU",
        subtitle: "Next Frontiers",
        badge: "Future"
      },
      body: {
        description: "WebGPU shaders, canvas3d simulations, and spatial UI",
        sections: [
          { id: "sec_t4_prog", type: "progress", props: { value: 5, max: 100 } },
          { id: "sec_t4_fps", type: "key-value", props: { keyName: "Framerate", value: "120 FPS" } }
        ]
      },
      ports: [
        { id: "p_t4_in", nodeId: "tl_m4", direction: "input", position: "left" }
      ],
      style: { fill: "#ffffff", stroke: "#64748b", strokeWidth: 2, radius: 10 }
    }
  ],
  connections: [
    {
      id: "c_t1_t2",
      from: { nodeId: "tl_m1", portId: "p_t1_out" },
      to: { nodeId: "tl_m2", portId: "p_t2_in" },
      type: "straight",
      style: { stroke: "#10b981", strokeWidth: 3 }
    },
    {
      id: "c_t2_t3",
      from: { nodeId: "tl_m2", portId: "p_t2_out" },
      to: { nodeId: "tl_m3", portId: "p_t3_in" },
      type: "straight",
      style: { stroke: "#3b82f6", strokeWidth: 3 }
    },
    {
      id: "c_t3_t4",
      from: { nodeId: "tl_m3", portId: "p_t3_out" },
      to: { nodeId: "tl_m4", portId: "p_t4_in" },
      type: "straight",
      style: { stroke: "#8b5cf6", strokeWidth: 3 }
    }
  ],
  interactions: []
};

export const timelineCapability: CapabilityDefinition = {
  id: "diagram.timeline",
  name: "Milestone Timeline",
  version: "1.0",
  description: "Roadmap and release timeline with progress meters, milestone cards, and connected phases",
  tags: ["timeline", "roadmap", "milestones", "gantt", "schedule", "progress"],
  primitives: ["node", "port", "edge", "progress", "key-value"],
  interactions: ["drag", "connect", "zoom", "pan", "select"],
  renderer: new SVGRenderer(),
  sampleArtifact: sampleTimelineArtifact
};
