import { z } from "zod";
import { ElementSchema, PositionSchema } from "./elements.js";
import { ConnectionSchema, CanvasSchema } from "./artifact.js";
import { MicroComponentSchema, PortSchema } from "./components.js";

/**
 * Legacy update element patch
 */
export const UpdateElementPatchSchema = z.object({
  operation: z.literal("update"),
  elementId: z.string(),
  changes: z.object({
    position: PositionSchema.optional(),
    size: z.object({ width: z.number(), height: z.number() }).optional(),
    props: z.record(z.unknown()).optional(),
    style: z.record(z.unknown()).optional(),
    metadata: z.record(z.unknown()).optional(),
    header: z.record(z.unknown()).optional(),
    body: z.record(z.unknown()).optional(),
    footer: z.record(z.unknown()).optional(),
    ports: z.array(z.record(z.unknown())).optional(),
    state: z.record(z.unknown()).optional()
  }).passthrough()
});
export type UpdateElementPatch = z.infer<typeof UpdateElementPatchSchema>;

/**
 * Move element/node patch
 */
export const MoveElementPatchSchema = z.object({
  operation: z.literal("move"),
  elementId: z.string(),
  position: PositionSchema
});
export type MoveElementPatch = z.infer<typeof MoveElementPatchSchema>;

/**
 * Move node explicitly
 */
export const MoveNodePatchSchema = z.object({
  operation: z.literal("move_node"),
  nodeId: z.string(),
  position: PositionSchema
});
export type MoveNodePatch = z.infer<typeof MoveNodePatchSchema>;

/**
 * Update structured node directly
 */
export const UpdateNodePatchSchema = z.object({
  operation: z.literal("update_node"),
  nodeId: z.string(),
  changes: z.record(z.unknown())
});
export type UpdateNodePatch = z.infer<typeof UpdateNodePatchSchema>;

/**
 * Insert element patch
 */
export const InsertElementPatchSchema = z.object({
  operation: z.literal("insert"),
  element: ElementSchema
});
export type InsertElementPatch = z.infer<typeof InsertElementPatchSchema>;

/**
 * Remove element patch
 */
export const RemoveElementPatchSchema = z.object({
  operation: z.literal("remove"),
  elementId: z.string()
});
export type RemoveElementPatch = z.infer<typeof RemoveElementPatchSchema>;

/**
 * Micro-component update patch
 */
export const UpdateComponentPatchSchema = z.object({
  operation: z.literal("update_component"),
  componentId: z.string(),
  nodeId: z.string().optional(),
  changes: z.record(z.unknown())
});
export type UpdateComponentPatch = z.infer<typeof UpdateComponentPatchSchema>;

/**
 * Micro-component insert patch
 */
export const InsertComponentPatchSchema = z.object({
  operation: z.literal("insert_component"),
  parentId: z.string(),
  component: MicroComponentSchema
});
export type InsertComponentPatch = z.infer<typeof InsertComponentPatchSchema>;

/**
 * Micro-component remove patch
 */
export const RemoveComponentPatchSchema = z.object({
  operation: z.literal("remove_component"),
  componentId: z.string()
});
export type RemoveComponentPatch = z.infer<typeof RemoveComponentPatchSchema>;

/**
 * Port update patch
 */
export const UpdatePortPatchSchema = z.object({
  operation: z.literal("update_port"),
  nodeId: z.string(),
  portId: z.string(),
  changes: z.record(z.unknown())
});
export type UpdatePortPatch = z.infer<typeof UpdatePortPatchSchema>;

/**
 * Connect patch
 */
export const ConnectPatchSchema = z.object({
  operation: z.literal("connect"),
  connection: ConnectionSchema
});
export type ConnectPatch = z.infer<typeof ConnectPatchSchema>;

/**
 * Disconnect patch
 */
export const DisconnectPatchSchema = z.object({
  operation: z.literal("disconnect"),
  connectionId: z.string()
});
export type DisconnectPatch = z.infer<typeof DisconnectPatchSchema>;

/**
 * Canvas update patch
 */
export const UpdateCanvasPatchSchema = z.object({
  operation: z.literal("update_canvas"),
  changes: CanvasSchema.partial()
});
export type UpdateCanvasPatch = z.infer<typeof UpdateCanvasPatchSchema>;

/**
 * Single atomic patch
 */
export const SingleArtifactPatchSchema = z.discriminatedUnion("operation", [
  UpdateElementPatchSchema,
  MoveElementPatchSchema,
  MoveNodePatchSchema,
  UpdateNodePatchSchema,
  InsertElementPatchSchema,
  RemoveElementPatchSchema,
  UpdateComponentPatchSchema,
  InsertComponentPatchSchema,
  RemoveComponentPatchSchema,
  UpdatePortPatchSchema,
  ConnectPatchSchema,
  DisconnectPatchSchema,
  UpdateCanvasPatchSchema
]);
export type SingleArtifactPatch = z.infer<typeof SingleArtifactPatchSchema>;

/**
 * Batch patch
 */
export const BatchArtifactPatchSchema = z.object({
  operation: z.literal("batch"),
  patches: z.array(SingleArtifactPatchSchema)
});
export type BatchArtifactPatch = z.infer<typeof BatchArtifactPatchSchema>;

/**
 * Any valid artifact patch
 */
export const ArtifactPatchSchema = z.union([
  SingleArtifactPatchSchema,
  BatchArtifactPatchSchema
]);
export type ArtifactPatch = z.infer<typeof ArtifactPatchSchema>;
