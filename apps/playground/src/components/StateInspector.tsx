import React from "react";

export interface StateInspectorProps {
  state: Record<string, unknown>;
}

export const StateInspector: React.FC<StateInspectorProps> = ({ state }) => {
  const entries = Object.entries(state);

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
        Reactive State Store ({entries.length} keys)
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "8px 12px", fontFamily: "JetBrains Mono, monospace" }}>
        {entries.length === 0 ? (
          <div style={{ color: "#64748b", fontSize: 12, textAlign: "center", marginTop: 24 }}>
            State store is empty.
          </div>
        ) : (
          entries.map(([key, val]) => (
            <div
              key={key}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "4px 0",
                borderBottom: "1px solid #1e293b",
                fontSize: 12
              }}
            >
              <span style={{ color: "#38bdf8", fontWeight: 500 }}>{key}</span>
              <span style={{ color: "#a5f3fc" }}>{JSON.stringify(val)}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
