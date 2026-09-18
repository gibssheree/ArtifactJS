import React, { useState, useMemo, useCallback, useEffect } from "react";
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

// Initialize singleton registry and runtime with all 10+ capabilities
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
      <div className="flex flex-col h-screen w-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
        {/* Top Navbar */}
        <header className="h-14 px-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between shrink-0 select-none">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white px-2.5 py-1 rounded-md font-bold text-sm tracking-tight shadow">
              ArtifactsJS
            </div>
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">
              Interactive Runtime IDE
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded bg-blue-950 border border-blue-800/60 text-blue-300 font-mono">
              Composite Architecture
            </span>
          </div>

          {/* Quick Controls Bar */}
          <div className="flex items-center gap-2 text-xs">
            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-slate-200 text-xs focus:outline-none"
            >
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            {/* Preset Selector */}
            <select
              value={selectedPresetId}
              onChange={e => handleSelectPreset(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-slate-200 text-xs max-w-xs focus:outline-none font-medium"
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
              className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-slate-200 text-xs focus:outline-none"
            >
              <option value="neutral">Neutral</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>

            <button
              onClick={handleResetView}
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700/60 transition-colors"
              title="Reset Zoom & Pan"
            >
              Reset View
            </button>

            <button
              onClick={handleResetArtifact}
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700/60 transition-colors"
            >
              Reset
            </button>

            <button
              onClick={handleExportJson}
              className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded shadow transition-colors"
            >
              Export JSON
            </button>
          </div>
        </header>

        {/* Main 3-Pane Workspace */}
        <div className="flex-1 flex overflow-hidden">
          {/* PANE 1 (LEFT): Declarative JSON Editor & Preset Info */}
          <div className="w-[30%] min-w-[320px] max-w-[460px] border-r border-slate-800 flex flex-col bg-slate-900/60">
            <JsonEditor
              initialValue={currentDefinition}
              onChange={newDef => {
                setCurrentDefinition(newDef);
              }}
            />
          </div>

          {/* PANE 2 (CENTER): Live Interactive Canvas */}
          <div className="flex-1 relative bg-slate-950 flex flex-col overflow-hidden">
            {/* Viewport indicators bar */}
            <div className="absolute top-3 right-3 z-10 flex items-center gap-2 bg-slate-900/80 backdrop-blur border border-slate-800 px-3 py-1.5 rounded-lg text-[11px] text-slate-400 shadow-sm pointer-events-none select-none">
              <span>Zoom: <strong className="text-slate-200">{Math.round(((liveState.zoom as number) || 1) * 100)}%</strong></span>
              <span>?</span>
              <span>Pan: <strong className="text-slate-200">{Math.round(((liveState.pan as any)?.x) || 0)}, {Math.round(((liveState.pan as any)?.y) || 0)}</strong></span>
              <span>?</span>
              <span className="text-sky-400">Wheel zoom ? Drag nodes ? Click ports & actions</span>
            </div>

            <ArtifactRenderer
              artifact={artifactInstance}
              renderer={svgRenderer}
              onEvent={handleEvent}
              style={{ width: "100%", height: "100%" }}
            />
          </div>

          {/* PANE 3 (RIGHT): Deep Inspector Panel */}
          <div className="w-[28%] min-w-[340px] max-w-[460px] border-l border-slate-800 flex flex-col bg-slate-900/80">
            {/* Inspector Tab Buttons */}
            <div className="h-10 border-b border-slate-800 bg-slate-900 px-2 flex items-center gap-1 overflow-x-auto shrink-0 select-none">
              <button
                onClick={() => setActiveTab("tree")}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                  activeTab === "tree" ? "bg-slate-800 text-blue-400 shadow-sm" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                ?? Tree
              </button>
              <button
                onClick={() => setActiveTab("inspector")}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                  activeTab === "inspector" ? "bg-slate-800 text-blue-400 shadow-sm" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                ?? Entity
              </button>
              <button
                onClick={() => setActiveTab("ai_patch")}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                  activeTab === "ai_patch" ? "bg-slate-800 text-blue-400 shadow-sm" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                ?? AI Patch
              </button>
              <button
                onClick={() => setActiveTab("state")}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                  activeTab === "state" ? "bg-slate-800 text-blue-400 shadow-sm" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                ? State
              </button>
              <button
                onClick={() => setActiveTab("events")}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                  activeTab === "events" ? "bg-slate-800 text-blue-400 shadow-sm" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                ?? Events ({events.length})
              </button>
              <button
                onClick={() => setActiveTab("capabilities")}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                  activeTab === "capabilities" ? "bg-slate-800 text-blue-400 shadow-sm" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                ?? Catalog
              </button>
            </div>

            {/* Tab Body */}
            <div className="flex-1 overflow-y-auto">
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
                  onSelectCapability={(cap) => {
                    if (cap.sampleArtifact) {
                      setCurrentDefinition(structuredClone(cap.sampleArtifact));
                      setSelectedPresetId(cap.sampleArtifact.id);
                    }
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </ArtifactProvider>
  );
};
