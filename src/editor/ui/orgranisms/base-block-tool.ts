import type { BlockToolConstructorOptions } from "@editorjs/editorjs/types/tools";

export type ComponentLabelOptions = {
  text: string;
  className?: string;
};

export class BaseBlockTool implements EditorJS.BlockTool {
  protected _node: null | HTMLElement = null;
  protected data?: Record<string, any>;
  protected api: EditorJS.API;

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
}
