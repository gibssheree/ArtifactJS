import type { ArtifactInstance } from "@interactive-artifact/core";
import type { RendererOptions } from "./types.js";

export interface GestureManagerCleanup {
  destroy(): void;
}

export function attachGestures(
  svgElement: SVGSVGElement,
  viewportGroup: SVGGElement,
  artifact: ArtifactInstance,
  options: RendererOptions = {}
): GestureManagerCleanup {
  const interactive = options.interactive !== false;
  const enablePanZoom = options.enablePanZoom !== false && interactive;
  const enableDrag = options.enableDrag !== false && interactive;
  const enableSelection = options.enableSelection !== false && interactive;
  const enableDelete = options.enableDelete !== false && interactive;

  let isPanning = false;
  let panStart = { x: 0, y: 0 };
  let initialPan = { x: 0, y: 0 };

  let isDraggingElement = false;
  let dragElementId: string | null = null;
  let dragOffset = { x: 0, y: 0 };
  let initialElementPos = { x: 0, y: 0 };

  function screenToCanvas(screenX: number, screenY: number): { x: number; y: number } {
    const rect = svgElement.getBoundingClientRect();
    const pan = (artifact.state.get<{ x: number; y: number }>("pan")) ?? { x: 0, y: 0 };
    const zoom = (artifact.state.get<number>("zoom")) ?? 1;

    return {
      x: (screenX - rect.left - pan.x) / zoom,
      y: (screenY - rect.top - pan.y) / zoom
    };
  }

  // --- MOUSE DOWN ---
  const handleMouseDown = (e: MouseEvent) => {
    if (!interactive) return;

    // Check if target is inside an element
    const target = e.target as SVGElement | null;
    const elementGroup = target?.closest("[data-element-id]") as SVGElement | null;

    if (elementGroup && enableDrag) {
      const elementId = elementGroup.getAttribute("data-element-id")!;
      const el = artifact.getElement(elementId);
      if (el) {
        e.stopPropagation();

        if (enableSelection) {
          artifact.selectElement(elementId);
        }

        isDraggingElement = true;
        dragElementId = elementId;
        const canvasCoords = screenToCanvas(e.clientX, e.clientY);
        dragOffset = {
          x: canvasCoords.x - el.position.x,
          y: canvasCoords.y - el.position.y
        };
        initialElementPos = { ...el.position };
        artifact.state.set("isDragging", true);
        return;
      }
    }

    // Otherwise pan background if enabled
    if (enablePanZoom) {
      isPanning = true;
      panStart = { x: e.clientX, y: e.clientY };
      const currentPan = artifact.state.get<{ x: number; y: number }>("pan") ?? { x: 0, y: 0 };
      initialPan = { ...currentPan };

      if (enableSelection) {
        artifact.selectElement(null);
      }
    }
  };

  // --- MOUSE MOVE ---
  const handleMouseMove = (e: MouseEvent) => {
    if (isDraggingElement && dragElementId) {
      const canvasCoords = screenToCanvas(e.clientX, e.clientY);
      const newX = Math.round(canvasCoords.x - dragOffset.x);
      const newY = Math.round(canvasCoords.y - dragOffset.y);

      artifact.moveElement(dragElementId, { x: newX, y: newY });
      return;
    }

    if (isPanning && enablePanZoom) {
      const dx = e.clientX - panStart.x;
      const dy = e.clientY - panStart.y;
      artifact.state.set("pan", {
        x: initialPan.x + dx,
        y: initialPan.y + dy
      });
    }
  };

  // --- MOUSE UP ---
  const handleMouseUp = () => {
    if (isDraggingElement && dragElementId) {
      const el = artifact.getElement(dragElementId);
      if (el && (el.position.x !== initialElementPos.x || el.position.y !== initialElementPos.y)) {
        artifact.events.emit({
          type: "element.moved",
          artifactId: artifact.id,
          elementId: dragElementId,
          position: { ...el.position },
          previousPosition: initialElementPos,
          timestamp: Date.now()
        });
      }
      isDraggingElement = false;
      dragElementId = null;
      artifact.state.set("isDragging", false);
    }

    if (isPanning) {
      isPanning = false;
    }
  };

  // --- WHEEL ZOOM ---
  const handleWheel = (e: WheelEvent) => {
    if (!enablePanZoom) return;
    e.preventDefault();

    const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
    const currentZoom = artifact.state.get<number>("zoom") ?? 1;
    const newZoom = Math.min(Math.max(0.2, currentZoom * zoomFactor), 4);

    const rect = svgElement.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const pan = artifact.state.get<{ x: number; y: number }>("pan") ?? { x: 0, y: 0 };
    const newPanX = mouseX - (mouseX - pan.x) * (newZoom / currentZoom);
    const newPanY = mouseY - (mouseY - pan.y) * (newZoom / currentZoom);

    artifact.state.batch(() => {
      artifact.state.set("zoom", newZoom);
      artifact.state.set("pan", { x: newPanX, y: newPanY });
    });
  };

  // --- KEYBOARD DELETE ---
  const handleKeyDown = (e: KeyboardEvent) => {
    if (!enableDelete) return;

    if (e.key === "Delete" || e.key === "Backspace") {
      const activeTag = (document.activeElement?.tagName || "").toLowerCase();
      if (activeTag === "input" || activeTag === "textarea") return;

      const selectedId = artifact.state.get<string | null>("selectedElementId");
      if (selectedId) {
        e.preventDefault();
        artifact.removeElement(selectedId);
        artifact.selectElement(null);
      }
    }
  };

  svgElement.addEventListener("mousedown", handleMouseDown);
  window.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("mouseup", handleMouseUp);
  svgElement.addEventListener("wheel", handleWheel, { passive: false });
  window.addEventListener("keydown", handleKeyDown);

  return {
    destroy: () => {
      svgElement.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      svgElement.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
    }
  };
}
