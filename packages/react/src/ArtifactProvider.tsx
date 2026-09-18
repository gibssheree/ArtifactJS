import React, { useMemo } from "react";
import { ArtifactRuntime } from "@interactive-artifact/core";
import { ArtifactRegistry } from "@interactive-artifact/registry";
import { SVGRenderer, type ArtifactRenderer } from "@interactive-artifact/renderer-svg";
import { ArtifactContext, type ArtifactContextValue } from "./ArtifactContext.js";

export interface ArtifactProviderProps {
  runtime?: ArtifactRuntime;
  registry?: ArtifactRegistry;
  defaultRenderer?: ArtifactRenderer;
  children: React.ReactNode;
}

export const ArtifactProvider: React.FC<ArtifactProviderProps> = ({
  runtime: customRuntime,
  registry: customRegistry,
  defaultRenderer: customRenderer,
  children
}) => {
  const value = useMemo<ArtifactContextValue>(() => {
    const registry = customRegistry ?? new ArtifactRegistry();
    const runtime = customRuntime ?? new ArtifactRuntime();
    const defaultRenderer = customRenderer ?? new SVGRenderer();

    return {
      runtime,
      registry,
      defaultRenderer
    };
  }, [customRuntime, customRegistry, customRenderer]);

  return (
    <ArtifactContext.Provider value={value}>
      {children}
    </ArtifactContext.Provider>
  );
};
