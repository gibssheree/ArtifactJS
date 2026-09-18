import { z } from "zod";

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
 * Element visual presentation styles
 */
export const ElementStyleSchema = z.object({
  fill: z.string().optional(),
  stroke: z.string().optional(),
  strokeWidth: z.number().optional(),
  strokeDasharray: z.string().optional(),
  opacity: z.number().min(0).max(1).optional(),
  roughness: z.number().min(0).optional(),
  radius: z.number().min(0).optional(),
  fontSize: z.number().optional(),
  fontFamily: z.string().optional(),
  fontWeight: z.string().optional(),
  textColor: z.string().optional(),
  textAlign: z.enum(["left", "center", "right"]).optional()
}).passthrough();
export type ElementStyle = z.infer<typeof ElementStyleSchema>;
