import React, { useState, useRef, useEffect, useMemo } from "react";
import { ArtifactRuntime, ArtifactInstance } from "@interactive-artifact/core";
import { ArtifactRegistry } from "@interactive-artifact/registry";
import { SVGRenderer } from "@interactive-artifact/renderer-svg";
import { ArtifactRenderer, ArtifactProvider } from "@interactive-artifact/react";
import { flowchartCapability } from "@interactive-artifact/flowchart";
import type { ArtifactDefinition, ArtifactEvent } from "@interactive-artifact/protocol";
import { generateMockAIResponse } from "./mockAI.js";

interface Message {
  id: string;
  sender: "user" | "assistant";
  text: string;
  hasArtifact?: boolean;
}

const registry = new ArtifactRegistry();
registry.register(flowchartCapability);

const runtime = new ArtifactRuntime();
const svgRenderer = new SVGRenderer();

export const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m_welcome",
      sender: "assistant",
      text: "Hello! I am your AI architect. Ask me to generate an architecture diagram, or click one of the suggested prompts below."
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [currentArtifactDef, setCurrentArtifactDef] = useState<ArtifactDefinition | null>(null);
  const [interactionEvents, setInteractionEvents] = useState<string[]>([]);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Active runtime artifact instance
  const activeInstance = useMemo<ArtifactInstance | null>(() => {
    if (!currentArtifactDef) return null;
    return runtime.create(currentArtifactDef);
  }, [currentArtifactDef]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, interactionEvents]);

  const handleSend = (textToSend?: string) => {
    const text = (textToSend ?? inputText).trim();
    if (!text) return;

    const userMsg: Message = {
      id: `msg_${Date.now()}_u`,
      sender: "user",
      text
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText("");

    // Simulate AI thinking and response
    setTimeout(() => {
      const response = generateMockAIResponse(text, currentArtifactDef);

      if (response.artifact) {
        setCurrentArtifactDef(response.artifact);
        setMessages(prev => [
          ...prev,
          {
            id: `msg_${Date.now()}_a`,
            sender: "assistant",
            text: response.message,
            hasArtifact: true
          }
        ]);
      } else if (response.patch && activeInstance) {
        activeInstance.applyPatch(response.patch);
        setCurrentArtifactDef(activeInstance.toJSON());
        setMessages(prev => [
          ...prev,
          {
            id: `msg_${Date.now()}_a`,
            sender: "assistant",
            text: response.message,
            hasArtifact: false
          }
        ]);
      } else {
        setMessages(prev => [
          ...prev,
          {
            id: `msg_${Date.now()}_a`,
            sender: "assistant",
            text: response.message
          }
        ]);
      }
    }, 400);
  };

  const handleArtifactEvent = (event: ArtifactEvent) => {
    if (event.type === "element.moved") {
      setInteractionEvents(prev => [
        ...prev.slice(-4),
        `User moved node "${event.elementId}" to (${event.position.x}, ${event.position.y})`
      ]);
    } else if (event.type === "element.selected" && event.elementId) {
      setInteractionEvents(prev => [
        ...prev.slice(-4),
        `User selected node "${event.elementId}"`
      ]);
    }
  };

  return (
    <ArtifactProvider runtime={runtime} registry={registry} defaultRenderer={svgRenderer}>
      <div style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        background: "#090d16",
        color: "#f8fafc"
      }}>
        {/* Header */}
        <header style={{
          height: 52,
          padding: "0 20px",
          background: "#0f172a",
          borderBottom: "1px solid #1e293b",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 18 }}>🤖</span>
            <span style={{ fontWeight: 700, fontSize: 14 }}>
              AI Architect Chatbot <span style={{ color: "#38bdf8", fontWeight: 500 }}>(Interactive Artifact Demo)</span>
            </span>
          </div>
          <div style={{ fontSize: 12, color: "#64748b" }}>
            Protocol v1.0 • Incremental Patch Updates • SVG Renderer
          </div>
        </header>

        {/* Chat message stream */}
        <div style={{ flex: 1, overflowY: "auto", padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
          {messages.map((m) => (
            <div
              key={m.id}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: m.sender === "user" ? "flex-end" : "flex-start",
                maxWidth: "100%"
              }}
            >
              <div style={{
                maxWidth: m.hasArtifact ? "920px" : "680px",
                width: m.hasArtifact ? "920px" : "auto",
                background: m.sender === "user" ? "#2563eb" : "#1e293b",
                color: "#ffffff",
                padding: "12px 16px",
                borderRadius: 12,
                fontSize: 14,
                lineHeight: 1.5,
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.2)"
              }}>
                <div>{m.text}</div>

                {/* Inline interactive artifact preview */}
                {m.hasArtifact && activeInstance && (
                  <div style={{
                    marginTop: 12,
                    height: 440,
                    width: "100%",
                    background: "#090d16",
                    border: "1px solid #334155",
                    borderRadius: 8,
                    overflow: "hidden",
                    position: "relative"
                  }}>
                    <ArtifactRenderer
                      artifact={activeInstance}
                      renderer={svgRenderer}
                      onEvent={handleArtifactEvent}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Interaction event feed */}
          {interactionEvents.length > 0 && (
            <div style={{
              alignSelf: "center",
              background: "rgba(30, 41, 59, 0.7)",
              border: "1px solid #334155",
              borderRadius: 6,
              padding: "6px 12px",
              fontSize: 11,
              color: "#38bdf8",
              fontFamily: "monospace"
            }}>
              ⚡ {interactionEvents[interactionEvents.length - 1]}
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Suggestion prompt chips */}
        <div style={{
          padding: "8px 20px",
          background: "#0f172a",
          borderTop: "1px solid #1e293b",
          display: "flex",
          gap: 8,
          overflowX: "auto"
        }}>
          <button
            onClick={() => handleSend("Create a simple architecture diagram for a React frontend, Laravel API, and MySQL database.")}
            style={{
              background: "#1e293b",
              color: "#38bdf8",
              border: "1px solid #334155",
              padding: "6px 12px",
              borderRadius: 20,
              fontSize: 12,
              whiteSpace: "nowrap"
            }}
          >
            💬 "Create architecture diagram"
          </button>
          <button
            onClick={() => handleSend("Move MySQL underneath the API.")}
            style={{
              background: "#1e293b",
              color: "#34d399",
              border: "1px solid #334155",
              padding: "6px 12px",
              borderRadius: 20,
              fontSize: 12,
              whiteSpace: "nowrap"
            }}
          >
            ⚡ "Move MySQL underneath the API"
          </button>
          <button
            onClick={() => handleSend("Add a Redis cache beside MySQL.")}
            style={{
              background: "#1e293b",
              color: "#f59e0b",
              border: "1px solid #334155",
              padding: "6px 12px",
              borderRadius: 20,
              fontSize: 12,
              whiteSpace: "nowrap"
            }}
          >
            ⚡ "Add a Redis cache"
          </button>
        </div>

        {/* Input box */}
        <div style={{
          padding: "12px 20px 16px 20px",
          background: "#0f172a",
          display: "flex",
          gap: 10
        }}>
          <input
            type="text"
            placeholder="Describe what to create or how to modify the diagram..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
            style={{
              flex: 1,
              background: "#1e293b",
              border: "1px solid #334155",
              borderRadius: 8,
              padding: "10px 14px",
              color: "#f8fafc",
              fontSize: 14,
              outline: "none"
            }}
          />
          <button
            onClick={() => handleSend()}
            style={{
              background: "#2563eb",
              color: "#ffffff",
              padding: "10px 20px",
              borderRadius: 8,
              fontWeight: 600,
              fontSize: 14
            }}
          >
            Send
          </button>
        </div>
      </div>
    </ArtifactProvider>
  );
};
