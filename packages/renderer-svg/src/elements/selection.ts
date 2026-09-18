import type { ArtifactElement } from "@interactive-artifact/protocol";
import type { ThemeColors } from "../theme.js";

/**
 * Renders selection bounding box and corner resize handles
 */
export function renderSelectionOverlay(
  element: ArtifactElement,
  theme: ThemeColors
): SVGElement {
  const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  g.setAttribute("class", "artifact-selection-overlay pointer-events-none");

  const padding = 4;
  const x = element.position.x - padding;
  const y = element.position.y - padding;
  const width = element.size.width + padding * 2;
  const height = element.size.height + padding * 2;

  // Outer dashed bounding box
  const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  rect.setAttribute("x", String(x));
  rect.setAttribute("y", String(y));
  rect.setAttribute("width", String(width));
  rect.setAttribute("height", String(height));
  rect.setAttribute("rx", "4");
  rect.setAttribute("ry", "4");
  rect.setAttribute("fill", theme.selectionFill);
  rect.setAttribute("stroke", theme.selection);
  rect.setAttribute("stroke-width", "1.5");
  rect.setAttribute("stroke-dasharray", "4 4");
  g.appendChild(rect);

  // 4 corner handles
  const handlePositions = [
    { cx: x, cy: y },
    { cx: x + width, cy: y },
    { cx: x, cy: y + height },
    { cx: x + width, cy: y + height }
  ];

  for (const pos of handlePositions) {
    const handle = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    handle.setAttribute("x", String(pos.cx - 4));
    handle.setAttribute("y", String(pos.cy - 4));
    handle.setAttribute("width", "8");
    handle.setAttribute("height", "8");
    handle.setAttribute("fill", "#ffffff");
    handle.setAttribute("stroke", theme.selection);
    handle.setAttribute("stroke-width", "1.5");
    handle.setAttribute("rx", "1");
    g.appendChild(handle);
  }

  return g;
}
