import type { ArtifactDefinition } from "@interactive-artifact/protocol";
import type { CapabilityDefinition } from "@interactive-artifact/registry";
import { SVGRenderer } from "@interactive-artifact/renderer-svg";

export const sampleSequenceArtifact: ArtifactDefinition = {
  version: "1.0",
  id: "artifact_sequence_auth",
  type: "diagram.sequence",
  metadata: {
    title: "OAuth 2.0 Authorization Code Flow",
    description: "Sequence interaction between User, Browser, Client App, and Auth0 Identity Server",
    author: "AI Assistant"
  },
  canvas: {
    width: 960,
    height: 560,
    theme: "neutral",
    grid: true
  },
  elements: [
    // Participant 1: User Agent
    {
      id: "seq_p_browser",
      type: "node",
      position: { x: 80, y: 50 },
      size: { width: 160, height: 70 },
      header: { icon: "user", title: "User Browser", subtitle: "Client Agent", badge: "Actor" },
      ports: [
        { id: "p_browser_msg1", nodeId: "seq_p_browser", direction: "output", position: "bottom" },
        { id: "p_browser_in", nodeId: "seq_p_browser", direction: "input", position: "right" }
      ],
      style: { fill: "#f8fafc", stroke: "#64748b", strokeWidth: 2, radius: 8 }
    },
    // Participant 2: Backend App
    {
      id: "seq_p_app",
      type: "node",
      position: { x: 390, y: 50 },
      size: { width: 180, height: 70 },
      header: { icon: "server", title: "Backend API", subtitle: "Confidential Client", badge: "Service" },
      ports: [
        { id: "p_app_in1", nodeId: "seq_p_app", direction: "input", position: "left" },
        { id: "p_app_out_auth", nodeId: "seq_p_app", direction: "output", position: "right" }
      ],
      style: { fill: "#eff6ff", stroke: "#3b82f6", strokeWidth: 2, radius: 8 }
    },
    // Participant 3: Auth Provider
    {
      id: "seq_p_auth",
      type: "node",
      position: { x: 700, y: 50 },
      size: { width: 180, height: 70 },
      header: { icon: "zap", title: "IdP Server", subtitle: "OAuth Provider", badge: "Auth0" },
      ports: [
        { id: "p_auth_in1", nodeId: "seq_p_auth", direction: "input", position: "left" },
        { id: "p_auth_out_token", nodeId: "seq_p_auth", direction: "output", position: "bottom" }
      ],
      style: { fill: "#fefce8", stroke: "#eab308", strokeWidth: 2, radius: 8 }
    },
    // Lifeline lifelines
    {
      id: "line_browser",
      type: "node",
      position: { x: 150, y: 150 },
      size: { width: 20, height: 350 },
      style: { fill: "#e2e8f0", stroke: "#94a3b8", strokeWidth: 1, radius: 4 },
      ports: [
        { id: "p_l1_out", nodeId: "line_browser", direction: "output", position: "right" },
        { id: "p_l1_in", nodeId: "line_browser", direction: "input", position: "right" }
      ]
    },
    {
      id: "line_app",
      type: "node",
      position: { x: 470, y: 150 },
      size: { width: 20, height: 350 },
      style: { fill: "#dbeafe", stroke: "#3b82f6", strokeWidth: 1, radius: 4 },
      ports: [
        { id: "p_l2_in", nodeId: "line_app", direction: "input", position: "left" },
        { id: "p_l2_out", nodeId: "line_app", direction: "output", position: "right" }
      ]
    },
    {
      id: "line_auth",
      type: "node",
      position: { x: 780, y: 150 },
      size: { width: 20, height: 350 },
      style: { fill: "#fef9c3", stroke: "#eab308", strokeWidth: 1, radius: 4 },
      ports: [
        { id: "p_l3_in", nodeId: "line_auth", direction: "input", position: "left" },
        { id: "p_l3_out", nodeId: "line_auth", direction: "output", position: "left" }
      ]
    }
  ],
  connections: [
    {
      id: "c_msg1",
      from: { nodeId: "line_browser", portId: "p_l1_out" },
      to: { nodeId: "line_app", portId: "p_l2_in" },
      type: "orthogonal",
      label: "1. GET /login"
    },
    {
      id: "c_msg2",
      from: { nodeId: "line_app", portId: "p_l2_out" },
      to: { nodeId: "line_auth", portId: "p_l3_in" },
      type: "orthogonal",
      label: "2. Redirect: authorize?code"
    },
    {
      id: "c_msg3",
      from: { nodeId: "line_auth", portId: "p_l3_out" },
      to: { nodeId: "line_app", portId: "p_l2_in" },
      type: "orthogonal",
      label: "3. Exchange Code for JWT"
    }
  ],
  interactions: []
};

export const sequenceCapability: CapabilityDefinition = {
  id: "diagram.sequence",
  name: "Sequence Diagram",
  version: "1.0",
  description: "UML sequence diagram illustrating temporal call interactions, lifelines, and protocols",
  tags: ["sequence", "uml", "interaction", "protocol", "oauth", "api"],
  primitives: ["node", "port", "edge", "text"],
  interactions: ["drag", "connect", "zoom", "pan", "select"],
  renderer: new SVGRenderer(),
  sampleArtifact: sampleSequenceArtifact
};
