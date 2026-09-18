import { z } from "zod";
/**
 * Patch operation for updating element attributes
 */
export declare const UpdateElementPatchSchema: z.ZodObject<{
    operation: z.ZodLiteral<"update">;
    elementId: z.ZodString;
    changes: z.ZodObject<{
        position: z.ZodOptional<z.ZodObject<{
            x: z.ZodNumber;
            y: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            x: number;
            y: number;
        }, {
            x: number;
            y: number;
        }>>;
        size: z.ZodOptional<z.ZodObject<{
            width: z.ZodNumber;
            height: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            width: number;
            height: number;
        }, {
            width: number;
            height: number;
        }>>;
        props: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        style: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        position: z.ZodOptional<z.ZodObject<{
            x: z.ZodNumber;
            y: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            x: number;
            y: number;
        }, {
            x: number;
            y: number;
        }>>;
        size: z.ZodOptional<z.ZodObject<{
            width: z.ZodNumber;
            height: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            width: number;
            height: number;
        }, {
            width: number;
            height: number;
        }>>;
        props: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        style: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        position: z.ZodOptional<z.ZodObject<{
            x: z.ZodNumber;
            y: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            x: number;
            y: number;
        }, {
            x: number;
            y: number;
        }>>;
        size: z.ZodOptional<z.ZodObject<{
            width: z.ZodNumber;
            height: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            width: number;
            height: number;
        }, {
            width: number;
            height: number;
        }>>;
        props: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        style: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, z.ZodTypeAny, "passthrough">>;
}, "strip", z.ZodTypeAny, {
    elementId: string;
    operation: "update";
    changes: {
        position?: {
            x: number;
            y: number;
        } | undefined;
        size?: {
            width: number;
            height: number;
        } | undefined;
        props?: Record<string, unknown> | undefined;
        style?: Record<string, unknown> | undefined;
        metadata?: Record<string, unknown> | undefined;
    } & {
        [k: string]: unknown;
    };
}, {
    elementId: string;
    operation: "update";
    changes: {
        position?: {
            x: number;
            y: number;
        } | undefined;
        size?: {
            width: number;
            height: number;
        } | undefined;
        props?: Record<string, unknown> | undefined;
        style?: Record<string, unknown> | undefined;
        metadata?: Record<string, unknown> | undefined;
    } & {
        [k: string]: unknown;
    };
}>;
export type UpdateElementPatch = z.infer<typeof UpdateElementPatchSchema>;
/**
 * Convenience patch operation for moving an element
 */
export declare const MoveElementPatchSchema: z.ZodObject<{
    operation: z.ZodLiteral<"move">;
    elementId: z.ZodString;
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
}, "strip", z.ZodTypeAny, {
    position: {
        x: number;
        y: number;
    };
    elementId: string;
    operation: "move";
}, {
    position: {
        x: number;
        y: number;
    };
    elementId: string;
    operation: "move";
}>;
export type MoveElementPatch = z.infer<typeof MoveElementPatchSchema>;
/**
 * Patch operation for inserting a new element
 */
export declare const InsertElementPatchSchema: z.ZodObject<{
    operation: z.ZodLiteral<"insert">;
    element: z.ZodObject<{
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
}, "strip", z.ZodTypeAny, {
    operation: "insert";
    element: {
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
    };
}, {
    operation: "insert";
    element: {
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
    };
}>;
export type InsertElementPatch = z.infer<typeof InsertElementPatchSchema>;
/**
 * Patch operation for removing an element
 */
export declare const RemoveElementPatchSchema: z.ZodObject<{
    operation: z.ZodLiteral<"remove">;
    elementId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    elementId: string;
    operation: "remove";
}, {
    elementId: string;
    operation: "remove";
}>;
export type RemoveElementPatch = z.infer<typeof RemoveElementPatchSchema>;
/**
 * Patch operation for creating a connection
 */
export declare const ConnectPatchSchema: z.ZodObject<{
    operation: z.ZodLiteral<"connect">;
    connection: z.ZodObject<{
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
}, "strip", z.ZodTypeAny, {
    operation: "connect";
    connection: {
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
    };
}, {
    operation: "connect";
    connection: {
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
    };
}>;
export type ConnectPatch = z.infer<typeof ConnectPatchSchema>;
/**
 * Patch operation for deleting a connection
 */
export declare const DisconnectPatchSchema: z.ZodObject<{
    operation: z.ZodLiteral<"disconnect">;
    connectionId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    operation: "disconnect";
    connectionId: string;
}, {
    operation: "disconnect";
    connectionId: string;
}>;
export type DisconnectPatch = z.infer<typeof DisconnectPatchSchema>;
/**
 * Patch operation for modifying canvas properties
 */
export declare const UpdateCanvasPatchSchema: z.ZodObject<{
    operation: z.ZodLiteral<"update_canvas">;
    changes: z.ZodObject<{
        width: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
        height: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
        theme: z.ZodOptional<z.ZodDefault<z.ZodEnum<["light", "dark", "neutral"]>>>;
        backgroundColor: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        grid: z.ZodOptional<z.ZodDefault<z.ZodOptional<z.ZodBoolean>>>;
    }, "strip", z.ZodTypeAny, {
        width?: number | undefined;
        height?: number | undefined;
        theme?: "light" | "dark" | "neutral" | undefined;
        backgroundColor?: string | undefined;
        grid?: boolean | undefined;
    }, {
        width?: number | undefined;
        height?: number | undefined;
        theme?: "light" | "dark" | "neutral" | undefined;
        backgroundColor?: string | undefined;
        grid?: boolean | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    operation: "update_canvas";
    changes: {
        width?: number | undefined;
        height?: number | undefined;
        theme?: "light" | "dark" | "neutral" | undefined;
        backgroundColor?: string | undefined;
        grid?: boolean | undefined;
    };
}, {
    operation: "update_canvas";
    changes: {
        width?: number | undefined;
        height?: number | undefined;
        theme?: "light" | "dark" | "neutral" | undefined;
        backgroundColor?: string | undefined;
        grid?: boolean | undefined;
    };
}>;
export type UpdateCanvasPatch = z.infer<typeof UpdateCanvasPatchSchema>;
/**
 * Atomic single patch
 */
export declare const SingleArtifactPatchSchema: z.ZodDiscriminatedUnion<"operation", [z.ZodObject<{
    operation: z.ZodLiteral<"update">;
    elementId: z.ZodString;
    changes: z.ZodObject<{
        position: z.ZodOptional<z.ZodObject<{
            x: z.ZodNumber;
            y: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            x: number;
            y: number;
        }, {
            x: number;
            y: number;
        }>>;
        size: z.ZodOptional<z.ZodObject<{
            width: z.ZodNumber;
            height: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            width: number;
            height: number;
        }, {
            width: number;
            height: number;
        }>>;
        props: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        style: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        position: z.ZodOptional<z.ZodObject<{
            x: z.ZodNumber;
            y: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            x: number;
            y: number;
        }, {
            x: number;
            y: number;
        }>>;
        size: z.ZodOptional<z.ZodObject<{
            width: z.ZodNumber;
            height: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            width: number;
            height: number;
        }, {
            width: number;
            height: number;
        }>>;
        props: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        style: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        position: z.ZodOptional<z.ZodObject<{
            x: z.ZodNumber;
            y: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            x: number;
            y: number;
        }, {
            x: number;
            y: number;
        }>>;
        size: z.ZodOptional<z.ZodObject<{
            width: z.ZodNumber;
            height: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            width: number;
            height: number;
        }, {
            width: number;
            height: number;
        }>>;
        props: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        style: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, z.ZodTypeAny, "passthrough">>;
}, "strip", z.ZodTypeAny, {
    elementId: string;
    operation: "update";
    changes: {
        position?: {
            x: number;
            y: number;
        } | undefined;
        size?: {
            width: number;
            height: number;
        } | undefined;
        props?: Record<string, unknown> | undefined;
        style?: Record<string, unknown> | undefined;
        metadata?: Record<string, unknown> | undefined;
    } & {
        [k: string]: unknown;
    };
}, {
    elementId: string;
    operation: "update";
    changes: {
        position?: {
            x: number;
            y: number;
        } | undefined;
        size?: {
            width: number;
            height: number;
        } | undefined;
        props?: Record<string, unknown> | undefined;
        style?: Record<string, unknown> | undefined;
        metadata?: Record<string, unknown> | undefined;
    } & {
        [k: string]: unknown;
    };
}>, z.ZodObject<{
    operation: z.ZodLiteral<"move">;
    elementId: z.ZodString;
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
}, "strip", z.ZodTypeAny, {
    position: {
        x: number;
        y: number;
    };
    elementId: string;
    operation: "move";
}, {
    position: {
        x: number;
        y: number;
    };
    elementId: string;
    operation: "move";
}>, z.ZodObject<{
    operation: z.ZodLiteral<"insert">;
    element: z.ZodObject<{
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
}, "strip", z.ZodTypeAny, {
    operation: "insert";
    element: {
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
    };
}, {
    operation: "insert";
    element: {
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
    };
}>, z.ZodObject<{
    operation: z.ZodLiteral<"remove">;
    elementId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    elementId: string;
    operation: "remove";
}, {
    elementId: string;
    operation: "remove";
}>, z.ZodObject<{
    operation: z.ZodLiteral<"connect">;
    connection: z.ZodObject<{
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
}, "strip", z.ZodTypeAny, {
    operation: "connect";
    connection: {
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
    };
}, {
    operation: "connect";
    connection: {
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
    };
}>, z.ZodObject<{
    operation: z.ZodLiteral<"disconnect">;
    connectionId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    operation: "disconnect";
    connectionId: string;
}, {
    operation: "disconnect";
    connectionId: string;
}>, z.ZodObject<{
    operation: z.ZodLiteral<"update_canvas">;
    changes: z.ZodObject<{
        width: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
        height: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
        theme: z.ZodOptional<z.ZodDefault<z.ZodEnum<["light", "dark", "neutral"]>>>;
        backgroundColor: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        grid: z.ZodOptional<z.ZodDefault<z.ZodOptional<z.ZodBoolean>>>;
    }, "strip", z.ZodTypeAny, {
        width?: number | undefined;
        height?: number | undefined;
        theme?: "light" | "dark" | "neutral" | undefined;
        backgroundColor?: string | undefined;
        grid?: boolean | undefined;
    }, {
        width?: number | undefined;
        height?: number | undefined;
        theme?: "light" | "dark" | "neutral" | undefined;
        backgroundColor?: string | undefined;
        grid?: boolean | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    operation: "update_canvas";
    changes: {
        width?: number | undefined;
        height?: number | undefined;
        theme?: "light" | "dark" | "neutral" | undefined;
        backgroundColor?: string | undefined;
        grid?: boolean | undefined;
    };
}, {
    operation: "update_canvas";
    changes: {
        width?: number | undefined;
        height?: number | undefined;
        theme?: "light" | "dark" | "neutral" | undefined;
        backgroundColor?: string | undefined;
        grid?: boolean | undefined;
    };
}>]>;
export type SingleArtifactPatch = z.infer<typeof SingleArtifactPatchSchema>;
/**
 * Batch patch operation for combining multiple atomic updates
 */
export declare const BatchArtifactPatchSchema: z.ZodObject<{
    operation: z.ZodLiteral<"batch">;
    patches: z.ZodArray<z.ZodDiscriminatedUnion<"operation", [z.ZodObject<{
        operation: z.ZodLiteral<"update">;
        elementId: z.ZodString;
        changes: z.ZodObject<{
            position: z.ZodOptional<z.ZodObject<{
                x: z.ZodNumber;
                y: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                x: number;
                y: number;
            }, {
                x: number;
                y: number;
            }>>;
            size: z.ZodOptional<z.ZodObject<{
                width: z.ZodNumber;
                height: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                width: number;
                height: number;
            }, {
                width: number;
                height: number;
            }>>;
            props: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            style: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            position: z.ZodOptional<z.ZodObject<{
                x: z.ZodNumber;
                y: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                x: number;
                y: number;
            }, {
                x: number;
                y: number;
            }>>;
            size: z.ZodOptional<z.ZodObject<{
                width: z.ZodNumber;
                height: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                width: number;
                height: number;
            }, {
                width: number;
                height: number;
            }>>;
            props: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            style: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            position: z.ZodOptional<z.ZodObject<{
                x: z.ZodNumber;
                y: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                x: number;
                y: number;
            }, {
                x: number;
                y: number;
            }>>;
            size: z.ZodOptional<z.ZodObject<{
                width: z.ZodNumber;
                height: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                width: number;
                height: number;
            }, {
                width: number;
                height: number;
            }>>;
            props: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            style: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, z.ZodTypeAny, "passthrough">>;
    }, "strip", z.ZodTypeAny, {
        elementId: string;
        operation: "update";
        changes: {
            position?: {
                x: number;
                y: number;
            } | undefined;
            size?: {
                width: number;
                height: number;
            } | undefined;
            props?: Record<string, unknown> | undefined;
            style?: Record<string, unknown> | undefined;
            metadata?: Record<string, unknown> | undefined;
        } & {
            [k: string]: unknown;
        };
    }, {
        elementId: string;
        operation: "update";
        changes: {
            position?: {
                x: number;
                y: number;
            } | undefined;
            size?: {
                width: number;
                height: number;
            } | undefined;
            props?: Record<string, unknown> | undefined;
            style?: Record<string, unknown> | undefined;
            metadata?: Record<string, unknown> | undefined;
        } & {
            [k: string]: unknown;
        };
    }>, z.ZodObject<{
        operation: z.ZodLiteral<"move">;
        elementId: z.ZodString;
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
    }, "strip", z.ZodTypeAny, {
        position: {
            x: number;
            y: number;
        };
        elementId: string;
        operation: "move";
    }, {
        position: {
            x: number;
            y: number;
        };
        elementId: string;
        operation: "move";
    }>, z.ZodObject<{
        operation: z.ZodLiteral<"insert">;
        element: z.ZodObject<{
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
    }, "strip", z.ZodTypeAny, {
        operation: "insert";
        element: {
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
        };
    }, {
        operation: "insert";
        element: {
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
        };
    }>, z.ZodObject<{
        operation: z.ZodLiteral<"remove">;
        elementId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        elementId: string;
        operation: "remove";
    }, {
        elementId: string;
        operation: "remove";
    }>, z.ZodObject<{
        operation: z.ZodLiteral<"connect">;
        connection: z.ZodObject<{
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
    }, "strip", z.ZodTypeAny, {
        operation: "connect";
        connection: {
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
        };
    }, {
        operation: "connect";
        connection: {
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
        };
    }>, z.ZodObject<{
        operation: z.ZodLiteral<"disconnect">;
        connectionId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        operation: "disconnect";
        connectionId: string;
    }, {
        operation: "disconnect";
        connectionId: string;
    }>, z.ZodObject<{
        operation: z.ZodLiteral<"update_canvas">;
        changes: z.ZodObject<{
            width: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
            height: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
            theme: z.ZodOptional<z.ZodDefault<z.ZodEnum<["light", "dark", "neutral"]>>>;
            backgroundColor: z.ZodOptional<z.ZodOptional<z.ZodString>>;
            grid: z.ZodOptional<z.ZodDefault<z.ZodOptional<z.ZodBoolean>>>;
        }, "strip", z.ZodTypeAny, {
            width?: number | undefined;
            height?: number | undefined;
            theme?: "light" | "dark" | "neutral" | undefined;
            backgroundColor?: string | undefined;
            grid?: boolean | undefined;
        }, {
            width?: number | undefined;
            height?: number | undefined;
            theme?: "light" | "dark" | "neutral" | undefined;
            backgroundColor?: string | undefined;
            grid?: boolean | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        operation: "update_canvas";
        changes: {
            width?: number | undefined;
            height?: number | undefined;
            theme?: "light" | "dark" | "neutral" | undefined;
            backgroundColor?: string | undefined;
            grid?: boolean | undefined;
        };
    }, {
        operation: "update_canvas";
        changes: {
            width?: number | undefined;
            height?: number | undefined;
            theme?: "light" | "dark" | "neutral" | undefined;
            backgroundColor?: string | undefined;
            grid?: boolean | undefined;
        };
    }>]>, "many">;
}, "strip", z.ZodTypeAny, {
    operation: "batch";
    patches: ({
        elementId: string;
        operation: "update";
        changes: {
            position?: {
                x: number;
                y: number;
            } | undefined;
            size?: {
                width: number;
                height: number;
            } | undefined;
            props?: Record<string, unknown> | undefined;
            style?: Record<string, unknown> | undefined;
            metadata?: Record<string, unknown> | undefined;
        } & {
            [k: string]: unknown;
        };
    } | {
        position: {
            x: number;
            y: number;
        };
        elementId: string;
        operation: "move";
    } | {
        operation: "insert";
        element: {
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
        };
    } | {
        elementId: string;
        operation: "remove";
    } | {
        operation: "connect";
        connection: {
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
        };
    } | {
        operation: "disconnect";
        connectionId: string;
    } | {
        operation: "update_canvas";
        changes: {
            width?: number | undefined;
            height?: number | undefined;
            theme?: "light" | "dark" | "neutral" | undefined;
            backgroundColor?: string | undefined;
            grid?: boolean | undefined;
        };
    })[];
}, {
    operation: "batch";
    patches: ({
        elementId: string;
        operation: "update";
        changes: {
            position?: {
                x: number;
                y: number;
            } | undefined;
            size?: {
                width: number;
                height: number;
            } | undefined;
            props?: Record<string, unknown> | undefined;
            style?: Record<string, unknown> | undefined;
            metadata?: Record<string, unknown> | undefined;
        } & {
            [k: string]: unknown;
        };
    } | {
        position: {
            x: number;
            y: number;
        };
        elementId: string;
        operation: "move";
    } | {
        operation: "insert";
        element: {
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
        };
    } | {
        elementId: string;
        operation: "remove";
    } | {
        operation: "connect";
        connection: {
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
        };
    } | {
        operation: "disconnect";
        connectionId: string;
    } | {
        operation: "update_canvas";
        changes: {
            width?: number | undefined;
            height?: number | undefined;
            theme?: "light" | "dark" | "neutral" | undefined;
            backgroundColor?: string | undefined;
            grid?: boolean | undefined;
        };
    })[];
}>;
export type BatchArtifactPatch = z.infer<typeof BatchArtifactPatchSchema>;
/**
 * Any valid patch
 */
export declare const ArtifactPatchSchema: z.ZodUnion<[z.ZodDiscriminatedUnion<"operation", [z.ZodObject<{
    operation: z.ZodLiteral<"update">;
    elementId: z.ZodString;
    changes: z.ZodObject<{
        position: z.ZodOptional<z.ZodObject<{
            x: z.ZodNumber;
            y: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            x: number;
            y: number;
        }, {
            x: number;
            y: number;
        }>>;
        size: z.ZodOptional<z.ZodObject<{
            width: z.ZodNumber;
            height: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            width: number;
            height: number;
        }, {
            width: number;
            height: number;
        }>>;
        props: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        style: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        position: z.ZodOptional<z.ZodObject<{
            x: z.ZodNumber;
            y: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            x: number;
            y: number;
        }, {
            x: number;
            y: number;
        }>>;
        size: z.ZodOptional<z.ZodObject<{
            width: z.ZodNumber;
            height: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            width: number;
            height: number;
        }, {
            width: number;
            height: number;
        }>>;
        props: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        style: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        position: z.ZodOptional<z.ZodObject<{
            x: z.ZodNumber;
            y: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            x: number;
            y: number;
        }, {
            x: number;
            y: number;
        }>>;
        size: z.ZodOptional<z.ZodObject<{
            width: z.ZodNumber;
            height: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            width: number;
            height: number;
        }, {
            width: number;
            height: number;
        }>>;
        props: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        style: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, z.ZodTypeAny, "passthrough">>;
}, "strip", z.ZodTypeAny, {
    elementId: string;
    operation: "update";
    changes: {
        position?: {
            x: number;
            y: number;
        } | undefined;
        size?: {
            width: number;
            height: number;
        } | undefined;
        props?: Record<string, unknown> | undefined;
        style?: Record<string, unknown> | undefined;
        metadata?: Record<string, unknown> | undefined;
    } & {
        [k: string]: unknown;
    };
}, {
    elementId: string;
    operation: "update";
    changes: {
        position?: {
            x: number;
            y: number;
        } | undefined;
        size?: {
            width: number;
            height: number;
        } | undefined;
        props?: Record<string, unknown> | undefined;
        style?: Record<string, unknown> | undefined;
        metadata?: Record<string, unknown> | undefined;
    } & {
        [k: string]: unknown;
    };
}>, z.ZodObject<{
    operation: z.ZodLiteral<"move">;
    elementId: z.ZodString;
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
}, "strip", z.ZodTypeAny, {
    position: {
        x: number;
        y: number;
    };
    elementId: string;
    operation: "move";
}, {
    position: {
        x: number;
        y: number;
    };
    elementId: string;
    operation: "move";
}>, z.ZodObject<{
    operation: z.ZodLiteral<"insert">;
    element: z.ZodObject<{
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
}, "strip", z.ZodTypeAny, {
    operation: "insert";
    element: {
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
    };
}, {
    operation: "insert";
    element: {
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
    };
}>, z.ZodObject<{
    operation: z.ZodLiteral<"remove">;
    elementId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    elementId: string;
    operation: "remove";
}, {
    elementId: string;
    operation: "remove";
}>, z.ZodObject<{
    operation: z.ZodLiteral<"connect">;
    connection: z.ZodObject<{
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
}, "strip", z.ZodTypeAny, {
    operation: "connect";
    connection: {
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
    };
}, {
    operation: "connect";
    connection: {
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
    };
}>, z.ZodObject<{
    operation: z.ZodLiteral<"disconnect">;
    connectionId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    operation: "disconnect";
    connectionId: string;
}, {
    operation: "disconnect";
    connectionId: string;
}>, z.ZodObject<{
    operation: z.ZodLiteral<"update_canvas">;
    changes: z.ZodObject<{
        width: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
        height: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
        theme: z.ZodOptional<z.ZodDefault<z.ZodEnum<["light", "dark", "neutral"]>>>;
        backgroundColor: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        grid: z.ZodOptional<z.ZodDefault<z.ZodOptional<z.ZodBoolean>>>;
    }, "strip", z.ZodTypeAny, {
        width?: number | undefined;
        height?: number | undefined;
        theme?: "light" | "dark" | "neutral" | undefined;
        backgroundColor?: string | undefined;
        grid?: boolean | undefined;
    }, {
        width?: number | undefined;
        height?: number | undefined;
        theme?: "light" | "dark" | "neutral" | undefined;
        backgroundColor?: string | undefined;
        grid?: boolean | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    operation: "update_canvas";
    changes: {
        width?: number | undefined;
        height?: number | undefined;
        theme?: "light" | "dark" | "neutral" | undefined;
        backgroundColor?: string | undefined;
        grid?: boolean | undefined;
    };
}, {
    operation: "update_canvas";
    changes: {
        width?: number | undefined;
        height?: number | undefined;
        theme?: "light" | "dark" | "neutral" | undefined;
        backgroundColor?: string | undefined;
        grid?: boolean | undefined;
    };
}>]>, z.ZodObject<{
    operation: z.ZodLiteral<"batch">;
    patches: z.ZodArray<z.ZodDiscriminatedUnion<"operation", [z.ZodObject<{
        operation: z.ZodLiteral<"update">;
        elementId: z.ZodString;
        changes: z.ZodObject<{
            position: z.ZodOptional<z.ZodObject<{
                x: z.ZodNumber;
                y: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                x: number;
                y: number;
            }, {
                x: number;
                y: number;
            }>>;
            size: z.ZodOptional<z.ZodObject<{
                width: z.ZodNumber;
                height: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                width: number;
                height: number;
            }, {
                width: number;
                height: number;
            }>>;
            props: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            style: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            position: z.ZodOptional<z.ZodObject<{
                x: z.ZodNumber;
                y: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                x: number;
                y: number;
            }, {
                x: number;
                y: number;
            }>>;
            size: z.ZodOptional<z.ZodObject<{
                width: z.ZodNumber;
                height: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                width: number;
                height: number;
            }, {
                width: number;
                height: number;
            }>>;
            props: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            style: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            position: z.ZodOptional<z.ZodObject<{
                x: z.ZodNumber;
                y: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                x: number;
                y: number;
            }, {
                x: number;
                y: number;
            }>>;
            size: z.ZodOptional<z.ZodObject<{
                width: z.ZodNumber;
                height: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                width: number;
                height: number;
            }, {
                width: number;
                height: number;
            }>>;
            props: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            style: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, z.ZodTypeAny, "passthrough">>;
    }, "strip", z.ZodTypeAny, {
        elementId: string;
        operation: "update";
        changes: {
            position?: {
                x: number;
                y: number;
            } | undefined;
            size?: {
                width: number;
                height: number;
            } | undefined;
            props?: Record<string, unknown> | undefined;
            style?: Record<string, unknown> | undefined;
            metadata?: Record<string, unknown> | undefined;
        } & {
            [k: string]: unknown;
        };
    }, {
        elementId: string;
        operation: "update";
        changes: {
            position?: {
                x: number;
                y: number;
            } | undefined;
            size?: {
                width: number;
                height: number;
            } | undefined;
            props?: Record<string, unknown> | undefined;
            style?: Record<string, unknown> | undefined;
            metadata?: Record<string, unknown> | undefined;
        } & {
            [k: string]: unknown;
        };
    }>, z.ZodObject<{
        operation: z.ZodLiteral<"move">;
        elementId: z.ZodString;
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
    }, "strip", z.ZodTypeAny, {
        position: {
            x: number;
            y: number;
        };
        elementId: string;
        operation: "move";
    }, {
        position: {
            x: number;
            y: number;
        };
        elementId: string;
        operation: "move";
    }>, z.ZodObject<{
        operation: z.ZodLiteral<"insert">;
        element: z.ZodObject<{
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
    }, "strip", z.ZodTypeAny, {
        operation: "insert";
        element: {
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
        };
    }, {
        operation: "insert";
        element: {
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
        };
    }>, z.ZodObject<{
        operation: z.ZodLiteral<"remove">;
        elementId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        elementId: string;
        operation: "remove";
    }, {
        elementId: string;
        operation: "remove";
    }>, z.ZodObject<{
        operation: z.ZodLiteral<"connect">;
        connection: z.ZodObject<{
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
    }, "strip", z.ZodTypeAny, {
        operation: "connect";
        connection: {
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
        };
    }, {
        operation: "connect";
        connection: {
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
        };
    }>, z.ZodObject<{
        operation: z.ZodLiteral<"disconnect">;
        connectionId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        operation: "disconnect";
        connectionId: string;
    }, {
        operation: "disconnect";
        connectionId: string;
    }>, z.ZodObject<{
        operation: z.ZodLiteral<"update_canvas">;
        changes: z.ZodObject<{
            width: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
            height: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
            theme: z.ZodOptional<z.ZodDefault<z.ZodEnum<["light", "dark", "neutral"]>>>;
            backgroundColor: z.ZodOptional<z.ZodOptional<z.ZodString>>;
            grid: z.ZodOptional<z.ZodDefault<z.ZodOptional<z.ZodBoolean>>>;
        }, "strip", z.ZodTypeAny, {
            width?: number | undefined;
            height?: number | undefined;
            theme?: "light" | "dark" | "neutral" | undefined;
            backgroundColor?: string | undefined;
            grid?: boolean | undefined;
        }, {
            width?: number | undefined;
            height?: number | undefined;
            theme?: "light" | "dark" | "neutral" | undefined;
            backgroundColor?: string | undefined;
            grid?: boolean | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        operation: "update_canvas";
        changes: {
            width?: number | undefined;
            height?: number | undefined;
            theme?: "light" | "dark" | "neutral" | undefined;
            backgroundColor?: string | undefined;
            grid?: boolean | undefined;
        };
    }, {
        operation: "update_canvas";
        changes: {
            width?: number | undefined;
            height?: number | undefined;
            theme?: "light" | "dark" | "neutral" | undefined;
            backgroundColor?: string | undefined;
            grid?: boolean | undefined;
        };
    }>]>, "many">;
}, "strip", z.ZodTypeAny, {
    operation: "batch";
    patches: ({
        elementId: string;
        operation: "update";
        changes: {
            position?: {
                x: number;
                y: number;
            } | undefined;
            size?: {
                width: number;
                height: number;
            } | undefined;
            props?: Record<string, unknown> | undefined;
            style?: Record<string, unknown> | undefined;
            metadata?: Record<string, unknown> | undefined;
        } & {
            [k: string]: unknown;
        };
    } | {
        position: {
            x: number;
            y: number;
        };
        elementId: string;
        operation: "move";
    } | {
        operation: "insert";
        element: {
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
        };
    } | {
        elementId: string;
        operation: "remove";
    } | {
        operation: "connect";
        connection: {
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
        };
    } | {
        operation: "disconnect";
        connectionId: string;
    } | {
        operation: "update_canvas";
        changes: {
            width?: number | undefined;
            height?: number | undefined;
            theme?: "light" | "dark" | "neutral" | undefined;
            backgroundColor?: string | undefined;
            grid?: boolean | undefined;
        };
    })[];
}, {
    operation: "batch";
    patches: ({
        elementId: string;
        operation: "update";
        changes: {
            position?: {
                x: number;
                y: number;
            } | undefined;
            size?: {
                width: number;
                height: number;
            } | undefined;
            props?: Record<string, unknown> | undefined;
            style?: Record<string, unknown> | undefined;
            metadata?: Record<string, unknown> | undefined;
        } & {
            [k: string]: unknown;
        };
    } | {
        position: {
            x: number;
            y: number;
        };
        elementId: string;
        operation: "move";
    } | {
        operation: "insert";
        element: {
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
        };
    } | {
        elementId: string;
        operation: "remove";
    } | {
        operation: "connect";
        connection: {
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
        };
    } | {
        operation: "disconnect";
        connectionId: string;
    } | {
        operation: "update_canvas";
        changes: {
            width?: number | undefined;
            height?: number | undefined;
            theme?: "light" | "dark" | "neutral" | undefined;
            backgroundColor?: string | undefined;
            grid?: boolean | undefined;
        };
    })[];
}>]>;
export type ArtifactPatch = z.infer<typeof ArtifactPatchSchema>;
//# sourceMappingURL=patch.d.ts.map