import type { ArtifactElement } from "@interactive-artifact/protocol";
import type { ThemeColors } from "../theme.js";

/**
 * Creates SVG element for text primitives
 */
export function renderTextElement(
  element: ArtifactElement,
  theme: ThemeColors
): SVGElement {
  const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  g.setAttribute("id", `el-${element.id}`);
  g.setAttribute("data-element-id", element.id);
  g.setAttribute("class", "artifact-element artifact-text");

  const { x, y } = element.position;
  const { width, height } = element.size;
  const style = element.style ?? {};
  const text = (element.props?.text as string) ?? (element.props?.label as string) ?? "";

  const textEl = document.createElementNS("http://www.w3.org/2000/svg", "text");
  const align = style.textAlign ?? "left";

  let posX = x;
  if (align === "center") {
    posX = x + width / 2;
  } else if (align === "right") {
    posX = x + width;
  }

  textEl.setAttribute("x", String(posX));
  textEl.setAttribute("y", String(y + (height ? height / 2 + 5 : 16)));
  textEl.setAttribute("text-anchor", align === "center" ? "middle" : align === "right" ? "end" : "start");
  textEl.setAttribute("fill", style.color ?? style.fill ?? theme.text);
  textEl.setAttribute("font-size", String(style.fontSize ?? 15));
  textEl.setAttribute("font-weight", String(style.fontWeight ?? "500"));
  textEl.setAttribute("font-family", style.fontFamily ?? "Inter, system-ui, sans-serif");
  textEl.textContent = text;

  g.appendChild(textEl);
  return g;
}
