import type { BlockToolConstructorOptions } from "@editorjs/editorjs";
import { type Root, createRoot } from "react-dom/client";

import { BaseBlockTool } from "../base-block-tool";
import { ParagraphComponent } from "./paragraph-component";

import { getIcon } from "@/editor/lib/icons";

const TOOLBOX_TITLE = "Paragraph";
const FONT_SIZES = [12, 14, 16, 18, 20, 24, 30, 36];

export type TParagraphData = {
  text: string;
  fontSize?: number;
};

export class Paragraph extends BaseBlockTool {
  private _text: string = "";
  private _fontSize?: number;
  private _root: Root | null = null;

  constructor(config: BlockToolConstructorOptions) {
    super(config);
    this._text = config.data?.text || "";
    this._fontSize = config.data?.fontSize;
  }

  static get toolbox() {
    return {
      title: TOOLBOX_TITLE,
      icon: getIcon("formatSize"),
    };
  }

  private _createReactContainer(): HTMLElement {
    const reactContainer = document.createElement("div");
    this._root = createRoot(reactContainer);
    this._root.render(
      <ParagraphComponent
        text={this._text}
        fontSize={this._fontSize}
        onUpdate={(data) => {
          this._text = data.text;
          this._fontSize = data.fontSize;
          this.save();
        }}
      />,
    );

    return reactContainer;
  }

  render() {
    const rootDiv = document.createElement("div");
    rootDiv.className = "bf-flex bf-flex-col bf-gap-4";

    const contentWrapper = document.createElement("div");
    contentWrapper.className = "bf-relative bf-group";

    contentWrapper.appendChild(this._createReactContainer());

    rootDiv.appendChild(contentWrapper);

    this._node = rootDiv;
    return rootDiv;
  }

  renderSettings() {
    return [
      {
        type: "separator",
      },
      {
        icon: getIcon("formatSize"),
        title: "Font size",
        children: {
          items: FONT_SIZES.map((size) => ({
            icon: getIcon("formatSize"),
            title: `${size}px`,
            toggle: "font-size",
            isActive: () => this._fontSize === size,
            onActivate: () => {
              this._fontSize = size;
              this.save();
              this._rerender();
            },
          })),
        },
      },
    ];
  }

  private _rerender(): void {
    if (!this._node) return;

    const contentWrapper = this._node.querySelector("div");

    if (!contentWrapper) {
      return;
    }

    const oldContainer = contentWrapper.firstElementChild;

    if (oldContainer) {
      contentWrapper.removeChild(oldContainer);
    }

    contentWrapper.appendChild(this._createReactContainer());
  }

  save(): TParagraphData {
    return {
      text: this._text,
      fontSize: this._fontSize,
    };
  }

  validate(savedData: { text: string }): boolean {
    return savedData.text.trim() !== "";
  }

  destroy() {
    if (this._root) {
      this._root.unmount();
    }
  }
}
