import type { BlockToolConstructorOptions } from "@editorjs/editorjs";
import { type Root, createRoot } from "react-dom/client";

import { BaseBlockTool } from "../base-block-tool";
import { EmbedComponent } from "./video-embed-component";

import { getIcon } from "@/editor/lib/icons-manager";
import { TOOLBOX_TITLE } from "./constants";

export type TEmbedData = {
  url: string;
  platform: "vimeo" | "other" | "youtube";
};

export class BlockForgeVideoEmbed extends BaseBlockTool {
  private _url: string = "";
  private _platform: TEmbedData["platform"] = "youtube";
  protected _root: Root | null = null;

  constructor(config: BlockToolConstructorOptions) {
    super(config);
    this._url = config.data?.url || "";
    this._platform = config.data?.platform || "youtube";
  }

  static get toolbox() {
    return {
      title: TOOLBOX_TITLE,
      icon: getIcon("video"),
    };
  }

  private _updateData(data: Pick<TEmbedData, "url" | "platform">) {
    this._url = data.url;
    this._platform = data.platform;
    this.save();
  }

  private _createReactContainer(): HTMLElement {
    const reactContainer = document.createElement("div");
    this._root = createRoot(reactContainer);
    this._root.render(
      <EmbedComponent
        url={this._url}
        platform={this._platform}
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

  save(): TEmbedData {
    return {
      url: this._url,
      platform: this._platform,
    };
  }

  destroy() {
    if (this._root) {
      this._root.unmount();
    }
  }
}
