import Delimiter from "@editorjs/delimiter";

export class CustomDelimiter extends Delimiter {
  drawView() {
    const div = document.createElement("DIV");

    div.classList.add("w-full", "h-[1px]", "bg-[#8c98a7]");

    return div as HTMLDivElement;
  }
}
