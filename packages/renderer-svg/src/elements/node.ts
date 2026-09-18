import type {
  ArtifactElement,
  StructuredNode,
  Port,
  MicroComponent
} from "@interactive-artifact/protocol";
import type { ThemeColors } from "../theme.js";
import { sketchRect, sketchEllipse } from "../geometry/sketch.js";
import { renderMicroComponent, renderIconSvg } from "./micro.js";
import { calculatePortPoint } from "../geometry/connections.js";

/**
 * Renders rich structured diagram nodes and micro-components
 */
export function renderNodeElement(
  element: ArtifactElement,
  theme: ThemeColors,
  isSketch = false
): SVGElement {
  const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  g.setAttribute("id", `el-${element.id}`);
  g.setAttribute("data-element-id", element.id);
  g.setAttribute("data-node-id", element.id);
  g.setAttribute("class", "artifact-element artifact-node cursor-pointer select-none");

  const { x, y } = element.position;
  const { width, height } = element.size;
  const style = element.style ?? {};
  const props = element.props ?? {};
  const roughness = style.roughness ?? (isSketch ? 1.2 : 0);

  const structured = element as StructuredNode;
  const isStructured = Boolean(structured.header || structured.body || structured.footer || (structured.ports && structured.ports.length > 0));

  const shape = (props.shape as string) ?? "rectangle";
  const fill = style.fill ?? theme.surface;
  const stroke = style.stroke ?? theme.border;
  const strokeWidth = style.strokeWidth ?? 1.5;
  const radius = style.radius ?? 10;

  // Background container
  if (roughness > 0) {
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
        const ry = Math.min(14, height * 0.18);
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
        rect.setAttribute("rx", String(radius));
        rect.setAttribute("ry", String(radius));
        rect.setAttribute("fill", fill);
        rect.setAttribute("stroke", stroke);
        rect.setAttribute("stroke-width", String(strokeWidth));
        g.appendChild(rect);
        break;
      }
    }
  }

  // If structured node with regions (header, body, footer)
  if (isStructured) {
    let currentY = y + 10;
    const paddingX = 14;
    const contentW = width - paddingX * 2;

    // 1. Header Region
    if (structured.header) {
      const headerH = 34;
      let headerX = x + paddingX;

      // Header Icon
      if (structured.header.icon) {
        const iconEl = renderIconSvg(structured.header.icon, headerX, currentY + 2, 18, theme.accent);
        g.appendChild(iconEl);
        headerX += 24;
      }

      // Header Title
      const titleEl = document.createElementNS("http://www.w3.org/2000/svg", "text");
      titleEl.setAttribute("x", String(headerX));
      titleEl.setAttribute("y", String(currentY + (structured.header.subtitle ? 12 : 16)));
      titleEl.setAttribute("fill", theme.text);
      titleEl.setAttribute("font-size", "13");
      titleEl.setAttribute("font-weight", "700");
      titleEl.setAttribute("font-family", style.fontFamily ?? "Inter, system-ui, sans-serif");
      titleEl.textContent = structured.header.title;
      g.appendChild(titleEl);

      // Subtitle
      if (structured.header.subtitle) {
        const subEl = document.createElementNS("http://www.w3.org/2000/svg", "text");
        subEl.setAttribute("x", String(headerX));
        subEl.setAttribute("y", String(currentY + 26));
        subEl.setAttribute("fill", theme.textSecondary);
        subEl.setAttribute("font-size", "10");
        subEl.setAttribute("font-family", style.fontFamily ?? "Inter, system-ui, sans-serif");
        subEl.textContent = structured.header.subtitle;
        g.appendChild(subEl);
      }

      // Status indicator or Badge in header
      if (structured.header.status) {
        const statusEl = renderMicroComponent(
          { id: `${element.id}-status`, type: "status-indicator", props: { status: structured.header.status } },
          x + width - paddingX - 16,
          currentY + 4,
          14,
          14,
          theme
        );
        g.appendChild(statusEl);
      } else if (structured.header.badge) {
        const badgeW = Math.max(36, structured.header.badge.length * 6.5 + 12);
        const badgeEl = renderMicroComponent(
          { id: `${element.id}-badge`, type: "badge", props: { label: structured.header.badge, variant: "info" } },
          x + width - paddingX - badgeW,
          currentY + 2,
          badgeW,
          18,
          theme
        );
        g.appendChild(badgeEl);
      }

      currentY += headerH;

      // Header separator divider
      const sep = document.createElementNS("http://www.w3.org/2000/svg", "line");
      sep.setAttribute("x1", String(x));
      sep.setAttribute("y1", String(currentY));
      sep.setAttribute("x2", String(x + width));
      sep.setAttribute("y2", String(currentY));
      sep.setAttribute("stroke", theme.border);
      sep.setAttribute("stroke-width", "1");
      sep.setAttribute("opacity", "0.6");
      g.appendChild(sep);

      currentY += 8;
    }

    // 2. Body Region
    if (structured.body) {
      if (structured.body.description) {
        const descEl = document.createElementNS("http://www.w3.org/2000/svg", "text");
        descEl.setAttribute("x", String(x + paddingX));
        descEl.setAttribute("y", String(currentY + 14));
        descEl.setAttribute("fill", theme.textSecondary);
        descEl.setAttribute("font-size", "11");
        descEl.setAttribute("font-family", "Inter, system-ui, sans-serif");
        descEl.textContent = structured.body.description;
        g.appendChild(descEl);
        currentY += 22;
      }

      // Render body micro-component sections
      if (Array.isArray(structured.body.sections)) {
        for (const sec of structured.body.sections) {
          const compH = 26;
          const compEl = renderMicroComponent(sec, x + paddingX, currentY, contentW, compH, theme);
          g.appendChild(compEl);
          currentY += compH + 4;
        }
      }
    }

    // Render direct sections/children if present
    if (Array.isArray(structured.sections)) {
      for (const sec of structured.sections) {
        const compH = 24;
        const compEl = renderMicroComponent(sec, x + paddingX, currentY, contentW, compH, theme);
        g.appendChild(compEl);
        currentY += compH + 4;
      }
    }

    // 3. Footer Region
    if (structured.footer) {
      const footerY = y + height - 28;
      const sep = document.createElementNS("http://www.w3.org/2000/svg", "line");
      sep.setAttribute("x1", String(x));
      sep.setAttribute("y1", String(footerY));
      sep.setAttribute("x2", String(x + width));
      sep.setAttribute("y2", String(footerY));
      sep.setAttribute("stroke", theme.border);
      sep.setAttribute("stroke-width", "1");
      sep.setAttribute("opacity", "0.6");
      g.appendChild(sep);

      if (structured.footer.content) {
        const footText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        footText.setAttribute("x", String(x + paddingX));
        footText.setAttribute("y", String(footerY + 18));
        footText.setAttribute("fill", theme.textSecondary);
        footText.setAttribute("font-size", "10");
        footText.setAttribute("font-family", "Inter, system-ui, sans-serif");
        footText.textContent = structured.footer.content;
        g.appendChild(footText);
      }

      if (Array.isArray(structured.footer.actions)) {
        let actX = x + width - paddingX;
        for (const act of structured.footer.actions) {
          const actW = 55;
          actX -= actW;
          const actEl = renderMicroComponent(act, actX, footerY + 5, actW, 20, theme);
          g.appendChild(actEl);
          actX -= 6;
        }
      }
    }
  } else {
    // Legacy simple node text layout
    const textGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    textGroup.setAttribute("pointer-events", "none");

    const label = (props.label as string) ?? "";
    const subLabel = (props.subLabel as string) ?? "";
    const badge = (props.badge as string) ?? "";
    const status = (props.status as string) ?? "";

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

    if (status) {
      const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      dot.setAttribute("cx", String(x + 14));
      dot.setAttribute("cy", String(y + 14));
      dot.setAttribute("r", "4");
      dot.setAttribute("fill", status === "error" ? "#ef4444" : status === "success" ? "#10b981" : "#3b82f6");
      textGroup.appendChild(dot);
    }

    if (badge) {
      const badgeW = Math.max(30, badge.length * 7 + 10);
      const badgeG = document.createElementNS("http://www.w3.org/2000/svg", "g");
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
  }

  // 4. Render Ports / Connection Sockets
  if (Array.isArray(structured.ports)) {
    for (const port of structured.ports) {
      const pt = calculatePortPoint(element, port);
      if (!pt) continue;

      const portG = document.createElementNS("http://www.w3.org/2000/svg", "g");
      portG.setAttribute("id", `port-${port.id}`);
      portG.setAttribute("data-port-id", port.id);
      portG.setAttribute("data-node-id", element.id);
      portG.setAttribute("class", "artifact-port cursor-crosshair");

      // Hover halo ring
      const halo = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      halo.setAttribute("cx", String(pt.x));
      halo.setAttribute("cy", String(pt.y));
      halo.setAttribute("r", "8");
      halo.setAttribute("fill", theme.accent);
      halo.setAttribute("opacity", "0");
      halo.setAttribute("class", "port-halo transition-opacity");
      portG.appendChild(halo);

      // Socket core
      const socket = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      socket.setAttribute("cx", String(pt.x));
      socket.setAttribute("cy", String(pt.y));
      socket.setAttribute("r", "4.5");
      socket.setAttribute("fill", "#ffffff");
      socket.setAttribute("stroke", port.direction === "input" ? "#3b82f6" : "#10b981");
      socket.setAttribute("stroke-width", "2");
      portG.appendChild(socket);

      // Port name tooltip/label if requested
      if (port.name) {
        const portName = document.createElementNS("http://www.w3.org/2000/svg", "title");
        portName.textContent = `${port.name} (${port.direction})`;
        portG.appendChild(portName);
      }

      g.appendChild(portG);
    }
  }

  return g;
}
