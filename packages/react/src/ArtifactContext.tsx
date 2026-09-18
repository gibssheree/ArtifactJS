import { createContext, useContext } from "react";
import type { ArtifactRuntime } from "@interactive-artifact/core";
import type { ArtifactRegistry } from "@interactive-artifact/registry";
import type { ArtifactRenderer } from "@interactive-artifact/renderer-svg";

export interface ArtifactContextValue {
  runtime: ArtifactRuntime;
  registry: ArtifactRegistry;
  defaultRenderer: ArtifactRenderer;
}

export const ArtifactContext = createContext<ArtifactContextValue | null>(null);

export function useArtifactContext(): ArtifactContextValue {
  const ctx = useContext(ArtifactContext);
  if (!ctx) {
    throw new Error("useArtifactContext must be used within an <ArtifactProvider>");
  }
  return ctx;
}
