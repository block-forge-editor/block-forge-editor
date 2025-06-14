import type { BlockToolConstructorOptions } from "@editorjs/editorjs";
import { type Root, createRoot } from "react-dom/client";

import { BaseBlockTool } from "../base-block-tool";
import { ImageComponent } from "./image-component";

import { getIcon } from "@/editor/lib/icons";

const TOOLBOX_TITLE = "Image";

export type TImageData = {
  id: string;
  url: string;
  caption?: string;
  variant: "primary" | "secondary";
  alt: string;
};

export class Image extends BaseBlockTool {
  private _id: string;
  private _url: string = "";
  private _caption?: string;
  private _variant: TImageData["variant"] = "primary";
  private _alt: string = "";
  protected _root: Root | null = null;

  constructor(config: BlockToolConstructorOptions) {
    super(config);
    this._id = config.data?.id || crypto.randomUUID();
    this._url = config.data?.url || "";
    this._caption = config.data?.caption;
    this._variant = config.data?.variant || "primary";
    this._alt = config.data?.alt || "";
  }

  static get toolbox() {
    return {
      title: TOOLBOX_TITLE,
      icon: getIcon("image"),
    };
  }

  private _createReactContainer(): HTMLElement {
    const reactContainer = document.createElement("div");
    this._root = createRoot(reactContainer);
    this._root.render(
      <ImageComponent
        id={this._id}
        url={this._url}
        caption={this._caption}
        variant={this._variant}
        alt={this._alt}
        onUpdate={(data) => {
          this._url = data.url;
          this._caption = data.caption;
          this._alt = data.alt;
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
        icon: getIcon("palette"),
        title: "Image Style",
        children: {
          items: [
            {
              icon: getIcon("palette"),
              title: "Primary",
              toggle: "variant",
              isActive: () => this._variant === "primary",
              onActivate: () => {
                this._variant = "primary";
                this.save();
                this._rerender();
              },
            },
            {
              icon: getIcon("palette"),
              title: "Secondary",
              toggle: "variant",
              isActive: () => this._variant === "secondary",
              onActivate: () => {
                this._variant = "secondary";
                this.save();
                this._rerender();
              },
            },
          ],
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

  save(): TImageData {
    return {
      id: this._id,
      url: this._url,
      caption: this._caption,
      variant: this._variant,
      alt: this._alt,
    };
  }

  destroy() {
    if (this._root) {
      this._root.unmount();
    }
  }
}
