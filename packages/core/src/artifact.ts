import {
  type ArtifactDefinition,
  type ArtifactPatch,
  type ArtifactElement,
  type Connection,
  type MicroComponent,
  type Port,
  type StructuredNode,
  validateArtifact
} from "@interactive-artifact/protocol";
import { ReactiveState } from "./state.js";
import { EventBus } from "./events.js";
import { applyPatchToDefinition } from "./patch.js";
import { ComponentTree } from "./tree.js";

export interface RendererInstance {
  update(): void;
  destroy(): void;
}

export interface ArtifactRenderer {
  id: string;
  canRender(artifact: ArtifactInstance): boolean;
  mount(artifact: ArtifactInstance, container: HTMLElement): RendererInstance;
}

/**
 * Live, reactive instance of an Artifact
 */
export class ArtifactInstance {
  public readonly id: string;
  public readonly version: string;
  public readonly type: string;
  public readonly state: ReactiveState;
  public readonly events: EventBus;
  public readonly tree: ComponentTree;

  private _definition: ArtifactDefinition;
  private activeRenderers = new Set<RendererInstance>();

  constructor(definition: ArtifactDefinition) {
    const validated = validateArtifact(definition);
    const normalized = validated.success ? validated.data : definition;

    this.id = normalized.id;
    this.version = normalized.version;
    this.type = normalized.type;
    this._definition = structuredClone(normalized);

    // Initialize reactive state with default viewport & selection state
    this.state = new ReactiveState({
      selectedElementId: null,
      selectedElementIds: [],
      hoveredElementId: null,
      zoom: 1,
      pan: { x: 0, y: 0 },
      isDragging: false,
      theme: normalized.canvas?.theme ?? "neutral"
    });

    this.events = new EventBus();
    this.tree = new ComponentTree(this._definition);

    // Hook state changes to emit typed state.changed event
    this.state.subscribeAll((key, value, prev) => {
      this.events.emit({
        type: "state.changed",
        artifactId: this.id,
        key,
        value,
        previousValue: prev,
        timestamp: Date.now()
      });
    });

    // Notify creation
    this.events.emit({
      type: "artifact.created",
      artifactId: this.id,
      timestamp: Date.now()
    });
  }

  /**
   * Current snapshot of the artifact definition
   */
  public get definition(): ArtifactDefinition {
    return structuredClone(this._definition);
  }

  /**
   * Retrieves an element or structured node by its ID
   */
  public getElement(elementId: string): ArtifactElement | undefined {
    return this._definition.elements.find(el => el.id === elementId);
  }

  /**
   * Retrieves a micro-component by its ID
   */
  public getComponent(componentId: string): MicroComponent | undefined {
    return this.tree.findComponent(componentId);
  }

  /**
   * Retrieves a port by ID
   */
  public getPort(portId: string, nodeId?: string): Port | undefined {
    return this.tree.getPort(portId, nodeId);
  }

  /**
   * Retrieves all ports on a node
   */
  public getPorts(nodeId: string): Port[] {
    return this.tree.getPorts(nodeId);
  }

  /**
   * Applies an incremental patch to this live artifact
   */
  public applyPatch(patch: ArtifactPatch): void {
    this._definition = applyPatchToDefinition(this._definition, patch, this.events);
    this.tree.setDefinition(this._definition);
    this.notifyRenderers();
  }

  /**
   * In-place micro-component update
   */
  public updateComponent(componentId: string, changes: Record<string, unknown>, nodeId?: string): void {
    this.applyPatch({
      operation: "update_component",
      componentId,
      nodeId,
      changes
    });
  }

  /**
   * In-place micro-component insert
   */
  public insertComponent(parentId: string, component: MicroComponent): void {
    this.applyPatch({
      operation: "insert_component",
      parentId,
      component
    });
  }

  /**
   * In-place micro-component remove
   */
  public removeComponent(componentId: string): void {
    this.applyPatch({
      operation: "remove_component",
      componentId
    });
  }

  /**
   * In-place port update
   */
  public updatePort(nodeId: string, portId: string, changes: Record<string, unknown>): void {
    this.applyPatch({
      operation: "update_port",
      nodeId,
      portId,
      changes
    });
  }

  /**
   * Moves a node explicitly
   */
  public moveNode(nodeId: string, position: { x: number; y: number }): void {
    this.applyPatch({
      operation: "move_node",
      nodeId,
      position
    });
  }

