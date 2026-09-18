import { type ArtifactDefinition } from "./artifact.js";
import { type ArtifactPatch } from "./patch.js";
/**
 * Result of artifact validation
 */
export interface ValidationSuccess<T> {
    success: true;
    data: T;
    errors?: never;
}
export interface ValidationErrorDetail {
    path: string;
    message: string;
    code: string;
}
export interface ValidationFailure {
    success: false;
    data?: never;
    errors: ValidationErrorDetail[];
}
export type ValidationResult<T> = ValidationSuccess<T> | ValidationFailure;
/**
 * Validates an unknown input against the Artifact schema, ensuring security constraints.
 */
export declare function validateArtifact(input: unknown): ValidationResult<ArtifactDefinition>;
/**
 * Validates an incremental patch against the ArtifactPatch schema
 */
export declare function validatePatch(input: unknown): ValidationResult<ArtifactPatch>;
/**
 * Type guard for ArtifactDefinition
 */
export declare function isArtifactDefinition(input: unknown): input is ArtifactDefinition;
//# sourceMappingURL=schema.d.ts.map