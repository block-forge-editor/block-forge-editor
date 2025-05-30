import type { BlockToolConstructorOptions } from "@editorjs/editorjs";
import { type Root, createRoot } from "react-dom/client";

import { BaseBlockTool } from "../base-block-tool";
import { CardComponent } from "./card-component";

import { getIcon } from "@/editor/lib/icons";

const TOOLBOX_TITLE = "Card";

export type TCardData = {
  icon: string;
  title: string;
  description: string;
  variant: "primary" | "secondary";
};

export class Card extends BaseBlockTool {
  private _title: string = "";
  private _description: string = "";
  private _variant: TCardData["variant"] = "primary";
  private _icon: string = "IdCard";
  private _root: Root | null = null;

  constructor(config: BlockToolConstructorOptions) {
    super(config);
    this._title = config.data?.title || "";
    this._description = config.data?.description || "";
    this._variant = config.data?.variant || "primary";
    this._icon = config.data?.icon || "IdCard";
  }

  static get toolbox() {
    return {
      title: TOOLBOX_TITLE,
      icon: getIcon("card"),
    };
  }

  private _createReactContainer(): HTMLElement {
    const reactContainer = document.createElement("div");
    this._root = createRoot(reactContainer);
    this._root.render(
      <CardComponent
        icon={this._icon}
        title={this._title}
        variant={this._variant}
        description={this._description}
        onUpdate={(data) => {
          this._title = data.title;
          this._description = data.description;
          this._icon = data.icon || this._icon;
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
        title: "Card Style",
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

  save(): TCardData {
    return {
      title: this._title,
      description: this._description,
      variant: this._variant,
      icon: this._icon,
    };
  }

  destroy() {
    if (this._root) {
      this._root.unmount();
    }
  }
}
