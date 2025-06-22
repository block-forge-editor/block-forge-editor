import { describe, it, expect, vi, beforeEach } from "vitest";
import { BlockForgeStats } from "../index";
import { TStatsData } from "../types";

describe("Stats", () => {
  let stats: BlockForgeStats;

  const mockApi = {
    i18n: {
      t: vi.fn((text) => text),
    },
    styles: {
      block: "cdx-block",
    },
  };

  const mockBlock = {
    id: "test-stats-id",
  };

  const mockInitialData: TStatsData = {
    items: [],
  };

  const createStats = (options: any) =>
    new BlockForgeStats({
      ...options,
      api: mockApi,
      block: mockBlock,
    });

  beforeEach(() => {
    stats = createStats({
      data: mockInitialData,
      config: {},
      api: mockApi,
    });
  });

  describe("constructor", () => {
    it("should initialize with default values", () => {
      const emptyStats = createStats({
        data: {},
        config: {},
        api: mockApi,
      });

      expect(emptyStats["_items"]).toEqual([]);
    });

    it("should initialize with provided values", () => {
      const customData: TStatsData = {
        items: [
          {
            value: "1,234",
            label: "Total Users",
            icon: "Users",
          },
          {
            value: "567",
            label: "Active Projects",
            icon: "Folder",
          },
        ],
      };

      const customStats = createStats({
        data: customData,
        config: {},
        api: mockApi,
      });

      expect(customStats["_items"]).toEqual(customData.items);
    });

    it("should handle items without icons", () => {
      const dataWithoutIcons: TStatsData = {
        items: [
          {
            value: "100",
            label: "Downloads",
          },
        ],
      };

      const statsWithoutIcons = createStats({
        data: dataWithoutIcons,
        config: {},
        api: mockApi,
      });

      expect(statsWithoutIcons["_items"]).toEqual(dataWithoutIcons.items);
    });
  });

  describe("save", () => {
    it("should return current data", () => {
      const savedData = stats.save();
      expect(savedData).toEqual(mockInitialData);
    });
  });

  describe("destroy", () => {
    it("should unmount the component", () => {
      stats.destroy();
      expect(stats["_root"]).toBeNull();
    });
  });
});
