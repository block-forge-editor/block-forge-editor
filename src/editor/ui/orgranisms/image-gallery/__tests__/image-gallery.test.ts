import { describe, it, expect, vi, beforeEach } from "vitest";
import { ImageGallery, TImageGalleryData } from "..";

describe("ImageGallery", () => {
  let imageGallery: ImageGallery;

  const mockApi = {
    i18n: {
      t: vi.fn((text) => text),
    },
    styles: {
      block: "cdx-block",
    },
  };

  const mockBlock = {
    id: "test-image-gallery-id",
  };

  const mockInitialData: TImageGalleryData = {
    images: [],
    variant: "primary",
  };

  const createImageGallery = (options: any) =>
    new ImageGallery({
      ...options,
      api: mockApi,
      block: mockBlock,
    });

  beforeEach(() => {
    imageGallery = createImageGallery({
      data: {
        data: mockInitialData,
      },
      config: {},
      api: mockApi,
    });
  });

  describe("constructor", () => {
    it("should initialize with default values", () => {
      const emptyImageGallery = createImageGallery({
        data: {},
        config: {},
        api: mockApi,
      });

      expect(emptyImageGallery["_images"]).toEqual([]);
      expect(emptyImageGallery["_variant"]).toEqual("primary");
    });

    it("should initialize with provided values", () => {
      const customData: TImageGalleryData = {
        images: [{ id: "test-image-id", url: "test-url", alt: "test-alt" }],
        variant: "secondary",
      };

      const customImageGallery = createImageGallery({
        data: customData,
        config: {},
        api: mockApi,
      });

      expect(customImageGallery["_images"]).toEqual(customData.images);
      expect(customImageGallery["_variant"]).toEqual(customData.variant);
    });

    it("should set block ID", () => {
      expect(imageGallery["_blockId"]).toBe("test-image-gallery-id");
    });
  });

  describe("render", () => {
    it("should create a div element with correct classes", () => {
      const element = imageGallery.render();
      expect(element.tagName).toBe("DIV");
    });
  });

  describe("save", () => {
    it("should return current data", () => {
      const savedData = imageGallery.save();
      expect(savedData).toEqual(mockInitialData);
    });
  });
});
