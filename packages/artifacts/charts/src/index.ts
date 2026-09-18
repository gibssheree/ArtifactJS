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
  chartType: "bar" | "line" | "pie" | "scatter" | "area" | "donut" | "gauge";
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
    size: { width: 450, height: 35 },
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
  } else if (chartType === "line" || chartType === "area") {
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

    // Area fill rectangles / columns if area chart
    if (chartType === "area") {
      calculatedPoints.forEach((p, idx) => {
        const h = chartArea.y + chartArea.height - p.y;
        elements.push({
          id: `${id}_area_slice_${idx}`,
          type: "rectangle",
          position: { x: p.x - stepX / 2, y: p.y },
          size: { width: stepX, height: h },
          style: {
            fill: "#3b82f6",
            opacity: 0.15,
            stroke: "transparent"
          }
        });
      });
    }

    // Connect line segments
    for (let i = 0; i < calculatedPoints.length - 1; i++) {
      const p1 = calculatedPoints[i];
      const p2 = calculatedPoints[i + 1];
      if (p1 && p2) {
        elements.push({
          id: `${id}_seg_${i}`,
          type: "line",
          position: { x: Math.min(p1.x, p2.x), y: Math.min(p1.y, p2.y) },
          size: { width: Math.max(1, Math.abs(p2.x - p1.x)), height: Math.max(1, Math.abs(p2.y - p1.y)) },
          props: { x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y },
          style: { stroke: "#3b82f6", strokeWidth: 3 }
        });
      }
    }

    // Data points and labels
    calculatedPoints.forEach((p, idx) => {
      elements.push({
        id: `${id}_dot_${idx}`,
        type: "ellipse",
        position: { x: p.x - 5, y: p.y - 5 },
        size: { width: 10, height: 10 },
        props: { label: String(p.val) },
        style: { fill: "#3b82f6", stroke: "#ffffff", strokeWidth: 2 }
      });

      if (p.cat) {
        elements.push({
          id: `${id}_cat_${idx}`,
          type: "text",
          position: { x: p.x - 25, y: chartArea.y + chartArea.height + 15 },
          size: { width: 50, height: 20 },
          props: { text: p.cat },
          style: { fontSize: 11, textAlign: "center", color: "#64748b" }
        });
      }
    });
  } else if (chartType === "pie" || chartType === "donut") {
    const total = data.reduce((sum, d) => sum + (d.value ?? 0), 0) || 1;
    const centerX = chartArea.x + chartArea.width / 2 - 80;
    const centerY = chartArea.y + chartArea.height / 2;
    const radius = Math.min(chartArea.width, chartArea.height) * 0.4;

    elements.push({
      id: `${id}_pie_base`,
      type: "ellipse",
      position: { x: centerX - radius, y: centerY - radius },
      size: { width: radius * 2, height: radius * 2 },
      style: { fill: "#f1f5f9", stroke: "#cbd5e1", strokeWidth: 1 }
    });

    // Donut inner hole
    if (chartType === "donut") {
      const innerRadius = radius * 0.55;
      elements.push({
        id: `${id}_donut_hole`,
        type: "ellipse",
        position: { x: centerX - innerRadius, y: centerY - innerRadius },
        size: { width: innerRadius * 2, height: innerRadius * 2 },
        style: { fill: "#ffffff", stroke: "#e2e8f0", strokeWidth: 1 }
      });

      // Center text for donut
      elements.push({
        id: `${id}_donut_center_text`,
        type: "text",
        position: { x: centerX - 40, y: centerY - 10 },
        size: { width: 80, height: 24 },
        props: { text: `${total}` },
        style: { fontSize: 16, fontWeight: "700", textAlign: "center" }
      });
    }

    // Legend items on right
    const legendX = centerX + radius + 40;
    let legendY = centerY - (data.length * 24) / 2;

    data.forEach((d, idx) => {
      const color = d.color ?? DEFAULT_PALETTE[idx % DEFAULT_PALETTE.length];
      elements.push({
        id: `${id}_legend_swatch_${idx}`,
        type: "rectangle",
        position: { x: legendX, y: legendY + 3 },
        size: { width: 14, height: 14 },
        style: { fill: color, radius: 3 }
      });

      elements.push({
        id: `${id}_legend_text_${idx}`,
        type: "text",
        position: { x: legendX + 22, y: legendY },
        size: { width: 140, height: 20 },
        props: { text: `${d.category ?? "Item"}: ${d.value} (${Math.round(((d.value ?? 0) / total) * 100)}%)` },
        style: { fontSize: 11, color: "#334155" }
      });

      legendY += 26;
    });
  } else if (chartType === "gauge") {
    const val = data[0]?.value ?? 75;
    const centerX = chartArea.x + chartArea.width / 2;
    const centerY = chartArea.y + chartArea.height / 2;
    const r = 100;

    elements.push({
      id: `${id}_gauge_outer`,
      type: "ellipse",
      position: { x: centerX - r, y: centerY - r },
      size: { width: r * 2, height: r * 2 },
      style: { fill: "#f1f5f9", stroke: "#e2e8f0", strokeWidth: 8 }
    });

    elements.push({
      id: `${id}_gauge_val`,
      type: "text",
      position: { x: centerX - 50, y: centerY - 20 },
      size: { width: 100, height: 40 },
      props: { text: `${val}%` },
      style: { fontSize: 28, fontWeight: "800", textAlign: "center", color: "#3b82f6" }
    });

    elements.push({
      id: `${id}_gauge_label`,
      type: "text",
      position: { x: centerX - 60, y: centerY + 24 },
      size: { width: 120, height: 20 },
      props: { text: data[0]?.category ?? "Performance Health" },
      style: { fontSize: 12, textAlign: "center", color: "#64748b" }
    });
  }

  return {
    version: "1.0",
    id,
    type: "data.chart",
    metadata: {
      title,
      description: `${chartType.toUpperCase()} Chart Visualization`
    },
    canvas: {
      width,
      height,
      theme,
      grid: false
    },
    elements,
    connections: [],
    interactions: []
  };
}

