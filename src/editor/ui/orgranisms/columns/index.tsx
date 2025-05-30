/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { BlockToolConstructorOptions } from "@editorjs/editorjs";
import { type Root, createRoot } from "react-dom/client";
import { v4 as uuidv4 } from "uuid";

import { BaseBlockTool } from "../base-block-tool";
import { ColumnsComponent } from "./columns-component";
import { TColumnData } from "./types";

import { getIcon } from "@/editor/lib/icons";

const TOOLBOX_TITLE = "Columns";

export class Columns extends BaseBlockTool {
  private _columns: TColumnData[] = [];
  private _reactContainer: null | HTMLDivElement = null;
  private _root: Root | null = null;
  private _variant: "primary" | "secondary" = "primary";
  private _blockID: string = "";

  static get toolbox() {
    return {
      title: TOOLBOX_TITLE,
      icon: getIcon("columns"),
    };
  }

  constructor(config: BlockToolConstructorOptions) {
    super(config);
    this._columns = config.data?.columns?.length
      ? config.data.columns.map((col: TColumnData) => ({
          ...col,
          size: col.size || 25,
        }))
      : [
          {
            id: uuidv4(),
            size: 100,
            content: {
              blocks: [],
              time: 0,
            },
          },
        ];
    this._variant = config.data?.variant || "primary";
    this._blockID = config.block.id;
  }

  private _createReactContainer(): HTMLDivElement {
    const reactContainer = document.createElement("div");
    reactContainer.className = "bf-w-full";
    return reactContainer;
  }

  private _updateColumnSizes = (rowIndex: number, newSizes: number[]): void => {
    const columnsPerRow = 4;
    const startIndex = rowIndex * columnsPerRow;

    newSizes.forEach((size, index) => {
      const columnIndex = startIndex + index;
      if (this._columns[columnIndex]) {
        this._columns[columnIndex].size = size;
      }
    });

    this.save();
  };

  private _updateColumnContent = (id: string, content: any): void => {
    const columnIndex = this._columns.findIndex((col) => col.id === id);
    if (columnIndex !== -1) {
      this._columns[columnIndex].content = content;
      this.save();
    }
  };

  private _recalculateColumnSizes(): void {
    const columnsPerRow = 4;
    const totalRows = Math.ceil(this._columns.length / columnsPerRow);

    for (let rowIndex = 0; rowIndex < totalRows; rowIndex++) {
      const startIndex = rowIndex * columnsPerRow;
      const endIndex = Math.min(
        startIndex + columnsPerRow,
        this._columns.length,
      );
      const rowColumns = this._columns.slice(startIndex, endIndex);
      const equalSize = 100 / rowColumns.length;

      rowColumns.forEach((_, index) => {
        const columnIndex = startIndex + index;
        this._columns[columnIndex].size = equalSize;
      });
    }
  }

  private _rerender(): void {
    if (!this._reactContainer) return;

    if (this._root) {
      this._root.unmount();
    }

    this._root = createRoot(this._reactContainer);
    this._root.render(
      <ColumnsComponent
        blockId={this._blockID}
        columns={this._columns}
        variant={this._variant}
        onColumnSizeChange={this._updateColumnSizes}
        onColumnContentChange={this._updateColumnContent}
        onColumnDelete={(id) => {
          this._columns = this._columns.filter((c) => c.id !== id);
          this._recalculateColumnSizes();
          this.save();
          this._rerender();
        }}
        onColumnAdd={() => {
          const newColumn: TColumnData = {
            id: uuidv4(),
            size: 25,
            content: {
              blocks: [],
              time: 0,
            },
          };
          this._columns.push(newColumn);
          this._recalculateColumnSizes();
          this.save();
          this._rerender();
        }}
      />,
    );
  }

  render() {
    const rootDiv = document.createElement("div");
    rootDiv.className = "bf-flex bf-flex-col bf-gap-4";

    const reactContainer = this._createReactContainer();
    this._reactContainer = reactContainer;

    rootDiv.appendChild(reactContainer);
    this._node = rootDiv;

    this._rerender();
    return rootDiv;
  }

  renderSettings() {
    return [
      {
        type: "separator",
      },
      {
        icon: getIcon("edit"),
        title: "Columns Style",
        children: {
          items: [
            {
              icon: getIcon("palette"),
              title: "Primary",
              toggle: "variant",
              isActive: () => this._variant === "primary",
              onActivate: () => {
                this._variant = "primary";
                this.save();
                this._rerender();
              },
            },
            {
              icon: getIcon("palette"),
              title: "Secondary",
              toggle: "variant",
              isActive: () => this._variant === "secondary",
              onActivate: () => {
                this._variant = "secondary";
                this.save();
                this._rerender();
              },
            },
          ],
        },
      },
    ];
  }

  save() {
    return {
      columns: this._columns,
      variant: this._variant,
    };
  }

  destroy() {
    if (this._root) {
      this._root.unmount();
    }
  }
}
