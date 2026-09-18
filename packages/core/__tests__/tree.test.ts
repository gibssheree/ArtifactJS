import { describe, it, expect } from "vitest";
import { ArtifactInstance, ComponentTree } from "../src/index.js";
import type { ArtifactDefinition } from "@interactive-artifact/protocol";

describe("ComponentTree & Micro-Component Mutations", () => {
  const structuredArtifact: ArtifactDefinition = {
    version: "1.0",
    id: "art_tree_test",
    type: "diagram.flowchart",
    canvas: { width: 900, height: 600, theme: "neutral" },
    elements: [
      {
        id: "node_api",
        type: "node",
        position: { x: 100, y: 100 },
        size: { width: 220, height: 180 },
        header: {
          icon: "server",
          title: "API Service",
          badge: "v1.0",
          status: "active",
          actions: [
            { id: "act_head_1", type: "button", props: { label: "Reload" } }
          ]
        },
        body: {
          description: "Core REST server",
          sections: [
            { id: "sec_metric_1", type: "metric", props: { label: "RPS", value: "1,200" } },
            { id: "sec_kv_1", type: "key-value", props: { keyName: "Port", value: ":3000" } }
          ]
        },
        footer: {
          content: "Replicas: 3",
          actions: [
            { id: "act_foot_1", type: "button", props: { label: "Logs" } }
          ]
        },
        ports: [
          {
            id: "p_api_in",
            nodeId: "node_api",
            name: "HTTP In",
            direction: "input",
            position: "left",
            dataType: "http"
          },
          {
            id: "p_api_out",
            nodeId: "node_api",
            name: "DB Out",
            direction: "output",
            position: "right",
            dataType: "sql"
          }
        ]
      },
      {
        id: "node_db",
        type: "node",
        position: { x: 450, y: 100 },
        size: { width: 200, height: 140 },
        header: {
          icon: "database",
          title: "Main Postgres",
          badge: "SQL",
          status: "success"
        },
        ports: [
          {
            id: "p_db_in",
            nodeId: "node_db",
            name: "SQL In",
            direction: "input",
            position: "left",
            dataType: "sql"
          }
        ]
      }
    ],
    connections: [
      {
        id: "conn_api_db",
        from: { nodeId: "node_api", portId: "p_api_out" },
        to: { nodeId: "node_db", portId: "p_db_in" },
        type: "curved"
      }
    ]
  };

  it("indexes nodes, ports, and micro-components with O(1) retrieval", () => {
    const tree = new ComponentTree(structuredArtifact);

    // Find node
    const nodeApi = tree.findChild("node_api");
    expect(nodeApi).toBeDefined();

    // Find port
    const port = tree.getPort("p_api_in", "node_api");
    expect(port).toBeDefined();
    expect(port?.direction).toBe("input");
    expect(port?.position).toBe("left");

    // Find micro-component
    const metric = tree.findChild("sec_metric_1") as any;
    expect(metric).toBeDefined();
    expect(metric.type).toBe("metric");
    expect(metric.props?.label).toBe("RPS");

    // Find parent of micro-component
    const parent = tree.findParent("sec_metric_1") as any;
    expect(parent).toBeDefined();
    expect(parent.id).toBe("node_api");
  });

  it("updates micro-components in-place via artifactInstance.updateComponent", () => {
    const artifact = new ArtifactInstance(structuredArtifact);

    artifact.updateComponent("sec_metric_1", {
      props: { label: "RPS (AI Optimized)", value: "5,400", delta: "+350%" }
    });

    const updated = artifact.getComponent("sec_metric_1");
    expect(updated?.props?.label).toBe("RPS (AI Optimized)");
    expect(updated?.props?.value).toBe("5,400");
  });

  it("updates ports in-place via artifactInstance.updatePort", () => {
    const artifact = new ArtifactInstance(structuredArtifact);

    artifact.updatePort("node_api", "p_api_in", {
      name: "HTTPS (TLS 1.3)",
      dataType: "secure-http"
    });

    const port = artifact.getPort("p_api_in");
    expect(port?.name).toBe("HTTPS (TLS 1.3)");
    expect(port?.dataType).toBe("secure-http");
  });

  it("inserts and removes micro-components dynamically", () => {
    const artifact = new ArtifactInstance(structuredArtifact);

    artifact.insertComponent("node_api", {
      id: "sec_new_badge",
      type: "badge",
      props: { label: "Zero Downtime" }
    });

    expect(artifact.getComponent("sec_new_badge")).toBeDefined();

    artifact.removeComponent("sec_new_badge");
    expect(artifact.getComponent("sec_new_badge")).toBeUndefined();
  });

  it("supports multi-level reactive state for nodes, components, and ports", () => {
    const artifact = new ArtifactInstance(structuredArtifact);

    // Component-level state
    artifact.setComponentState("sec_metric_1", "hovered", true);
    expect(artifact.getComponentState("sec_metric_1", "hovered")).toBe(true);

    // Port-level state
    artifact.setPortState("p_api_in", "active", true);
    expect(artifact.getPortState("p_api_in", "active")).toBe(true);
  });
});
