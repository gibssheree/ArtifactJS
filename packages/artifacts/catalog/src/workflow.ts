import type { ArtifactDefinition } from "@interactive-artifact/protocol";
import type { CapabilityDefinition } from "@interactive-artifact/registry";
import { SVGRenderer } from "@interactive-artifact/renderer-svg";

export const sampleWorkflowArtifact: ArtifactDefinition = {
  version: "1.0",
  id: "artifact_wf_expense",
  type: "diagram.workflow",
  metadata: {
    title: "Expense Reimbursement Approval Workflow",
    description: "Automated business workflow with condition evaluation, manager approvals, and ERP payout",
    author: "AI Assistant"
  },
  canvas: {
    width: 960,
    height: 520,
    theme: "neutral",
    grid: true
  },
  elements: [
    {
      id: "wf_start",
      type: "node",
      position: { x: 50, y: 190 },
      size: { width: 170, height: 130 },
      header: {
        icon: "user",
        title: "Submit Claim",
        subtitle: "Employee Ingress",
        badge: "Start",
        status: "success"
      },
      body: {
        sections: [
          { id: "sec_start_ocr", type: "badge", props: { label: "Receipt OCR", variant: "info" } }
        ]
      },
      ports: [
        { id: "p_start_out", nodeId: "wf_start", direction: "output", position: "right" }
      ],
      style: { fill: "#ffffff", stroke: "#10b981", strokeWidth: 2, radius: 10 }
    },
    {
      id: "wf_decision",
      type: "node",
      position: { x: 300, y: 170 },
      size: { width: 190, height: 170 },
      props: {
        shape: "diamond"
      },
      header: {
        title: "Amount > $1,000?",
        subtitle: "Rule Condition"
      },
      body: {
        description: "Check delegation authority"
      },
      ports: [
        { id: "p_dec_in", nodeId: "wf_decision", direction: "input", position: "left" },
        { id: "p_dec_yes", nodeId: "wf_decision", name: "Yes", direction: "output", position: "top" },
        { id: "p_dec_no", nodeId: "wf_decision", name: "No", direction: "output", position: "right" }
      ],
      style: { fill: "#fefce8", stroke: "#f59e0b", strokeWidth: 2 }
    },
    {
      id: "wf_director_approval",
      type: "node",
      position: { x: 560, y: 60 },
      size: { width: 200, height: 140 },
      header: {
        icon: "zap",
        title: "Director Approval",
        subtitle: "Two-Person Rule",
        badge: "Manual",
        status: "active"
      },
      body: {
        sections: [
          { id: "sec_dir_sla", type: "key-value", props: { keyName: "SLA", value: "24 Hours" } }
        ]
      },
      ports: [
        { id: "p_dir_in", nodeId: "wf_director_approval", direction: "input", position: "left" },
        { id: "p_dir_out", nodeId: "wf_director_approval", direction: "output", position: "right" }
      ],
      style: { fill: "#ffffff", stroke: "#ef4444", strokeWidth: 2, radius: 10 }
    },
    {
      id: "wf_payout",
      type: "node",
      position: { x: 560, y: 280 },
      size: { width: 200, height: 140 },
      header: {
        icon: "check",
        title: "Auto-Payout",
        subtitle: "SAP / NetSuite",
        badge: "Automated",
        status: "success"
      },
      body: {
        sections: [
          { id: "sec_pay_ach", type: "key-value", props: { keyName: "Rail", value: "Direct Deposit ACH" } }
        ]
      },
      ports: [
        { id: "p_pay_in_dir", nodeId: "wf_payout", direction: "input", position: "top" },
        { id: "p_pay_in_no", nodeId: "wf_payout", direction: "input", position: "left" }
      ],
      style: { fill: "#ffffff", stroke: "#10b981", strokeWidth: 2, radius: 10 }
    }
  ],
  connections: [
    {
      id: "c_start_dec",
      from: { nodeId: "wf_start", portId: "p_start_out" },
      to: { nodeId: "wf_decision", portId: "p_dec_in" },
      type: "orthogonal"
    },
    {
      id: "c_dec_yes",
      from: { nodeId: "wf_decision", portId: "p_dec_yes" },
      to: { nodeId: "wf_director_approval", portId: "p_dir_in" },
      type: "orthogonal",
      label: "Yes (> $1,000)"
    },
    {
      id: "c_dec_no",
      from: { nodeId: "wf_decision", portId: "p_dec_no" },
      to: { nodeId: "wf_payout", portId: "p_pay_in_no" },
      type: "orthogonal",
      label: "No (<= $1,000)"
    },
    {
      id: "c_dir_payout",
      from: { nodeId: "wf_director_approval", portId: "p_dir_out" },
      to: { nodeId: "wf_payout", portId: "p_pay_in_dir" },
      type: "orthogonal",
      label: "Approved"
    }
  ],
  interactions: []
};

export const workflowCapability: CapabilityDefinition = {
  id: "diagram.workflow",
  name: "Approval Workflow",
  version: "1.0",
  description: "State machine and business process workflow with decision branches and automated triggers",
  tags: ["workflow", "approval", "process", "decision", "bpm", "state-machine"],
  primitives: ["node", "port", "edge", "key-value", "badge"],
  interactions: ["drag", "connect", "zoom", "pan", "select"],
  renderer: new SVGRenderer(),
  sampleArtifact: sampleWorkflowArtifact
};
