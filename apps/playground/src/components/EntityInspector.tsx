import React, { useState, useEffect } from "react";
import type { ArtifactInstance } from "@interactive-artifact/core";
import type { StructuredNode, MicroComponent, Port } from "@interactive-artifact/protocol";

interface EntityInspectorProps {
  artifact: ArtifactInstance | null;
  selectedId: string | null;
  onClear: () => void;
}

export const EntityInspector: React.FC<EntityInspectorProps> = ({
  artifact,
  selectedId,
  onClear
}) => {
  if (!artifact || !selectedId) {
    return (
      <div className="p-6 text-center text-xs text-slate-500">
        <div className="text-2xl mb-2">??</div>
        Select a node, port, or micro-component to inspect and mutate its properties live.
      </div>
    );
  }

  const tree = artifact.tree;
  const entity = tree.findChild(selectedId);

  if (!entity) {
    return (
      <div className="p-4 text-xs text-amber-400">
        Entity "{selectedId}" not found in current component tree.
      </div>
    );
  }

  const isNode = "position" in entity && "size" in entity;
  const isPort = "direction" in entity && "position" in entity && !isNode;
  const isComponent = !isNode && !isPort;

  // Node edits
  const node = isNode ? (entity as StructuredNode) : null;
  const comp = isComponent ? (entity as MicroComponent) : null;
  const port = isPort ? (entity as Port) : null;

  const [titleInput, setTitleInput] = useState("");
  const [badgeInput, setBadgeInput] = useState("");
  const [statusSelect, setStatusSelect] = useState("active");

  useEffect(() => {
    if (node) {
      setTitleInput(node.header?.title ?? (node.props?.label as string) ?? "");
      setBadgeInput(node.header?.badge ?? (node.props?.badge as string) ?? "");
      setStatusSelect(node.header?.status ?? (node.props?.status as string) ?? "active");
    } else if (comp) {
      setTitleInput(String(comp.props?.label ?? comp.props?.name ?? ""));
      setBadgeInput(String(comp.props?.variant ?? ""));
    }
  }, [selectedId, entity]);

  const handleUpdateNodeHeader = () => {
    if (!node) return;
    artifact.updateNode(node.id, {
      header: {
        ...node.header,
        title: titleInput,
        badge: badgeInput || undefined,
        status: statusSelect
      }
    });
  };

  const handleUpdateComp = () => {
    if (!comp) return;
    artifact.updateComponent(comp.id, {
      props: {
        ...comp.props,
        label: titleInput,
        variant: badgeInput || undefined
      }
    });
  };

  return (
    <div className="p-4 space-y-4 text-xs select-none">
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-200">
            {isNode ? "Structured Node" : isPort ? "Typed Port" : "Micro Component"}
          </span>
          <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-400">
            {selectedId}
          </span>
        </div>
        <button
          onClick={onClear}
          className="text-slate-400 hover:text-slate-200 text-xs px-1.5 py-0.5 rounded hover:bg-slate-800"
        >
          Clear
        </button>
      </div>

      {/* Node In-Place Editor */}
      {node && (
        <div className="space-y-3">
          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1">Header Title</label>
            <input
              type="text"
              value={titleInput}
              onChange={e => setTitleInput(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] font-medium text-slate-400 mb-1">Badge Tag</label>
              <input
                type="text"
                value={badgeInput}
                onChange={e => setBadgeInput(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-slate-400 mb-1">Status</label>
              <select
                value={statusSelect}
                onChange={e => setStatusSelect(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-blue-500"
              >
                <option value="active">Active</option>
                <option value="success">Success</option>
                <option value="warning">Warning</option>
                <option value="error">Error</option>
                <option value="idle">Idle</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleUpdateNodeHeader}
            className="w-full py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded transition-colors"
          >
            Apply In-Place Mutation
          </button>

          <div className="pt-2 border-t border-slate-800 text-[11px] space-y-1 text-slate-400">
            <div className="flex justify-between">
              <span>Position:</span>
              <span className="font-mono text-slate-300">({node.position.x}, {node.position.y})</span>
            </div>
            <div className="flex justify-between">
              <span>Size:</span>
              <span className="font-mono text-slate-300">{node.size.width} ? {node.size.height}</span>
            </div>
            <div className="flex justify-between">
              <span>Ports:</span>
              <span className="font-mono text-slate-300">{node.ports?.length ?? 0}</span>
            </div>
          </div>
        </div>
      )}

      {/* MicroComponent Editor */}
      {comp && (
        <div className="space-y-3">
          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1">Component Type</label>
            <div className="px-2.5 py-1.5 bg-slate-800 rounded font-mono text-indigo-300 text-xs">
              {comp.type}
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1">Label / Text</label>
            <input
              type="text"
              value={titleInput}
              onChange={e => setTitleInput(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            onClick={handleUpdateComp}
            className="w-full py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded transition-colors"
          >
            Update Micro-Component
          </button>
        </div>
      )}

      {/* Port Inspector */}
      {port && (
        <div className="space-y-2 text-[11px] text-slate-400">
          <div className="flex justify-between">
            <span>Direction:</span>
            <span className="font-semibold text-emerald-400 uppercase">{port.direction}</span>
          </div>
          <div className="flex justify-between">
            <span>Position Anchor:</span>
            <span className="font-mono text-slate-300">{String(port.position)}</span>
          </div>
          <div className="flex justify-between">
            <span>Data Type:</span>
            <span className="font-mono text-slate-300">{port.dataType ?? "any"}</span>
          </div>
          <div className="flex justify-between">
            <span>Owner Node:</span>
            <span className="font-mono text-blue-400">{port.nodeId}</span>
          </div>
        </div>
      )}

      {/* Raw JSON inspection */}
      <div className="pt-2 border-t border-slate-800">
        <label className="block text-[10px] font-mono text-slate-500 mb-1">RAW ENTITY JSON</label>
        <pre className="p-2 bg-slate-950 rounded text-[10px] font-mono text-slate-300 max-h-48 overflow-auto">
          {JSON.stringify(entity, null, 2)}
        </pre>
      </div>
    </div>
  );
};
