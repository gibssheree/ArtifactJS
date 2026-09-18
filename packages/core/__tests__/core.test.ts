import { describe, it, expect } from "vitest";
import { ArtifactRuntime, ArtifactInstance, ReactiveState, EventBus } from "../src/index.js";
import type { ArtifactDefinition } from "@interactive-artifact/protocol";

describe("Core Runtime & Reactive State", () => {
  const sampleArtifact: ArtifactDefinition = {
    version: "1.0",
    id: "art_core_1",
    type: "diagram.flowchart",
    metadata: { title: "Test Architecture" },
    canvas: { width: 800, height: 600, theme: "neutral" },
    elements: [
      {
        id: "frontend",
        type: "node",
        position: { x: 50, y: 50 },
        size: { width: 140, height: 70 },
        props: { label: "Web UI" }
      },
      {
        id: "api",
        type: "node",
        position: { x: 300, y: 50 },
        size: { width: 140, height: 70 },
        props: { label: "API Gateway" }
      }
    ],
    connections: [
      {
        id: "c1",
        from: "frontend",
        to: "api",
        type: "arrow"
      }
    ],
    interactions: []
  };

  describe("ReactiveState Store", () => {
    it("sets, gets, and notifies subscribers", () => {
      const state = new ReactiveState({ count: 0 });
      expect(state.get("count")).toBe(0);

      let receivedVal: unknown = null;
      let receivedPrev: unknown = null;
      const unsub = state.subscribe("count", (val, prev) => {
        receivedVal = val;
        receivedPrev = prev;
      });

      state.set("count", 42);
      expect(state.get("count")).toBe(42);
      expect(receivedVal).toBe(42);
      expect(receivedPrev).toBe(0);

      unsub();
      state.set("count", 99);
      expect(receivedVal).toBe(42); // Unsubscribed, no longer called
    });

    it("batches updates and flushes only once", () => {
      const state = new ReactiveState({ a: 1, b: 2 });
      let callCount = 0;

      state.subscribeAll(() => {
        callCount++;
      });

      state.batch(() => {
        state.set("a", 10);
        state.set("b", 20);
      });

      expect(state.get("a")).toBe(10);
      expect(state.get("b")).toBe(20);
      expect(callCount).toBe(2); // One notification per unique changed key at flush
    });
  });

  describe("EventBus", () => {
    it("emits events and tracks history", () => {
      const bus = new EventBus({ maxHistory: 10 });
      let caughtClicked = false;

      bus.on("element.clicked", (e) => {
        caughtClicked = true;
        expect(e.elementId).toBe("frontend");
      });

      bus.emit({
        type: "element.clicked",
        artifactId: "art_core_1",
        elementId: "frontend",
        timestamp: Date.now()
      });

      expect(caughtClicked).toBe(true);
      expect(bus.history().length).toBe(1);
    });
  });

  describe("ArtifactInstance Lifecycle & Patching", () => {
    it("initializes instance and reactive state correctly", () => {
      const artifact = new ArtifactInstance(sampleArtifact);
      expect(artifact.id).toBe("art_core_1");
      expect(artifact.state.get("zoom")).toBe(1);
      expect(artifact.state.get("selectedElementId")).toBe(null);
    });

    it("moves element and emits element.moved event", () => {
      const artifact = new ArtifactInstance(sampleArtifact);
      let movedEvent: any = null;

      artifact.events.on("element.moved", (e) => {
        movedEvent = e;
      });

      artifact.moveElement("frontend", { x: 120, y: 180 });

      const el = artifact.getElement("frontend");
      expect(el?.position).toEqual({ x: 120, y: 180 });
      expect(movedEvent).not.toBeNull();
      expect(movedEvent.elementId).toBe("frontend");
      expect(movedEvent.position).toEqual({ x: 120, y: 180 });
    });

    it("removes element and auto-cleans attached connections", () => {
      const artifact = new ArtifactInstance(sampleArtifact);
      expect(artifact.definition.elements.length).toBe(2);
      expect(artifact.definition.connections.length).toBe(1);

      artifact.removeElement("frontend");

      expect(artifact.definition.elements.length).toBe(1);
      // Connection c1 from frontend to api should be automatically cleaned up
      expect(artifact.definition.connections.length).toBe(0);
    });

    it("applies batch patches cleanly", () => {
      const artifact = new ArtifactInstance(sampleArtifact);
      artifact.applyPatch({
        operation: "batch",
        patches: [
          {
            operation: "move",
            elementId: "api",
            position: { x: 400, y: 200 }
          },
          {
            operation: "update",
            elementId: "frontend",
            changes: {
              props: { label: "Next.js UI" }
            }
          }
        ]
      });

      expect(artifact.getElement("api")?.position).toEqual({ x: 400, y: 200 });
      expect(artifact.getElement("frontend")?.props?.label).toBe("Next.js UI");
    });
  });

  describe("Serialization Determinism", () => {
    it("performs round-trip serialization and deserialization cleanly", () => {
      const artifact = new ArtifactInstance(sampleArtifact);
      artifact.moveElement("frontend", { x: 150, y: 250 });

      const serialized = artifact.toJSON();
      const reconstructed = ArtifactInstance.fromJSON(serialized);

      expect(reconstructed.id).toBe(artifact.id);
      expect(reconstructed.toJSON()).toEqual(serialized);
    });
  });

  describe("ArtifactRuntime Manager", () => {
    it("creates, retrieves, and destroys artifacts", () => {
      const runtime = new ArtifactRuntime();
      const instance = runtime.create(sampleArtifact);

      expect(runtime.get("art_core_1")).toBe(instance);
      expect(runtime.has("art_core_1")).toBe(true);
      expect(runtime.list().length).toBe(1);

      runtime.destroy("art_core_1");
      expect(runtime.has("art_core_1")).toBe(false);
      expect(runtime.get("art_core_1")).toBeUndefined();
    });
  });
});
