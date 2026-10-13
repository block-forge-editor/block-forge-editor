import { describe, it, expect, afterEach, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";

import { BlockForgeEditor } from "../index";
import { setResolvedTheme, getResolvedTheme } from "../lib/theme";
import { Dialog, DialogContent, DialogTitle } from "../ui/shadcn/ui/dialog";

vi.mock("../lib/use-editor", () => ({
  useEditor: () => ({ ejInstance: { current: null }, isLoading: false }),
}));

const root = (container: HTMLElement) =>
  container.querySelector(".bf-editor") as HTMLElement;
const sheet = (container: HTMLElement) =>
  container.querySelector(".bf-editor__sheet") as HTMLElement;

afterEach(() => {
  cleanup();
  setResolvedTheme("light");
  vi.unstubAllGlobals();
});

describe("BlockForgeEditor", () => {
  it("defaults to a light page layout with the menubar", () => {
    const { container } = render(<BlockForgeEditor id="t" />);

    expect(root(container).dataset.bfLayout).toBe("page");
    expect(root(container).classList.contains("bf-dark")).toBe(false);
    expect(screen.getByRole("menubar")).toBeTruthy();
    expect(sheet(container).className).toContain("bf-shadow-md");
    expect(sheet(container).className).toContain("bf-bg-background");
    expect(sheet(container).className).toContain("bf-font-opensans");
  });

  it("applies the dark theme to the root and publishes it for portals", () => {
    const { container } = render(<BlockForgeEditor id="t" theme="dark" />);

    expect(root(container).classList.contains("bf-dark")).toBe(true);
    expect(root(container).dataset.bfTheme).toBe("dark");
    expect(getResolvedTheme()).toBe("dark");
  });

  it("resolves theme=system from prefers-color-scheme", () => {
    vi.stubGlobal(
      "matchMedia",
      vi.fn(() => ({
        matches: true,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    );

    const { container } = render(<BlockForgeEditor id="t" theme="system" />);

    expect(root(container).classList.contains("bf-dark")).toBe(true);
  });

  it("themes portaled content rendered outside the editor root", () => {
    render(
      <>
        <BlockForgeEditor id="t" theme="dark" />
        <Dialog open>
          <DialogContent aria-describedby={undefined}>
            <DialogTitle>Portal</DialogTitle>
          </DialogContent>
        </Dialog>
      </>,
    );

    expect(screen.getByRole("dialog").classList.contains("bf-dark")).toBe(true);
  });

  it("embedded layout fills the container: no menubar, frame, background or font", () => {
    const { container } = render(
      <BlockForgeEditor
        id="t"
        layout="embedded"
        showMenubar={false}
        className="host-class"
      />,
    );

    expect(root(container).dataset.bfLayout).toBe("embedded");
    expect(root(container).className).toContain("bf-editor--embedded");
    expect(root(container).className).toContain("host-class");
    expect(root(container).className).not.toContain("bf-my-6");
    expect(screen.queryByRole("menubar")).toBeNull();
    expect(sheet(container).className).not.toContain("bf-shadow-md");
    expect(sheet(container).className).not.toContain("bf-min-h-screen");
    expect(sheet(container).className).not.toContain("bf-bg-");
    expect(sheet(container).className).not.toContain("bf-font-");
  });

  it("embedded layout still shows a background picked in the data", () => {
    const { container } = render(
      <BlockForgeEditor
        id="t"
        layout="embedded"
        initialData={{ blocks: [], meta: { background: "rose-50" } }}
      />,
    );

    expect(sheet(container).className).toContain("bf-bg-rose-50");
  });
});
