import { z } from "zod";
/**
 * Event emitted when an artifact is instantiated
 */
export declare const ArtifactCreatedEventSchema: z.ZodObject<{
    type: z.ZodLiteral<"artifact.created">;
    artifactId: z.ZodString;
    timestamp: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    type: "artifact.created";
    artifactId: string;
    timestamp: number;
}, {
    type: "artifact.created";
    artifactId: string;
    timestamp: number;
}>;
export type ArtifactCreatedEvent = z.infer<typeof ArtifactCreatedEventSchema>;
/**
 * Event emitted when an artifact definition or elements change
 */
export declare const ArtifactUpdatedEventSchema: z.ZodObject<{
    type: z.ZodLiteral<"artifact.updated">;
    artifactId: z.ZodString;
    operation: z.ZodString;
    details: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    timestamp: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    type: "artifact.updated";
    operation: string;
    artifactId: string;
    timestamp: number;
    details?: Record<string, unknown> | undefined;
}, {
    type: "artifact.updated";
    operation: string;
    artifactId: string;
    timestamp: number;
    details?: Record<string, unknown> | undefined;
}>;
export type ArtifactUpdatedEvent = z.infer<typeof ArtifactUpdatedEventSchema>;
/**
 * Event emitted when an element is clicked
 */
export declare const ElementClickedEventSchema: z.ZodObject<{
    type: z.ZodLiteral<"element.clicked">;
    artifactId: z.ZodString;
    elementId: z.ZodString;
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
    altKey: z.ZodOptional<z.ZodBoolean>;
    shiftKey: z.ZodOptional<z.ZodBoolean>;
    timestamp: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    type: "element.clicked";
    elementId: string;
    artifactId: string;
    timestamp: number;
    position?: {
        x: number;
        y: number;
    } | undefined;
    altKey?: boolean | undefined;
    shiftKey?: boolean | undefined;
}, {
    type: "element.clicked";
    elementId: string;
    artifactId: string;
    timestamp: number;
    position?: {
        x: number;
        y: number;
    } | undefined;
    altKey?: boolean | undefined;
    shiftKey?: boolean | undefined;
}>;
export type ElementClickedEvent = z.infer<typeof ElementClickedEventSchema>;
/**
 * Event emitted when mouse hovers over an element
 */
export declare const ElementHoveredEventSchema: z.ZodObject<{
    type: z.ZodLiteral<"element.hovered">;
    artifactId: z.ZodString;
    elementId: z.ZodNullable<z.ZodString>;
    timestamp: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    type: "element.hovered";
    elementId: string | null;
    artifactId: string;
    timestamp: number;
}, {
    type: "element.hovered";
    elementId: string | null;
    artifactId: string;
    timestamp: number;
}>;
export type ElementHoveredEvent = z.infer<typeof ElementHoveredEventSchema>;
/**
 * Event emitted when an element is selected or unselected
 */
export declare const ElementSelectedEventSchema: z.ZodObject<{
    type: z.ZodLiteral<"element.selected">;
    artifactId: z.ZodString;
    elementId: z.ZodNullable<z.ZodString>;
    selectedIds: z.ZodArray<z.ZodString, "many">;
    timestamp: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    type: "element.selected";
    elementId: string | null;
    artifactId: string;
    timestamp: number;
    selectedIds: string[];
}, {
    type: "element.selected";
    elementId: string | null;
    artifactId: string;
    timestamp: number;
    selectedIds: string[];
}>;
export type ElementSelectedEvent = z.infer<typeof ElementSelectedEventSchema>;
/**
 * Event emitted when an element is moved / dragged
 */
export declare const ElementMovedEventSchema: z.ZodObject<{
    type: z.ZodLiteral<"element.moved">;
    artifactId: z.ZodString;
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
    previousPosition: z.ZodOptional<z.ZodObject<{
        x: z.ZodNumber;
        y: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        x: number;
        y: number;
    }, {
        x: number;
        y: number;
    }>>;
    timestamp: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    type: "element.moved";
    position: {
        x: number;
        y: number;
    };
    elementId: string;
    artifactId: string;
    timestamp: number;
    previousPosition?: {
        x: number;
        y: number;
    } | undefined;
}, {
    type: "element.moved";
    position: {
        x: number;
        y: number;
    };
    elementId: string;
    artifactId: string;
    timestamp: number;
    previousPosition?: {
        x: number;
        y: number;
    } | undefined;
}>;
export type ElementMovedEvent = z.infer<typeof ElementMovedEventSchema>;
/**
 * Event emitted when an element is resized
 */
