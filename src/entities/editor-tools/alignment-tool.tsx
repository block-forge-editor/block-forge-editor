import type {
  API,
  InlineTool,
  InlineToolConstructorOptions,
} from "@editorjs/editorjs";

import { getIcon } from "@/shared/lib/helpers/icons";

type AlignmentType = "left" | "right" | "center";

export class AlignmentInlineTool implements InlineTool {
  api: API;
  tag: string = "p";
  alignment: AlignmentType = "left";

  static isInline = true;
  static title = "Выравнивание текста";

  constructor({ api }: InlineToolConstructorOptions) {
    this.api = api;

    const selection = this.getCurrentSelection();
    if (!selection) return;

    const parentAlignmentDiv = this._findParentAlignmentDiv(
      selection.commonAncestorContainer,
    );
    this.alignment =
      (parentAlignmentDiv
        ?.closest("[data-alignment]")
        ?.getAttribute("data-alignment") as AlignmentType) || "left";
  }

  private getCurrentSelection() {
    const selection = window.getSelection();

    if (!selection || selection.rangeCount === 0) {
      return;
    }

    return selection.getRangeAt(0);
  }

  private applyAlignment() {
    const selection = this.getCurrentSelection();
    const termWrapper = this.api.selection.findParentTag(this.tag);

    if (!selection) return;

    if (termWrapper) {
      this.unwrap(termWrapper);
    } else {
      this.wrap(selection);
    }
  }

  private _findParentAlignmentDiv(node: Node): null | HTMLElement {
    let current: Node | null = node;

    while (current && current !== document.body) {
      if (
        current.nodeType === Node.ELEMENT_NODE &&
        (current as HTMLElement).hasAttribute("data-alignment")
      ) {
        return current as HTMLElement;
      }

      current = current.parentNode;
    }

    return null;
  }

  render() {
    return {
      icon: getIcon("left"),
      hint: {
        title: "Выравнивание текста",
        alignment: "center" as const,
      },
      children: {
        items: [
          {
            icon: getIcon("left"),
            title: "По левому краю",
            toggle: "alignment",
            onActivate: () => {
              this.alignment = "left";
              this.applyAlignment();
            },
            isActive: () => this.alignment === "left",
          },
          {
            icon: getIcon("center"),
            title: "По центру",
            toggle: "alignment",
            onActivate: () => {
              this.alignment = "center";
              this.applyAlignment();
            },
            isActive: () => this.alignment === "center",
          },
          {
            icon: getIcon("right"),
            title: "По правому краю",
            toggle: "alignment",
            onActivate: () => {
              this.alignment = "right";
              this.applyAlignment();
            },
            isActive: () => this.alignment === "right",
          },
        ],
      },
    };
  }

  wrap(range: Range) {
    const parentAlignmentDiv = this._findParentAlignmentDiv(
      range.commonAncestorContainer,
    );

    if (parentAlignmentDiv) {
      if (
        parentAlignmentDiv.getAttribute("data-alignment") === this.alignment
      ) {
        return;
      }
      parentAlignmentDiv.setAttribute("data-alignment", this.alignment);
      parentAlignmentDiv.style.textAlign = this.alignment;
    } else {
      const wrapper = document.createElement(this.tag);
      wrapper.setAttribute("data-alignment", this.alignment);
      wrapper.style.textAlign = this.alignment;

      const tempContainer = document.createElement("div");
      tempContainer.appendChild(range.cloneContents());
      range.deleteContents();
      wrapper.innerHTML = tempContainer.innerHTML;
      range.insertNode(wrapper);
      this.api.selection.expandToTag(wrapper);
    }
  }

  unwrap(termWrapper: HTMLElement) {
    this.api.selection.expandToTag(termWrapper);

    const sel = window.getSelection();
    if (!sel) return;

    const range = sel.getRangeAt(0);
    const unwrappedContent = range.extractContents();

    if (termWrapper.parentNode) {
      termWrapper.parentNode.removeChild(termWrapper);
    }

    range.insertNode(unwrappedContent);

    sel.removeAllRanges();
    sel.addRange(range);
  }
}
