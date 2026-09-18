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
      <div style={{ padding: 24, textAlign: "center", fontSize: 12, color: "#64748b" }}>
        <div style={{ fontSize: 24, marginBottom: 8 }}>🔍</div>
        Select a node, port, or micro-component to inspect and mutate its properties live.
      </div>
    );
  }

  const tree = artifact.tree;
  const entity = tree.findChild(selectedId);

  if (!entity) {
    return (
      <div style={{ padding: 16, fontSize: 12, color: "#fbbf24" }}>
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
    <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 16, fontSize: 12, userSelect: "none" }}>
      {/* Header bar */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingBottom: 8,
        borderBottom: "1px solid #1e293b"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontWeight: 600, color: "#f1f5f9" }}>
            {isNode ? "Structured Node" : isPort ? "Typed Port" : "Micro Component"}
          </span>
          <span style={{
            padding: "2px 6px",
            borderRadius: 4,
            background: "#1e293b",
            fontSize: 11,
            fontFamily: "monospace",
            color: "#94a3b8"
          }}>
            {selectedId}
          </span>
        </div>
        <button
          onClick={onClear}
          style={{
            color: "#94a3b8",
            background: "transparent",
            fontSize: 11,
            padding: "2px 6px",
            borderRadius: 4
          }}
        >
          Clear
        </button>
      </div>

      {/* Node In-Place Editor */}
      {node && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div>
            <label style={{ display: "block", fontSize: 11, fontWeight: 500, color: "#94a3b8", marginBottom: 4 }}>
              Header Title
            </label>
            <input
              type="text"
              value={titleInput}
              onChange={e => setTitleInput(e.target.value)}
              style={{ width: "100%", boxSizing: "border-box" }}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <div>
              <label style={{ display: "block", fontSize: 11, fontWeight: 500, color: "#94a3b8", marginBottom: 4 }}>
                Badge Tag
              </label>
              <input
                type="text"
                value={badgeInput}
                onChange={e => setBadgeInput(e.target.value)}
                style={{ width: "100%", boxSizing: "border-box" }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 11, fontWeight: 500, color: "#94a3b8", marginBottom: 4 }}>
                Status
              </label>
              <select
                value={statusSelect}
                onChange={e => setStatusSelect(e.target.value)}
                style={{ width: "100%", boxSizing: "border-box" }}
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
            style={{
              width: "100%",
              padding: "7px 0",
              background: "#2563eb",
              color: "#ffffff",
              fontWeight: 600,
              borderRadius: 6
            }}
          >
            Apply In-Place Mutation
          </button>

          <div style={{
            paddingTop: 8,
            borderTop: "1px solid #1e293b",
            fontSize: 11,
            color: "#94a3b8",
            display: "flex",
            flexDirection: "column",
            gap: 4
          }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Position:</span>
              <span style={{ fontFamily: "monospace", color: "#cbd5e1" }}>({node.position.x}, {node.position.y})</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Size:</span>
              <span style={{ fontFamily: "monospace", color: "#cbd5e1" }}>{node.size.width} × {node.size.height}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Ports:</span>
              <span style={{ fontFamily: "monospace", color: "#cbd5e1" }}>{node.ports?.length ?? 0}</span>
            </div>
          </div>
        </div>
      )}

      {/* MicroComponent Editor */}
      {comp && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div>
            <label style={{ display: "block", fontSize: 11, fontWeight: 500, color: "#94a3b8", marginBottom: 4 }}>
              Component Type
            </label>
            <div style={{
              padding: "6px 10px",
              background: "#1e293b",
              borderRadius: 6,
              fontFamily: "monospace",
              color: "#a5b4fc",
              fontSize: 12
            }}>
              {comp.type}
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: 11, fontWeight: 500, color: "#94a3b8", marginBottom: 4 }}>
              Label / Text
            </label>
            <input
              type="text"
              value={titleInput}
              onChange={e => setTitleInput(e.target.value)}
              style={{ width: "100%", boxSizing: "border-box" }}
            />
          </div>

          <button
            onClick={handleUpdateComp}
            style={{
              width: "100%",
              padding: "7px 0",
              background: "#4f46e5",
              color: "#ffffff",
              fontWeight: 600,
              borderRadius: 6
            }}
          >
            Update Micro-Component
          </button>
        </div>
      )}

      {/* Port Inspector */}
      {port && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 11, color: "#94a3b8" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Direction:</span>
            <span style={{ fontWeight: 600, color: "#34d399", textTransform: "uppercase" }}>{port.direction}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Position Anchor:</span>
            <span style={{ fontFamily: "monospace", color: "#cbd5e1" }}>{String(port.position)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Data Type:</span>
            <span style={{ fontFamily: "monospace", color: "#cbd5e1" }}>{port.dataType ?? "any"}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Owner Node:</span>
            <span style={{ fontFamily: "monospace", color: "#60a5fa" }}>{port.nodeId}</span>
          </div>
        </div>
      )}

      {/* Raw JSON inspection */}
      <div style={{ paddingTop: 8, borderTop: "1px solid #1e293b" }}>
        <label style={{ display: "block", fontSize: 10, fontFamily: "monospace", color: "#64748b", marginBottom: 4 }}>
          RAW ENTITY JSON
        </label>
        <pre style={{
          padding: 8,
          background: "#090d16",
          borderRadius: 6,
          fontSize: 10,
          fontFamily: "JetBrains Mono, monospace",
          color: "#cbd5e1",
          maxHeight: 180,
          overflow: "auto",
          margin: 0
        }}>
          {JSON.stringify(entity, null, 2)}
        </pre>
      </div>
    </div>
  );
};
