import { z } from "zod";
/**
 * Supported core element primitive types
 */
export declare const ElementTypeSchema: z.ZodEnum<["rectangle", "ellipse", "line", "arrow", "text", "node", "group", "connector", "button", "slider", "toggle", "freehand"]>;
export type ElementType = z.infer<typeof ElementTypeSchema>;
/**
 * 2D coordinate position
 */
export declare const PositionSchema: z.ZodObject<{
    x: z.ZodNumber;
    y: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    x: number;
    y: number;
}, {
    x: number;
    y: number;
}>;
export type Position = z.infer<typeof PositionSchema>;
/**
 * 2D dimensions
 */
export declare const SizeSchema: z.ZodObject<{
    width: z.ZodNumber;
    height: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    width: number;
    height: number;
}, {
    width: number;
    height: number;
}>;
export type Size = z.infer<typeof SizeSchema>;
/**
 * Generic point in 2D space
 */
export declare const PointSchema: z.ZodObject<{
    x: z.ZodNumber;
    y: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    x: number;
    y: number;
}, {
    x: number;
    y: number;
}>;
export type Point = z.infer<typeof PointSchema>;
/**
 * Styling attributes for visual presentation
 */
export declare const ElementStyleSchema: z.ZodObject<{
    fill: z.ZodOptional<z.ZodString>;
    stroke: z.ZodOptional<z.ZodString>;
    strokeWidth: z.ZodOptional<z.ZodNumber>;
    strokeDasharray: z.ZodOptional<z.ZodString>;
    radius: z.ZodOptional<z.ZodNumber>;
    opacity: z.ZodOptional<z.ZodNumber>;
    roughness: z.ZodOptional<z.ZodNumber>;
    bowing: z.ZodOptional<z.ZodNumber>;
    color: z.ZodOptional<z.ZodString>;
    fontSize: z.ZodOptional<z.ZodNumber>;
    fontFamily: z.ZodOptional<z.ZodString>;
    fontWeight: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
    textAlign: z.ZodOptional<z.ZodEnum<["left", "center", "right"]>>;
    textBaseline: z.ZodOptional<z.ZodEnum<["top", "middle", "bottom"]>>;
    shadow: z.ZodOptional<z.ZodBoolean>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    fill: z.ZodOptional<z.ZodString>;
    stroke: z.ZodOptional<z.ZodString>;
    strokeWidth: z.ZodOptional<z.ZodNumber>;
    strokeDasharray: z.ZodOptional<z.ZodString>;
    radius: z.ZodOptional<z.ZodNumber>;
    opacity: z.ZodOptional<z.ZodNumber>;
    roughness: z.ZodOptional<z.ZodNumber>;
    bowing: z.ZodOptional<z.ZodNumber>;
    color: z.ZodOptional<z.ZodString>;
    fontSize: z.ZodOptional<z.ZodNumber>;
    fontFamily: z.ZodOptional<z.ZodString>;
    fontWeight: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
    textAlign: z.ZodOptional<z.ZodEnum<["left", "center", "right"]>>;
    textBaseline: z.ZodOptional<z.ZodEnum<["top", "middle", "bottom"]>>;
    shadow: z.ZodOptional<z.ZodBoolean>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    fill: z.ZodOptional<z.ZodString>;
    stroke: z.ZodOptional<z.ZodString>;
    strokeWidth: z.ZodOptional<z.ZodNumber>;
    strokeDasharray: z.ZodOptional<z.ZodString>;
    radius: z.ZodOptional<z.ZodNumber>;
    opacity: z.ZodOptional<z.ZodNumber>;
    roughness: z.ZodOptional<z.ZodNumber>;
    bowing: z.ZodOptional<z.ZodNumber>;
    color: z.ZodOptional<z.ZodString>;
    fontSize: z.ZodOptional<z.ZodNumber>;
    fontFamily: z.ZodOptional<z.ZodString>;
    fontWeight: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
    textAlign: z.ZodOptional<z.ZodEnum<["left", "center", "right"]>>;
    textBaseline: z.ZodOptional<z.ZodEnum<["top", "middle", "bottom"]>>;
    shadow: z.ZodOptional<z.ZodBoolean>;
}, z.ZodTypeAny, "passthrough">>;
export type ElementStyle = z.infer<typeof ElementStyleSchema>;
/**
 * Base element schema shared across all element kinds
 */
