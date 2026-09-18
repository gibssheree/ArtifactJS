import { z } from "zod";
import { ElementSchema, ElementStyleSchema } from "./elements.js";
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
/**
 * Connection endpoint identifier
 */
export const ConnectionEndpointSchema = z.union([
    z.string(),
    z.object({
        elementId: z.string(),
        anchor: AnchorPointSchema.optional().default("auto")
    })
]);
/**
 * First-class connection between elements
 */
export const ConnectionSchema = z.object({
    id: z.string().min(1),
    from: ConnectionEndpointSchema,
    to: ConnectionEndpointSchema,
    type: z.enum(["arrow", "line", "curved", "orthogonal"]).default("arrow"),
    label: z.string().optional(),
    style: ElementStyleSchema.optional().default({}),
    metadata: z.record(z.unknown()).optional().default({})
});
/**
 * Canvas configuration and viewport settings
 */
export const ThemeModeSchema = z.enum(["light", "dark", "neutral"]);
export const CanvasSchema = z.object({
    width: z.number().min(100).default(800),
    height: z.number().min(100).default(600),
    theme: ThemeModeSchema.default("neutral"),
    backgroundColor: z.string().optional(),
    grid: z.boolean().optional().default(false)
});
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
        theme: "neutral"
    }),
    elements: z.array(ElementSchema).default([]),
    connections: z.array(ConnectionSchema).default([]),
    interactions: z.array(InteractionSchema).default([]),
    data: z.record(z.unknown()).optional() // Specialized capability payload (e.g. chart series/categories)
}).passthrough();
//# sourceMappingURL=artifact.js.map