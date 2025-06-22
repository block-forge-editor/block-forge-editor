import { describe, it, expect, vi, beforeEach } from "vitest";
import { BlockForgeVideoEmbed, TEmbedData } from "../index";

describe("Video Embed", () => {
  let videoEmbed: BlockForgeVideoEmbed;

  const mockApi = {
    i18n: {
      t: vi.fn((text) => text),
    },
    styles: {
      block: "cdx-block",
    },
  };

  const mockBlock = {
    id: "test-video-embed-id",
  };

  const mockInitialData: TEmbedData = {
    url: "",
    platform: "youtube",
  };

  const createVideoEmbed = (options: any) =>
    new BlockForgeVideoEmbed({
      ...options,
      api: mockApi,
      block: mockBlock,
    });

  beforeEach(() => {
    videoEmbed = createVideoEmbed({
      data: mockInitialData,
      config: {},
      api: mockApi,
    });
  });

  describe("constructor", () => {
    it("should initialize with default values", () => {
      const emptyVideoEmbed = createVideoEmbed({
        data: {},
        config: {},
        api: mockApi,
      });

      expect(emptyVideoEmbed["_url"]).toEqual("");
      expect(emptyVideoEmbed["_platform"]).toEqual("youtube");
    });

    it("should initialize with provided values", () => {
      const customData: TEmbedData = {
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        platform: "youtube",
      };

      const customVideoEmbed = createVideoEmbed({
        data: customData,
        config: {},
        api: mockApi,
      });

      expect(customVideoEmbed["_url"]).toEqual(customData.url);
      expect(customVideoEmbed["_platform"]).toEqual(customData.platform);
    });

    it("should handle different platform types", () => {
      const vimeoData: TEmbedData = {
        url: "https://vimeo.com/123456789",
        platform: "vimeo",
      };

      const vimeoVideoEmbed = createVideoEmbed({
        data: vimeoData,
        config: {},
        api: mockApi,
      });

      expect(vimeoVideoEmbed["_platform"]).toEqual("vimeo");
    });
  });

  describe("updateData", () => {
    it("should update the data", () => {
      videoEmbed["_updateData"]({
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        platform: "youtube",
      });

      expect(videoEmbed["_url"]).toEqual(
        "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      );
      expect(videoEmbed["_platform"]).toEqual("youtube");
    });
  });

  describe("save", () => {
    it("should return current data", () => {
      const savedData = videoEmbed.save();
      expect(savedData).toEqual(mockInitialData);
    });
  });

  describe("destroy", () => {
    it("should unmount the component", () => {
      videoEmbed.destroy();
      expect(videoEmbed["_root"]).toBeNull();
    });
  });
});