export declare const ElementResizedEventSchema: z.ZodObject<{
    type: z.ZodLiteral<"element.resized">;
    artifactId: z.ZodString;
    elementId: z.ZodString;
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
    previousSize: z.ZodOptional<z.ZodObject<{
        width: z.ZodNumber;
        height: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        width: number;
        height: number;
    }, {
        width: number;
        height: number;
    }>>;
    timestamp: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    type: "element.resized";
    size: {
        width: number;
        height: number;
    };
    elementId: string;
    artifactId: string;
    timestamp: number;
    previousSize?: {
        width: number;
        height: number;
    } | undefined;
}, {
    type: "element.resized";
    size: {
        width: number;
        height: number;
    };
    elementId: string;
    artifactId: string;
    timestamp: number;
    previousSize?: {
        width: number;
        height: number;
    } | undefined;
}>;
export type ElementResizedEvent = z.infer<typeof ElementResizedEventSchema>;
/**
 * Event emitted when an element is deleted
 */
export declare const ElementDeletedEventSchema: z.ZodObject<{
    type: z.ZodLiteral<"element.deleted">;
    artifactId: z.ZodString;
    elementId: z.ZodString;
    timestamp: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    type: "element.deleted";
    elementId: string;
    artifactId: string;
    timestamp: number;
}, {
    type: "element.deleted";
    elementId: string;
    artifactId: string;
    timestamp: number;
}>;
export type ElementDeletedEvent = z.infer<typeof ElementDeletedEventSchema>;
/**
 * Event emitted when a connection is established
 */
export declare const ConnectionCreatedEventSchema: z.ZodObject<{
    type: z.ZodLiteral<"connection.created">;
    artifactId: z.ZodString;
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
    timestamp: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    type: "connection.created";
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
    artifactId: string;
    timestamp: number;
}, {
    type: "connection.created";
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
    artifactId: string;
    timestamp: number;
}>;
export type ConnectionCreatedEvent = z.infer<typeof ConnectionCreatedEventSchema>;
/**
 * Event emitted when a connection is removed
 */
export declare const ConnectionDeletedEventSchema: z.ZodObject<{
    type: z.ZodLiteral<"connection.deleted">;
    artifactId: z.ZodString;
    connectionId: z.ZodString;
    timestamp: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    type: "connection.deleted";
    connectionId: string;
    artifactId: string;
    timestamp: number;
}, {
    type: "connection.deleted";
    connectionId: string;
    artifactId: string;
    timestamp: number;
}>;
export type ConnectionDeletedEvent = z.infer<typeof ConnectionDeletedEventSchema>;
/**
 * Event emitted when reactive runtime state changes
 */
export declare const StateChangedEventSchema: z.ZodObject<{
    type: z.ZodLiteral<"state.changed">;
    artifactId: z.ZodString;
    key: z.ZodString;
    value: z.ZodUnknown;
    previousValue: z.ZodOptional<z.ZodUnknown>;
    timestamp: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    type: "state.changed";
    artifactId: string;
    timestamp: number;
    key: string;
    value?: unknown;
    previousValue?: unknown;
}, {
    type: "state.changed";
    artifactId: string;
    timestamp: number;
    key: string;
    value?: unknown;
    previousValue?: unknown;
}>;
export type StateChangedEvent = z.infer<typeof StateChangedEventSchema>;
/**
 * Discriminated union of all artifact runtime events
 */
