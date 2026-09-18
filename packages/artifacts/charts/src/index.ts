import type { ArtifactDefinition, ArtifactElement } from "@interactive-artifact/protocol";
import type { CapabilityDefinition } from "@interactive-artifact/registry";
import { SVGRenderer } from "@interactive-artifact/renderer-svg";

export interface ChartDataPoint {
  category?: string;
  value?: number;
  x?: number;
  y?: number;
  label?: string;
  color?: string;
}

export interface ChartOptions {
  id?: string;
  title: string;
  chartType: "bar" | "line" | "pie" | "scatter";
  data: ChartDataPoint[];
  width?: number;
  height?: number;
  theme?: "light" | "dark" | "neutral";
  xLabel?: string;
  yLabel?: string;
}

const DEFAULT_PALETTE = [
  "#3b82f6", // blue
  "#10b981", // green
  "#f59e0b", // amber
  "#ef4444", // red
  "#8b5cf6", // violet
  "#ec4899", // pink
  "#06b6d4", // cyan
  "#84cc16"  // lime
];

/**
 * Normalizes a chart definition into standard Artifact Protocol elements
 */
export function createChartArtifact(options: ChartOptions): ArtifactDefinition {
  const {
    id = `chart_${Date.now()}`,
    title,
    chartType,
    data,
    width = 800,
    height = 500,
    theme = "neutral"
  } = options;

  const elements: ArtifactElement[] = [];

  // Title text element
  elements.push({
    id: `${id}_title`,
    type: "text",
    position: { x: 50, y: 30 },
    size: { width: 400, height: 35 },
    props: { text: title },
    style: {
      fontSize: 18,
      fontWeight: "700"
    }
  });

  const chartArea = {
    x: 80,
    y: 90,
    width: width - 150,
    height: height - 160
  };

  if (chartType === "bar") {
    // Axes
    elements.push({
      id: `${id}_axis_x`,
      type: "line",
      position: { x: chartArea.x, y: chartArea.y + chartArea.height },
      size: { width: chartArea.width, height: 0 },
      style: { stroke: "#94a3b8", strokeWidth: 2 }
    });
    elements.push({
      id: `${id}_axis_y`,
      type: "line",
      position: { x: chartArea.x, y: chartArea.y },
      size: { width: 0, height: chartArea.height },
      style: { stroke: "#94a3b8", strokeWidth: 2 }
    });

    const maxVal = Math.max(...data.map(d => d.value ?? 0), 10);
    const count = data.length;
    const barSpacing = chartArea.width / count;
    const barWidth = Math.min(60, barSpacing * 0.65);

    data.forEach((point, idx) => {
      const val = point.value ?? 0;
      const barHeight = Math.max(4, (val / maxVal) * (chartArea.height - 20));
      const barX = chartArea.x + idx * barSpacing + (barSpacing - barWidth) / 2;
      const barY = chartArea.y + chartArea.height - barHeight;
      const color = point.color ?? DEFAULT_PALETTE[idx % DEFAULT_PALETTE.length];

      elements.push({
        id: `${id}_bar_${idx}`,
        type: "rectangle",
        position: { x: barX, y: barY },
        size: { width: barWidth, height: barHeight },
        props: {
          category: point.category ?? `Item ${idx + 1}`,
          value: val,
          label: String(val)
        },
        style: {
          fill: color,
          radius: 4,
          stroke: color,
          fontSize: 11,
          textColor: "#ffffff"
        }
      });

      // Category label under bar
      if (point.category) {
        elements.push({
          id: `${id}_cat_${idx}`,
          type: "text",
          position: { x: barX + barWidth / 2 - 25, y: chartArea.y + chartArea.height + 15 },
          size: { width: 50, height: 20 },
          props: { text: point.category },
          style: { fontSize: 11, textAlign: "center", color: "#64748b" }
        });
      }
    });
  } else if (chartType === "line") {
    // Axes
    elements.push({
      id: `${id}_axis_x`,
      type: "line",
      position: { x: chartArea.x, y: chartArea.y + chartArea.height },
      size: { width: chartArea.width, height: 0 },
      style: { stroke: "#94a3b8", strokeWidth: 2 }
    });
    elements.push({
      id: `${id}_axis_y`,
      type: "line",
      position: { x: chartArea.x, y: chartArea.y },
      size: { width: 0, height: chartArea.height },
      style: { stroke: "#94a3b8", strokeWidth: 2 }
    });

    const maxVal = Math.max(...data.map(d => d.value ?? 0), 10);
    const count = data.length;
    const stepX = chartArea.width / Math.max(count - 1, 1);

    const calculatedPoints = data.map((point, idx) => {
      const val = point.value ?? 0;
      const px = chartArea.x + idx * stepX;
      const py = chartArea.y + chartArea.height - (val / maxVal) * (chartArea.height - 20);
      return { x: px, y: py, val, cat: point.category };
    });

    // Connecting line segments
    for (let i = 0; i < calculatedPoints.length - 1; i++) {
      const p1 = calculatedPoints[i]!;
      const p2 = calculatedPoints[i + 1]!;
      elements.push({
        id: `${id}_seg_${i}`,
        type: "line",
        position: { x: Math.min(p1.x, p2.x), y: Math.min(p1.y, p2.y) },
        size: { width: Math.max(0, Math.abs(p2.x - p1.x)), height: Math.max(0, Math.abs(p2.y - p1.y)) },
        props: { points: [{ x: p1.x, y: p1.y }, { x: p2.x, y: p2.y }] },
        style: { stroke: "#3b82f6", strokeWidth: 3 }
      });
    }

    // Point dots
    calculatedPoints.forEach((pt, idx) => {
      elements.push({
        id: `${id}_dot_${idx}`,
        type: "ellipse",
        position: { x: pt.x - 6, y: pt.y - 6 },
        size: { width: 12, height: 12 },
        props: { value: pt.val, category: pt.cat, label: String(pt.val) },
        style: { fill: "#ffffff", stroke: "#3b82f6", strokeWidth: 2.5 }
      });

      if (pt.cat) {
        elements.push({
          id: `${id}_cat_${idx}`,
          type: "text",
          position: { x: pt.x - 25, y: chartArea.y + chartArea.height + 15 },
          size: { width: 50, height: 20 },
          props: { text: pt.cat },
          style: { fontSize: 11, textAlign: "center", color: "#64748b" }
        });
      }
    });
  } else if (chartType === "scatter") {
    // Axes
    elements.push({
      id: `${id}_axis_x`,
      type: "line",
      position: { x: chartArea.x, y: chartArea.y + chartArea.height },
      size: { width: chartArea.width, height: 0 },
      style: { stroke: "#94a3b8", strokeWidth: 2 }
    });
    elements.push({
      id: `${id}_axis_y`,
      type: "line",
      position: { x: chartArea.x, y: chartArea.y },
      size: { width: 0, height: chartArea.height },
      style: { stroke: "#94a3b8", strokeWidth: 2 }
    });

    const maxX = Math.max(...data.map(d => d.x ?? 0), 10);
    const maxY = Math.max(...data.map(d => d.y ?? 0), 10);

    data.forEach((point, idx) => {
      const px = chartArea.x + ((point.x ?? 0) / maxX) * chartArea.width;
      const py = chartArea.y + chartArea.height - ((point.y ?? 0) / maxY) * chartArea.height;
      const color = point.color ?? DEFAULT_PALETTE[idx % DEFAULT_PALETTE.length];

      elements.push({
        id: `${id}_point_${idx}`,
        type: "ellipse",
        position: { x: px - 8, y: py - 8 },
        size: { width: 16, height: 16 },
        props: {
          x: point.x,
          y: point.y,
          label: point.label ?? `(${point.x}, ${point.y})`
        },
        style: {
          fill: color,
          stroke: "#ffffff",
          strokeWidth: 2,
          opacity: 0.85
        }
      });
    });
  } else if (chartType === "pie") {
    const cx = chartArea.x + chartArea.width / 2 - 60;
    const cy = chartArea.y + chartArea.height / 2;
    const radius = Math.min(chartArea.width, chartArea.height) / 2 - 20;

    const total = data.reduce((acc, p) => acc + (p.value ?? 0), 0) || 1;
    let currentAngle = 0;

    data.forEach((point, idx) => {
      const val = point.value ?? 0;
      const sliceAngle = (val / total) * Math.PI * 2;
      const endAngle = currentAngle + sliceAngle;
      const color = point.color ?? DEFAULT_PALETTE[idx % DEFAULT_PALETTE.length];

      // Approximate slice or wedge
      const midAngle = currentAngle + sliceAngle / 2;
      const labelDist = radius * 0.7;
      const lx = cx + Math.cos(midAngle) * labelDist;
      const ly = cy + Math.sin(midAngle) * labelDist;

      // Slice center representation as node
      elements.push({
        id: `${id}_slice_${idx}`,
        type: "node",
        position: { x: lx - 30, y: ly - 15 },
        size: { width: 60, height: 30 },
        props: {
          label: `${Math.round((val / total) * 100)}%`,
          shape: "pill"
        },
        style: {
          fill: color,
          textColor: "#ffffff",
          strokeWidth: 1
        }
      });

      // Legend entry
      elements.push({
        id: `${id}_legend_${idx}`,
        type: "rectangle",
        position: { x: chartArea.x + chartArea.width - 90, y: chartArea.y + idx * 28 },
        size: { width: 14, height: 14 },
        props: { label: "" },
        style: { fill: color, radius: 3 }
      });
      elements.push({
        id: `${id}_legend_txt_${idx}`,
        type: "text",
        position: { x: chartArea.x + chartArea.width - 65, y: chartArea.y + idx * 28 },
        size: { width: 100, height: 18 },
        props: { text: `${point.category ?? `Item ${idx + 1}`}: ${val}` },
        style: { fontSize: 11, color: "#475569" }
      });

      currentAngle = endAngle;
    });

    // Outer circle container
    elements.unshift({
      id: `${id}_pie_base`,
      type: "ellipse",
      position: { x: cx - radius, y: cy - radius },
      size: { width: radius * 2, height: radius * 2 },
      props: { label: "" },
      style: {
        fill: "#f8fafc",
        stroke: "#cbd5e1",
        strokeWidth: 2
      }
    });
  }

  return {
    version: "1.0",
    id,
    type: "data.chart",
    metadata: {
      title,
      description: `Interactive ${chartType} visualization`,
      author: "AI Assistant"
    },
    canvas: {
      width,
      height,
      theme,
      grid: false
    },
    elements,
    connections: [],
    interactions: [],
    data: {
      chartType,
      series: data
    }
  };
}

