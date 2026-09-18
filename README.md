# ArtifactsJS — Open-Source AI Interactive Artifact Runtime

> An open-source, provider-agnostic runtime and declarative protocol that allows **any AI chatbot or agent to generate rich, interactive visual artifacts directly inside conversation streams**.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Turborepo](https://img.shields.io/badge/Monorepo-Turborepo-ef4444.svg)](https://turbo.build/)

---

## 1. Product Definition & Architecture

**ArtifactsJS is NOT an AI SDK and NOT an LLM provider integration.** 
The library receives structured declarative data produced by an external application or LLM and turns that data into rich, interactive UI inside chat interfaces.

```text
LLM / External Application
        ↓  (Declarative JSON / Tool Call)
Artifact Protocol (Zod Schemas, Security Sanitizer, Patch DSL)
        ↓
ArtifactsJS Runtime (ComponentTree, ReactiveState, EventBus)
        ↓
Capability Registry (Semantic Discovery, Primitives, Micro-Components)
        ↓
Renderer (SVG with crisp/sketch modes, accurate connection routing, gestures)
        ↓
Interactive UI inside Chat (Zero untrusted JavaScript execution)
```

### Composable Primitive & Micro-Component Mental Model

$$\text{PRIMITIVE} \rightarrow \text{MICRO COMPONENT} \rightarrow \text{NODE} \rightarrow \text{COMPOSITION} \rightarrow \text{CAPABILITY}$$

Every visual element inside an artifact is an addressable entity with a stable ID:
* **Primitives**: Atomic graphic, text, UI, and data elements (`rectangle`, `text`, `icon`, `badge`, `metric`, `port`).
* **Micro-Components**: Functional visual widgets (`icon`, `badge`, `chip`, `status-indicator`, `metric`, `key-value`, `divider`, `progress`, `button`).
* **Structured Nodes**: Composite containers with structured regions:
  * `header`: icon, title, subtitle, badge, status indicator, action buttons.
  * `body`: description, micro-component sections, key-value rows.
  * `footer`: summary metric, status text, secondary actions.
  * `ports`: typed connection sockets (`input`, `output`, `bidirectional`).
* **Compositions & Capabilities**: High-level visual modalities built from composed nodes and connections (Flowcharts, System Architecture, ERDs, Mind Maps, Sequences, Timelines, Dashboards, Tables, Forms, and Charts).

---

## 2. Monorepo Packages

| Package | Description |
| :--- | :--- |
| **[`@interactive-artifact/protocol`](./packages/protocol)** | Base declarative schema, element models, structured node & port interfaces, micro-patch operations, and Zod security validation. |
| **[`@interactive-artifact/core`](./packages/core)** | Framework-independent runtime, hierarchical `ComponentTree` with $O(1)$ indexing, multi-level scoped `ReactiveState`, event bus, and in-place patch applier. |
| **[`@interactive-artifact/registry`](./packages/registry)** | Capability, primitive, and micro-component registry with semantic keyword and tag search discovery. |
| **[`@interactive-artifact/renderer-svg`](./packages/renderer-svg)** | High-performance interactive SVG renderer with accurate port-to-port connection routing (bezier, orthogonal, straight), gestures (pan, zoom, drag), and Excalidraw-style sketchy rendering. |
| **[`@interactive-artifact/catalog`](./packages/artifacts/catalog)** | 11 production capabilities: Node Graph, System Architecture, ERD, Mind Map, Sequence, Timeline, Org Hierarchy, Workflow, Dashboard, Table, Form. |
| **[`@interactive-artifact/flowchart`](./packages/artifacts/flowchart)** | Reference composite flowchart implementation with structured nodes, live metrics, status indicators, and curved port connections. |
| **[`@interactive-artifact/charts`](./packages/artifacts/charts)** | Interactive chart capability supporting bar, line, pie, scatter, area, donut, and gauge visualizations. |
| **[`@interactive-artifact/excalidraw`](./packages/artifacts/excalidraw)** | Hand-drawn sketchy whiteboard canvas capability with algorithmic wobble and roughness. |
| **[`@interactive-artifact/react`](./packages/react)** | React adapter with `<ArtifactProvider>`, `<ArtifactRenderer>`, and reactive hooks (`useArtifactTree`, `useComponent`, `usePort`, `useComponentState`). |
| **[`@interactive-artifact/ai`](./packages/ai)** | Provider-agnostic LLM tools, system prompt generators, and patch translators compatible with OpenAI, Anthropic Claude, and Google Gemini. |

### Applications

* **`apps/playground`**: 3-pane developer studio with live JSON Editor, Interactive SVG Canvas, and Deep Inspector (Component Tree, Entity Inspector, Reactive State, Event Stream, Capability Catalog, AI Patch Simulator).
* **`examples/chatbot`**: End-to-end conversational chat application exhibiting multi-turn artifact generation, user interaction event capture, and in-place micro-component patching without DOM re-renders.

---

## 3. Quick Start

### 1. Framework-Agnostic / Vanilla TypeScript

```ts
import { ArtifactRuntime } from "@interactive-artifact/core";
import { ArtifactRegistry } from "@interactive-artifact/registry";
import { SVGRenderer } from "@interactive-artifact/renderer-svg";
import { flowchartCapability, createReferenceFlowchart } from "@interactive-artifact/flowchart";

// 1. Initialize Registry and register capabilities
const registry = new ArtifactRegistry();
registry.register(flowchartCapability);

// 2. Initialize Runtime
const runtime = new ArtifactRuntime();

// 3. Create a structured artifact instance with micro-components and typed ports
const artifact = runtime.create({
  version: "1.0",
  id: "cloud_arch",
  type: "diagram.flowchart",
  metadata: { title: "Microservices Architecture" },
  canvas: { width: 900, height: 600, theme: "neutral", grid: true },
  elements: [
    {
      id: "api_gateway",
      type: "node",
      position: { x: 100, y: 200 },
      size: { width: 220, height: 130 },
      props: {
        header: {
          title: "API Gateway",
          subtitle: "Kong / Envoy",
          badge: "Edge",
          status: "online"
        },
        body: {
          description: "Ingress SSL termination and rate limiting",
          sections: [
            { id: "gw_rps", type: "metric", props: { label: "Throughput", value: "14.2k req/s" } }
          ]
        },
        ports: [
          { id: "in_client", name: "HTTPS", direction: "input", position: "left", dataType: "http" },
          { id: "out_services", name: "Internal", direction: "output", position: "right", dataType: "grpc" }
        ]
      }
    },
    {
      id: "auth_service",
      type: "node",
      position: { x: 450, y: 200 },
      size: { width: 220, height: 130 },
      props: {
        header: {
          title: "Auth Service",
          subtitle: "JWT & OAuth2",
          status: "healthy"
        },
        body: {
          sections: [
            { id: "auth_latency", type: "metric", props: { label: "p99 Latency", value: "8ms" } }
          ]
        },
        ports: [
          { id: "in_gateway", name: "RPC In", direction: "input", position: "left", dataType: "grpc" }
        ]
      }
    }
  ],
  connections: [
    {
      id: "c1",
      from: { nodeId: "api_gateway", portId: "out_services" },
      to: { nodeId: "auth_service", portId: "in_gateway" },
      type: "curved",
      label: "gRPC mTLS"
    }
  ]
});

// 4. Mount to DOM
const renderer = new SVGRenderer();
const mounted = artifact.mount(document.getElementById("container")!, renderer);

// 5. In-place micro-component update (without re-rendering artifact DOM)
artifact.updateComponent("gw_rps", { props: { value: "22.5k req/s" } });

// 6. Listen to granular events
artifact.events.on("port.clicked", (e) => {
  console.log(`Port ${e.portId} clicked on node ${e.nodeId}`);
});
```

### 2. React Integration

```tsx
import { ArtifactProvider, ArtifactRenderer, useArtifactTree, useComponent } from "@interactive-artifact/react";
import { ArtifactRuntime } from "@interactive-artifact/core";
import { ArtifactRegistry } from "@interactive-artifact/registry";
import { flowchartCapability, createReferenceFlowchart } from "@interactive-artifact/flowchart";

const registry = new ArtifactRegistry();
registry.register(flowchartCapability);
const runtime = new ArtifactRuntime();
const initialDefinition = createReferenceFlowchart();

export function InteractiveDiagram() {
  return (
    <ArtifactProvider runtime={runtime} registry={registry}>
      <div style={{ width: "100%", height: 650, borderRadius: 8, overflow: "hidden" }}>
        <ArtifactRenderer
          artifact={initialDefinition}
          onEvent={(e) => console.log("Granular Event:", e.type, e)}
        />
      </div>
    </ArtifactProvider>
  );
}
```

---

## 4. In-Place Micro-Patch Protocol

When an AI chatbot responds to a user request (e.g., *"Update the API Gateway latency to 12ms and set status to degraded"*), it generates an **incremental micro-patch**.

The runtime applies the patch directly to the internal `ComponentTree` and updates the SVG DOM in-place without rebuilding the canvas:

```json
{
  "artifactId": "cloud_arch",
  "patch": {
    "operation": "update_component",
    "componentId": "gw_latency",
    "changes": {
      "props": { "value": "12ms" }
    }
  }
}
```

### Supported Patch Operations

| Operation | Target | Description |
| :--- | :--- | :--- |
| `update_component` | Micro-Component | Modifies props, styles, or state of a specific micro-component. |
| `update_port` | Port | Modifies port state (`connected`, `hovered`) or labels. |
| `insert_component` | Node Region | Inserts a new micro-component into a node's body, header, or footer. |
| `remove_component` | Micro-Component | Removes a micro-component by ID. |
| `move_node` | Node | Updates the `(x, y)` position of a node, dynamically re-routing all attached port connections. |
| `update_node` | Node | Updates headers, subtitles, badges, or dimensions of a structured node. |
| `connect` | Connection | Creates a new connection between `{ nodeId, portId }` endpoints. |
| `disconnect` | Connection | Removes an existing connection by ID. |
| `batch` | Multi-target | Executes multiple atomic patch operations in a single transactional update. |

---

## 5. Capabilities Catalog

The `@interactive-artifact/catalog` package provides 11 out-of-the-box production capabilities adhering to the structured micro-component architecture:

1. **AI Node Graph (`nodegraph`)**: Deep learning inference pipeline with typed audio/tensor sockets and progress bars.
2. **Cloud Microservices Architecture (`architecture`)**: High-availability cloud topology with health status dots, ingress routes, and cache layers.
3. **E-Commerce PostgreSQL ERD (`erd`)**: Entity-Relationship Diagram with primary/foreign key badges, column data types, and cardinalities.
4. **Product Strategy Mind Map (`mindmap`)**: Hierarchical tree with expandable branch nodes and tag chips.
5. **OAuth 2.0 Auth Sequence Diagram (`sequence`)**: Participant lifelines with synchronous and callback message arrows.
6. **Engineering Milestone Roadmap (`timeline`)**: Chronological quarter-based timeline tracks with status badges.
7. **Executive Org Hierarchy (`orghierarchy`)**: Role hierarchy with avatars, title subtitles, and department badges.
8. **Reimbursement Workflow Machine (`workflow`)**: State machine with decision diamonds, approval loops, and trigger actions.
9. **Executive KPI Dashboard (`dashboard`)**: Multi-metric KPI cards with sparkline-style visual indicators and trend chips.
10. **Transaction Ledger Data Table (`table`)**: Structured tabular grid with status chips, monospace IDs, and right-aligned amounts.
11. **AI Model Settings Form (`form`)**: Interactive controls including text inputs, slider parameters, select dropdowns, and submit buttons.

Additionally:
* **`diagram.flowchart`** (`@interactive-artifact/flowchart`): Full reference composite implementation.
* **`canvas.excalidraw`** (`@interactive-artifact/excalidraw`): Whiteboard canvas with algorithmic hand-drawn roughness.
* **`data.chart`** (`@interactive-artifact/charts`): Interactive Bar, Line, Pie, Scatter, Area, Donut, and Gauge charts.

---

## 6. Multi-Level Reactive State & Events

The runtime maintains a centralized, multi-level scoped reactive state store:
* `artifact.*`: Global canvas state (e.g., `artifact.zoom`, `artifact.pan`, `artifact.selectedId`).
* `node.{nodeId}.*`: Node-level state (e.g., `node.api_gateway.expanded`, `node.api_gateway.selected`).
* `component.{id}.*`: Micro-component state (e.g., `component.gw_metric.hovered`).
* `port.{id}.*`: Port state (e.g., `port.in_client.connected`).

### Granular Typed Events
* `node.clicked`, `node.selected`, `node.moved`, `node.resized`
* `component.clicked`, `component.hovered`, `component.selected`
* `port.clicked`, `port.connected`, `port.disconnected`
* `connection.created`, `connection.updated`, `connection.deleted`
* `state.changed`

---

## 7. Security Model

AI-generated output is strictly untrusted. The runtime guarantees:
1. **Zero untrusted JavaScript execution**: Artifacts are 100% declarative JSON.
2. **Schema validation via Zod**: Every artifact, node, micro-component, port, and patch is strictly validated.
3. **Attack vector rejection**: Unsanitized HTML tags (`<script>`), `javascript:` URI schemes, and inline event attributes (`onload=`, `onerror=`) are rejected at the protocol boundary.
4. **Renderer isolation**: Renderers only transform declarative shapes and micro-primitives.

---

## 8. Development & Testing

```bash
# Install dependencies across all workspaces
pnpm install

# Build all 12 packages and applications
pnpm build

# Run Vitest test suite across all packages (100% pass rate)
pnpm test

# Launch the 3-pane Playground Developer Studio
pnpm --filter playground dev

# Launch the Conversational AI Chatbot Demo
pnpm --filter example-chatbot dev
```

---

## License

MIT © [ArtifactsJS Contributors](https://github.com/interactive-artifact/artifactsjs)
