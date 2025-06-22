import { describe, it, expect, vi, beforeEach } from "vitest";
import { BlockForgeTestimonials } from "../index";
import { TTestimonialsData } from "../types";

describe("Testimonials", () => {
  let testimonials: BlockForgeTestimonials;

  const mockApi = {
    i18n: {
      t: vi.fn((text) => text),
    },
    styles: {
      block: "cdx-block",
    },
  };

  const mockBlock = {
    id: "test-testimonials-id",
  };

  const mockInitialData: TTestimonialsData = {
    items: [],
  };

  const createTestimonials = (options: any) =>
    new BlockForgeTestimonials({
      ...options,
      api: mockApi,
      block: mockBlock,
    });

  beforeEach(() => {
    testimonials = createTestimonials({
      data: mockInitialData,
      config: {},
      api: mockApi,
    });
  });

  describe("constructor", () => {
    it("should initialize with default values", () => {
      const emptyTestimonials = createTestimonials({
        data: {},
        config: {},
        api: mockApi,
      });

      expect(emptyTestimonials["_items"]).toEqual([]);
    });

    it("should initialize with provided values", () => {
      const customData: TTestimonialsData = {
        items: [
          {
            name: "John Doe",
            role: "CEO",
            text: "This product has transformed our business completely.",
            photo: "https://example.com/john.jpg",
          },
          {
            name: "Jane Smith",
            role: "Marketing Director",
            text: "Excellent service and amazing results!",
            photo: "https://example.com/jane.jpg",
          },
        ],
      };

      const customTestimonials = createTestimonials({
        data: customData,
        config: {},
        api: mockApi,
      });

      expect(customTestimonials["_items"]).toEqual(customData.items);
    });
  });

  describe("updateData", () => {
    it("should update the items data", () => {
      const newItems = [
        {
          name: "Alice Johnson",
          role: "Product Manager",
          text: "Great experience working with this team.",
          photo: "https://example.com/alice.jpg",
        },
      ];

      const rerenderSpy = vi.spyOn(testimonials as any, "_rerender");

      testimonials["_updateData"](newItems);

      expect(testimonials["_items"]).toEqual(newItems);
      expect(rerenderSpy).not.toHaveBeenCalled();
    });
  });

  describe("updateDataWithRerender", () => {
    it("should update the items data and trigger rerender", () => {
      const newItems = [
        {
          name: "Bob Wilson",
          role: "CTO",
          text: "Innovative solution that exceeded our expectations.",
          photo: "https://example.com/bob.jpg",
        },
      ];

      const rerenderSpy = vi.spyOn(testimonials as any, "_rerender");

      testimonials["_updateDataWithRerender"](newItems);

      expect(testimonials["_items"]).toEqual(newItems);
      expect(rerenderSpy).toHaveBeenCalled();
    });
  });

  describe("save", () => {
    it("should return current data", () => {
      const savedData = testimonials.save();
      expect(savedData).toEqual(mockInitialData);
    });
  });

  describe("destroy", () => {
    it("should unmount the component", () => {
      testimonials.destroy();
      expect(testimonials["_root"]).toBeNull();
    });
  });
});
