import React, { useState, useMemo, useCallback } from "react";
import { ArtifactRuntime, ArtifactInstance } from "@interactive-artifact/core";
import { ArtifactRegistry } from "@interactive-artifact/registry";
import { SVGRenderer } from "@interactive-artifact/renderer-svg";
import { ArtifactRenderer, ArtifactProvider } from "@interactive-artifact/react";
import type { ArtifactDefinition, ArtifactEvent, ThemeMode } from "@interactive-artifact/protocol";

import { flowchartCapability } from "@interactive-artifact/flowchart";
import { excalidrawCapability } from "@interactive-artifact/excalidraw";
import { chartCapability } from "@interactive-artifact/charts";
import { registerCatalogCapabilities } from "@interactive-artifact/catalog";

import { PRESETS, type PresetItem } from "./presets.js";
import { JsonEditor } from "./components/JsonEditor.js";
import { EventStream } from "./components/EventStream.js";
import { StateInspector } from "./components/StateInspector.js";
import { CapabilityExplorer } from "./components/CapabilityExplorer.js";
import { PatchSimulator } from "./components/PatchSimulator.js";
import { ComponentTreeInspector } from "./components/ComponentTreeInspector.js";
import { EntityInspector } from "./components/EntityInspector.js";

// Initialize singleton registry and runtime with all capabilities
const registry = new ArtifactRegistry();
registry.register(flowchartCapability);
registry.register(excalidrawCapability);
registry.register(chartCapability);
registerCatalogCapabilities(registry);

const runtime = new ArtifactRuntime();
const svgRenderer = new SVGRenderer();

type InspectorTab = "tree" | "inspector" | "state" | "events" | "capabilities" | "ai_patch";

