import type { ArtifactDefinition } from "@interactive-artifact/protocol";
import type { CapabilityDefinition } from "@interactive-artifact/registry";
import { SVGRenderer } from "@interactive-artifact/renderer-svg";

export const sampleFormArtifact: ArtifactDefinition = {
  version: "1.0",
  id: "artifact_form_settings",
  type: "ui.form",
  metadata: {
    title: "AI Model Deployment Configuration",
    description: "Interactive settings form for configuring LLM inference hyperparameters and guardrails",
    author: "AI Assistant"
  },
  canvas: {
    width: 960,
    height: 520,
    theme: "neutral",
    grid: false
  },
  elements: [
    {
      id: "form_settings_card",
      type: "node",
      position: { x: 220, y: 50 },
      size: { width: 520, height: 420 },
      header: {
        icon: "gear",
        title: "Model Inference Parameters",
        subtitle: "Production Deployment Config",
        badge: "v1.4",
        status: "active"
      },
      body: {
        description: "Configure reasoning effort, context limits, and safety filters",
        sections: [
          {
            id: "field_model",
            type: "key-value",
            props: { keyName: "Foundation Model", value: "Gemini 2.5 Pro (Thinking)" }
          },
          {
            id: "field_temp",
            type: "key-value",
            props: { keyName: "Temperature", value: "0.20 (Precise Reasoning)" }
          },
          {
            id: "field_tokens",
            type: "progress",
            props: { value: 64, max: 128 }
          },
          {
            id: "field_tok_label",
            type: "key-value",
            props: { keyName: "Context Window Allocated", value: "64k / 128k Tokens" }
          },
          {
            id: "field_guard",
            type: "badge",
            props: { label: "Strict Safety & Zero-Shot Code Sandbox: ON", variant: "success" }
          }
        ]
      },
      footer: {
        content: "Changes take effect immediately across clusters",
        actions: [
          { id: "btn_form_cancel", type: "button", props: { label: "Reset" } },
          { id: "btn_form_save", type: "button", props: { label: "Deploy Settings" } }
        ]
      },
      style: { fill: "#ffffff", stroke: "#3b82f6", strokeWidth: 2, radius: 14 }
    }
  ],
  connections: [],
  interactions: []
};

export const formCapability: CapabilityDefinition = {
  id: "ui.form",
  name: "Interactive Settings Form",
  version: "1.0",
  description: "Form card interface for managing structured parameters, toggles, sliders, and submit actions",
  tags: ["form", "settings", "configuration", "ui", "inputs", "controls"],
  primitives: ["node", "key-value", "progress", "button", "badge"],
  interactions: ["click", "select"],
  renderer: new SVGRenderer(),
  sampleArtifact: sampleFormArtifact
};
