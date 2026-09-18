import type {
  ArtifactDefinition,
  ArtifactElement,
  MicroComponent,
  Port,
  StructuredNode
} from "@interactive-artifact/protocol";

export interface TreeIndexEntry {
  id: string;
  kind: "node" | "component" | "port";
  entity: ArtifactElement | MicroComponent | Port;
  parentId?: string;
  nodeId?: string;
}

/**
 * ComponentTree manages the hierarchical structure of an artifact,
 * indexing nodes, micro-components, and ports for O(1) lookups and mutations.
 */
export class ComponentTree {
  private index = new Map<string, TreeIndexEntry>();
  private definition: ArtifactDefinition;

  constructor(definition: ArtifactDefinition) {
    this.definition = definition;
    this.rebuildIndex();
  }

  /**
   * Sets a new definition and reindexes all entities
   */
  public setDefinition(definition: ArtifactDefinition): void {
    this.definition = definition;
    this.rebuildIndex();
  }

  /**
   * Rebuilds the fast-lookup index from the current definition
   */
  public rebuildIndex(): void {
    this.index.clear();

    for (const el of this.definition.elements) {
      this.index.set(el.id, {
        id: el.id,
        kind: "node",
        entity: el
      });

      // Index ports if present
      const structured = el as StructuredNode;
      if (Array.isArray(structured.ports)) {
        for (const port of structured.ports) {
          this.index.set(port.id, {
            id: port.id,
            kind: "port",
            entity: port,
            parentId: el.id,
            nodeId: el.id
          });
        }
      }

      // Index header actions/components
      if (structured.header?.actions) {
        for (const action of structured.header.actions) {
          this.indexComponent(action, el.id, el.id);
        }
      }

      // Index body sections
      if (structured.body?.sections) {
        for (const sec of structured.body.sections) {
          this.indexComponent(sec, el.id, el.id);
        }
      }

      // Index footer actions
      if (structured.footer?.actions) {
        for (const action of structured.footer.actions) {
          this.indexComponent(action, el.id, el.id);
        }
      }

      // Index direct sections/actions/children on node
      if (Array.isArray(structured.sections)) {
        for (const sec of structured.sections) {
          this.indexComponent(sec, el.id, el.id);
        }
      }
      if (Array.isArray(structured.actions)) {
        for (const act of structured.actions) {
          this.indexComponent(act, el.id, el.id);
        }
      }
      if (Array.isArray(structured.children)) {
        for (const child of structured.children) {
          this.indexComponent(child, el.id, el.id);
        }
      }
    }
  }

  private indexComponent(comp: MicroComponent, parentId: string, nodeId: string): void {
    this.index.set(comp.id, {
      id: comp.id,
      kind: "component",
      entity: comp,
      parentId,
      nodeId
    });

    if (Array.isArray(comp.children)) {
      for (const child of comp.children) {
        this.indexComponent(child, comp.id, nodeId);
      }
    }
  }

  /**
   * Find any entity (node, micro-component, or port) by ID
   */
  public findChild(id: string): ArtifactElement | MicroComponent | Port | undefined {
    return this.index.get(id)?.entity;
  }

  /**
   * Specifically find a micro-component by ID
   */
  public findComponent(id: string): MicroComponent | undefined {
    const entry = this.index.get(id);
    return entry?.kind === "component" ? (entry.entity as MicroComponent) : undefined;
  }

  /**
   * Specifically find a node by ID
   */
  public findNode(id: string): ArtifactElement | undefined {
    const entry = this.index.get(id);
    return entry?.kind === "node" ? (entry.entity as ArtifactElement) : undefined;
  }

  /**
   * Find the immediate parent entity of a component or port
   */
  public findParent(id: string): ArtifactElement | MicroComponent | undefined {
    const entry = this.index.get(id);
    if (!entry || !entry.parentId) return undefined;
    const parentEntry = this.index.get(entry.parentId);
    return parentEntry?.entity as ArtifactElement | MicroComponent | undefined;
  }

  /**
   * Returns all descendants (micro-components and ports) under a node or component
   */
  public findDescendants(id: string): (MicroComponent | Port)[] {
    const results: (MicroComponent | Port)[] = [];
    for (const entry of this.index.values()) {
      if (entry.parentId === id) {
        results.push(entry.entity as MicroComponent | Port);
        if (entry.kind === "component") {
          results.push(...this.findDescendants(entry.id));
        }
      }
    }
    return results;
  }

  /**
   * Get all ports on a specific node
   */
  public getPorts(nodeId: string): Port[] {
    const node = this.findChild(nodeId) as StructuredNode | undefined;
    return node?.ports ?? [];
  }

