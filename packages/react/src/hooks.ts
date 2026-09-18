import { useState, useEffect } from "react";
import type { ArtifactInstance } from "@interactive-artifact/core";
import type { ArtifactEventType, ArtifactEvent } from "@interactive-artifact/protocol";

/**
 * Hook to subscribe to a specific reactive state key on an artifact
 */
export function useArtifactState<T = unknown>(
  artifact: ArtifactInstance,
  key: string,
  defaultValue?: T
): T {
  const [value, setValue] = useState<T>(() => {
    return (artifact.state.get<T>(key) as T) ?? (defaultValue as T);
  });

  useEffect(() => {
    setValue((artifact.state.get<T>(key) as T) ?? (defaultValue as T));
    const unsub = artifact.state.subscribe<T>(key, (newVal) => {
      setValue(newVal);
    });
    return unsub;
  }, [artifact, key, defaultValue]);

  return value;
}

/**
 * Hook to listen to a specific artifact event
 */
export function useArtifactEvent<T extends ArtifactEventType>(
  artifact: ArtifactInstance,
  eventType: T,
  handler: (event: Extract<ArtifactEvent, { type: T }>) => void
): void {
  useEffect(() => {
    const unsub = artifact.events.on(eventType, handler as any);
    return unsub;
  }, [artifact, eventType, handler]);
}

/**
 * Hook to access current selected element ID
 */
export function useArtifactSelection(artifact: ArtifactInstance): string | null {
  return useArtifactState<string | null>(artifact, "selectedElementId", null);
}
