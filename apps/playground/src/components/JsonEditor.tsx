import React, { useState, useEffect } from "react";
import { validateArtifact, type ValidationResult, type ArtifactDefinition } from "@interactive-artifact/protocol";

export interface JsonEditorProps {
  initialValue: ArtifactDefinition;
  onChange: (definition: ArtifactDefinition) => void;
}

export const JsonEditor: React.FC<JsonEditorProps> = ({ initialValue, onChange }) => {
  const [text, setText] = useState<string>(() => JSON.stringify(initialValue, null, 2));
  const [validation, setValidation] = useState<ValidationResult<ArtifactDefinition>>({
    success: true,
    data: initialValue
  });

  useEffect(() => {
    setText(JSON.stringify(initialValue, null, 2));
    setValidation({ success: true, data: initialValue });
  }, [initialValue]);

  const handleChange = (newText: string) => {
    setText(newText);
    try {
      const parsed = JSON.parse(newText);
      const res = validateArtifact(parsed);
      setValidation(res);
      if (res.success) {
        onChange(res.data);
      }
    } catch (err: any) {
      setValidation({
        success: false,
        errors: [{ path: "syntax", message: err.message, code: "json_syntax" }]
      });
    }
  };

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(text);
      const formatted = JSON.stringify(parsed, null, 2);
      setText(formatted);
    } catch {
      // ignore
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#090d16" }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "8px 12px",
        borderBottom: "1px solid #1e293b",
        background: "#0f172a"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: "#94a3b8", textTransform: "uppercase" }}>
            Artifact JSON
          </span>
          {validation.success ? (
            <span style={{
              background: "rgba(16, 185, 129, 0.15)",
              color: "#34d399",
              fontSize: 11,
              padding: "2px 8px",
              borderRadius: 4,
              border: "1px solid rgba(16, 185, 129, 0.3)"
            }}>
              ✓ Protocol v1.0 Valid
            </span>
          ) : (
            <span style={{
              background: "rgba(239, 68, 68, 0.15)",
              color: "#f87171",
              fontSize: 11,
              padding: "2px 8px",
              borderRadius: 4,
              border: "1px solid rgba(239, 68, 68, 0.3)"
            }}>
              ⚠ Invalid Schema
            </span>
          )}
        </div>
        <button
          onClick={handleFormat}
          style={{
            background: "#1e293b",
            color: "#94a3b8",
            padding: "4px 10px",
            fontSize: 11
          }}
        >
          Format
        </button>
      </div>

      <textarea
        value={text}
        onChange={(e) => handleChange(e.target.value)}
        spellCheck={false}
        style={{
          flex: 1,
          width: "100%",
          boxSizing: "border-box",
          border: "none",
          borderRadius: 0
        }}
      />

      {!validation.success && (
        <div style={{
          maxHeight: 120,
          overflowY: "auto",
          padding: "8px 12px",
          background: "rgba(239, 68, 68, 0.1)",
          borderTop: "1px solid rgba(239, 68, 68, 0.2)",
          fontSize: 11,
          color: "#fca5a5"
        }}>
          {validation.errors.map((err, idx) => (
            <div key={idx} style={{ marginBottom: 4 }}>
              <strong>{err.path || "root"}:</strong> {err.message}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