export declare const BaseElementSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodString;
    position: z.ZodObject<{
        x: z.ZodNumber;
        y: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        x: number;
        y: number;
    }, {
        x: number;
        y: number;
    }>;
    size: z.ZodObject<{
        width: z.ZodNumber;
        height: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        width: number;
        height: number;
    }, {
        width: number;
        height: number;
    }>;
    props: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    style: z.ZodDefault<z.ZodOptional<z.ZodObject<{
        fill: z.ZodOptional<z.ZodString>;
        stroke: z.ZodOptional<z.ZodString>;
        strokeWidth: z.ZodOptional<z.ZodNumber>;
        strokeDasharray: z.ZodOptional<z.ZodString>;
        radius: z.ZodOptional<z.ZodNumber>;
        opacity: z.ZodOptional<z.ZodNumber>;
        roughness: z.ZodOptional<z.ZodNumber>;
        bowing: z.ZodOptional<z.ZodNumber>;
        color: z.ZodOptional<z.ZodString>;
        fontSize: z.ZodOptional<z.ZodNumber>;
        fontFamily: z.ZodOptional<z.ZodString>;
        fontWeight: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
        textAlign: z.ZodOptional<z.ZodEnum<["left", "center", "right"]>>;
        textBaseline: z.ZodOptional<z.ZodEnum<["top", "middle", "bottom"]>>;
        shadow: z.ZodOptional<z.ZodBoolean>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        fill: z.ZodOptional<z.ZodString>;
        stroke: z.ZodOptional<z.ZodString>;
        strokeWidth: z.ZodOptional<z.ZodNumber>;
        strokeDasharray: z.ZodOptional<z.ZodString>;
        radius: z.ZodOptional<z.ZodNumber>;
        opacity: z.ZodOptional<z.ZodNumber>;
        roughness: z.ZodOptional<z.ZodNumber>;
        bowing: z.ZodOptional<z.ZodNumber>;
        color: z.ZodOptional<z.ZodString>;
        fontSize: z.ZodOptional<z.ZodNumber>;
        fontFamily: z.ZodOptional<z.ZodString>;
        fontWeight: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
        textAlign: z.ZodOptional<z.ZodEnum<["left", "center", "right"]>>;
        textBaseline: z.ZodOptional<z.ZodEnum<["top", "middle", "bottom"]>>;
        shadow: z.ZodOptional<z.ZodBoolean>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        fill: z.ZodOptional<z.ZodString>;
        stroke: z.ZodOptional<z.ZodString>;
        strokeWidth: z.ZodOptional<z.ZodNumber>;
        strokeDasharray: z.ZodOptional<z.ZodString>;
        radius: z.ZodOptional<z.ZodNumber>;
        opacity: z.ZodOptional<z.ZodNumber>;
        roughness: z.ZodOptional<z.ZodNumber>;
        bowing: z.ZodOptional<z.ZodNumber>;
        color: z.ZodOptional<z.ZodString>;
        fontSize: z.ZodOptional<z.ZodNumber>;
        fontFamily: z.ZodOptional<z.ZodString>;
        fontWeight: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
        textAlign: z.ZodOptional<z.ZodEnum<["left", "center", "right"]>>;
        textBaseline: z.ZodOptional<z.ZodEnum<["top", "middle", "bottom"]>>;
        shadow: z.ZodOptional<z.ZodBoolean>;
    }, z.ZodTypeAny, "passthrough">>>>;
    metadata: z.ZodDefault<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
}, "strip", z.ZodTypeAny, {
    type: string;
    id: string;
    position: {
        x: number;
        y: number;
    };
    size: {
        width: number;
        height: number;
    };
    props: Record<string, unknown>;
    style: {
        fill?: string | undefined;
        stroke?: string | undefined;
        strokeWidth?: number | undefined;
        strokeDasharray?: string | undefined;
        radius?: number | undefined;
        opacity?: number | undefined;
        roughness?: number | undefined;
        bowing?: number | undefined;
        color?: string | undefined;
        fontSize?: number | undefined;
        fontFamily?: string | undefined;
        fontWeight?: string | number | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        textBaseline?: "top" | "middle" | "bottom" | undefined;
        shadow?: boolean | undefined;
    } & {
        [k: string]: unknown;
    };
    metadata: Record<string, unknown>;
}, {
    type: string;
    id: string;
    position: {
        x: number;
        y: number;
    };
    size: {
        width: number;
        height: number;
    };
    props?: Record<string, unknown> | undefined;
    style?: z.objectInputType<{
        fill: z.ZodOptional<z.ZodString>;
        stroke: z.ZodOptional<z.ZodString>;
        strokeWidth: z.ZodOptional<z.ZodNumber>;
        strokeDasharray: z.ZodOptional<z.ZodString>;
        radius: z.ZodOptional<z.ZodNumber>;
        opacity: z.ZodOptional<z.ZodNumber>;
        roughness: z.ZodOptional<z.ZodNumber>;
        bowing: z.ZodOptional<z.ZodNumber>;
        color: z.ZodOptional<z.ZodString>;
        fontSize: z.ZodOptional<z.ZodNumber>;
        fontFamily: z.ZodOptional<z.ZodString>;
        fontWeight: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
        textAlign: z.ZodOptional<z.ZodEnum<["left", "center", "right"]>>;
        textBaseline: z.ZodOptional<z.ZodEnum<["top", "middle", "bottom"]>>;
        shadow: z.ZodOptional<z.ZodBoolean>;
    }, z.ZodTypeAny, "passthrough"> | undefined;
    metadata?: Record<string, unknown> | undefined;
}>;
export type BaseElement = z.infer<typeof BaseElementSchema>;
/**
 * Specific typed props for common primitives
 */
