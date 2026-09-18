import type { ArtifactDefinition } from "@interactive-artifact/protocol";
import type { CapabilityDefinition } from "@interactive-artifact/registry";
import { SVGRenderer } from "@interactive-artifact/renderer-svg";

export const sampleTableArtifact: ArtifactDefinition = {
  version: "1.0",
  id: "artifact_table_orders",
  type: "data.table",
  metadata: {
    title: "Recent Transaction Ledger",
    description: "Interactive data table showcasing tabular records with status chips, amounts, and customer IDs",
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
      id: "table_container",
      type: "node",
      position: { x: 50, y: 50 },
      size: { width: 860, height: 400 },
      header: {
        icon: "database",
        title: "Transactions (Latest 4)",
        subtitle: "Real-time Stripe & Wire Transfers",
        badge: "Live Feed",
        status: "active"
      },
      body: {
        sections: [
          {
            id: "row_header",
            type: "key-value",
            props: { keyName: "TX ID  /  CUSTOMER", value: "AMOUNT  /  STATUS" }
          },
          {
            id: "row_1",
            type: "key-value",
            props: { keyName: "tx_94821 ? Acme Corp (Enterprise)", value: "$14,500.00 USD  ?  [PAID]" }
          },
          {
            id: "row_2",
            type: "key-value",
            props: { keyName: "tx_94822 ? Linear Labs (Pro Plan)", value: "$4,200.00 USD  ?  [PAID]" }
          },
          {
            id: "row_3",
            type: "key-value",
            props: { keyName: "tx_94823 ? Vercel Partner (Add-on)", value: "$1,850.00 USD  ?  [PENDING]" }
          },
          {
            id: "row_4",
            type: "key-value",
            props: { keyName: "tx_94824 ? Supabase DB (Replication)", value: "$750.00 USD  ?  [PAID]" }
          }
        ]
      },
      footer: {
        content: "Showing 4 of 1,294 settled transactions",
        actions: [
          { id: "btn_tbl_export", type: "button", props: { label: "Export CSV" } }
        ]
      },
      style: { fill: "#ffffff", stroke: "#cbd5e1", strokeWidth: 1.5, radius: 12 }
    }
  ],
  connections: [],
  interactions: []
};

export const tableCapability: CapabilityDefinition = {
  id: "data.table",
  name: "Data Table",
  version: "1.0",
  description: "Interactive sortable data table and transaction ledger for structured record inspection",
  tags: ["table", "data", "grid", "records", "ledger", "csv", "transactions"],
  primitives: ["node", "table", "key-value", "button", "badge"],
  interactions: ["select", "click"],
  renderer: new SVGRenderer(),
  sampleArtifact: sampleTableArtifact
};
