import type { BlockToolConstructorOptions } from "@editorjs/editorjs";
import { type Root, createRoot } from "react-dom/client";

import { BaseBlockTool } from "../base-block-tool";
import { QuoteComponent } from "./quote-component";
import { TOOLBOX_TITLE } from "./constants";

import { getIcon } from "@/editor/lib/icons-manager";

export type TQuoteData = {
  text: string;
  author?: string;
  source?: string;
};

export class BlockForgeQuote extends BaseBlockTool {
  private _text: string = "";
  private _author: string = "";
  private _source: string = "";
  protected _root: Root | null = null;

  constructor(config: BlockToolConstructorOptions) {
    super(config);
    this._text = config.data?.text || "";
    this._author = config.data?.author || "";
    this._source = config.data?.source || "";
  }

  static get toolbox() {
    return {
      title: TOOLBOX_TITLE,
      icon: getIcon("quote"),
    };
  }

  private _createReactContainer(): HTMLElement {
    const reactContainer = document.createElement("div");
    this._root = createRoot(reactContainer);
    this._root.render(
      <QuoteComponent
        text={this._text}
        author={this._author}
        source={this._source}
        onUpdate={(data) => {
          this._text = data.text || "";
          this._author = data.author || "";
          this._source = data.source || "";
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

  save(): TQuoteData {
    return {
      text: this._text,
      author: this._author,
      source: this._source,
    };
  }

  destroy() {
    if (this._root) {
      this._root.unmount();
    }
  }
}