export declare const RectanglePropsSchema: z.ZodObject<{
    cornerRadius: z.ZodOptional<z.ZodNumber>;
    label: z.ZodOptional<z.ZodString>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    cornerRadius: z.ZodOptional<z.ZodNumber>;
    label: z.ZodOptional<z.ZodString>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    cornerRadius: z.ZodOptional<z.ZodNumber>;
    label: z.ZodOptional<z.ZodString>;
}, z.ZodTypeAny, "passthrough">>;
export declare const EllipsePropsSchema: z.ZodObject<{
    label: z.ZodOptional<z.ZodString>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    label: z.ZodOptional<z.ZodString>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    label: z.ZodOptional<z.ZodString>;
}, z.ZodTypeAny, "passthrough">>;
export declare const LinePropsSchema: z.ZodObject<{
    points: z.ZodOptional<z.ZodArray<z.ZodObject<{
        x: z.ZodNumber;
        y: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        x: number;
        y: number;
    }, {
        x: number;
        y: number;
    }>, "many">>;
    curve: z.ZodOptional<z.ZodEnum<["straight", "curved", "orthogonal"]>>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    points: z.ZodOptional<z.ZodArray<z.ZodObject<{
        x: z.ZodNumber;
        y: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        x: number;
        y: number;
    }, {
        x: number;
        y: number;
    }>, "many">>;
    curve: z.ZodOptional<z.ZodEnum<["straight", "curved", "orthogonal"]>>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    points: z.ZodOptional<z.ZodArray<z.ZodObject<{
        x: z.ZodNumber;
        y: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        x: number;
        y: number;
    }, {
        x: number;
        y: number;
    }>, "many">>;
    curve: z.ZodOptional<z.ZodEnum<["straight", "curved", "orthogonal"]>>;
}, z.ZodTypeAny, "passthrough">>;
export declare const TextPropsSchema: z.ZodObject<{
    text: z.ZodString;
    autoWrap: z.ZodOptional<z.ZodBoolean>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    text: z.ZodString;
    autoWrap: z.ZodOptional<z.ZodBoolean>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    text: z.ZodString;
    autoWrap: z.ZodOptional<z.ZodBoolean>;
}, z.ZodTypeAny, "passthrough">>;
export declare const NodePropsSchema: z.ZodObject<{
    label: z.ZodOptional<z.ZodString>;
    subLabel: z.ZodOptional<z.ZodString>;
    icon: z.ZodOptional<z.ZodString>;
    shape: z.ZodOptional<z.ZodEnum<["rectangle", "pill", "diamond", "cylinder", "circle"]>>;
    badge: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<["idle", "active", "success", "warning", "error"]>>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    label: z.ZodOptional<z.ZodString>;
    subLabel: z.ZodOptional<z.ZodString>;
    icon: z.ZodOptional<z.ZodString>;
    shape: z.ZodOptional<z.ZodEnum<["rectangle", "pill", "diamond", "cylinder", "circle"]>>;
    badge: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<["idle", "active", "success", "warning", "error"]>>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    label: z.ZodOptional<z.ZodString>;
    subLabel: z.ZodOptional<z.ZodString>;
    icon: z.ZodOptional<z.ZodString>;
    shape: z.ZodOptional<z.ZodEnum<["rectangle", "pill", "diamond", "cylinder", "circle"]>>;
    badge: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<["idle", "active", "success", "warning", "error"]>>;
}, z.ZodTypeAny, "passthrough">>;
export declare const ButtonPropsSchema: z.ZodObject<{
    label: z.ZodString;
    variant: z.ZodOptional<z.ZodEnum<["primary", "secondary", "danger", "outline"]>>;
    actionId: z.ZodOptional<z.ZodString>;
    disabled: z.ZodOptional<z.ZodBoolean>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    label: z.ZodString;
    variant: z.ZodOptional<z.ZodEnum<["primary", "secondary", "danger", "outline"]>>;
    actionId: z.ZodOptional<z.ZodString>;
    disabled: z.ZodOptional<z.ZodBoolean>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    label: z.ZodString;
    variant: z.ZodOptional<z.ZodEnum<["primary", "secondary", "danger", "outline"]>>;
    actionId: z.ZodOptional<z.ZodString>;
    disabled: z.ZodOptional<z.ZodBoolean>;
}, z.ZodTypeAny, "passthrough">>;
export declare const SliderPropsSchema: z.ZodObject<{
    min: z.ZodDefault<z.ZodNumber>;
    max: z.ZodDefault<z.ZodNumber>;
    step: z.ZodDefault<z.ZodNumber>;
    value: z.ZodDefault<z.ZodNumber>;
    name: z.ZodOptional<z.ZodString>;
    label: z.ZodOptional<z.ZodString>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    min: z.ZodDefault<z.ZodNumber>;
    max: z.ZodDefault<z.ZodNumber>;
    step: z.ZodDefault<z.ZodNumber>;
    value: z.ZodDefault<z.ZodNumber>;
    name: z.ZodOptional<z.ZodString>;
    label: z.ZodOptional<z.ZodString>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    min: z.ZodDefault<z.ZodNumber>;
    max: z.ZodDefault<z.ZodNumber>;
    step: z.ZodDefault<z.ZodNumber>;
    value: z.ZodDefault<z.ZodNumber>;
    name: z.ZodOptional<z.ZodString>;
    label: z.ZodOptional<z.ZodString>;
}, z.ZodTypeAny, "passthrough">>;
export declare const TogglePropsSchema: z.ZodObject<{
    checked: z.ZodDefault<z.ZodBoolean>;
    label: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    checked: z.ZodDefault<z.ZodBoolean>;
    label: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    checked: z.ZodDefault<z.ZodBoolean>;
    label: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
}, z.ZodTypeAny, "passthrough">>;
export declare const FreehandPropsSchema: z.ZodObject<{
    points: z.ZodArray<z.ZodObject<{
        x: z.ZodNumber;
        y: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        x: number;
        y: number;
    }, {
        x: number;
        y: number;
    }>, "many">;
    closed: z.ZodOptional<z.ZodBoolean>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    points: z.ZodArray<z.ZodObject<{
        x: z.ZodNumber;
        y: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        x: number;
        y: number;
    }, {
        x: number;
        y: number;
    }>, "many">;
    closed: z.ZodOptional<z.ZodBoolean>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    points: z.ZodArray<z.ZodObject<{
        x: z.ZodNumber;
        y: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        x: number;
        y: number;
    }, {
        x: number;
        y: number;
    }>, "many">;
    closed: z.ZodOptional<z.ZodBoolean>;
}, z.ZodTypeAny, "passthrough">>;
/**
 * Fully typed Element schema
 */
