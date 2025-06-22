import { describe, it, expect, vi, beforeEach } from "vitest";
import { BlockForgeProgress } from "../index";
import { TProgressData } from "../types";

describe("Progress", () => {
  let progress: BlockForgeProgress;

  const mockApi = {
    i18n: {
      t: vi.fn((text) => text),
    },
    styles: {
      block: "cdx-block",
    },
  };

  const mockBlock = {
    id: "test-progress-id",
  };

  const mockInitialData: TProgressData = {
    items: [],
  };

  const createProgress = (options: any) =>
    new BlockForgeProgress({
      ...options,
      api: mockApi,
      block: mockBlock,
    });

  beforeEach(() => {
    progress = createProgress({
      data: mockInitialData,
      config: {},
      api: mockApi,
    });
  });

  describe("constructor", () => {
    it("should initialize with default values", () => {
      const emptyProgress = createProgress({
        data: {},
        config: {},
        api: mockApi,
      });

      expect(emptyProgress["_items"]).toEqual([]);
    });

    it("should initialize with provided values", () => {
      const customData: TProgressData = {
        items: [
          {
            label: "Task Completion",
            value: 75,
          },
          {
            label: "Project Progress",
            value: 45,
          },
        ],
      };

      const customProgress = createProgress({
        data: customData,
        config: {},
        api: mockApi,
      });

      expect(customProgress["_items"]).toEqual(customData.items);
    });
  });

  describe("updateData", () => {
    it("should update the items data", () => {
      const newItems = [
        {
          label: "Development",
          value: 80,
        },
      ];

      const rerenderSpy = vi.spyOn(progress as any, "_rerender");

      progress["_updateData"](newItems);

      expect(progress["_items"]).toEqual(newItems);
      expect(rerenderSpy).not.toHaveBeenCalled();
    });
  });

  describe("updateDataWithRerender", () => {
    it("should update the items data and trigger rerender", () => {
      const newItems = [
        {
          label: "Testing",
          value: 60,
        },
      ];

      const rerenderSpy = vi.spyOn(progress as any, "_rerender");

      progress["_updateDataWithRerender"](newItems);

      expect(progress["_items"]).toEqual(newItems);
      expect(rerenderSpy).toHaveBeenCalled();
    });
  });

  describe("save", () => {
    it("should return current data", () => {
      const savedData = progress.save();
      expect(savedData).toEqual(mockInitialData);
    });
  });

  describe("destroy", () => {
    it("should unmount the component", () => {
      progress.destroy();
      expect(progress["_root"]).toBeNull();
    });
  });
});