export declare const ArtifactEventSchema: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
    type: z.ZodLiteral<"artifact.created">;
    artifactId: z.ZodString;
    timestamp: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    type: "artifact.created";
    artifactId: string;
    timestamp: number;
}, {
    type: "artifact.created";
    artifactId: string;
    timestamp: number;
}>, z.ZodObject<{
    type: z.ZodLiteral<"artifact.updated">;
    artifactId: z.ZodString;
    operation: z.ZodString;
    details: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    timestamp: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    type: "artifact.updated";
    operation: string;
    artifactId: string;
    timestamp: number;
    details?: Record<string, unknown> | undefined;
}, {
    type: "artifact.updated";
    operation: string;
    artifactId: string;
    timestamp: number;
    details?: Record<string, unknown> | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"element.clicked">;
    artifactId: z.ZodString;
    elementId: z.ZodString;
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
    altKey: z.ZodOptional<z.ZodBoolean>;
    shiftKey: z.ZodOptional<z.ZodBoolean>;
    timestamp: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    type: "element.clicked";
    elementId: string;
    artifactId: string;
    timestamp: number;
    position?: {
        x: number;
        y: number;
    } | undefined;
    altKey?: boolean | undefined;
    shiftKey?: boolean | undefined;
}, {
    type: "element.clicked";
    elementId: string;
    artifactId: string;
    timestamp: number;
    position?: {
        x: number;
        y: number;
    } | undefined;
    altKey?: boolean | undefined;
    shiftKey?: boolean | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"element.hovered">;
    artifactId: z.ZodString;
    elementId: z.ZodNullable<z.ZodString>;
    timestamp: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    type: "element.hovered";
    elementId: string | null;
    artifactId: string;
    timestamp: number;
}, {
    type: "element.hovered";
    elementId: string | null;
    artifactId: string;
    timestamp: number;
}>, z.ZodObject<{
    type: z.ZodLiteral<"element.selected">;
    artifactId: z.ZodString;
    elementId: z.ZodNullable<z.ZodString>;
    selectedIds: z.ZodArray<z.ZodString, "many">;
    timestamp: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    type: "element.selected";
    elementId: string | null;
    artifactId: string;
    timestamp: number;
    selectedIds: string[];
}, {
    type: "element.selected";
    elementId: string | null;
    artifactId: string;
    timestamp: number;
    selectedIds: string[];
}>, z.ZodObject<{
    type: z.ZodLiteral<"element.moved">;
    artifactId: z.ZodString;
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
    previousPosition: z.ZodOptional<z.ZodObject<{
        x: z.ZodNumber;
        y: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        x: number;
        y: number;
    }, {
        x: number;
        y: number;
    }>>;
    timestamp: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    type: "element.moved";
    position: {
        x: number;
        y: number;
    };
    elementId: string;
    artifactId: string;
    timestamp: number;
    previousPosition?: {
        x: number;
        y: number;
    } | undefined;
}, {
    type: "element.moved";
    position: {
        x: number;
        y: number;
    };
    elementId: string;
    artifactId: string;
    timestamp: number;
    previousPosition?: {
        x: number;
        y: number;
    } | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"element.resized">;
    artifactId: z.ZodString;
    elementId: z.ZodString;
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
    previousSize: z.ZodOptional<z.ZodObject<{
        width: z.ZodNumber;
        height: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        width: number;
        height: number;
    }, {
        width: number;
        height: number;
    }>>;
    timestamp: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    type: "element.resized";
    size: {
        width: number;
        height: number;
    };
    elementId: string;
    artifactId: string;
    timestamp: number;
    previousSize?: {
        width: number;
        height: number;
    } | undefined;
}, {
    type: "element.resized";
    size: {
        width: number;
        height: number;
    };
    elementId: string;
    artifactId: string;
    timestamp: number;
    previousSize?: {
        width: number;
        height: number;
    } | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"element.deleted">;
    artifactId: z.ZodString;
    elementId: z.ZodString;
    timestamp: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    type: "element.deleted";
    elementId: string;
    artifactId: string;
    timestamp: number;
}, {
    type: "element.deleted";
    elementId: string;
    artifactId: string;
    timestamp: number;
}>, z.ZodObject<{
    type: z.ZodLiteral<"connection.created">;
    artifactId: z.ZodString;
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
    timestamp: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    type: "connection.created";
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
    artifactId: string;
    timestamp: number;
}, {
    type: "connection.created";
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
    artifactId: string;
    timestamp: number;
}>, z.ZodObject<{
    type: z.ZodLiteral<"connection.deleted">;
    artifactId: z.ZodString;
    connectionId: z.ZodString;
    timestamp: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    type: "connection.deleted";
    connectionId: string;
    artifactId: string;
    timestamp: number;
}, {
    type: "connection.deleted";
    connectionId: string;
    artifactId: string;
    timestamp: number;
}>, z.ZodObject<{
    type: z.ZodLiteral<"state.changed">;
    artifactId: z.ZodString;
    key: z.ZodString;
    value: z.ZodUnknown;
    previousValue: z.ZodOptional<z.ZodUnknown>;
    timestamp: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    type: "state.changed";
    artifactId: string;
    timestamp: number;
    key: string;
    value?: unknown;
    previousValue?: unknown;
}, {
    type: "state.changed";
    artifactId: string;
    timestamp: number;
    key: string;
    value?: unknown;
    previousValue?: unknown;
}>]>;
export type ArtifactEvent = z.infer<typeof ArtifactEventSchema>;
export type ArtifactEventType = ArtifactEvent["type"];
//# sourceMappingURL=events.d.ts.map