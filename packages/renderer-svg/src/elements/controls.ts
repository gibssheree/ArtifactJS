import type { ArtifactElement } from "@interactive-artifact/protocol";
import type { ArtifactInstance } from "@interactive-artifact/core";
import type { ThemeColors } from "../theme.js";

/**
 * Renders interactive UI controls (button, slider, toggle) directly in SVG
 */
export function renderControlElement(
  element: ArtifactElement,
  theme: ThemeColors,
  artifact: ArtifactInstance
): SVGElement {
  const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  g.setAttribute("id", `el-${element.id}`);
  g.setAttribute("data-element-id", element.id);
  g.setAttribute("class", "artifact-element artifact-control cursor-pointer select-none");

  const { x, y } = element.position;
  const { width, height } = element.size;
  const props = element.props ?? {};

  switch (element.type) {
    case "button": {
      const label = (props.label as string) ?? "Button";
      const variant = (props.variant as string) ?? "primary";
      const disabled = Boolean(props.disabled);

      let btnBg = theme.accent;
      let btnText = theme.accentForeground;
      if (variant === "secondary") {
        btnBg = theme.surfaceSubtle;
        btnText = theme.text;
      } else if (variant === "danger") {
        btnBg = "#ef4444";
        btnText = "#ffffff";
      }

      const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      rect.setAttribute("x", String(x));
      rect.setAttribute("y", String(y));
      rect.setAttribute("width", String(width));
      rect.setAttribute("height", String(height));
      rect.setAttribute("rx", "6");
      rect.setAttribute("fill", btnBg);
      rect.setAttribute("opacity", disabled ? "0.5" : "1");
      g.appendChild(rect);

      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("x", String(x + width / 2));
      text.setAttribute("y", String(y + height / 2 + 4));
      text.setAttribute("text-anchor", "middle");
      text.setAttribute("fill", btnText);
      text.setAttribute("font-size", "13");
      text.setAttribute("font-weight", "600");
      text.setAttribute("font-family", "Inter, system-ui, sans-serif");
      text.setAttribute("pointer-events", "none");
      text.textContent = label;
      g.appendChild(text);

      g.addEventListener("click", (e) => {
        e.stopPropagation();
        if (disabled) return;
        artifact.events.emit({
          type: "element.clicked",
          artifactId: artifact.id,
          elementId: element.id,
          timestamp: Date.now()
        });
      });
      break;
    }

    case "slider": {
      const min = Number(props.min ?? 0);
      const max = Number(props.max ?? 100);
      const value = Number(artifact.state.get(`control_${element.id}_value`) ?? props.value ?? min);
      const label = (props.label as string) ?? "";

      const trackY = y + height / 2;
      const track = document.createElementNS("http://www.w3.org/2000/svg", "line");
      track.setAttribute("x1", String(x));
      track.setAttribute("y1", String(trackY));
      track.setAttribute("x2", String(x + width));
      track.setAttribute("y2", String(trackY));
      track.setAttribute("stroke", theme.border);
      track.setAttribute("stroke-width", "4");
      track.setAttribute("stroke-linecap", "round");
      g.appendChild(track);

      // Value progress
      const ratio = Math.max(0, Math.min(1, (value - min) / (max - min || 1)));
      const thumbX = x + ratio * width;

      const progress = document.createElementNS("http://www.w3.org/2000/svg", "line");
      progress.setAttribute("x1", String(x));
      progress.setAttribute("y1", String(trackY));
      progress.setAttribute("x2", String(thumbX));
      progress.setAttribute("y2", String(trackY));
      progress.setAttribute("stroke", theme.accent);
      progress.setAttribute("stroke-width", "4");
      progress.setAttribute("stroke-linecap", "round");
      g.appendChild(progress);

      // Thumb
      const thumb = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      thumb.setAttribute("cx", String(thumbX));
      thumb.setAttribute("cy", String(trackY));
      thumb.setAttribute("r", "8");
      thumb.setAttribute("fill", theme.accent);
      thumb.setAttribute("stroke", "#ffffff");
      thumb.setAttribute("stroke-width", "2");
      g.appendChild(thumb);

      if (label) {
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", String(x));
        text.setAttribute("y", String(y + 10));
        text.setAttribute("fill", theme.textSecondary);
        text.setAttribute("font-size", "11");
        text.textContent = `${label}: ${Math.round(value)}`;
        g.appendChild(text);
      }
      break;
    }

    case "toggle": {
      const checked = Boolean(artifact.state.get(`control_${element.id}_checked`) ?? props.checked);
      const label = (props.label as string) ?? "";

      const toggleW = 40;
      const toggleH = 22;
      const toggleY = y + (height - toggleH) / 2;

      const bg = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      bg.setAttribute("x", String(x));
      bg.setAttribute("y", String(toggleY));
      bg.setAttribute("width", String(toggleW));
      bg.setAttribute("height", String(toggleH));
      bg.setAttribute("rx", String(toggleH / 2));
      bg.setAttribute("fill", checked ? theme.accent : theme.border);
      g.appendChild(bg);

      const thumbRadius = 8;
      const thumbX = checked ? x + toggleW - thumbRadius - 3 : x + thumbRadius + 3;
      const thumb = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      thumb.setAttribute("cx", String(thumbX));
      thumb.setAttribute("cy", String(toggleY + toggleH / 2));
      thumb.setAttribute("r", String(thumbRadius));
      thumb.setAttribute("fill", "#ffffff");
      g.appendChild(thumb);

      if (label) {
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", String(x + toggleW + 8));
        text.setAttribute("y", String(toggleY + toggleH / 2 + 4));
        text.setAttribute("fill", theme.text);
        text.setAttribute("font-size", "12");
        text.textContent = label;
        g.appendChild(text);
      }

      g.addEventListener("click", (e) => {
        e.stopPropagation();
        const next = !checked;
        artifact.state.set(`control_${element.id}_checked`, next);
        artifact.events.emit({
          type: "element.clicked",
          artifactId: artifact.id,
          elementId: element.id,
          timestamp: Date.now()
        });
      });
      break;
    }
  }

  return g;
}
