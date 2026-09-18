export interface Point {
  x: number;
  y: number;
}

/**
 * Pseudo-random generator with fixed or seeded perturbation
 */
function randomOffset(roughness: number): number {
  return (Math.random() - 0.5) * roughness * 4;
}

/**
 * Generates a hand-drawn sketch path between two points with organic wobble
 */
export function sketchLine(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  roughness = 1.2
): string {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const length = Math.sqrt(dx * dx + dy * dy);
  if (length < 2) {
    return `M ${x1} ${y1} L ${x2} ${y2}`;
  }

  // Midpoint with perpendicular displacement
  const midX = (x1 + x2) / 2 + randomOffset(roughness);
  const midY = (y1 + y2) / 2 + randomOffset(roughness);

  // First pass
  let path = `M ${x1 + randomOffset(roughness * 0.5)} ${y1 + randomOffset(roughness * 0.5)} Q ${midX} ${midY}, ${x2 + randomOffset(roughness * 0.5)} ${y2 + randomOffset(roughness * 0.5)}`;

  // Double stroke if roughness is noticeable
  if (roughness >= 0.8) {
    const midX2 = (x1 + x2) / 2 + randomOffset(roughness);
    const midY2 = (y1 + y2) / 2 + randomOffset(roughness);
    path += ` M ${x1 + randomOffset(roughness * 0.5)} ${y1 + randomOffset(roughness * 0.5)} Q ${midX2} ${midY2}, ${x2 + randomOffset(roughness * 0.5)} ${y2 + randomOffset(roughness * 0.5)}`;
  }

  return path;
}

/**
 * Generates a sketchy rectangle path with overlapping hand-drawn corners
 */
export function sketchRect(
  x: number,
  y: number,
  width: number,
  height: number,
  roughness = 1.2
): string {
  const overlap = Math.min(6, width * 0.05);

  const top = sketchLine(x - overlap, y, x + width + overlap, y, roughness);
  const right = sketchLine(x + width, y - overlap, x + width, y + height + overlap, roughness);
  const bottom = sketchLine(x + width + overlap, y + height, x - overlap, y + height, roughness);
  const left = sketchLine(x, y + height + overlap, x, y - overlap, roughness);

  return `${top} ${right} ${bottom} ${left}`;
}

/**
 * Generates a sketchy ellipse path with organic multi-segment curves
 */
export function sketchEllipse(
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  roughness = 1.2
): string {
  const steps = 8;
  const angleStep = (Math.PI * 2) / steps;
  const points: Point[] = [];

  for (let i = 0; i <= steps; i++) {
    const angle = i * angleStep;
    const r = (i === steps) ? points[0]! : {
      x: cx + Math.cos(angle) * rx + randomOffset(roughness),
      y: cy + Math.sin(angle) * ry + randomOffset(roughness)
    };
    points.push(r);
  }

  let path = `M ${points[0]!.x} ${points[0]!.y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1]!;
    const curr = points[i]!;
    const midX = (prev.x + curr.x) / 2;
    const midY = (prev.y + curr.y) / 2;
    path += ` Q ${prev.x} ${prev.y}, ${midX} ${midY}`;
  }

  // Double pass for sketch look
  if (roughness >= 0.8) {
    const secondStart = {
      x: cx + rx + randomOffset(roughness),
      y: cy + randomOffset(roughness)
    };
    path += ` M ${secondStart.x} ${secondStart.y}`;
    for (let i = 1; i <= steps; i++) {
      const angle = i * angleStep;
      const pt = {
        x: cx + Math.cos(angle) * rx + randomOffset(roughness),
        y: cy + Math.sin(angle) * ry + randomOffset(roughness)
      };
      path += ` L ${pt.x} ${pt.y}`;
    }
  }

  return path;
}

/**
 * Generates a smooth organic SVG path for freehand sketch points
 */
export function sketchFreehand(points: Point[], closed = false): string {
  if (points.length < 2) return "";
  let path = `M ${points[0]!.x} ${points[0]!.y}`;

  for (let i = 1; i < points.length; i++) {
    const p1 = points[i - 1]!;
    const p2 = points[i]!;
    const midX = (p1.x + p2.x) / 2;
    const midY = (p1.y + p2.y) / 2;
    path += ` Q ${p1.x} ${p1.y}, ${midX} ${midY}`;
  }

  const last = points[points.length - 1]!;
  path += ` L ${last.x} ${last.y}`;

  if (closed) {
    path += " Z";
  }

  return path;
}
