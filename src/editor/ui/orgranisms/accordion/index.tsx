/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { BlockToolConstructorOptions } from "@editorjs/editorjs";
import { type Root, createRoot } from "react-dom/client";

import { BaseBlockTool } from "../base-block-tool";
import { AccordionComponent } from "./accordion-component";
import { TAccordionData } from "./types";

import { getIcon } from "@/editor/lib/icons";

const TOOLBOX_TITLE = "Accordion";

export class Accordion extends BaseBlockTool {
  private _item: TAccordionData;
  private _reactContainer: null | HTMLDivElement = null;
  protected _root: Root | null = null;
  private _variant: "primary" | "secondary" = "primary";
  private _blockID: string = "";

  static get toolbox() {
    return {
      title: TOOLBOX_TITLE,
      icon: getIcon("accordion"),
    };
  }

  constructor(config: BlockToolConstructorOptions) {
    super(config);
    this._item = config.data?.item || {
      title: "Section",
      content: {
        blocks: [],
        time: 0,
      },
    };
    this._variant = config.data?.variant || "primary";
    this._blockID = config.block.id;
  }

  private _createReactContainer(): HTMLDivElement {
    const reactContainer = document.createElement("div");
    reactContainer.className = "w-full";
    return reactContainer;
  }

  private _updateContent = (content?: any): void => {
    this._item.content = content || {};
    this.save();
  };

  private _updateTitle = (title?: string): void => {
    this._item.title = title || "";
    this.save();
  };

  private _rerender(): void {
    if (!this._reactContainer) return;

    if (this._root) {
      this._root.unmount();
    }

    this._root = createRoot(this._reactContainer);
    this._root.render(
      <AccordionComponent
        item={this._item}
        blockId={this._blockID}
        variant={this._variant}
        onTitleChange={this._updateTitle}
        onContentChange={this._updateContent}
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
        icon: getIcon("palette"),
        title: "Accordion Style",
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
      item: this._item,
      variant: this._variant,
    };
  }

  destroy() {
    if (this._root) {
      this._root.unmount();
    }
  }
}
