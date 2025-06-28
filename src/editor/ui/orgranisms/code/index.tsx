import type { BlockToolConstructorOptions } from "@editorjs/editorjs";
import { type Root, createRoot } from "react-dom/client";

import { BaseBlockTool } from "../base-block-tool";
import { CodeComponent } from "./code-component";

import { getIcon } from "@/editor/lib/icons-manager";
import { TOOLBOX_TITLE } from "./constants";

export type TCodeData = {
  code: string;
  language: string;
};

export class BlockForgeCode extends BaseBlockTool {
  private _code: string = "";
  private _language: string = "plaintext";
  protected _root: Root | null = null;

  constructor(config: BlockToolConstructorOptions) {
    super(config);
    this._code = config.data?.code || "";
    this._language = config.data?.language || "plaintext";
  }

  static get toolbox() {
    return {
      title: TOOLBOX_TITLE,
      icon: getIcon("code"),
    };
  }

  private _updateData(data: Pick<TCodeData, "code" | "language">) {
    this._code = data.code;
    this._language = data.language;
    this.save();
  }

  private _createReactContainer(): HTMLElement {
    const reactContainer = document.createElement("div");
    this._root = createRoot(reactContainer);
    this._root.render(
      <CodeComponent
        code={this._code}
        language={this._language}
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

  save(): TCodeData {
    return {
      code: this._code,
      language: this._language,
    };
  }

  destroy() {
    if (this._root) {
      this._root.unmount();
    }
  }
}
