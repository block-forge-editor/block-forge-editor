import { describe, it, expect, beforeEach, vi } from "vitest";
import { BlockForgeParagraph } from "../index";

describe("BlockForgeParagraph", () => {
  let paragraph: BlockForgeParagraph;

  const mockApi = {
    i18n: {
      t: vi.fn((text) => text),
    },
    styles: {
      block: "cdx-block",
    },
  };

  const createParagraph = (options: any) =>
    new BlockForgeParagraph({
      ...options,
      api: mockApi,
      block: document.createElement("div"),
    });

  beforeEach(() => {
    paragraph = createParagraph({
      data: {
        text: "Test text",
        fontSize: 16,
        tag: "p",
      },
      config: {
        preserveBlank: true,
      },
      api: mockApi,
      readOnly: false,
    });
  });

  describe("constructor", () => {
    it("should initialize with default values", () => {
      const emptyParagraph = createParagraph({
        data: {},
        config: {},
        api: mockApi,
        readOnly: false,
      });

      expect(emptyParagraph["_data"]).toEqual({
        text: "",
        fontSize: 16,
        tag: "p",
      });
    });

    it("should initialize with provided values", () => {
      expect(paragraph["_data"]).toEqual({
        text: "Test text",
        fontSize: 16,
        tag: "p",
      });
    });
  });

  describe("render", () => {
    it("should create a div element with correct classes", () => {
      const element = paragraph.render();
      expect(element.tagName).toBe("DIV");
    });

    it("should set contentEditable based on readOnly", () => {
      const element = paragraph.render();
      expect(element.contentEditable).toBe("true");

      const readOnlyParagraph = createParagraph({
        data: {},
        config: {},
        api: mockApi,
        readOnly: true,
      });
      const readOnlyElement = readOnlyParagraph.render();
      expect(readOnlyElement.contentEditable).toBe("false");
    });

    it("should set font size if provided", () => {
      const element = paragraph.render();
      expect(element.style.fontSize).toBe("16px");
    });
  });

  describe("save", () => {
    it("should return correct data structure", () => {
      const savedData = paragraph.save();
      expect(savedData).toEqual({
        text: "Test text",
        fontSize: 16,
        tag: "p",
      });
    });
  });

  describe("validate", () => {
    it("should return true for non-empty text", () => {
      const isValid = paragraph.validate({
        text: "Test text",
        fontSize: 16,
        tag: "p",
      });
      expect(isValid).toBe(true);
    });

    it("should return false for empty text when preserveBlank is false", () => {
      const emptyParagraph = createParagraph({
        data: {},
        api: mockApi,
        config: { preserveBlank: false },
        readOnly: false,
      });

      const isValid = emptyParagraph.validate({
        text: "",
        fontSize: 16,
        tag: "p",
      });
      expect(isValid).toBe(false);
    });
  });

  describe("renderSettings", () => {
    it("should return array of settings", () => {
      const settings = paragraph.renderSettings();
      expect(Array.isArray(settings)).toBe(true);
      expect(settings.length).toBe(3);
    });

    it("should include font size input", () => {
      const settings = paragraph.renderSettings();
      const fontSizeSetting = settings[0];
      expect(fontSizeSetting.label).toBe("Font size");
      const item = fontSizeSetting.children?.items[0];
      expect(item).toBeDefined();
      expect("type" in item! && item!.type).toBe("html");
    });

    it("should include tag menu", () => {
      const settings = paragraph.renderSettings();
      const tagMenu = settings[2];
      expect(tagMenu.label).toBe("Tag");
      expect(tagMenu.children?.items.length).toBe(7);
    });
  });
});
