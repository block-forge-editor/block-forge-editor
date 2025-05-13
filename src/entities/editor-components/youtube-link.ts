import type { BlockToolConstructorOptions } from "@editorjs/editorjs";

import { BaseBlockTool } from "./base-block-tool";

import { getIcon } from "@/shared/lib/helpers/icons";

const TOOLTIP_TEXT = "Компонент для вставки YouTube видео";
const COMPONENT_LABEL_TEXT = "YouTube видео";
const TOOLBOX_TITLE = "YouTube";

export class YouTubeLink extends BaseBlockTool {
  private url = "";

  static get toolbox() {
    return {
      title: TOOLBOX_TITLE,
      icon: getIcon("video"),
    };
  }

  constructor(config: BlockToolConstructorOptions) {
    super(config);
    if (config.data.url) {
      this.url = config.data.url;
    }
  }

  private _parseVideoCode = (value: string) => {
    const parsedVideoCode = value?.split("?v=")?.[1] || "";
    const youtubeEmbedUrl = `https://www.youtube.com/embed/${parsedVideoCode}`;

    return `<iframe width="100%" height="500px" src="${youtubeEmbedUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
  };

  private _handleInputChange = () => {
    const videoRoot = this._node?.querySelector("#videoRoot") as HTMLDivElement;

    if (videoRoot) {
      videoRoot.innerHTML = this._parseVideoCode(this.url);
    }
  };

  render() {
    const rootDiv = document.createElement("div");
    rootDiv.className = "flex flex-col gap-4";

    const contentWrapper = document.createElement("div");
    contentWrapper.className = "relative group";

    const componentLabel = this.createComponentLabels([
      {
        text: COMPONENT_LABEL_TEXT,
        className: "from-red-500 to-red-800",
      },
    ]);
    contentWrapper.appendChild(componentLabel);

    const tooltip = this.createTooltip(TOOLTIP_TEXT);
    contentWrapper.appendChild(tooltip);

    const inputContainer = document.createElement("div");
    inputContainer.className =
      "bg-white border border-gray-100 rounded-xl p-6 mb-4";

    const inputHref = document.createElement("input");
    inputHref.className =
      "w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300";
    inputHref.placeholder = "https://www.youtube.com/watch?v=...";
    inputHref.name = "url";
    inputHref.id = "url";
    inputHref.value = this.url;
    inputHref.addEventListener("input", (event) => {
      this.url = (event.target as HTMLInputElement).value;
      this._handleInputChange();
    });

    inputContainer.appendChild(inputHref);
    contentWrapper.appendChild(inputContainer);

    const videoRoot = document.createElement("div");
    videoRoot.id = "videoRoot";
    videoRoot.innerHTML = this._parseVideoCode(this.url);
    videoRoot.className =
      "w-full h-[500px] flex justify-center overflow-hidden relative rounded-xl";
    contentWrapper.appendChild(videoRoot);

    rootDiv.appendChild(contentWrapper);

    this._node = rootDiv;
    return rootDiv;
  }

  save() {
    return {
      url: this.url,
    };
  }
}
