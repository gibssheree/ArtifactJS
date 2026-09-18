import React from "react";
import type { ArtifactInstance } from "@interactive-artifact/core";
import type { StructuredNode, MicroComponent, Port } from "@interactive-artifact/protocol";

interface ComponentTreeInspectorProps {
  artifact: ArtifactInstance | null;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}

export const ComponentTreeInspector: React.FC<ComponentTreeInspectorProps> = ({
  artifact,
  selectedId,
  onSelect
}) => {
  if (!artifact) {
    return <div style={{ padding: 16, fontSize: 12, color: "#94a3b8" }}>No active artifact loaded</div>;
  }

  const def = artifact.definition;

  const renderMicroComponent = (comp: MicroComponent, depth = 2) => {
    const isSelected = selectedId === comp.id;
    return (
      <div key={comp.id} style={{ paddingLeft: `${depth * 14}px`, margin: "2px 0" }}>
        <div
          onClick={(e) => {
            e.stopPropagation();
            onSelect(comp.id);
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "4px 8px",
            borderRadius: 4,
            fontSize: 11,
            cursor: "pointer",
            background: isSelected ? "#4f46e5" : "transparent",
            color: isSelected ? "#ffffff" : "#cbd5e1",
            fontWeight: isSelected ? 600 : 400
          }}
        >
          <span style={{ fontSize: 10, color: isSelected ? "#ffffff" : "#818cf8", fontFamily: "monospace" }}>◆</span>
          <span style={{ fontFamily: "monospace" }}>{comp.id}</span>
          <span style={{ fontSize: 10, opacity: 0.65 }}>({comp.type})</span>
          {comp.props?.label && (
            <span style={{
              fontSize: 10,
              padding: "1px 6px",
              background: isSelected ? "rgba(255, 255, 255, 0.2)" : "#1e293b",
              borderRadius: 3,
              color: isSelected ? "#ffffff" : "#94a3b8",
              maxWidth: 120,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap"
            }}>
              "{String(comp.props.label)}"
            </span>
          )}
        </div>
        {comp.children?.map(c => renderMicroComponent(c, depth + 1))}
      </div>
    );
  };

  const renderPort = (port: Port, depth = 2) => {
    const isSelected = selectedId === port.id;
    return (
      <div key={port.id} style={{ paddingLeft: `${depth * 14}px`, margin: "2px 0" }}>
        <div
          onClick={(e) => {
            e.stopPropagation();
            onSelect(port.id);
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "3px 8px",
            borderRadius: 4,
            fontSize: 11,
            cursor: "pointer",
            background: isSelected ? "#059669" : "transparent",
            color: isSelected ? "#ffffff" : "#94a3b8",
            fontWeight: isSelected ? 600 : 400
          }}
        >
          <span style={{ fontSize: 10, color: isSelected ? "#ffffff" : "#34d399", fontFamily: "monospace" }}>⚬</span>
          <span style={{ fontFamily: "monospace", color: isSelected ? "#ffffff" : "#e2e8f0" }}>{port.id}</span>
          <span style={{ fontSize: 10, color: isSelected ? "#ffffff" : "#34d399" }}>({port.direction})</span>
          {port.dataType && (
            <span style={{ fontSize: 10, opacity: 0.65, fontFamily: "monospace" }}>[{port.dataType}]</span>
          )}
        </div>
      </div>
    );
  };

  const renderNode = (el: StructuredNode) => {
    const isSelected = selectedId === el.id;
    const hasHeader = Boolean(el.header);
    const hasBody = Boolean(el.body);
    const hasFooter = Boolean(el.footer);
    const hasPorts = Boolean(el.ports && el.ports.length > 0);

    return (
      <div key={el.id} style={{ marginBottom: 8 }}>
        <div
          onClick={() => onSelect(el.id)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "6px 10px",
            borderRadius: 6,
            fontSize: 12,
            cursor: "pointer",
            fontWeight: 600,
            background: isSelected ? "#2563eb" : "#1e293b",
            color: isSelected ? "#ffffff" : "#f1f5f9",
            boxShadow: isSelected ? "0 1px 3px rgba(0,0,0,0.3)" : "none"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 11, color: isSelected ? "#ffffff" : "#60a5fa", fontFamily: "monospace" }}>■</span>
            <span style={{ fontFamily: "monospace" }}>{el.id}</span>
            <span style={{ fontSize: 11, opacity: 0.75, fontWeight: 400 }}>
              ({el.header?.title ?? el.props?.label ?? el.type})
            </span>
          </div>
          <span style={{ fontSize: 10, color: isSelected ? "#bfdbfe" : "#64748b", fontFamily: "monospace" }}>
            {el.position.x}, {el.position.y}
          </span>
        </div>

        {/* Regions */}
        <div style={{ borderLeft: "1px solid #334155", marginLeft: 14, marginTop: 4, paddingLeft: 6 }}>
          {/* Header */}
          {hasHeader && (
            <div style={{ paddingLeft: 8, padding: "2px 0", fontSize: 11, color: "#94a3b8" }}>
              <span style={{ color: "#fbbf24", fontFamily: "monospace", fontSize: 10, marginRight: 4 }}>header:</span>
              <span style={{ color: "#f8fafc" }}>"{el.header?.title}"</span>
              {el.header?.badge && (
                <span style={{ marginLeft: 6, fontSize: 10, padding: "1px 5px", background: "#451a03", color: "#fcd34d", borderRadius: 3 }}>
                  [{el.header.badge}]
                </span>
              )}
              {el.header?.actions?.map(a => renderMicroComponent(a, 1))}
            </div>
          )}

          {/* Body Sections */}
          {hasBody && (
            <div style={{ paddingLeft: 8, padding: "2px 0", fontSize: 11, color: "#94a3b8" }}>
              <span style={{ color: "#38bdf8", fontFamily: "monospace", fontSize: 10 }}>body:</span>
              {el.body?.sections?.map(s => renderMicroComponent(s, 1))}
            </div>
          )}

          {/* Footer */}
          {hasFooter && (
            <div style={{ paddingLeft: 8, padding: "2px 0", fontSize: 11, color: "#94a3b8" }}>
              <span style={{ color: "#c084fc", fontFamily: "monospace", fontSize: 10 }}>footer:</span>
              {el.footer?.content && <span style={{ marginLeft: 6, fontStyle: "italic" }}>"{el.footer.content}"</span>}
              {el.footer?.actions?.map(a => renderMicroComponent(a, 1))}
            </div>
          )}

          {/* Ports */}
          {hasPorts && (
            <div style={{ paddingLeft: 8, padding: "2px 0", fontSize: 11, color: "#94a3b8" }}>
              <span style={{ color: "#34d399", fontFamily: "monospace", fontSize: 10 }}>
                ports ({el.ports?.length}):
              </span>
              {el.ports?.map(p => renderPort(p, 1))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div style={{ padding: 12, userSelect: "none" }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingBottom: 8,
        marginBottom: 12,
        borderBottom: "1px solid #1e293b",
        fontSize: 12,
        fontWeight: 600,
        color: "#cbd5e1"
      }}>
        <span>Component Hierarchy ({def.elements.length} Nodes)</span>
        <span style={{ fontSize: 10, color: "#64748b", fontFamily: "monospace" }}>{def.id}</span>
      </div>
      <div>
        {def.elements.map(el => renderNode(el as StructuredNode))}
      </div>
    </div>
  );
};
