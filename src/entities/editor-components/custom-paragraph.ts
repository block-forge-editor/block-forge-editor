import type {
  SanitizerConfig,
  BlockToolConstructorOptions,
} from "@editorjs/editorjs";
import Paragraph from "@editorjs/paragraph";

import { getIcon } from "@/shared/lib/helpers/icons";
import {
  EColors,
  getFontSizeClass,
  getBackgroundColorClass,
} from "@/shared/lib/paragraph";

export class CustomParagraph extends Paragraph {
  private _fontSize?: number;
  private backgroundColor = EColors.DEFAULT;
  private baseClasses: string = "";

  constructor(config: BlockToolConstructorOptions) {
    super(config as any);
    this._fontSize = config.data?.fontSize;
    this.backgroundColor = config.data?.backgroundColor;
  }

  static get conversionConfig() {
    return {
      export: "text",
      import: "text",
    };
  }

  static get sanitize(): SanitizerConfig {
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

  private _rerender() {
    const fontSizeClass = getFontSizeClass({ fontSize: this._fontSize });
    // @ts-expect-error
    this._element.setAttribute("style", fontSizeClass);

    const bgClass = getBackgroundColorClass(this.backgroundColor);
    // @ts-expect-error
    this._element.className = `${this.baseClasses} ${bgClass}`;
  }

  render() {
    const rootDiv = super.render();
    this.baseClasses = rootDiv.className;
    this._rerender();
    return rootDiv;
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

  private _createBackgroundColorItem(color: EColors) {
    return {
      icon: getIcon(color),
      title: color,
      toggle: "background-color",
      isActive: () => this.backgroundColor === color,
      onActivate: () => {
        this.backgroundColor = color;
        this._rerender();
      },
    };
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
        title: "Фон блока",
        children: {
          items: [
            this._createBackgroundColorItem(EColors.DEFAULT),
            this._createBackgroundColorItem(EColors.BLUE),
            this._createBackgroundColorItem(EColors.YELLOW),
          ],
        },
      },
    ];
  }

  save(HTMLElement: HTMLElement) {
    return {
      text: HTMLElement.innerHTML,
      fontSize: this._fontSize,
      backgroundColor: this.backgroundColor,
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
