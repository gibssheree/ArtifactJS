import { z } from "zod";
import { PositionSchema, SizeSchema } from "./elements.js";
import { ConnectionSchema } from "./artifact.js";
import { MicroComponentSchema, PortSchema } from "./components.js";

/**
 * Artifact lifecycle events
 */
export const ArtifactCreatedEventSchema = z.object({
  type: z.literal("artifact.created"),
  artifactId: z.string(),
  timestamp: z.number()
});
export type ArtifactCreatedEvent = z.infer<typeof ArtifactCreatedEventSchema>;

export const ArtifactUpdatedEventSchema = z.object({
  type: z.literal("artifact.updated"),
  artifactId: z.string(),
  operation: z.string(),
  details: z.record(z.unknown()).optional(),
  timestamp: z.number()
});
export type ArtifactUpdatedEvent = z.infer<typeof ArtifactUpdatedEventSchema>;

/**
 * First-class Node events
 */
export const NodeClickedEventSchema = z.object({
  type: z.literal("node.clicked"),
  artifactId: z.string(),
  nodeId: z.string(),
  position: PositionSchema.optional(),
  timestamp: z.number()
});
export type NodeClickedEvent = z.infer<typeof NodeClickedEventSchema>;

export const NodeSelectedEventSchema = z.object({
  type: z.literal("node.selected"),
  artifactId: z.string(),
  nodeId: z.string().nullable(),
  selectedIds: z.array(z.string()).default([]),
  timestamp: z.number()
});
export type NodeSelectedEvent = z.infer<typeof NodeSelectedEventSchema>;

export const NodeMovedEventSchema = z.object({
  type: z.literal("node.moved"),
  artifactId: z.string(),
  nodeId: z.string(),
  position: PositionSchema,
  previousPosition: PositionSchema.optional(),
  from: PositionSchema.optional(),
  to: PositionSchema.optional(),
  timestamp: z.number()
});
export type NodeMovedEvent = z.infer<typeof NodeMovedEventSchema>;

export const NodeResizedEventSchema = z.object({
  type: z.literal("node.resized"),
  artifactId: z.string(),
  nodeId: z.string(),
  size: SizeSchema,
  previousSize: SizeSchema.optional(),
  timestamp: z.number()
});
export type NodeResizedEvent = z.infer<typeof NodeResizedEventSchema>;

export const NodeCreatedEventSchema = z.object({
  type: z.literal("node.created"),
  artifactId: z.string(),
  nodeId: z.string(),
  timestamp: z.number()
});
export type NodeCreatedEvent = z.infer<typeof NodeCreatedEventSchema>;

export const NodeUpdatedEventSchema = z.object({
  type: z.literal("node.updated"),
  artifactId: z.string(),
  nodeId: z.string(),
  changes: z.record(z.unknown()).optional(),
  timestamp: z.number()
});
export type NodeUpdatedEvent = z.infer<typeof NodeUpdatedEventSchema>;

export const NodeDeletedEventSchema = z.object({
  type: z.literal("node.deleted"),
  artifactId: z.string(),
  nodeId: z.string(),
  timestamp: z.number()
});
export type NodeDeletedEvent = z.infer<typeof NodeDeletedEventSchema>;

/**
 * MicroComponent events
 */
export const ComponentClickedEventSchema = z.object({
  type: z.literal("component.clicked"),
  artifactId: z.string(),
  nodeId: z.string().optional(),
  componentId: z.string(),
  timestamp: z.number()
});
export type ComponentClickedEvent = z.infer<typeof ComponentClickedEventSchema>;

export const ComponentHoveredEventSchema = z.object({
  type: z.literal("component.hovered"),
  artifactId: z.string(),
  nodeId: z.string().optional(),
  componentId: z.string().nullable(),
  timestamp: z.number()
});
export type ComponentHoveredEvent = z.infer<typeof ComponentHoveredEventSchema>;

export const ComponentSelectedEventSchema = z.object({
  type: z.literal("component.selected"),
  artifactId: z.string(),
  nodeId: z.string().optional(),
  componentId: z.string(),
  timestamp: z.number()
});
export type ComponentSelectedEvent = z.infer<typeof ComponentSelectedEventSchema>;

export const ComponentUpdatedEventSchema = z.object({
  type: z.literal("component.updated"),
  artifactId: z.string(),
  nodeId: z.string().optional(),
  componentId: z.string(),
  changes: z.record(z.unknown()),
  timestamp: z.number()
});
export type ComponentUpdatedEvent = z.infer<typeof ComponentUpdatedEventSchema>;

export const ComponentCreatedEventSchema = z.object({
  type: z.literal("component.created"),
  artifactId: z.string(),
  nodeId: z.string().optional(),
  component: MicroComponentSchema,
  timestamp: z.number()
});
export type ComponentCreatedEvent = z.infer<typeof ComponentCreatedEventSchema>;

export const ComponentDeletedEventSchema = z.object({
  type: z.literal("component.deleted"),
  artifactId: z.string(),
  nodeId: z.string().optional(),
  componentId: z.string(),
  timestamp: z.number()
});
export type ComponentDeletedEvent = z.infer<typeof ComponentDeletedEventSchema>;

/**
 * Port events
 */
export const PortClickedEventSchema = z.object({
  type: z.literal("port.clicked"),
  artifactId: z.string(),
  nodeId: z.string(),
  portId: z.string(),
  timestamp: z.number()
});
export type PortClickedEvent = z.infer<typeof PortClickedEventSchema>;

