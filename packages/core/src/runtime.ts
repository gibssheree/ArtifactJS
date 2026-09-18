import {
  type ArtifactDefinition,
  type ValidationResult,
  validateArtifact
} from "@interactive-artifact/protocol";
import { ArtifactInstance } from "./artifact.js";

export interface ArtifactRuntimeOptions {
  maxArtifacts?: number;
}

/**
 * Top-level runtime coordinator for managing interactive artifact instances
 */
export class ArtifactRuntime {
  private artifacts = new Map<string, ArtifactInstance>();
  private options: ArtifactRuntimeOptions;

  constructor(options: ArtifactRuntimeOptions = {}) {
    this.options = options;
  }

  /**
   * Validates an unknown artifact input against the protocol
   */
  public validate(raw: unknown): ValidationResult<ArtifactDefinition> {
    return validateArtifact(raw);
  }

  /**
   * Creates and initializes a new reactive ArtifactInstance
   */
  public create(raw: unknown): ArtifactInstance {
    const result = this.validate(raw);
    if (!result.success) {
      const errorSummary = result.errors
        .map(e => `${e.path || "root"}: ${e.message}`)
        .join("; ");
      throw new Error(`Cannot create artifact: validation failed [${errorSummary}]`);
    }

    const definition = result.data;

    // Clean up existing artifact with same ID if present
    if (this.artifacts.has(definition.id)) {
      this.destroy(definition.id);
    }

    const instance = new ArtifactInstance(definition);
    this.artifacts.set(definition.id, instance);

    return instance;
  }

  /**
   * Retrieves an active artifact by ID
   */
  public get(id: string): ArtifactInstance | undefined {
    return this.artifacts.get(id);
  }

  /**
   * Checks if an artifact ID is active in runtime
   */
  public has(id: string): boolean {
    return this.artifacts.has(id);
  }

  /**
   * Lists all active artifact instances
   */
  public list(): ArtifactInstance[] {
    return Array.from(this.artifacts.values());
  }

  /**
   * Destroys an active artifact and frees its resources
   */
  public destroy(id: string): boolean {
    const instance = this.artifacts.get(id);
    if (!instance) return false;

    instance.destroy();
    return this.artifacts.delete(id);
  }

  /**
   * Destroys all active artifacts
   */
  public clear(): void {
    for (const [id] of this.artifacts) {
      this.destroy(id);
    }
  }
}
