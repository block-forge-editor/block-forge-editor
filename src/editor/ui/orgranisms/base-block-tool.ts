import type { BlockToolConstructorOptions } from "@editorjs/editorjs/types/tools";
import type { Root } from "react-dom/client";

export type ComponentLabelOptions = {
  text: string;
  className?: string;
};

export class BaseBlockTool implements EditorJS.BlockTool {
  protected _node: null | HTMLElement = null;
  protected data?: Record<string, any>;
  protected api: EditorJS.API;
  protected _root: Root | null = null;

  constructor(config: BlockToolConstructorOptions) {
    const { data, api } = config;
    this.data = data;
    this.api = api;
  }
  render(): HTMLElement | Promise<HTMLElement> {
    return document.createElement("div");
  }

  save(): Record<string, any> {
    return this.data ?? {};
  }

  destroy() {
    if (this._root) {
      setTimeout(() => {
        if (this._root) {
          this._root.unmount();
          this._root = null;
        }
      }, 0);
    }
  }
}
