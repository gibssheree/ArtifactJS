import type { ArtifactDefinition } from "@interactive-artifact/protocol";
import type { CapabilityDefinition } from "@interactive-artifact/registry";
import { SVGRenderer } from "@interactive-artifact/renderer-svg";

export const sampleArchitectureArtifact: ArtifactDefinition = {
  version: "1.0",
  id: "artifact_arch_microservices",
  type: "diagram.architecture",
  metadata: {
    title: "Global E-Commerce Microservices",
    description: "Multi-region AWS / GCP cloud deployment with load balancing and event bus",
    author: "AI Assistant"
  },
  canvas: {
    width: 980,
    height: 560,
    theme: "neutral",
    grid: true
  },
  elements: [
    {
      id: "arch_cdn",
      type: "node",
      position: { x: 50, y: 190 },
      size: { width: 190, height: 140 },
      header: {
        icon: "cloud",
        title: "CloudFront CDN",
        subtitle: "Global Edge POPs",
        badge: "Edge",
        status: "active"
      },
      body: {
        sections: [
          { id: "sec_cdn_cache", type: "key-value", props: { keyName: "Cache Hit", value: "96.5%" } },
          { id: "sec_cdn_waf", type: "badge", props: { label: "WAF Enabled", variant: "success" } }
        ]
      },
      ports: [
        { id: "p_cdn_out", nodeId: "arch_cdn", name: "HTTPS", direction: "output", position: "right" }
      ],
      style: { fill: "#ffffff", stroke: "#0ea5e9", strokeWidth: 2, radius: 10 }
    },
    {
      id: "arch_alb",
      type: "node",
      position: { x: 300, y: 190 },
      size: { width: 180, height: 140 },
      header: {
        icon: "server",
        title: "ALB Gateway",
        subtitle: "Application Load Balancer",
        badge: "L7",
        status: "active"
      },
      body: {
        sections: [
          { id: "sec_alb_conn", type: "key-value", props: { keyName: "Active Conn", value: "14.2k" } }
        ]
      },
      ports: [
        { id: "p_alb_in", nodeId: "arch_alb", direction: "input", position: "left" },
        { id: "p_alb_out_orders", nodeId: "arch_alb", name: "Orders", direction: "output", position: "right" },
        { id: "p_alb_out_pay", nodeId: "arch_alb", name: "Payments", direction: "output", position: "bottom" }
      ],
      style: { fill: "#ffffff", stroke: "#3b82f6", strokeWidth: 2, radius: 10 }
    },
    {
      id: "arch_order_svc",
      type: "node",
      position: { x: 570, y: 90 },
      size: { width: 220, height: 160 },
      header: {
        icon: "server",
        title: "Order Service",
        subtitle: "Kubernetes Deployment",
        badge: "v2.8",
        status: "active"
      },
      body: {
        sections: [
          { id: "sec_ord_pods", type: "key-value", props: { keyName: "Replicas", value: "8 / 8 Running" } },
          { id: "sec_ord_tps", type: "metric", props: { label: "Order TPS", value: "850/s", delta: "+12%" } }
        ]
      },
      ports: [
        { id: "p_ord_in", nodeId: "arch_order_svc", direction: "input", position: "left" },
        { id: "p_ord_out_kafka", nodeId: "arch_order_svc", name: "Events", direction: "output", position: "right" }
      ],
      style: { fill: "#ffffff", stroke: "#10b981", strokeWidth: 2, radius: 10 }
    },
    {
      id: "arch_kafka",
      type: "node",
      position: { x: 570, y: 340 },
      size: { width: 220, height: 150 },
      header: {
        icon: "zap",
        title: "Kafka Event Bus",
        subtitle: "Distributed Event Stream",
        badge: "Broker",
        status: "active"
      },
      body: {
        sections: [
          { id: "sec_kafka_part", type: "key-value", props: { keyName: "Partitions", value: "32" } },
          { id: "sec_kafka_lag", type: "metric", props: { label: "Consumer Lag", value: "0 ms", delta: "0" } }
        ]
      },
      ports: [
        { id: "p_kafka_in_pay", nodeId: "arch_kafka", direction: "input", position: "left" },
        { id: "p_kafka_in_ord", nodeId: "arch_kafka", direction: "input", position: "top" }
      ],
      style: { fill: "#ffffff", stroke: "#f59e0b", strokeWidth: 2, radius: 10 }
    }
  ],
  connections: [
    {
      id: "c_cdn_alb",
      from: { nodeId: "arch_cdn", portId: "p_cdn_out" },
      to: { nodeId: "arch_alb", portId: "p_alb_in" },
      type: "orthogonal",
      label: "TLS 1.3"
    },
    {
      id: "c_alb_ord",
      from: { nodeId: "arch_alb", portId: "p_alb_out_orders" },
      to: { nodeId: "arch_order_svc", portId: "p_ord_in" },
      type: "curved",
      label: "POST /orders"
    },
    {
      id: "c_ord_kafka",
      from: { nodeId: "arch_order_svc", portId: "p_ord_out_kafka" },
      to: { nodeId: "arch_kafka", portId: "p_kafka_in_ord" },
      type: "curved",
      label: "OrderPlaced"
    }
  ],
  interactions: []
};

export const architectureCapability: CapabilityDefinition = {
  id: "diagram.architecture",
  name: "Cloud Architecture",
  version: "1.0",
  description: "Cloud microservices, infrastructure topology, and network routing diagram",
  tags: ["architecture", "cloud", "aws", "gcp", "kubernetes", "microservices", "network"],
  primitives: ["node", "port", "edge", "key-value", "metric", "badge", "status-indicator"],
  interactions: ["drag", "connect", "zoom", "pan", "select"],
  renderer: new SVGRenderer(),
  sampleArtifact: sampleArchitectureArtifact
};
