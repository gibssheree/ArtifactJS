import type { ArtifactDefinition } from "@interactive-artifact/protocol";
import type { CapabilityDefinition } from "@interactive-artifact/registry";
import { SVGRenderer } from "@interactive-artifact/renderer-svg";

export const sampleOrgHierarchyArtifact: ArtifactDefinition = {
  version: "1.0",
  id: "artifact_org_exec",
  type: "diagram.orghierarchy",
  metadata: {
    title: "Engineering Leadership Organization Chart",
    description: "Hierarchical reporting tree mapping executive leadership to engineering leads",
    author: "AI Assistant"
  },
  canvas: {
    width: 960,
    height: 520,
    theme: "neutral",
    grid: true
  },
  elements: [
    {
      id: "org_cto",
      type: "node",
      position: { x: 380, y: 50 },
      size: { width: 220, height: 130 },
      header: {
        icon: "user",
        title: "Elena Rostova",
        subtitle: "Chief Technology Officer",
        badge: "Executive",
        status: "active"
      },
      body: {
        sections: [
          { id: "sec_cto_team", type: "key-value", props: { keyName: "Org Size", value: "85 Engineers" } }
        ]
      },
      ports: [
        { id: "p_cto_out_infra", nodeId: "org_cto", direction: "output", position: "bottom" },
        { id: "p_cto_out_prod", nodeId: "org_cto", direction: "output", position: "bottom" }
      ],
      style: { fill: "#ffffff", stroke: "#2563eb", strokeWidth: 2, radius: 12 }
    },
    {
      id: "org_vp_infra",
      type: "node",
      position: { x: 140, y: 250 },
      size: { width: 220, height: 140 },
      header: {
        icon: "server",
        title: "Marcus Vance",
        subtitle: "VP Infrastructure",
        badge: "Platform"
      },
      body: {
        sections: [
          { id: "sec_infra_teams", type: "key-value", props: { keyName: "Focus", value: "K8s, SRE & Cloud" } },
          { id: "sec_infra_headcount", type: "key-value", props: { keyName: "Team", value: "32 Reports" } }
        ]
      },
      ports: [
        { id: "p_infra_in", nodeId: "org_vp_infra", direction: "input", position: "top" }
      ],
      style: { fill: "#ffffff", stroke: "#0ea5e9", strokeWidth: 2, radius: 10 }
    },
    {
      id: "org_vp_prod",
      type: "node",
      position: { x: 600, y: 250 },
      size: { width: 220, height: 140 },
      header: {
        icon: "zap",
        title: "Sarah Chen",
        subtitle: "VP Product Engineering",
        badge: "Apps"
      },
      body: {
        sections: [
          { id: "sec_prod_teams", type: "key-value", props: { keyName: "Focus", value: "Web, Mobile & AI" } },
          { id: "sec_prod_headcount", type: "key-value", props: { keyName: "Team", value: "53 Reports" } }
        ]
      },
      ports: [
        { id: "p_prod_in", nodeId: "org_vp_prod", direction: "input", position: "top" }
      ],
      style: { fill: "#ffffff", stroke: "#10b981", strokeWidth: 2, radius: 10 }
    }
  ],
  connections: [
    {
      id: "c_cto_infra",
      from: { nodeId: "org_cto", portId: "p_cto_out_infra" },
      to: { nodeId: "org_vp_infra", portId: "p_infra_in" },
      type: "orthogonal"
    },
    {
      id: "c_cto_prod",
      from: { nodeId: "org_cto", portId: "p_cto_out_prod" },
      to: { nodeId: "org_vp_prod", portId: "p_prod_in" },
      type: "orthogonal"
    }
  ],
  interactions: []
};

export const orgHierarchyCapability: CapabilityDefinition = {
  id: "diagram.orghierarchy",
  name: "Organization Hierarchy",
  version: "1.0",
  description: "Company organization chart and management hierarchy tree",
  tags: ["orghierarchy", "orgchart", "team", "management", "company", "leadership"],
  primitives: ["node", "port", "edge", "key-value", "badge"],
  interactions: ["drag", "connect", "zoom", "pan", "select"],
  renderer: new SVGRenderer(),
  sampleArtifact: sampleOrgHierarchyArtifact
};
