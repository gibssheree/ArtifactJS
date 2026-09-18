import React, { useEffect, useRef, useMemo } from "react";
import {
  ArtifactInstance,
  type RendererInstance
} from "@interactive-artifact/core";
import type { ArtifactDefinition, ArtifactEvent } from "@interactive-artifact/protocol";
import type { ArtifactRenderer as ArtifactRendererEngine, RendererOptions } from "@interactive-artifact/renderer-svg";
import { useArtifactContext } from "./ArtifactContext.js";

export interface ArtifactRendererProps {
  artifact: ArtifactInstance | ArtifactDefinition;
  renderer?: ArtifactRendererEngine;
  options?: RendererOptions;
  onEvent?: (event: ArtifactEvent) => void;
  className?: string;
  style?: React.CSSProperties;
}

export const ArtifactRenderer: React.FC<ArtifactRendererProps> = ({
  artifact: inputArtifact,
  renderer: customRenderer,
  options,
  onEvent,
  className = "",
  style
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererInstanceRef = useRef<RendererInstance | null>(null);
  let contextValue;
  try {
    contextValue = useArtifactContext();
  } catch {
    // Allows usage without provider by falling back to defaults
    contextValue = null;
  }

  // Convert definition to instance if needed
  const instance = useMemo<ArtifactInstance>(() => {
    if (inputArtifact instanceof ArtifactInstance) {
      return inputArtifact;
    }
    if (contextValue?.runtime) {
      return contextValue.runtime.create(inputArtifact);
    }
    return new ArtifactInstance(inputArtifact);
  }, [inputArtifact, contextValue?.runtime]);

  // Hook global event listener
  useEffect(() => {
    if (!onEvent) return;
    const unsub = instance.events.onAny(onEvent);
    return unsub;
  }, [instance, onEvent]);

  // Mount to DOM container
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = customRenderer ?? contextValue?.defaultRenderer;
    if (!renderer) {
      throw new Error("No renderer available to mount artifact");
    }

    container.innerHTML = "";
    const mountedInstance = renderer.mount(instance, container, options);
    rendererInstanceRef.current = mountedInstance;

    return () => {
      mountedInstance.destroy();
      rendererInstanceRef.current = null;
      container.innerHTML = "";
    };
  }, [instance, customRenderer, contextValue?.defaultRenderer, options]);

  return (
    <div
      ref={containerRef}
      className={`artifact-renderer-container ${className}`}
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        ...style
      }}
    />
  );
};
