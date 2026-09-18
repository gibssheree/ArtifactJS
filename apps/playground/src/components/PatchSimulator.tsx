import React, { useState } from "react";
import type { ArtifactInstance } from "@interactive-artifact/core";
import { PatchBuilder } from "@interactive-artifact/ai";

export interface PatchSimulatorProps {
  artifact: ArtifactInstance | null;
  onPatchApplied: () => void;
}

export const PatchSimulator: React.FC<PatchSimulatorProps> = ({ artifact, onPatchApplied }) => {
  const [customPatchJson, setCustomPatchJson] = useState(`{
  "operation": "update_component",
  "componentId": "sec_auth_metric",
  "changes": {
    "props": { "label": "Latency p99", "value": "1.8 ms", "delta": "-3.2ms (Optimized)" }
  }
}`);

  if (!artifact) {
    return <div style={{ padding: 16, color: "#64748b" }}>No active artifact.</div>;
  }

  const handleApplyPresetPatch = (type: string) => {
    const def = artifact.definition;

    if (type === "update_metric") {
      // Look for a metric component
      const metric = artifact.tree.getAllEntities().find(e => e.kind === "component" && (e.entity as any).type === "metric");
      if (metric) {
        artifact.updateComponent(metric.id, {
          props: {
            label: "Latency p99 (AI Tuned)",
            value: "1.2 ms",
            delta: "-65% drop"
          }
        });
        onPatchApplied();
      } else {
        alert("No metric micro-component found in current artifact.");
      }
    } else if (type === "update_badge") {
      const firstNode = def.elements[0];
      if (firstNode) {
        artifact.updateNode(firstNode.id, {
          header: {
            ...(firstNode as any).header,
            badge: "v4.0 Enterprise",
            status: "success"
          }
        });
        onPatchApplied();
      }
    } else if (type === "insert_comp") {
      const firstNode = def.elements[0];
      if (firstNode) {
        artifact.insertComponent(firstNode.id, {
          id: `sec_ai_tag_${Date.now().toString().slice(-4)}`,
          type: "badge",
          props: { label: "AI Auto-Scaling Active", variant: "success" }
        });
        onPatchApplied();
      }
    } else if (type === "move_node") {
      const firstNode = def.elements[0];
      if (firstNode) {
        artifact.moveNode(firstNode.id, {
          x: firstNode.position.x + 30,
          y: firstNode.position.y + 20
        });
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
    <div className="h-full flex flex-col select-none text-xs">
      <div className="p-3 border-b border-slate-800 bg-slate-900/90 font-semibold text-slate-300 flex justify-between items-center">
        <span>Simulate AI Incremental Micro-Patches</span>
        <span className="text-[10px] text-emerald-400 font-mono">In-Place Mutation</span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div>
          <div className="text-[11px] font-medium text-slate-400 mb-2">Predefined AI Turn Patches:</div>
          <div className="grid grid-cols-1 gap-2">
            <button
              onClick={() => handleApplyPresetPatch("update_metric")}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-sky-400 rounded text-left border border-slate-700/60 font-medium transition-colors"
            >
              ?? "Patch Latency metric to 1.2ms (-65%)" (update_component)
            </button>
            <button
              onClick={() => handleApplyPresetPatch("update_badge")}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded text-left border border-slate-700/60 font-medium transition-colors"
            >
              ?? "Upgrade Gateway badge to v4.0 Enterprise" (update_node)
            </button>
            <button
              onClick={() => handleApplyPresetPatch("insert_comp")}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-emerald-400 rounded text-left border border-slate-700/60 font-medium transition-colors"
            >
              ?? "Inject AI Auto-Scaling badge component" (insert_component)
            </button>
            <button
              onClick={() => handleApplyPresetPatch("move_node")}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-indigo-400 rounded text-left border border-slate-700/60 font-medium transition-colors"
            >
              ?? "Nudge first node (+30px, +20px)" (move_node)
            </button>
            <button
              onClick={() => handleApplyPresetPatch("theme_toggle")}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-purple-400 rounded text-left border border-slate-700/60 font-medium transition-colors"
            >
              ?? "Switch canvas theme (Dark / Light)" (update_canvas)
            </button>
          </div>
        </div>

        <div className="flex-1 flex flex-col space-y-2 pt-2 border-t border-slate-800">
          <div className="flex justify-between items-center">
            <span className="text-[11px] font-medium text-slate-400">Custom Incremental Patch JSON:</span>
            <button
              onClick={handleApplyCustom}
              className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded font-medium transition-colors"
            >
              Dispatch Patch
            </button>
          </div>
          <textarea
            value={customPatchJson}
            onChange={e => setCustomPatchJson(e.target.value)}
            className="w-full h-36 bg-slate-950 border border-slate-800 rounded p-2.5 font-mono text-[11px] text-slate-200 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
};
