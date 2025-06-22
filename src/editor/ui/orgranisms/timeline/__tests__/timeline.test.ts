import { describe, it, expect, vi, beforeEach } from "vitest";
import { BlockForgeTimeline } from "../index";
import { TTimelineData } from "../types";

describe("Timeline", () => {
  let timeline: BlockForgeTimeline;

  const mockApi = {
    i18n: {
      t: vi.fn((text) => text),
    },
    styles: {
      block: "cdx-block",
    },
  };

  const mockBlock = {
    id: "test-timeline-id",
  };

  const mockInitialData: TTimelineData = {
    events: [],
  };

  const createTimeline = (options: any) =>
    new BlockForgeTimeline({
      ...options,
      api: mockApi,
      block: mockBlock,
    });

  beforeEach(() => {
    timeline = createTimeline({
      data: mockInitialData,
      config: {},
      api: mockApi,
    });
  });

  describe("constructor", () => {
    it("should initialize with default values", () => {
      const emptyTimeline = createTimeline({
        data: {},
        config: {},
        api: mockApi,
      });

      expect(emptyTimeline["_events"]).toEqual([]);
    });

    it("should initialize with provided values", () => {
      const customData: TTimelineData = {
        events: [
          {
            date: "2023-01-15",
            title: "Project Launch",
            description: "Successfully launched the new product",
          },
          {
            date: "2023-03-20",
            title: "Major Update",
            description: "Released version 2.0 with new features",
          },
        ],
      };

      const customTimeline = createTimeline({
        data: customData,
        config: {},
        api: mockApi,
      });

      expect(customTimeline["_events"]).toEqual(customData.events);
    });
  });

  describe("updateData", () => {
    it("should update the events data", () => {
      const newEvents = [
        {
          date: "2023-06-10",
          title: "Team Meeting",
          description: "Quarterly planning session",
        },
      ];

      const rerenderSpy = vi.spyOn(timeline as any, "_rerender");

      timeline["_updateData"](newEvents);

      expect(timeline["_events"]).toEqual(newEvents);
      expect(rerenderSpy).not.toHaveBeenCalled();
    });
  });

  describe("updateDataWithRerender", () => {
    it("should update the events data and trigger rerender", () => {
      const newEvents = [
        {
          date: "2023-09-15",
          title: "Conference",
          description: "Annual tech conference presentation",
        },
      ];

      const rerenderSpy = vi.spyOn(timeline as any, "_rerender");

      timeline["_updateDataWithRerender"](newEvents);

      expect(timeline["_events"]).toEqual(newEvents);
      expect(rerenderSpy).toHaveBeenCalled();
    });
  });

  describe("save", () => {
    it("should return current data", () => {
      const savedData = timeline.save();
      expect(savedData).toEqual(mockInitialData);
    });
  });

  describe("destroy", () => {
    it("should unmount the component", () => {
      timeline.destroy();
      expect(timeline["_root"]).toBeNull();
    });
  });
});
