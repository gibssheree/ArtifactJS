import type {
  ArtifactDefinition,
  ArtifactPatch,
  ArtifactElement,
  Connection,
  StructuredNode,
  MicroComponent,
  Port
} from "@interactive-artifact/protocol";
import type { EventBus } from "./events.js";
import { ComponentTree } from "./tree.js";

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
      const changes = patch.changes as any;
      const updatedEl: ArtifactElement = {
        ...prevEl,
        ...changes,
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

    case "move_node": {
      const idx = definition.elements.findIndex(el => el.id === patch.nodeId);
      if (idx === -1) {
        console.warn(`[ArtifactPatch] Cannot move non-existent node: ${patch.nodeId}`);
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
          type: "node.moved",
          artifactId: definition.id,
          nodeId: patch.nodeId,
          position: updatedEl.position,
          previousPosition: prevEl.position,
          timestamp: now
        });
        events.emit({
          type: "element.moved",
          artifactId: definition.id,
          elementId: patch.nodeId,
          position: updatedEl.position,
          previousPosition: prevEl.position,
          timestamp: now
        });
        events.emit({
          type: "artifact.updated",
          artifactId: definition.id,
          operation: "move_node",
          details: { nodeId: patch.nodeId, position: patch.position },
          timestamp: now
        });
      }

      return updatedDefinition;
    }

    case "update_node": {
      const idx = definition.elements.findIndex(el => el.id === patch.nodeId);
      if (idx === -1) {
        console.warn(`[ArtifactPatch] Cannot update non-existent node: ${patch.nodeId}`);
        return definition;
      }

      const prevEl = definition.elements[idx]!;
      const changes = patch.changes;
      const updatedEl = {
        ...prevEl,
        ...changes
      } as ArtifactElement;

      const newElements = [...definition.elements];
      newElements[idx] = updatedEl;

      const updatedDefinition: ArtifactDefinition = {
        ...definition,
        elements: newElements
      };

      if (events) {
        events.emit({
          type: "node.updated",
          artifactId: definition.id,
          nodeId: patch.nodeId,
          changes: patch.changes,
          timestamp: now
        });
        events.emit({
          type: "artifact.updated",
          artifactId: definition.id,
          operation: "update_node",
          details: { nodeId: patch.nodeId },
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
      const deletedConnections: Connection[] = [];
      const newConnections = definition.connections.filter(conn => {
        const fromId = typeof conn.from === "string" ? conn.from : conn.from.nodeId ?? (conn.from as any).elementId;
        const toId = typeof conn.to === "string" ? conn.to : conn.to.nodeId ?? (conn.to as any).elementId;
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

    case "update_component": {
      const clone = structuredClone(definition);
      const tree = new ComponentTree(clone);
      const success = tree.updateChild(patch.componentId, patch.changes);

      if (!success) {
        console.warn(`[ArtifactPatch] Component not found for update: ${patch.componentId}`);
        return definition;
      }

      if (events) {
        events.emit({
          type: "component.updated",
          artifactId: definition.id,
          nodeId: patch.nodeId || "unknown",
          componentId: patch.componentId,
          changes: patch.changes,
          timestamp: now
        });
        events.emit({
          type: "artifact.updated",
          artifactId: definition.id,
          operation: "update_component",
          details: { componentId: patch.componentId },
          timestamp: now
        });
      }

      return clone;
    }

    case "insert_component": {
      const clone = structuredClone(definition);
      const tree = new ComponentTree(clone);
      const success = tree.insertChild(patch.parentId, patch.component as MicroComponent);

      if (!success) {
        console.warn(`[ArtifactPatch] Failed to insert component into parent: ${patch.parentId}`);
        return definition;
      }

      if (events) {
        events.emit({
          type: "component.created",
          artifactId: definition.id,
          nodeId: patch.parentId,
          component: patch.component as MicroComponent,
          timestamp: now
        });
        events.emit({
          type: "artifact.updated",
          artifactId: definition.id,
          operation: "insert_component",
          details: { componentId: patch.component.id, parentId: patch.parentId },
          timestamp: now
        });
      }

      return clone;
    }

    case "remove_component": {
      const clone = structuredClone(definition);
      const tree = new ComponentTree(clone);
      const success = tree.removeChild(patch.componentId);

      if (!success) {
        console.warn(`[ArtifactPatch] Failed to remove component: ${patch.componentId}`);
        return definition;
      }

      if (events) {
        events.emit({
          type: "component.deleted",
          artifactId: definition.id,
          nodeId: "unknown",
          componentId: patch.componentId,
          timestamp: now
        });
        events.emit({
          type: "artifact.updated",
          artifactId: definition.id,
          operation: "remove_component",
          details: { componentId: patch.componentId },
          timestamp: now
        });
      }

      return clone;
    }

    case "update_port": {
      const clone = structuredClone(definition);
      const tree = new ComponentTree(clone);
      const success = tree.updatePort(patch.portId, patch.changes, patch.nodeId);

      if (!success) {
        console.warn(`[ArtifactPatch] Port not found for update: ${patch.portId} on node ${patch.nodeId}`);
        return definition;
      }

      if (events) {
        events.emit({
          type: "port.updated",
          artifactId: definition.id,
          nodeId: patch.nodeId,
          portId: patch.portId,
          changes: patch.changes,
          timestamp: now
        });
        events.emit({
          type: "artifact.updated",
          artifactId: definition.id,
          operation: "update_port",
          details: { portId: patch.portId, nodeId: patch.nodeId },
          timestamp: now
        });
      }

      return clone;
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
