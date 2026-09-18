import React from "react";
import type { ArtifactEvent } from "@interactive-artifact/protocol";

export interface EventStreamProps {
  events: ArtifactEvent[];
  onClear: () => void;
}

export const EventStream: React.FC<EventStreamProps> = ({ events, onClear }) => {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "8px 12px",
        borderBottom: "1px solid #1e293b",
        background: "#0f172a"
      }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: "#94a3b8" }}>
          Live Event Log ({events.length})
        </span>
        <button
          onClick={onClear}
          style={{
            background: "#1e293b",
            color: "#94a3b8",
            padding: "3px 8px",
            fontSize: 11
          }}
        >
          Clear
        </button>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "8px 12px", fontFamily: "JetBrains Mono, monospace" }}>
        {events.length === 0 ? (
          <div style={{ color: "#64748b", fontSize: 12, textAlign: "center", marginTop: 24 }}>
            No events emitted yet. Interact with the artifact (drag, click, pan) to see events.
          </div>
        ) : (
          events.slice().reverse().map((ev, idx) => {
            const timeStr = new Date(ev.timestamp).toLocaleTimeString();
            let badgeBg = "#3b82f6";
            if (ev.type.startsWith("element.moved")) badgeBg = "#10b981";
            if (ev.type.startsWith("element.selected")) badgeBg = "#8b5cf6";
            if (ev.type.startsWith("element.deleted")) badgeBg = "#ef4444";
            if (ev.type.startsWith("state.changed")) badgeBg = "#f59e0b";

            return (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 8,
                  fontSize: 11,
                  padding: "4px 0",
                  borderBottom: "1px solid #1e293b"
                }}
              >
                <span style={{ color: "#64748b", minWidth: 60 }}>{timeStr}</span>
                <span style={{
                  background: badgeBg,
                  color: "#ffffff",
                  padding: "1px 6px",
                  borderRadius: 3,
                  fontWeight: 600
                }}>
                  {ev.type}
                </span>
                <span style={{ color: "#cbd5e1", flex: 1, wordBreak: "break-all" }}>
                  {JSON.stringify(ev, (k, v) => (k === "type" || k === "timestamp" ? undefined : v))}
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
