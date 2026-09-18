import { z } from "zod";
import { ElementSchema, ElementStyleSchema, type ArtifactElement } from "./elements.js";

/**
 * Anchor points on an element bounding box
 */
export const AnchorPointSchema = z.enum([
  "top",
  "bottom",
  "left",
  "right",
  "center",
  "auto"
]);
export type AnchorPoint = z.infer<typeof AnchorPointSchema>;

/**
 * Connection endpoint identifier referencing a node, port, or anchor
 */
export const ConnectionEndpointObjectSchema = z.object({
  nodeId: z.string().optional(),
  elementId: z.string().optional(),
  portId: z.string().optional(),
  anchor: AnchorPointSchema.optional()
});
export type ConnectionEndpointObject = z.infer<typeof ConnectionEndpointObjectSchema>;

export const ConnectionEndpointSchema = z.union([
  z.string(),
  ConnectionEndpointObjectSchema
]);
export type ConnectionEndpoint = z.infer<typeof ConnectionEndpointSchema>;

/**
 * First-class connection between elements or ports
 */
export const ConnectionSchema = z.object({
  id: z.string().min(1),
  from: ConnectionEndpointSchema,
  to: ConnectionEndpointSchema,
  type: z.enum(["arrow", "line", "curved", "orthogonal", "straight"]).optional().default("arrow"),
  label: z.string().optional(),
  style: ElementStyleSchema.optional(),
  state: z.record(z.unknown()).optional(),
  metadata: z.record(z.unknown()).optional()
});
export type Connection = z.infer<typeof ConnectionSchema>;

/**
 * Canvas configuration and viewport settings
 */
export const ThemeModeSchema = z.enum(["light", "dark", "neutral"]);
export type ThemeMode = z.infer<typeof ThemeModeSchema>;

export const CanvasSchema = z.object({
  width: z.number().min(100).default(800),
  height: z.number().min(100).default(600),
  theme: ThemeModeSchema.default("neutral"),
  backgroundColor: z.string().optional(),
  grid: z.boolean().default(false)
});
export type CanvasConfig = z.infer<typeof CanvasSchema>;

/**
 * Declarative interactive triggers/actions
 */
export const InteractionSchema = z.object({
  id: z.string(),
  trigger: z.enum(["click", "hover", "change"]),
  targetId: z.string(),
  action: z.enum(["select", "toggle", "setValue", "custom"]),
  params: z.record(z.unknown()).optional()
});
export type Interaction = z.infer<typeof InteractionSchema>;

/**
 * Standard protocol versions
 */
export const PROTOCOL_VERSION_1_0 = "1.0";
export const ProtocolVersionSchema = z.literal("1.0");

/**
 * Complete declarative Artifact schema
 */
export const ArtifactSchema = z.object({
  version: ProtocolVersionSchema.default(PROTOCOL_VERSION_1_0),
  id: z.string().min(1),
  type: z.string().min(1),
  metadata: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    author: z.string().optional()
  }).passthrough().default({}),
  canvas: CanvasSchema.default({
    width: 800,
    height: 600,
    theme: "neutral",
    grid: false
  }),
  elements: z.array(ElementSchema).default([]),
  connections: z.array(ConnectionSchema).default([]),
  interactions: z.array(InteractionSchema).default([]),
  data: z.record(z.unknown()).optional()
}).passthrough();

export type ArtifactDefinition = z.infer<typeof ArtifactSchema>;
