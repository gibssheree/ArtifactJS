import type { ArtifactInstance, RendererInstance } from "@interactive-artifact/core";
import type { ThemeMode } from "@interactive-artifact/protocol";

export type { RendererInstance };

export interface RendererOptions {
  theme?: ThemeMode;
  interactive?: boolean;
  enablePanZoom?: boolean;
  enableDrag?: boolean;
  enableSelection?: boolean;
  enableDelete?: boolean;
  onElementClick?: (elementId: string) => void;
}

export interface ArtifactRenderer {
  id: string;
  canRender(artifact: ArtifactInstance): boolean;
  mount(artifact: ArtifactInstance, container: HTMLElement, options?: RendererOptions): RendererInstance;
}
