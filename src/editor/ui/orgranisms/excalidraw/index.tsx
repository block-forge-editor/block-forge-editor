import type { BlockToolConstructorOptions } from "@editorjs/editorjs";
import { type Root, createRoot } from "react-dom/client";

import { BaseBlockTool } from "../base-block-tool";
import { ExcalidrawComponent } from "./excalidraw-component";
import { TExcalidrawData } from "./types";
import { getExcalidrawPreview } from "./lib";

import { getIcon } from "@/editor/lib/icons";
import { TOOLBOX_TITLE } from "./constants";

export class BlockForgeExcalidraw extends BaseBlockTool {
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
      sceneId: undefined,
      title: undefined,
      description: undefined,
      imageUrl: undefined,
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

  private async _generatePreview(): Promise<void> {
    if (this._data.sceneId) {
      try {
        const previewUrl = await getExcalidrawPreview(this._data.sceneId);
        if (previewUrl) {
          this._data.imageUrl = previewUrl;
        }
      } catch (error) {
        console.error("Failed to generate preview:", error);
      }
    }
  }

  private _handleSave = async (): Promise<void> => {
    // Попытка получить превью изображения
    await this._generatePreview();
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
    return this._data;
  }

  destroy() {
    if (this._root) {
      this._root.unmount();
    }
  }
}
