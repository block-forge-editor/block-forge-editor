import type { BlockToolConstructorOptions } from "@editorjs/editorjs";
import { type Root, createRoot } from "react-dom/client";

import { BaseBlockTool } from "../base-block-tool";
import { FigmaComponent } from "./figma-component";
import { TFigmaData } from "./types";

import { getIcon } from "@/editor/lib/icons";
import { TOOLBOX_TITLE } from "./constants";

export class BlockForgeFigma extends BaseBlockTool {
  private _data: TFigmaData;
  private _reactContainer: null | HTMLDivElement = null;
  protected _root: Root | null = null;
  private _blockID: string = "";

  static get toolbox() {
    return {
      title: TOOLBOX_TITLE,
      icon: getIcon("figma"),
    };
  }

  constructor(config: BlockToolConstructorOptions) {
    super(config);

    this._data = config.data?.data || {
      figmaUrl: "",
    };
    this._blockID = config.block.id;
  }

  private _createReactContainer(): HTMLDivElement {
    const reactContainer = document.createElement("div");
    reactContainer.className = "w-full";
    return reactContainer;
  }

  private _updateContent = (data: TFigmaData): void => {
    this._data = data;
    this.save();
  };

  private _handleSave = async (): Promise<void> => {
    this._rerender();
  };

  private _rerender(): void {
    if (!this._reactContainer) return;

    if (this._root) {
      this._root.unmount();
    }

    this._root = createRoot(this._reactContainer);
    this._root.render(
      <FigmaComponent
        data={this._data}
        onUpdate={this._updateContent}
        onSave={this._handleSave}
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

  save() {
    return this._data;
  }

  destroy() {
    if (this._root) {
      this._root.unmount();
    }
  }
}
