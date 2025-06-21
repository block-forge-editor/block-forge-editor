import type { BlockToolConstructorOptions } from "@editorjs/editorjs";
import { type Root, createRoot } from "react-dom/client";

import { BaseBlockTool } from "../base-block-tool";
import { ImageGalleryComponent } from "./image-gallery-component";

import { getIcon } from "@/editor/lib/icons";

const TOOLBOX_TITLE = "Image Gallery";

export type TImageGalleryData = {
  variant: "primary" | "secondary";
  images: Array<{
    id: string;
    url: string;
    alt: string;
    caption?: string;
  }>;
};

export class ImageGallery extends BaseBlockTool {
  private _images: TImageGalleryData["images"] = [];
  private _variant: "primary" | "secondary" = "primary";
  protected _root: Root | null = null;
  private _blockId: string = "";

  constructor(config: BlockToolConstructorOptions) {
    super(config);
    this._images = config.data?.images || [];
    this._variant = config.data?.variant || "primary";
    this._blockId = config.block.id;
  }

  static get toolbox() {
    return {
      title: TOOLBOX_TITLE,
      icon: getIcon("image"),
    };
  }

  // TODO: make different methods for update, delete, add, etc.
  private _createReactContainer(): HTMLElement {
    const reactContainer = document.createElement("div");
    this._root = createRoot(reactContainer);
    this._root.render(
      <ImageGalleryComponent
        images={this._images}
        variant={this._variant}
        onImageDelete={(id) => {
          this._images = this._images.filter((image) => image.id !== id);
          this.save();
          this._rerender();
        }}
        onImageAdd={(data) => {
          this._images.push({
            id: crypto.randomUUID(),
            ...data,
          });
          this.save();
          this._rerender();
        }}
        onMetaDataChange={(data) => {
          const imageIndex = this._images.findIndex(
            (image) => image.id === data.id,
          );
          if (imageIndex !== -1) {
            this._images[imageIndex] = {
              ...this._images[imageIndex],
              ...data.data,
            };
          }
          this.save();
        }}
        onImageUpdate={(id, data) => {
          const imageIndex = this._images.findIndex((image) => image.id === id);
          if (imageIndex !== -1) {
            this._images[imageIndex] = {
              ...this._images[imageIndex],
              ...data,
            };
            this.save();
            this._rerender();
          }
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
        icon: getIcon("layout"),
        title: "Gallery Type",
        children: {
          items: [
            {
              icon: getIcon("grid"),
              title: "Grid",
              toggle: "variant",
              isActive: () => this._variant === "primary",
              onActivate: () => {
                this._variant = "primary";
                this.save();
                this._rerender();
              },
            },
            {
              icon: getIcon("image"),
              title: "Carousel",
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

  save(): TImageGalleryData {
    return {
      images: this._images,
      variant: this._variant,
    };
  }

  destroy() {
    if (this._root) {
      this._root.unmount();
    }
  }
}
