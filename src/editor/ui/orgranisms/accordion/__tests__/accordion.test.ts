import { describe, it, expect, vi, beforeEach } from "vitest";
import { BlockForgeAccordion } from "../index";

describe("Accordion", () => {
  let accordion: BlockForgeAccordion;

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
    id: "test-accordion-id",
  };

  const mockInitialData = {
    item: {
      title: "Section",
      content: {
        blocks: [],
        time: 0,
      },
    },
  };

  const createAccordion = (options: any) =>
    new BlockForgeAccordion({
      ...options,
      api: mockApi,
      block: mockBlock,
    });

  beforeEach(() => {
    accordion = createAccordion({
      data: mockInitialData,
      config: {},
      api: mockApi,
    });
  });

  describe("constructor", () => {
    it("should initialize with default values", () => {
      const emptyAccordion = createAccordion({
        data: {},
        config: {},
        api: mockApi,
      });

      expect(emptyAccordion["_item"]).toEqual({
        title: "Section",
        content: {
          blocks: [],
          time: 0,
        },
      });
      expect(emptyAccordion["_blockID"]).toEqual("test-accordion-id");
    });

    it("should initialize with provided values", () => {
      const customData = {
        item: {
          title: "Custom Section",
          content: {
            blocks: [
              {
                type: "paragraph",
                data: {
                  text: "Sample content",
                },
              },
            ],
            time: 1234567890,
          },
        },
      };

      const customAccordion = createAccordion({
        data: customData,
        config: {},
        api: mockApi,
      });

      expect(customAccordion["_item"]).toEqual(customData.item);
      expect(customAccordion["_blockID"]).toEqual("test-accordion-id");
    });
  });

  describe("updateContent", () => {
    it("should update the content", () => {
      const newContent = {
        blocks: [
          {
            type: "paragraph",
            data: {
              text: "Updated content",
            },
          },
        ],
        time: 9876543210,
      };

      accordion["_updateContent"](newContent);

      expect(accordion["_item"].content).toEqual(newContent);
    });
  });

  describe("updateTitle", () => {
    it("should update the title", () => {
      const newTitle = "Updated Section Title";

      accordion["_updateTitle"](newTitle);

      expect(accordion["_item"].title).toEqual(newTitle);
    });

    it("should handle empty title", () => {
      accordion["_updateTitle"]();

      expect(accordion["_item"].title).toEqual("");
    });
  });

  describe("save", () => {
    it("should return current data", () => {
      const savedData = accordion.save();
      expect(savedData).toEqual(mockInitialData);
    });
  });

  describe("destroy", () => {
    it("should unmount the component", () => {
      accordion.destroy();
      expect(accordion["_root"]).toBeNull();
    });
  });
});
