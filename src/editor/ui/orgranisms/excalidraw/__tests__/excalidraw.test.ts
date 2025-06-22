import { describe, it, expect, beforeEach, vi } from "vitest";
import { BlockForgeExcalidraw } from "../index";
import { TExcalidrawData } from "../types";

global.fetch = vi.fn();

describe("BlockForgeExcalidraw", () => {
  let excalidraw: BlockForgeExcalidraw;

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
    sceneId: "test-scene-id",
    title: "Test Drawing",
    description: "Test description",
    imageUrl: "https://example.com/preview.png",
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

    // Сбрасываем моки
    vi.clearAllMocks();
  });

  describe("constructor", () => {
    it("should initialize with default values", () => {
      const emptyExcalidraw = createExcalidraw({
        data: {},
        config: {},
        api: mockApi,
      });

      expect(emptyExcalidraw["_data"]).toEqual({
        sceneId: undefined,
        title: undefined,
        description: undefined,
        imageUrl: undefined,
      });
    });

    it("should initialize with provided values", () => {
      const customData: TExcalidrawData = {
        sceneId: "custom-scene-id",
        title: "Custom Drawing",
        description: "Custom description",
        imageUrl: "https://example.com/custom.png",
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
      expect(element.className).toContain("bf-flex");
      expect(element.className).toContain("bf-flex-col");
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
        sceneId: "updated-scene-id",
        title: "Updated Drawing",
        description: "Updated description",
        imageUrl: "https://example.com/updated.png",
      };

      (excalidraw as any)._updateContent(newData);

      expect((excalidraw as any)._data).toEqual(newData);
      expect(saveSpy).toHaveBeenCalled();
    });
  });

  describe("_generatePreview", () => {
    it("should generate preview when sceneId exists", async () => {
      const mockBlob = new Blob(["test"], { type: "image/png" });
      const mockResponse = {
        ok: true,
        blob: vi.fn().mockResolvedValue(mockBlob),
      };

      (global.fetch as any).mockResolvedValue(mockResponse);

      // Мокаем URL.createObjectURL
      const mockUrl = "blob:test-url";
      vi.spyOn(URL, "createObjectURL").mockReturnValue(mockUrl);

      await (excalidraw as any)._generatePreview();

      expect(global.fetch).toHaveBeenCalledWith(
        "https://excalidraw.com/api/v2/scenes/test-scene-id/preview",
      );
      expect((excalidraw as any)._data.imageUrl).toBe(mockUrl);
    });

    it("should handle preview generation error", async () => {
      (global.fetch as any).mockRejectedValue(new Error("API Error"));

      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      await (excalidraw as any)._generatePreview();

      expect(consoleSpy).toHaveBeenCalledWith(
        "Failed to generate preview:",
        expect.any(Error),
      );
    });

    it("should not generate preview when sceneId is undefined", async () => {
      (excalidraw as any)._data.sceneId = undefined;

      await (excalidraw as any)._generatePreview();

      expect(global.fetch).not.toHaveBeenCalled();
    });
  });

  describe("toolbox", () => {
    it("should return correct toolbox configuration", () => {
      const toolbox = BlockForgeExcalidraw.toolbox;
      expect(toolbox.title).toBe("Excalidraw");
      expect(toolbox.icon).toBeDefined();
    });
  });
});
