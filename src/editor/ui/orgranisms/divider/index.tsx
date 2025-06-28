import type { BlockToolConstructorOptions } from "@editorjs/editorjs";
import { type Root, createRoot } from "react-dom/client";

import { BaseBlockTool } from "../base-block-tool";
import { DividerComponent } from "./divider-component";

import { getIcon } from "@/editor/lib/icons-manager";

const TOOLBOX_TITLE = "Divider";

export class BlockForgeDivider extends BaseBlockTool {
  protected _root: Root | null = null;

  constructor(config: BlockToolConstructorOptions) {
    super(config);
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
    this._root.render(<DividerComponent />);

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

  destroy() {
    if (this._root) {
      this._root.unmount();
    }
  }
}