export const sampleBarChartArtifact: ArtifactDefinition = createChartArtifact({
  id: "chart_bar_001",
  title: "Monthly Active Users (in Thousands)",
  chartType: "bar",
  data: [
    { category: "Jan", value: 120 },
    { category: "Feb", value: 150 },
    { category: "Mar", value: 210 },
    { category: "Apr", value: 280 },
    { category: "May", value: 390 },
    { category: "Jun", value: 480 }
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

export const sampleAreaChartArtifact: ArtifactDefinition = createChartArtifact({
  id: "chart_area_001",
  title: "Network Throughput (MB/s)",
  chartType: "area",
  data: [
    { category: "10am", value: 350 },
    { category: "11am", value: 520 },
    { category: "12pm", value: 890 },
    { category: "1pm", value: 780 },
    { category: "2pm", value: 650 },
    { category: "3pm", value: 420 }
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

export const sampleDonutChartArtifact: ArtifactDefinition = createChartArtifact({
  id: "chart_donut_001",
  title: "Storage Allocation by Tier (TB)",
  chartType: "donut",
  data: [
    { category: "NVMe Hot", value: 120 },
    { category: "SSD Warm", value: 280 },
    { category: "Glacier Cold", value: 650 }
  ]
});

export const sampleGaugeArtifact: ArtifactDefinition = createChartArtifact({
  id: "chart_gauge_001",
  title: "System Health Score",
  chartType: "gauge",
  data: [{ category: "Cluster Readiness", value: 96 }]
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
  version: "2.0",
  description: "Data visualization capability supporting interactive bar, line, area, pie, donut, gauge, and scatter charts",
  tags: [
    "chart",
    "data",
    "visualization",
    "bar",
    "line",
    "area",
    "pie",
    "donut",
    "gauge",
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
