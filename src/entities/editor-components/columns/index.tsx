import type { BlockToolConstructorOptions } from "@editorjs/editorjs";
import { type Root, createRoot } from "react-dom/client";
import { v4 as uuidv4 } from "uuid";

import { BaseBlockTool } from "../base-block-tool";
import { ColumnsComponent } from "./columns-component";
import { TColumnData } from "./types";

import { getIcon } from "@/shared/lib/helpers/icons";

const TOOLBOX_TITLE = "Колонки";

export class Columns extends BaseBlockTool {
  private _columns: TColumnData[] = [];
  private _reactContainer: null | HTMLDivElement = null;
  private _root: Root | null = null;
  private _variant: "fill" | "default" | "fill-each-column" = "default";
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
      ? config.data.columns
      : [
          {
            id: uuidv4(),
            content: {
              blocks: [],
              time: 0,
            },
          },
        ];
    this._variant = config.data?.variant || "default";
    this._blockID = config.block.id;
  }

  private _createReactContainer(): HTMLDivElement {
    const reactContainer = document.createElement("div");
    reactContainer.className = "w-full";
    return reactContainer;
  }

  private _rerender(): void {
    if (!this._reactContainer) return;

    if (this._root) {
      this._root.unmount();
    }

    this._root = createRoot(this._reactContainer);
    this._root.render(
      <ColumnsComponent
        columns={this._columns}
        variant={this._variant}
        onColumnDelete={(id) => {
          this._columns = this._columns.filter((c) => c.id !== id);
          this.save();
          this._rerender();
        }}
        onColumnAdd={() => {
          this._columns.push({
            id: uuidv4(),
            content: {
              blocks: [],
              time: 0,
            },
          });
          this.save();
          this._rerender();
        }}
      />,
    );
  }

  render() {
    const rootDiv = document.createElement("div");
    rootDiv.className = "flex flex-col gap-4";

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
        title: "Тип колонок",
        children: {
          items: [
            {
              icon: getIcon("edit"),
              title: "Рамка вокруг компонента",
              hint: { title: "Рамка вокруг компонента" },
              toggle: "variant",
              isActive: () => this._variant === "fill",
              onActivate: () => {
                this._variant = "fill";
                this._rerender();
              },
            },
            {
              icon: getIcon("edit"),
              title: "Рамка вокруг каждой колонки",
              hint: { title: "Рамка вокруг каждой колонки" },
              toggle: "variant",
              isActive: () => this._variant === "fill-each-column",
              onActivate: () => {
                this._variant = "fill-each-column";
                this._rerender();
              },
            },
            {
              icon: getIcon("edit"),
              title: "Без рамки",
              toggle: "variant",
              isActive: () => this._variant === "default",
              onActivate: () => {
                this._variant = "default";
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
