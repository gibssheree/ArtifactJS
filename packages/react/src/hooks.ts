import { useState, useEffect, useCallback } from "react";
import type { ArtifactInstance, ComponentTree } from "@interactive-artifact/core";
import type {
  ArtifactEventType,
  ArtifactEvent,
  MicroComponent,
  Port,
  ArtifactElement
} from "@interactive-artifact/protocol";

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
 * Hook to access current selected element or node ID
 */
export function useArtifactSelection(artifact: ArtifactInstance): string | null {
  return useArtifactState<string | null>(artifact, "selectedElementId", null);
}

/**
 * Hook to access the ComponentTree of an artifact
 */
export function useArtifactTree(artifact: ArtifactInstance): ComponentTree {
  const [, setVersion] = useState(0);

  useEffect(() => {
    const unsub = artifact.events.on("artifact.updated", () => {
      setVersion(v => v + 1);
    });
    return unsub;
  }, [artifact]);

  return artifact.tree;
}

/**
 * Hook to get and observe a micro-component
 */
export function useComponent(artifact: ArtifactInstance, componentId: string): MicroComponent | undefined {
  const [comp, setComp] = useState<MicroComponent | undefined>(() => artifact.getComponent(componentId));

  useEffect(() => {
    setComp(artifact.getComponent(componentId));
    const unsub = artifact.events.on("artifact.updated", () => {
      setComp(artifact.getComponent(componentId));
    });
    return unsub;
  }, [artifact, componentId]);

  return comp;
}

/**
 * Hook to get and observe a port
 */
export function usePort(artifact: ArtifactInstance, portId: string, nodeId?: string): Port | undefined {
  const [port, setPort] = useState<Port | undefined>(() => artifact.getPort(portId, nodeId));

  useEffect(() => {
    setPort(artifact.getPort(portId, nodeId));
    const unsub = artifact.events.on("artifact.updated", () => {
      setPort(artifact.getPort(portId, nodeId));
    });
    return unsub;
  }, [artifact, portId, nodeId]);

  return port;
}

/**
 * Hook for multi-level component state
 */
export function useComponentState<T = unknown>(
  artifact: ArtifactInstance,
  componentId: string,
  key: string,
  defaultValue?: T
): [T, (val: T) => void] {
  const fullKey = `component.${componentId}.${key}`;
  const value = useArtifactState<T>(artifact, fullKey, defaultValue);

  const setter = useCallback((val: T) => {
    artifact.setComponentState(componentId, key, val);
  }, [artifact, componentId, key]);

  return [value, setter];
}

/**
 * Hook for multi-level port state
 */
export function usePortState<T = unknown>(
  artifact: ArtifactInstance,
  portId: string,
  key: string,
  defaultValue?: T
): [T, (val: T) => void] {
  const fullKey = `port.${portId}.${key}`;
  const value = useArtifactState<T>(artifact, fullKey, defaultValue);

  const setter = useCallback((val: T) => {
    artifact.setPortState(portId, key, val);
  }, [artifact, portId, key]);

  return [value, setter];
}
