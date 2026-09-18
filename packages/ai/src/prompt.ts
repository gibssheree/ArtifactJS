import type { ArtifactRegistry } from "@interactive-artifact/registry";
import { extractCapabilitySummaries } from "./capabilities.js";

export interface SystemPromptOptions {
  registry: ArtifactRegistry;
  customInstructions?: string;
}

/**
 * Generates an LLM system prompt instructing the model how to interact with the Artifact Runtime
 */
export function createArtifactSystemPrompt(options: SystemPromptOptions): string {
  const { registry, customInstructions = "" } = options;
  const capabilities = extractCapabilitySummaries(registry);

  const capabilitiesDoc = capabilities
    .map(c => `- **${c.id}** (${c.name}): ${c.description} [tags: ${c.tags.join(", ")}]`)
    .join("\n");

  return `
# Interactive Artifact Generation Guidelines

You have access to an Interactive Artifact Runtime that allows you to generate rich, live visual diagrams, charts, and interactive widgets inside conversation messages.

## Architectural Rules (Strict)
1. **Never generate arbitrary React components or raw JavaScript.** The host application will strictly reject code execution for security.
2. **Never calculate low-level SVG path coordinates for connections.** Describe logical relationships declaratively using \`from\` and \`to\` element IDs. The runtime's geometry solver computes the visual layout and arrow routing automatically.
3. **Always output valid declarative Artifact JSON** conforming to the version "1.0" protocol.
4. **Use incremental patches for updates.** When a user asks to modify an existing diagram (e.g. "move the database below the API", "add a Redis cache", "change color to blue"), call \`update_interactive_artifact\` with patch operations (\`move\`, \`update\`, \`insert\`, \`remove\`, \`connect\`) rather than recreating the whole diagram.

## Available Capabilities
${capabilitiesDoc}

## Element Primitives
- **node**: Process boxes, capsules, cylinders (databases), diamonds (decisions). Props: \`label\`, \`subLabel\`, \`shape\`, \`status\` ('idle'|'active'|'success'|'warning'|'error'), \`badge\`.
- **rectangle / ellipse**: Geometric shapes with fill, stroke, and corner radius.
- **line / arrow**: Standalone lines or vectors with endpoints.
- **text**: Headings, labels, and notes.
- **button / slider / toggle**: Interactive controls.

## Artifact JSON Template
\`\`\`json
{
  "version": "1.0",
  "id": "artifact_demo_1",
  "type": "diagram.flowchart",
  "metadata": {
    "title": "System Architecture"
  },
  "canvas": {
    "width": 800,
    "height": 500,
    "theme": "neutral",
    "grid": true
  },
  "elements": [
    {
      "id": "frontend",
      "type": "node",
      "position": { "x": 100, "y": 200 },
      "size": { "width": 160, "height": 70 },
      "props": { "label": "Client Frontend", "subLabel": "Next.js" },
      "style": { "fill": "#eff6ff", "stroke": "#3b82f6" }
    },
    {
      "id": "backend",
      "type": "node",
      "position": { "x": 420, "y": 200 },
      "size": { "width": 160, "height": 70 },
      "props": { "label": "Backend API", "subLabel": "Express" },
      "style": { "fill": "#f0fdf4", "stroke": "#22c55e" }
    }
  ],
  "connections": [
    {
      "id": "c1",
      "from": "frontend",
      "to": "backend",
      "type": "arrow",
      "label": "HTTPS REST"
    }
  ]
}
\`\`\`

## Incremental Patch Example (Move Node)
\`\`\`json
{
  "artifactId": "artifact_demo_1",
  "patch": {
    "operation": "move",
    "elementId": "backend",
    "position": { "x": 420, "y": 340 }
  }
}
\`\`\`

${customInstructions ? `\n## Additional Instructions\n${customInstructions}` : ""}
`.trim();
}
