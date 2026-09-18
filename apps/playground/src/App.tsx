import React, { useState, useMemo, useCallback } from "react";
import { ArtifactRuntime, ArtifactInstance } from "@interactive-artifact/core";
import { ArtifactRegistry } from "@interactive-artifact/registry";
import { SVGRenderer } from "@interactive-artifact/renderer-svg";
import { ArtifactRenderer, ArtifactProvider } from "@interactive-artifact/react";
import type { ArtifactDefinition, ArtifactEvent, ThemeMode } from "@interactive-artifact/protocol";

import { flowchartCapability } from "@interactive-artifact/flowchart";
import { excalidrawCapability } from "@interactive-artifact/excalidraw";
import { chartCapability } from "@interactive-artifact/charts";

import { PRESETS } from "./presets.js";
import { JsonEditor } from "./components/JsonEditor.js";
import { EventStream } from "./components/EventStream.js";
import { StateInspector } from "./components/StateInspector.js";
import { CapabilityExplorer } from "./components/CapabilityExplorer.js";
import { PatchSimulator } from "./components/PatchSimulator.js";

// Initialize singleton registry and runtime
const registry = new ArtifactRegistry();
registry.register(flowchartCapability);
registry.register(excalidrawCapability);
registry.register(chartCapability);

const runtime = new ArtifactRuntime();
const svgRenderer = new SVGRenderer();

