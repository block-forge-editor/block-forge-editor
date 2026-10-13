import { useEffect, useState, useSyncExternalStore } from "react";

export type TTheme = "light" | "dark" | "system";
export type TResolvedTheme = "light" | "dark";

export const DARK_CLASS = "bf-dark";

// Block tools render into their own React roots and Radix renders menus, dialogs
// and drawers into document.body, so neither sees the editor's DOM or React
// context. The editor publishes its resolved theme here and everything reads it.
// With several editors on one page the last one to change its theme wins.
let current: TResolvedTheme = "light";
const listeners = new Set<() => void>();

export const setResolvedTheme = (theme: TResolvedTheme) => {
  if (theme === current) return;
  current = theme;
  listeners.forEach((listener) => listener());
};

export const getResolvedTheme = () => current;

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

export const useResolvedTheme = (): TResolvedTheme =>
  useSyncExternalStore(subscribe, getResolvedTheme, () => "light");

// Class for content rendered outside the editor root (portals).
export const useThemeClass = () =>
  useResolvedTheme() === "dark" ? DARK_CLASS : undefined;

const DARK_QUERY = "(prefers-color-scheme: dark)";

const prefersDark = () =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia(DARK_QUERY).matches;

export const useSystemTheme = (enabled: boolean): TResolvedTheme => {
  const [isDark, setIsDark] = useState(prefersDark);

  useEffect(() => {
    if (!enabled || typeof window.matchMedia !== "function") return;

    const media = window.matchMedia(DARK_QUERY);
    const update = () => setIsDark(media.matches);

    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [enabled]);

  return isDark ? "dark" : "light";
};
