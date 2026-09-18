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
/**
 * 2D coordinate position
 */
export const PositionSchema = z.object({
    x: z.number(),
    y: z.number()
});
/**
 * 2D dimensions
 */
export const SizeSchema = z.object({
    width: z.number().min(0),
    height: z.number().min(0)
});
/**
 * Generic point in 2D space
 */
export const PointSchema = z.object({
    x: z.number(),
    y: z.number()
});
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
    fontSize: z.number().min(6).optional(),
    fontFamily: z.string().optional(),
    fontWeight: z.union([z.string(), z.number()]).optional(),
    textAlign: z.enum(["left", "center", "right"]).optional(),
    textBaseline: z.enum(["top", "middle", "bottom"]).optional(),
    shadow: z.boolean().optional()
}).passthrough();
/**
 * Base element schema shared across all element kinds
 */
export const BaseElementSchema = z.object({
    id: z.string().min(1),
    type: z.string().min(1),
    position: PositionSchema,
    size: SizeSchema,
    props: z.record(z.unknown()).default({}),
    style: ElementStyleSchema.optional().default({}),
    metadata: z.record(z.unknown()).optional().default({})
});
/**
 * Specific typed props for common primitives
 */
export const RectanglePropsSchema = z.object({
    cornerRadius: z.number().optional(),
    label: z.string().optional()
}).passthrough();
export const EllipsePropsSchema = z.object({
    label: z.string().optional()
}).passthrough();
export const LinePropsSchema = z.object({
    points: z.array(PointSchema).optional(),
    curve: z.enum(["straight", "curved", "orthogonal"]).optional()
}).passthrough();
export const TextPropsSchema = z.object({
    text: z.string(),
    autoWrap: z.boolean().optional()
}).passthrough();
export const NodePropsSchema = z.object({
    label: z.string().optional(),
    subLabel: z.string().optional(),
    icon: z.string().optional(),
    shape: z.enum(["rectangle", "pill", "diamond", "cylinder", "circle"]).optional(),
    badge: z.string().optional(),
    status: z.enum(["idle", "active", "success", "warning", "error"]).optional()
}).passthrough();
export const ButtonPropsSchema = z.object({
    label: z.string(),
    variant: z.enum(["primary", "secondary", "danger", "outline"]).optional(),
    actionId: z.string().optional(),
    disabled: z.boolean().optional()
}).passthrough();
export const SliderPropsSchema = z.object({
    min: z.number().default(0),
    max: z.number().default(100),
    step: z.number().default(1),
    value: z.number().default(0),
    name: z.string().optional(),
    label: z.string().optional()
}).passthrough();
export const TogglePropsSchema = z.object({
    checked: z.boolean().default(false),
    label: z.string().optional(),
    name: z.string().optional()
}).passthrough();
export const FreehandPropsSchema = z.object({
    points: z.array(PointSchema),
    closed: z.boolean().optional()
}).passthrough();
/**
 * Fully typed Element schema
 */
export const ElementSchema = BaseElementSchema;
//# sourceMappingURL=elements.js.map