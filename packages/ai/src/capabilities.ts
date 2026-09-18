import type { ArtifactRegistry } from "@interactive-artifact/registry";

export interface CapabilitySummary {
  id: string;
  name: string;
  description: string;
  tags: string[];
  primitives: string[];
  interactions: string[];
}

/**
 * Extracts a concise summary of registered capabilities for LLM prompt context
 */
export function extractCapabilitySummaries(registry: ArtifactRegistry): CapabilitySummary[] {
  return registry.list().map(cap => ({
    id: cap.id,
    name: cap.name,
    description: cap.description,
    tags: cap.tags,
    primitives: cap.primitives,
    interactions: cap.interactions
  }));
}