export const App: React.FC = () => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>(PRESETS[0]!.id);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [currentDefinition, setCurrentDefinition] = useState<ArtifactDefinition>(() => PRESETS[0]!.artifact);
  const [events, setEvents] = useState<ArtifactEvent[]>([]);
  const [activeTab, setActiveTab] = useState<InspectorTab>("tree");
  const [selectedEntityId, setSelectedEntityId] = useState<string | null>(null);
  const [liveState, setLiveState] = useState<Record<string, unknown>>({});
  const [, setTreeVersion] = useState(0);

  // Active artifact instance in runtime
  const artifactInstance = useMemo<ArtifactInstance>(() => {
    const instance = runtime.create(currentDefinition);
    setLiveState(instance.state.snapshot());

    instance.state.subscribeAll(() => {
      setLiveState(instance.state.snapshot());
    });

    instance.events.on("artifact.updated", () => {
      setTreeVersion(v => v + 1);
    });

    instance.events.on("element.selected", (e: any) => {
      setSelectedEntityId(e.elementId);
    });

    instance.events.on("component.clicked", (e: any) => {
      setSelectedEntityId(e.componentId);
      setActiveTab("inspector");
    });

    instance.events.on("port.clicked", (e: any) => {
      setSelectedEntityId(e.portId);
      setActiveTab("inspector");
    });

    return instance;
  }, [currentDefinition]);

  const handleEvent = useCallback((event: ArtifactEvent) => {
    setEvents(prev => [...prev.slice(-150), event]);
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>(["All"]);
    for (const p of PRESETS) set.add(p.category);
    return Array.from(set);
  }, []);

  const filteredPresets = useMemo(() => {
    if (selectedCategory === "All") return PRESETS;
    return PRESETS.filter(p => p.category === selectedCategory);
  }, [selectedCategory]);

  const handleSelectPreset = (presetId: string) => {
    setSelectedPresetId(presetId);
    const preset = PRESETS.find(p => p.id === presetId);
    if (preset) {
      setCurrentDefinition(structuredClone(preset.artifact));
      setSelectedEntityId(null);
    }
  };

  const handleThemeChange = (theme: ThemeMode) => {
    artifactInstance.applyPatch({
      operation: "update_canvas",
      changes: { theme }
    });
    artifactInstance.state.set("theme", theme);
    setCurrentDefinition(artifactInstance.toJSON());
  };

  const handleResetView = () => {
    artifactInstance.state.batch(() => {
      artifactInstance.state.set("zoom", 1);
      artifactInstance.state.set("pan", { x: 0, y: 0 });
      artifactInstance.selectElement(null);
      setSelectedEntityId(null);
    });
  };

  const handleResetArtifact = () => {
    const preset = PRESETS.find(p => p.id === selectedPresetId);
    if (preset) {
      setCurrentDefinition(structuredClone(preset.artifact));
      setEvents([]);
      setSelectedEntityId(null);
    }
  };

  const handleExportJson = () => {
    const jsonStr = JSON.stringify(artifactInstance.toJSON(), null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${artifactInstance.id || "artifact"}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ArtifactProvider runtime={runtime} registry={registry} defaultRenderer={svgRenderer}>
      <div className="app-container">
        {/* Top Navbar */}
        <header className="top-navbar">
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div className="brand-badge">
              ArtifactsJS
            </div>
            <span style={{ fontSize: 12, color: "#94a3b8", fontWeight: 500 }}>
              Interactive Runtime IDE
            </span>
            <span className="brand-pill">
              Composite Architecture
            </span>
          </div>

          {/* Quick Controls Bar */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}>
            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              title="Filter by Category"
            >
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            {/* Preset Selector */}
            <select
              value={selectedPresetId}
              onChange={e => handleSelectPreset(e.target.value)}
              style={{ fontWeight: 600, maxWidth: 280 }}
              title="Select Capability Preset"
            >
              {filteredPresets.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>

            {/* Theme Selector */}
            <select
              value={(artifactInstance.state.get("theme") as string) ?? "neutral"}
              onChange={e => handleThemeChange(e.target.value as ThemeMode)}
              title="Theme Mode"
            >
              <option value="neutral">Neutral</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>

            <button
              onClick={handleResetView}
              style={{ background: "#1e293b", color: "#cbd5e1", border: "1px solid #334155", padding: "5px 10px" }}
              title="Reset Zoom & Pan"
            >
              Reset View
            </button>

            <button
              onClick={handleResetArtifact}
              style={{ background: "#1e293b", color: "#cbd5e1", border: "1px solid #334155", padding: "5px 10px" }}
            >
              Reset
            </button>

            <button
              onClick={handleExportJson}
              style={{ background: "#2563eb", color: "#ffffff", padding: "5px 12px", fontWeight: 600 }}
            >
              Export JSON
            </button>
          </div>
        </header>

        {/* Main 3-Pane Workspace */}
        <main className="workspace-3pane">
          {/* PANE 1 (LEFT): Declarative JSON Editor */}
          <section className="pane-left">
            <JsonEditor
              initialValue={currentDefinition}
              onChange={newDef => {
                setCurrentDefinition(newDef);
              }}
            />
          </section>

          {/* PANE 2 (CENTER): Live Interactive Canvas */}
          <section className="pane-center">
            {/* Viewport indicators bar */}
            <div className="viewport-hud">
              <span>Zoom: <strong>{Math.round(((liveState.zoom as number) || 1) * 100)}%</strong></span>
              <span className="bullet">•</span>
              <span>Pan: <strong>{Math.round(((liveState.pan as any)?.x) || 0)}, {Math.round(((liveState.pan as any)?.y) || 0)}</strong></span>
              <span className="bullet">•</span>
              <span className="instructions">Wheel zoom • Drag nodes • Click ports & actions</span>
            </div>

            <div style={{ width: "100%", height: "100%", position: "relative" }}>
              <ArtifactRenderer
                artifact={artifactInstance}
                renderer={svgRenderer}
                onEvent={handleEvent}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </section>

          {/* PANE 3 (RIGHT): Deep Inspector Panel */}
          <aside className="pane-right">
            {/* Inspector Tab Buttons */}
            <div className="inspector-tab-bar">
              <button
                onClick={() => setActiveTab("tree")}
                className={`inspector-tab-btn ${activeTab === "tree" ? "active" : ""}`}
              >
                ☲ Tree
              </button>
              <button
                onClick={() => setActiveTab("inspector")}
                className={`inspector-tab-btn ${activeTab === "inspector" ? "active" : ""}`}
              >
                ⚙ Entity
              </button>
              <button
                onClick={() => setActiveTab("ai_patch")}
                className={`inspector-tab-btn ${activeTab === "ai_patch" ? "active" : ""}`}
              >
                ✦ AI Patch
              </button>
              <button
                onClick={() => setActiveTab("state")}
                className={`inspector-tab-btn ${activeTab === "state" ? "active" : ""}`}
              >
                ◎ State
              </button>
              <button
                onClick={() => setActiveTab("events")}
                className={`inspector-tab-btn ${activeTab === "events" ? "active" : ""}`}
              >
                ⚡ Events ({events.length})
              </button>
              <button
                onClick={() => setActiveTab("capabilities")}
                className={`inspector-tab-btn ${activeTab === "capabilities" ? "active" : ""}`}
              >
                ▦ Catalog
              </button>
            </div>

            {/* Tab Body */}
            <div className="inspector-tab-body">
              {activeTab === "tree" && (
                <ComponentTreeInspector
                  artifact={artifactInstance}
                  selectedId={selectedEntityId}
                  onSelect={(id) => {
                    setSelectedEntityId(id);
                    if (id) {
                      artifactInstance.selectElement(id);
                      setActiveTab("inspector");
                    }
                  }}
                />
              )}

              {activeTab === "inspector" && (
                <EntityInspector
                  artifact={artifactInstance}
                  selectedId={selectedEntityId}
                  onClear={() => {
                    setSelectedEntityId(null);
                    artifactInstance.selectElement(null);
                  }}
                />
              )}

              {activeTab === "ai_patch" && (
                <PatchSimulator
                  artifact={artifactInstance}
                  onPatchApplied={() => {
                    setCurrentDefinition(artifactInstance.toJSON());
                  }}
                />
              )}

              {activeTab === "state" && (
                <StateInspector state={liveState} />
              )}

              {activeTab === "events" && (
                <EventStream
                  events={events}
                  onClear={() => setEvents([])}
                />
              )}

              {activeTab === "capabilities" && (
                <CapabilityExplorer
                  registry={registry}
                  onSelectSample={(sample) => {
                    if (sample) {
                      setCurrentDefinition(structuredClone(sample));
                      setSelectedPresetId(sample.id);
                    }
                  }}
                />
              )}
            </div>
          </aside>
        </main>
      </div>
    </ArtifactProvider>
  );
};
