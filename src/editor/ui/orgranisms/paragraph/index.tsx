import type { BlockToolConstructorOptions } from "@editorjs/editorjs";
import { getIcon } from "@/editor/lib/icons-manager";
import Paragraph from "@editorjs/paragraph";
import { API } from "@editorjs/editorjs";
import {
  TAGS,
  MIN_FONT_SIZE,
  MAX_FONT_SIZE,
  DEFAULT_FONT_SIZE,
  TOOLBOX_TITLE,
} from "./constants";
import { TParagraphData, ParagraphCSS } from "./types";

export class BlockForgeParagraph extends Paragraph {
  public _data: TParagraphData = {
    text: "",
    fontSize: 16,
    tag: "p",
  };
  public _CSS: ParagraphCSS;
  public api: API;
  public _placeholder: string;
  public _preserveBlank: boolean;
  public _element: HTMLDivElement | null;
  public readOnly: boolean;
  public onKeyUp: (event: KeyboardEvent) => void;

  constructor({ data, config, api, readOnly }: BlockToolConstructorOptions) {
    super({
      data: {
        text: data?.text || "",
        fontSize: data?.fontSize || 16,
        tag: data?.tag || "p",
      },
      config: {
        placeholder: "",
        preserveBlank: config?.preserveBlank ?? true,
      },
      api,
      readOnly,
    });

    this.api = api;
    this._CSS = {
      block: this.api.styles.block,
      wrapper: "ce-paragraph",
    };
    this._placeholder = "";
    this._preserveBlank = config?.preserveBlank ?? true;
    this._element = null;
    this.readOnly = readOnly || false;

    this.onKeyUp = (event: KeyboardEvent) => {
      super.onKeyUp(event);
    };

    this._data = {
      text: data?.text || "",
      fontSize: data?.fontSize || 16,
      tag: data?.tag || "p",
    };
  }

  static get toolbox() {
    return {
      title: TOOLBOX_TITLE,
      icon: getIcon("formatSize"),
    };
  }

  static get conversionConfig() {
    return {
      export: "text",
      import: "text",
    };
  }

  private getTagMenu() {
    return {
      label: this.api.i18n.t("Tag"),
      icon: getIcon("heading"),
      children: {
        items: TAGS.map(({ tag, title, icon }) => ({
          title: this.api.i18n.t(title),
          icon: getIcon(icon),
          isActive: this._data.tag === tag,
          closeOnActivate: true,
          onActivate: () => {
            this._data.tag = tag;
            this.save();
            this._rerender();
          },
        })),
      },
    };
  }

  renderSettings() {
    const fontSizeInput = document.createElement("input");
    fontSizeInput.className = "cdx-list-start-with-field__input";
    fontSizeInput.value = (this._data.fontSize || 16).toString();
    fontSizeInput.required = true;
    fontSizeInput.tabIndex = -1;

    fontSizeInput.addEventListener("input", () => {
      const newSize = Math.max(
        MIN_FONT_SIZE,
        Math.min(
          MAX_FONT_SIZE,
          parseInt(fontSizeInput.value) || DEFAULT_FONT_SIZE,
        ),
      );
      this._data.fontSize = newSize;
      this.save();
      this._rerender();
    });

    const wrapper = document.createElement("div");
    wrapper.className = "cdx-list-start-with-field";
    wrapper.appendChild(fontSizeInput);

    return [
      {
        label: this.api.i18n.t("Font size"),
        icon: getIcon("formatSize"),
        children: {
          items: [
            {
              element: wrapper,
              type: "html",
            },
          ],
        },
      },
      {
        type: "separator",
      },
      this.getTagMenu(),
    ];
  }

  drawView(): HTMLDivElement {
    const div = document.createElement("DIV");

    div.classList.add(this._CSS.wrapper, this._CSS.block);
    div.contentEditable = "false";
    div.dataset.placeholderActive = this.api.i18n.t(this._placeholder);

    if (this._data.text) {
      div.innerHTML = this._data.text;
    }

    if (!this.readOnly) {
      div.contentEditable = "true";
      div.addEventListener("keyup", this.onKeyUp);
      div.addEventListener("input", () => {
        this._data.text = div.innerHTML;
      });
    }

    if (this._data.fontSize) {
      div.style.fontSize = `${this._data.fontSize}px`;
    }

    return div as HTMLDivElement;
  }

  render(): HTMLDivElement {
    this._element = this.drawView();
    return this._element;
  }

  private _rerender(): void {
    if (!this._element) return;

    const newElement = document.createElement(this._data.tag) as HTMLDivElement;
    newElement.innerHTML = this._element.innerHTML;
    newElement.contentEditable = this._element.contentEditable;
    newElement.classList.add(...Array.from(this._element.classList));

    if (this._data.fontSize) {
      newElement.style.fontSize = `${this._data.fontSize}px`;
    }

    this._element.parentNode?.replaceChild(newElement, this._element);
    this._element = newElement;

    if (this._element) {
      this._data.text = this._element.innerHTML;
    }
  }

  save(): TParagraphData {
    return {
      text: this._data.text,
      fontSize: this._data.fontSize,
      tag: this._data.tag,
    };
  }
}
