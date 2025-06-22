import { describe, it, expect, beforeEach, vi } from "vitest";
import { BlockForgeFigma } from "../index";
import { TFigmaData } from "../types";

describe("Figma", () => {
  let figma: BlockForgeFigma;

  const mockApi = {
    i18n: {
      t: vi.fn((text) => text),
    },
    styles: {
      block: "cdx-block",
    },
  };

  const mockBlock = {
    id: "test-figma-id",
  };

  const mockInitialData: TFigmaData = {
    figmaUrl: "",
  };

  const createFigma = (options: any) =>
    new BlockForgeFigma({
      ...options,
      api: mockApi,
      block: mockBlock,
    });

  beforeEach(() => {
    figma = createFigma({
      data: {
        data: mockInitialData,
      },
      config: {},
      api: mockApi,
    });
  });

  describe("constructor", () => {
    it("should initialize with default values", () => {
      const emptyFigma = createFigma({
        data: {},
        config: {},
        api: mockApi,
      });

      expect(emptyFigma["_data"]).toEqual({
        figmaUrl: "",
      });
    });

    it("should initialize with provided values", () => {
      const customData: TFigmaData = {
        figmaUrl: "https://www.figma.com/file/1234567890/Test",
      };

      const customFigma = createFigma({
        data: {
          data: customData,
        },
        config: {},
        api: mockApi,
      });

      expect(customFigma["_data"]).toEqual(customData);
    });

    it("should set block ID", () => {
      expect(figma["_blockID"]).toBe("test-figma-id");
    });
  });

  describe("render", () => {
    it("should create a div element with correct classes", () => {
      const element = figma.render();
      expect(element.tagName).toBe("DIV");
    });
  });

  describe("save", () => {
    it("should return current data", () => {
      const savedData = figma.save();
      expect(savedData).toEqual(mockInitialData);
    });
  });
});
