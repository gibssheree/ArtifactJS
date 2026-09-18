import {
  type PrimitiveType,
  type PrimitiveKind,
  getPrimitiveKind
} from "@interactive-artifact/protocol";

export interface PrimitiveDefinition {
  type: PrimitiveType | string;
  kind: PrimitiveKind;
  description: string;
  defaultProps?: Record<string, unknown>;
  defaultStyle?: Record<string, unknown>;
}

export class PrimitiveRegistry {
  private primitives = new Map<string, PrimitiveDefinition>();

  constructor() {
    this.registerBuiltins();
  }

  private registerBuiltins(): void {
    const builtins: Array<{ type: string; description: string }> = [
      // Geometry
      { type: "rectangle", description: "Standard rectangle shape" },
      { type: "rounded-rectangle", description: "Rectangle with rounded corners" },
      { type: "circle", description: "Circle geometry" },
      { type: "ellipse", description: "Elliptical geometry" },
      { type: "line", description: "Straight line connecting two points" },
      { type: "polyline", description: "Multi-segment open path" },
      { type: "polygon", description: "Closed polygon shape" },
      { type: "path", description: "Arbitrary SVG path" },
      { type: "arrow", description: "Directional arrow shape" },
      { type: "connector", description: "Routing connection line" },
      { type: "group", description: "Logical container grouping child primitives" },
      { type: "container", description: "Bounded visual box/container" },

      // Text
      { type: "text", description: "Standard text label" },
      { type: "heading", description: "Prominent title heading" },
      { type: "label", description: "Descriptive field label" },
      { type: "caption", description: "Small secondary caption text" },
      { type: "code", description: "Monospace formatted code block or snippet" },
      { type: "rich-text", description: "Formatted markdown or rich text" },

      // UI
      { type: "icon", description: "Visual icon glyph or symbol" },
      { type: "avatar", description: "User or entity portrait avatar" },
      { type: "badge", description: "Status or categorical badge tag" },
      { type: "chip", description: "Compact interactive chip element" },
      { type: "tag", description: "Informational label tag" },
      { type: "status-indicator", description: "Colored dot or beacon indicating state" },
      { type: "divider", description: "Horizontal or vertical separator line" },
      { type: "progress", description: "Progress bar or meter" },
      { type: "button", description: "Interactive trigger button" },
      { type: "toggle", description: "Boolean toggle switch" },
      { type: "checkbox", description: "Selectable checkbox element" },
      { type: "input", description: "Text input form element" },

      // Node
      { type: "node", description: "Composite structured entity node" },
      { type: "port", description: "Connection socket on a node" },
      { type: "edge", description: "Connection line between nodes or ports" },
      { type: "node-header", description: "Top header bar of a structured node" },
      { type: "node-body", description: "Body section containing content" },
      { type: "node-footer", description: "Bottom bar containing actions" },

      // Data
      { type: "table", description: "Tabular grid of rows and columns" },
      { type: "table-row", description: "Single row in a table" },
      { type: "table-cell", description: "Data cell in a table" },
      { type: "metric", description: "KPI metric value with label and delta" },
      { type: "key-value", description: "Name-value attribute pair" },

      // Chart
      { type: "bar", description: "Bar chart series" },
      { type: "line", description: "Line graph series" },
      { type: "area", description: "Area graph series" },
      { type: "pie", description: "Pie chart segment" },
      { type: "donut", description: "Donut chart segment with inner ring" },
      { type: "gauge", description: "Radial or linear gauge meter" }
    ];

    for (const b of builtins) {
      this.register({
        type: b.type,
        kind: getPrimitiveKind(b.type),
        description: b.description
      });
    }
  }

  public register(primitive: PrimitiveDefinition): void {
    this.primitives.set(primitive.type, primitive);
  }

  public get(type: string): PrimitiveDefinition | undefined {
    return this.primitives.get(type);
  }

  public has(type: string): boolean {
    return this.primitives.has(type);
  }

  public list(): PrimitiveDefinition[] {
    return Array.from(this.primitives.values());
  }

  public byKind(kind: PrimitiveKind): PrimitiveDefinition[] {
    return this.list().filter(p => p.kind === kind);
  }
}
