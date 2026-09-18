import type {
  ArtifactDefinition,
  ArtifactPatch,
  ArtifactElement,
  Connection
} from "@interactive-artifact/protocol";
import type { EventBus } from "./events.js";

/**
 * Applies an incremental patch to an ArtifactDefinition, optionally notifying an EventBus.
 * Returns the updated ArtifactDefinition.
 */
export function applyPatchToDefinition(
  definition: ArtifactDefinition,
  patch: ArtifactPatch,
  events?: EventBus
): ArtifactDefinition {
  const now = Date.now();

  if (patch.operation === "batch") {
    let current = definition;
    for (const subPatch of patch.patches) {
      current = applyPatchToDefinition(current, subPatch, events);
    }
    return current;
  }

  switch (patch.operation) {
    case "update": {
      const idx = definition.elements.findIndex(el => el.id === patch.elementId);
      if (idx === -1) {
        console.warn(`[ArtifactPatch] Cannot update non-existent element: ${patch.elementId}`);
        return definition;
      }

      const prevEl = definition.elements[idx]!;
      const changes = patch.changes;
      const updatedEl: ArtifactElement = {
        ...prevEl,
        position: changes.position ? { ...changes.position } : prevEl.position,
        size: changes.size ? { ...changes.size } : prevEl.size,
        props: changes.props ? { ...prevEl.props, ...changes.props } : prevEl.props,
        style: changes.style ? { ...prevEl.style, ...changes.style } : prevEl.style,
        metadata: changes.metadata ? { ...prevEl.metadata, ...changes.metadata } : prevEl.metadata
      };

      const newElements = [...definition.elements];
      newElements[idx] = updatedEl;

      const updatedDefinition: ArtifactDefinition = {
        ...definition,
        elements: newElements
      };

      if (events) {
        if (changes.position) {
          events.emit({
            type: "element.moved",
            artifactId: definition.id,
            elementId: patch.elementId,
            position: updatedEl.position,
            previousPosition: prevEl.position,
            timestamp: now
          });
        }
        if (changes.size) {
          events.emit({
            type: "element.resized",
            artifactId: definition.id,
            elementId: patch.elementId,
            size: updatedEl.size,
            previousSize: prevEl.size,
            timestamp: now
          });
        }
        events.emit({
          type: "artifact.updated",
          artifactId: definition.id,
          operation: "update",
          details: { elementId: patch.elementId },
          timestamp: now
        });
      }

      return updatedDefinition;
    }

    case "move": {
      const idx = definition.elements.findIndex(el => el.id === patch.elementId);
      if (idx === -1) {
        console.warn(`[ArtifactPatch] Cannot move non-existent element: ${patch.elementId}`);
        return definition;
      }

      const prevEl = definition.elements[idx]!;
      const updatedEl: ArtifactElement = {
        ...prevEl,
        position: { ...patch.position }
      };

      const newElements = [...definition.elements];
      newElements[idx] = updatedEl;

      const updatedDefinition: ArtifactDefinition = {
        ...definition,
        elements: newElements
      };

      if (events) {
        events.emit({
          type: "element.moved",
          artifactId: definition.id,
          elementId: patch.elementId,
          position: updatedEl.position,
          previousPosition: prevEl.position,
          timestamp: now
        });
        events.emit({
          type: "artifact.updated",
          artifactId: definition.id,
          operation: "move",
          details: { elementId: patch.elementId, position: patch.position },
          timestamp: now
        });
      }

      return updatedDefinition;
    }

    case "insert": {
      const exists = definition.elements.some(el => el.id === patch.element.id);
      if (exists) {
        console.warn(`[ArtifactPatch] Element already exists: ${patch.element.id}`);
        return definition;
      }

      const updatedDefinition: ArtifactDefinition = {
        ...definition,
        elements: [...definition.elements, patch.element]
      };

      if (events) {
        events.emit({
          type: "artifact.updated",
          artifactId: definition.id,
          operation: "insert",
          details: { elementId: patch.element.id },
          timestamp: now
        });
      }

      return updatedDefinition;
    }

    case "remove": {
      const newElements = definition.elements.filter(el => el.id !== patch.elementId);
      // Remove any connections attached to this element
      const deletedConnections: Connection[] = [];
      const newConnections = definition.connections.filter(conn => {
        const fromId = typeof conn.from === "string" ? conn.from : conn.from.elementId;
        const toId = typeof conn.to === "string" ? conn.to : conn.to.elementId;
        const attached = fromId === patch.elementId || toId === patch.elementId;
        if (attached) {
          deletedConnections.push(conn);
        }
        return !attached;
      });

      const updatedDefinition: ArtifactDefinition = {
        ...definition,
        elements: newElements,
        connections: newConnections
      };

      if (events) {
        events.emit({
          type: "element.deleted",
          artifactId: definition.id,
          elementId: patch.elementId,
          timestamp: now
        });
        for (const conn of deletedConnections) {
          events.emit({
            type: "connection.deleted",
            artifactId: definition.id,
            connectionId: conn.id,
            timestamp: now
          });
        }
        events.emit({
          type: "artifact.updated",
          artifactId: definition.id,
          operation: "remove",
          details: { elementId: patch.elementId },
          timestamp: now
        });
      }

      return updatedDefinition;
    }

    case "connect": {
      const exists = definition.connections.some(c => c.id === patch.connection.id);
      if (exists) {
        console.warn(`[ArtifactPatch] Connection already exists: ${patch.connection.id}`);
        return definition;
      }

      const updatedDefinition: ArtifactDefinition = {
        ...definition,
        connections: [...definition.connections, patch.connection]
      };

      if (events) {
        events.emit({
          type: "connection.created",
          artifactId: definition.id,
          connection: patch.connection,
          timestamp: now
        });
        events.emit({
          type: "artifact.updated",
          artifactId: definition.id,
          operation: "connect",
          details: { connectionId: patch.connection.id },
          timestamp: now
        });
      }

      return updatedDefinition;
    }

    case "disconnect": {
      const updatedDefinition: ArtifactDefinition = {
        ...definition,
        connections: definition.connections.filter(c => c.id !== patch.connectionId)
      };

      if (events) {
        events.emit({
          type: "connection.deleted",
          artifactId: definition.id,
          connectionId: patch.connectionId,
          timestamp: now
        });
        events.emit({
          type: "artifact.updated",
          artifactId: definition.id,
          operation: "disconnect",
          details: { connectionId: patch.connectionId },
          timestamp: now
        });
      }

      return updatedDefinition;
    }

    case "update_canvas": {
      const currentCanvas = definition.canvas ?? {
        width: 800,
        height: 600,
        theme: "neutral" as const,
        grid: false
      };
      const updatedDefinition: ArtifactDefinition = {
        ...definition,
        canvas: {
          ...currentCanvas,
          ...patch.changes
        }
      };

      if (events) {
        events.emit({
          type: "artifact.updated",
          artifactId: definition.id,
          operation: "update_canvas",
          details: patch.changes,
          timestamp: now
        });
      }

      return updatedDefinition;
    }

    default:
      return definition;
  }
}
