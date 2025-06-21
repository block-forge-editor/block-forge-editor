import { describe, it, expect, beforeEach, vi } from "vitest";
import { BlockForgeExcalidraw } from "../index";
import { TExcalidrawData } from "../types";

describe("BlockForgeExcalidraw", () => {
  let excalidraw: BlockForgeExcalidraw;

  // TODO: problem with render
  vi.mock("@excalidraw/excalidraw", () => ({
    exportToSvg: vi.fn().mockResolvedValue({
      outerHTML: "<svg>test</svg>",
    }),
  }));

  const mockApi = {
    i18n: {
      t: vi.fn((text) => text),
    },
    styles: {
      block: "cdx-block",
    },
  };

  const mockBlock = {
    id: "test-excalidraw-id",
  };

  const mockInitialData: TExcalidrawData = {
    elements: [],
    appState: {} as any,
    files: {},
  };

  const createExcalidraw = (options: any) =>
    new BlockForgeExcalidraw({
      ...options,
      api: mockApi,
      block: mockBlock,
    });

  beforeEach(() => {
    excalidraw = createExcalidraw({
      data: {
        data: mockInitialData,
      },
      config: {},
      api: mockApi,
    });
  });

  describe("constructor", () => {
    it("should initialize with default values", () => {
      const emptyExcalidraw = createExcalidraw({
        data: {},
        config: {},
        api: mockApi,
      });

      expect(emptyExcalidraw["_data"]).toEqual({
        elements: [],
        appState: {},
        files: {},
      });
    });

    it("should initialize with provided values", () => {
      const customData: TExcalidrawData = {
        elements: [{ id: "test-element" } as any],
        appState: { viewBackgroundColor: "#ffffff" } as any,
        files: { test: "file" },
      };

      const customExcalidraw = createExcalidraw({
        data: {
          data: customData,
        },
        config: {},
        api: mockApi,
      });

      expect(customExcalidraw["_data"]).toEqual(customData);
    });

    it("should set block ID", () => {
      expect(excalidraw["_blockID"]).toBe("test-excalidraw-id");
    });
  });

  describe("render", () => {
    it("should create a div element with correct classes", () => {
      const element = excalidraw.render();
      expect(element.tagName).toBe("DIV");
    });
  });

  describe("save", () => {
    it("should return current data", () => {
      const savedData = excalidraw.save();
      expect(savedData).toEqual(mockInitialData);
    });
  });

  describe("_updateContent", () => {
    it("should update data and call save", () => {
      const saveSpy = vi.spyOn(excalidraw, "save");
      const newData: TExcalidrawData = {
        elements: [{ id: "updated-element" } as any],
        appState: {} as any,
        files: {},
      };

      (excalidraw as any)._updateContent(newData);

      expect((excalidraw as any)._data).toEqual(newData);
      expect(saveSpy).toHaveBeenCalled();
    });
  });
});
