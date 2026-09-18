import type { ThemeMode } from "@interactive-artifact/protocol";

export interface ThemeColors {
  bg: string;
  surface: string;
  surfaceSubtle: string;
  text: string;
  textSecondary: string;
  border: string;
  borderHover: string;
  accent: string;
  accentForeground: string;
  selection: string;
  selectionFill: string;
  grid: string;
  arrow: string;
}

export const THEMES: Record<ThemeMode, ThemeColors> = {
  neutral: {
    bg: "#ffffff",
    surface: "#f8fafc",
    surfaceSubtle: "#f1f5f9",
    text: "#0f172a",
    textSecondary: "#64748b",
    border: "#cbd5e1",
    borderHover: "#94a3b8",
    accent: "#3b82f6",
    accentForeground: "#ffffff",
    selection: "#2563eb",
    selectionFill: "rgba(37, 99, 235, 0.08)",
    grid: "#e2e8f0",
    arrow: "#475569"
  },
  light: {
    bg: "#ffffff",
    surface: "#f9fafb",
    surfaceSubtle: "#f3f4f6",
    text: "#111827",
    textSecondary: "#6b7280",
    border: "#d1d5db",
    borderHover: "#9ca3af",
    accent: "#4f46e5",
    accentForeground: "#ffffff",
    selection: "#4f46e5",
    selectionFill: "rgba(79, 70, 229, 0.08)",
    grid: "#e5e7eb",
    arrow: "#374151"
  },
  dark: {
    bg: "#0f172a",
    surface: "#1e293b",
    surfaceSubtle: "#334155",
    text: "#f8fafc",
    textSecondary: "#94a3b8",
    border: "#475569",
    borderHover: "#64748b",
    accent: "#60a5fa",
    accentForeground: "#0f172a",
    selection: "#38bdf8",
    selectionFill: "rgba(56, 189, 248, 0.15)",
    grid: "#1e293b",
    arrow: "#94a3b8"
  }
};

export function getThemeColors(theme?: ThemeMode): ThemeColors {
  return THEMES[theme ?? "neutral"] ?? THEMES.neutral;
}