export const App: React.FC = () => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>(PRESETS[0]!.id);
  const [currentDefinition, setCurrentDefinition] = useState<ArtifactDefinition>(() => PRESETS[0]!.artifact);
  const [events, setEvents] = useState<ArtifactEvent[]>([]);
  const [activeTab, setActiveTab] = useState<"events" | "state" | "capabilities" | "patches">("events");
  const [liveState, setLiveState] = useState<Record<string, unknown>>({});

  // Active artifact instance in runtime
  const artifactInstance = useMemo<ArtifactInstance>(() => {
    const instance = runtime.create(currentDefinition);
    setLiveState(instance.state.snapshot());

    // Sync state changes to UI inspector
    instance.state.subscribeAll(() => {
      setLiveState(instance.state.snapshot());
    });

    return instance;
  }, [currentDefinition]);

  const handleEvent = useCallback((event: ArtifactEvent) => {
    setEvents(prev => [...prev.slice(-150), event]);
    // If element moved or deleted, update definition sync
    if (event.type === "artifact.updated" || event.type === "element.moved" || event.type === "element.deleted") {
      // Sync definition
    }
  }, []);

  const handleSelectPreset = (presetId: string) => {
    setSelectedPresetId(presetId);
    const preset = PRESETS.find(p => p.id === presetId);
    if (preset) {
      setCurrentDefinition(structuredClone(preset.artifact));
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
    });
  };

  const handleResetArtifact = () => {
    const preset = PRESETS.find(p => p.id === selectedPresetId);
    if (preset) {
      setCurrentDefinition(structuredClone(preset.artifact));
      setEvents([]);
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
      <div style={{ display: "flex", flexDirection: "column", height: "100vh", width: "100vw", background: "#0f172a" }}>
        {/* Top Navbar */}
        <header style={{
          height: 52,
          padding: "0 16px",
          background: "#1e293b",
          borderBottom: "1px solid #334155",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
              color: "#ffffff",
              padding: "4px 10px",
              borderRadius: 6,
              fontWeight: 700,
              fontSize: 14,
              letterSpacing: "-0.02em"
            }}>
              Interactive Artifact
            </div>
            <span style={{ fontSize: 13, color: "#94a3b8", fontWeight: 500 }}>
              AI Runtime Playground
            </span>
          </div>

          {/* Controls bar */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 12, color: "#94a3b8" }}>Preset:</span>
              <select
                value={selectedPresetId}
                onChange={(e) => handleSelectPreset(e.target.value)}
              >
                {PRESETS.map(p => (
                  <option key={p.id} value={p.id}>
                    [{p.category}] {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 12, color: "#94a3b8" }}>Theme:</span>
              <select
                value={(artifactInstance.state.get("theme") as string) ?? "neutral"}
                onChange={(e) => handleThemeChange(e.target.value as ThemeMode)}
              >
                <option value="neutral">Neutral</option>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>

            <button
              onClick={handleResetView}
              style={{ background: "#334155", color: "#f8fafc", padding: "6px 12px" }}
              title="Reset Zoom and Pan to 100%"
            >
              Reset View
            </button>

            <button
              onClick={handleResetArtifact}
              style={{ background: "#334155", color: "#f8fafc", padding: "6px 12px" }}
            >
              Reset Artifact
            </button>

            <button
              onClick={handleExportJson}
              style={{ background: "#2563eb", color: "#ffffff", padding: "6px 14px", fontWeight: 600 }}
            >
              Export JSON
            </button>
          </div>
        </header>

        {/* Center Workspace */}
        <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
          {/* Left: JSON Editor */}
          <div style={{ width: "42%", borderRight: "1px solid #1e293b", display: "flex", flexDirection: "column" }}>
            <JsonEditor
              initialValue={currentDefinition}
              onChange={(newDef) => {
                setCurrentDefinition(newDef);
              }}
            />
          </div>

          {/* Right: Live Interactive Artifact Preview */}
          <div style={{
            flex: 1,
            position: "relative",
            background: "#090d16",
            display: "flex",
            flexDirection: "column"
          }}>
            {/* Viewport indicators */}
            <div style={{
              position: "absolute",
              top: 12,
              right: 12,
              zIndex: 10,
              display: "flex",
              gap: 8,
              background: "rgba(15, 23, 42, 0.8)",
              backdropFilter: "blur(4px)",
              padding: "4px 8px",
              borderRadius: 6,
              border: "1px solid #334155",
              fontSize: 11,
              color: "#94a3b8"
            }}>
              <span>Zoom: {Math.round(((liveState.zoom as number) || 1) * 100)}%</span>
              <span>•</span>
              <span>Pan: {Math.round(((liveState.pan as any)?.x) || 0)}, {Math.round(((liveState.pan as any)?.y) || 0)}</span>
              <span>•</span>
              <span style={{ color: "#38bdf8" }}>Drag elements to move • Wheel to zoom • Click to select</span>
            </div>

            <ArtifactRenderer
              artifact={artifactInstance}
              renderer={svgRenderer}
              onEvent={handleEvent}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>

        {/* Bottom Inspector Tabs */}
        <div style={{ height: 230, borderTop: "1px solid #1e293b", background: "#0b1120", display: "flex", flexDirection: "column" }}>
          {/* Tabs bar */}
          <div style={{
            height: 34,
            display: "flex",
            alignItems: "center",
            padding: "0 12px",
            background: "#0f172a",
            borderBottom: "1px solid #1e293b",
            gap: 4
          }}>
            <button
              onClick={() => setActiveTab("events")}
              style={{
                background: activeTab === "events" ? "#1e293b" : "transparent",
                color: activeTab === "events" ? "#38bdf8" : "#94a3b8",
                padding: "5px 12px",
                fontSize: 12,
                borderRadius: "4px 4px 0 0"
              }}
            >
              Event Stream ({events.length})
            </button>
            <button
              onClick={() => setActiveTab("state")}
              style={{
                background: activeTab === "state" ? "#1e293b" : "transparent",
                color: activeTab === "state" ? "#38bdf8" : "#94a3b8",
                padding: "5px 12px",
                fontSize: 12,
                borderRadius: "4px 4px 0 0"
              }}
            >
              Reactive State
            </button>
            <button
              onClick={() => setActiveTab("capabilities")}
              style={{
                background: activeTab === "capabilities" ? "#1e293b" : "transparent",
                color: activeTab === "capabilities" ? "#38bdf8" : "#94a3b8",
                padding: "5px 12px",
                fontSize: 12,
                borderRadius: "4px 4px 0 0"
              }}
            >
              Capability Registry ({registry.list().length})
            </button>
            <button
              onClick={() => setActiveTab("patches")}
              style={{
                background: activeTab === "patches" ? "#1e293b" : "transparent",
                color: activeTab === "patches" ? "#34d399" : "#94a3b8",
                padding: "5px 12px",
                fontSize: 12,
                borderRadius: "4px 4px 0 0"
              }}
            >
              AI Patch Simulator ⚡
            </button>
          </div>

          {/* Active Tab View */}
          <div style={{ flex: 1, overflow: "hidden" }}>
            {activeTab === "events" && (
              <EventStream events={events} onClear={() => setEvents([])} />
            )}
            {activeTab === "state" && (
              <StateInspector state={liveState} />
            )}
            {activeTab === "capabilities" && (
              <CapabilityExplorer
                registry={registry}
                onSelectSample={(sample) => {
                  setCurrentDefinition(sample);
                }}
              />
            )}
            {activeTab === "patches" && (
              <PatchSimulator
                artifact={artifactInstance}
                onPatchApplied={() => {
                  setCurrentDefinition(artifactInstance.toJSON());
                }}
              />
            )}
          </div>
        </div>
      </div>
    </ArtifactProvider>
  );
};
