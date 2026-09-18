import type { ArtifactDefinition } from "@interactive-artifact/protocol";
import type { CapabilityDefinition } from "@interactive-artifact/registry";
import { SVGRenderer } from "@interactive-artifact/renderer-svg";

export const sampleFlowchartArtifact: ArtifactDefinition = {
  version: "1.0",
  id: "artifact_arch_001",
  type: "diagram.flowchart",
  metadata: {
    title: "3-Tier Web Architecture",
    description: "Cloud deployment architecture with frontend, API gateway, and database",
    author: "AI Assistant"
  },
  canvas: {
    width: 900,
    height: 500,
    theme: "neutral",
    grid: true
  },
  elements: [
    {
      id: "client",
      type: "node",
      position: { x: 80, y: 180 },
      size: { width: 160, height: 75 },
      props: {
        label: "React Client",
        subLabel: "SPA Frontend",
        shape: "rectangle",
        status: "active",
        badge: "v2.0"
      },
      style: {
        fill: "#eff6ff",
        stroke: "#3b82f6",
        strokeWidth: 2,
        radius: 12
      }
    },
    {
      id: "api",
      type: "node",
      position: { x: 370, y: 180 },
      size: { width: 170, height: 75 },
      props: {
        label: "Node.js API",
        subLabel: "REST / GraphQL",
        shape: "rectangle",
        status: "success",
        badge: "Fastify"
      },
      style: {
        fill: "#f0fdf4",
        stroke: "#22c55e",
        strokeWidth: 2,
        radius: 12
      }
    },
    {
      id: "database",
      type: "node",
      position: { x: 670, y: 120 },
      size: { width: 150, height: 85 },
      props: {
        label: "PostgreSQL",
        subLabel: "Primary Cluster",
        shape: "cylinder",
        status: "active"
      },
      style: {
        fill: "#fefce8",
        stroke: "#eab308",
        strokeWidth: 2
      }
    },
    {
      id: "cache",
      type: "node",
      position: { x: 670, y: 260 },
      size: { width: 150, height: 70 },
      props: {
        label: "Redis Cache",
        subLabel: "In-Memory Store",
        shape: "pill",
        status: "active"
      },
      style: {
        fill: "#fef2f2",
        stroke: "#ef4444",
        strokeWidth: 2
      }
    }
  ],
  connections: [
    {
      id: "c_client_api",
      from: "client",
      to: "api",
      type: "arrow",
      label: "HTTPS / WSS",
      style: {
        stroke: "#3b82f6",
        strokeWidth: 2
      }
    },
    {
      id: "c_api_db",
      from: "api",
      to: "database",
      type: "arrow",
      label: "SQL Query",
      style: {
        stroke: "#eab308",
        strokeWidth: 2
      }
    },
    {
      id: "c_api_cache",
      from: "api",
      to: "cache",
      type: "arrow",
      label: "Key / Val",
      style: {
        stroke: "#ef4444",
        strokeWidth: 2
      }
    }
  ],
  interactions: []
};

export const flowchartCapability: CapabilityDefinition = {
  id: "diagram.flowchart",
  name: "Interactive Flowchart & Architecture",
  version: "1.0",
  description: "Interactive node-based flowchart and architecture diagram with auto-routing connection arrows",
  tags: [
    "flowchart",
    "diagram",
    "architecture",
    "nodes",
    "graph",
    "workflow",
    "process",
    "network"
  ],
  primitives: ["node", "connector", "text", "rectangle", "ellipse"],
  interactions: ["drag", "connect", "zoom", "pan", "select", "delete"],
  renderer: new SVGRenderer(),
  sampleArtifact: sampleFlowchartArtifact
};

export const flowchart = flowchartCapability;
