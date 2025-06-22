import { describe, it, expect, vi, beforeEach } from "vitest";
import { BlockForgeSocial } from "../index";
import { TSocialData } from "../types";

describe("Social", () => {
  let social: BlockForgeSocial;

  const mockApi = {
    i18n: {
      t: vi.fn((text) => text),
    },
    styles: {
      block: "cdx-block",
    },
  };

  const mockBlock = {
    id: "test-social-id",
  };

  const mockInitialData: TSocialData = {
    links: [],
  };

  const createSocial = (options: any) =>
    new BlockForgeSocial({
      ...options,
      api: mockApi,
      block: mockBlock,
    });

  beforeEach(() => {
    social = createSocial({
      data: mockInitialData,
      config: {},
      api: mockApi,
    });
  });

  describe("constructor", () => {
    it("should initialize with default values", () => {
      const emptySocial = createSocial({
        data: {},
        config: {},
        api: mockApi,
      });

      expect(emptySocial["_links"]).toEqual([]);
    });

    it("should initialize with provided values", () => {
      const customData: TSocialData = {
        links: [
          {
            url: "https://twitter.com/username",
            platform: "twitter",
          },
          {
            url: "https://linkedin.com/in/username",
            platform: "linkedin",
          },
        ],
      };

      const customSocial = createSocial({
        data: customData,
        config: {},
        api: mockApi,
      });

      expect(customSocial["_links"]).toEqual(customData.links);
    });
  });

  describe("updateData", () => {
    it("should update the links data", () => {
      const newLinks = [
        {
          url: "https://github.com/username",
          platform: "github",
        },
      ];

      const rerenderSpy = vi.spyOn(social as any, "_rerender");

      social["_updateData"](newLinks);

      expect(social["_links"]).toEqual(newLinks);
      expect(rerenderSpy).not.toHaveBeenCalled();
    });
  });

  describe("updateDataWithRerender", () => {
    it("should update the links data and trigger rerender", () => {
      const newLinks = [
        {
          url: "https://instagram.com/username",
          platform: "instagram",
        },
      ];

      const rerenderSpy = vi.spyOn(social as any, "_rerender");

      social["_updateDataWithRerender"](newLinks);

      expect(social["_links"]).toEqual(newLinks);
      expect(rerenderSpy).toHaveBeenCalled();
    });
  });

  describe("save", () => {
    it("should return current data", () => {
      const savedData = social.save();
      expect(savedData).toEqual(mockInitialData);
    });
  });

  describe("destroy", () => {
    it("should unmount the component", () => {
      social.destroy();
      expect(social["_root"]).toBeNull();
    });
  });
});
