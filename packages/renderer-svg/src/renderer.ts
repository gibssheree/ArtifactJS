import type { ArtifactInstance, RendererInstance } from "@interactive-artifact/core";
import type { ArtifactElement } from "@interactive-artifact/protocol";
import type { ArtifactRenderer, RendererOptions } from "./types.js";
import { getThemeColors, type ThemeColors } from "./theme.js";
import { renderShapeElement } from "./elements/shape.js";
import { renderTextElement } from "./elements/content.js";
import { renderNodeElement } from "./elements/node.js";
import { renderConnectionElement } from "./elements/connection.js";
import { renderControlElement } from "./elements/controls.js";
import { renderSelectionOverlay } from "./elements/selection.js";
import { attachGestures } from "./gestures.js";

/**
 * High-performance, framework-independent SVG renderer
 */
export class SVGRenderer implements ArtifactRenderer {
  public readonly id = "svg";

  public canRender(artifact: ArtifactInstance): boolean {
    // SVGRenderer can render any 2D artifact type
    return true;
  }

  public mount(
    artifact: ArtifactInstance,
    container: HTMLElement,
    options: RendererOptions = {}
  ): RendererInstance {
    const isSketch = artifact.type === "excalidraw" || artifact.type === "canvas.excalidraw";

    // Setup SVG root
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    svg.setAttribute("style", "width: 100%; height: 100%; display: block; overflow: hidden; user-select: none;");

    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    svg.appendChild(defs);

    // Background rect
    const bgRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    bgRect.setAttribute("width", "100%");
    bgRect.setAttribute("height", "100%");
    svg.appendChild(bgRect);

    // Viewport group (transformed by pan & zoom)
    const viewport = document.createElementNS("http://www.w3.org/2000/svg", "g");
    viewport.setAttribute("class", "artifact-viewport");
    svg.appendChild(viewport);

    // Layers inside viewport
    const gridLayer = document.createElementNS("http://www.w3.org/2000/svg", "g");
    const connectionLayer = document.createElementNS("http://www.w3.org/2000/svg", "g");
    const elementLayer = document.createElementNS("http://www.w3.org/2000/svg", "g");
    const overlayLayer = document.createElementNS("http://www.w3.org/2000/svg", "g");

    viewport.appendChild(gridLayer);
    viewport.appendChild(connectionLayer);
    viewport.appendChild(elementLayer);
    viewport.appendChild(overlayLayer);

    container.appendChild(svg);

    const updateTransform = () => {
      const pan = (artifact.state.get<{ x: number; y: number }>("pan")) ?? { x: 0, y: 0 };
      const zoom = (artifact.state.get<number>("zoom")) ?? 1;
      viewport.setAttribute("transform", `translate(${pan.x}, ${pan.y}) scale(${zoom})`);
    };

    const renderAll = () => {
      const def = artifact.definition;
      const currentTheme = options.theme ?? (artifact.state.get("theme") as any) ?? def.canvas?.theme ?? "neutral";
      const colors: ThemeColors = getThemeColors(currentTheme);

      bgRect.setAttribute("fill", def.canvas?.backgroundColor ?? colors.bg);

      // Render grid if enabled
      gridLayer.innerHTML = "";
      if (def.canvas?.grid) {
        const gridW = Math.max(def.canvas.width * 2, 2000);
        const gridH = Math.max(def.canvas.height * 2, 2000);
        const step = 20;

        for (let gx = -1000; gx <= gridW; gx += step) {
          const l = document.createElementNS("http://www.w3.org/2000/svg", "line");
          l.setAttribute("x1", String(gx));
          l.setAttribute("y1", "-1000");
          l.setAttribute("x2", String(gx));
          l.setAttribute("y2", String(gridH));
          l.setAttribute("stroke", colors.grid);
          l.setAttribute("stroke-width", "0.5");
          gridLayer.appendChild(l);
        }
        for (let gy = -1000; gy <= gridH; gy += step) {
          const l = document.createElementNS("http://www.w3.org/2000/svg", "line");
          l.setAttribute("x1", "-1000");
          l.setAttribute("y1", String(gy));
          l.setAttribute("x2", String(gridW));
          l.setAttribute("y2", String(gy));
          l.setAttribute("stroke", colors.grid);
          l.setAttribute("stroke-width", "0.5");
          gridLayer.appendChild(l);
        }
      }

      // Render elements
      elementLayer.innerHTML = "";
      const elementMap = new Map<string, ArtifactElement>();

      for (const el of def.elements) {
        elementMap.set(el.id, el);
        let elSvg: SVGElement;

        switch (el.type) {
          case "node":
            elSvg = renderNodeElement(el, colors, isSketch);
            break;
          case "text":
            elSvg = renderTextElement(el, colors);
            break;
          case "button":
          case "slider":
          case "toggle":
            elSvg = renderControlElement(el, colors, artifact);
            break;
          case "rectangle":
          case "ellipse":
          case "line":
          case "arrow":
          case "freehand":
          default:
            elSvg = renderShapeElement(el, colors, isSketch);
            break;
        }

        elementLayer.appendChild(elSvg);
      }

      // Render connections
      connectionLayer.innerHTML = "";
      for (const conn of def.connections) {
        const fromId = typeof conn.from === "string" ? conn.from : conn.from.elementId;
        const toId = typeof conn.to === "string" ? conn.to : conn.to.elementId;

        const fromEl = elementMap.get(fromId);
        const toEl = elementMap.get(toId);

        if (fromEl && toEl) {
          const connSvg = renderConnectionElement(conn, fromEl, toEl, colors, isSketch);
          connectionLayer.appendChild(connSvg);
        }
      }

      // Render selection overlay
      overlayLayer.innerHTML = "";
      const selectedId = artifact.state.get<string | null>("selectedElementId");
      if (selectedId) {
        const selectedEl = elementMap.get(selectedId);
        if (selectedEl) {
          const overlay = renderSelectionOverlay(selectedEl, colors);
          overlayLayer.appendChild(overlay);
        }
      }

      updateTransform();
    };

    // Initial render
    renderAll();

    // Subscribe to fine-grained state updates
    const unsubPan = artifact.state.subscribe("pan", updateTransform);
    const unsubZoom = artifact.state.subscribe("zoom", updateTransform);
    const unsubSelect = artifact.state.subscribe("selectedElementId", () => {
      // Re-render selection overlay
      overlayLayer.innerHTML = "";
      const selectedId = artifact.state.get<string | null>("selectedElementId");
      if (selectedId) {
        const selectedEl = artifact.getElement(selectedId);
        if (selectedEl) {
          const colors = getThemeColors(options.theme ?? (artifact.state.get("theme") as any));
          const overlay = renderSelectionOverlay(selectedEl, colors);
          overlayLayer.appendChild(overlay);
        }
      }
    });

    // Attach gestures
    const gestures = attachGestures(svg, viewport, artifact, options);

    return {
      update: () => {
        renderAll();
      },
      destroy: () => {
        unsubPan();
        unsubZoom();
        unsubSelect();
        gestures.destroy();
        svg.remove();
      }
    };
  }
}
