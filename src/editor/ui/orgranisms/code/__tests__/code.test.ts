import { describe, it, expect, vi, beforeEach } from "vitest";
import { BlockForgeCode, TCodeData } from "../index";

describe("Code", () => {
  let code: BlockForgeCode;

  const mockApi = {
    i18n: {
      t: vi.fn((text) => text),
    },
    styles: {
      block: "cdx-block",
    },
  };

  const mockBlock = {
    id: "test-code-id",
  };

  const mockInitialData: TCodeData = {
    code: "",
    language: "plaintext",
  };

  const createCode = (options: any) =>
    new BlockForgeCode({
      ...options,
      api: mockApi,
      block: mockBlock,
    });

  beforeEach(() => {
    code = createCode({
      data: mockInitialData,
      config: {},
      api: mockApi,
    });
  });

  describe("constructor", () => {
    it("should initialize with default values", () => {
      const emptyCode = createCode({
        data: {},
        config: {},
        api: mockApi,
      });

      expect(emptyCode["_code"]).toEqual("");
      expect(emptyCode["_language"]).toEqual("plaintext");
    });

    it("should initialize with provided values", () => {
      const customData: TCodeData = {
        code: "console.log('Hello World');",
        language: "javascript",
      };

      const customCode = createCode({
        data: customData,
        config: {},
        api: mockApi,
      });

      expect(customCode["_code"]).toEqual(customData.code);
      expect(customCode["_language"]).toEqual(customData.language);
    });
  });

  describe("save", () => {
    it("should return current data", () => {
      const savedData = code.save();
      expect(savedData).toEqual(mockInitialData);
    });
  });

  describe("updateData", () => {
    it("should update the data", () => {
      code["_updateData"]({
        code: "console.log('Hello World');",
        language: "javascript",
      });

      expect(code["_code"]).toEqual("console.log('Hello World');");
      expect(code["_language"]).toEqual("javascript");
    });
  });

  describe("destroy", () => {
    it("should unmount the component", () => {
      code.destroy();
      expect(code["_root"]).toBeNull();
    });
  });
});
