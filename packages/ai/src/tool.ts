import type { ArtifactRegistry } from "@interactive-artifact/registry";

export interface ToolDefinition {
  name: string;
  description: string;
  parameters: Record<string, unknown>;
}

export interface CreateArtifactToolOptions {
  registry: ArtifactRegistry;
  toolName?: string;
}

export interface UpdateArtifactToolOptions {
  toolName?: string;
}

/**
 * Creates an OpenAI/Anthropic/Gemini compatible tool definition for creating declarative artifacts
 */
export function createArtifactTool(options: CreateArtifactToolOptions): ToolDefinition {
  const { registry, toolName = "create_interactive_artifact" } = options;
  const capabilities = registry.list();
  const availableTypes = capabilities.map(c => c.id);

  return {
    name: toolName,
    description: `Generates a rich, interactive visual artifact (flowcharts, diagrams, sketches, or charts). Supported types: ${availableTypes.join(", ")}. Do NOT generate raw React or HTML. Use the declarative schema.`,
    parameters: {
      type: "object",
      properties: {
        id: {
          type: "string",
          description: "Unique identifier for the artifact (e.g., 'artifact_arch_1')"
        },
        type: {
          type: "string",
          enum: availableTypes.length > 0 ? availableTypes : ["diagram.flowchart", "canvas.excalidraw", "data.chart"],
          description: "The capability type to instantiate"
        },
        metadata: {
          type: "object",
          properties: {
            title: { type: "string" },
            description: { type: "string" }
          },
          required: ["title"]
        },
        canvas: {
          type: "object",
          properties: {
            width: { type: "number", default: 800 },
            height: { type: "number", default: 600 },
            theme: { type: "string", enum: ["light", "dark", "neutral"], default: "neutral" },
            grid: { type: "boolean", default: false }
          }
        },
        elements: {
          type: "array",
          description: "List of visual primitives on canvas",
          items: {
            type: "object",
            properties: {
              id: { type: "string" },
              type: {
                type: "string",
                enum: [
                  "rectangle", "ellipse", "line", "arrow", "text",
                  "node", "group", "button", "slider", "toggle", "freehand"
                ]
              },
              position: {
                type: "object",
                properties: {
                  x: { type: "number" },
                  y: { type: "number" }
                },
                required: ["x", "y"]
              },
              size: {
                type: "object",
                properties: {
                  width: { type: "number" },
                  height: { type: "number" }
                },
                required: ["width", "height"]
              },
              props: { type: "object" },
              style: { type: "object" }
            },
            required: ["id", "type", "position", "size"]
          }
        },
        connections: {
          type: "array",
          description: "Logical connections between elements. Renderer calculates exact visual geometry.",
          items: {
            type: "object",
            properties: {
              id: { type: "string" },
              from: { type: "string" },
              to: { type: "string" },
              type: { type: "string", enum: ["arrow", "line", "curved", "orthogonal"], default: "arrow" },
              label: { type: "string" }
            },
            required: ["id", "from", "to"]
          }
        },
        data: {
          type: "object",
          description: "Specialized data payload for charts or custom capabilities"
        }
      },
      required: ["id", "type", "metadata", "elements"]
    }
  };
}

/**
 * Creates tool definition for applying patch updates to an existing artifact
 */
export function createUpdateArtifactTool(options: UpdateArtifactToolOptions = {}): ToolDefinition {
  const { toolName = "update_interactive_artifact" } = options;

  return {
    name: toolName,
    description: "Applies an incremental patch update to an existing artifact (e.g., move a node, update label, connect nodes, remove node).",
    parameters: {
      type: "object",
      properties: {
        artifactId: {
          type: "string",
          description: "The ID of the artifact to modify"
        },
        patch: {
          type: "object",
          description: "The patch instruction: 'move', 'update', 'insert', 'remove', 'connect', or 'batch'",
          properties: {
            operation: {
              type: "string",
              enum: ["update", "move", "insert", "remove", "connect", "disconnect", "update_canvas", "batch"]
            },
            elementId: { type: "string" },
            position: {
              type: "object",
              properties: { x: { type: "number" }, y: { type: "number" } }
            },
            changes: { type: "object" },
            element: { type: "object" },
            connection: { type: "object" },
            connectionId: { type: "string" },
            patches: { type: "array" }
          },
          required: ["operation"]
        }
      },
      required: ["artifactId", "patch"]
    }
  };
}
