import { z } from "zod";

/**
 * Geometry primitive types
 */
export const GeometryPrimitiveTypeSchema = z.enum([
  "rectangle",
  "rounded-rectangle",
  "circle",
  "ellipse",
  "line",
  "polyline",
  "polygon",
  "path",
  "arrow",
  "connector",
  "group",
  "container"
]);
export type GeometryPrimitiveType = z.infer<typeof GeometryPrimitiveTypeSchema>;

/**
 * Text primitive types
 */
export const TextPrimitiveTypeSchema = z.enum([
  "text",
  "heading",
  "label",
  "caption",
  "code",
  "rich-text"
]);
export type TextPrimitiveType = z.infer<typeof TextPrimitiveTypeSchema>;

/**
 * UI primitive types
 */
export const UIPrimitiveTypeSchema = z.enum([
  "icon",
  "avatar",
  "badge",
  "chip",
  "tag",
  "status-indicator",
  "divider",
  "progress",
  "tooltip",
  "button",
  "toggle",
  "checkbox",
  "radio",
  "input",
  "select",
  "slider"
]);
export type UIPrimitiveType = z.infer<typeof UIPrimitiveTypeSchema>;

/**
 * Node primitive types
 */
export const NodePrimitiveTypeSchema = z.enum([
  "node",
  "port",
  "handle",
  "anchor",
  "socket",
  "connection-point",
  "edge",
  "edge-label",
  "node-header",
  "node-body",
  "node-footer",
  "node-section",
  "node-action"
]);
export type NodePrimitiveType = z.infer<typeof NodePrimitiveTypeSchema>;

/**
 * Data primitive types
 */
export const DataPrimitiveTypeSchema = z.enum([
  "table",
  "table-row",
  "table-cell",
  "metric",
  "key-value",
  "legend",
  "axis",
  "tick",
  "data-point"
]);
export type DataPrimitiveType = z.infer<typeof DataPrimitiveTypeSchema>;

/**
 * Chart primitive types
 */
export const ChartPrimitiveTypeSchema = z.enum([
  "bar",
  "line",
  "area",
  "pie",
  "donut",
  "scatter-point",
  "heatmap-cell",
  "candlestick",
  "gauge"
]);
export type ChartPrimitiveType = z.infer<typeof ChartPrimitiveTypeSchema>;

/**
 * Diagram primitive types
 */
export const DiagramPrimitiveTypeSchema = z.enum([
  "entity",
  "relationship",
  "swimlane",
  "sequence-participant",
  "sequence-message",
  "timeline-event",
  "mindmap-branch",
  "tree-node"
]);
export type DiagramPrimitiveType = z.infer<typeof DiagramPrimitiveTypeSchema>;

/**
 * Comprehensive union of all supported primitive types
 */
export const PrimitiveTypeSchema = z.union([
  GeometryPrimitiveTypeSchema,
  TextPrimitiveTypeSchema,
  UIPrimitiveTypeSchema,
  NodePrimitiveTypeSchema,
  DataPrimitiveTypeSchema,
  ChartPrimitiveTypeSchema,
  DiagramPrimitiveTypeSchema,
  z.string() // extensible for custom developer-defined primitives
]);
export type PrimitiveType = z.infer<typeof PrimitiveTypeSchema>;

/**
 * Categorization kinds for primitives
 */
export type PrimitiveKind =
  | "geometry"
  | "text"
  | "ui"
  | "node"
  | "data"
  | "chart"
  | "diagram"
  | "custom";

export function getPrimitiveKind(type: string): PrimitiveKind {
  if (GeometryPrimitiveTypeSchema.safeParse(type).success) return "geometry";
  if (TextPrimitiveTypeSchema.safeParse(type).success) return "text";
  if (UIPrimitiveTypeSchema.safeParse(type).success) return "ui";
  if (NodePrimitiveTypeSchema.safeParse(type).success) return "node";
  if (DataPrimitiveTypeSchema.safeParse(type).success) return "data";
  if (ChartPrimitiveTypeSchema.safeParse(type).success) return "chart";
  if (DiagramPrimitiveTypeSchema.safeParse(type).success) return "diagram";
  return "custom";
}
