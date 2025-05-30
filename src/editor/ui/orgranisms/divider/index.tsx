import type { BlockToolConstructorOptions } from "@editorjs/editorjs";
import { type Root, createRoot } from "react-dom/client";

import { BaseBlockTool } from "../base-block-tool";
import { DividerComponent } from "./divider-component";

import { getIcon } from "@/editor/lib/icons";
import { EColors } from "@/editor/lib/utils";

const TOOLBOX_TITLE = "Divider";

export type TDividerData = {
  color?: string;
};

export class Divider extends BaseBlockTool {
  private _color: EColors = EColors.GRAY;
  private _root: Root | null = null;

  constructor(config: BlockToolConstructorOptions) {
    super(config);
    this._color = config.data?.color || EColors.GRAY;
  }

  static get toolbox() {
    return {
      title: TOOLBOX_TITLE,
      icon: getIcon("delimiter"),
    };
  }

  private _createReactContainer(): HTMLElement {
    const reactContainer = document.createElement("div");
    this._root = createRoot(reactContainer);
    this._root.render(<DividerComponent color={this._color} />);

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
        title: "Color",
        children: {
          items: Object.values(EColors).map((color) => ({
            icon: getIcon(color),
            title: color.charAt(0).toUpperCase() + color.slice(1),
            toggle: "color",
            isActive: () => this._color === color,
            onActivate: () => {
              this._color = color;
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

  save(): TDividerData {
    return {
      color: this._color,
    };
  }

  destroy() {
    if (this._root) {
      this._root.unmount();
    }
  }
}
