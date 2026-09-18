import type { ArtifactElement } from "@interactive-artifact/protocol";
import type { ThemeColors } from "../theme.js";
import { sketchRect, sketchEllipse, sketchLine, sketchFreehand } from "../geometry/sketch.js";

/**
 * Creates SVG elements for shape primitives
 */
export function renderShapeElement(
  element: ArtifactElement,
  theme: ThemeColors,
  isSketch = false
): SVGElement {
  const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  g.setAttribute("id", `el-${element.id}`);
  g.setAttribute("data-element-id", element.id);
  g.setAttribute("class", "artifact-element artifact-shape");

  const { x, y } = element.position;
  const { width, height } = element.size;
  const style = element.style ?? {};
  const roughness = style.roughness ?? (isSketch ? 1.4 : 0);

  const fill = style.fill ?? "transparent";
  const stroke = style.stroke ?? theme.border;
  const strokeWidth = String(style.strokeWidth ?? (isSketch ? 2 : 1.5));
  const opacity = String(style.opacity ?? 1);

  if (roughness > 0) {
    // Sketch mode
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    let d = "";

    switch (element.type) {
      case "rectangle":
        d = sketchRect(x, y, width, height, roughness);
        break;
      case "ellipse":
        d = sketchEllipse(x + width / 2, y + height / 2, width / 2, height / 2, roughness);
        break;
      case "line": {
        const points = (element.props?.points as Array<{ x: number; y: number }>) ?? [
          { x, y },
          { x: x + width, y: y + height }
        ];
        if (points.length >= 2) {
          d = sketchLine(points[0]!.x, points[0]!.y, points[1]!.x, points[1]!.y, roughness);
        }
        break;
      }
      case "arrow": {
        d = sketchLine(x, y, x + width, y + height, roughness);
        break;
      }
      case "freehand": {
        const points = (element.props?.points as Array<{ x: number; y: number }>) ?? [];
        d = sketchFreehand(points);
        break;
      }
      default:
        d = sketchRect(x, y, width, height, roughness);
    }

    path.setAttribute("d", d);
    path.setAttribute("fill", fill === "transparent" ? "none" : fill);
    path.setAttribute("stroke", stroke);
    path.setAttribute("stroke-width", strokeWidth);
    path.setAttribute("opacity", opacity);
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("stroke-linejoin", "round");
    g.appendChild(path);
  } else {
    // Crisp SVG mode
    switch (element.type) {
      case "rectangle": {
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("x", String(x));
        rect.setAttribute("y", String(y));
        rect.setAttribute("width", String(width));
        rect.setAttribute("height", String(height));
        rect.setAttribute("rx", String(style.radius ?? 8));
        rect.setAttribute("ry", String(style.radius ?? 8));
        rect.setAttribute("fill", fill);
        rect.setAttribute("stroke", stroke);
        rect.setAttribute("stroke-width", strokeWidth);
        rect.setAttribute("opacity", opacity);
        g.appendChild(rect);
        break;
      }

      case "ellipse": {
        const ellipse = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
        ellipse.setAttribute("cx", String(x + width / 2));
        ellipse.setAttribute("cy", String(y + height / 2));
        ellipse.setAttribute("rx", String(width / 2));
        ellipse.setAttribute("ry", String(height / 2));
        ellipse.setAttribute("fill", fill);
        ellipse.setAttribute("stroke", stroke);
        ellipse.setAttribute("stroke-width", strokeWidth);
        ellipse.setAttribute("opacity", opacity);
        g.appendChild(ellipse);
        break;
      }

      case "line": {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", String(x));
        line.setAttribute("y1", String(y));
        line.setAttribute("x2", String(x + width));
        line.setAttribute("y2", String(y + height));
        line.setAttribute("stroke", stroke);
        line.setAttribute("stroke-width", strokeWidth);
        line.setAttribute("opacity", opacity);
        if (style.strokeDasharray) {
          line.setAttribute("stroke-dasharray", style.strokeDasharray);
        }
        g.appendChild(line);
        break;
      }

      case "freehand": {
        const points = (element.props?.points as Array<{ x: number; y: number }>) ?? [];
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", sketchFreehand(points));
        path.setAttribute("fill", "none");
        path.setAttribute("stroke", stroke);
        path.setAttribute("stroke-width", strokeWidth);
        path.setAttribute("stroke-linecap", "round");
        path.setAttribute("stroke-linejoin", "round");
        g.appendChild(path);
        break;
      }
    }
  }

  // Label inside shape if defined
  const label = (element.props?.label as string) ?? "";
  if (label) {
    const textEl = document.createElementNS("http://www.w3.org/2000/svg", "text");
    textEl.setAttribute("x", String(x + width / 2));
    textEl.setAttribute("y", String(y + height / 2 + 5));
    textEl.setAttribute("text-anchor", "middle");
    textEl.setAttribute("fill", style.textColor ?? theme.text);
    textEl.setAttribute("font-size", String(style.fontSize ?? 14));
    textEl.setAttribute("font-family", style.fontFamily ?? "Inter, system-ui, sans-serif");
    textEl.setAttribute("pointer-events", "none");
    textEl.textContent = String(label);
    g.appendChild(textEl);
  }

  return g;
}
