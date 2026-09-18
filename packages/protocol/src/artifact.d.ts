import { z } from "zod";
/**
 * Anchor points on an element bounding box
 */
export declare const AnchorPointSchema: z.ZodEnum<["top", "bottom", "left", "right", "center", "auto"]>;
export type AnchorPoint = z.infer<typeof AnchorPointSchema>;
/**
 * Connection endpoint identifier
 */
export declare const ConnectionEndpointSchema: z.ZodUnion<[z.ZodString, z.ZodObject<{
    elementId: z.ZodString;
    anchor: z.ZodDefault<z.ZodOptional<z.ZodEnum<["top", "bottom", "left", "right", "center", "auto"]>>>;
}, "strip", z.ZodTypeAny, {
    elementId: string;
    anchor: "left" | "center" | "right" | "top" | "bottom" | "auto";
}, {
    elementId: string;
    anchor?: "left" | "center" | "right" | "top" | "bottom" | "auto" | undefined;
}>]>;
export type ConnectionEndpoint = z.infer<typeof ConnectionEndpointSchema>;
/**
 * First-class connection between elements
 */
export declare const ConnectionSchema: z.ZodObject<{
    id: z.ZodString;
    from: z.ZodUnion<[z.ZodString, z.ZodObject<{
        elementId: z.ZodString;
        anchor: z.ZodDefault<z.ZodOptional<z.ZodEnum<["top", "bottom", "left", "right", "center", "auto"]>>>;
    }, "strip", z.ZodTypeAny, {
        elementId: string;
        anchor: "left" | "center" | "right" | "top" | "bottom" | "auto";
    }, {
        elementId: string;
        anchor?: "left" | "center" | "right" | "top" | "bottom" | "auto" | undefined;
    }>]>;
    to: z.ZodUnion<[z.ZodString, z.ZodObject<{
        elementId: z.ZodString;
        anchor: z.ZodDefault<z.ZodOptional<z.ZodEnum<["top", "bottom", "left", "right", "center", "auto"]>>>;
    }, "strip", z.ZodTypeAny, {
        elementId: string;
        anchor: "left" | "center" | "right" | "top" | "bottom" | "auto";
    }, {
        elementId: string;
        anchor?: "left" | "center" | "right" | "top" | "bottom" | "auto" | undefined;
    }>]>;
    type: z.ZodDefault<z.ZodEnum<["arrow", "line", "curved", "orthogonal"]>>;
    label: z.ZodOptional<z.ZodString>;
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
    type: "line" | "arrow" | "curved" | "orthogonal";
    id: string;
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
    from: string | {
        elementId: string;
        anchor: "left" | "center" | "right" | "top" | "bottom" | "auto";
    };
    to: string | {
        elementId: string;
        anchor: "left" | "center" | "right" | "top" | "bottom" | "auto";
    };
    label?: string | undefined;
}, {
    id: string;
    from: string | {
        elementId: string;
        anchor?: "left" | "center" | "right" | "top" | "bottom" | "auto" | undefined;
    };
    to: string | {
        elementId: string;
        anchor?: "left" | "center" | "right" | "top" | "bottom" | "auto" | undefined;
    };
    type?: "line" | "arrow" | "curved" | "orthogonal" | undefined;
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
    label?: string | undefined;
}>;
export type Connection = z.infer<typeof ConnectionSchema>;
/**
 * Canvas configuration and viewport settings
 */
