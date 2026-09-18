import { z } from "zod";
import {
  PositionSchema,
  SizeSchema,
  PointSchema,
  ElementStyleSchema,
  type Position,
  type Size,
  type Point,
  type ElementStyle
} from "./common.js";
import {
  type NodeHeader,
  type NodeBody,
  type NodeFooter,
  type Port,
  type MicroComponent,
  NodeHeaderSchema,
  NodeBodySchema,
  NodeFooterSchema,
  PortSchema,
  MicroComponentSchema
} from "./components.js";

export {
  PositionSchema,
  SizeSchema,
  PointSchema,
  ElementStyleSchema,
  type Position,
  type Size,
  type Point,
  type ElementStyle
};

/**
 * Supported core element primitive types
 */
export const ElementTypeSchema = z.enum([
  // Shape primitives
  "rectangle",
  "ellipse",
  "line",
  "arrow",
  // Content primitives
  "text",
  // Diagram primitives
  "node",
  "group",
  "connector",
  // Interaction primitives
  "button",
  "slider",
  "toggle",
  // Freehand sketch primitive
  "freehand"
]);

export type ElementType = z.infer<typeof ElementTypeSchema>;

/**
 * Comprehensive ArtifactElement interface supporting both simple primitives and structured nodes
 */
export interface ArtifactElement {
  id: string;
  type: string;
  position: Position;
  size: Size;
  props?: Record<string, unknown>;
  style?: ElementStyle;
  metadata?: Record<string, unknown>;
  // First-class structured node regions
  header?: NodeHeader;
  body?: NodeBody;
  footer?: NodeFooter;
  sections?: MicroComponent[];
  ports?: Port[];
  anchors?: Record<string, string>;
  actions?: MicroComponent[];
  state?: Record<string, unknown>;
  children?: MicroComponent[];
}

/**
 * Base element schema shared across all element kinds
 */
export const BaseElementSchema = z.object({
  id: z.string().min(1),
  type: z.string().min(1),
  position: PositionSchema,
  size: SizeSchema,
  props: z.record(z.unknown()).optional(),
  style: ElementStyleSchema.optional(),
  metadata: z.record(z.unknown()).optional(),
  header: NodeHeaderSchema.optional(),
  body: NodeBodySchema.optional(),
  footer: NodeFooterSchema.optional(),
  sections: z.array(MicroComponentSchema).optional(),
  ports: z.array(PortSchema).optional(),
  anchors: z.record(z.string()).optional(),
  actions: z.array(MicroComponentSchema).optional(),
  state: z.record(z.unknown()).optional(),
  children: z.array(MicroComponentSchema).optional()
});

export const ElementSchema = BaseElementSchema as unknown as z.ZodType<ArtifactElement>;
