import { z } from "zod";
import { ArtifactSchema, type ArtifactDefinition } from "./artifact.js";
import { ArtifactPatchSchema, type ArtifactPatch } from "./patch.js";

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

function containsDangerousPattern(value: unknown): boolean {
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
export function validateArtifact(input: unknown): ValidationResult<ArtifactDefinition> {
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
    data: result.data as ArtifactDefinition
  };
}

/**
 * Validates an incremental patch against the ArtifactPatch schema
 */
export function validatePatch(input: unknown): ValidationResult<ArtifactPatch> {
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
    data: result.data as ArtifactPatch
  };
}

/**
 * Type guard for ArtifactDefinition
 */
export function isArtifactDefinition(input: unknown): input is ArtifactDefinition {
  return ArtifactSchema.safeParse(input).success;
}
