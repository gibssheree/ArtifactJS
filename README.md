# Interactive Artifact Runtime

> An open-source runtime and declarative protocol that allows **any AI chatbot to generate rich, interactive artifacts directly inside conversations**.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Turborepo](https://img.shields.io/badge/Monorepo-Turborepo-ef4444.svg)](https://turbo.build/)

---

## 1. Vision & Architecture

The long-term vision of this platform is to support **10,000+ interactive capabilities** (flowcharts, Excalidraw sketches, charts, 3D scenes, simulations, timelines, tables, forms) without ever allowing untrusted AI-generated JavaScript execution.

The AI describes what it wants declaratively. The runtime validates the protocol, maintains fine-grained reactive state, dispatches user interaction events back to the conversation, and determines how to render the artifact.

```text
              ┌────────────────────────────────┐
              │        AI Model / Agent        │
              └───────────────┬────────────────┘
                              │
                    Declarative JSON DSL
                              │
                              ▼
              ┌────────────────────────────────┐
              │     Artifact Protocol (v1.0)   │
              │    - Zod Schema Validation     │
              │    - Security Sanitization     │
              │    - Incremental Patch DSL     │
              └───────────────┬────────────────┘
                              │
                              ▼
              ┌────────────────────────────────┐
              │      Capability Registry       │
              │    - Semantic/Keyword Search   │
              │    - Modular Plugins           │
              └───────────────┬────────────────┘
                              │
                              ▼
              ┌────────────────────────────────┐
              │        Artifact Runtime        │
              │    - Reactive State Store      │
              │    - Event Bus                 │
              │    - In-Place Patch Engine     │
              │    - Serialization             │
              └───────────────┬────────────────┘
                              │
                              ▼
              ┌────────────────────────────────┐
              │            Renderer            │
              │    - SVG (Crisp + Sketchy)     │
              │    - Connection Path Solver    │
              │    - Gestures (Pan, Zoom, Drag)│
              └───────────────┬────────────────┘
                              │
                              ▼
              ┌────────────────────────────────┐
              │      Interactive Artifact      │
              │       (Live in Conversation)   │
              └────────────────────────────────┘
```

---

## 2. Monorepo Packages

| Package | Description |
| :--- | :--- |
| **[`@interactive-artifact/protocol`](./packages/protocol)** | Core declarative protocol, element models, connection specs, patch operations, and Zod schemas. |
| **[`@interactive-artifact/core`](./packages/core)** | Framework-independent runtime, reactive state engine, event bus, patch applier, and serialization. |
| **[`@interactive-artifact/registry`](./packages/registry)** | Capability registry and semantic keyword/tag search and discovery engine. |
| **[`@interactive-artifact/renderer-svg`](./packages/renderer-svg)** | High-performance interactive SVG renderer with auto-routing connection solver and Excalidraw-style sketch generator. |
| **[`@interactive-artifact/react`](./packages/react)** | Lightweight React adapter (`<ArtifactProvider>`, `<ArtifactRenderer>`, and hooks). |
| **[`@interactive-artifact/ai`](./packages/ai)** | Provider-agnostic LLM tools, system prompt generators, and patch translators. |
| **[`@interactive-artifact/flowchart`](./packages/artifacts/flowchart)** | Flowchart & architecture diagram capability (`diagram.flowchart`). |
| **[`@interactive-artifact/excalidraw`](./packages/artifacts/excalidraw)** | Sketchy hand-drawn whiteboard canvas capability (`canvas.excalidraw`). |
| **[`@interactive-artifact/charts`](./packages/artifacts/charts)** | Interactive bar, line, pie, and scatter chart capability (`data.chart`). |

### Applications

* **`apps/playground`**: Full developer sandbox with live JSON editor, interactive preview, state inspector, event log, and AI patch simulator.
* **`examples/chatbot`**: Conversational chat interface showing initial prompt -> diagram creation -> user node drag -> follow-up prompt -> incremental patch update.

---

## 3. Quick Start

### 1. Vanilla TypeScript / Framework-Agnostic

```ts
import { ArtifactRuntime } from "@interactive-artifact/core";
import { ArtifactRegistry } from "@interactive-artifact/registry";
import { SVGRenderer } from "@interactive-artifact/renderer-svg";
import { flowchartCapability } from "@interactive-artifact/flowchart";

// 1. Create registry and register capabilities
const registry = new ArtifactRegistry();
registry.register(flowchartCapability);

// 2. Initialize runtime
const runtime = new ArtifactRuntime();

// 3. Create an artifact instance
const artifact = runtime.create({
  version: "1.0",
  id: "my_diagram",
  type: "diagram.flowchart",
  metadata: { title: "API Gateway Architecture" },
  canvas: { width: 800, height: 500, theme: "neutral", grid: true },
  elements: [
    {
      id: "client",
      type: "node",
      position: { x: 100, y: 200 },
      size: { width: 150, height: 70 },
      props: { label: "Client App", status: "active" }
    },
    {
      id: "api",
      type: "node",
      position: { x: 400, y: 200 },
      size: { width: 150, height: 70 },
      props: { label: "FastAPI Gateway", status: "success" }
    }
  ],
  connections: [
    {
      id: "c1",
      from: "client",
      to: "api",
      type: "arrow",
      label: "HTTPS / REST"
    }
  ]
});

// 4. Mount to DOM with SVG renderer
const renderer = new SVGRenderer();
const mounted = artifact.mount(document.getElementById("container")!, renderer);

// Listen to user interactions
artifact.events.on("element.moved", (event) => {
  console.log(`Element ${event.elementId} moved to`, event.position);
});
```

### 2. React Integration

```tsx
import { ArtifactProvider, ArtifactRenderer } from "@interactive-artifact/react";
import { ArtifactRuntime } from "@interactive-artifact/core";
import { ArtifactRegistry } from "@interactive-artifact/registry";
import { flowchartCapability } from "@interactive-artifact/flowchart";

const registry = new ArtifactRegistry();
registry.register(flowchartCapability);
const runtime = new ArtifactRuntime();

export function DiagramView({ artifactDefinition }) {
  return (
    <ArtifactProvider runtime={runtime} registry={registry}>
      <div style={{ width: "100%", height: 500 }}>
        <ArtifactRenderer
          artifact={artifactDefinition}
          onEvent={(e) => console.log("Emitted event:", e)}
        />
      </div>
    </ArtifactProvider>
  );
}
```

---

## 4. Registering a Custom Capability

Capabilities are independent plugins. Anyone can author and publish capabilities:

```ts
import type { CapabilityDefinition } from "@interactive-artifact/registry";

export const mindmapCapability: CapabilityDefinition = {
  id: "diagram.mindmap",
  name: "Interactive Mind Map",
  version: "1.0",
  description: "Hierarchical concept mapping tree with expandable branch nodes",
  tags: ["mindmap", "brainstorm", "hierarchy", "tree"],
  primitives: ["node", "connector", "text"],
  interactions: ["drag", "collapse", "expand", "pan", "zoom"]
};

registry.register(mindmapCapability);
```

### Semantic Discovery
```ts
// AI can search the registry dynamically
const matches = registry.search("hierarchical tree brainstorm");
// Returns: [mindmapCapability]
```

---

## 5. Incremental Patch Protocol

When an AI chatbot modifies an artifact (e.g. *"Move the database underneath the API"*), it emits a **patch operation**. The runtime updates the artifact in place without re-creating DOM elements or losing state:

```json
{
  "artifactId": "my_diagram",
  "patch": {
    "operation": "move",
    "elementId": "database",
    "position": { "x": 400, "y": 320 }
  }
}
```

Supported patch operations:
* `update`: Merges changes into an element (`props`, `style`, `size`).
* `move`: Changes `(x, y)` position.
* `insert`: Adds a new element.
* `remove`: Deletes an element and auto-cleans connected lines.
* `connect`: Adds a new connection.
* `disconnect`: Removes a connection.
* `update_canvas`: Updates canvas width, height, or theme.
* `batch`: Combines multiple atomic patches into one atomic transaction.

---

## 6. AI LLM Integration

The `@interactive-artifact/ai` package exposes tool generators compatible with OpenAI, Anthropic Claude, and Google Gemini:

```ts
import { createArtifactTool, createUpdateArtifactTool, createArtifactSystemPrompt } from "@interactive-artifact/ai";

// 1. Generate system prompt containing registered capabilities
const systemPrompt = createArtifactSystemPrompt({ registry });

// 2. Generate tool calling specifications
const tools = [
  createArtifactTool({ registry }),
  createUpdateArtifactTool()
];
```

---

## 7. Security Model

AI-generated output is strictly untrusted. The runtime guarantees:
1. **Zero arbitrary JavaScript execution**: Artifacts are 100% declarative JSON.
2. **Schema validation via Zod**: Every artifact and patch is validated before reaching the runtime.
3. **Attack vector rejection**: Unsanitized HTML tags (`<script>`), `javascript:` URI schemes, and inline event attributes (`onload=`, `onerror=`) are rejected.
4. **Renderer isolation**: Renderers only transform declarative shapes and primitives.

---

## 8. Development & Testing

```bash
# Install dependencies
pnpm install

# Build all packages & apps
pnpm build

# Run Vitest test suite across all packages
pnpm test

# Run interactive Playground app
pnpm --filter playground dev

# Run Chatbot demo app
pnpm --filter example-chatbot dev
```
