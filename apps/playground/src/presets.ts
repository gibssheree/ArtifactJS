import type { ArtifactDefinition } from "@interactive-artifact/protocol";
import { sampleFlowchartArtifact } from "@interactive-artifact/flowchart";
import { sampleExcalidrawArtifact } from "@interactive-artifact/excalidraw";
import {
  sampleBarChartArtifact,
  sampleLineChartArtifact,
  samplePieChartArtifact,
  sampleScatterArtifact
} from "@interactive-artifact/charts";

export interface PresetItem {
  id: string;
  name: string;
  category: string;
  artifact: ArtifactDefinition;
}

export const PRESETS: PresetItem[] = [
  {
    id: "flowchart_architecture",
    name: "3-Tier Architecture (Flowchart)",
    category: "Diagrams",
    artifact: sampleFlowchartArtifact
  },
  {
    id: "excalidraw_whiteboard",
    name: "Brainstorm Canvas (Excalidraw-Style)",
    category: "Sketch",
    artifact: sampleExcalidrawArtifact
  },
  {
    id: "chart_bar_users",
    name: "Monthly Active Users (Bar Chart)",
    category: "Charts",
    artifact: sampleBarChartArtifact
  },
  {
    id: "chart_line_latency",
    name: "API Latency Trend (Line Chart)",
    category: "Charts",
    artifact: sampleLineChartArtifact
  },
  {
    id: "chart_pie_cost",
    name: "Infrastructure Costs (Pie Chart)",
    category: "Charts",
    artifact: samplePieChartArtifact
  },
  {
    id: "chart_scatter_metrics",
    name: "Memory vs CPU (Scatter Plot)",
    category: "Charts",
    artifact: sampleScatterArtifact
  }
];
