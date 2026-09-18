import type { ArtifactDefinition } from "@interactive-artifact/protocol";
import type { CapabilityDefinition } from "@interactive-artifact/registry";
import { SVGRenderer } from "@interactive-artifact/renderer-svg";

export const sampleDashboardArtifact: ArtifactDefinition = {
  version: "1.0",
  id: "artifact_dash_kpi",
  type: "data.dashboard",
  metadata: {
    title: "SaaS Executive KPI Dashboard",
    description: "Real-time key performance indicators, revenue metrics, and system status widgets",
    author: "AI Assistant"
  },
  canvas: {
    width: 980,
    height: 520,
    theme: "neutral",
    grid: false
  },
  elements: [
    // Card 1: Monthly Recurring Revenue
    {
      id: "card_mrr",
      type: "node",
      position: { x: 50, y: 50 },
      size: { width: 270, height: 180 },
      header: {
        icon: "zap",
        title: "MRR",
        subtitle: "Monthly Recurring Revenue",
        badge: "Finance",
        status: "success"
      },
      body: {
        sections: [
          { id: "comp_mrr_val", type: "metric", props: { label: "Current Run-Rate", value: "$418,200", delta: "+18.4%" } },
          { id: "comp_mrr_prog", type: "progress", props: { value: 84, max: 100 } }
        ]
      },
      footer: {
        content: "Target: $500k by Q3",
        actions: [{ id: "act_mrr_details", type: "button", props: { label: "View P&L" } }]
      },
      style: { fill: "#ffffff", stroke: "#10b981", strokeWidth: 2, radius: 12 }
    },
    // Card 2: Active Subscribers
    {
      id: "card_users",
      type: "node",
      position: { x: 350, y: 50 },
      size: { width: 270, height: 180 },
      header: {
        icon: "user",
        title: "Active Users",
        subtitle: "Paid Team Workspaces",
        badge: "Growth",
        status: "active"
      },
      body: {
        sections: [
          { id: "comp_usr_val", type: "metric", props: { label: "Paid Seats", value: "24,850", delta: "+1,240 this wk" } },
          { id: "comp_usr_churn", type: "key-value", props: { keyName: "Gross Churn", value: "1.2% (Industry Top)" } }
        ]
      },
      footer: {
        content: "NPS: +68 Promoter Score"
      },
      style: { fill: "#ffffff", stroke: "#3b82f6", strokeWidth: 2, radius: 12 }
    },
    // Card 3: System Availability
    {
      id: "card_sla",
      type: "node",
      position: { x: 650, y: 50 },
      size: { width: 270, height: 180 },
      header: {
        icon: "server",
        title: "System Availability",
        subtitle: "Multi-Cloud SRE Status",
        badge: "99.99%",
        status: "success"
      },
      body: {
        sections: [
          { id: "comp_sla_val", type: "metric", props: { label: "Uptime 30d", value: "99.994%", delta: "+0.002%" } },
          { id: "comp_sla_incidents", type: "key-value", props: { keyName: "Open Incidents", value: "0 Sev-1" } }
        ]
      },
      footer: {
        content: "All 12 regions green"
      },
      style: { fill: "#ffffff", stroke: "#8b5cf6", strokeWidth: 2, radius: 12 }
    },
    // Bottom Summary Banner
    {
      id: "card_alert_banner",
      type: "node",
      position: { x: 50, y: 260 },
      size: { width: 870, height: 160 },
      header: {
        icon: "cloud",
        title: "Infrastructure Scaling Event: Auto-Scaled +4 Node Groups",
        subtitle: "Automated Kubernetes HPA Trigger",
        badge: "Automated",
        status: "active"
      },
      body: {
        description: "Traffic surge detected from Product Hunt launch (+340% RPS). Horizontal Pod Autoscaler smoothly provisioned 24 additional pods across AWS us-east-1 and eu-central-1.",
        sections: [
          { id: "sec_ban_kv1", type: "key-value", props: { keyName: "Average P95 Latency", value: "18 ms" } },
          { id: "sec_ban_kv2", type: "key-value", props: { keyName: "Error Rate", value: "0.001%" } }
        ]
      },
      footer: {
        content: "Resolved automatically by autonomous scheduler",
        actions: [{ id: "act_ban_ack", type: "button", props: { label: "Acknowledge" } }]
      },
      style: { fill: "#f8fafc", stroke: "#0284c7", strokeWidth: 2, radius: 12 }
    }
  ],
  connections: [],
  interactions: []
};

export const dashboardCapability: CapabilityDefinition = {
  id: "data.dashboard",
  name: "KPI Dashboard",
  version: "1.0",
  description: "Executive KPI cards, status feeds, and operational metric dashboard",
  tags: ["dashboard", "kpi", "metrics", "analytics", "saas", "cards"],
  primitives: ["node", "metric", "progress", "key-value", "button", "badge", "status-indicator"],
  interactions: ["select", "hover", "drag"],
  renderer: new SVGRenderer(),
  sampleArtifact: sampleDashboardArtifact
};
