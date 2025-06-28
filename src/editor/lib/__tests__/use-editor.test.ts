import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { waitFor } from "@testing-library/dom";
import { useEditor } from "../use-editor";
import { getToolsConfig } from "../tools-manager";
import { TToolPreset } from "../tools-constants";
import type { OutputData, EditorConfig } from "@editorjs/editorjs";
import EditorJS from "@editorjs/editorjs";

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

    it("should initialize editor with custom tools", async () => {
      const customTools = {
        customTool: {
          class: vi.fn(),
          config: { custom: true },
        },
      };

      const { result } = renderHook(() =>
        useEditor({
          id: "test-editor",
          tools: customTools,
        }),
      );

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(EditorJS).toHaveBeenCalledWith(
        expect.objectContaining({
          tools: expect.objectContaining({
            ...mockToolsConfig,
            ...customTools,
          }),
        }),
      );
    });

    it("should initialize editor with tool preset", async () => {
      const { result } = renderHook(() =>
        useEditor({
          id: "test-editor",
          toolPreset: "minimal",
        }),
      );

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(mockGetToolsConfig).toHaveBeenCalledWith(
        "minimal",
        undefined,
        undefined,
      );
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

      expect(mockGetToolsConfig).toHaveBeenCalledWith(
        undefined,
        enabledTools,
        undefined,
      );
    });

    it("should initialize editor with custom tools", async () => {
      const customTools = {
        customTool: {
          class: vi.fn(),
          config: { custom: true },
        },
      };

      const { result } = renderHook(() =>
        useEditor({
          id: "test-editor",
          customTools,
        }),
      );

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(mockGetToolsConfig).toHaveBeenCalledWith(
        undefined,
        undefined,
        customTools,
      );
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

  describe("onChange callback", () => {
    it("should call onChange when editor content changes", async () => {
      const onChange = vi.fn();
      const mockSaveData = {
        blocks: [
          { id: "1", type: "paragraph", data: { text: "Changed content" } },
        ],
      };

      const { result } = renderHook(() =>
        useEditor({
          id: "test-editor",
          onChange,
        }),
      );

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      const editorInstance = result.current.ejInstance.current;
      if (editorInstance) {
        vi.mocked(editorInstance.save).mockResolvedValue(mockSaveData);

        const editorConfig = vi.mocked(EditorJS).mock
          .calls[0][0] as EditorConfig;
        if (editorConfig?.onChange) {
          editorConfig.onChange!(editorInstance as any, {} as any);
        }
      }

      await waitFor(() => {
        expect(onChange).toHaveBeenCalledWith(mockSaveData);
      });
    });

    it("should not call onChange if not provided", async () => {
      const { result } = renderHook(() =>
        useEditor({
          id: "test-editor",
        }),
      );

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      const editorInstance = result.current.ejInstance.current;
      if (editorInstance) {
        const editorConfig = vi.mocked(EditorJS).mock
          .calls[0][0] as EditorConfig;
        if (editorConfig?.onChange) {
          expect(() =>
            editorConfig.onChange!(editorInstance as any, {} as any),
          ).not.toThrow();
        }
      }
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

      expect(mockGetToolsConfig).toHaveBeenCalledWith(
        "minimal",
        undefined,
        undefined,
      );

      rerender({ toolPreset: "full" });

      await waitFor(() => {
        expect(mockGetToolsConfig).toHaveBeenCalledWith(
          "full",
          undefined,
          undefined,
        );
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

      expect(mockGetToolsConfig).toHaveBeenCalledWith(
        undefined,
        ["paragraph"],
        undefined,
      );

      rerender({ enabledTools: ["paragraph", "list"] });

      await waitFor(() => {
        expect(mockGetToolsConfig).toHaveBeenCalledWith(
          undefined,
          ["paragraph", "list"],
          undefined,
        );
      });
    });

    it("should reload tools when customTools changes", async () => {
      const customTools1 = { tool1: { class: vi.fn() } };
      const customTools2 = {
        tool1: { class: vi.fn() },
        tool2: { class: vi.fn() },
      };

      const { result, rerender } = renderHook(
        ({ customTools }) =>
          useEditor({
            id: "test-editor",
            customTools,
          }),
        {
          initialProps: { customTools: customTools1 },
        },
      );

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(mockGetToolsConfig).toHaveBeenCalledWith(
        undefined,
        undefined,
        customTools1,
      );

      rerender({ customTools: customTools2 });

      await waitFor(() => {
        expect(mockGetToolsConfig).toHaveBeenCalledWith(
          undefined,
          undefined,
          customTools2,
        );
      });
    });
  });

  describe("error handling", () => {
    it("should handle missing DOM element gracefully", async () => {
      const element = document.getElementById("test-editor");
      if (element) {
        document.body.removeChild(element);
      }

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

    it("should handle invalid tool configurations gracefully", async () => {
      mockGetToolsConfig.mockResolvedValue({
        invalidTool: {
          class: vi.fn().mockImplementation(() => {
            throw new Error("Invalid tool class");
          }),
          config: {},
        },
      });

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

  describe("tool configuration computation", () => {
    it("should initialize editor with minimal preset tools", async () => {
      const minimalTools = {
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
        divider: {
          class: vi.fn(),
        },
      };

      mockGetToolsConfig.mockResolvedValue(minimalTools);

      const { result } = renderHook(() =>
        useEditor({
          id: "test-editor",
          toolPreset: "minimal",
        }),
      );

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(mockGetToolsConfig).toHaveBeenCalledWith(
        "minimal",
        undefined,
        undefined,
      );

      expect(EditorJS).toHaveBeenCalledWith(
        expect.objectContaining({
          tools: minimalTools,
        }),
      );
    });

    it("should initialize editor with full preset tools", async () => {
      const fullTools = {
        paragraph: { class: vi.fn(), config: { preserveBlank: false } },
        list: {
          class: vi.fn(),
          inlineToolbar: true,
          config: { defaultStyle: "unordered" },
          toolbox: { title: "List" },
        },
        table: {
          class: vi.fn(),
          inlineToolbar: true,
          config: { rows: 2, cols: 3 },
          toolbox: { title: "Table" },
        },
        divider: { class: vi.fn() },
        excalidraw: { class: vi.fn() },
        columns: { class: vi.fn() },
        imageGallery: { class: vi.fn() },
        imageSingle: { class: vi.fn() },
        figma: { class: vi.fn() },
        quote: { class: vi.fn() },
        code: { class: vi.fn() },
        videoEmbed: { class: vi.fn() },
        social: { class: vi.fn() },
        card: { class: vi.fn() },
        stats: { class: vi.fn() },
        timeline: { class: vi.fn() },
        progress: { class: vi.fn() },
        testimonials: { class: vi.fn() },
        accordion: { class: vi.fn() },
      };

      mockGetToolsConfig.mockResolvedValue(fullTools);

      const { result } = renderHook(() =>
        useEditor({
          id: "test-editor",
          toolPreset: "full",
        }),
      );

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(mockGetToolsConfig).toHaveBeenCalledWith(
        "full",
        undefined,
        undefined,
      );

      expect(EditorJS).toHaveBeenCalledWith(
        expect.objectContaining({
          tools: fullTools,
        }),
      );
    });

    it("should initialize editor with specific enabled tools", async () => {
      const enabledTools = ["paragraph", "table", "quote"];
      const specificTools = {
        paragraph: { class: vi.fn(), config: { preserveBlank: false } },
        table: {
          class: vi.fn(),
          inlineToolbar: true,
          config: { rows: 2, cols: 3 },
          toolbox: { title: "Table" },
        },
        quote: { class: vi.fn() },
      };

      mockGetToolsConfig.mockResolvedValue(specificTools);

      const { result } = renderHook(() =>
        useEditor({
          id: "test-editor",
          enabledTools,
        }),
      );

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(mockGetToolsConfig).toHaveBeenCalledWith(
        undefined,
        enabledTools,
        undefined,
      );

      expect(EditorJS).toHaveBeenCalledWith(
        expect.objectContaining({
          tools: specificTools,
        }),
      );
    });

    it("should merge custom tools with preset tools", async () => {
      const presetTools = {
        paragraph: { class: vi.fn(), config: { preserveBlank: false } },
        list: {
          class: vi.fn(),
          inlineToolbar: true,
          config: { defaultStyle: "unordered" },
          toolbox: { title: "List" },
        },
      };

      const customTools = {
        customParagraph: {
          class: vi.fn(),
          config: { custom: true },
        },
        customList: {
          class: vi.fn(),
          inlineToolbar: false,
          config: { customStyle: "ordered" },
        },
      };

      const mergedTools = {
        ...presetTools,
        ...customTools,
      };

      mockGetToolsConfig.mockResolvedValue(mergedTools);

      const { result } = renderHook(() =>
        useEditor({
          id: "test-editor",
          toolPreset: "minimal",
          customTools,
        }),
      );

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(mockGetToolsConfig).toHaveBeenCalledWith(
        "minimal",
        undefined,
        customTools,
      );

      expect(EditorJS).toHaveBeenCalledWith(
        expect.objectContaining({
          tools: mergedTools,
        }),
      );
    });

    it("should prioritize custom tools over preset tools", async () => {
      const customParagraph = {
        class: vi.fn(),
        config: { customPreserveBlank: true },
      };

      const presetTools = {
        paragraph: { class: vi.fn(), config: { preserveBlank: false } },
        list: {
          class: vi.fn(),
          inlineToolbar: true,
          config: { defaultStyle: "unordered" },
          toolbox: { title: "List" },
        },
      };

      const mergedTools = {
        paragraph: customParagraph,
        list: presetTools.list,
      };

      mockGetToolsConfig.mockResolvedValue(mergedTools);

      const { result } = renderHook(() =>
        useEditor({
          id: "test-editor",
          toolPreset: "minimal",
          customTools: { paragraph: customParagraph },
        }),
      );

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(mockGetToolsConfig).toHaveBeenCalledWith("minimal", undefined, {
        paragraph: customParagraph,
      });

      expect(EditorJS).toHaveBeenCalledWith(
        expect.objectContaining({
          tools: mergedTools,
        }),
      );

      const editorConfig = vi.mocked(EditorJS).mock.calls[0][0] as EditorConfig;
      expect(editorConfig?.tools?.paragraph).toBe(customParagraph);
    });

    it("should use default full preset when no preset or enabledTools specified", async () => {
      const defaultTools = {
        paragraph: { class: vi.fn(), config: { preserveBlank: false } },
        list: {
          class: vi.fn(),
          inlineToolbar: true,
          config: { defaultStyle: "unordered" },
          toolbox: { title: "List" },
        },
        table: {
          class: vi.fn(),
          inlineToolbar: true,
          config: { rows: 2, cols: 3 },
          toolbox: { title: "Table" },
        },
        divider: { class: vi.fn() },
        excalidraw: { class: vi.fn() },
        columns: { class: vi.fn() },
        imageGallery: { class: vi.fn() },
        imageSingle: { class: vi.fn() },
        figma: { class: vi.fn() },
        quote: { class: vi.fn() },
        code: { class: vi.fn() },
        videoEmbed: { class: vi.fn() },
        social: { class: vi.fn() },
        card: { class: vi.fn() },
        stats: { class: vi.fn() },
        timeline: { class: vi.fn() },
        progress: { class: vi.fn() },
        testimonials: { class: vi.fn() },
        accordion: { class: vi.fn() },
      };

      mockGetToolsConfig.mockResolvedValue(defaultTools);

      const { result } = renderHook(() =>
        useEditor({
          id: "test-editor",
        }),
      );

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(mockGetToolsConfig).toHaveBeenCalledWith(
        undefined,
        undefined,
        undefined,
      );

      expect(EditorJS).toHaveBeenCalledWith(
        expect.objectContaining({
          tools: defaultTools,
        }),
      );
    });

    it("should merge additional tools with computed tools", async () => {
      const computedTools = {
        paragraph: { class: vi.fn(), config: { preserveBlank: false } },
        list: {
          class: vi.fn(),
          inlineToolbar: true,
          config: { defaultStyle: "unordered" },
          toolbox: { title: "List" },
        },
      };

      const additionalTools = {
        customTool: {
          class: vi.fn(),
          config: { additional: true },
        },
      };

      const finalTools = {
        ...computedTools,
        ...additionalTools,
      };

      mockGetToolsConfig.mockResolvedValue(computedTools);

      const { result } = renderHook(() =>
        useEditor({
          id: "test-editor",
          toolPreset: "minimal",
          tools: additionalTools,
        }),
      );

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(EditorJS).toHaveBeenCalledWith(
        expect.objectContaining({
          tools: finalTools,
        }),
      );
    });
  });

  describe("EditorJS initialization configuration", () => {
    it("should initialize EditorJS with correct default configuration", async () => {
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
          onReady: expect.any(Function),
          onChange: expect.any(Function),
          data: undefined,
          tools: expect.any(Object),
        }),
      );
    });

    it("should initialize EditorJS with initial data", async () => {
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

    it("should call onReady callback when editor is ready", async () => {
      const { result } = renderHook(() =>
        useEditor({
          id: "test-editor",
        }),
      );

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      const editorConfig = vi.mocked(EditorJS).mock.calls[0][0] as EditorConfig;

      if (editorConfig?.onReady) {
        editorConfig.onReady();
      }

      expect(result.current.ejInstance.current).toBeTruthy();
    });

    it("should merge tools from getToolsConfig with additional tools prop", async () => {
      const computedTools = {
        paragraph: { class: vi.fn(), config: { preserveBlank: false } },
        list: {
          class: vi.fn(),
          inlineToolbar: true,
          config: { defaultStyle: "unordered" },
          toolbox: { title: "List" },
        },
      };

      const additionalTools = {
        customTool: {
          class: vi.fn(),
          config: { additional: true },
        },
      };

      mockGetToolsConfig.mockResolvedValue(computedTools);

      const { result } = renderHook(() =>
        useEditor({
          id: "test-editor",
          toolPreset: "minimal",
          tools: additionalTools,
        }),
      );

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      const expectedTools = {
        ...computedTools,
        ...additionalTools,
      };

      expect(EditorJS).toHaveBeenCalledWith(
        expect.objectContaining({
          tools: expectedTools,
        }),
      );
    });

    it("should prioritize tools prop over computed tools", async () => {
      const computedTools = {
        paragraph: { class: vi.fn(), config: { preserveBlank: false } },
        list: {
          class: vi.fn(),
          inlineToolbar: true,
          config: { defaultStyle: "unordered" },
          toolbox: { title: "List" },
        },
      };

      const overrideTools = {
        paragraph: {
          class: vi.fn(),
          config: { preserveBlank: true },
        },
      };

      mockGetToolsConfig.mockResolvedValue(computedTools);

      const { result } = renderHook(() =>
        useEditor({
          id: "test-editor",
          toolPreset: "minimal",
          tools: overrideTools,
        }),
      );

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      const expectedTools = {
        ...computedTools,
        ...overrideTools,
      };

      expect(EditorJS).toHaveBeenCalledWith(
        expect.objectContaining({
          tools: expectedTools,
        }),
      );

      const editorConfig = vi.mocked(EditorJS).mock.calls[0][0] as EditorConfig;
      expect(editorConfig?.tools?.paragraph).toBe(overrideTools.paragraph);
    });
  });
});
