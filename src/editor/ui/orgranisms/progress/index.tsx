import type { BlockToolConstructorOptions } from "@editorjs/editorjs";
import { type Root, createRoot } from "react-dom/client";

import { BaseBlockTool } from "../base-block-tool";
import { ProgressComponent } from "./progress-component";

import { getIcon } from "@/editor/lib/icons";

const TOOLBOX_TITLE = "Progress";

export type TProgressData = {
  variant: "primary" | "secondary";
  items: Array<{
    label: string;
    value: number;
  }>;
};

export class Progress extends BaseBlockTool {
  private _items: TProgressData["items"] = [];
  private _variant: TProgressData["variant"] = "primary";
  private _root: Root | null = null;

  constructor(config: BlockToolConstructorOptions) {
    super(config);
    this._items = config.data?.items || [];
    this._variant = config.data?.variant || "primary";
  }

  static get toolbox() {
    return {
      title: TOOLBOX_TITLE,
      icon: getIcon("barChart"),
    };
  }

  private _createReactContainer(): HTMLElement {
    const reactContainer = document.createElement("div");
    this._root = createRoot(reactContainer);
    this._root.render(
      <ProgressComponent
        items={this._items}
        variant={this._variant}
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
        title: "Progress Style",
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
    if (!this._node || !this._root) return;

    this._root.render(
      <ProgressComponent
        items={this._items}
        variant={this._variant}
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
      variant: this._variant,
    };
  }

  destroy() {
    if (this._root) {
      this._root.unmount();
    }
  }
}
