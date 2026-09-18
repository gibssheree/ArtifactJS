import type {
  ArtifactPatch,
  ArtifactElement,
  Connection,
  MoveElementPatch,
  UpdateElementPatch,
  InsertElementPatch,
  RemoveElementPatch,
  ConnectPatch,
  DisconnectPatch,
  BatchArtifactPatch
} from "@interactive-artifact/protocol";

export const PatchBuilder = {
  move(elementId: string, x: number, y: number): MoveElementPatch {
    return {
      operation: "move",
      elementId,
      position: { x, y }
    };
  },

  update(elementId: string, changes: UpdateElementPatch["changes"]): UpdateElementPatch {
    return {
      operation: "update",
      elementId,
      changes
    };
  },

  insert(element: ArtifactElement): InsertElementPatch {
    return {
      operation: "insert",
      element
    };
  },

  remove(elementId: string): RemoveElementPatch {
    return {
      operation: "remove",
      elementId
    };
  },

  connect(connection: Connection): ConnectPatch {
    return {
      operation: "connect",
      connection
    };
  },

  disconnect(connectionId: string): DisconnectPatch {
    return {
      operation: "disconnect",
      connectionId
    };
  },

  batch(patches: ArtifactPatch[]): BatchArtifactPatch {
    return {
      operation: "batch",
      patches: patches as any
    };
  }
};
