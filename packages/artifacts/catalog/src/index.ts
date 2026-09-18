import type { CapabilityDefinition, ArtifactRegistry } from "@interactive-artifact/registry";

export * from "./nodegraph.js";
export * from "./architecture.js";
export * from "./erd.js";
export * from "./mindmap.js";
export * from "./sequence.js";
export * from "./timeline.js";
export * from "./orghierarchy.js";
export * from "./workflow.js";
export * from "./dashboard.js";
export * from "./table.js";
export * from "./form.js";

import { nodeGraphCapability } from "./nodegraph.js";
import { architectureCapability } from "./architecture.js";
import { erdCapability } from "./erd.js";
import { mindMapCapability } from "./mindmap.js";
import { sequenceCapability } from "./sequence.js";
import { timelineCapability } from "./timeline.js";
import { orgHierarchyCapability } from "./orghierarchy.js";
import { workflowCapability } from "./workflow.js";
import { dashboardCapability } from "./dashboard.js";
import { tableCapability } from "./table.js";
import { formCapability } from "./form.js";

export const CATALOG_CAPABILITIES: CapabilityDefinition[] = [
  nodeGraphCapability,
  architectureCapability,
  erdCapability,
  mindMapCapability,
  sequenceCapability,
  timelineCapability,
  orgHierarchyCapability,
  workflowCapability,
  dashboardCapability,
  tableCapability,
  formCapability
];

/**
 * Convenience helper to register all catalog capabilities into an ArtifactRegistry
 */
export function registerCatalogCapabilities(registry: ArtifactRegistry): void {
  for (const cap of CATALOG_CAPABILITIES) {
    registry.register(cap);
  }
}
