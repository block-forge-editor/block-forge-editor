import type { OutputData } from "@editorjs/editorjs";
import EditorJS from "@editorjs/editorjs";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { waitFor } from "@testing-library/dom";

import { useEditor } from "../use-editor";
import { getToolsConfig } from "../tools-manager";
import { TToolPreset } from "../tools-constants";

const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

beforeEach(() => {
  console.error = vi.fn();
  console.warn = vi.fn();
});

afterEach(() => {
  console.error = originalConsoleError;
  console.warn = originalConsoleWarn;
});

vi.mock("@editorjs/editorjs", () => {
  return {
    default: vi.fn().mockImplementation((config) => {
      const mockEditor = {
        save: vi.fn().mockResolvedValue({ blocks: [] }),
        destroy: vi.fn(),
        ...config,
      };

      if (config.onReady) {
        setTimeout(() => config.onReady(mockEditor), 0);
      }

      return mockEditor;
    }),
  };
});

vi.mock("editorjs-drag-drop", () => {
  return {
    default: vi.fn().mockImplementation(() => ({})),
  };
});

vi.mock("editorjs-undo", () => {
  return {
    default: vi.fn().mockImplementation(() => ({})),
  };
});

vi.mock("../tools-manager", () => ({
  getToolsConfig: vi.fn(),
}));

const mockGetToolsConfig = vi.mocked(getToolsConfig);

describe("useEditor", () => {
  const mockToolsConfig = {
    paragraph: {
      class: vi.fn(),
      config: { preserveBlank: false },
    },
    list: {
      class: vi.fn(),
      inlineToolbar: true,
      config: { defaultStyle: "unordered" },
      toolbox: { title: "List" },
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockGetToolsConfig.mockResolvedValue(mockToolsConfig);

    const mockElement = document.createElement("div");
    mockElement.id = "test-editor";
    document.body.appendChild(mockElement);
  });

  afterEach(() => {
    const element = document.getElementById("test-editor");
    if (element) {
      document.body.removeChild(element);
    }
  });

  describe("initialization", () => {
    it("should initialize editor with default configuration", async () => {
      const { result } = renderHook(() =>
        useEditor({
          id: "test-editor",
        }),
      );

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(EditorJS).toHaveBeenCalledWith(
        expect.objectContaining({
          autofocus: true,
          holder: "test-editor",
          inlineToolbar: true,
          tools: mockToolsConfig,
        }),
      );
    });

    it("should initialize editor with tools", async () => {
      const tools = {
        customTool: {
          class: vi.fn(),
        },
      };

      const { result } = renderHook(() =>
        useEditor({
          id: "test-editor",
          tools,
        }),
      );

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(EditorJS).toHaveBeenCalledWith(
        expect.objectContaining({
          tools: expect.objectContaining({
            ...mockToolsConfig,
            ...tools,
          }),
        }),
      );
    });

    it("should initialize editor with tools preset", async () => {
      const { result } = renderHook(() =>
        useEditor({
          id: "test-editor",
          toolPreset: "minimal",
        }),
      );

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(mockGetToolsConfig).toHaveBeenCalledWith("minimal", undefined);
    });

    it("should initialize editor with enabled tools", async () => {
      const enabledTools = ["paragraph", "list"];

      const { result } = renderHook(() =>
        useEditor({
          id: "test-editor",
          enabledTools,
        }),
      );

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(mockGetToolsConfig).toHaveBeenCalledWith(undefined, enabledTools);
    });

    it("should initialize editor with initial data", async () => {
      const initialData: OutputData = {
        time: Date.now(),
        blocks: [
          {
            id: "1",
            type: "paragraph",
            data: { text: "Initial content" },
          },
        ],
      };

      const { result } = renderHook(() =>
        useEditor({
          id: "test-editor",
          initialData,
        }),
      );

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(EditorJS).toHaveBeenCalledWith(
        expect.objectContaining({
          data: initialData,
        }),
      );
    });
  });

  describe("loading states", () => {
    it("should show loading state while tools are being loaded", () => {
      mockGetToolsConfig.mockImplementation(
        () =>
          new Promise((resolve) =>
            setTimeout(() => resolve(mockToolsConfig), 100),
          ),
      );

      const { result } = renderHook(() =>
        useEditor({
          id: "test-editor",
        }),
      );

      expect(result.current.isLoading).toBe(true);
    });

    it("should handle tool loading failures gracefully", async () => {
      mockGetToolsConfig.mockRejectedValue(new Error("Tool loading failed"));

      const { result } = renderHook(() =>
        useEditor({
          id: "test-editor",
        }),
      );

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.ejInstance.current).toBeTruthy();
    });
  });

  describe("editor lifecycle", () => {
    it("should destroy editor on unmount", async () => {
      const { result, unmount } = renderHook(() =>
        useEditor({
          id: "test-editor",
        }),
      );

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      const editorInstance = result.current.ejInstance.current;
      expect(editorInstance).toBeTruthy();

      unmount();

      expect(vi.mocked(editorInstance?.destroy)).toHaveBeenCalled();
    });

    it("should not create multiple editor instances", async () => {
      const { result, rerender } = renderHook(() =>
        useEditor({
          id: "test-editor",
        }),
      );

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      const firstInstance = result.current.ejInstance.current;

      rerender();

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      const secondInstance = result.current.ejInstance.current;

      expect(firstInstance).toBe(secondInstance);
      expect(EditorJS).toHaveBeenCalledTimes(1);
    });
  });

  describe("tool configuration updates", () => {
    it("should reload tools when toolPreset changes", async () => {
      const { result, rerender } = renderHook(
        ({ toolPreset }: { toolPreset: TToolPreset }) =>
          useEditor({
            id: "test-editor",
            toolPreset,
          }),
        {
          initialProps: { toolPreset: "minimal" },
        },
      );

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(mockGetToolsConfig).toHaveBeenCalledWith("minimal", undefined);

      rerender({ toolPreset: "full" });

      await waitFor(() => {
        expect(mockGetToolsConfig).toHaveBeenCalledWith("full", undefined);
      });
    });

    it("should reload tools when enabledTools changes", async () => {
      const { result, rerender } = renderHook(
        ({ enabledTools }) =>
          useEditor({
            id: "test-editor",
            enabledTools,
          }),
        {
          initialProps: { enabledTools: ["paragraph"] },
        },
      );

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(mockGetToolsConfig).toHaveBeenCalledWith(undefined, ["paragraph"]);

      rerender({ enabledTools: ["paragraph", "list"] });

      await waitFor(() => {
        expect(mockGetToolsConfig).toHaveBeenCalledWith(undefined, [
          "paragraph",
          "list",
        ]);
      });
    });
  });
});
