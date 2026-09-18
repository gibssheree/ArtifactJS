import type { ArtifactElement } from "@interactive-artifact/protocol";
import type { ThemeColors } from "../theme.js";
import { sketchRect, sketchEllipse } from "../geometry/sketch.js";

/**
 * Renders rich diagram nodes (rectangles, diamonds, capsules, cylinders)
 */
export function renderNodeElement(
  element: ArtifactElement,
  theme: ThemeColors,
  isSketch = false
): SVGElement {
  const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  g.setAttribute("id", `el-${element.id}`);
  g.setAttribute("data-element-id", element.id);
  g.setAttribute("class", "artifact-element artifact-node cursor-pointer select-none");

  const { x, y } = element.position;
  const { width, height } = element.size;
  const style = element.style ?? {};
  const props = element.props ?? {};
  const roughness = style.roughness ?? (isSketch ? 1.2 : 0);

  const shape = (props.shape as string) ?? "rectangle";
  const label = (props.label as string) ?? "";
  const subLabel = (props.subLabel as string) ?? "";
  const badge = (props.badge as string) ?? "";
  const status = (props.status as string) ?? "";

  const fill = style.fill ?? theme.surface;
  const stroke = style.stroke ?? theme.border;
  const strokeWidth = style.strokeWidth ?? 1.5;

  if (roughness > 0) {
    // Sketchy node
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    let d = "";
    if (shape === "circle" || shape === "pill") {
      d = sketchEllipse(x + width / 2, y + height / 2, width / 2, height / 2, roughness);
    } else {
      d = sketchRect(x, y, width, height, roughness);
    }
    path.setAttribute("d", d);
    path.setAttribute("fill", fill);
    path.setAttribute("stroke", stroke);
    path.setAttribute("stroke-width", String(strokeWidth));
    g.appendChild(path);
  } else {
    // Standard crisp vector node
    switch (shape) {
      case "pill": {
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("x", String(x));
        rect.setAttribute("y", String(y));
        rect.setAttribute("width", String(width));
        rect.setAttribute("height", String(height));
        rect.setAttribute("rx", String(height / 2));
        rect.setAttribute("ry", String(height / 2));
        rect.setAttribute("fill", fill);
        rect.setAttribute("stroke", stroke);
        rect.setAttribute("stroke-width", String(strokeWidth));
        g.appendChild(rect);
        break;
      }

      case "diamond": {
        const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        const points = `${x + width / 2},${y} ${x + width},${y + height / 2} ${x + width / 2},${y + height} ${x},${y + height / 2}`;
        polygon.setAttribute("points", points);
        polygon.setAttribute("fill", fill);
        polygon.setAttribute("stroke", stroke);
        polygon.setAttribute("stroke-width", String(strokeWidth));
        g.appendChild(polygon);
        break;
      }

      case "circle": {
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
        circle.setAttribute("cx", String(x + width / 2));
        circle.setAttribute("cy", String(y + height / 2));
        circle.setAttribute("rx", String(width / 2));
        circle.setAttribute("ry", String(height / 2));
        circle.setAttribute("fill", fill);
        circle.setAttribute("stroke", stroke);
        circle.setAttribute("stroke-width", String(strokeWidth));
        g.appendChild(circle);
        break;
      }

      case "cylinder": {
        // Database cylinder: top ellipse, body rect, bottom ellipse
        const ry = Math.min(15, height * 0.2);
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        const d = `
          M ${x} ${y + ry}
          A ${width / 2} ${ry} 0 0 1 ${x + width} ${y + ry}
          L ${x + width} ${y + height - ry}
          A ${width / 2} ${ry} 0 0 1 ${x} ${y + height - ry}
          Z
        `;
        path.setAttribute("d", d);
        path.setAttribute("fill", fill);
        path.setAttribute("stroke", stroke);
        path.setAttribute("stroke-width", String(strokeWidth));
        g.appendChild(path);

        const topCap = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
        topCap.setAttribute("cx", String(x + width / 2));
        topCap.setAttribute("cy", String(y + ry));
        topCap.setAttribute("rx", String(width / 2));
        topCap.setAttribute("ry", String(ry));
        topCap.setAttribute("fill", fill);
        topCap.setAttribute("stroke", stroke);
        topCap.setAttribute("stroke-width", String(strokeWidth));
        g.appendChild(topCap);
        break;
      }

      case "rectangle":
      default: {
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("x", String(x));
        rect.setAttribute("y", String(y));
        rect.setAttribute("width", String(width));
        rect.setAttribute("height", String(height));
        rect.setAttribute("rx", String(style.radius ?? 10));
        rect.setAttribute("ry", String(style.radius ?? 10));
        rect.setAttribute("fill", fill);
        rect.setAttribute("stroke", stroke);
        rect.setAttribute("stroke-width", String(strokeWidth));
        g.appendChild(rect);
        break;
      }
    }
  }

  // Content text and layout
  const textGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
  textGroup.setAttribute("pointer-events", "none");

  const centerY = y + height / 2;
  const labelY = subLabel ? centerY - 6 : centerY + 4;

  if (label) {
    const mainText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    mainText.setAttribute("x", String(x + width / 2));
    mainText.setAttribute("y", String(labelY));
    mainText.setAttribute("text-anchor", "middle");
    mainText.setAttribute("fill", style.textColor ?? theme.text);
    mainText.setAttribute("font-size", String(style.fontSize ?? 14));
    mainText.setAttribute("font-weight", "600");
    mainText.setAttribute("font-family", style.fontFamily ?? "Inter, system-ui, sans-serif");
    mainText.textContent = String(label);
    textGroup.appendChild(mainText);
  }

  if (subLabel) {
    const subText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    subText.setAttribute("x", String(x + width / 2));
    subText.setAttribute("y", String(centerY + 14));
    subText.setAttribute("text-anchor", "middle");
    subText.setAttribute("fill", theme.textSecondary);
    subText.setAttribute("font-size", "11");
    subText.setAttribute("font-family", style.fontFamily ?? "Inter, system-ui, sans-serif");
    subText.textContent = String(subLabel);
    textGroup.appendChild(subText);
  }

  // Status indicator dot
  if (status) {
    const statusColors: Record<string, string> = {
      idle: "#94a3b8",
      active: "#3b82f6",
      success: "#10b981",
      warning: "#f59e0b",
      error: "#ef4444"
    };
    const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    dot.setAttribute("cx", String(x + 14));
    dot.setAttribute("cy", String(y + 14));
    dot.setAttribute("r", "4");
    dot.setAttribute("fill", statusColors[status] ?? "#3b82f6");
    textGroup.appendChild(dot);
  }

  // Badge pill
  if (badge) {
    const badgeG = document.createElementNS("http://www.w3.org/2000/svg", "g");
    const badgeW = Math.max(30, badge.length * 7 + 10);
    const badgeRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    badgeRect.setAttribute("x", String(x + width - badgeW - 8));
    badgeRect.setAttribute("y", String(y + 6));
    badgeRect.setAttribute("width", String(badgeW));
    badgeRect.setAttribute("height", "18");
    badgeRect.setAttribute("rx", "9");
    badgeRect.setAttribute("fill", theme.accent);
    badgeRect.setAttribute("opacity", "0.2");
    badgeG.appendChild(badgeRect);

    const badgeText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    badgeText.setAttribute("x", String(x + width - badgeW / 2 - 8));
    badgeText.setAttribute("y", String(y + 19));
    badgeText.setAttribute("text-anchor", "middle");
    badgeText.setAttribute("fill", theme.accent);
    badgeText.setAttribute("font-size", "10");
    badgeText.setAttribute("font-weight", "600");
    badgeText.setAttribute("font-family", "system-ui, sans-serif");
    badgeText.textContent = badge;
    badgeG.appendChild(badgeText);

    textGroup.appendChild(badgeG);
  }

  g.appendChild(textGroup);
  return g;
}
