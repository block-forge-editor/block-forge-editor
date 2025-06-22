import { describe, it, expect, vi, beforeEach } from "vitest";
import { BlockForgeImage, TImageData } from "..";

describe("Image", () => {
  let image: BlockForgeImage;

  const mockApi = {
    i18n: {
      t: vi.fn((text) => text),
    },
    styles: {
      block: "cdx-block",
    },
  };

  const mockBlock = {
    id: "test-image-id",
  };

  const mockInitialData: TImageData = {
    id: "test-image-id",
    url: "test-url",
    alt: "test-alt",
    caption: "test-caption",
  };

  const createImage = (options: any) =>
    new BlockForgeImage({
      ...options,
      api: mockApi,
      block: mockBlock,
    });

  beforeEach(() => {
    image = createImage({
      data: mockInitialData,
      config: {},
      api: mockApi,
    });
  });

  describe("constructor", () => {
    it("should initialize with default values", () => {
      const emptyImage = createImage({
        data: {},
        config: {},
        api: mockApi,
      });

      expect(emptyImage["_id"]).toBeDefined();
      expect(emptyImage["_url"]).toBe("");
      expect(emptyImage["_caption"]).toBe("");
      expect(emptyImage["_alt"]).toBe("");
    });

    it("should initialize with provided values", () => {
      const image = createImage({
        data: mockInitialData,
      });

      expect(image["_id"]).toBe(mockInitialData.id);
      expect(image["_url"]).toBe(mockInitialData.url);
      expect(image["_caption"]).toBe(mockInitialData.caption);
      expect(image["_alt"]).toBe(mockInitialData.alt);
    });
  });

  describe("update with base64 URL data", () => {
    it("should update with provided data", () => {
      (image as any)._updateData(mockInitialData);

      expect(image["_url"]).toBe(mockInitialData.url);
      expect(image["_alt"]).toBe(mockInitialData.alt);
      expect(image["_caption"]).toBe(mockInitialData.caption);
    });
  });

  describe("render", () => {
    it("should create a div element with correct tag", () => {
      const element = image.render();
      expect(element.tagName).toBe("DIV");
    });
  });

  describe("save", () => {
    it("should return the correct data", () => {
      const data = image.save();
      expect(data).toEqual(mockInitialData);
    });
  });

  describe("destroy", () => {
    it("should destroy the image", () => {
      image.destroy();
      expect(image["_root"]).toBeNull();
    });
  });
});
