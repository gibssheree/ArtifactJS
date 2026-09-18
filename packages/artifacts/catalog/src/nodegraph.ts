import type { ArtifactDefinition } from "@interactive-artifact/protocol";
import type { CapabilityDefinition } from "@interactive-artifact/registry";
import { SVGRenderer } from "@interactive-artifact/renderer-svg";

export const sampleNodeGraphArtifact: ArtifactDefinition = {
  version: "1.0",
  id: "artifact_nodegraph_pipeline",
  type: "diagram.nodegraph",
  metadata: {
    title: "AI Audio Generation Pipeline",
    description: "Multi-stage audio processing graph with typed tensor and waveform ports",
    author: "AI Assistant"
  },
  canvas: {
    width: 960,
    height: 540,
    theme: "neutral",
    grid: true
  },
  elements: [
    {
      id: "node_prompt",
      type: "node",
      position: { x: 50, y: 160 },
      size: { width: 220, height: 160 },
      header: {
        icon: "zap",
        title: "Prompt Encoder",
        subtitle: "Text Transformer",
        badge: "Input",
        status: "active"
      },
      body: {
        description: "Encodes natural language tokens",
        sections: [
          {
            id: "comp_prompt_kv",
            type: "key-value",
            props: { keyName: "Dim", value: "768-float32" }
          },
          {
            id: "comp_prompt_status",
            type: "status-indicator",
            props: { status: "success" }
          }
        ]
      },
      footer: {
        content: "Vocab: 32k tokens"
      },
      ports: [
        {
          id: "p_prompt_out_emb",
          nodeId: "node_prompt",
          name: "Embeddings",
          direction: "output",
          position: "right",
          dataType: "tensor"
        }
      ],
      style: { fill: "#ffffff", stroke: "#3b82f6", strokeWidth: 2, radius: 10 }
    },
    {
      id: "node_diffusion",
      type: "node",
      position: { x: 360, y: 130 },
      size: { width: 250, height: 210 },
      header: {
        icon: "gear",
        title: "Latent Diffusion",
        subtitle: "UNet Denoiser",
        badge: "Compute",
        status: "active"
      },
      body: {
        description: "50-step DDIM latent trajectory",
        sections: [
          {
            id: "comp_diff_metric",
            type: "metric",
            props: { label: "Step Time", value: "14.2 ms", delta: "-2.1ms" }
          },
          {
            id: "comp_diff_prog",
            type: "progress",
            props: { value: 75, max: 100 }
          },
          {
            id: "comp_diff_kv",
            type: "key-value",
            props: { keyName: "Precision", value: "FP16" }
          }
        ]
      },
      footer: {
        content: "VRAM: 4.2 GB / 12 GB",
        actions: [{ id: "act_diff_inspect", type: "button", props: { label: "Tensors" } }]
      },
      ports: [
        {
          id: "p_diff_in_cond",
          nodeId: "node_diffusion",
          name: "Conditioning",
          direction: "input",
          position: "left",
          dataType: "tensor"
        },
        {
          id: "p_diff_in_noise",
          nodeId: "node_diffusion",
          name: "Noise Seed",
          direction: "input",
          position: "top",
          dataType: "int32"
        },
        {
          id: "p_diff_out_latents",
          nodeId: "node_diffusion",
          name: "Latents",
          direction: "output",
          position: "right",
          dataType: "tensor"
        }
      ],
      style: { fill: "#ffffff", stroke: "#8b5cf6", strokeWidth: 2, radius: 10 }
    },
    {
      id: "node_vocoder",
      type: "node",
      position: { x: 700, y: 150 },
      size: { width: 210, height: 170 },
      header: {
        icon: "zap",
        title: "HiFi-GAN Vocoder",
        subtitle: "Neural Audio Synthesis",
        badge: "Output",
        status: "success"
      },
      body: {
        description: "Decodes latents to 48kHz audio",
        sections: [
          {
            id: "comp_voc_sr",
            type: "key-value",
            props: { keyName: "Sample Rate", value: "48,000 Hz" }
          },
          {
            id: "comp_voc_channels",
            type: "key-value",
            props: { keyName: "Channels", value: "Stereo 2.0" }
          }
        ]
      },
      footer: {
        content: "Format: WAV PCM-16",
        actions: [{ id: "act_voc_play", type: "button", props: { label: "Preview" } }]
      },
      ports: [
        {
          id: "p_voc_in_latents",
          nodeId: "node_vocoder",
          name: "Latent In",
          direction: "input",
          position: "left",
          dataType: "tensor"
        },
        {
          id: "p_voc_out_audio",
          nodeId: "node_vocoder",
          name: "WAV Out",
          direction: "output",
          position: "right",
          dataType: "audio"
        }
      ],
      style: { fill: "#ffffff", stroke: "#10b981", strokeWidth: 2, radius: 10 }
    }
  ],
  connections: [
    {
      id: "c_prompt_to_diff",
      from: { nodeId: "node_prompt", portId: "p_prompt_out_emb" },
      to: { nodeId: "node_diffusion", portId: "p_diff_in_cond" },
      type: "curved",
      label: "[B, 77, 768]",
      style: { stroke: "#3b82f6", strokeWidth: 2 }
    },
    {
      id: "c_diff_to_voc",
      from: { nodeId: "node_diffusion", portId: "p_diff_out_latents" },
      to: { nodeId: "node_vocoder", portId: "p_voc_in_latents" },
      type: "curved",
      label: "[B, 64, 128]",
      style: { stroke: "#8b5cf6", strokeWidth: 2 }
    }
  ],
  interactions: []
};

export const nodeGraphCapability: CapabilityDefinition = {
  id: "diagram.nodegraph",
  name: "Node Graph Pipeline",
  version: "1.0",
  description: "Dataflow graph and compute pipeline with typed input/output sockets and tensor routing",
  tags: ["nodegraph", "pipeline", "dataflow", "graph", "audio", "ml", "tensors"],
  primitives: ["node", "port", "edge", "metric", "progress", "key-value", "button"],
  interactions: ["drag", "connect", "zoom", "pan", "select"],
  renderer: new SVGRenderer(),
  sampleArtifact: sampleNodeGraphArtifact
};