  /**
   * Get a specific port on a node or by port ID
   */
  public getPort(portId: string, nodeId?: string): Port | undefined {
    const entry = this.index.get(portId);
    if (entry && entry.kind === "port") {
      if (!nodeId || entry.nodeId === nodeId) {
        return entry.entity as Port;
      }
    }

    if (nodeId) {
      const node = this.findChild(nodeId) as StructuredNode | undefined;
      return node?.ports?.find(p => p.id === portId);
    }
    return undefined;
  }

  /**
   * Updates a micro-component in-place
   */
  public updateChild(id: string, partial: Record<string, unknown>): boolean {
    const entry = this.index.get(id);
    if (!entry || entry.kind !== "component") return false;

    const comp = entry.entity as MicroComponent;
    if (partial.props && comp.props) {
      comp.props = { ...comp.props, ...(partial.props as any) };
    }
    if (partial.style && comp.style) {
      comp.style = { ...comp.style, ...(partial.style as any) };
    }
    Object.assign(comp, partial);
    return true;
  }

  /**
   * Updates a port in-place
   */
  public updatePort(portId: string, partial: Record<string, unknown>, nodeId?: string): boolean {
    const port = this.getPort(portId, nodeId);
    if (!port) return false;

    Object.assign(port, partial);
    return true;
  }

  /**
   * Inserts a micro-component as a child of a node or another component
   */
  public insertChild(parentId: string, child: MicroComponent, index?: number): boolean {
    const parentEntry = this.index.get(parentId);
    if (!parentEntry) return false;

    child.parentId = parentId;

    if (parentEntry.kind === "node") {
      const node = parentEntry.entity as StructuredNode;
      if (!node.children) node.children = [];
      if (index !== undefined && index >= 0 && index <= node.children.length) {
        node.children.splice(index, 0, child);
      } else {
        node.children.push(child);
      }
    } else if (parentEntry.kind === "component") {
      const comp = parentEntry.entity as MicroComponent;
      if (!comp.children) comp.children = [];
      if (index !== undefined && index >= 0 && index <= comp.children.length) {
        comp.children.splice(index, 0, child);
      } else {
        comp.children.push(child);
      }
    } else {
      return false;
    }

    const rootNodeId = parentEntry.kind === "node" ? parentEntry.id : parentEntry.nodeId || parentEntry.id;
    this.indexComponent(child, parentId, rootNodeId);
    return true;
  }

  /**
   * Removes a child component or port by ID
   */
  public removeChild(id: string): boolean {
    const entry = this.index.get(id);
    if (!entry || !entry.parentId) return false;

    const parentEntry = this.index.get(entry.parentId);
    if (!parentEntry) return false;

    let removed = false;

    if (entry.kind === "port") {
      const node = parentEntry.entity as StructuredNode;
      if (node.ports) {
        const idx = node.ports.findIndex(p => p.id === id);
        if (idx !== -1) {
          node.ports.splice(idx, 1);
          removed = true;
        }
      }
    } else if (entry.kind === "component") {
      if (parentEntry.kind === "node") {
        const node = parentEntry.entity as StructuredNode;
        const checkAndRemove = (list?: MicroComponent[]) => {
          if (!list) return false;
          const idx = list.findIndex(c => c.id === id);
          if (idx !== -1) {
            list.splice(idx, 1);
            return true;
          }
          return false;
        };

        removed =
          checkAndRemove(node.children) ||
          checkAndRemove(node.sections) ||
          checkAndRemove(node.actions) ||
          checkAndRemove(node.header?.actions) ||
          checkAndRemove(node.body?.sections) ||
          checkAndRemove(node.footer?.actions);
      } else if (parentEntry.kind === "component") {
        const comp = parentEntry.entity as MicroComponent;
        if (comp.children) {
          const idx = comp.children.findIndex(c => c.id === id);
          if (idx !== -1) {
            comp.children.splice(idx, 1);
            removed = true;
          }
        }
      }
    }

    if (removed) {
      const descendants = this.findDescendants(id);
      for (const d of descendants) {
        this.index.delete(d.id);
      }
      this.index.delete(id);
    }

    return removed;
  }

  /**
   * Moves a micro-component to a new parent
   */
  public moveChild(childId: string, newParentId: string, index?: number): boolean {
    const childEntry = this.index.get(childId);
    if (!childEntry || childEntry.kind !== "component") return false;

    const child = childEntry.entity as MicroComponent;
    if (!this.removeChild(childId)) return false;

    return this.insertChild(newParentId, child, index);
  }

  /**
   * Returns all indexed entities
   */
  public getAllEntities(): TreeIndexEntry[] {
    return Array.from(this.index.values());
  }
}
