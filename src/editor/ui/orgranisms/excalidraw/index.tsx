import type { BlockToolConstructorOptions } from "@editorjs/editorjs";
import { type Root, createRoot } from "react-dom/client";

import { BaseBlockTool } from "../base-block-tool";
import { ExcalidrawComponent } from "./excalidraw-component";
import { TExcalidrawData } from "./types";

import { getIcon } from "@/editor/lib/icons";

const TOOLBOX_TITLE = "Excalidraw";

export class Excalidraw extends BaseBlockTool {
  private _data: TExcalidrawData;
  private _reactContainer: null | HTMLDivElement = null;
  protected _root: Root | null = null;
  private _blockID: string = "";

  static get toolbox() {
    return {
      title: TOOLBOX_TITLE,
      icon: getIcon("drawing"),
    };
  }

  constructor(config: BlockToolConstructorOptions) {
    super(config);

    this._data = config.data?.data || {
      elements: [],
      appState: {},
      files: {},
    };
    this._blockID = config.block.id;
  }

  private _createReactContainer(): HTMLDivElement {
    const reactContainer = document.createElement("div");
    reactContainer.className = "w-full";
    return reactContainer;
  }

  private _updateContent = (data: TExcalidrawData): void => {
    this._data = data;
    this.save();
  };

  private _handleSave = (): void => {
    console.log("save");
    console.log(this._data);
    this._rerender();
  };

  private _rerender(): void {
    if (!this._reactContainer) return;

    if (this._root) {
      this._root.unmount();
    }

    this._root = createRoot(this._reactContainer);
    this._root.render(
      <ExcalidrawComponent
        data={this._data}
        blockId={this._blockID}
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
    console.log(this._data);
    return this._data;
  }

  destroy() {
    if (this._root) {
      this._root.unmount();
    }
  }
}
