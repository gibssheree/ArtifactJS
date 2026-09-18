import type { ArtifactDefinition } from "@interactive-artifact/protocol";
import { sampleFlowchartArtifact } from "@interactive-artifact/flowchart";
import { sampleExcalidrawArtifact } from "@interactive-artifact/excalidraw";
import {
  sampleBarChartArtifact,
  sampleLineChartArtifact,
  sampleAreaChartArtifact,
  samplePieChartArtifact,
  sampleDonutChartArtifact,
  sampleGaugeArtifact,
  sampleScatterArtifact
} from "@interactive-artifact/charts";
import {
  sampleNodeGraphArtifact,
  sampleArchitectureArtifact,
  sampleERDArtifact,
  sampleMindMapArtifact,
  sampleSequenceArtifact,
  sampleTimelineArtifact,
  sampleOrgHierarchyArtifact,
  sampleWorkflowArtifact,
  sampleDashboardArtifact,
  sampleTableArtifact,
  sampleFormArtifact
} from "@interactive-artifact/catalog";

export interface PresetItem {
  id: string;
  name: string;
  category: string;
  artifact: ArtifactDefinition;
}

export const PRESETS: PresetItem[] = [
  // Reference Diagrams
  {
    id: "flowchart_architecture",
    name: "Composite Reference (Flowchart)",
    category: "Composite",
    artifact: sampleFlowchartArtifact
  },
  {
    id: "nodegraph_pipeline",
    name: "AI Audio Pipeline (Node Graph)",
    category: "Composite",
    artifact: sampleNodeGraphArtifact
  },
  {
    id: "cloud_architecture",
    name: "Cloud Microservices (Architecture)",
    category: "Diagrams",
    artifact: sampleArchitectureArtifact
  },
  {
    id: "erd_ecommerce",
    name: "Database Schema (ERD)",
    category: "Diagrams",
    artifact: sampleERDArtifact
  },
  {
    id: "mindmap_product",
    name: "Product Strategy (Mind Map)",
    category: "Diagrams",
    artifact: sampleMindMapArtifact
  },
  {
    id: "sequence_oauth",
    name: "OAuth 2.0 Auth Flow (Sequence)",
    category: "Diagrams",
    artifact: sampleSequenceArtifact
  },
  {
    id: "timeline_roadmap",
    name: "Engineering Roadmap (Timeline)",
    category: "Diagrams",
    artifact: sampleTimelineArtifact
  },
  {
    id: "org_leadership",
    name: "Leadership Structure (Org Chart)",
    category: "Diagrams",
    artifact: sampleOrgHierarchyArtifact
  },
  {
    id: "workflow_approval",
    name: "Expense Approval (Workflow)",
    category: "Diagrams",
    artifact: sampleWorkflowArtifact
  },
  // Data & Mini-Apps
  {
    id: "kpi_dashboard",
    name: "Executive SaaS (KPI Dashboard)",
    category: "Data & UI",
    artifact: sampleDashboardArtifact
  },
  {
    id: "data_table_ledger",
    name: "Transaction Ledger (Table)",
    category: "Data & UI",
    artifact: sampleTableArtifact
  },
  {
    id: "form_settings",
    name: "Model Parameters (Form Card)",
    category: "Data & UI",
    artifact: sampleFormArtifact
  },
  {
    id: "excalidraw_whiteboard",
    name: "Brainstorm Canvas (Excalidraw)",
    category: "Sketch",
    artifact: sampleExcalidrawArtifact
  },
  // Charts
  {
    id: "chart_bar_users",
    name: "Monthly Active Users (Bar)",
    category: "Charts",
    artifact: sampleBarChartArtifact
  },
  {
    id: "chart_line_latency",
    name: "API Latency Trend (Line)",
    category: "Charts",
    artifact: sampleLineChartArtifact
  },
  {
    id: "chart_area_network",
    name: "Network Throughput (Area)",
    category: "Charts",
    artifact: sampleAreaChartArtifact
  },
  {
    id: "chart_pie_cost",
    name: "Infrastructure Costs (Pie)",
    category: "Charts",
    artifact: samplePieChartArtifact
  },
  {
    id: "chart_donut_storage",
    name: "Storage Tier Allocation (Donut)",
    category: "Charts",
    artifact: sampleDonutChartArtifact
  },
  {
    id: "chart_gauge_health",
    name: "Cluster Health (Gauge)",
    category: "Charts",
    artifact: sampleGaugeArtifact
  },
  {
    id: "chart_scatter_metrics",
    name: "Memory vs CPU (Scatter)",
    category: "Charts",
    artifact: sampleScatterArtifact
  }
];