  /**
   * Updates a structured node
   */
  public updateNode(nodeId: string, changes: Record<string, unknown>): void {
    this.applyPatch({
      operation: "update_node",
      nodeId,
      changes
    });
  }

  /**
   * Moves an element to a new coordinate (backward compatible)
   */
  public moveElement(elementId: string, position: { x: number; y: number }): void {
    this.applyPatch({
      operation: "move",
      elementId,
      position
    });
  }

  /**
   * Updates an element's attributes (backward compatible)
   */
  public updateElement(elementId: string, changes: Partial<ArtifactElement>): void {
    this.applyPatch({
      operation: "update",
      elementId,
      changes: changes as any
    });
  }

  /**
   * Removes an element and its connections
   */
  public removeElement(elementId: string): void {
    this.applyPatch({
      operation: "remove",
      elementId
    });
  }

  /**
   * Connects two elements or ports
   */
  public connect(connection: Connection): void {
    this.applyPatch({
      operation: "connect",
      connection
    });
  }

  /**
   * Disconnects a connection by ID
   */
  public disconnect(connectionId: string): void {
    this.applyPatch({
      operation: "disconnect",
      connectionId
    });
  }

  /**
   * Multi-level state helpers
   */
  public setComponentState(componentId: string, key: string, value: unknown): void {
    this.state.setComponentState(componentId, key, value);
    this.events.emit({
      type: "component.clicked",
      artifactId: this.id,
      nodeId: "unknown",
      componentId,
      timestamp: Date.now()
    });
  }

  public getComponentState<T = unknown>(componentId: string, key: string): T | undefined {
    return this.state.getComponentState<T>(componentId, key);
  }

  public setPortState(portId: string, key: string, value: unknown): void {
    this.state.setPortState(portId, key, value);
  }

  public getPortState<T = unknown>(portId: string, key: string): T | undefined {
    return this.state.getPortState<T>(portId, key);
  }

  /**
   * Selects an element or clears selection
   */
  public selectElement(elementId: string | null): void {
    const selectedIds = elementId ? [elementId] : [];
    this.state.set("selectedElementId", elementId);
    this.state.set("selectedElementIds", selectedIds);
    this.events.emit({
      type: "element.selected",
      artifactId: this.id,
      elementId,
      selectedIds,
      timestamp: Date.now()
    });
    if (elementId) {
      this.events.emit({
        type: "node.selected",
        artifactId: this.id,
        nodeId: elementId,
        selectedIds: [elementId],
        timestamp: Date.now()
      });
    }
  }

  /**
   * Sets hovered element
   */
  public hoverElement(elementId: string | null): void {
    this.state.set("hoveredElementId", elementId);
    this.events.emit({
      type: "element.hovered",
      artifactId: this.id,
      elementId,
      timestamp: Date.now()
    });
  }

  /**
   * Mounts the artifact to a DOM container using the provided renderer
   */
  public mount(container: HTMLElement, renderer: ArtifactRenderer): RendererInstance {
    if (!renderer.canRender(this)) {
      throw new Error(`Renderer "${renderer.id}" cannot render artifact type "${this.type}"`);
    }

    const instance = renderer.mount(this, container);
    this.activeRenderers.add(instance);

    return {
      update: () => instance.update(),
      destroy: () => {
        this.activeRenderers.delete(instance);
        instance.destroy();
      }
    };
  }

  public notifyRenderers(): void {
    for (const r of this.activeRenderers) {
      try {
        r.update();
      } catch (err) {
        console.error("Error updating renderer:", err);
      }
    }
  }

  /**
   * Serializes current artifact to clean JSON
   */
  public toJSON(): ArtifactDefinition {
    return structuredClone(this._definition);
  }

  /**
   * Creates an ArtifactInstance from a JSON object with validation
   */
  public static fromJSON(json: unknown): ArtifactInstance {
    const result = validateArtifact(json);
    if (!result.success) {
      throw new Error(`Invalid artifact definition: ${result.errors.map(e => e.message).join(", ")}`);
    }
    return new ArtifactInstance(result.data);
  }

  /**
   * Destroys the instance and all its active renderers
   */
  public destroy(): void {
    for (const r of this.activeRenderers) {
      try {
        r.destroy();
      } catch (err) {
        console.error("Error destroying renderer:", err);
      }
    }
    this.activeRenderers.clear();
  }
}
