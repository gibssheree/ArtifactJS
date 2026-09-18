import type { ArtifactDefinition } from "@interactive-artifact/protocol";
import type { CapabilityDefinition } from "@interactive-artifact/registry";
import { SVGRenderer } from "@interactive-artifact/renderer-svg";

export const sampleERDArtifact: ArtifactDefinition = {
  version: "1.0",
  id: "artifact_erd_ecommerce",
  type: "diagram.erd",
  metadata: {
    title: "E-Commerce Relational Schema (ERD)",
    description: "Normalized PostgreSQL database schema with primary and foreign key constraints",
    author: "AI Assistant"
  },
  canvas: {
    width: 960,
    height: 560,
    theme: "neutral",
    grid: true
  },
  elements: [
    {
      id: "table_users",
      type: "node",
      position: { x: 60, y: 150 },
      size: { width: 230, height: 210 },
      header: {
        icon: "database",
        title: "users",
        subtitle: "Table: public.users",
        badge: "PK: id",
        status: "success"
      },
      body: {
        sections: [
          { id: "col_u_id", type: "key-value", props: { keyName: "?? id", value: "uuid (PK)" } },
          { id: "col_u_email", type: "key-value", props: { keyName: "?? email", value: "varchar(255) UNIQUE" } },
          { id: "col_u_name", type: "key-value", props: { keyName: "?? full_name", value: "varchar(100)" } },
          { id: "col_u_created", type: "key-value", props: { keyName: "?? created_at", value: "timestamptz" } }
        ]
      },
      footer: {
        content: "Rows: 1.4M estimated"
      },
      ports: [
        { id: "p_u_pk", nodeId: "table_users", name: "PK: id", direction: "output", position: "right" }
      ],
      style: { fill: "#ffffff", stroke: "#3b82f6", strokeWidth: 2, radius: 10 }
    },
    {
      id: "table_orders",
      type: "node",
      position: { x: 380, y: 120 },
      size: { width: 250, height: 250 },
      header: {
        icon: "database",
        title: "orders",
        subtitle: "Table: public.orders",
        badge: "PK: id",
        status: "active"
      },
      body: {
        sections: [
          { id: "col_o_id", type: "key-value", props: { keyName: "?? id", value: "uuid (PK)" } },
          { id: "col_o_user_id", type: "key-value", props: { keyName: "?? user_id", value: "uuid (FK -> users.id)" } },
          { id: "col_o_total", type: "key-value", props: { keyName: "?? total_cents", value: "integer NOT NULL" } },
          { id: "col_o_status", type: "key-value", props: { keyName: "??? status", value: "varchar(32)" } },
          { id: "col_o_created", type: "key-value", props: { keyName: "?? created_at", value: "timestamptz" } }
        ]
      },
      footer: {
        content: "Index: btree(user_id)"
      },
      ports: [
        { id: "p_o_fk_user", nodeId: "table_orders", name: "FK user_id", direction: "input", position: "left" },
        { id: "p_o_pk", nodeId: "table_orders", name: "PK: id", direction: "output", position: "right" }
      ],
      style: { fill: "#ffffff", stroke: "#10b981", strokeWidth: 2, radius: 10 }
    },
    {
      id: "table_order_items",
      type: "node",
      position: { x: 710, y: 140 },
      size: { width: 220, height: 220 },
      header: {
        icon: "database",
        title: "order_items",
        subtitle: "Table: public.order_items",
        badge: "PK: id",
        status: "active"
      },
      body: {
        sections: [
          { id: "col_oi_id", type: "key-value", props: { keyName: "?? id", value: "uuid (PK)" } },
          { id: "col_oi_order_id", type: "key-value", props: { keyName: "?? order_id", value: "uuid (FK)" } },
          { id: "col_oi_product_id", type: "key-value", props: { keyName: "?? product_id", value: "uuid (FK)" } },
          { id: "col_oi_qty", type: "key-value", props: { keyName: "?? quantity", value: "integer" } }
        ]
      },
      footer: {
        content: "Cascade Delete"
      },
      ports: [
        { id: "p_oi_fk_order", nodeId: "table_order_items", name: "FK order_id", direction: "input", position: "left" }
      ],
      style: { fill: "#ffffff", stroke: "#8b5cf6", strokeWidth: 2, radius: 10 }
    }
  ],
  connections: [
    {
      id: "rel_users_orders",
      from: { nodeId: "table_users", portId: "p_u_pk" },
      to: { nodeId: "table_orders", portId: "p_o_fk_user" },
      type: "orthogonal",
      label: "1 : N"
    },
    {
      id: "rel_orders_items",
      from: { nodeId: "table_orders", portId: "p_o_pk" },
      to: { nodeId: "table_order_items", portId: "p_oi_fk_order" },
      type: "orthogonal",
      label: "1 : N"
    }
  ],
  interactions: []
};

export const erdCapability: CapabilityDefinition = {
  id: "diagram.erd",
  name: "Entity Relationship Diagram (ERD)",
  version: "1.0",
  description: "Relational database schema modeling with table entities, column definitions, and 1:N / N:M cardinality",
  tags: ["erd", "database", "sql", "postgres", "mysql", "schema", "tables", "relations"],
  primitives: ["node", "port", "edge", "key-value", "badge"],
  interactions: ["drag", "connect", "zoom", "pan", "select"],
  renderer: new SVGRenderer(),
  sampleArtifact: sampleERDArtifact
};