export const sampleBarChartArtifact: ArtifactDefinition = createChartArtifact({
  id: "chart_bar_001",
  title: "Monthly Active Users (in thousands)",
  chartType: "bar",
  data: [
    { category: "Jan", value: 120 },
    { category: "Feb", value: 180 },
    { category: "Mar", value: 240 },
    { category: "Apr", value: 310 },
    { category: "May", value: 430 },
    { category: "Jun", value: 520 }
  ]
});

export const sampleLineChartArtifact: ArtifactDefinition = createChartArtifact({
  id: "chart_line_001",
  title: "API Request Latency Trend (ms)",
  chartType: "line",
  data: [
    { category: "00:00", value: 45 },
    { category: "04:00", value: 38 },
    { category: "08:00", value: 110 },
    { category: "12:00", value: 145 },
    { category: "16:00", value: 130 },
    { category: "20:00", value: 75 }
  ]
});

export const samplePieChartArtifact: ArtifactDefinition = createChartArtifact({
  id: "chart_pie_001",
  title: "Cloud Infrastructure Cost Breakdown",
  chartType: "pie",
  data: [
    { category: "Compute", value: 450 },
    { category: "Storage", value: 200 },
    { category: "Network", value: 150 },
    { category: "Database", value: 300 }
  ]
});

export const sampleScatterArtifact: ArtifactDefinition = createChartArtifact({
  id: "chart_scatter_001",
  title: "Cluster Memory vs CPU Utilization",
  chartType: "scatter",
  data: [
    { x: 15, y: 30, label: "Node A" },
    { x: 45, y: 65, label: "Node B" },
    { x: 60, y: 80, label: "Node C" },
    { x: 25, y: 40, label: "Node D" },
    { x: 85, y: 90, label: "Node E" },
    { x: 70, y: 55, label: "Node F" }
  ]
});

export const chartCapability: CapabilityDefinition = {
  id: "data.chart",
  name: "Interactive Data Charts",
  version: "1.0",
  description: "Data visualization capability supporting interactive bar, line, pie, and scatter charts",
  tags: [
    "chart",
    "data",
    "visualization",
    "bar",
    "line",
    "pie",
    "scatter",
    "analytics",
    "metrics"
  ],
  primitives: ["rectangle", "ellipse", "line", "text", "node"],
  interactions: ["hover", "select", "drag"],
  renderer: new SVGRenderer(),
  sampleArtifact: sampleBarChartArtifact
};

export const charts = chartCapability;
