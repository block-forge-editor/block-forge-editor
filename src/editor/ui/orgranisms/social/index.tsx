import type { BlockToolConstructorOptions } from "@editorjs/editorjs";
import { Root, createRoot } from "react-dom/client";

import { BaseBlockTool } from "../base-block-tool";
import { SocialComponent } from "./social-component";

import { getIcon } from "@/editor/lib/icons-manager";
import { TOOLBOX_TITLE } from "./constants";
import { TSocialData } from "./types";

export class BlockForgeSocial extends BaseBlockTool {
  private _links: TSocialData["links"] = [];
  protected _root: Root | null = null;

  constructor(config: BlockToolConstructorOptions) {
    super(config);
    this._links = config.data?.links || [];
  }

  static get toolbox() {
    return {
      title: TOOLBOX_TITLE,
      icon: getIcon("share"),
    };
  }

  private _updateData(links: TSocialData["links"]) {
    this._links = links;
    this.save();
  }

  private _updateDataWithRerender(links: TSocialData["links"]) {
    this._links = links;
    this.save();
    this._rerender();
  }

  private _createReactContainer(): HTMLElement {
    const reactContainer = document.createElement("div");
    this._root = createRoot(reactContainer);
    this._root.render(
      <SocialComponent
        links={this._links || []}
        onUpdate={(links) => {
          this._updateData(links);
        }}
        onUpdateWithRerender={(links) => {
          this._updateDataWithRerender(links);
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

  save(): TSocialData {
    return {
      links: this._links || [],
    };
  }

  destroy() {
    if (this._root) {
      this._root.unmount();
    }
  }
}