export declare const ThemeModeSchema: z.ZodEnum<["light", "dark", "neutral"]>;
export type ThemeMode = z.infer<typeof ThemeModeSchema>;
export declare const CanvasSchema: z.ZodObject<{
    width: z.ZodDefault<z.ZodNumber>;
    height: z.ZodDefault<z.ZodNumber>;
    theme: z.ZodDefault<z.ZodEnum<["light", "dark", "neutral"]>>;
    backgroundColor: z.ZodOptional<z.ZodString>;
    grid: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, "strip", z.ZodTypeAny, {
    width: number;
    height: number;
    theme: "light" | "dark" | "neutral";
    grid: boolean;
    backgroundColor?: string | undefined;
}, {
    width?: number | undefined;
    height?: number | undefined;
    theme?: "light" | "dark" | "neutral" | undefined;
    backgroundColor?: string | undefined;
    grid?: boolean | undefined;
}>;
export type CanvasConfig = z.infer<typeof CanvasSchema>;
/**
 * Declarative interactive triggers/actions
 */
export declare const InteractionSchema: z.ZodObject<{
    id: z.ZodString;
    trigger: z.ZodEnum<["click", "hover", "change"]>;
    targetId: z.ZodString;
    action: z.ZodEnum<["select", "toggle", "setValue", "custom"]>;
    params: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    trigger: "click" | "hover" | "change";
    targetId: string;
    action: "toggle" | "custom" | "select" | "setValue";
    params?: Record<string, unknown> | undefined;
}, {
    id: string;
    trigger: "click" | "hover" | "change";
    targetId: string;
    action: "toggle" | "custom" | "select" | "setValue";
    params?: Record<string, unknown> | undefined;
}>;
export type Interaction = z.infer<typeof InteractionSchema>;
/**
 * Standard protocol versions
 */
export declare const PROTOCOL_VERSION_1_0 = "1.0";
export declare const ProtocolVersionSchema: z.ZodLiteral<"1.0">;
/**
 * Complete declarative Artifact schema
 */
export declare const ArtifactSchema: z.ZodObject<{
    version: z.ZodDefault<z.ZodLiteral<"1.0">>;
    id: z.ZodString;
    type: z.ZodString;
    metadata: z.ZodDefault<z.ZodObject<{
        title: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        author: z.ZodOptional<z.ZodString>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        title: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        author: z.ZodOptional<z.ZodString>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        title: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        author: z.ZodOptional<z.ZodString>;
    }, z.ZodTypeAny, "passthrough">>>;
    canvas: z.ZodDefault<z.ZodObject<{
        width: z.ZodDefault<z.ZodNumber>;
        height: z.ZodDefault<z.ZodNumber>;
        theme: z.ZodDefault<z.ZodEnum<["light", "dark", "neutral"]>>;
        backgroundColor: z.ZodOptional<z.ZodString>;
        grid: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    }, "strip", z.ZodTypeAny, {
        width: number;
        height: number;
        theme: "light" | "dark" | "neutral";
        grid: boolean;
        backgroundColor?: string | undefined;
    }, {
        width?: number | undefined;
        height?: number | undefined;
        theme?: "light" | "dark" | "neutral" | undefined;
        backgroundColor?: string | undefined;
        grid?: boolean | undefined;
    }>>;
    elements: z.ZodDefault<z.ZodArray<z.ZodObject<{
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
    }>, "many">>;
    connections: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        from: z.ZodUnion<[z.ZodString, z.ZodObject<{
            elementId: z.ZodString;
            anchor: z.ZodDefault<z.ZodOptional<z.ZodEnum<["top", "bottom", "left", "right", "center", "auto"]>>>;
        }, "strip", z.ZodTypeAny, {
            elementId: string;
            anchor: "left" | "center" | "right" | "top" | "bottom" | "auto";
        }, {
            elementId: string;
            anchor?: "left" | "center" | "right" | "top" | "bottom" | "auto" | undefined;
        }>]>;
        to: z.ZodUnion<[z.ZodString, z.ZodObject<{
            elementId: z.ZodString;
            anchor: z.ZodDefault<z.ZodOptional<z.ZodEnum<["top", "bottom", "left", "right", "center", "auto"]>>>;
        }, "strip", z.ZodTypeAny, {
            elementId: string;
            anchor: "left" | "center" | "right" | "top" | "bottom" | "auto";
        }, {
            elementId: string;
            anchor?: "left" | "center" | "right" | "top" | "bottom" | "auto" | undefined;
        }>]>;
        type: z.ZodDefault<z.ZodEnum<["arrow", "line", "curved", "orthogonal"]>>;
        label: z.ZodOptional<z.ZodString>;
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
        type: "line" | "arrow" | "curved" | "orthogonal";
        id: string;
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
        from: string | {
            elementId: string;
            anchor: "left" | "center" | "right" | "top" | "bottom" | "auto";
        };
        to: string | {
            elementId: string;
            anchor: "left" | "center" | "right" | "top" | "bottom" | "auto";
        };
        label?: string | undefined;
    }, {
        id: string;
        from: string | {
            elementId: string;
            anchor?: "left" | "center" | "right" | "top" | "bottom" | "auto" | undefined;
        };
        to: string | {
            elementId: string;
            anchor?: "left" | "center" | "right" | "top" | "bottom" | "auto" | undefined;
        };
        type?: "line" | "arrow" | "curved" | "orthogonal" | undefined;
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
        label?: string | undefined;
    }>, "many">>;
    interactions: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        trigger: z.ZodEnum<["click", "hover", "change"]>;
        targetId: z.ZodString;
        action: z.ZodEnum<["select", "toggle", "setValue", "custom"]>;
        params: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        trigger: "click" | "hover" | "change";
        targetId: string;
        action: "toggle" | "custom" | "select" | "setValue";
        params?: Record<string, unknown> | undefined;
    }, {
        id: string;
        trigger: "click" | "hover" | "change";
        targetId: string;
        action: "toggle" | "custom" | "select" | "setValue";
        params?: Record<string, unknown> | undefined;
    }>, "many">>;
    data: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    version: z.ZodDefault<z.ZodLiteral<"1.0">>;
    id: z.ZodString;
    type: z.ZodString;
    metadata: z.ZodDefault<z.ZodObject<{
        title: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        author: z.ZodOptional<z.ZodString>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        title: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        author: z.ZodOptional<z.ZodString>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        title: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        author: z.ZodOptional<z.ZodString>;
    }, z.ZodTypeAny, "passthrough">>>;
    canvas: z.ZodDefault<z.ZodObject<{
        width: z.ZodDefault<z.ZodNumber>;
        height: z.ZodDefault<z.ZodNumber>;
        theme: z.ZodDefault<z.ZodEnum<["light", "dark", "neutral"]>>;
        backgroundColor: z.ZodOptional<z.ZodString>;
        grid: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    }, "strip", z.ZodTypeAny, {
        width: number;
        height: number;
        theme: "light" | "dark" | "neutral";
        grid: boolean;
        backgroundColor?: string | undefined;
    }, {
        width?: number | undefined;
        height?: number | undefined;
        theme?: "light" | "dark" | "neutral" | undefined;
        backgroundColor?: string | undefined;
        grid?: boolean | undefined;
    }>>;
    elements: z.ZodDefault<z.ZodArray<z.ZodObject<{
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
    }>, "many">>;
    connections: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        from: z.ZodUnion<[z.ZodString, z.ZodObject<{
            elementId: z.ZodString;
            anchor: z.ZodDefault<z.ZodOptional<z.ZodEnum<["top", "bottom", "left", "right", "center", "auto"]>>>;
        }, "strip", z.ZodTypeAny, {
            elementId: string;
            anchor: "left" | "center" | "right" | "top" | "bottom" | "auto";
        }, {
            elementId: string;
            anchor?: "left" | "center" | "right" | "top" | "bottom" | "auto" | undefined;
        }>]>;
        to: z.ZodUnion<[z.ZodString, z.ZodObject<{
            elementId: z.ZodString;
            anchor: z.ZodDefault<z.ZodOptional<z.ZodEnum<["top", "bottom", "left", "right", "center", "auto"]>>>;
        }, "strip", z.ZodTypeAny, {
            elementId: string;
            anchor: "left" | "center" | "right" | "top" | "bottom" | "auto";
        }, {
            elementId: string;
            anchor?: "left" | "center" | "right" | "top" | "bottom" | "auto" | undefined;
        }>]>;
        type: z.ZodDefault<z.ZodEnum<["arrow", "line", "curved", "orthogonal"]>>;
        label: z.ZodOptional<z.ZodString>;
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
        type: "line" | "arrow" | "curved" | "orthogonal";
        id: string;
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
        from: string | {
            elementId: string;
            anchor: "left" | "center" | "right" | "top" | "bottom" | "auto";
        };
        to: string | {
            elementId: string;
            anchor: "left" | "center" | "right" | "top" | "bottom" | "auto";
        };
        label?: string | undefined;
    }, {
        id: string;
        from: string | {
            elementId: string;
            anchor?: "left" | "center" | "right" | "top" | "bottom" | "auto" | undefined;
        };
        to: string | {
            elementId: string;
            anchor?: "left" | "center" | "right" | "top" | "bottom" | "auto" | undefined;
        };
        type?: "line" | "arrow" | "curved" | "orthogonal" | undefined;
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
        label?: string | undefined;
    }>, "many">>;
    interactions: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        trigger: z.ZodEnum<["click", "hover", "change"]>;
        targetId: z.ZodString;
        action: z.ZodEnum<["select", "toggle", "setValue", "custom"]>;
        params: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        trigger: "click" | "hover" | "change";
        targetId: string;
        action: "toggle" | "custom" | "select" | "setValue";
        params?: Record<string, unknown> | undefined;
    }, {
        id: string;
        trigger: "click" | "hover" | "change";
        targetId: string;
        action: "toggle" | "custom" | "select" | "setValue";
        params?: Record<string, unknown> | undefined;
    }>, "many">>;
    data: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    version: z.ZodDefault<z.ZodLiteral<"1.0">>;
    id: z.ZodString;
    type: z.ZodString;
    metadata: z.ZodDefault<z.ZodObject<{
        title: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        author: z.ZodOptional<z.ZodString>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        title: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        author: z.ZodOptional<z.ZodString>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        title: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        author: z.ZodOptional<z.ZodString>;
    }, z.ZodTypeAny, "passthrough">>>;
    canvas: z.ZodDefault<z.ZodObject<{
        width: z.ZodDefault<z.ZodNumber>;
        height: z.ZodDefault<z.ZodNumber>;
        theme: z.ZodDefault<z.ZodEnum<["light", "dark", "neutral"]>>;
        backgroundColor: z.ZodOptional<z.ZodString>;
        grid: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    }, "strip", z.ZodTypeAny, {
        width: number;
        height: number;
        theme: "light" | "dark" | "neutral";
        grid: boolean;
        backgroundColor?: string | undefined;
    }, {
        width?: number | undefined;
        height?: number | undefined;
        theme?: "light" | "dark" | "neutral" | undefined;
        backgroundColor?: string | undefined;
        grid?: boolean | undefined;
    }>>;
    elements: z.ZodDefault<z.ZodArray<z.ZodObject<{
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
    }>, "many">>;
    connections: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        from: z.ZodUnion<[z.ZodString, z.ZodObject<{
            elementId: z.ZodString;
            anchor: z.ZodDefault<z.ZodOptional<z.ZodEnum<["top", "bottom", "left", "right", "center", "auto"]>>>;
        }, "strip", z.ZodTypeAny, {
            elementId: string;
            anchor: "left" | "center" | "right" | "top" | "bottom" | "auto";
        }, {
            elementId: string;
            anchor?: "left" | "center" | "right" | "top" | "bottom" | "auto" | undefined;
        }>]>;
        to: z.ZodUnion<[z.ZodString, z.ZodObject<{
            elementId: z.ZodString;
            anchor: z.ZodDefault<z.ZodOptional<z.ZodEnum<["top", "bottom", "left", "right", "center", "auto"]>>>;
        }, "strip", z.ZodTypeAny, {
            elementId: string;
            anchor: "left" | "center" | "right" | "top" | "bottom" | "auto";
        }, {
            elementId: string;
            anchor?: "left" | "center" | "right" | "top" | "bottom" | "auto" | undefined;
        }>]>;
        type: z.ZodDefault<z.ZodEnum<["arrow", "line", "curved", "orthogonal"]>>;
        label: z.ZodOptional<z.ZodString>;
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
        type: "line" | "arrow" | "curved" | "orthogonal";
        id: string;
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
        from: string | {
            elementId: string;
            anchor: "left" | "center" | "right" | "top" | "bottom" | "auto";
        };
        to: string | {
            elementId: string;
            anchor: "left" | "center" | "right" | "top" | "bottom" | "auto";
        };
        label?: string | undefined;
    }, {
        id: string;
        from: string | {
            elementId: string;
            anchor?: "left" | "center" | "right" | "top" | "bottom" | "auto" | undefined;
        };
        to: string | {
            elementId: string;
            anchor?: "left" | "center" | "right" | "top" | "bottom" | "auto" | undefined;
        };
        type?: "line" | "arrow" | "curved" | "orthogonal" | undefined;
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
        label?: string | undefined;
    }>, "many">>;
    interactions: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        trigger: z.ZodEnum<["click", "hover", "change"]>;
        targetId: z.ZodString;
        action: z.ZodEnum<["select", "toggle", "setValue", "custom"]>;
        params: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        trigger: "click" | "hover" | "change";
        targetId: string;
        action: "toggle" | "custom" | "select" | "setValue";
        params?: Record<string, unknown> | undefined;
    }, {
        id: string;
        trigger: "click" | "hover" | "change";
        targetId: string;
        action: "toggle" | "custom" | "select" | "setValue";
        params?: Record<string, unknown> | undefined;
    }>, "many">>;
    data: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, z.ZodTypeAny, "passthrough">>;
export type ArtifactDefinition = z.infer<typeof ArtifactSchema>;
//# sourceMappingURL=artifact.d.ts.map