export const PortUpdatedEventSchema = z.object({
  type: z.literal("port.updated"),
  artifactId: z.string(),
  nodeId: z.string(),
  portId: z.string(),
  changes: z.record(z.unknown()),
  timestamp: z.number()
});
export type PortUpdatedEvent = z.infer<typeof PortUpdatedEventSchema>;

export const PortConnectedEventSchema = z.object({
  type: z.literal("port.connected"),
  artifactId: z.string(),
  connectionId: z.string(),
  fromNodeId: z.string(),
  fromPortId: z.string(),
  toNodeId: z.string(),
  toPortId: z.string(),
  timestamp: z.number()
});
export type PortConnectedEvent = z.infer<typeof PortConnectedEventSchema>;

export const PortDisconnectedEventSchema = z.object({
  type: z.literal("port.disconnected"),
  artifactId: z.string(),
  connectionId: z.string(),
  portId: z.string(),
  nodeId: z.string(),
  timestamp: z.number()
});
export type PortDisconnectedEvent = z.infer<typeof PortDisconnectedEventSchema>;

/**
 * Connection events
 */
export const ConnectionCreatedEventSchema = z.object({
  type: z.literal("connection.created"),
  artifactId: z.string(),
  connection: ConnectionSchema,
  timestamp: z.number()
});
export type ConnectionCreatedEvent = z.infer<typeof ConnectionCreatedEventSchema>;

export const ConnectionUpdatedEventSchema = z.object({
  type: z.literal("connection.updated"),
  artifactId: z.string(),
  connectionId: z.string(),
  changes: z.record(z.unknown()),
  timestamp: z.number()
});
export type ConnectionUpdatedEvent = z.infer<typeof ConnectionUpdatedEventSchema>;

export const ConnectionDeletedEventSchema = z.object({
  type: z.literal("connection.deleted"),
  artifactId: z.string(),
  connectionId: z.string(),
  timestamp: z.number()
});
export type ConnectionDeletedEvent = z.infer<typeof ConnectionDeletedEventSchema>;

/**
 * State changed event
 */
export const StateChangedEventSchema = z.object({
  type: z.literal("state.changed"),
  artifactId: z.string(),
  key: z.string(),
  value: z.unknown(),
  previousValue: z.unknown().optional(),
  level: z.enum(["artifact", "node", "component", "port"]).optional(),
  entityId: z.string().optional(),
  timestamp: z.number()
});
export type StateChangedEvent = z.infer<typeof StateChangedEventSchema>;

/**
 * Backward compatibility element events
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
export type ElementClickedEvent = z.infer<typeof ElementClickedEventSchema>;

export const ElementHoveredEventSchema = z.object({
  type: z.literal("element.hovered"),
  artifactId: z.string(),
  elementId: z.string().nullable(),
  timestamp: z.number()
});
export type ElementHoveredEvent = z.infer<typeof ElementHoveredEventSchema>;

export const ElementSelectedEventSchema = z.object({
  type: z.literal("element.selected"),
  artifactId: z.string(),
  elementId: z.string().nullable(),
  selectedIds: z.array(z.string()),
  timestamp: z.number()
});
export type ElementSelectedEvent = z.infer<typeof ElementSelectedEventSchema>;

export const ElementMovedEventSchema = z.object({
  type: z.literal("element.moved"),
  artifactId: z.string(),
  elementId: z.string(),
  position: PositionSchema,
  previousPosition: PositionSchema.optional(),
  timestamp: z.number()
});
export type ElementMovedEvent = z.infer<typeof ElementMovedEventSchema>;

export const ElementResizedEventSchema = z.object({
  type: z.literal("element.resized"),
  artifactId: z.string(),
  elementId: z.string(),
  size: SizeSchema,
  previousSize: SizeSchema.optional(),
  timestamp: z.number()
});
export type ElementResizedEvent = z.infer<typeof ElementResizedEventSchema>;

export const ElementDeletedEventSchema = z.object({
  type: z.literal("element.deleted"),
  artifactId: z.string(),
  elementId: z.string(),
  timestamp: z.number()
});
export type ElementDeletedEvent = z.infer<typeof ElementDeletedEventSchema>;

/**
 * Discriminated union of all artifact runtime events
 */
export const ArtifactEventSchema = z.discriminatedUnion("type", [
  ArtifactCreatedEventSchema,
  ArtifactUpdatedEventSchema,
  NodeCreatedEventSchema,
  NodeUpdatedEventSchema,
  NodeDeletedEventSchema,
  NodeClickedEventSchema,
  NodeSelectedEventSchema,
  NodeMovedEventSchema,
  NodeResizedEventSchema,
  ComponentCreatedEventSchema,
  ComponentUpdatedEventSchema,
  ComponentDeletedEventSchema,
  ComponentClickedEventSchema,
  ComponentHoveredEventSchema,
  ComponentSelectedEventSchema,
  PortClickedEventSchema,
  PortUpdatedEventSchema,
  PortConnectedEventSchema,
  PortDisconnectedEventSchema,
  ConnectionCreatedEventSchema,
  ConnectionUpdatedEventSchema,
  ConnectionDeletedEventSchema,
  StateChangedEventSchema,
  // Legacy
  ElementClickedEventSchema,
  ElementHoveredEventSchema,
  ElementSelectedEventSchema,
  ElementMovedEventSchema,
  ElementResizedEventSchema,
  ElementDeletedEventSchema
]);
export type ArtifactEvent = z.infer<typeof ArtifactEventSchema>;
export type ArtifactEventType = ArtifactEvent["type"];
