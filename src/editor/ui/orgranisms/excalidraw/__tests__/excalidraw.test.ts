import { describe, it, expect, beforeEach, vi } from "vitest";
import { BlockForgeExcalidraw } from "../index";
import { TExcalidrawData } from "../types";

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
  id: "test-block-id",
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

describe("BlockForgeExcalidraw", () => {
  let excalidraw: BlockForgeExcalidraw;

  beforeEach(() => {
    excalidraw = createExcalidraw({
      data: {
        data: mockInitialData,
      },
      config: {},
      api: mockApi,
      readOnly: false,
    });
  });

  describe("constructor", () => {
    it("should initialize with default values", () => {
      const emptyExcalidraw = createExcalidraw({
        data: {},
        config: {},
        api: mockApi,
        readOnly: false,
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
        readOnly: false,
      });

      expect(customExcalidraw["_data"]).toEqual(customData);
    });

    it("should set block ID", () => {
      expect(excalidraw["_blockID"]).toBe("test-block-id");
    });
  });

  describe("render", () => {
    it("should create a div element with correct classes", () => {
      const element = excalidraw.render();
      expect(element.tagName).toBe("DIV");
      expect(element.className).toBe("bf-flex bf-flex-col bf-gap-4");
    });
  });

  describe("save", () => {
    it("should return current data", () => {
      const savedData = excalidraw.save();
      expect(savedData).toEqual(mockInitialData);
    });

    it("should return updated data after changes", () => {
      const updatedData: TExcalidrawData = {
        elements: [{ id: "new-element" } as any],
        appState: { viewBackgroundColor: "#000000" } as any,
        files: {},
      };

      (excalidraw as any)._data = updatedData;
      const savedData = excalidraw.save();
      expect(savedData).toEqual(updatedData);
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

  describe("destroy", () => {
    it("should unmount root when destroy is called", () => {
      const mockRoot = {
        unmount: vi.fn(),
      };
      (excalidraw as any)._root = mockRoot;

      excalidraw.destroy();

      expect(mockRoot.unmount).toHaveBeenCalled();
    });
  });
});
