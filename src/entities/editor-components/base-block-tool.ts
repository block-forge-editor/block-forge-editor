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

  public createTooltip(text: string) {
    const tooltip = document.createElement("div");
    tooltip.className =
      "opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute -top-2 left-1/2 -tranneutral-x-1/2 bg-gray-900/90 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap z-30";
    tooltip.textContent = text;

    const tooltipArrow = document.createElement("div");
    tooltipArrow.className =
      "absolute -bottom-1 left-1/2 -tranneutral-x-1/2 border-4 border-transparent border-t-gray-900/90";
    tooltip.appendChild(tooltipArrow);

    return tooltip;
  }

  public createComponentLabels(
    labels: ComponentLabelOptions[],
    containerId?: string,
  ) {
    const container = document.createElement("div");
    container.className = "flex gap-2 absolute right-12 top w-fit z-30";
    container.id = containerId || "component-labels-container";

    labels.forEach((labelOptions) => {
      const label = document.createElement("div");
      const { text } = labelOptions;

      label.className = `flex items-center rounded-lg-b p-2 flex items-center justify-center h-6 p-4 rounded-b-lg bg-gradient-to-br from-green-500 to-green-800 text-white text-xs ${
        labelOptions.className || ""
      }`;
      label.textContent = text;

      container.appendChild(label);
    });

    return container;
  }

  render(): HTMLElement | Promise<HTMLElement> {
    return document.createElement("div");
  }

  save(): Record<string, any> {
    return this.data ?? {};
  }
}
