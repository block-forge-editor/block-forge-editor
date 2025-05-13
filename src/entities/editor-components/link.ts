import { BaseBlockTool } from "./base-block-tool";

import { getIcon } from "@/shared/lib/helpers/icons";

const TOOLTIP_TEXT = "Компонент для добавления ссылок";
const COMPONENT_LABEL_TEXT = "Ссылка";
const TOOLBOX_TITLE = "Ссылка";

export type TLinkData = {
  href: string;
  title: string;
  variant: "primary" | "secondary";
};

export class Link extends BaseBlockTool {
  private title = "";
  private href = "";
  private _variant: "primary" | "secondary" = "primary";
  private _data: TLinkData = {
    href: "",
    title: "",
    variant: "primary",
  };
  private _blockID: string = "";
  static get toolbox() {
    return {
      title: TOOLBOX_TITLE,
      icon: getIcon("link"),
    };
  }

  constructor(config: any) {
    super(config);
    if (config.data.title) {
      this.title = config.data.title;
    }

    if (config.data.href) {
      this.href = config.data.href;
    }

    this._variant = config.data?.variant || "primary";
    this._data = config.data || {};
    this._blockID = config.block.id;
  }

  private _createLabels() {
    return this.createComponentLabels(
      [
        {
          text: COMPONENT_LABEL_TEXT,
          className: "bg-gradient-to-br from-lime-500 to-lime-800",
        },
        {
          text: this._variant === "primary" ? "Primary" : "Secondary",
          className:
            this._variant === "primary"
              ? "!from-blue-500 !to-blue-800"
              : "!from-purple-500 !to-purple-800",
        },
      ],
      `link-component-labels-${this._blockID}`,
    );
  }

  private _rerender() {
    const labelsContainer = document.querySelector(
      `#link-component-labels-${this._blockID}`,
    ) as HTMLElement;

    if (labelsContainer) {
      const newLabelsContainer = this._createLabels();
      labelsContainer.parentNode?.replaceChild(
        newLabelsContainer,
        labelsContainer,
      );
    }
  }

  render() {
    const rootDiv = document.createElement("div");
    rootDiv.className = "flex flex-col gap-4";

    const contentWrapper = document.createElement("div");
    contentWrapper.className = "relative group";

    const labelsContainer = this._createLabels();
    contentWrapper.appendChild(labelsContainer);

    const tooltip = this.createTooltip(TOOLTIP_TEXT);
    contentWrapper.appendChild(tooltip);

    const inputsContainer = document.createElement("div");
    inputsContainer.className =
      "bg-white border border-gray-100 rounded-xl p-6";

    const inputsGrid = document.createElement("div");
    inputsGrid.className = "grid grid-cols-2 gap-4";

    const titleContainer = document.createElement("div");
    titleContainer.className = "flex flex-col gap-1";

    const titleLabel = document.createElement("label");
    titleLabel.className = "text-sm text-gray-600";
    titleLabel.textContent = "Имя ссылки";
    titleLabel.htmlFor = "title";

    const inputTitle = document.createElement("input");
    inputTitle.className =
      "w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300";
    inputTitle.placeholder = "Введите имя ссылки";
    inputTitle.name = "title";
    inputTitle.id = "title";
    inputTitle.value = this.title;
    inputTitle.addEventListener("input", (event) => {
      this.title = (event.target as HTMLInputElement).value;
    });

    titleContainer.appendChild(titleLabel);
    titleContainer.appendChild(inputTitle);

    const hrefContainer = document.createElement("div");
    hrefContainer.className = "flex flex-col gap-1";

    const hrefLabel = document.createElement("label");
    hrefLabel.className = "text-sm text-gray-600";
    hrefLabel.textContent = "URL ссылки";
    hrefLabel.htmlFor = "href";

    const inputHref = document.createElement("input");
    inputHref.className =
      "w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300";
    inputHref.placeholder = "https://kaztour.kz/otel/123";
    inputHref.name = "href";
    inputHref.id = "href";
    inputHref.value = this.href;
    inputHref.addEventListener("input", (event) => {
      this.href = (event.target as HTMLInputElement).value;
    });

    hrefContainer.appendChild(hrefLabel);
    hrefContainer.appendChild(inputHref);

    inputsGrid.appendChild(titleContainer);
    inputsGrid.appendChild(hrefContainer);
    inputsContainer.appendChild(inputsGrid);
    contentWrapper.appendChild(inputsContainer);

    rootDiv.appendChild(contentWrapper);

    return rootDiv;
  }

  renderSettings() {
    return [
      {
        type: "separator",
      },
      {
        icon: getIcon("edit"),
        title: "Тип ссылки",
        children: {
          items: [
            {
              icon: getIcon("edit"),
              title: "Primary",
              toggle: "variant",
              isActive: () => this._variant === "primary",
              onActivate: () => {
                this._variant = "primary";
                this._rerender();
              },
            },
            {
              icon: getIcon("edit"),
              title: "Secondary",
              toggle: "variant",
              isActive: () => this._variant === "secondary",
              onActivate: () => {
                this._variant = "secondary";
                this._rerender();
              },
            },
          ],
        },
      },
    ];
  }

  save() {
    return {
      ...this._data,
      title: this.title,
      href: this.href,
      variant: this._variant,
    };
  }
}
