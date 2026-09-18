import React, { useState } from "react";
import type { ArtifactInstance } from "@interactive-artifact/core";
import { PatchBuilder } from "@interactive-artifact/ai";

export interface PatchSimulatorProps {
  artifact: ArtifactInstance | null;
  onPatchApplied: () => void;
}

export const PatchSimulator: React.FC<PatchSimulatorProps> = ({ artifact, onPatchApplied }) => {
  const [customPatchJson, setCustomPatchJson] = useState(`{
  "operation": "update",
  "elementId": "api",
  "changes": {
    "props": { "status": "warning" },
    "style": { "fill": "#fef3c7", "stroke": "#d97706" }
  }
}`);

  if (!artifact) {
    return <div style={{ padding: 16, color: "#64748b" }}>No active artifact.</div>;
  }

  const handleApplyPresetPatch = (type: string) => {
    const def = artifact.definition;
    if (type === "move_down") {
      const target = def.elements[def.elements.length - 1];
      if (target) {
        artifact.applyPatch(PatchBuilder.move(target.id, target.position.x, target.position.y + 60));
        onPatchApplied();
      }
    } else if (type === "move_right") {
      const target = def.elements[0];
      if (target) {
        artifact.applyPatch(PatchBuilder.move(target.id, target.position.x + 50, target.position.y));
        onPatchApplied();
      }
    } else if (type === "theme_toggle") {
      const current = def.canvas?.theme ?? "neutral";
      const next = current === "dark" ? "light" : "dark";
      artifact.applyPatch({
        operation: "update_canvas",
        changes: { theme: next }
      });
      artifact.state.set("theme", next);
      onPatchApplied();
    } else if (type === "add_service") {
      const newId = `service_${Date.now().toString().slice(-4)}`;
      artifact.applyPatch(
        PatchBuilder.insert({
          id: newId,
          type: "node",
          position: { x: 370, y: 340 },
          size: { width: 170, height: 75 },
          props: {
            label: "Auth Worker",
            subLabel: "Background Job",
            shape: "rectangle",
            status: "active"
          },
          style: {
            fill: "#f3e8ff",
            stroke: "#9333ea",
            strokeWidth: 2,
            radius: 12
          }
        })
      );
      // Connect to first element if possible
      const firstEl = def.elements[0];
      if (firstEl) {
        artifact.applyPatch(
          PatchBuilder.connect({
            id: `c_${firstEl.id}_${newId}`,
            from: firstEl.id,
            to: newId,
            type: "arrow",
            label: "JWT Verify",
            style: { stroke: "#9333ea", strokeWidth: 2 }
          })
        );
      }
      onPatchApplied();
    }
  };

  const handleApplyCustom = () => {
    try {
      const patch = JSON.parse(customPatchJson);
      artifact.applyPatch(patch);
      onPatchApplied();
    } catch (err: any) {
      alert(`Invalid Patch JSON: ${err.message}`);
    }
  };

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{
        padding: "8px 12px",
        borderBottom: "1px solid #1e293b",
        background: "#0f172a",
        fontSize: 12,
        fontWeight: 600,
        color: "#94a3b8"
      }}>
        Simulate Conversational AI Incremental Patches
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: 12, display: "flex", gap: 16 }}>
        {/* Preset quick patch buttons */}
        <div style={{ width: 280, display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ fontSize: 12, fontWeight: 500, color: "#cbd5e1" }}>Quick Action Patches:</div>
          <button
            onClick={() => handleApplyPresetPatch("move_down")}
            style={{ background: "#1e293b", color: "#38bdf8", padding: "8px 12px", textAlign: "left" }}
          >
            🤖 "Move bottom node down by 60px"
          </button>
          <button
            onClick={() => handleApplyPresetPatch("move_right")}
            style={{ background: "#1e293b", color: "#38bdf8", padding: "8px 12px", textAlign: "left" }}
          >
            🤖 "Shift first node right by 50px"
          </button>
          <button
            onClick={() => handleApplyPresetPatch("add_service")}
            style={{ background: "#1e293b", color: "#34d399", padding: "8px 12px", textAlign: "left" }}
          >
            🤖 "Add Auth Worker node + connection"
          </button>
          <button
            onClick={() => handleApplyPresetPatch("theme_toggle")}
            style={{ background: "#1e293b", color: "#f59e0b", padding: "8px 12px", textAlign: "left" }}
          >
            🤖 "Toggle Canvas Theme (Dark / Light)"
          </button>
        </div>

        {/* Custom patch JSON input */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 12, fontWeight: 500, color: "#cbd5e1" }}>Custom Patch Instruction:</span>
            <button
              onClick={handleApplyCustom}
              style={{ background: "#2563eb", color: "#ffffff", padding: "4px 12px" }}
            >
              Apply Patch
            </button>
          </div>
          <textarea
            value={customPatchJson}
            onChange={(e) => setCustomPatchJson(e.target.value)}
            style={{ flex: 1, minHeight: 90 }}
          />
        </div>
      </div>
    </div>
  );
};
