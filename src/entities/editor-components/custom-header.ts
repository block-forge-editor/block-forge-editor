/* eslint-disable @typescript-eslint/no-unsafe-call */
import type { BlockToolConstructorOptions } from "@editorjs/editorjs";
import Paragraph from "@editorjs/paragraph";

import { getIcon } from "@/shared/lib/helpers/icons";
import { getFontSizeClass } from "@/shared/lib/paragraph";

export class CustomHeader extends Paragraph {
  private _fontSize: number = 16;
  private _level: number = 3;

  constructor(config: BlockToolConstructorOptions) {
    super(config as any);

    this._level = config.data?.level || 3;
    this._fontSize = config.data?.fontSize || 16;
  }

  static get sanitize() {
    return {
      text: {
        br: true,
        div: true,
        a: true,
        i: true,
        p: true,
        b: true,
      },
    };
  }

  static get toolbox() {
    return {
      title: "Заголовок",
      icon: getIcon("heading"),
    };
  }

  static get conversionConfig() {
    return {
      export: "text",
      import: "text",
    };
  }

  private _createHeadingLevelItem(level: number) {
    return {
      icon: getIcon("heading"),
      title: `Заголовок ${level}`,
      toggle: "heading-level",
      isActive: () => this._level === level,
      onActivate: () => {
        this._level = level;
        this._rerender();
      },
    };
  }

  private _createFontSizeItem(size: number) {
    return {
      icon: getIcon("formatSize"),
      title: `${size}px`,
      toggle: "font-size",
      isActive: () => this._fontSize === size,
      onActivate: () => {
        this._fontSize = size;
        this._rerender();
      },
    };
  }

  private _rerender() {
    const fontSizeClass = getFontSizeClass({
      level: this._level,
      fontSize: this._fontSize,
    });
    // @ts-expect-error
    this._element.setAttribute("style", fontSizeClass);
    // @ts-expect-error
    this._element.classList.add("font-semibold");
  }

  render() {
    const rootDiv = super.render();
    this._rerender();
    return rootDiv;
  }

  renderSettings() {
    return [
      {
        type: "separator",
      },
      {
        icon: getIcon("formatSize"),
        title: "Размер шрифта",
        children: {
          items: [12, 14, 16, 18, 20, 24, 30, 36].map((size) =>
            this._createFontSizeItem(size),
          ),
        },
      },
      {
        type: "separator",
      },
      {
        icon: getIcon("heading"),
        title: "Уровень",
        children: {
          items: [1, 2, 3, 4, 5, 6].map((level) =>
            this._createHeadingLevelItem(level),
          ),
        },
      },
    ];
  }

  save(HTMLElement: HTMLElement) {
    return {
      text: HTMLElement.innerHTML,
      fontSize: this._fontSize,
      level: this._level,
    };
  }

  validate(savedData: any): boolean {
    // @ts-expect-error
    if (savedData.text.trim() === "" && !this._preserveBlank) {
      return false;
    }

    return true;
  }
}
