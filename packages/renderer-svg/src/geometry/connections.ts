import type {
  ArtifactElement,
  AnchorPoint,
  Connection
} from "@interactive-artifact/protocol";

export interface Point {
  x: number;
  y: number;
}

export interface ConnectionGeometry {
  path: string;
  startPoint: Point;
  endPoint: Point;
  midPoint: Point;
  arrowPoints: Point[]; // 3 points for arrowhead polygon
}

/**
 * Calculates intersection of line segment (cx, cy) -> (tx, ty) with a rectangle
 */
export function getBoxIntersection(
  rect: { x: number; y: number; width: number; height: number },
  target: Point,
  padding = 2
): Point {
  const cx = rect.x + rect.width / 2;
  const cy = rect.y + rect.height / 2;
  const dx = target.x - cx;
  const dy = target.y - cy;

  if (Math.abs(dx) < 0.001 && Math.abs(dy) < 0.001) {
    return { x: cx, y: cy };
  }

  const halfW = rect.width / 2 + padding;
  const halfH = rect.height / 2 + padding;

  const slopeX = halfW / Math.abs(dx);
  const slopeY = halfH / Math.abs(dy);

  if (slopeX < slopeY) {
    // Intersects left or right edge
    const signX = dx > 0 ? 1 : -1;
    return {
      x: cx + signX * halfW,
      y: cy + (dx > 0 ? 1 : -1) * halfW * (dy / Math.abs(dx))
    };
  } else {
    // Intersects top or bottom edge
    const signY = dy > 0 ? 1 : -1;
    return {
      x: cx + (dy > 0 ? 1 : -1) * halfH * (dx / Math.abs(dy)),
      y: cy + signY * halfH
    };
  }
}

/**
 * Resolves connection point on element given anchor preference
 */
export function resolveAnchorPoint(
  element: ArtifactElement,
  anchor: AnchorPoint | undefined,
  otherPoint: Point
): Point {
  const { x, y } = element.position;
  const { width, height } = element.size;

  switch (anchor) {
    case "top":
      return { x: x + width / 2, y };
    case "bottom":
      return { x: x + width / 2, y: y + height };
    case "left":
      return { x, y: y + height / 2 };
    case "right":
      return { x: x + width, y: y + height / 2 };
    case "center":
      return { x: x + width / 2, y: y + height / 2 };
    case "auto":
    default:
      return getBoxIntersection({ x, y, width, height }, otherPoint);
  }
}

/**
 * Calculates arrowhead polygon vertices at target point facing direction (dx, dy)
 */
export function calculateArrowhead(
  tip: Point,
  from: Point,
  size = 10
): Point[] {
  const angle = Math.atan2(tip.y - from.y, tip.x - from.x);
  const angle1 = angle + Math.PI - Math.PI / 6;
  const angle2 = angle + Math.PI + Math.PI / 6;

  return [
    tip,
    {
      x: tip.x + size * Math.cos(angle1),
      y: tip.y + size * Math.sin(angle1)
    },
    {
      x: tip.x + size * Math.cos(angle2),
      y: tip.y + size * Math.sin(angle2)
    }
  ];
}

/**
 * Computes the complete SVG connection geometry and routing between two elements
 */
export function calculateConnectionGeometry(
  connection: Connection,
  fromEl: ArtifactElement,
  toEl: ArtifactElement
): ConnectionGeometry {
  const fromCenter: Point = {
    x: fromEl.position.x + fromEl.size.width / 2,
    y: fromEl.position.y + fromEl.size.height / 2
  };
  const toCenter: Point = {
    x: toEl.position.x + toEl.size.width / 2,
    y: toEl.position.y + toEl.size.height / 2
  };

  const fromAnchor = typeof connection.from === "object" ? connection.from.anchor : "auto";
  const toAnchor = typeof connection.to === "object" ? connection.to.anchor : "auto";

  const startPoint = resolveAnchorPoint(fromEl, fromAnchor, toCenter);
  const endPoint = resolveAnchorPoint(toEl, toAnchor, fromCenter);

  let path = "";
  const midPoint: Point = {
    x: (startPoint.x + endPoint.x) / 2,
    y: (startPoint.y + endPoint.y) / 2
  };

  const connType = connection.type ?? "arrow";

  if (connType === "curved") {
    const dx = endPoint.x - startPoint.x;
    const dy = endPoint.y - startPoint.y;
    const cx1 = startPoint.x + dx * 0.5;
    const cy1 = startPoint.y;
    const cx2 = startPoint.x + dx * 0.5;
    const cy2 = endPoint.y;
    path = `M ${startPoint.x} ${startPoint.y} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${endPoint.x} ${endPoint.y}`;
  } else if (connType === "orthogonal") {
    // Step routing
    const dx = endPoint.x - startPoint.x;
    if (Math.abs(dx) > 20) {
      const midX = startPoint.x + dx / 2;
      path = `M ${startPoint.x} ${startPoint.y} L ${midX} ${startPoint.y} L ${midX} ${endPoint.y} L ${endPoint.x} ${endPoint.y}`;
    } else {
      path = `M ${startPoint.x} ${startPoint.y} L ${endPoint.x} ${endPoint.y}`;
    }
  } else {
    // Straight line or arrow
    path = `M ${startPoint.x} ${startPoint.y} L ${endPoint.x} ${endPoint.y}`;
  }

  // Pre-tip point for calculating arrow angle
  const preTip = connType === "curved"
    ? { x: (startPoint.x + endPoint.x) / 2, y: endPoint.y }
    : connType === "orthogonal"
    ? { x: (startPoint.x + endPoint.x) / 2, y: endPoint.y }
    : startPoint;

  const arrowPoints = calculateArrowhead(endPoint, preTip, 10);

  return {
    path,
    startPoint,
    endPoint,
    midPoint,
    arrowPoints
  };
}