export declare const ElementSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodString;
    position: z.ZodObject<{
        x: z.ZodNumber;
        y: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        x: number;
        y: number;
    }, {
        x: number;
        y: number;
    }>;
    size: z.ZodObject<{
        width: z.ZodNumber;
        height: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        width: number;
        height: number;
    }, {
        width: number;
        height: number;
    }>;
    props: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    style: z.ZodDefault<z.ZodOptional<z.ZodObject<{
        fill: z.ZodOptional<z.ZodString>;
        stroke: z.ZodOptional<z.ZodString>;
        strokeWidth: z.ZodOptional<z.ZodNumber>;
        strokeDasharray: z.ZodOptional<z.ZodString>;
        radius: z.ZodOptional<z.ZodNumber>;
        opacity: z.ZodOptional<z.ZodNumber>;
        roughness: z.ZodOptional<z.ZodNumber>;
        bowing: z.ZodOptional<z.ZodNumber>;
        color: z.ZodOptional<z.ZodString>;
        fontSize: z.ZodOptional<z.ZodNumber>;
        fontFamily: z.ZodOptional<z.ZodString>;
        fontWeight: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
        textAlign: z.ZodOptional<z.ZodEnum<["left", "center", "right"]>>;
        textBaseline: z.ZodOptional<z.ZodEnum<["top", "middle", "bottom"]>>;
        shadow: z.ZodOptional<z.ZodBoolean>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        fill: z.ZodOptional<z.ZodString>;
        stroke: z.ZodOptional<z.ZodString>;
        strokeWidth: z.ZodOptional<z.ZodNumber>;
        strokeDasharray: z.ZodOptional<z.ZodString>;
        radius: z.ZodOptional<z.ZodNumber>;
        opacity: z.ZodOptional<z.ZodNumber>;
        roughness: z.ZodOptional<z.ZodNumber>;
        bowing: z.ZodOptional<z.ZodNumber>;
        color: z.ZodOptional<z.ZodString>;
        fontSize: z.ZodOptional<z.ZodNumber>;
        fontFamily: z.ZodOptional<z.ZodString>;
        fontWeight: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
        textAlign: z.ZodOptional<z.ZodEnum<["left", "center", "right"]>>;
        textBaseline: z.ZodOptional<z.ZodEnum<["top", "middle", "bottom"]>>;
        shadow: z.ZodOptional<z.ZodBoolean>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        fill: z.ZodOptional<z.ZodString>;
        stroke: z.ZodOptional<z.ZodString>;
        strokeWidth: z.ZodOptional<z.ZodNumber>;
        strokeDasharray: z.ZodOptional<z.ZodString>;
        radius: z.ZodOptional<z.ZodNumber>;
        opacity: z.ZodOptional<z.ZodNumber>;
        roughness: z.ZodOptional<z.ZodNumber>;
        bowing: z.ZodOptional<z.ZodNumber>;
        color: z.ZodOptional<z.ZodString>;
        fontSize: z.ZodOptional<z.ZodNumber>;
        fontFamily: z.ZodOptional<z.ZodString>;
        fontWeight: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
        textAlign: z.ZodOptional<z.ZodEnum<["left", "center", "right"]>>;
        textBaseline: z.ZodOptional<z.ZodEnum<["top", "middle", "bottom"]>>;
        shadow: z.ZodOptional<z.ZodBoolean>;
    }, z.ZodTypeAny, "passthrough">>>>;
    metadata: z.ZodDefault<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
}, "strip", z.ZodTypeAny, {
    type: string;
    id: string;
    position: {
        x: number;
        y: number;
    };
    size: {
        width: number;
        height: number;
    };
    props: Record<string, unknown>;
    style: {
        fill?: string | undefined;
        stroke?: string | undefined;
        strokeWidth?: number | undefined;
        strokeDasharray?: string | undefined;
        radius?: number | undefined;
        opacity?: number | undefined;
        roughness?: number | undefined;
        bowing?: number | undefined;
        color?: string | undefined;
        fontSize?: number | undefined;
        fontFamily?: string | undefined;
        fontWeight?: string | number | undefined;
        textAlign?: "left" | "center" | "right" | undefined;
        textBaseline?: "top" | "middle" | "bottom" | undefined;
        shadow?: boolean | undefined;
    } & {
        [k: string]: unknown;
    };
    metadata: Record<string, unknown>;
}, {
    type: string;
    id: string;
    position: {
        x: number;
        y: number;
    };
    size: {
        width: number;
        height: number;
    };
    props?: Record<string, unknown> | undefined;
    style?: z.objectInputType<{
        fill: z.ZodOptional<z.ZodString>;
        stroke: z.ZodOptional<z.ZodString>;
        strokeWidth: z.ZodOptional<z.ZodNumber>;
        strokeDasharray: z.ZodOptional<z.ZodString>;
        radius: z.ZodOptional<z.ZodNumber>;
        opacity: z.ZodOptional<z.ZodNumber>;
        roughness: z.ZodOptional<z.ZodNumber>;
        bowing: z.ZodOptional<z.ZodNumber>;
        color: z.ZodOptional<z.ZodString>;
        fontSize: z.ZodOptional<z.ZodNumber>;
        fontFamily: z.ZodOptional<z.ZodString>;
        fontWeight: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
        textAlign: z.ZodOptional<z.ZodEnum<["left", "center", "right"]>>;
        textBaseline: z.ZodOptional<z.ZodEnum<["top", "middle", "bottom"]>>;
        shadow: z.ZodOptional<z.ZodBoolean>;
    }, z.ZodTypeAny, "passthrough"> | undefined;
    metadata?: Record<string, unknown> | undefined;
}>;
export type ArtifactElement = z.infer<typeof ElementSchema>;
//# sourceMappingURL=elements.d.ts.map