import type { BlockToolConstructorOptions } from "@editorjs/editorjs";
import { type Root, createRoot } from "react-dom/client";

import { BaseBlockTool } from "../base-block-tool";
import { HeaderComponent } from "./header-component";

import { getIcon } from "@/editor/lib/icons";

const TOOLBOX_TITLE = "Header";
const FONT_SIZES = [12, 14, 16, 18, 20, 24, 30, 36];
const HEADING_LEVELS = [1, 2, 3, 4, 5, 6];

export type THeaderData = {
  text: string;
  level: number;
  fontSize: number;
};

export class Header extends BaseBlockTool {
  private _text: string = "";
  private _fontSize: number = 16;
  private _level: number = 3;
  private _root: Root | null = null;

  constructor(config: BlockToolConstructorOptions) {
    super(config);
    this._text = config.data?.text || "";
    this._level = config.data?.level || 3;
    this._fontSize = config.data?.fontSize || 16;
  }

  static get toolbox() {
    return {
      title: TOOLBOX_TITLE,
      icon: getIcon("heading"),
    };
  }

  private _createReactContainer(): HTMLElement {
    const reactContainer = document.createElement("div");
    this._root = createRoot(reactContainer);
    this._root.render(
      <HeaderComponent
        text={this._text}
        level={this._level}
        fontSize={this._fontSize}
        onUpdate={(data) => {
          this._text = data.text;
          this._fontSize = data.fontSize;
          this._level = data.level;
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
      {
        type: "separator",
      },
      {
        icon: getIcon("heading"),
        title: "Level",
        children: {
          items: HEADING_LEVELS.map((level) => ({
            icon: getIcon("heading"),
            title: `Heading ${level}`,
            toggle: "heading-level",
            isActive: () => this._level === level,
            onActivate: () => {
              this._level = level;
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

  save(): THeaderData {
    return {
      text: this._text,
      fontSize: this._fontSize,
      level: this._level,
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
