import { ArtifactSchema } from "./artifact.js";
import { ArtifactPatchSchema } from "./patch.js";
/**
 * Checks for dangerous injection patterns (script tags, javascript: uris, etc.)
 */
const DANGEROUS_PATTERNS = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /javascript:/gi,
    /vbscript:/gi,
    /data:text\/html/gi,
    /onload\s*=/gi,
    /onerror\s*=/gi
];
function containsDangerousPattern(value) {
    if (typeof value === "string") {
        for (const pattern of DANGEROUS_PATTERNS) {
            if (pattern.test(value)) {
                return true;
            }
        }
        return false;
    }
    if (value && typeof value === "object") {
        for (const val of Object.values(value)) {
            if (containsDangerousPattern(val)) {
                return true;
            }
        }
    }
    return false;
}
/**
 * Validates an unknown input against the Artifact schema, ensuring security constraints.
 */
export function validateArtifact(input) {
    if (containsDangerousPattern(input)) {
        return {
            success: false,
            errors: [
                {
                    path: "root",
                    message: "Input contains potentially dangerous content or disallowed protocol URI",
                    code: "security_violation"
                }
            ]
        };
    }
    const result = ArtifactSchema.safeParse(input);
    if (!result.success) {
        return {
            success: false,
            errors: result.error.errors.map(err => ({
                path: err.path.join("."),
                message: err.message,
                code: err.code
            }))
        };
    }
    return {
        success: true,
        data: result.data
    };
}
/**
 * Validates an incremental patch against the ArtifactPatch schema
 */
export function validatePatch(input) {
    if (containsDangerousPattern(input)) {
        return {
            success: false,
            errors: [
                {
                    path: "root",
                    message: "Patch contains potentially dangerous content",
                    code: "security_violation"
                }
            ]
        };
    }
    const result = ArtifactPatchSchema.safeParse(input);
    if (!result.success) {
        return {
            success: false,
            errors: result.error.errors.map(err => ({
                path: err.path.join("."),
                message: err.message,
                code: err.code
            }))
        };
    }
    return {
        success: true,
        data: result.data
    };
}
/**
 * Type guard for ArtifactDefinition
 */
export function isArtifactDefinition(input) {
    return ArtifactSchema.safeParse(input).success;
}
//# sourceMappingURL=schema.js.map