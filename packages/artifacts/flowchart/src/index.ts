import type { ArtifactDefinition } from "@interactive-artifact/protocol";
import type { CapabilityDefinition } from "@interactive-artifact/registry";
import { SVGRenderer } from "@interactive-artifact/renderer-svg";

export const sampleFlowchartArtifact: ArtifactDefinition = {
  version: "1.0",
  id: "artifact_flowchart_ref",
  type: "diagram.flowchart",
  metadata: {
    title: "Microservices Architecture (Composite Reference)",
    description: "First-class structured nodes, micro-components, typed ports, and bezier connection routing",
    author: "AI Assistant"
  },
  canvas: {
    width: 1000,
    height: 600,
    theme: "neutral",
    grid: true
  },
  elements: [
    {
      id: "api-gateway",
      type: "node",
      position: { x: 60, y: 180 },
      size: { width: 220, height: 160 },
      header: {
        icon: "cloud",
        title: "API Gateway",
        subtitle: "Edge Envoy Proxy",
        badge: "Edge",
        status: "active"
      },
      body: {
        description: "TLS termination & JWT routing",
        sections: [
          {
            id: "sec_gw_uptime",
            type: "key-value",
            props: { keyName: "Uptime", value: "99.99%" }
          },
          {
            id: "sec_gw_metric",
            type: "metric",
            props: { label: "Ingress", value: "12,400 req/s", delta: "+15%" }
          }
        ]
      },
      footer: {
        content: "Zone: us-east-1a",
        actions: [
          {
            id: "btn_gw_restart",
            type: "button",
            props: { label: "Scale" }
          }
        ]
      },
      ports: [
        {
          id: "p_gw_in",
          nodeId: "api-gateway",
          name: "HTTPS",
          direction: "input",
          position: "left",
          dataType: "https"
        },
        {
          id: "p_gw_out_auth",
          nodeId: "api-gateway",
          name: "RPC Out",
          direction: "output",
          position: "right",
          dataType: "grpc"
        }
      ],
      style: {
        fill: "#ffffff",
        stroke: "#3b82f6",
        strokeWidth: 2,
        radius: 12
      }
    },
    {
      id: "auth-service",
      type: "node",
      position: { x: 380, y: 150 },
      size: { width: 240, height: 210 },
      header: {
        icon: "server",
        title: "Auth Service",
        subtitle: "Go / gRPC Microservice",
        badge: "v3.1",
        status: "active"
      },
      body: {
        description: "Validates claims & issues tokens",
        sections: [
          {
            id: "sec_auth_health",
            type: "status-indicator",
            props: { status: "active" }
          },
          {
            id: "sec_auth_metric",
            type: "metric",
            props: { label: "Latency p99", value: "4.2 ms", delta: "-0.8ms" }
          },
          {
            id: "sec_auth_kv",
            type: "key-value",
            props: { keyName: "Replicas", value: "4 / 4 Active" }
          }
        ]
      },
      footer: {
        content: "Zero CVEs reported",
        actions: [
          {
            id: "btn_auth_audit",
            type: "button",
            props: { label: "Audit" }
          }
        ]
      },
      ports: [
        {
          id: "p_auth_in",
          nodeId: "auth-service",
          name: "RPC In",
          direction: "input",
          position: "left",
          dataType: "grpc"
        },
        {
          id: "p_auth_out_db",
          nodeId: "auth-service",
          name: "SQL",
          direction: "output",
          position: "right",
          dataType: "postgres"
        },
        {
          id: "p_auth_out_cache",
          nodeId: "auth-service",
          name: "Redis",
          direction: "output",
          position: "bottom",
          dataType: "redis"
        }
      ],
      style: {
        fill: "#ffffff",
        stroke: "#10b981",
        strokeWidth: 2,
        radius: 12
      }
    },
    {
      id: "postgres-db",
      type: "node",
      position: { x: 720, y: 80 },
      size: { width: 220, height: 180 },
      header: {
        icon: "database",
        title: "User Postgres",
        subtitle: "HA Primary Cluster",
        badge: "SQL",
        status: "success"
      },
      body: {
        description: "Relational persistence store",
        sections: [
          {
            id: "sec_db_conn",
            type: "key-value",
            props: { keyName: "Connections", value: "72 / 100" }
          },
          {
            id: "sec_db_disk",
            type: "progress",
            props: { value: 65, max: 100 }
          },
          {
            id: "sec_db_io",
            type: "key-value",
            props: { keyName: "Disk IOPS", value: "1,200" }
          }
        ]
      },
      footer: {
        content: "Multi-AZ Replication"
      },
      ports: [
        {
          id: "p_db_in",
          nodeId: "postgres-db",
          name: "SQL Socket",
          direction: "input",
          position: "left",
          dataType: "postgres"
        }
      ],
      style: {
        fill: "#ffffff",
        stroke: "#f59e0b",
        strokeWidth: 2,
        radius: 12
      }
    },
    {
      id: "redis-cache",
      type: "node",
      position: { x: 420, y: 440 },
      size: { width: 220, height: 140 },
      header: {
        icon: "zap",
        title: "Redis Cluster",
        subtitle: "In-Memory Session Store",
        badge: "Cache",
        status: "active"
      },
      body: {
        sections: [
          {
            id: "sec_rd_hit",
            type: "metric",
            props: { label: "Hit Ratio", value: "98.9%", delta: "+0.4%" }
          },
          {
            id: "sec_rd_mem",
            type: "key-value",
            props: { keyName: "Memory", value: "1.4 GB / 8 GB" }
          }
        ]
      },
      ports: [
        {
          id: "p_cache_in",
          nodeId: "redis-cache",
          name: "TCP 6379",
          direction: "input",
          position: "top",
          dataType: "redis"
        }
      ],
      style: {
        fill: "#ffffff",
        stroke: "#ef4444",
        strokeWidth: 2,
        radius: 12
      }
    }
  ],
  connections: [
    {
      id: "c_gw_auth",
      from: { nodeId: "api-gateway", portId: "p_gw_out_auth" },
      to: { nodeId: "auth-service", portId: "p_auth_in" },
      type: "curved",
      label: "gRPC Authenticate",
      style: {
        stroke: "#3b82f6",
        strokeWidth: 2
      }
    },
    {
      id: "c_auth_db",
      from: { nodeId: "auth-service", portId: "p_auth_out_db" },
      to: { nodeId: "postgres-db", portId: "p_db_in" },
      type: "curved",
      label: "SELECT user_cred",
      style: {
        stroke: "#f59e0b",
        strokeWidth: 2
      }
    },
    {
      id: "c_auth_cache",
      from: { nodeId: "auth-service", portId: "p_auth_out_cache" },
      to: { nodeId: "redis-cache", portId: "p_cache_in" },
      type: "orthogonal",
      label: "GET session_token",
      style: {
        stroke: "#ef4444",
        strokeWidth: 2
      }
    }
  ],
  interactions: []
};

export const flowchartCapability: CapabilityDefinition = {
  id: "diagram.flowchart",
  name: "Composite Flowchart & Architecture",
  version: "2.0",
  description: "Reference composite implementation with structured regions, micro-components, typed ports, and bezier routing",
  tags: [
    "flowchart",
    "diagram",
    "architecture",
    "nodes",
    "composite",
    "ports",
    "micro-components",
    "graph",
    "pipeline"
  ],
  primitives: [
    "node",
    "port",
    "edge",
    "connector",
    "node-header",
    "node-body",
    "node-footer",
    "metric",
    "key-value",
    "badge",
    "status-indicator",
    "progress"
  ],
  interactions: ["drag", "connect", "zoom", "pan", "select", "delete", "inspect"],
  renderer: new SVGRenderer(),
  sampleArtifact: sampleFlowchartArtifact
};

export const flowchart = flowchartCapability;
