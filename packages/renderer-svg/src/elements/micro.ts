import type { MicroComponent } from "@interactive-artifact/protocol";
import type { ThemeColors } from "../theme.js";

/**
 * Renders a standard SVG icon glyph based on name
 */
export function renderIconSvg(name: string, x: number, y: number, size = 16, color = "#64748b"): SVGElement {
  const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  g.setAttribute("transform", `translate(${x}, ${y})`);

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("fill", "none");
  path.setAttribute("stroke", color);
  path.setAttribute("stroke-width", "1.75");
  path.setAttribute("stroke-linecap", "round");
  path.setAttribute("stroke-linejoin", "round");

  const s = size;
  const s2 = s / 2;

  switch (name.toLowerCase()) {
    case "database":
    case "db": {
      // Cylinder / database icon
      path.setAttribute("d", `M 2 4 C 2 2.5, ${s - 2} 2.5, ${s - 2} 4 C ${s - 2} 5.5, 2 5.5, 2 4 Z M 2 4 L 2 ${s - 4} C 2 ${s - 2.5}, ${s - 2} ${s - 2.5}, ${s - 2} ${s - 4} L ${s - 2} 4 M 2 ${s2} C 2 ${s2 + 1.5}, ${s - 2} ${s2 + 1.5}, ${s - 2} ${s2}`);
      break;
    }
    case "server":
    case "api": {
      path.setAttribute("d", `M 2 3 L ${s - 2} 3 L ${s - 2} 8 L 2 8 Z M 2 10 L ${s - 2} 10 L ${s - 2} 15 L 2 15 Z M 5 5.5 L 6 5.5 M 5 12.5 L 6 12.5`);
      break;
    }
    case "cloud": {
      path.setAttribute("d", `M 4 ${s - 4} C 2 ${s - 4}, 2 ${s2}, 4.5 ${s2} C 4.5 ${s2 - 3}, 7 ${s2 - 5}, 9.5 ${s2 - 3} C 11 2, 14 3, 14 ${s2} C 15.5 ${s2}, 15.5 ${s - 4}, 14 ${s - 4} Z`);
      break;
    }
    case "user":
    case "client": {
      path.setAttribute("d", `M ${s2} 3 A 3 3 0 0 1 ${s2} 9 A 3 3 0 0 1 ${s2} 3 Z M 3 ${s - 2} C 3 ${s2 + 2}, 5 ${s2 + 2}, ${s2} ${s2 + 2} C ${s - 5} ${s2 + 2}, ${s - 3} ${s2 + 2}, ${s - 3} ${s - 2}`);
      break;
    }
    case "zap":
    case "lightning":
    case "bolt": {
      path.setAttribute("d", `M ${s2 + 1} 1 L 3 ${s2 + 1} L ${s2} ${s2 + 1} L ${s2 - 1} ${s - 1} L ${s - 2} ${s2 - 1} L ${s2 + 1} ${s2 - 1} Z`);
      path.setAttribute("fill", color);
      break;
    }
    case "check": {
      path.setAttribute("d", `M 3 ${s2} L ${s2 - 1} ${s - 4} L ${s - 3} 4`);
      break;
    }
    case "alert":
    case "warning": {
      path.setAttribute("d", `M ${s2} 2 L ${s - 2} ${s - 3} L 2 ${s - 3} Z M ${s2} 7 L ${s2} 10 M ${s2} 12 L ${s2} 12.5`);
      break;
    }
    case "gear":
    case "settings": {
      path.setAttribute("d", `M ${s2} 2 L ${s2} 4 M ${s2} ${s - 4} L ${s2} ${s - 2} M 2 ${s2} L 4 ${s2} M ${s - 4} ${s2} L ${s - 2} ${s2} M ${s2} ${s2} m -3, 0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0`);
      break;
    }
    default: {
      // Default circle dot / square
      path.setAttribute("d", `M 3 3 L ${s - 3} 3 L ${s - 3} ${s - 3} L 3 ${s - 3} Z`);
      break;
    }
  }

  g.appendChild(path);
  return g;
}

/**
 * Renders any MicroComponent into SVG
 */
