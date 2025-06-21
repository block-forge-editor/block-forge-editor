import { describe, it, expect, beforeEach, vi } from "vitest";
import { BlockForgeColumns } from "../index";
import { TColumnData } from "../types";

vi.mock("uuid", () => ({
  v4: vi.fn(() => "test-uuid"),
}));

// TODO: wtf
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
  id: "test-columns-id",
};

const mockColumnData: TColumnData = {
  id: "test-column-id",
  size: 50,
  content: {
    blocks: [],
    time: 0,
  },
};

const createColumns = (options: any) =>
  new BlockForgeColumns({
    ...options,
    api: mockApi,
    block: mockBlock,
  });

describe("BlockForgeColumns", () => {
  let columns: BlockForgeColumns;

  beforeEach(() => {
    columns = createColumns({
      data: {
        columns: [mockColumnData],
      },
      config: {},
      api: mockApi,
      readOnly: false,
    });
  });

  describe("constructor", () => {
    it("should initialize with default values", () => {
      const emptyColumns = createColumns({
        data: {},
        config: {},
        api: mockApi,
        readOnly: false,
      });

      expect(emptyColumns["_columns"]).toHaveLength(1);
      expect(emptyColumns["_columns"][0].id).toBe("test-uuid");
      expect(emptyColumns["_columns"][0].size).toBe(100);
    });

    it("should initialize with provided values", () => {
      const customData = {
        columns: [mockColumnData],
      };

      const customColumns = createColumns({
        data: customData,
        config: {},
        api: mockApi,
        readOnly: false,
      });

      expect(customColumns["_columns"]).toEqual([mockColumnData]);
    });

    it("should set default size for columns without size", () => {
      const columnWithoutSize: TColumnData = {
        id: "test-id",
        content: { blocks: [], time: 0 },
      };

      const columnsWithDefaultSize = createColumns({
        data: {
          columns: [columnWithoutSize],
        },
        config: {},
        api: mockApi,
        readOnly: false,
      });

      expect(columnsWithDefaultSize["_columns"][0].size).toBe(25);
    });

    it("should set block ID", () => {
      expect(columns["_blockID"]).toBe("test-columns-id");
    });
  });

  describe("render", () => {
    it("should create react container", () => {
      const element = columns.render();
      const reactContainer = element.querySelector("div");
      expect(reactContainer).toBeTruthy();
    });
  });

  describe("save", () => {
    it("should return current data", () => {
      const savedData = columns.save();
      expect(savedData).toEqual({
        columns: [mockColumnData],
      });
    });

    it("should return updated data after changes", () => {
      const updatedColumns = [{ ...mockColumnData, size: 75 }];
      (columns as any)._columns = updatedColumns;

      const savedData = columns.save();
      expect(savedData).toEqual({
        columns: updatedColumns,
      });
    });
  });

  describe("_updateColumnSizes", () => {
    it("should update column sizes correctly", () => {
      columns = createColumns({
        data: {
          columns: [
            { ...mockColumnData, id: "col1", size: 50 },
            { ...mockColumnData, id: "col2", size: 50 },
          ],
        },
        config: {},
        api: mockApi,
        readOnly: false,
      });

      (columns as any)._updateColumnSizes(0, [30, 70]);

      expect(columns["_columns"][0].size).toBe(30);
      expect(columns["_columns"][1].size).toBe(70);
    });

    it("should handle columns per row correctly", () => {
      columns = createColumns({
        data: {
          columns: [
            { ...mockColumnData, id: "col1", size: 25 },
            { ...mockColumnData, id: "col2", size: 25 },
            { ...mockColumnData, id: "col3", size: 25 },
            { ...mockColumnData, id: "col4", size: 25 },
            { ...mockColumnData, id: "col5", size: 100 },
          ],
        },
        config: {},
        api: mockApi,
        readOnly: false,
      });

      (columns as any)._updateColumnSizes(1, [100]);

      expect(columns["_columns"][4].size).toBe(100);
    });
  });

  describe("_updateColumnContent", () => {
    it("should update column content correctly", () => {
      columns = createColumns({
        data: {
          columns: [mockColumnData],
        },
        config: {},
        api: mockApi,
        readOnly: false,
      });

      const saveSpy = vi.spyOn(columns, "save");
      const newContent = { blocks: ["new-block"], time: 123 };

      (columns as any)._updateColumnContent("test-column-id", newContent);

      expect(columns["_columns"][0].content).toEqual(newContent);
      expect(saveSpy).toHaveBeenCalled();
    });
  });

  describe("_recalculateColumnSizes", () => {
    it("should recalculate sizes for single row", () => {
      columns = createColumns({
        data: {
          columns: [
            { ...mockColumnData, id: "col1", size: 50 },
            { ...mockColumnData, id: "col2", size: 50 },
          ],
        },
        config: {},
        api: mockApi,
        readOnly: false,
      });

      (columns as any)._recalculateColumnSizes();

      expect(columns["_columns"][0].size).toBe(50);
      expect(columns["_columns"][1].size).toBe(50);
    });
  });
});
