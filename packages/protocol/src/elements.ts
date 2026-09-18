import { z } from "zod";

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
 * 2D coordinate position
 */
export const PositionSchema = z.object({
  x: z.number(),
  y: z.number()
});
export type Position = z.infer<typeof PositionSchema>;

/**
 * 2D dimensions
 */
export const SizeSchema = z.object({
  width: z.number().min(0),
  height: z.number().min(0)
});
export type Size = z.infer<typeof SizeSchema>;

/**
 * Generic point in 2D space
 */
export const PointSchema = z.object({
  x: z.number(),
  y: z.number()
});
export type Point = z.infer<typeof PointSchema>;

/**
 * Styling attributes for visual presentation
 */
export const ElementStyleSchema = z.object({
  fill: z.string().optional(),
  stroke: z.string().optional(),
  strokeWidth: z.number().min(0).optional(),
  strokeDasharray: z.string().optional(),
  radius: z.number().min(0).optional(),
  opacity: z.number().min(0).max(1).optional(),
  roughness: z.number().min(0).max(5).optional(), // for sketch / excalidraw mode
  bowing: z.number().optional(),
  color: z.string().optional(),
  textColor: z.string().optional(),
  fontSize: z.number().min(6).optional(),
  fontFamily: z.string().optional(),
  fontWeight: z.union([z.string(), z.number()]).optional(),
  textAlign: z.enum(["left", "center", "right"]).optional(),
  textBaseline: z.enum(["top", "middle", "bottom"]).optional(),
  shadow: z.boolean().optional()
}).passthrough();
export type ElementStyle = z.infer<typeof ElementStyleSchema>;

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
  metadata: z.record(z.unknown()).optional()
});

export const ElementSchema = BaseElementSchema;
export type ArtifactElement = z.infer<typeof ElementSchema>;
