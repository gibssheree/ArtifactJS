import { z } from "zod";
import { PositionSchema, SizeSchema } from "./elements.js";
import { ConnectionSchema } from "./artifact.js";
/**
 * Event emitted when an artifact is instantiated
 */
export const ArtifactCreatedEventSchema = z.object({
    type: z.literal("artifact.created"),
    artifactId: z.string(),
    timestamp: z.number()
});
/**
 * Event emitted when an artifact definition or elements change
 */
export const ArtifactUpdatedEventSchema = z.object({
    type: z.literal("artifact.updated"),
    artifactId: z.string(),
    operation: z.string(),
    details: z.record(z.unknown()).optional(),
    timestamp: z.number()
});
/**
 * Event emitted when an element is clicked
 */
export const ElementClickedEventSchema = z.object({
    type: z.literal("element.clicked"),
    artifactId: z.string(),
    elementId: z.string(),
    position: PositionSchema.optional(),
    altKey: z.boolean().optional(),
    shiftKey: z.boolean().optional(),
    timestamp: z.number()
});
/**
 * Event emitted when mouse hovers over an element
 */
export const ElementHoveredEventSchema = z.object({
    type: z.literal("element.hovered"),
    artifactId: z.string(),
    elementId: z.string().nullable(),
    timestamp: z.number()
});
/**
 * Event emitted when an element is selected or unselected
 */
export const ElementSelectedEventSchema = z.object({
    type: z.literal("element.selected"),
    artifactId: z.string(),
    elementId: z.string().nullable(),
    selectedIds: z.array(z.string()),
    timestamp: z.number()
});
/**
 * Event emitted when an element is moved / dragged
 */
export const ElementMovedEventSchema = z.object({
    type: z.literal("element.moved"),
    artifactId: z.string(),
    elementId: z.string(),
    position: PositionSchema,
    previousPosition: PositionSchema.optional(),
    timestamp: z.number()
});
/**
 * Event emitted when an element is resized
 */
export const ElementResizedEventSchema = z.object({
    type: z.literal("element.resized"),
    artifactId: z.string(),
    elementId: z.string(),
    size: SizeSchema,
    previousSize: SizeSchema.optional(),
    timestamp: z.number()
});
/**
 * Event emitted when an element is deleted
 */
export const ElementDeletedEventSchema = z.object({
    type: z.literal("element.deleted"),
    artifactId: z.string(),
    elementId: z.string(),
    timestamp: z.number()
});
/**
 * Event emitted when a connection is established
 */
export const ConnectionCreatedEventSchema = z.object({
    type: z.literal("connection.created"),
    artifactId: z.string(),
    connection: ConnectionSchema,
    timestamp: z.number()
});
/**
 * Event emitted when a connection is removed
 */
export const ConnectionDeletedEventSchema = z.object({
    type: z.literal("connection.deleted"),
    artifactId: z.string(),
    connectionId: z.string(),
    timestamp: z.number()
});
/**
 * Event emitted when reactive runtime state changes
 */
export const StateChangedEventSchema = z.object({
    type: z.literal("state.changed"),
    artifactId: z.string(),
    key: z.string(),
    value: z.unknown(),
    previousValue: z.unknown().optional(),
    timestamp: z.number()
});
/**
 * Discriminated union of all artifact runtime events
 */
export const ArtifactEventSchema = z.discriminatedUnion("type", [
    ArtifactCreatedEventSchema,
    ArtifactUpdatedEventSchema,
    ElementClickedEventSchema,
    ElementHoveredEventSchema,
    ElementSelectedEventSchema,
    ElementMovedEventSchema,
    ElementResizedEventSchema,
    ElementDeletedEventSchema,
    ConnectionCreatedEventSchema,
    ConnectionDeletedEventSchema,
    StateChangedEventSchema
]);
//# sourceMappingURL=events.js.map