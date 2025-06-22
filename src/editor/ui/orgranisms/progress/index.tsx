import type { BlockToolConstructorOptions } from "@editorjs/editorjs";
import { type Root, createRoot } from "react-dom/client";

import { BaseBlockTool } from "../base-block-tool";
import { ProgressComponent } from "./progress-component";

import { getIcon } from "@/editor/lib/icons";
import { TOOLBOX_TITLE } from "./constants";
import { TProgressData } from "./types";

export class BlockForgeProgress extends BaseBlockTool {
  private _items: TProgressData["items"] = [];
  protected _root: Root | null = null;

  constructor(config: BlockToolConstructorOptions) {
    super(config);
    this._items = config.data?.items || [];
  }

  static get toolbox() {
    return {
      title: TOOLBOX_TITLE,
      icon: getIcon("barChart"),
    };
  }

  private _updateData(items: TProgressData["items"]) {
    this._items = items;
    this.save();
  }

  private _updateDataWithRerender(items: TProgressData["items"]) {
    this._items = items;
    this.save();
    this._rerender();
  }

  private _createReactContainer(): HTMLElement {
    const reactContainer = document.createElement("div");
    this._root = createRoot(reactContainer);
    this._root.render(
      <ProgressComponent
        items={this._items}
        onUpdate={(items) => {
          this._updateData(items);
        }}
        onUpdateWithRerender={(items) => {
          this._updateDataWithRerender(items);
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
    if (!this._node || !this._root) return;

    this._root.render(
      <ProgressComponent
        items={this._items}
        onUpdate={(items) => {
          this._items = items;
          this.save();
        }}
        onUpdateWithRerender={(items) => {
          this._items = items;
          this.save();
          this._rerender();
        }}
      />,
    );
  }

  save(): TProgressData {
    return {
      items: this._items,
    };
  }

  destroy() {
    if (this._root) {
      this._root.unmount();
    }
  }
}
