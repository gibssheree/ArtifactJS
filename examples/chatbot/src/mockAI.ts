import type { ArtifactDefinition, ArtifactPatch } from "@interactive-artifact/protocol";
import { PatchBuilder } from "@interactive-artifact/ai";
import { sampleFlowchartArtifact } from "@interactive-artifact/flowchart";
import {
  sampleERDArtifact,
  sampleNodeGraphArtifact,
  sampleWorkflowArtifact,
  sampleDashboardArtifact
} from "@interactive-artifact/catalog";

export interface MockAIResponse {
  message: string;
  artifact?: ArtifactDefinition;
  patch?: ArtifactPatch;
}

export function generateMockAIResponse(
  userText: string,
  existingArtifact: ArtifactDefinition | null
): MockAIResponse {
  const lower = userText.toLowerCase();

  // 1. ERD Request
  if (lower.includes("erd") || lower.includes("database") || lower.includes("schema") || lower.includes("table")) {
    return {
      message: "I've generated an interactive Entity-Relationship Diagram (ERD) with primary/foreign keys and 1:N cardinalities.",
      artifact: sampleERDArtifact
    };
  }

  // 2. Node Graph / AI Pipeline Request
  if (lower.includes("pipeline") || lower.includes("node graph") || lower.includes("tensor") || lower.includes("audio")) {
    return {
      message: "Here is the interactive AI Audio Generation Pipeline featuring typed ports and live step progress metrics.",
      artifact: sampleNodeGraphArtifact
    };
  }

  // 3. Workflow Request
  if (lower.includes("workflow") || lower.includes("approval") || lower.includes("state machine")) {
    return {
      message: "I've synthesized the Expense Reimbursement Workflow with conditional branch evaluation.",
      artifact: sampleWorkflowArtifact
    };
  }

  // 4. Dashboard Request
  if (lower.includes("dashboard") || lower.includes("kpi") || lower.includes("metrics")) {
    return {
      message: "Here is the SaaS Executive KPI Dashboard featuring metric cards and auto-scaling telemetry.",
      artifact: sampleDashboardArtifact
    };
  }

  // 5. In-Place Micro-Component Patch: Update Latency / Metric
  if (lower.includes("optimize") || lower.includes("latency") || lower.includes("metric") || lower.includes("tune")) {
    return {
      message: "? I applied an in-place micro-component patch (`update_component`) optimizing the latency metric to 0.9ms with zero DOM rebuild!",
      patch: {
        operation: "update_component",
        componentId: "sec_auth_metric",
        changes: {
          props: { label: "Latency p99 (AI Optimized)", value: "0.9 ms", delta: "-80% drop" }
        }
      }
    };
  }

  // 6. In-Place Node Patch: Upgrade Gateway / Badge
  if (lower.includes("upgrade") || lower.includes("badge") || lower.includes("enterprise") || lower.includes("waf")) {
    return {
      message: "??? I've patched the API Gateway node with an active WAF badge and upgraded the version tag via `update_node`.",
      patch: {
        operation: "update_node",
        nodeId: "api-gateway",
        changes: {
          header: {
            icon: "cloud",
            title: "API Gateway (WAF + Rate Limited)",
            subtitle: "Global Edge Envoy Proxy",
            badge: "v4.2 Enterprise",
            status: "success"
          }
        }
      }
    };
  }

  // 7. Move Node In-Place
  if (lower.includes("move") || lower.includes("down") || lower.includes("reposition")) {
    return {
      message: "I've applied a `move_node` patch to reposition the database node. All connected bezier curves recalculated automatically!",
      patch: {
        operation: "move_node",
        nodeId: "postgres-db",
        position: { x: 720, y: 320 }
      }
    };
  }

  // 8. Default: Reference Flowchart architecture
  if (!existingArtifact || lower.includes("architecture") || lower.includes("flowchart") || lower.includes("create")) {
    return {
      message: "Here is the microservices composite architecture featuring first-class ports, structured headers/bodies, and bezier routing.",
      artifact: sampleFlowchartArtifact
    };
  }

  // Fallback
  return {
    message: `Received: "${userText}". Try asking: "Show me an ERD database schema", "Optimize latency metric", or "Upgrade the gateway to enterprise"!`
  };
}
