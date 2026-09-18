import { z } from "zod";
import type { ArtifactDefinition } from "@interactive-artifact/protocol";
import type { ArtifactRenderer } from "@interactive-artifact/core";

export const CapabilityDefinitionSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  version: z.string().default("1.0"),
  description: z.string().min(1),
  tags: z.array(z.string()).default([]),
  primitives: z.array(z.string()).default([]),
  interactions: z.array(z.string()).default([]),
  defaultProps: z.record(z.unknown()).optional().default({}),
  sampleArtifact: z.custom<ArtifactDefinition>().optional()
});

export interface CapabilityDefinition<TArtifact extends ArtifactDefinition = ArtifactDefinition> {
  id: string;
  name: string;
  version: string;
  description: string;
  tags: string[];
  primitives: string[];
  interactions: string[];
  schema?: z.ZodType<any>;
  renderer?: ArtifactRenderer;
  defaultProps?: Record<string, unknown>;
  sampleArtifact?: TArtifact;
}
