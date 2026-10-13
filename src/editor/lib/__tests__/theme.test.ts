import { describe, it, expect, afterEach, vi } from "vitest";
import { act, cleanup, renderHook } from "@testing-library/react";

import {
  getResolvedTheme,
  setResolvedTheme,
  useResolvedTheme,
  useSystemTheme,
  useThemeClass,
} from "../theme";

const stubMatchMedia = (matches: boolean) => {
  const listeners = new Set<() => void>();
  const media = {
    matches,
    addEventListener: (_: string, listener: () => void) =>
      listeners.add(listener),
    removeEventListener: (_: string, listener: () => void) =>
      listeners.delete(listener),
  };
  vi.stubGlobal(
    "matchMedia",
    vi.fn(() => media),
  );
  return {
    change(next: boolean) {
      media.matches = next;
      listeners.forEach((listener) => listener());
    },
  };
};

afterEach(() => {
  cleanup();
  setResolvedTheme("light");
  vi.unstubAllGlobals();
});

describe("theme store", () => {
  it("starts light and notifies subscribers on change", () => {
    const { result } = renderHook(() => useResolvedTheme());
    expect(result.current).toBe("light");

    act(() => setResolvedTheme("dark"));

    expect(result.current).toBe("dark");
    expect(getResolvedTheme()).toBe("dark");
  });

  it("gives portals the dark class only in dark theme", () => {
    const { result } = renderHook(() => useThemeClass());
    expect(result.current).toBeUndefined();

    act(() => setResolvedTheme("dark"));

    expect(result.current).toBe("bf-dark");
  });
});

describe("useSystemTheme", () => {
  it("follows prefers-color-scheme and its changes", () => {
    const media = stubMatchMedia(true);
    const { result } = renderHook(() => useSystemTheme(true));
    expect(result.current).toBe("dark");

    act(() => media.change(false));

    expect(result.current).toBe("light");
  });

  it("falls back to light without matchMedia", () => {
    vi.stubGlobal("matchMedia", undefined);
    const { result } = renderHook(() => useSystemTheme(true));
    expect(result.current).toBe("light");
  });
});
