import React, { useState } from "react";
import type { ArtifactRegistry } from "@interactive-artifact/registry";

export interface CapabilityExplorerProps {
  registry: ArtifactRegistry;
  onSelectSample: (artifact: any) => void;
}

export const CapabilityExplorer: React.FC<CapabilityExplorerProps> = ({ registry, onSelectSample }) => {
  const [query, setQuery] = useState("");
  const capabilities = registry.search(query);

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{
        padding: "8px 12px",
        borderBottom: "1px solid #1e293b",
        background: "#0f172a",
        display: "flex",
        alignItems: "center",
        gap: 8
      }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: "#94a3b8" }}>
          Capability Registry ({capabilities.length})
        </span>
        <input
          type="text"
          placeholder="Search by keywords or tags..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            flex: 1,
            background: "#1e293b",
            border: "1px solid #334155",
            borderRadius: 4,
            padding: "4px 8px",
            color: "#f8fafc",
            fontSize: 12,
            outline: "none"
          }}
        />
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "10px 12px", display: "flex", flexDirection: "column", gap: 10 }}>
        {capabilities.map((cap) => (
          <div
            key={cap.id}
            style={{
              background: "#0b1120",
              border: "1px solid #1e293b",
              borderRadius: 6,
              padding: 10
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
              <div style={{ fontWeight: 600, color: "#38bdf8", fontSize: 13 }}>
                {cap.name} <span style={{ color: "#64748b", fontSize: 11 }}>({cap.id})</span>
              </div>
              {cap.sampleArtifact && (
                <button
                  onClick={() => onSelectSample(cap.sampleArtifact)}
                  style={{
                    background: "#2563eb",
                    color: "#ffffff",
                    padding: "3px 8px",
                    fontSize: 11
                  }}
                >
                  Load Sample
                </button>
              )}
            </div>

            <div style={{ color: "#94a3b8", fontSize: 12, marginBottom: 6 }}>
              {cap.description}
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
              {cap.tags.map((t) => (
                <span
                  key={t}
                  style={{
                    background: "#1e293b",
                    color: "#a5f3fc",
                    fontSize: 10,
                    padding: "2px 6px",
                    borderRadius: 3
                  }}
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
