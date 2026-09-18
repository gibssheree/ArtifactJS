import type { Connection, ArtifactElement } from "@interactive-artifact/protocol";
import type { ThemeColors } from "../theme.js";
import { calculateConnectionGeometry } from "../geometry/connections.js";

/**
 * Renders an interactive connection path and arrowhead between two elements
 */
export function renderConnectionElement(
  connection: Connection,
  fromEl: ArtifactElement,
  toEl: ArtifactElement,
  theme: ThemeColors,
  isSketch = false
): SVGElement {
  const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  g.setAttribute("id", `conn-${connection.id}`);
  g.setAttribute("data-connection-id", connection.id);
  g.setAttribute("class", "artifact-connection");

  const geom = calculateConnectionGeometry(connection, fromEl, toEl);
  const style = connection.style ?? {};
  const stroke = style.stroke ?? theme.arrow;
  const strokeWidth = style.strokeWidth ?? 2;
  const strokeDasharray = style.strokeDasharray;

  // Connection line path
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", geom.path);
  path.setAttribute("fill", "none");
  path.setAttribute("stroke", stroke);
  path.setAttribute("stroke-width", String(strokeWidth));
  path.setAttribute("stroke-linecap", "round");
  path.setAttribute("stroke-linejoin", "round");
  if (strokeDasharray) {
    path.setAttribute("stroke-dasharray", strokeDasharray);
  }
  g.appendChild(path);

  // Arrowhead (if type is arrow or default)
  if (connection.type === "arrow" || !connection.type) {
    const arrowPoly = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    const pointsStr = geom.arrowPoints.map(p => `${p.x},${p.y}`).join(" ");
    arrowPoly.setAttribute("points", pointsStr);
    arrowPoly.setAttribute("fill", stroke);
    arrowPoly.setAttribute("stroke", stroke);
    g.appendChild(arrowPoly);
  }

  // Label at midpoint
  if (connection.label) {
    const labelGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    const labelText = connection.label;
    const textWidth = Math.max(30, labelText.length * 7 + 12);
    const textHeight = 20;

    // Background pill to prevent line collision
    const bgRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    bgRect.setAttribute("x", String(geom.midPoint.x - textWidth / 2));
    bgRect.setAttribute("y", String(geom.midPoint.y - textHeight / 2));
    bgRect.setAttribute("width", String(textWidth));
    bgRect.setAttribute("height", String(textHeight));
    bgRect.setAttribute("rx", "4");
    bgRect.setAttribute("ry", "4");
    bgRect.setAttribute("fill", theme.surface);
    bgRect.setAttribute("stroke", theme.border);
    bgRect.setAttribute("stroke-width", "1");
    labelGroup.appendChild(bgRect);

    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", String(geom.midPoint.x));
    text.setAttribute("y", String(geom.midPoint.y + 4));
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("fill", theme.textSecondary);
    text.setAttribute("font-size", "11");
    text.setAttribute("font-weight", "500");
    text.setAttribute("font-family", "Inter, system-ui, sans-serif");
    text.setAttribute("pointer-events", "none");
    text.textContent = labelText;
    labelGroup.appendChild(text);

    g.appendChild(labelGroup);
  }

  return g;
}
