import type { BlockToolConstructorOptions } from "@editorjs/editorjs";
import { type Root, createRoot } from "react-dom/client";

import { BaseBlockTool } from "../base-block-tool";
import { CodeComponent } from "./code-component";

import { getIcon } from "@/editor/lib/icons";

const TOOLBOX_TITLE = "Code Block";

export type TCodeData = {
  code: string;
  language: string;
  variant: "primary" | "secondary";
};

export class Code extends BaseBlockTool {
  private _code: string = "";
  private _language: string = "plaintext";
  private _variant: TCodeData["variant"] = "primary";
  private _root: Root | null = null;

  constructor(config: BlockToolConstructorOptions) {
    super(config);
    this._code = config.data?.code || "";
    this._language = config.data?.language || "plaintext";
    this._variant = config.data?.variant || "primary";
  }

  static get toolbox() {
    return {
      title: TOOLBOX_TITLE,
      icon: getIcon("code"),
    };
  }

  private _createReactContainer(): HTMLElement {
    const reactContainer = document.createElement("div");
    this._root = createRoot(reactContainer);
    this._root.render(
      <CodeComponent
        code={this._code}
        variant={this._variant}
        language={this._language}
        onUpdate={(data) => {
          this._code = data.code;
          this._language = data.language;
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
        title: "Code Style",
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

  save(): TCodeData {
    return {
      code: this._code,
      language: this._language,
      variant: this._variant,
    };
  }

  destroy() {
    if (this._root) {
      this._root.unmount();
    }
  }
}
