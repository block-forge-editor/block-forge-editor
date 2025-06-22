import { describe, it, expect, vi, beforeEach } from "vitest";
import { BlockForgeQuote, TQuoteData } from "../index";

describe("Quote", () => {
  let quote: BlockForgeQuote;

  const mockApi = {
    i18n: {
      t: vi.fn((text) => text),
    },
    styles: {
      block: "cdx-block",
    },
  };

  const mockBlock = {
    id: "test-quote-id",
  };

  const mockInitialData: TQuoteData = {
    text: "",
    author: "",
    source: "",
  };

  const createQuote = (options: any) =>
    new BlockForgeQuote({
      ...options,
      api: mockApi,
      block: mockBlock,
    });

  beforeEach(() => {
    quote = createQuote({
      data: mockInitialData,
      config: {},
      api: mockApi,
    });
  });

  describe("constructor", () => {
    it("should initialize with default values", () => {
      const emptyQuote = createQuote({
        data: {},
        config: {},
        api: mockApi,
      });

      expect(emptyQuote["_text"]).toEqual("");
      expect(emptyQuote["_author"]).toEqual("");
      expect(emptyQuote["_source"]).toEqual("");
    });

    it("should initialize with provided values", () => {
      const customData: TQuoteData = {
        text: "test-text",
        author: "test-author",
        source: "test-source",
      };

      const customQuote = createQuote({
        data: customData,
        config: {},
        api: mockApi,
      });

      expect(customQuote["_text"]).toEqual(customData.text);
      expect(customQuote["_author"]).toEqual(customData.author);
      expect(customQuote["_source"]).toEqual(customData.source);
    });
  });

  describe("render", () => {
    it("should create a div element with correct tag", () => {
      const element = quote.render();
      expect(element.tagName).toBe("DIV");
    });
  });

  describe("save", () => {
    it("should return current data", () => {
      const savedData = quote.save();
      expect(savedData).toEqual(mockInitialData);
    });
  });

  describe("destroy", () => {
    it("should unmount the component", () => {
      quote.destroy();
      expect(quote["_root"]).toBeNull();
    });
  });
});
