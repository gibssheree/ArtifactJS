import { z } from "zod";
import { ElementSchema, PositionSchema } from "./elements.js";
import { ConnectionSchema, CanvasSchema } from "./artifact.js";

/**
 * Patch operation for updating element attributes
 */
export const UpdateElementPatchSchema = z.object({
  operation: z.literal("update"),
  elementId: z.string(),
  changes: z.object({
    position: PositionSchema.optional(),
    size: z.object({ width: z.number(), height: z.number() }).optional(),
    props: z.record(z.unknown()).optional(),
    style: z.record(z.unknown()).optional(),
    metadata: z.record(z.unknown()).optional()
  }).passthrough()
});
export type UpdateElementPatch = z.infer<typeof UpdateElementPatchSchema>;

/**
 * Convenience patch operation for moving an element
 */
export const MoveElementPatchSchema = z.object({
  operation: z.literal("move"),
  elementId: z.string(),
  position: PositionSchema
});
export type MoveElementPatch = z.infer<typeof MoveElementPatchSchema>;

/**
 * Patch operation for inserting a new element
 */
export const InsertElementPatchSchema = z.object({
  operation: z.literal("insert"),
  element: ElementSchema
});
export type InsertElementPatch = z.infer<typeof InsertElementPatchSchema>;

/**
 * Patch operation for removing an element
 */
export const RemoveElementPatchSchema = z.object({
  operation: z.literal("remove"),
  elementId: z.string()
});
export type RemoveElementPatch = z.infer<typeof RemoveElementPatchSchema>;

/**
 * Patch operation for creating a connection
 */
export const ConnectPatchSchema = z.object({
  operation: z.literal("connect"),
  connection: ConnectionSchema
});
export type ConnectPatch = z.infer<typeof ConnectPatchSchema>;

/**
 * Patch operation for deleting a connection
 */
export const DisconnectPatchSchema = z.object({
  operation: z.literal("disconnect"),
  connectionId: z.string()
});
export type DisconnectPatch = z.infer<typeof DisconnectPatchSchema>;

/**
 * Patch operation for modifying canvas properties
 */
export const UpdateCanvasPatchSchema = z.object({
  operation: z.literal("update_canvas"),
  changes: CanvasSchema.partial()
});
export type UpdateCanvasPatch = z.infer<typeof UpdateCanvasPatchSchema>;

/**
 * Atomic single patch
 */
export const SingleArtifactPatchSchema = z.discriminatedUnion("operation", [
  UpdateElementPatchSchema,
  MoveElementPatchSchema,
  InsertElementPatchSchema,
  RemoveElementPatchSchema,
  ConnectPatchSchema,
  DisconnectPatchSchema,
  UpdateCanvasPatchSchema
]);
export type SingleArtifactPatch = z.infer<typeof SingleArtifactPatchSchema>;

/**
 * Batch patch operation for combining multiple atomic updates
 */
export const BatchArtifactPatchSchema = z.object({
  operation: z.literal("batch"),
  patches: z.array(SingleArtifactPatchSchema)
});
export type BatchArtifactPatch = z.infer<typeof BatchArtifactPatchSchema>;

/**
 * Any valid patch
 */
export const ArtifactPatchSchema = z.union([
  SingleArtifactPatchSchema,
  BatchArtifactPatchSchema
]);
export type ArtifactPatch = z.infer<typeof ArtifactPatchSchema>;