export function renderMicroComponent(
  comp: MicroComponent,
  x: number,
  y: number,
  width: number,
  height: number,
  theme: ThemeColors
): SVGElement {
  const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  g.setAttribute("id", `comp-${comp.id}`);
  g.setAttribute("data-component-id", comp.id);
  g.setAttribute("class", "artifact-micro-component select-none cursor-pointer");

  const props = comp.props ?? {};
  const style = comp.style ?? {};

  switch (comp.type) {
    case "badge":
    case "chip": {
      const label = String(props.label ?? props.text ?? "Badge");
      const bg = String(style.fill ?? (props.variant === "error" ? "#fee2e2" : props.variant === "warning" ? "#fef3c7" : props.variant === "info" ? "#e0f2fe" : "#dcfce7"));
      const textCol = String(style.textColor ?? (props.variant === "error" ? "#b91c1c" : props.variant === "warning" ? "#b45309" : props.variant === "info" ? "#0369a1" : "#15803d"));

      const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      rect.setAttribute("x", String(x));
      rect.setAttribute("y", String(y));
      rect.setAttribute("width", String(width));
      rect.setAttribute("height", String(height));
      rect.setAttribute("rx", String(height / 2));
      rect.setAttribute("fill", bg);
      g.appendChild(rect);

      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("x", String(x + width / 2));
      text.setAttribute("y", String(y + height / 2 + 3.5));
      text.setAttribute("text-anchor", "middle");
      text.setAttribute("fill", textCol);
      text.setAttribute("font-size", String(style.fontSize ?? 10));
      text.setAttribute("font-weight", "600");
      text.setAttribute("font-family", "system-ui, sans-serif");
      text.setAttribute("pointer-events", "none");
      text.textContent = label;
      g.appendChild(text);
      break;
    }

    case "status-indicator": {
      const status = String(props.status ?? "idle");
      const statusColors: Record<string, string> = {
        idle: "#94a3b8",
        active: "#3b82f6",
        success: "#10b981",
        warning: "#f59e0b",
        error: "#ef4444"
      };
      const col = statusColors[status] ?? theme.accent;

      const ring = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      ring.setAttribute("cx", String(x + width / 2));
      ring.setAttribute("cy", String(y + height / 2));
      ring.setAttribute("r", String(Math.min(width, height) / 2));
      ring.setAttribute("fill", col);
      ring.setAttribute("opacity", "0.2");
      g.appendChild(ring);

      const core = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      core.setAttribute("cx", String(x + width / 2));
      core.setAttribute("cy", String(y + height / 2));
      core.setAttribute("r", String(Math.min(width, height) / 3));
      core.setAttribute("fill", col);
      g.appendChild(core);
      break;
    }

    case "metric": {
      const label = String(props.label ?? "");
      const value = String(props.value ?? "0");
      const delta = props.delta ? String(props.delta) : "";
      const deltaUp = delta.startsWith("+");

      const labelEl = document.createElementNS("http://www.w3.org/2000/svg", "text");
      labelEl.setAttribute("x", String(x));
      labelEl.setAttribute("y", String(y + 11));
      labelEl.setAttribute("fill", theme.textSecondary);
      labelEl.setAttribute("font-size", "10");
      labelEl.setAttribute("font-family", "system-ui, sans-serif");
      labelEl.textContent = label;
      g.appendChild(labelEl);

      const valEl = document.createElementNS("http://www.w3.org/2000/svg", "text");
      valEl.setAttribute("x", String(x));
      valEl.setAttribute("y", String(y + 27));
      valEl.setAttribute("fill", theme.text);
      valEl.setAttribute("font-size", "15");
      valEl.setAttribute("font-weight", "700");
      valEl.setAttribute("font-family", "system-ui, sans-serif");
      valEl.textContent = value;
      g.appendChild(valEl);

      if (delta) {
        const deltaEl = document.createElementNS("http://www.w3.org/2000/svg", "text");
        deltaEl.setAttribute("x", String(x + width));
        deltaEl.setAttribute("y", String(y + 27));
        deltaEl.setAttribute("text-anchor", "end");
        deltaEl.setAttribute("fill", deltaUp ? "#10b981" : "#ef4444");
        deltaEl.setAttribute("font-size", "10");
        deltaEl.setAttribute("font-weight", "600");
        deltaEl.setAttribute("font-family", "system-ui, sans-serif");
        deltaEl.textContent = delta;
        g.appendChild(deltaEl);
      }
      break;
    }

    case "key-value": {
      const keyText = String(props.keyName ?? props.key ?? "Key");
      const valText = String(props.value ?? "Value");

      const kEl = document.createElementNS("http://www.w3.org/2000/svg", "text");
      kEl.setAttribute("x", String(x));
      kEl.setAttribute("y", String(y + height / 2 + 3.5));
      kEl.setAttribute("fill", theme.textSecondary);
      kEl.setAttribute("font-size", "11");
      kEl.setAttribute("font-family", "system-ui, sans-serif");
      kEl.textContent = keyText;
      g.appendChild(kEl);

      const vEl = document.createElementNS("http://www.w3.org/2000/svg", "text");
      vEl.setAttribute("x", String(x + width));
      vEl.setAttribute("y", String(y + height / 2 + 3.5));
      vEl.setAttribute("text-anchor", "end");
      vEl.setAttribute("fill", theme.text);
      vEl.setAttribute("font-size", "11");
      vEl.setAttribute("font-weight", "500");
      vEl.setAttribute("font-family", "system-ui, sans-serif");
      vEl.textContent = valText;
      g.appendChild(vEl);
      break;
    }

    case "divider": {
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", String(x));
      line.setAttribute("y1", String(y + height / 2));
      line.setAttribute("x2", String(x + width));
      line.setAttribute("y2", String(y + height / 2));
      line.setAttribute("stroke", theme.border);
      line.setAttribute("stroke-width", "1");
      g.appendChild(line);
      break;
    }

    case "progress": {
      const val = Number(props.value ?? 50);
      const max = Number(props.max ?? 100);
      const pct = Math.min(100, Math.max(0, (val / max) * 100));

      const track = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      track.setAttribute("x", String(x));
      track.setAttribute("y", String(y + (height - 6) / 2));
      track.setAttribute("width", String(width));
      track.setAttribute("height", "6");
      track.setAttribute("rx", "3");
      track.setAttribute("fill", "#e2e8f0");
      g.appendChild(track);

      const bar = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      bar.setAttribute("x", String(x));
      bar.setAttribute("y", String(y + (height - 6) / 2));
      bar.setAttribute("width", String((width * pct) / 100));
      bar.setAttribute("height", "6");
      bar.setAttribute("rx", "3");
      bar.setAttribute("fill", theme.accent);
      g.appendChild(bar);
      break;
    }

    case "button": {
      const label = String(props.label ?? "Action");
      const btnBg = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      btnBg.setAttribute("x", String(x));
      btnBg.setAttribute("y", String(y));
      btnBg.setAttribute("width", String(width));
      btnBg.setAttribute("height", String(height));
      btnBg.setAttribute("rx", "6");
      btnBg.setAttribute("fill", String(style.fill ?? theme.accent));
      g.appendChild(btnBg);

      const btnText = document.createElementNS("http://www.w3.org/2000/svg", "text");
      btnText.setAttribute("x", String(x + width / 2));
      btnText.setAttribute("y", String(y + height / 2 + 3.5));
      btnText.setAttribute("text-anchor", "middle");
      btnText.setAttribute("fill", "#ffffff");
      btnText.setAttribute("font-size", "11");
      btnText.setAttribute("font-weight", "600");
      btnText.setAttribute("font-family", "system-ui, sans-serif");
      btnText.setAttribute("pointer-events", "none");
      btnText.textContent = label;
      g.appendChild(btnText);
      break;
    }

    case "icon": {
      const name = String(props.name ?? props.icon ?? "zap");
      const iconEl = renderIconSvg(name, x, y, Math.min(width, height), String(style.stroke ?? theme.accent));
      g.appendChild(iconEl);
      break;
    }

    default: {
      // Fallback label
      const fallback = document.createElementNS("http://www.w3.org/2000/svg", "text");
      fallback.setAttribute("x", String(x));
      fallback.setAttribute("y", String(y + height / 2 + 3.5));
      fallback.setAttribute("fill", theme.text);
      fallback.setAttribute("font-size", "11");
      fallback.setAttribute("font-family", "system-ui, sans-serif");
      fallback.textContent = String(props.label ?? props.name ?? comp.type);
      g.appendChild(fallback);
      break;
    }
  }

  return g;
}
