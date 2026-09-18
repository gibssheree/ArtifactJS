import type { CapabilityDefinition } from "./capability.js";
import { resolveCapabilities } from "./resolver.js";

/**
 * Registry storing and indexing available artifact capabilities
 */
export class ArtifactRegistry {
  private capabilities = new Map<string, CapabilityDefinition>();

  /**
   * Registers a new capability into the registry
   */
  public register(capability: CapabilityDefinition): void {
    if (this.capabilities.has(capability.id)) {
      console.warn(`[ArtifactRegistry] Overwriting capability "${capability.id}"`);
    }
    this.capabilities.set(capability.id, capability);
  }

  /**
   * Retrieves a capability by ID
   */
  public get(id: string): CapabilityDefinition | undefined {
    return this.capabilities.get(id);
  }

  /**
   * Checks if a capability ID exists
   */
  public has(id: string): boolean {
    return this.capabilities.has(id);
  }

  /**
   * Lists all registered capabilities
   */
  public list(): CapabilityDefinition[] {
    return Array.from(this.capabilities.values());
  }

  /**
   * Performs semantic / keyword discovery on registered capabilities
   */
  public search(query: string): CapabilityDefinition[] {
    return resolveCapabilities(this.list(), query);
  }

  /**
   * Unregisters a capability
   */
  public unregister(id: string): boolean {
    return this.capabilities.delete(id);
  }

  /**
   * Clears all registered capabilities
   */
  public clear(): void {
    this.capabilities.clear();
  }
}
