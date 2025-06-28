import type { BlockToolConstructorOptions } from "@editorjs/editorjs";
import { type Root, createRoot } from "react-dom/client";

import { BaseBlockTool } from "../base-block-tool";
import { ImageComponent } from "./image-component";

import { getIcon } from "@/editor/lib/icons-manager";

const TOOLBOX_TITLE = "Image";

export type TImageData = {
  id: string;
  url: string;
  caption?: string;
  alt: string;
};

export class BlockForgeImage extends BaseBlockTool {
  private _id: string;
  private _url: string = "";
  private _caption: string = "";
  private _alt: string = "";
  protected _root: Root | null = null;

  constructor(config: BlockToolConstructorOptions) {
    super(config);
    this._id = config.data?.id || crypto.randomUUID();
    this._url = config.data?.url || "";
    this._caption = config.data?.caption || "";
    this._alt = config.data?.alt || "";
  }

  static get toolbox() {
    return {
      title: TOOLBOX_TITLE,
      icon: getIcon("image"),
    };
  }

  private _updateData(data: Pick<TImageData, "url" | "caption" | "alt">) {
    this._url = data.url;
    this._caption = data.caption || "";
    this._alt = data.alt;
    this.save();
  }

  private _createReactContainer(): HTMLElement {
    const reactContainer = document.createElement("div");
    this._root = createRoot(reactContainer);
    this._root.render(
      <ImageComponent
        url={this._url}
        caption={this._caption}
        alt={this._alt}
        onUpdate={(data) => {
          this._updateData(data);
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

  save(): TImageData {
    return {
      id: this._id,
      url: this._url,
      caption: this._caption,
      alt: this._alt,
    };
  }

  destroy() {
    if (this._root) {
      this._root.unmount();
    }
  }
}
