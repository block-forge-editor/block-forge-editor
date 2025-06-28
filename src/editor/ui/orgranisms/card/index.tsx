import type { BlockToolConstructorOptions } from "@editorjs/editorjs";
import { type Root, createRoot } from "react-dom/client";

import { BaseBlockTool } from "../base-block-tool";
import { CardComponent } from "./card-component";

import { getIcon } from "@/editor/lib/icons-manager";
import { TOOLBOX_TITLE } from "./constants";
import { TCardData } from "./types";

export class BlockForgeCard extends BaseBlockTool {
  private _title: string = "";
  private _description: string = "";
  private _icon: string = "IdCard";
  protected _root: Root | null = null;

  constructor(config: BlockToolConstructorOptions) {
    super(config);
    this._title = config.data?.title || "";
    this._description = config.data?.description || "";
    this._icon = config.data?.icon || "IdCard";
  }

  static get toolbox() {
    return {
      title: TOOLBOX_TITLE,
      icon: getIcon("card"),
    };
  }

  private _updateData(data: Partial<TCardData>) {
    this._title = data.title || this._title;
    this._description = data.description || this._description;
    this._icon = data.icon || this._icon;
    this.save();
  }

  private _createReactContainer(): HTMLElement {
    const reactContainer = document.createElement("div");
    this._root = createRoot(reactContainer);
    this._root.render(
      <CardComponent
        icon={this._icon}
        title={this._title}
        description={this._description}
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

  save(): TCardData {
    return {
      title: this._title,
      description: this._description,
      icon: this._icon,
    };
  }

  destroy() {
    if (this._root) {
      this._root.unmount();
    }
  }
}
