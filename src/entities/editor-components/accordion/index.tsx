import type {
  OutputBlockData,
  BlockToolConstructorOptions,
} from "@editorjs/editorjs";
import { type Root, createRoot } from "react-dom/client";

import { BaseBlockTool } from "../base-block-tool";
import { AccordionComponent } from "./accordion-component";

import { getIcon } from "@/shared/lib/helpers/icons";

const TOOLBOX_TITLE = "Аккордеон";

export type TAccordionData = {
  title: string;
  fontSize: number;
  variant: "primary" | "secondary";
  content: null | {
    time: number;
    blocks: OutputBlockData[];
  };
};

export class Accordion extends BaseBlockTool {
  private _title: string = "Заголовок аккордеона";
  private _fontSize: number = 16;
  private _variant: "primary" | "secondary" = "primary";
  private _data: TAccordionData = {
    title: "",
    fontSize: 16,
    variant: "primary",
    content: null,
  };
  private _blockID: string = "";
  private _reactContainer: null | HTMLDivElement = null;
  private _root: Root | null = null;

  static get toolbox() {
    return {
      title: TOOLBOX_TITLE,
      icon: getIcon("heading"),
    };
  }

  constructor(config: BlockToolConstructorOptions) {
    super(config);
    this._title = config.data?.title || "";
    this._fontSize = config.data?.fontSize || 16;
    this._variant = config.data?.variant || "primary";
    this._data = (config.data as TAccordionData) || {
      title: "",
      fontSize: 16,
      variant: "primary",
      content: null,
    };
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
      <AccordionComponent
        variant={this._variant}
        fontSize={this._fontSize}
        content={this._data.content}
        title={this._title || "Заголовок аккордеона"}
        onTitleChange={(title) => {
          this._title = title;
          this.save();
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
        icon: getIcon("formatSize"),
        title: "Размер шрифта",
        children: {
          items: [12, 14, 16, 18, 20, 24, 30, 36].map((size) => ({
            icon: getIcon("formatSize"),
            title: `${size}px`,
            toggle: "font-size",
            isActive: () => this._fontSize === size,
            onActivate: () => {
              this._fontSize = size;
              this._rerender();
            },
          })),
        },
      },
      {
        type: "separator",
      },
      {
        icon: getIcon("edit"),
        title: "Тип аккордеона",
        children: {
          items: [
            {
              icon: getIcon("edit"),
              title: "Primary",
              toggle: "variant",
              isActive: () => this._variant === "primary",
              onActivate: () => {
                this._variant = "primary";
                this._rerender();
              },
            },
            {
              icon: getIcon("edit"),
              title: "Secondary",
              toggle: "variant",
              isActive: () => this._variant === "secondary",
              onActivate: () => {
                this._variant = "secondary";
                this._rerender();
              },
            },
          ],
        },
      },
    ];
  }

  save(): TAccordionData {
    return {
      ...this._data,
      title: this._title,
      fontSize: this._fontSize,
      variant: this._variant,
    };
  }

  destroy() {
    if (this._root) {
      this._root.unmount();
    }
  }
}
