import type { CapabilityDefinition } from "./capability.js";

/**
 * Calculates match score for a capability against a search query
 */
export function scoreCapability(capability: CapabilityDefinition, tokens: string[]): number {
  let score = 0;
  const idLower = capability.id.toLowerCase();
  const nameLower = capability.name.toLowerCase();
  const descLower = capability.description.toLowerCase();
  const tagsLower = capability.tags.map(t => t.toLowerCase());
  const primLower = capability.primitives.map(p => p.toLowerCase());

  for (const token of tokens) {
    if (!token) continue;

    // Exact tag match = highest weight
    if (tagsLower.includes(token)) {
      score += 20;
    } else if (tagsLower.some(t => t.includes(token))) {
      score += 10;
    }

    // ID match
    if (idLower === token) {
      score += 25;
    } else if (idLower.includes(token)) {
      score += 15;
    }

    // Name match
    if (nameLower.includes(token)) {
      score += 12;
    }

    // Primitives match
    if (primLower.includes(token)) {
      score += 8;
    }

    // Description match
    if (descLower.includes(token)) {
      score += 5;
    }
  }

  return score;
}

/**
 * Resolves and ranks capabilities matching a search query
 */
export function resolveCapabilities(
  capabilities: CapabilityDefinition[],
  query: string
): CapabilityDefinition[] {
  const cleanQuery = query.trim().toLowerCase();
  if (!cleanQuery) {
    return [...capabilities];
  }

  const tokens = cleanQuery.split(/[\s,._\-/]+/).filter(Boolean);
  if (tokens.length === 0) {
    return [...capabilities];
  }

  const scored = capabilities.map(cap => ({
    cap,
    score: scoreCapability(cap, tokens)
  }));

  return scored
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(item => item.cap);
}
