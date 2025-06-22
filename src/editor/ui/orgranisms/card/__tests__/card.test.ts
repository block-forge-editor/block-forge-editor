import { describe, it, expect, vi, beforeEach } from "vitest";
import { BlockForgeCard } from "../index";
import { TCardData } from "../types";

describe("Card", () => {
  let card: BlockForgeCard;

  const mockApi = {
    i18n: {
      t: vi.fn((text) => text),
    },
    styles: {
      block: "cdx-block",
    },
  };

  const mockBlock = {
    id: "test-card-id",
  };

  const mockInitialData: TCardData = {
    title: "",
    description: "",
    icon: "IdCard",
  };

  const createCard = (options: any) =>
    new BlockForgeCard({
      ...options,
      api: mockApi,
      block: mockBlock,
    });

  beforeEach(() => {
    card = createCard({
      data: mockInitialData,
      config: {},
      api: mockApi,
    });
  });

  describe("constructor", () => {
    it("should initialize with default values", () => {
      const emptyCard = createCard({
        data: {},
        config: {},
        api: mockApi,
      });

      expect(emptyCard["_title"]).toEqual("");
      expect(emptyCard["_description"]).toEqual("");
      expect(emptyCard["_icon"]).toEqual("IdCard");
    });

    it("should initialize with provided values", () => {
      const customData: TCardData = {
        title: "Test Card Title",
        description: "Test card description",
        icon: "Star",
      };

      const customCard = createCard({
        data: customData,
        config: {},
        api: mockApi,
      });

      expect(customCard["_title"]).toEqual(customData.title);
      expect(customCard["_description"]).toEqual(customData.description);
      expect(customCard["_icon"]).toEqual(customData.icon);
    });
  });

  describe("updateData", () => {
    it("should update all data fields", () => {
      const updateData = {
        title: "Updated Title",
        description: "Updated description",
        icon: "Heart",
      };

      card["_updateData"](updateData);

      expect(card["_title"]).toEqual(updateData.title);
      expect(card["_description"]).toEqual(updateData.description);
      expect(card["_icon"]).toEqual(updateData.icon);
    });

    it("should update partial data and keep existing values", () => {
      card["_updateData"]({ title: "New Title" });

      expect(card["_title"]).toEqual("New Title");
      expect(card["_description"]).toEqual("");
      expect(card["_icon"]).toEqual("IdCard");
    });

    it("should handle empty string updates", () => {
      card["_updateData"]({ title: "" });

      expect(card["_title"]).toEqual("");
    });
  });

  describe("save", () => {
    it("should return current data", () => {
      const savedData = card.save();
      expect(savedData).toEqual(mockInitialData);
    });
  });

  describe("destroy", () => {
    it("should unmount the component", () => {
      card.destroy();
      expect(card["_root"]).toBeNull();
    });
  });
});
