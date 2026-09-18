import { z } from "zod";
import {
  PositionSchema,
  SizeSchema,
  ElementStyleSchema,
  type Position,
  type Size,
  type ElementStyle
} from "./common.js";

/**
 * Port direction for connection routing
 */
export const PortDirectionSchema = z.enum(["input", "output", "bidirectional"]);
export type PortDirection = z.infer<typeof PortDirectionSchema>;

/**
 * Port placement anchors or relative position
 */
export const PortPositionSchema = z.union([
  z.enum(["top", "bottom", "left", "right", "center", "auto"]),
  PositionSchema
]);
export type PortPosition = z.infer<typeof PortPositionSchema>;

/**
 * First-class Port model on a node
 */
export interface Port {
  id: string;
  nodeId: string;
  name?: string;
  direction: PortDirection;
  position: PortPosition;
  type?: string;
  dataType?: string;
  acceptedTypes?: string[];
  maxConnections?: number;
  currentConnections?: number;
  style?: ElementStyle;
  state?: {
    connected?: boolean;
    hovered?: boolean;
    active?: boolean;
    [key: string]: unknown;
  };
  metadata?: Record<string, unknown>;
}

export const PortSchema: z.ZodType<Port> = z.object({
  id: z.string().min(1),
  nodeId: z.string().min(1),
  name: z.string().optional(),
  direction: PortDirectionSchema.default("bidirectional"),
  position: PortPositionSchema.default("auto"),
  type: z.string().optional(),
  dataType: z.string().optional(),
  acceptedTypes: z.array(z.string()).optional(),
  maxConnections: z.number().min(1).optional(),
  currentConnections: z.number().min(0).optional(),
  style: ElementStyleSchema.optional(),
  state: z.record(z.unknown()).optional(),
  metadata: z.record(z.unknown()).optional()
}) as any;

/**
 * MicroComponent entity definition
 */
export interface MicroComponent {
  id: string;
  type: string;
  parentId?: string;
  props?: Record<string, unknown>;
  position?: Position;
  size?: Size;
  style?: ElementStyle;
  state?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
  children?: MicroComponent[];
  aria?: {
    label?: string;
    role?: string;
  };
}

export const MicroComponentSchema: z.ZodType<MicroComponent> = z.lazy(() =>
  z.object({
    id: z.string().min(1),
    type: z.string().min(1),
    parentId: z.string().optional(),
    props: z.record(z.unknown()).optional(),
    position: PositionSchema.optional(),
    size: SizeSchema.optional(),
    style: ElementStyleSchema.optional(),
    state: z.record(z.unknown()).optional(),
    metadata: z.record(z.unknown()).optional(),
    children: z.array(MicroComponentSchema).optional(),
    aria: z.object({
      label: z.string().optional(),
      role: z.string().optional()
    }).optional()
  })
);

/**
 * Structured regions of a first-class Node
 */
export interface NodeHeader {
  id?: string;
  icon?: string;
  title: string;
  subtitle?: string;
  badge?: string;
  status?: string;
  actions?: MicroComponent[];
}

export const NodeHeaderSchema = z.object({
  id: z.string().optional(),
  icon: z.string().optional(),
  title: z.string(),
  subtitle: z.string().optional(),
  badge: z.string().optional(),
  status: z.string().optional(),
  actions: z.array(MicroComponentSchema).optional()
});

export interface NodeBody {
  id?: string;
  description?: string;
  content?: string;
  metadata?: Record<string, unknown>;
  sections?: MicroComponent[];
}

export const NodeBodySchema = z.object({
  id: z.string().optional(),
  description: z.string().optional(),
  content: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
  sections: z.array(MicroComponentSchema).optional()
});

export interface NodeFooter {
  id?: string;
  content?: string;
  actions?: MicroComponent[];
}

export const NodeFooterSchema = z.object({
  id: z.string().optional(),
  content: z.string().optional(),
  actions: z.array(MicroComponentSchema).optional()
});

/**
 * First-class Structured Node definition
 */
export interface StructuredNode {
  id: string;
  type: string;
  position: Position;
  size: Size;
  style?: ElementStyle;
  header?: NodeHeader;
  body?: NodeBody;
  footer?: NodeFooter;
  sections?: MicroComponent[];
  ports?: Port[];
  anchors?: Record<string, string>;
  actions?: MicroComponent[];
  state?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
  children?: MicroComponent[];
  props?: Record<string, unknown>;
}

export const StructuredNodeSchema: z.ZodType<StructuredNode> = z.object({
  id: z.string().min(1),
  type: z.string().min(1),
  position: PositionSchema,
  size: SizeSchema,
  style: ElementStyleSchema.optional(),
  header: NodeHeaderSchema.optional(),
  body: NodeBodySchema.optional(),
  footer: NodeFooterSchema.optional(),
  sections: z.array(MicroComponentSchema).optional(),
  ports: z.array(PortSchema).optional(),
  anchors: z.record(z.string()).optional(),
  actions: z.array(MicroComponentSchema).optional(),
  state: z.record(z.unknown()).optional(),
  metadata: z.record(z.unknown()).optional(),
  children: z.array(MicroComponentSchema).optional(),
  props: z.record(z.unknown()).optional()
}) as any;
