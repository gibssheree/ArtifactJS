import type { MicroComponent } from "@interactive-artifact/protocol";

export interface ComponentTemplate {
  type: string;
  category: "badge" | "indicator" | "metric" | "action" | "field" | "custom";
  description: string;
  create(props?: Record<string, unknown>): Partial<MicroComponent>;
}

export class ComponentRegistry {
  private templates = new Map<string, ComponentTemplate>();

  constructor() {
    this.registerBuiltins();
  }

  private registerBuiltins(): void {
    this.register({
      type: "status-badge",
      category: "badge",
      description: "Small status tag with label and background tint",
      create: (props = {}) => ({
        type: "badge",
        props: {
          label: props.label ?? "Active",
          variant: props.variant ?? "success"
        },
        style: {
          fill: props.variant === "error" ? "#fee2e2" : props.variant === "warning" ? "#fef3c7" : "#dcfce7",
          stroke: "transparent"
        }
      })
    });

    this.register({
      type: "metric-counter",
      category: "metric",
      description: "Large numeric KPI value with label",
      create: (props = {}) => ({
        type: "metric",
        props: {
          label: props.label ?? "Requests / sec",
          value: props.value ?? "1,420",
          delta: props.delta ?? "+12%"
        }
      })
    });

    this.register({
      type: "action-button",
      category: "action",
      description: "Interactive button trigger inside nodes",
      create: (props = {}) => ({
        type: "button",
        props: {
          label: props.label ?? "Execute",
          action: props.action ?? "trigger"
        }
      })
    });
  }

  public register(template: ComponentTemplate): void {
    this.templates.set(template.type, template);
  }

  public get(type: string): ComponentTemplate | undefined {
    return this.templates.get(type);
  }

  public has(type: string): boolean {
    return this.templates.has(type);
  }

  public list(): ComponentTemplate[] {
    return Array.from(this.templates.values());
  }
}
